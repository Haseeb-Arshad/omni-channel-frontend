"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Drawer from "@/components/ui/Drawer";
import "@/app/auth/auth-styles.css";
import { Mail, Lock, Eye, EyeOff, Loader2, Shield, KeyRound, Smartphone, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type EmailIntel = {
  status: "existing" | "new" | "invited";
  sso?: "google" | "microsoft" | "apple";
  inviter?: { name: string; workspace: string };
};

function intelFor(email: string, invited: boolean): EmailIntel | null {
  if (!email) return null;
  const domain = email.split("@")[1]?.toLowerCase() || "";
  if (invited) return { status: "invited", inviter: { name: "Alex Rivera", workspace: "Copper Works" } };
  if (domain === "acme.com" || domain === "contoso.com") return { status: "existing", sso: "microsoft" };
  if (domain === "icloud.com" || domain === "me.com") return { status: "existing", sso: "apple" };
  if (email === "hello@mimicdesign.co" || email === "dev@example.com") return { status: "existing" };
  return { status: "new" };
}

const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80";

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
      <path fill="#EA4335" d="M12 10.2v3.7h5.2c-.2 1.2-.9 2.2-1.9 2.9l3 2.3c1.8-1.7 2.8-4.1 2.8-6.9 0-.6-.1-1.2-.2-1.8H12z" />
      <path fill="#34A853" d="M6.5 14.3l-.8.6-2.4 1.8C5.1 19.6 8.3 21 12 21c2.7 0 5-1 6.7-2.7l-3-2.3c-.8.5-1.9.8-3.7.8-3 0-5.6-2-6.5-4.6z" />
      <path fill="#4A90E2" d="M3.3 7.7C2.5 9.5 2.5 11.5 3.3 13.3c.9 2.6 3.5 4.6 6.5 4.6 1.8 0 2.9-.3 3.7-.8V12H6.5l-.4-1.4z" />
      <path fill="#FBBC05" d="M20.7 6.6c-1.6-2-3.9-3.3-6.7-3.3-3.7 0-6.9 2.1-8.3 5L9.8 12c.7-2 2.6-3.4 4.2-3.4 1 0 1.8.3 2.4.8l3.3-2.8z" />
    </svg>
  );
}

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const params = useSearchParams();
  const router = useRouter();
  const hasInvite = !!params.get("invite");
  const [email, setEmail] = useState<string>("hello@mimicdesign.co");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"email" | "password">("email");

  const [showLoginDrawer, setShowLoginDrawer] = useState(false);
  const [showMagicDrawer, setShowMagicDrawer] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [twoFA, setTwoFA] = useState("");

  const intel = useMemo(() => intelFor(email, hasInvite), [email, hasInvite]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent;
      const browser = ua.includes("Chrome") ? "Chrome" : ua.includes("Safari") ? "Safari" : "Browser";
      const hint = `${browser} • ${navigator.platform}`;
      localStorage.setItem("last-login-device", hint);
    }
  }, []);

  const deviceHint = typeof window !== "undefined" ? localStorage.getItem("last-login-device") : null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (step === "email") {
      if (!email) { setError("Enter your email to continue"); return; }
      setStep("password");
      return;
    }
    if (!password) { setError("Enter your password"); return; }
    const require2FA = email.endsWith("@acme.com") || email.includes("2fa");
    if (require2FA) { setShow2FA(true); return; }
    const ok = await login(email, password, remember);
    if (!ok) {
      setError("Sign in failed. Check your details.");
      return;
    }
    setShowLoginDrawer(false);
    router.push("/onboarding/step1");
  }

  function sendMagic() {
    if (!email) { setError("Enter an email to send a magic link"); return; }
    setShowMagicDrawer(true);
    toast.success("Magic link sent");
  }

  async function confirm2FA() {
    if (twoFA.length < 6) return;
    const ok = await login(email, password || "********", remember);
    if (!ok) setError("Sign in failed after 2FA");
    if (ok) {
      setShow2FA(false);
      setShowLoginDrawer(false);
      router.push("/onboarding/step1");
    }
  }

  const passkeyAvailable = typeof window !== "undefined" && (window as any).PublicKeyCredential?.isUserVerifyingPlatformAuthenticatorAvailable;

  return (
    <>
      <div className="relative min-h-screen bg-[#050505] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08)_0%,_rgba(5,5,5,0.95)_56%,_rgba(5,5,5,1)_100%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16">
          <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="relative overflow-hidden rounded-[32px] border border-[#1c1c1c] bg-[#0a0e1a] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }} />
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,14,26,0.2)] via-[rgba(10,14,26,0.25)] to-[rgba(10,14,26,0.55)]" />
              <div className="relative flex h-full flex-col items-center justify-center gap-6 p-10 text-center">
                <span className="inline-flex items-center rounded-full bg-white/35 px-5 py-2 text-sm font-medium tracking-wide text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur">
                  Cofounder
                </span>
                <h2 className="max-w-[19rem] text-4xl font-serif leading-snug md:max-w-[24rem] md:text-5xl">
                  Automate your life with natural language.
                </h2>
                <p className="max-w-[22rem] text-sm text-white/85">
                  Craft flows, orchestrate agents, and stay in sync without leaving chat.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
              <div className="space-y-2">
                <h1 className="font-serif text-4xl tracking-tight">Cofounder</h1>
                <p className="text-base text-[#b6b1a8]">Automate your life.</p>
              </div>
              <div className="mt-10 w-full max-w-sm space-y-4">
                <Link
                  href="/onboarding/step1"
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-[#4c463a] bg-gradient-to-b from-[#2f2620] via-[#1a1612] to-[#0d0b09] px-8 py-3 text-lg font-medium text-white shadow-[0_24px_60px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_32px_80px_rgba(0,0,0,0.65)] focus:outline-none focus:ring-2 focus:ring-[#f2d594]/40"
                >
                  <span className="absolute left-6 flex h-7 w-7 items-center justify-center rounded-full bg-white text-lg">
                    <GoogleGlyph />
                  </span>
                  <span className="pl-8">Sign up</span>
                </Link>
                <div className="flex items-center gap-3 text-sm text-[#6f6961]">
                  <span className="flex-1 border-t border-[#2a2722]" />
                  <span>or</span>
                  <span className="flex-1 border-t border-[#2a2722]" />
                </div>
                <Link
                  href="/onboarding/step1"
                  className="flex w-full items-center justify-center rounded-full border border-[#2e2b27] bg-gradient-to-b from-[#1d1a17] via-[#151311] to-[#0b0908] px-8 py-3 text-lg font-medium text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_26px_70px_rgba(0,0,0,0.6)] focus:outline-none focus:ring-2 focus:ring-[#d0c7b9]/35"
                >
                  Log in
                </Link>
              </div>
              <p className="mt-8 max-w-xs text-xs text-[#6c655c]">
                By signing up you agree to our {" "}
                <Link href="/privacy" className="underline decoration-[#9c9282] underline-offset-4 hover:text-[#d8cbb5]">
                  Privacy Policy
                </Link>{" "}
                and {" "}
                <Link href="/terms" className="underline decoration-[#9c9282] underline-offset-4 hover:text-[#d8cbb5]">
                  Terms of Service
                </Link>
                .
              </p>
              <p className="mt-12 text-xs text-[#6c655c]">
                by {" "}
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
      </div>

      <Drawer
        open={showLoginDrawer}
        onClose={() => setShowLoginDrawer(false)}
        title="Log in to Cofounder"
        side={(typeof window !== "undefined" && window.matchMedia && window.matchMedia("(min-width: 1024px)").matches) ? "right" : "bottom"}
        ariaDescriptionId="login-drawer-description"
      >
        <div className="space-y-6">
          <p id="login-drawer-description" className="text-sm text-stone-600">
            Continue with your email to access the workspace.
          </p>
          <form onSubmit={onSubmit}>
            {step === "email" && (
              <div className="space-y-4 animate-fade-in">
                <div className="input-group">
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.currentTarget.value)}
                    className="input-field"
                    placeholder=" "
                    autoComplete="email"
                  />
                  <Mail className="input-icon h-5 w-5"/>
                  <label htmlFor="email-input" className="input-label">Email</label>
                </div>
                {intel && (
                  <div className="rounded-md border px-3 py-2 text-xs flex items-center gap-2" style={{ borderColor: "rgba(31,29,27,0.06)", background: "rgba(255,255,255,0.6)", color: "var(--auth-text-primary)" }}>
                    {intel.status === "invited" ? (
                      <>
                        <Shield className="h-4 w-4"/>
                        <span>Invitation from <strong>{intel.inviter!.name}</strong> to join <strong>{intel.inviter!.workspace}</strong>.</span>
                      </>
                    ) : intel.sso ? (
                      <>
                        <KeyRound className="h-4 w-4"/>
                        <span>SSO available via {intel.sso} for this domain.</span>
                      </>
                    ) : (
                      <>
                        <Smartphone className="h-4 w-4"/>
                        <span>{intel.status === "existing" ? "We recognize this email." : "Looks new - continue to create your account."}</span>
                      </>
                    )}
                  </div>
                )}
                {error && (
                  <div className="input-error">
                    <AlertCircle className="h-4 w-4"/><span>{error}</span>
                  </div>
                )}
                <button type="submit" disabled={isLoading} className="btn-primary">
                  {isLoading ? <><Loader2 className="h-4 w-4 animate-spin"/> Continue...</> : "Continue"}
                </button>
                <div className="flex items-center justify-between text-[11px] text-muted">
                  <button type="button" onClick={sendMagic} className="auth-link" style={{fontSize: "11px"}}>Send magic link</button>
                  {deviceHint ? <span>Last used on {deviceHint}</span> : <span />}
                </div>
              </div>
            )}

            {step === "password" && (
              <div className="space-y-4 animate-fade-in">
                <div className="input-group">
                  <input
                    id="email-readonly"
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.currentTarget.value)}
                    className="input-field"
                    placeholder=" "
                    autoComplete="email"
                  />
                  <Mail className="input-icon h-5 w-5"/>
                  <label htmlFor="email-readonly" className="input-label">Email</label>
                </div>
                <div>
                  <div className="input-group">
                    <input
                      id="password-input"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e)=>setPassword(e.currentTarget.value)}
                      className="input-field with-trailing"
                      placeholder=" "
                      autoComplete="current-password"
                    />
                    <Lock className="input-icon h-5 w-5"/>
                    <label htmlFor="password-input" className="input-label">Password</label>
                    <button
                      type="button"
                      aria-label={showPassword?"Hide password":"Show password"}
                      onClick={()=>setShowPassword(s=>!s)}
                      className="input-trailing"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-muted">
                    <label className="checkbox-wrapper">
                      <input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.currentTarget.checked)} className="checkbox-input"/>
                      <span className="checkbox-label">Remember me</span>
                    </label>
                    <Link href="#" className="auth-link" style={{fontSize: "11px"}}>Forgot?</Link>
                  </div>
                </div>
                {error && (
                  <div className="input-error">
                    <AlertCircle className="h-4 w-4"/><span>{error}</span>
                  </div>
                )}
                <button type="submit" disabled={isLoading} className="btn-primary">
                  {isLoading ? <><Loader2 className="h-4 w-4 animate-spin"/> Signing in...</> : "Sign in"}
                </button>
                {passkeyAvailable && (
                  <button type="button" onClick={()=>toast("Passkey flow would start here")} className="btn-secondary">
                    <KeyRound className="h-4 w-4"/> Use a passkey
                  </button>
                )}
              </div>
            )}
          </form>
          <p className="text-[11px] text-muted">
            By continuing you agree to our <Link href="#" className="auth-link" style={{fontSize: "11px"}}>Terms</Link> and <Link href="#" className="auth-link" style={{fontSize: "11px"}}>Privacy</Link>.
          </p>
        </div>
      </Drawer>

      <Drawer open={showMagicDrawer} onClose={() => setShowMagicDrawer(false)} title="Magic link sent" side="bottom" ariaDescriptionId="magic-desc">
        <p id="magic-desc" className="text-sm text-stone-700">We emailed a sign-in link to <strong>{email || "your address"}</strong>. It expires in 15 minutes.</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-stone-600">
          <button className="underline underline-offset-2">Open mail app</button>
          <span aria-hidden>•</span>
          <button className="underline underline-offset-2">Resend in 30s</button>
        </div>
        <div aria-live="polite" className="sr-only">Magic link sent</div>
      </Drawer>

      <Drawer
        open={show2FA}
        onClose={() => setShow2FA(false)}
        title="Two-factor verification"
        side={(typeof window!=="undefined" && window.matchMedia && window.matchMedia("(min-width: 1024px)").matches) ? "right" : "bottom"}
        ariaDescriptionId="twofa-desc"
      >
        <p id="twofa-desc" className="text-sm text-stone-700">Enter the 6-digit code from your authenticator or SMS.</p>
        <div className="mt-4 grid grid-cols-6 gap-2" role="group" aria-label="One-time code">
          {Array.from({ length: 6 }).map((_, i) => (
            <input key={i} inputMode="numeric" maxLength={1} className="h-11 w-10 rounded-md border border-stone-300 text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#A4653F]/40" onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "");
              if (!v) return;
              const next = (document.querySelector(`#otp-${i+1}`) as HTMLInputElement) || null;
              setTwoFA((prev) => (prev + v).slice(0,6));
              next?.focus();
            }} id={`otp-${i}`} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-stone-600">
          <button className="underline underline-offset-2">Resend code</button>
          <button className="underline underline-offset-2">Enter backup code</button>
          <button className="underline underline-offset-2">Receive code by call</button>
        </div>
        <div className="mt-6 flex items-center gap-2">
          <button onClick={confirm2FA} className="rounded-md bg-stone-900 text-white px-4 py-2 text-sm hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A4653F]/30">Verify</button>
          <button onClick={() => setShow2FA(false)} className="text-sm text-stone-600 hover:text-stone-800">Cancel</button>
        </div>
      </Drawer>
    </>
  );
}
