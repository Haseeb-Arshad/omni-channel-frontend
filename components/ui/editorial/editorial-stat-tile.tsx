"use client";
import React from "react";

export function EditorialStatTile({ label, value, trend, className }: { label?: string; value?: string | number; trend?: 'up'|'down'|null; className?: string }) {
  const color = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-rose-600' : 'text-slate-600';
  return (
    <div className={className || "rounded-2xl border p-4 bg-white/80 backdrop-blur-sm"}>
      {label && <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>}
      <div className={`mt-1 text-2xl font-semibold ${color}`}>{value ?? '—'}</div>
    </div>
  );
}

export default EditorialStatTile;

