"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { synthesizeProfileSummary } from "@/lib/profileSummary";

const HERO_IMAGE_URL = "/image.png";
type Step = "landing" | "collect-name" | "loading" | "summary";

export default function LoginPortal() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>("landing");
  const [fullName, setFullName] = useState(() => user?.name ?? "");
  const [profileSummary, setProfileSummary] = useState("");
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
    const [first] = source.split(/\s+/);
    return first || source;
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
    <div className="relative min-h-screen bg-[#050505] text-white">
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
        {step === "landing" && (
          <section className="flex flex-1 flex-col px-6 pb-16 pt-6 lg:px-12">
            <div className="grid flex-1 items-center gap-12 lg:grid-cols-12">
              <div className="relative lg:col-span-7 flex items-center justify-center">
                <div className="relative w-full max-w-3xl overflow-hidden rounded-[36px] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
                  <Image src={HERO_IMAGE_URL} alt="Cofounder hero" width={1920} height={1440} className="h-full w-full object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/55" aria-hidden="true" />
                  <div className="relative flex h-full flex-col justify-end p-10 text-white">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur ring-1 ring-white/25">
                      Cofounder
                    </span>
                    <h1 className="mt-6 text-3xl leading-tight drop-shadow-[0_6px_26px_rgba(0,0,0,0.45)] sm:text-4xl md:text-5xl">
                      Automate your life with natural language.
                    </h1>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
                <div className="w-full max-w-md text-center lg:text-left">
                  <p className="text-sm uppercase tracking-[0.4em] text-white/35">Welcome</p>
                  <h2 className="mt-3 text-4xl font-serif leading-tight sm:text-5xl">Welcome to Cofounder</h2>
                  <p className="mt-4 text-base text-white/65">
                    The first AI agent that works alongside you, with state-of-the-art memory and intelligence.
                  </p>
                  <div className="mt-10 space-y-5">
                    <Link
                      href="/auth/register"
                      className="group block w-full rounded-full bg-gradient-to-b from-white/14 via-white/8 to-white/4 ring-1 ring-white/15 px-6 py-4 text-base font-medium text-white transition-all duration-200 hover:from-white/18 hover:via-white/11 hover:to-white/6"
                    >
                      <span className="inline-flex items-center gap-3">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                          <path fill="#EA4335" d="M12 10.2v3.7h5.2c-.2 1.2-.9 2.2-1.9 2.9l3 2.3c1.8-1.7 2.8-4.1 2.8-6.9 0-.6-.1-1.2-.2-1.8H12z" />
                          <path fill="#34A853" d="M6.5 14.3l-.8.6-2.4 1.8C5.1 19.6 8.3 21 12 21c2.7 0 5-1 6.7-2.7l-3-2.3c-.8.5-1.9.8-3.7.8-3 0-5.6-2-6.5-4.6z" />
                          <path fill="#4A90E2" d="M3.3 7.7C2.5 9.5 2.5 11.5 3.3 13.3c.9 2.6 3.5 4.6 6.5 4.6 1.8 0 2.9-.3 3.7-.8V12H6.5l-.4-1.4z" />
                          <path fill="#FBBC05" d="M20.7 6.6c-1.6-2-3.9-3.3-6.7-3.3-3.7 0-6.9 2.1-8.3 5L9.8 12c.7-2 2.6-3.4 4.2-3.4 1 0 1.8.3 2.4.8l3.3-2.8z" />
                        </svg>
                        Sign up
                      </span>
                    </Link>

                    <div className="relative text-center lg:text-left">
                      <div className="absolute inset-0 flex items-center" aria-hidden>
                        <div className="w-full border-t border-white/10" />
                      </div>
                      <span className="relative inline-block bg-[#050505] px-4 text-xs uppercase tracking-[0.3em] text-white/50">
                        or
                      </span>
                    </div>

                    <Link
                      href="/auth/login"
                      className="block w-full rounded-full border border-white/12 bg-white/[0.05] px-6 py-4 text-base font-medium text-white transition hover:border-white/20 hover:bg-white/[0.08]"
                    >
                      Log in
                    </Link>

                    <button type="button" onClick={handleBegin} className={`${primaryButtonClass} w-full justify-center`}>
                      Begin
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </button>

                    <p className="text-[11px] text-white/50">
                      By signing up you agree to our <a className="underline underline-offset-2" href="#">Privacy Policy</a> and <a className="underline underline-offset-2" href="#">Terms of Service</a>.
                    </p>
                  </div>

                  <p className="mt-14 text-sm text-white/45">
                    by <a href="#" className="underline underline-offset-2">The General Intelligence Company</a>
                  </p>
                </div>
              </div>
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
              <button type="submit" className={`${primaryButtonClass} mt-8`}>
                Continue
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </form>
          </section>
        )}

        {step === "loading" && (
          <section className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
            <h2 className="text-4xl font-serif">Tell me about yourself</h2>
            <p className="max-w-md text-sm text-white/60">Getting background info for {fullName.trim() || displayName}…</p>
            <div className="flex items-center gap-3 rounded-full border border-white/12 bg-black/40 px-6 py-3 text-sm text-white/80">
              <Loader2 className="h-4 w-4 animate-spin" />
              Getting background info…
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
