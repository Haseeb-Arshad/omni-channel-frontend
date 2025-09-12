"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Session = {
  chat_id: string;
  chat_group_id: string | null;
  voice_id: string | null;
  system_prompt: string | null;
  started_at: string;
  ended_at: string | null;
  assistant_messages?: number;
  user_messages?: number;
};

export default function VoiceSessionsPage() {
  const [items, setItems] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${base}/voice/sessions?limit=100`);
        const j = await r.json();
        if (r.ok) setItems(j.items || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Voice Sessions</h1>
      {loading ? (
        <div>Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-gray-600">No sessions yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 pr-4">Chat ID</th>
                <th className="py-2 pr-4">Voice</th>
                <th className="py-2 pr-4">Started</th>
                <th className="py-2 pr-4">Msgs</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.chat_id} className="border-t">
                  <td className="py-2 pr-4 font-mono text-xs">{s.chat_id}</td>
                  <td className="py-2 pr-4">{(s as any).voice_name || s.voice_id || "—"}</td>
                  <td className="py-2 pr-4">{new Date(s.started_at).toLocaleString()}</td>
                  <td className="py-2 pr-4">{Number(s.user_messages || 0) + Number(s.assistant_messages || 0)}</td>
                  <td className="py-2 pr-4">
                    <Link className="text-indigo-600 hover:underline" href={`/dashboard/voice-sessions/${encodeURIComponent(s.chat_id)}`}>Open</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
