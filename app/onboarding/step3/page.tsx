"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { synthesizeProfileSummary } from "@/lib/profileSummary";

export default function OnboardingStep3() {
  const { isAuthenticated, logout, user } = useAuth();
  const router = useRouter();
  const [profileSummary, setProfileSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");

  const displayName = useMemo(() => {
    const source = fullName.trim() || user?.name?.trim() || "Explorer";
    const [first] = source.split(/\s+/);
    return first || source;
  }, [fullName, user?.name]);

  const primaryButtonClass =
    "group inline-flex items-center justify-center gap-2 rounded-full border border-[#3d362d] bg-gradient-to-b from-[#2c231c] via-[#1a1612] to-[#0d0b09] px-8 py-3 text-base font-medium text-white shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_32px_80px_rgba(0,0,0,0.65)] focus:outline-none focus:ring-2 focus:ring-[#f2d594]/40";

  const secondaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20";

  useEffect(() => {
    const fetchProfileSummary = async () => {
      // Get the name from localStorage or user context
      const storedName = localStorage.getItem('onboarding-name') || user?.name || "";
      setFullName(storedName);

      if (!storedName) {
        router.push("/onboarding/step2");
        return;
      }

      setLoading(true);
      
      try {
        // Try to fetch from the API first
        const response = await fetch("/api/profile-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: storedName }),
        });
        
        let summary = "";
        if (response.ok) {
          const payload = await response.json();
          summary = payload?.summary || synthesizeProfileSummary(storedName);
        } else {
          summary = synthesizeProfileSummary(storedName);
        }
        
        // Add a minimum loading time for better UX
        const started = performance.now();
        const elapsed = performance.now() - started;
        if (elapsed < 900) {
          await new Promise((resolve) => setTimeout(resolve, 900 - elapsed));
        }
        
        setProfileSummary(summary);
      } catch (error) {
        console.warn("Falling back to synthetic profile summary", error);
        setProfileSummary(synthesizeProfileSummary(storedName));
      } finally {
        setLoading(false);
      }
    };

    fetchProfileSummary();
  }, [user?.name, router]);

  const handleContinue = () => {
    // Clean up localStorage
    localStorage.removeItem('onboarding-name');
    router.push("/dashboard/home");
  };

  const handleEdit = () => {
    router.push("/onboarding/step2");
  };

  if (loading) {
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
          <section className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
            <h2 className="text-4xl font-serif">Tell me about yourself</h2>
            <p className="max-w-md text-sm text-white/60">Getting background info for {fullName.trim() || displayName}…</p>
            <div className="flex items-center gap-3 rounded-full border border-white/12 bg-black/40 px-6 py-3 text-sm text-white/80">
              <Loader2 className="h-4 w-4 animate-spin" />
              Getting background info…
            </div>
          </section>
        </main>
      </div>
    );
  }

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
        <section className="flex flex-1 flex-col items-center justify-center px-6 py-16">
          <div className="w-full max-w-3xl text-center">
            <h2 className="text-4xl font-serif">Here's what I found out about you</h2>
            <div className="mt-10 rounded-3xl border border-white/12 bg-black/35 p-8 text-left text-base leading-relaxed text-white/80 shadow-[0_32px_90px_rgba(0,0,0,0.55)] backdrop-blur">
              <div className="whitespace-pre-line">{profileSummary || synthesizeProfileSummary(fullName.trim() || displayName)}</div>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button type="button" className={secondaryButtonClass} onClick={handleEdit}>
                Edit
              </button>
              <button type="button" className={primaryButtonClass} onClick={handleContinue}>
                Continue
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}