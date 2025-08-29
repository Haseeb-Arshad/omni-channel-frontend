"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  ariaDescriptionId?: string;
  side?: "right" | "bottom";
  children: React.ReactNode;
};

export default function Drawer({ open, onClose, title, ariaDescriptionId, side = "bottom", children }: DrawerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    // save last focused
    lastFocused.current = (document.activeElement as HTMLElement) || null;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    // focus trap basic
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = panelRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        last.focus(); e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus(); e.preventDefault();
      }
    };
    document.addEventListener("keydown", trap as any);
    // initial focus
    setTimeout(() => panelRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keydown", trap as any);
      // restore focus
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby={title ? "drawer-title" : undefined} aria-describedby={ariaDescriptionId}>
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div
        className={[
          "absolute bg-white/90 backdrop-blur-md border border-white/40 shadow-xl", 
          side === "right" ? "right-0 top-0 h-full w-[420px] max-w-[90%] animate-slide-left" : "left-0 right-0 bottom-0 w-full max-h-[80%] rounded-t-xl animate-slide-up",
        ].join(" ")}
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between p-4 border-b border-black/10">
          {title ? <h3 id="drawer-title" className="text-base font-medium tracking-tight">{title}</h3> : <span />}
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-md hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#A4653F]/40">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4 overflow-auto">{children}</div>
      </div>
    </div>,
    document.body
  );
}
