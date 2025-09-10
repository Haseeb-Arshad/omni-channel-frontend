"use client";
import { useEffect, useState } from "react";

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
      {!ready && <p>Initializing…</p>}
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
      {ready && token && <VoiceClient token={token} />}
    </div>
  );
}

function VoiceClient({ token }: { token: string }) {
  const [impl, setImpl] = useState<any>(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // Load at runtime to avoid SSR and hard dependency
        const mod = await import("@humeai/voice-react").catch(() => null);
        if (mounted) setImpl(mod);
      } catch (_) {
        if (mounted) setImpl(null);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (!impl) {
    return (
      <div className="text-sm">
        <p className="mb-2">Voice UI library not available on the client.</p>
        <p>Install in frontend: <code>npm i @humeai/voice-react @humeai/voice</code></p>
      </div>
    );
  }

  const { VoiceProvider, VoiceWidget } = impl as any;
  return (
    <VoiceProvider auth={{ type: "token", value: token }}>
      <div className="rounded border p-4">
        <VoiceWidget theme="light" className="w-full" />
      </div>
    </VoiceProvider>
  );
}

