"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { VoiceProvider, useVoice, VoiceReadyState } from "@humeai/voice-react";
import { Mic, MicOff, VolumeX, Volume2, Play, Pause, Waves, Loader2, AlertCircle } from "lucide-react";

type ConnectState = "idle" | "connecting" | "connected" | "error";

type VoiceSettings = {
  voiceId: string;
  systemPrompt: string;
  assistantStarts: boolean;
  saveAudio: boolean;
  lowLatency: boolean;
  introLine: string;
  voiceName?: string; showPreview?: boolean;
};

const DEFAULT_SETTINGS: VoiceSettings = {
  voiceId: "",
  systemPrompt: "You are an empathic, concise voice assistant that replies in short, conversational sentences and asks follow‑up questions when helpful.",
  assistantStarts: true,
  saveAudio: false,
  lowLatency: true,
  introLine: "Hello! I am your empathic voice assistant. How can I help you today?",
  voiceName: undefined, showPreview: true,
};

function TokenFetcher({ children }: { children: (token: string) => React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        const res = await fetch(`${base}/voice/token`);
        const data = await res.json();
        if (!mounted) return;
        if (res.ok && data?.token) {
          setToken(data.token);
        } else {
          setError(data?.message || "Failed to obtain Hume EVI token");
        }
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || "Failed to contact backend for Hume token");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Connecting to voice backend…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-600">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
        <ol className="list-decimal ml-6 space-y-1">
          <li>Set HUME_API_KEY and HUME_CLIENT_SECRET in backend .env</li>
          <li>Install backend dependency: <code>npm i hume</code></li>
          <li>Restart backend server</li>
          <li>
            Ensure frontend env <code>NEXT_PUBLIC_BACKEND_URL</code> points to the backend (current default
            http://localhost:5000)
          </li>
        </ol>
      </div>
    );
  }

  if (!token) return null;
  return <>{children(token)}</>;
}

function EmotionsPanel() {
  const { lastAssistantProsodyMessage } = useVoice();
  const topEmotions = useMemo(() => {
    const scores = lastAssistantProsodyMessage?.models?.prosody?.scores as Record<string, number> | undefined;
    if (!scores) return [] as Array<{ name: string; score: number }>;
    const arr = Object.entries(scores)
      .map(([name, score]) => ({ name, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    return arr;
  }, [lastAssistantProsodyMessage]);

  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 text-gray-700 font-medium">
          <Waves className="h-4 w-4" />
          <span>Top Emotions</span>
        </div>
        {!lastAssistantProsodyMessage && <span className="text-xs text-gray-500">Waiting for assistant audio…</span>}
      </div>
      {topEmotions.length === 0 ? (
        <div className="text-sm text-gray-500">No emotion data yet.</div>
      ) : (
        <div className="space-y-2">
          {topEmotions.map((e) => (
            <div key={e.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="capitalize text-gray-800">{e.name.replace(/([A-Z])/g, " $1").trim()}</span>
                <span className="text-gray-600">{Math.round(e.score * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600" style={{ width: `${Math.min(100, e.score * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TranscriptPanel() {
  const { messages, lastUserMessage } = useVoice();

  const emotionColor = (name?: string) => {
    const n = (name || '').toLowerCase();
    if (n.includes('joy') || n.includes('amusement')) return 'bg-yellow-50 text-yellow-800';
    if (n.includes('confid') || n.includes('realization')) return 'bg-emerald-50 text-emerald-800';
    if (n.includes('sad') || n.includes('sorrow')) return 'bg-blue-50 text-blue-800';
    if (n.includes('anger') || n.includes('annoy')) return 'bg-rose-50 text-rose-800';
    if (n.includes('fear') || n.includes('anxiety')) return 'bg-indigo-50 text-indigo-800';
    if (n.includes('awkward') || n.includes('doubt') || n.includes('confus')) return 'bg-purple-50 text-purple-800';
    return 'bg-gray-50 text-gray-800';
  };

  const transcript = useMemo(() => {
    return messages
      .filter((m: any) => m?.type === "user_message" || m?.type === "assistant_message")
      .map((m: any) => {
        const role = m.type === "user_message" ? "user" : "assistant";
        const text = m?.message?.content ?? m?.text ?? "";
        const interim = m?.interim === true;
        const scores = (m?.models as any)?.prosody?.scores as Record<string, number> | undefined;
        const top = scores ? Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] : undefined;
        return { role, text, interim, topEmotion: top } as { role: "user" | "assistant"; text: string; interim: boolean; topEmotion?: string };
      });
  }, [messages]);

  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-700 font-medium">Live Transcription</div>
        {(lastUserMessage?.interim || false) && (
          <div className="flex items-center space-x-1 text-xs text-red-500">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span>Listening</span>
          </div>
        )}
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {transcript.length === 0 ? (
          <div className="text-sm text-gray-500">Say something to get started…</div>
        ) : (
          transcript.map((m, idx: number) => (
            <div key={idx} className={`text-sm ${m.role === "user" ? "text-gray-900" : "text-gray-700"}`}>
              <span className="inline-block px-2 py-1 rounded bg-gray-100 mr-2 text-xs capitalize">
                {m.role === "user" ? "You" : "Assistant"}
                {m.interim ? " (interim)" : ""}
              </span>
              <span className={`inline px-1.5 py-0.5 rounded ${m.role === 'assistant' ? emotionColor(m.topEmotion) : ''}`}>
                {m.text || "[no transcript]"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Controls({ token, settings }: { token: string; settings: VoiceSettings }) {
  const { connect, disconnect, status, isMuted, mute, unmute, isAudioMuted, muteAudio, unmuteAudio, isPaused, pauseAssistant, resumeAssistant, readyState, volume, setVolume, sendAssistantInput, sendSessionSettings } = useVoice();

  const [connectState, setConnectState] = useState<ConnectState>("idle");
  const [showPreview, setShowPreview] = useState(false);

  const doConnect = useCallback(async () => {
    if (!token) return;
    setConnectState("connecting");
    try {
      await connect({
        auth: { type: "accessToken", value: token },
        verboseTranscription: true,
        voiceId: settings.voiceId || undefined,
        audioConstraints: settings.lowLatency ? { echoCancellation: true, noiseSuppression: true, autoGainControl: false } : undefined,
        sessionSettings: settings.systemPrompt ? { type: 'session_settings', systemPrompt: settings.systemPrompt } as any : undefined,
      });
      try {
        unmuteAudio();
      } catch { }
      if (settings.assistantStarts) {
        const intro = 'Hello! I am your empathic voice assistant. How can I help you today?';
        sendAssistantInput(intro);
      }
      setConnectState("connected");
    } catch (e) {
      setConnectState("error");
    }
  }, [connect, token, unmuteAudio, settings.voiceId, settings.systemPrompt, settings.assistantStarts, settings.lowLatency, sendAssistantInput]);

  // Live apply prompt changes when connected
  useEffect(() => {
    if (status.value === 'connected' && settings.systemPrompt) {
      try {
        sendSessionSettings({ type: 'session_settings', systemPrompt: settings.systemPrompt } as any);
      } catch { }
    }
  }, [settings.systemPrompt, status.value, sendSessionSettings]);

  const connected = status.value === "connected";
  const connecting = connectState === "connecting" || readyState === VoiceReadyState.CONNECTING;

  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-gray-900 font-medium">Voice Controls</div>
          <div className="text-xs text-gray-500">Status: {status.value}</div>
        </div>
        <div className="flex items-center gap-2">
          {!connected ? (
            <button onClick={() => { if (!settings.showPreview) { void doConnect(); } else { setShowPreview(true); } }} disabled={connecting} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60">
              {connecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              <span>{connecting ? "Connecting…" : "Start"}</span>
            </button>
          ) : (
            <button onClick={() => void disconnect()} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-white bg-rose-600 hover:bg-rose-700">
              <Pause className="h-4 w-4" />
              <span>Stop</span>
            </button>
          )}

          <button onClick={isMuted ? unmute : mute} disabled={!connected} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-60">
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            <span>{isMuted ? "Unmute Mic" : "Mute Mic"}</span>
          </button>

          <button onClick={isAudioMuted ? unmuteAudio : muteAudio} disabled={!connected} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-60">
            {isAudioMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            <span>{isAudioMuted ? "Unmute Audio" : "Mute Audio"}</span>
          </button>

          <button onClick={isPaused ? resumeAssistant : pauseAssistant} disabled={!connected} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-60">
            <span>{isPaused ? "Resume" : "Pause"}</span>
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="text-xs text-gray-600 w-14">Volume</div>
        <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-full" disabled={!connected} />
      </div>
      {showPreview && (
        <PreviewModal
          open={showPreview}
          onClose={() => setShowPreview(false)}
          onStart={() => { setShowPreview(false); void doConnect(); }}
          text={settings.introLine}
          voiceName={settings.voiceName}
          voiceId={settings.voiceId}
        />
      )}
    </div>
  );
}

function SessionMetaPanel({ settings }: { settings?: any }) {
  const { chatMetadata, callDurationTimestamp } = useVoice();
  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white">
      <div className="text-gray-700 font-medium mb-2">Session (Voice: {settings?.voiceName || settings?.voiceId || "default"})</div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="text-gray-500">Chat ID</div>
        <div className="text-gray-900 break-all">{chatMetadata?.chatId || "-"}</div>
        <div className="text-gray-500">Chat Group</div>
        <div className="text-gray-900 break-all">{chatMetadata?.chatGroupId || "-"}</div>
        <div className="text-gray-500">Duration</div>
        <div className="text-gray-900">{callDurationTimestamp || "00:00"}</div>
      </div>
    </div>
  );
}

function SettingsPanel({ settings, setSettings, onEnhance }: { settings: VoiceSettings; setSettings: (s: VoiceSettings) => void; onEnhance: () => void }) {
  const { user } = useAuth();
  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white space-y-3">
      <div className="text-gray-700 font-medium">Settings</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <VoicePicker value={settings.voiceId} onChange={(id, name) => setSettings({ ...settings, voiceId: id, voiceName: name })} />
        <div className="flex items-center gap-2">
          <input id="assistantStarts" type="checkbox" checked={settings.assistantStarts} onChange={(e) => setSettings({ ...settings, assistantStarts: e.target.checked })} />
          <label htmlFor="assistantStarts" className="text-sm text-gray-700">Assistant starts the conversation</label>
        </div>
        <div className="flex items-center gap-2">
          <input id="lowLatency" type="checkbox" checked={settings.lowLatency} onChange={(e) => setSettings({ ...settings, lowLatency: e.target.checked })} />
          <label htmlFor="lowLatency" className="text-sm text-gray-700">Low-latency mode</label>
        </div>
        <div className="flex items-center gap-2">
          <input id="saveAudio" type="checkbox" checked={settings.saveAudio} onChange={(e) => setSettings({ ...settings, saveAudio: e.target.checked })} />
          <label htmlFor="saveAudio" className="text-sm text-gray-700">Archive assistant audio to Supabase</label>
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1">System Prompt</label>
        <textarea value={settings.systemPrompt} onChange={(e) => setSettings({ ...settings, systemPrompt: e.target.value })} rows={4} className="w-full border rounded px-2 py-1.5" />
        <div className="mt-2 flex gap-2">
          <button onClick={onEnhance} className="px-3 py-1.5 rounded bg-sky-600 text-white">Enhance with AI</button>
          <button onClick={() => localStorage.setItem('voice_settings', JSON.stringify(settings))} className="px-3 py-1.5 rounded border">Save Defaults</button>
          <button
            onClick={async () => {
              try {
                const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
                if (typeof window !== 'undefined') {
                  localStorage.setItem('voice_settings', JSON.stringify(settings));
                }
                if (user?.id) {
                  await fetch(`${base}/voice/user-settings`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-User-Id': user.id },
                    body: JSON.stringify({ settings })
                  });
                }
              } catch (_) {}
            }}
            className="px-3 py-1.5 rounded border"
          >
            Save to Account
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Intro line (prompt preview)</label>
          <input value={settings.introLine} onChange={(e)=>setSettings({ ...settings, introLine: e.target.value })} className="w-full border rounded px-2 py-1.5" />
          <div className="mt-1 text-xs text-gray-500">Shown if “Assistant starts” is enabled.</div>
        </div>
        <VoicePreviewButton text={settings.introLine} voiceId={settings.voiceId} />
      </div>
    </div>
  );
}

function VoicePicker({ value, onChange }: { value: string; onChange: (id: string, name?: string) => void }) {
  const [provider, setProvider] = useState<'HUME_AI' | 'CUSTOM_VOICE'>('HUME_AI');
  const [items, setItems] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        const res = await fetch(`${base}/voice/voices?provider=${provider}`);
        const data = await res.json();
        if (res.ok) setItems((data?.voices || []).filter((v: any) => v?.id && v?.name));
      } catch (_) { }
      setLoading(false);
    })();
  }, [provider]);

  return (
    <div>
      <label className="block text-xs text-gray-600 mb-1">Voice</label>
      <div className="flex gap-2">
        <select className="w-40 border rounded px-2 py-1.5" value={provider} onChange={(e) => setProvider(e.target.value as any)}>
          <option value="HUME_AI">Library</option>
          <option value="CUSTOM_VOICE">My Voices</option>
        </select>
        <select className="flex-1 border rounded px-2 py-1.5" value={value} onChange={(e) => { const id = e.target.value; const name = items.find(v => v.id === id)?.name; onChange(id, name); }}>
          <option value="">Auto (default)</option>
          {items.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>
      {loading && <div className="text-xs text-gray-500 mt-1">Loading voices…</div>}
    </div>
  );
}

function VoicePreviewButton({ text, voiceId }: { text: string; voiceId?: string }) {
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const doPreview = useCallback(async () => {
    setBusy(true);
    setUrl(null);
    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const r = await fetch(`${base}/voice/preview`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, voiceId: voiceId || undefined, format: 'mp3' }) });
      const j = await r.json();
      if (r.ok && j?.audio_base64) {
        const blob = b64toBlob(j.audio_base64, j.mime || 'audio/mpeg');
        setUrl(URL.createObjectURL(blob));
      }
    } finally {
      setBusy(false);
    }
  }, [text, voiceId]);

  return (
    <div className="flex items-end gap-2">
      <button onClick={doPreview} disabled={busy || !text} className="px-3 py-1.5 rounded bg-indigo-600 text-white disabled:opacity-60">{busy ? 'Generating…' : 'Preview Voice'}</button>
      {url && <audio controls src={url} className="h-9" />}
    </div>
  );
}

function b64toBlob(b64Data: string, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [] as Uint8Array[];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) { byteNumbers[i] = slice.charCodeAt(i); }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: contentType });
}

export default function HumeVoicePlayground() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<VoiceSettings>(() => {
    try {
      const raw = localStorage.getItem('voice_settings');
      return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Load user defaults from backend (if available)
  useEffect(() => {
    (async () => {
      try {
        if (!user?.id) return;
        const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        const r = await fetch(`${base}/voice/user-settings`, { headers: { 'X-User-Id': user.id } });
        const j = await r.json();
        if (r.ok && j?.settings) {
          setSettings((prev) => ({ ...prev, ...j.settings }));
        }
      } catch (_) { }
    })();
  }, [user?.id]);

  const enhancePrompt = useCallback(async () => {
    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const res = await fetch(`${base}/prompt/enhance`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ draft: settings.systemPrompt }) });
      const data = await res.json();
      if (res.ok && data?.improved) setSettings((s) => ({ ...s, systemPrompt: data.improved }));
    } catch (_) { }
  }, [settings.systemPrompt]);
  // track chatId across messages
  const [chatId, setChatId] = useState<string | null>(null);

  // live voices from backend
  const [voices, setVoices] = useState<Array<{ id: string; name: string }>>([]);
  const [provider, setProvider] = useState<'HUME_AI' | 'CUSTOM_VOICE'>('HUME_AI');
  useEffect(() => {
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        const res = await fetch(`${base}/voice/voices?provider=${provider}`);
        const data = await res.json();
        if (res.ok && Array.isArray(data?.voices)) setVoices(data.voices.filter((v: any) => v?.id && v?.name));
      } catch (_) { }
    })();
  }, [provider]);

  // forward telemetry and audio to backend
  const ingest = useCallback(async (evt: any) => {
    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      await fetch(`${base}/voice/ingest`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(evt) });
    } catch (_) { }
  }, []);

  return (
    <TokenFetcher>
      {(token) => (
        <VoiceProvider enableAudioWorklet onAudioReceived={(m: any) => {
          if (!settings.saveAudio) return;
          ingest({ chatId: chatId || 'unknown', type: 'audio_output', payload: m });
        }} onMessage={(m: any) => {
          if (m?.type === 'chat_metadata') {
            setChatId(m?.chatId);
            ingest({ chatId: m?.chatId, type: 'session_start', payload: { chatGroupId: m?.chatGroupId, voiceId: settings.voiceId, systemPrompt: settings.systemPrompt, metadata: {} } });
            return;
          }
          if (m?.type === 'assistant_message' || m?.type === 'user_message') ingest({ chatId: chatId || 'unknown', type: m.type, payload: m });
          if (m?.type === 'assistant_prosody') ingest({ chatId: chatId || 'unknown', type: 'assistant_prosody', payload: m });
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controls token={token} settings={settings} />
            <SettingsPanel settings={settings} setSettings={setSettings} onEnhance={enhancePrompt} />
            <EmotionsPanel />
            <TranscriptPanel />
            <SessionMetaPanel settings={settings} />
          </div>
        </VoiceProvider>
      )}
    </TokenFetcher>
  );
}
function PreviewModal({ open, onClose, onStart, text, voiceName, voiceId }: { open: boolean; onClose: () => void; onStart: () => void; text: string; voiceName?: string; voiceId?: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-lg p-4 space-y-3">
        <div className="text-gray-900 font-medium">Ready to start?</div>
        <div className="text-sm text-gray-600">Voice: {voiceName || voiceId || 'default'}</div>
        <div className="rounded border p-3 text-sm bg-gray-50">{text}</div>
        <div className="flex items-center gap-2">
          <VoicePreviewButton text={text} voiceId={voiceId} />
          <div className="flex-1" />
          <button onClick={onClose} className="px-3 py-1.5 rounded border">Cancel</button>
          <button onClick={onStart} className="px-3 py-1.5 rounded bg-indigo-600 text-white">Start Now</button>
        </div>
      </div>
    </div>
  );
}
