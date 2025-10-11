"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const HERO_IMAGE_URL = "/image.png";

export default function OnboardingStep1() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleContinue = () => {
    router.push("/onboarding/step2");
  };

  const primaryButtonClass =
    "group inline-flex items-center justify-center gap-2 rounded-full border border-[#3d362d] bg-gradient-to-b from-[#2c231c] via-[#1a1612] to-[#0d0b09] px-8 py-3 text-base font-medium text-white shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_32px_80px_rgba(0,0,0,0.65)] focus:outline-none focus:ring-2 focus:ring-[#f2d594]/40";

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
        <section className="flex flex-1 flex-col px-6 pb-16 pt-6 lg:px-12">
          <div className="grid flex-1 items-center gap-12 lg:grid-cols-12">
            <div className="relative lg:col-span-7 flex items-center justify-center">
              <div className="relative w-full max-w-3xl overflow-hidden rounded-[36px] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
                <Image src={HERO_IMAGE_URL} alt="Cofounder hero" width={1920} height={1440} className="h-full w-full object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/55" aria-hidden="true" />
                <div className="relative flex h-full flex-col justify-end p-10 text-white">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur ring-1 ring-white/25">
                    Haseeb
                  </span>
                  <h1 className="mt-6 text-3xl leading-tight drop-shadow-[0_6px_26px_rgba(0,0,0,0.45)] sm:text-4xl md:text-5xl">
                    and the universe said I love you
                  </h1>
                  <p className="mt-2 text-sm text-white/80">
                    and the universe said you have played the game well
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
              <div className="w-full max-w-md text-center lg:text-left">
                <p className="text-sm uppercase tracking-[0.4em] text-white/35">Welcome to</p>
                <h2 className="mt-3 text-4xl font-serif leading-tight sm:text-5xl">Cofounder</h2>
                <p className="mt-4 text-base text-white/65">
                  The first AI agent that works alongside you, with state of the art memory and intelligence
                </p>
                <div className="mt-10 space-y-5">
                  <button type="button" onClick={handleContinue} className={`${primaryButtonClass} w-full justify-center`}>
                    Begin
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </button>
                </div>

                <p className="mt-8 max-w-xs text-xs text-[#6c655c]">
                  By continuing you agree to our{" "}
                  <Link href="/privacy" className="underline decoration-[#9c9282] underline-offset-4 hover:text-[#d8cbb5]">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="underline decoration-[#9c9282] underline-offset-4 hover:text-[#d8cbb5]">
                    Terms of Service
                  </Link>
                  .
                </p>

                <p className="mt-12 text-xs text-[#6c655c]">
                  by{" "}
                  <Link
                    href="https://generalintelligence.co"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-dotted underline-offset-4 hover:text-[#d8cbb5]"
                  >
                    The General Intelligence Company
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}