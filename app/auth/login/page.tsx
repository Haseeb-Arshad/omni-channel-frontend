"use client";

import { useEffect, useMemo, useState, FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Drawer from "@/components/ui/Drawer";
import "@/app/auth/auth-styles.css";
import { Mail, Lock, Eye, EyeOff, Loader2, Apple, Shield, KeyRound, Smartphone, AlertCircle, CheckCircle2, BookOpen, ShieldCheck } from "lucide-react";
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

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const params = useSearchParams();
  const hasInvite = !!params.get("invite");
  const [email, setEmail] = useState<string>("hello@mimicdesign.co");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"email" | "password">("email");

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
    if (!ok) setError("Sign in failed. Check your details.");
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
    setShow2FA(false);
  }

  const passkeyAvailable = typeof window !== "undefined" && (window as any).PublicKeyCredential?.isUserVerifyingPlatformAuthenticatorAvailable;

  return (
    <div className="auth-page auth-container">

      <header className="relative z-10 flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-black/90 text-white grid place-items-center shadow-sm">OA</div>
          <span className="text-sm text-muted">OmniAgent</span>
        </div>
        <nav className="text-xs text-muted">
          New here? <Link href="/auth/register" className="auth-link">Create account</Link>
        </nav>
      </header>

      <main className="relative z-10 px-4 pb-16">
        <div className="mx-auto w-full max-w-[1100px] grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Headline + Form */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-primary font-terminal">Sign in to OmniAgent</h1>
              <p className="mt-2 text-sm text-muted font-rubik">Fast, secure access to your omni-channel workspace.</p>
            </div>
            <section className="w-full auth-card p-6 md:p-8">
              <form onSubmit={onSubmit}>
                {/* Email step */}
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

                {/* Password step */}
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                      <button type="button" className="social-button">
                        <Apple className="h-4 w-4"/> Apple
                      </button>
                      <button type="button" className="social-button">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path fill="currentColor" d="M21.35 11.1H12v2.9h5.38A5.85 5.85 0 0 1 12 18.85a6.85 6.85 0 1 1 0-13.7 6.5 6.5 0 0 1 4.6 1.8l2-2A9.45 9.45 0 1 0 12 21.45c5.1 0 9.35-3.6 9.35-9.35 0-.4 0-.7-.01-1z"/></svg>
                        Google
                      </button>
                      <button type="button" className="social-button">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path fill="currentColor" d="M11 3H3v8h8V3zm10 0h-8v8h8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/></svg>
                        Microsoft
                      </button>
                    </div>
                    {passkeyAvailable && (
                      <button type="button" onClick={()=>toast("Passkey flow would start here")} className="btn-secondary">
                        <KeyRound className="h-4 w-4"/> Use a passkey
                      </button>
                    )}
                  </div>
                )}
              </form>
              <p className="mt-4 text-[11px] text-muted">
                By continuing you agree to our <Link href="#" className="auth-link" style={{fontSize: "11px"}}>Terms</Link> and <Link href="#" className="auth-link" style={{fontSize: "11px"}}>Privacy</Link>.
              </p>
            </section>
          </div>

          {/* Right: Trust list (lean, no glass) */}
          <aside className="lg:col-span-5 space-y-4">
            <div className="trust-card">
              <div className="flex items-center gap-2 text-primary"><CheckCircle2 className="h-4 w-4"/><h3 className="text-base font-medium font-terminal">Why OmniAgent</h3></div>
              <ul className="mt-2 text-sm list-disc pl-5 text-muted">
                <li>Resolve faster across channels</li>
                <li>AI assist everywhere you work</li>
              </ul>
            </div>
            <div className="trust-card">
              <div className="flex items-center gap-2 text-primary"><ShieldCheck className="h-4 w-4"/><h3 className="text-base font-medium font-terminal">Security</h3></div>
              <p className="mt-2 text-sm text-muted">SSO, least‑privilege roles, SOC 2‑aligned.</p>
            </div>
            <div className="trust-card">
              <div className="flex items-center gap-2 text-primary"><BookOpen className="h-4 w-4"/><h3 className="text-base font-medium font-terminal">Docs & Status</h3></div>
              <p className="mt-2 text-sm text-muted">docs.omniagent.dev • status.omniagent.dev</p>
            </div>
          </aside>
        </div>
      </main>

      {/* Magic link drawer */}
      <Drawer open={showMagicDrawer} onClose={() => setShowMagicDrawer(false)} title="Magic link sent" side="bottom" ariaDescriptionId="magic-desc">
        <p id="magic-desc" className="text-sm text-stone-700">We emailed a sign-in link to <strong>{email || "your address"}</strong>. It expires in 15 minutes.</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-stone-600">
          <button className="underline underline-offset-2">Open mail app</button>
          <span aria-hidden>•</span>
          <button className="underline underline-offset-2">Resend in 30s</button>
        </div>
        <div aria-live="polite" className="sr-only">Magic link sent</div>
      </Drawer>

      {/* 2FA drawer */}
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
    </div>
  );
}
