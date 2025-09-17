"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { synthesizeProfileSummary } from "@/lib/profileSummary";

const CARD_IMAGE_URL = "https://images.unsplash.com/photo-1526481280695-3c469b505f29?auto=format&fit=crop&w=1200&q=80";
const CARD_FOOTER_LINES = [
  "and the universe said I love you",
  "and the universe said you have played the game well",
];

type Step = "intro" | "collect-name" | "loading" | "summary";

export default function Home() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>("intro");
  const [fullName, setFullName] = useState(() => user?.name ?? "");
  const [profileSummary, setProfileSummary] = useState<string>("");
  const [inputError, setInputError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user?.name && !fullName) {
      setFullName(user.name);
    }
  }, [user?.name, fullName]);

  useEffect(() => {
    if (step === "collect-name") {
      const id = requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          if (inputRef.current.value) {
            inputRef.current.select();
          }
        }
      });
      return () => cancelAnimationFrame(id);
    }
    return undefined;
  }, [step]);

  const displayName = useMemo(() => {
    const source = fullName.trim() || user?.name?.trim() || "Explorer";
    const parts = source.split(/\s+/);
    return parts[0] || source;
  }, [fullName, user?.name]);

  const primaryButtonClass =
    "group inline-flex items-center justify-center gap-2 rounded-full border border-[#3d362d] bg-gradient-to-b from-[#2c231c] via-[#1a1612] to-[#0d0b09] px-8 py-3 text-base font-medium text-white shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_32px_80px_rgba(0,0,0,0.65)] focus:outline-none focus:ring-2 focus:ring-[#f2d594]/40";

  const secondaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20";

  const handleBegin = () => {
    setStep("collect-name");
  };

  const fetchProfileSummary = async (name: string) => {
    try {
      const response = await fetch("/api/profile-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        const payload = await response.json();
        if (payload?.summary) {
          return String(payload.summary);
        }
      }
    } catch (error) {
      console.warn("Falling back to synthetic profile summary", error);
    }
    return synthesizeProfileSummary(name);
  };

  const handleNameSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = fullName.trim();
    if (!trimmed) {
      setInputError("Please share your name so Cofounder knows what to call you.");
      inputRef.current?.focus();
      return;
    }

    setInputError(null);
    setStep("loading");

    const started = performance.now();
    const summary = await fetchProfileSummary(trimmed);
    const elapsed = performance.now() - started;
    if (elapsed < 900) {
      await new Promise((resolve) => setTimeout(resolve, 900 - elapsed));
    }

    setProfileSummary(summary);
    setStep("summary");
  };

  const handleContinue = () => {
    router.push("/dashboard/home");
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#050505] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08)_0%,_rgba(5,5,5,0.94)_56%,_rgba(5,5,5,1)_100%)]"
        aria-hidden="true"
      />

      <header className="relative z-10 flex items-center justify-between px-8 py-6 text-sm">
        {isAuthenticated ? (
          <button
            type="button"
            onClick={logout}
            className="text-white/70 transition hover:text-white"
          >
            Log out
          </button>
        ) : (
          <Link href="/auth/login" className="text-white/70 transition hover:text-white">
            Log in
          </Link>
        )}
        <span className="text-xs uppercase tracking-[0.35em] text-white/20">Cofounder</span>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        {step === "intro" && (
          <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-12 px-6 pb-16 pt-10 lg:flex-row lg:items-center lg:gap-20">
            <div className="relative w-full max-w-sm overflow-hidden rounded-[36px] border border-white/12 bg-[#0c120f] shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(" + CARD_IMAGE_URL + ")" }} aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/65" aria-hidden="true" />
              <div className="relative flex h-full flex-col justify-between p-8">
                <div className="text-sm font-medium tracking-wide text-white/90">{displayName}</div>
                <div className="space-y-1 text-xs text-white/75">
                  {CARD_FOOTER_LINES.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-xl text-center lg:text-left">
              <p className="text-xs uppercase tracking-[0.45em] text-white/35">Welcome</p>
              <h1 className="mt-4 text-4xl font-serif leading-tight sm:text-5xl">Welcome to Cofounder</h1>
              <p className="mt-4 max-w-lg text-base text-white/70">
                The first AI agent that works alongside you, with state-of-the-art memory and intelligence.
              </p>
              <button type="button" onClick={handleBegin} className={[primaryButtonClass, "mt-10"].join(" ")}>
                Begin
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </div>
          </section>
        )}

        {step === "collect-name" && (
          <section className="flex flex-1 items-center justify-center px-6 py-16">
            <form onSubmit={handleNameSubmit} className="w-full max-w-2xl text-center">
              <h2 className="text-4xl font-serif">Tell me about yourself</h2>
              <p className="mt-4 text-sm text-white/60">What's your full name?</p>
              <div className="mt-10">
                <input
                  ref={inputRef}
                  value={fullName}
                  onChange={(event) => setFullName(event.currentTarget.value)}
                  type="text"
                  placeholder="What's your full name?"
                  className="w-full rounded-full border border-white/12 bg-black/40 px-6 py-4 text-lg text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#f2d594]/40"
                />
                {inputError && <p className="mt-3 text-sm text-[#f3c28f]">{inputError}</p>}
              </div>
              <button type="submit" className={[primaryButtonClass, "mt-8"].join(" ")}>
                Continue
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </form>
          </section>
        )}

        {step === "loading" && (
          <section className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
            <h2 className="text-4xl font-serif">Tell me about yourself</h2>
            <p className="max-w-md text-sm text-white/60">Getting background info for {fullName.trim() || displayName}...</p>
            <div className="flex items-center gap-3 rounded-full border border-white/12 bg-black/40 px-6 py-3 text-sm text-white/80">
              <Loader2 className="h-4 w-4 animate-spin" />
              Getting background info...
            </div>
          </section>
        )}

        {step === "summary" && (
          <section className="flex flex-1 flex-col items-center justify-center px-6 py-16">
            <div className="w-full max-w-3xl text-center">
              <h2 className="text-4xl font-serif">Here's what I found out about you</h2>
              <div className="mt-10 rounded-3xl border border-white/12 bg-black/35 p-8 text-left text-base leading-relaxed text-white/80 shadow-[0_32px_90px_rgba(0,0,0,0.55)] backdrop-blur">
                <div className="whitespace-pre-line">{profileSummary || synthesizeProfileSummary(fullName.trim() || displayName)}</div>
              </div>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button type="button" className={secondaryButtonClass} onClick={() => setStep("collect-name")}>
                  Edit
                </button>
                <button type="button" className={primaryButtonClass} onClick={handleContinue}>
                  Continue
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
