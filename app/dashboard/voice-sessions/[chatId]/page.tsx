"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Message = { id: number; role: 'user'|'assistant'; content: string; interim: boolean; models?: any; received_at: string };
type Prosody = { id: number; scores: Record<string, number>; created_at: string };
type Clip = { id: number; clip_id: string; clip_index: number; storage_url: string; created_at: string };

function EmotionChip({ scores }: { scores?: Record<string, number> }) {
  const top = useMemo(() => {
    if (!scores) return null;
    const [k,v] = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0] || [];
    return k || null;
  }, [scores]);
  if (!top) return null;
  const palette = (() => {
    const n = top.toLowerCase();
    if (n.includes('joy') || n.includes('amusement')) return 'bg-yellow-50 text-yellow-800';
    if (n.includes('confid') || n.includes('realization')) return 'bg-emerald-50 text-emerald-800';
    if (n.includes('sad') || n.includes('sorrow')) return 'bg-blue-50 text-blue-800';
    if (n.includes('anger') || n.includes('annoy')) return 'bg-rose-50 text-rose-800';
    if (n.includes('fear') || n.includes('anxiety')) return 'bg-indigo-50 text-indigo-800';
    if (n.includes('awkward') || n.includes('doubt') || n.includes('confus')) return 'bg-purple-50 text-purple-800';
    return 'bg-gray-50 text-gray-800';
  })();
  return <span className={`px-2 py-0.5 rounded text-xs ${palette}`}>{top}</span>
}

export default function VoiceSessionDetail({ params }: { params: { chatId: string } }) {
  const { chatId } = params;
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${base}/voice/sessions/${encodeURIComponent(chatId)}`);
        const j = await r.json();
        if (r.ok) setData(j);
      } finally {
        setLoading(false);
      }
    })();
  }, [chatId]);

  async function doExport() {
    setWorking('export');
    try {
      const r = await fetch(`${base}/voice/export/${encodeURIComponent(chatId)}`);
      const j = await r.json();
      const blob = new Blob([JSON.stringify(j, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `voice-session-${chatId}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setWorking(null);
    }
  }

  async function doDelete() {
    if (!confirm('Delete this session and audio?')) return;
    setWorking('delete');
    try {
      const r = await fetch(`${base}/voice/sessions/${encodeURIComponent(chatId)}`, { method: 'DELETE' });
      if (r.ok) window.location.href = '/dashboard/voice-sessions';
    } finally {
      setWorking(null);
    }
  }

  function toCsv() {
    const rows = [
      ['timestamp','role','text','top_emotion'] as string[],
      ...((data?.messages || []) as Message[]).map((m) => {
        const scores = (m.models as any)?.prosody?.scores as Record<string,number>|undefined;
        const top = scores ? Object.entries(scores).sort((a,b)=>b[1]-a[1])[0]?.[0] : '';
        return [new Date(m.received_at).toISOString(), m.role, (m.content||'').replace(/\n/g,' '), top];
      })
    ];
    return rows.map(r => r.map(v => '"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
  }

  function downloadCsv() {
    const blob = new Blob([toCsv()], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voice-session-${chatId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) return <div className="p-6">Loading…</div>;
  if (!data) return <div className="p-6">Not found.</div>;
  const { session, messages, prosody, clips } = data as { session: any, messages: Message[], prosody: Prosody[], clips: Clip[] };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Chat ID</div>
          <div className="font-mono text-xs">{chatId}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={doExport} disabled={working==="export"} className="px-3 py-1.5 rounded border">{working==="export"?"Exporting...":"Export JSON"}</button>
          <button onClick={downloadCsv} className="px-3 py-1.5 rounded border">Export CSV</button>
          <button onClick={doDelete} disabled={working==="delete"} className="px-3 py-1.5 rounded bg-rose-600 text-white">{working==="delete"?"Deleting…":"Delete"}</button>
          <Link href="/dashboard/voice-sessions" className="px-3 py-1.5 rounded border">Back</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded border p-4">
          <div className="text-gray-700 font-medium mb-3">Emotion Timeline</div>
          <EmotionTimeline prosody={(data?.prosody||[]) as Prosody[]} />
        </div>
        <div className="md:col-span-2 rounded border p-4">
          <div className="text-gray-700 font-medium mb-3">Transcript</div>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {messages.map((m) => (
              <div key={m.id} className="text-sm">
                <span className="inline-block px-2 py-1 rounded bg-gray-100 mr-2 text-xs capitalize">{m.role}</span>
                <EmotionChip scores={(m.models as any)?.prosody?.scores} />
                <span className="ml-2 whitespace-pre-wrap">{m.content}</span>
                {m.interim && <span className="text-xs text-gray-500"> (interim)</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded border p-4">
          <div className="text-gray-700 font-medium mb-3">Audio Clips</div>
          <div className="space-y-2">
            {clips.length === 0 ? <div className="text-sm text-gray-500">No audio archived.</div> : clips.map((c) => (
              <div key={c.id} className="space-y-1">
                <div className="text-xs text-gray-500">{c.clip_id} · {new Date(c.created_at).toLocaleTimeString()}</div>
                <audio controls src={c.storage_url} className="w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmotionTimeline({ prosody }: { prosody: Prosody[] }) {
  // compress to top-emotion stripes
  const bands = useMemo(() => {
    const arr = prosody.map(p => {
      const scores = p.scores || {};
      const top = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'neutral';
      return { t: new Date(p.created_at).getTime(), top };
    });
    return arr;
  }, [prosody]);

  const color = (name: string) => {
    const n = (name||'').toLowerCase();
    if (n.includes('joy') || n.includes('amusement')) return '#facc15';
    if (n.includes('confid') || n.includes('realization')) return '#10b981';
    if (n.includes('sad') || n.includes('sorrow')) return '#3b82f6';
    if (n.includes('anger') || n.includes('annoy')) return '#f43f5e';
    if (n.includes('fear') || n.includes('anxiety')) return '#6366f1';
    if (n.includes('awkward') || n.includes('doubt') || n.includes('confus')) return '#8b5cf6';
    return '#9ca3af';
  };

  if (bands.length === 0) return <div className="text-sm text-gray-500">No prosody data.</div>;
  const width = 600, height = 24;
  const minT = Math.min(...bands.map(b => b.t));
  const maxT = Math.max(...bands.map(b => b.t));
  const span = Math.max(1, maxT - minT);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} className="rounded border">
      {bands.map((b, i) => {
        const x = Math.floor(((b.t - minT) / span) * width);
        const next = bands[i+1];
        const x2 = next ? Math.floor(((next.t - minT) / span) * width) : width;
        const w = Math.max(1, x2 - x);
        return <rect key={i} x={x} y={0} width={w} height={height} fill={color(b.top)} />;
      })}
    </svg>
  );
}
