"use client";

import Link from "next/link";
import Image from "next/image";

export default function LoginPortal() {
  return (
    <div className="min-h-screen bg-black text-white grid lg:grid-cols-12">
      {/* Left: immersive hero using provided image */}
      <div className="relative lg:col-span-7 px-6 py-10 flex items-center justify-center">
        <div className="w-full max-w-3xl aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0">
            <Image src="/image.png" alt="Cofounder hero" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/0" />
          </div>
          <div className="relative h-full w-full p-8 sm:p-10 flex flex-col justify-end text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-md ring-1 ring-white/20 w-fit mb-4">
              <span className="text-sm">Cofounder</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
              Automate your life with natural language.
            </h1>
          </div>
        </div>
      </div>

      {/* Right: brand + primary actions */}
      <div className="lg:col-span-5 px-6 py-16 flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-medium tracking-tight">Cofounder</div>
            <p className="mt-2 text-sm text-white/60">Automate your life.</p>
          </div>

          <div className="mt-8 space-y-5">
            <Link
              href="/auth/register"
              className="group block w-full rounded-2xl bg-gradient-to-b from-white/10 to-white/5 ring-1 ring-white/15 px-5 py-4 text-base font-medium text-white hover:from-white/14 hover:to-white/8 transition-all duration-200"
            >
              <span className="inline-flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden><path fill="currentColor" d="M21.35 11.1H12v2.9h5.38A5.85 5.85 0 0 1 12 18.85a6.85 6.85 0 1 1 0-13.7 6.5 6.5 0 0 1 4.6 1.8l2-2A9.45 9.45 0 1 0 12 21.45c5.1 0 9.35-3.6 9.35-9.35 0-.4 0-.7-.01-1z"/></svg>
                Sign up
              </span>
            </Link>

            <div className="relative text-center">
              <div className="absolute inset-0 flex items-center" aria-hidden>
                <div className="w-full border-t border-white/10" />
              </div>
              <span className="relative bg-black px-3 text-xs text-white/50">or</span>
            </div>

            <Link
              href="/auth/login"
              className="block w-full rounded-2xl bg-white/5 ring-1 ring-white/10 px-5 py-4 text-base font-medium text-white hover:bg-white/7 transition-all duration-200"
            >
              Log in
            </Link>

            <p className="text-[11px] text-white/50 text-center">
              By signing up you agree to our <a className="underline underline-offset-2" href="#">Privacy Policy</a> and <a className="underline underline-offset-2" href="#">Terms of Service</a>.
            </p>
          </div>

          <div className="mt-20 text-center text-sm text-white/50">
            by <a href="#" className="underline underline-offset-2">The General Intelligence Company</a>
          </div>
        </div>
      </div>
    </div>
  );
}
