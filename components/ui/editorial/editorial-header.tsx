"use client";
import React from "react";

export function EditorialHeader({ title, subtitle, className }: { title?: string; subtitle?: string; className?: string }) {
  return (
    <div className={className || "mb-6"}>
      {title && <h2 className="text-2xl font-serif tracking-tight text-slate-800">{title}</h2>}
      {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
    </div>
  );
}

export default EditorialHeader;

