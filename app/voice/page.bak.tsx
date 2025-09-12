"use client";
import { useEffect, useState, useCallback } from "react";
import { VoiceProvider, useVoice, VoiceReadyState } from "@humeai/voice-react";

export default function VoicePage() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

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

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Hume Voice Assistant</h1>
      {!ready && <p>Initializingâ€¦</p>}
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
          <MinimalVoiceUI accessToken={token} />
        </VoiceProvider>
      )}
    </div>
  );
}

function MinimalVoiceUI({ accessToken }: { accessToken: string }) {
  const { connect, disconnect, status, readyState, unmuteAudio } = useVoice();

  const isOpen = readyState === VoiceReadyState.OPEN || status.value === "connected";
  const connecting = readyState === VoiceReadyState.CONNECTING || status.value === "connecting";

  const onClick = useCallback(() => {
    if (isOpen) {
      disconnect();
      return;
    }
    void connect({ auth: { type: "accessToken", value: accessToken } }).then(() => { try { unmuteAudio(); } catch {} });
  }, [isOpen, disconnect, connect, accessToken]);

  return (
    <div className="rounded border p-4 flex items-center justify-between">
      <div>
        <div className="font-medium">Session</div>
        <div className="text-sm text-gray-600">Status: {status.value}</div>
      </div>
      <button
        onClick={onClick}
        className="px-3 py-1.5 rounded bg-indigo-600 text-white disabled:opacity-60"
        disabled={connecting}
      >
        {isOpen ? "End Call" : connecting ? "Connecting…" : "Start Call"}
      </button>
    </div>
  );
}
