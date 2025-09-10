"use client";
import { useState } from "react";

export default function AgentRunPage() {
  const [input, setInput] = useState("");
  const [runId, setRunId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function startRun() {
    setLoading(true);
    setError(null);
    setRunId(null);
    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const res = await fetch(`${base}/agent/runs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userRequest: input })
      });
      const data = await res.json();
      if (res.ok) {
        setRunId(data.runId);
      } else {
        setError(data?.message || 'Failed to start run');
      }
    } catch (e: any) {
      setError(e?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">LangGraph Agent Runner</h1>
      <textarea
        className="w-full border rounded p-2 min-h-[120px] mb-3"
        placeholder="Describe what you want the agent to do…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex gap-2 items-center">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={startRun}
          disabled={loading || !input.trim()}
        >
          {loading ? 'Starting…' : 'Start Run'}
        </button>
        {runId && <span className="text-sm">Run ID: <code>{runId}</code></span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
      <p className="mt-4 text-sm text-gray-500">Note: If LangGraph SDK isn’t installed or configured, the backend returns a simulated run id.</p>
    </div>
  );
}

