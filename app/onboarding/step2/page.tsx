"use client";

import { FormEvent, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function OnboardingStep2() {
  const { isAuthenticated, logout, user } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState(() => user?.name ?? "");
  const [inputError, setInputError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user?.name && !fullName) {
      setFullName(user.name);
    }
  }, [user?.name, fullName]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        if (inputRef.current.value) {
          inputRef.current.select();
        }
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const primaryButtonClass =
    "group inline-flex items-center justify-center gap-2 rounded-full border border-[#3d362d] bg-gradient-to-b from-[#2c231c] via-[#1a1612] to-[#0d0b09] px-8 py-3 text-base font-medium text-white shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_32px_80px_rgba(0,0,0,0.65)] focus:outline-none focus:ring-2 focus:ring-[#f2d594]/40";

  const handleNameSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = fullName.trim();
    if (!trimmed) {
      setInputError("Please share your name so Cofounder knows what to call you.");
      inputRef.current?.focus();
      return;
    }

    setInputError(null);
    
    // Store the name for step 3 - you could use context, localStorage, or pass via URL params
    localStorage.setItem('onboarding-name', trimmed);
    
    router.push("/onboarding/step3");
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
            Logout
          </button>
        ) : (
          <Link href="/auth/login" className="text-white/70 transition hover:text-white">
            Login
          </Link>
        )}
        <span className="text-xs uppercase tracking-[0.35em] text-white/20">Cofounder</span>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
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
      </main>
    </div>
  );
}