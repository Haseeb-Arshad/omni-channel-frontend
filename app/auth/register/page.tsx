"use client";

import { useMemo, useState, FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import "@/app/auth/auth-styles.css";
import { Mail, User, Lock, Eye, EyeOff, Building2, Globe2, Clock4, CheckCircle2, AlertCircle, Loader2, Sparkles, BookOpen, ShieldCheck } from "lucide-react";

type Track = "individual" | "business";

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s; // 0-4
}

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const params = useSearchParams();
  const invite = !!params.get("invite");

  const [email, setEmail] = useState<string>(params.get("email") || "");
  const [step, setStep] = useState<"email" | "track" | "form" | "workspace" | "done">(invite ? "track" : "email");
  const [track, setTrack] = useState<Track>("individual");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Individual form
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("United States");
  const [tz, setTz] = useState("America/New_York");
  const [consent, setConsent] = useState(false);

  // Business form
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("Owner");
  const [teamSize, setTeamSize] = useState("1-10");
  const [useCase, setUseCase] = useState<string[]>([]);
  const [bizConsent, setBizConsent] = useState({ updates: true, dpa: true });

  const domain = useMemo(() => email.split("@")[1]?.toLowerCase() || "", [email]);
  const hasKnownWorkspace = ["acme.com", "contoso.com", "example.com"].includes(domain);
  const workspaces = hasKnownWorkspace ? [
    { id: "acme-1", name: "Acme Support", members: 24, slug: "acme-support" },
    { id: "acme-2", name: "Acme Sales", members: 17, slug: "acme-sales" },
  ] : [];
  const newSlug = (company || domain.replace(/\..*$/, "")).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email || !password || !name) {
      setError("Please complete all required fields");
      return;
    }
    const ok = await register(email, password, name);
    if (!ok) {
      setError("Could not create your account. Try again.");
      return;
    }
    setStep("done");
  }

  const StrengthBar = ({ v }: { v: number }) => (
    <div className="strength-bar">
      <div className={`strength-bar-fill ${v <= 1 ? "strength-weak" : v <= 3 ? "strength-medium" : "strength-strong"}`} />
    </div>
  );

  if (step === "done") {
    return (
      <div className="auth-page auth-container">
        <main className="relative z-10 grid place-items-center px-4 py-10">
          <section className="w-full max-w-2xl auth-card p-8 md:p-10">
            <div className="flex items-center gap-3 text-primary"><CheckCircle2 className="h-5 w-5"/><h1 className="text-2xl md:text-3xl">Welcome aboard</h1></div>
            <p className="mt-2 text-sm text-muted">Here's a tiny playground to try your new agent.</p>
            <div className="mt-6 rounded-xl border bg-white/80 p-4" style={{ borderColor: "rgba(31,29,27,0.12)" }}>
              <div className="text-xs mb-2 text-muted">Sample prompt</div>
              <div className="rounded-lg border p-3 bg-white flex items-center justify-between" style={{ borderColor: "rgba(31,29,27,0.12)" }}>
                <span className="text-primary">Summarize today's inbound from Facebook in 3 bullets.</span>
                <button className="ml-3 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs hover:opacity-90 text-primary" style={{ borderColor: "rgba(31,29,27,0.2)" }}><Sparkles className="h-3.5 w-3.5"/> Hear this voice</button>
              </div>
              <div className="mt-3 text-sm text-muted">• 12 conversations • avg response 28s • satisfaction 4.7</div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/dashboard" className="rounded-md px-4 py-2 text-sm text-white hover:translate-y-[-2px] transition" style={{ background: "#1F1D1B" }}>Create first agent</Link>
              <Link href="/dashboard" className="rounded-md border px-4 py-2 text-sm hover:opacity-90 text-primary" style={{ borderColor: "rgba(31,29,27,0.12)" }}>Connect a channel</Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="auth-page auth-container">

      <header className="relative z-10 flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-black/90 text-white grid place-items-center shadow-sm">◼︎</div>
          <span className="text-sm text-muted">OmniAgent</span>
        </div>
        <nav className="text-xs text-muted">
          Have an account? <Link href="/auth/login" className="auth-link">Sign in</Link>
        </nav>
      </header>

      <main className="relative z-10 px-4 pb-16">
        <div className="mx-auto w-full max-w-[1100px] grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Headline + Form */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-primary">Create your OmniAgent account</h1>
              <p className="mt-2 text-sm text-muted">Start free. No card required.</p>
            </div>
            <section className="w-full auth-card p-6 md:p-8">
              {error && (
                <div className="input-error mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              {step === "email" && (
                <form onSubmit={(e) => { e.preventDefault(); setStep("track"); }} className="space-y-4 animate-fade-in">
                  <div className="input-group">
                    <input 
                      id="reg-email" 
                      type="email" 
                      placeholder=" " 
                      value={email} 
                      onChange={(e)=>setEmail(e.currentTarget.value)} 
                      className="input-field"
                      autoComplete="email"
                    />
                    <Mail className="input-icon h-5 w-5"/>
                    <label htmlFor="reg-email" className="input-label">Email</label>
                  </div>
                  {invite && (
                    <p className="text-xs text-muted">Invited by <strong>Alex Rivera</strong> to <strong>Copper Works</strong>.</p>
                  )}
                  <button type="submit" className="btn-primary">Continue</button>
                </form>
              )}

              {step === "track" && (
                <div className="animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button onClick={() => { setTrack("individual"); setStep("form"); }} className="rounded-xl border p-4 text-left hover:opacity-90" style={{ borderColor: "rgba(31,29,27,0.12)", background: "rgba(255,255,255,0.7)" }}>
                      <div className="flex items-center gap-3"><User className="h-4 w-4"/><div>
                        <div className="font-medium">Individual</div>
                        <div className="text-xs" style={{ color: "#8B8580" }}>For solo use</div>
                      </div></div>
                    </button>
                    <button onClick={() => { setTrack("business"); hasKnownWorkspace ? setStep("workspace") : setStep("form"); }} className="rounded-xl border p-4 text-left hover:opacity-90" style={{ borderColor: "rgba(31,29,27,0.12)", background: "rgba(255,255,255,0.7)" }}>
                      <div className="flex items-center gap-3"><Building2 className="h-4 w-4"/><div>
                        <div className="font-medium">Business</div>
                        <div className="text-xs" style={{ color: "#8B8580" }}>Invite teammates, manage workspaces</div>
                      </div></div>
                    </button>
                  </div>
                  <p className="mt-4 text-xs text-muted">Using <strong>{email || "your email"}</strong> — {hasKnownWorkspace ? "we found workspaces on your domain." : "you can set up a workspace."}</p>
                </div>
              )}

              {step === "workspace" && track === "business" && (
                <div className="animate-fade-in">
                  <h2 className="text-lg">Choose a workspace</h2>
                  <div className="mt-3 grid grid-cols-1 gap-3">
                    {workspaces.map(w => (
                      <button key={w.id} onClick={() => setStep("form")} className="rounded-xl border p-4 text-left hover:opacity-90" style={{ borderColor: "rgba(31,29,27,0.12)", background: "rgba(255,255,255,0.7)" }}>
                        <div className="font-medium">{w.name}</div>
                        <div className="text-xs" style={{ color: "#8B8580" }}>{w.members} members • {w.slug}</div>
                      </button>
                    ))}
                    <div className="rounded-xl border border-dashed p-4" style={{ borderColor: "rgba(31,29,27,0.2)" }}>
                      <div className="text-sm" style={{ color: "#1F1D1B" }}>Create new</div>
                      <div className="mt-2 flex items-center gap-2">
                        <input value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Workspace name" className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2" style={{ borderColor: "rgba(31,29,27,0.12)" }}/>
                        <div className="text-xs" style={{ color: "#8B8580" }}>slug: <span className="font-mono">{newSlug || "your-workspace"}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button onClick={() => setStep("form")} className="rounded-md px-4 py-2 text-sm text-white hover:translate-y-[-2px] transition" style={{ background: "#A4653F" }}>Continue</button>
                  </div>
                </div>
              )}

              {step === "form" && track === "individual" && (
                <form onSubmit={submit} className="space-y-4 animate-fade-in">
                  <div className="input-group">
                    <input 
                      id="ind-name" 
                      placeholder=" " 
                      value={name} 
                      onChange={(e)=>setName(e.currentTarget.value)} 
                      className="input-field"
                      autoComplete="name"
                    />
                    <User className="input-icon h-5 w-5"/>
                    <label htmlFor="ind-name" className="input-label">Full name</label>
                  </div>
                  <div className="input-group">
                    <input 
                      id="ind-email" 
                      type="email" 
                      placeholder=" " 
                      value={email} 
                      onChange={(e)=>setEmail(e.currentTarget.value)} 
                      className="input-field"
                      autoComplete="email"
                    />
                    <Mail className="input-icon h-5 w-5"/>
                    <label htmlFor="ind-email" className="input-label">Email</label>
                  </div>
                  <div>
                    <div className="input-group">
                      <input 
                        id="ind-password" 
                        type={showPassword?"text":"password"} 
                        placeholder=" " 
                        value={password} 
                        onChange={(e)=>setPassword(e.currentTarget.value)} 
                        className="input-field with-trailing"
                        autoComplete="new-password"
                      />
                      <Lock className="input-icon h-5 w-5"/>
                      <label htmlFor="ind-password" className="input-label">Password</label>
                      <button 
                        type="button" 
                        onClick={()=>setShowPassword(s=>!s)} 
                        aria-label="Toggle password" 
                        className="input-trailing"
                      >
                        {showPassword? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                      </button>
                    </div>
                    <div className="input-hint">Use 8+ characters with a mix of letters and numbers.</div>
                    <StrengthBar v={strength(password)} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted"><Globe2 className="h-4 w-4"/></div>
                      <select value={country} onChange={(e)=>setCountry(e.target.value)} className="select-field pl-10">
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>Australia</option>
                      </select>
                    </div>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted"><Clock4 className="h-4 w-4"/></div>
                      <select value={tz} onChange={(e)=>setTz(e.target.value)} className="select-field pl-10">
                        <option>America/New_York</option>
                        <option>America/Los_Angeles</option>
                        <option>Europe/London</option>
                        <option>Asia/Singapore</option>
                      </select>
                    </div>
                  </div>
                  <label className="checkbox-wrapper mt-2">
                    <input type="checkbox" checked={consent} onChange={(e)=>setConsent(e.currentTarget.checked)} className="checkbox-input"/>
                    <span className="checkbox-label">I'd like updates and tips</span>
                  </label>
                  <button type="submit" disabled={isLoading} className="btn-primary">
                    {isLoading? <><Loader2 className="h-4 w-4 animate-spin"/> Creating…</> : "Create account"}
                  </button>
                  <p className="text-[11px] text-muted">
                    By continuing you agree to our <Link href="#" className="auth-link" style={{fontSize: "11px"}}>Terms</Link> and <Link href="#" className="auth-link" style={{fontSize: "11px"}}>Privacy</Link>.
                  </p>
                </form>
              )}

              {step === "form" && track === "business" && (
                <form onSubmit={submit} className="space-y-4 animate-fade-in">
                  <div className="input-group">
                    <input 
                      id="biz-name" 
                      placeholder=" " 
                      value={name} 
                      onChange={(e)=>setName(e.currentTarget.value)} 
                      className="input-field"
                      autoComplete="name"
                    />
                    <User className="input-icon h-5 w-5"/>
                    <label htmlFor="biz-name" className="input-label">Your name</label>
                  </div>
                  <div>
                    <div className="input-group">
                      <input 
                        id="biz-company" 
                        placeholder=" " 
                        value={company} 
                        onChange={(e)=>setCompany(e.currentTarget.value)} 
                        className="input-field"
                        autoComplete="organization"
                      />
                      <Building2 className="input-icon h-5 w-5"/>
                      <label htmlFor="biz-company" className="input-label">Company / workspace</label>
                    </div>
                    <div className="mt-1 text-[11px] text-muted">slug: <span className="font-mono">{newSlug || "your-workspace"}</span></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-muted">Role</label>
                      <select value={role} onChange={(e)=>setRole(e.target.value)} className="select-field mt-1">
                        <option>Owner</option><option>Admin</option><option>Manager</option><option>Agent</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted">Team size</label>
                      <select value={teamSize} onChange={(e)=>setTeamSize(e.target.value)} className="select-field mt-1">
                        <option>1-10</option><option>11-50</option><option>51-200</option><option>200+</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted">Intended use</label>
                      <select multiple value={useCase} onChange={(e)=>setUseCase(Array.from(e.target.selectedOptions).map(o=>o.value))} className="select-field mt-1" style={{height: "48px"}}>
                        <option>Support</option><option>Sales</option><option>IT</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-group">
                    <input 
                      id="biz-password2" 
                      type={showPassword?"text":"password"} 
                      placeholder=" " 
                      value={password} 
                      onChange={(e)=>setPassword(e.currentTarget.value)} 
                      className="input-field with-trailing"
                      autoComplete="new-password"
                    />
                    <Lock className="input-icon h-5 w-5"/>
                    <label htmlFor="biz-password2" className="input-label">Password</label>
                    <button 
                      type="button" 
                      onClick={()=>setShowPassword(s=>!s)} 
                      aria-label="Toggle password" 
                      className="input-trailing"
                    >
                      {showPassword? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="checkbox-wrapper">
                      <input type="checkbox" checked={bizConsent.updates} onChange={(e)=>setBizConsent(v=>({...v, updates:e.currentTarget.checked}))} className="checkbox-input"/>
                      <span className="checkbox-label">Send me updates</span>
                    </label>
                    <label className="checkbox-wrapper">
                      <input type="checkbox" checked={bizConsent.dpa} onChange={(e)=>setBizConsent(v=>({...v, dpa:e.currentTarget.checked}))} className="checkbox-input"/>
                      <span className="checkbox-label">I agree to DPA</span>
                    </label>
                  </div>
                  <button type="submit" disabled={isLoading} className="btn-primary">
                    {isLoading? <><Loader2 className="h-4 w-4 animate-spin"/> Creating…</> : "Create workspace"}
                  </button>
                  <p className="text-[11px] text-muted">
                    By continuing you agree to our <Link href="#" className="auth-link" style={{fontSize: "11px"}}>Terms</Link> and <Link href="#" className="auth-link" style={{fontSize: "11px"}}>Privacy</Link>.
                  </p>
                </form>
              )}
            </section>
          </div>

          {/* Right: lean trust list */}
          <aside className="lg:col-span-5 space-y-4">
            <div className="trust-card">
              <div className="flex items-center gap-2 text-primary"><CheckCircle2 className="h-4 w-4"/><h3 className="text-base font-medium">Why OmniAgent</h3></div>
              <ul className="mt-2 text-sm list-disc pl-5 text-muted">
                <li>Unified support, sales, IT</li>
                <li>Fast setup, clear controls</li>
              </ul>
            </div>
            <div className="trust-card">
              <div className="flex items-center gap-2 text-primary"><ShieldCheck className="h-4 w-4"/><h3 className="text-base font-medium">Security</h3></div>
              <p className="mt-2 text-sm text-muted">SSO & roles. Data stays yours.</p>
            </div>
            <div className="trust-card">
              <div className="flex items-center gap-2 text-primary"><BookOpen className="h-4 w-4"/><h3 className="text-base font-medium">Docs & Status</h3></div>
              <p className="mt-2 text-sm text-muted">docs.omniagent.dev • status.omniagent.dev</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
