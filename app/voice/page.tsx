"use client";
import { useEffect, useState, useCallback } from "react";
import { VoiceProvider, useVoice, VoiceReadyState } from "@humeai/voice-react";
import { Mic, Loader2 } from "lucide-react";

export default function VoicePage() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [provider, setProvider] = useState<'HUME_AI' | 'CUSTOM_VOICE'>('HUME_AI');
  const [voices, setVoices] = useState<Array<{ id: string; name: string }>>([]);
  const [voiceId, setVoiceId] = useState<string>("");

  useEffect(() => {
    async function getToken() {
      try {
        const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        const res = await fetch(`${base}/voice/token`);
        const data = await res.json();
        if (res.ok && data?.token) {
          setToken(data.token);
        } else {
          setError(data?.message || "Unable to obtain Hume token");
        }
      } catch (e: any) {
        setError(e?.message || "Failed to contact backend");
      } finally {
        setReady(true);
      }
    }
    getToken();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        const r = await fetch(`${base}/voice/voices?provider=${provider}`);
        const j = await r.json();
        if (r.ok && Array.isArray(j?.voices)) setVoices(j.voices);
      } catch (_) {}
    })();
  }, [provider]);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Hume Voice Assistant</h1>
      {!ready && <p>Initializing...</p>}
      {ready && error && (
        <div className="text-red-600">
          <p className="mb-2">{error}</p>
          <ol className="list-decimal ml-6 text-sm space-y-1">
            <li>Set HUME_API_KEY and HUME_CLIENT_SECRET in backend .env</li>
            <li>Install Hume SDK on backend: <code>npm i hume</code></li>
            <li>Restart backend and reload this page</li>
          </ol>
        </div>
      )}
      {ready && token && (
        <VoiceProvider>
          <div className="space-y-4">
            <div className="rounded border p-4">
              <div className="flex gap-2 items-end">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Provider</label>
                  <select className="border rounded px-2 py-1.5" value={provider} onChange={(e) => setProvider(e.target.value as any)}>
                    <option value="HUME_AI">Library</option>
                    <option value="CUSTOM_VOICE">My Voices</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">Voice</label>
                  <select className="w-full border rounded px-2 py-1.5" value={voiceId} onChange={(e) => setVoiceId(e.target.value)}>
                    <option value="">Auto (default)</option>
                    {voices.map((v) => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <MinimalVoiceUI accessToken={token} voiceId={voiceId} />
          </div>
        </VoiceProvider>
      )}
    </div>
  );
}

function MinimalVoiceUI({ accessToken, voiceId }: { accessToken: string, voiceId?: string }) {
  const { connect, disconnect, status, readyState, unmuteAudio } = useVoice();

  const isOpen = readyState === VoiceReadyState.OPEN || status.value === "connected";
  const connecting = readyState === VoiceReadyState.CONNECTING || status.value === "connecting";

  const onClick = useCallback(() => {
    if (isOpen) {
      disconnect();
      return;
    }
    void connect({
      auth: { type: "accessToken", value: accessToken },
      voiceId: voiceId || undefined,
      verboseTranscription: true,
      audioConstraints: { echoCancellation: true, noiseSuppression: true, autoGainControl: false },
    }).then(() => {
      try { unmuteAudio(); } catch {}
    });
  }, [isOpen, disconnect, connect, accessToken, unmuteAudio, voiceId]);

  return (
    <div className="rounded border p-6 flex items-center justify-between">
      <div>
        <div className="font-medium">Session</div>
        <div className="text-sm text-gray-600">Status: {status.value}</div>
      </div>
      <button
        onClick={onClick}
        disabled={connecting}
        className="relative h-16 w-16 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-600 text-white shadow-lg flex items-center justify-center disabled:opacity-60"
        aria-label={isOpen ? "End Call" : "Start Call"}
      >
        {connecting ? <Loader2 className="h-7 w-7 animate-spin" /> : <Mic className="h-7 w-7" />}
        {!isOpen && !connecting && (
          <span className="absolute -inset-1 rounded-full animate-ping bg-fuchsia-500/40" />
        )}
      </button>
    </div>
  );
}

