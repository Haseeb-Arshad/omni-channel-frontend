"use client";

import { useMemo, useState, useEffect } from "react";
import styles from "./home.module.css";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Languages,
  MessageSquareText,
  Mic,
  Pause,
  Phone,
  Play,
  Shield,
  Sparkles,
  ToggleLeft,
  UserSquare2,
  Volume2,
  Wifi,
} from "lucide-react";

// Lightweight CountUp without deps
function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(Math.round(target * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

export default function DashboardHome() {
  // Top bar filters
  const [range, setRange] = useState("Today");
  const [channel, setChannel] = useState("All channels");
  const [lang, setLang] = useState("All languages");
  const [env, setEnv] = useState<"Sandbox" | "Live">("Sandbox");

  // Setup progress state
  const [steps, setSteps] = useState([true, false, false, false, false]);
  const progress = Math.round((steps.filter(Boolean).length / 5) * 100);

  // Toggles
  const [retainTranscripts, setRetainTranscripts] = useState(false);
  const [useForImprovements, setUseForImprovements] = useState(false);

  const messages = useCountUp(1250, 1000);
  const minutes = useCountUp(87, 1000);
  const storage = useCountUp(4, 1000);

  return (
    <div className={styles.shell}>
      {/* Subtle tall gradient bands background */}
      <div className={styles.bands} aria-hidden="true" />

      {/* Top bar */}
      <header className={styles.topbar}>
        <div>
          <h1 className={styles.welcome}>Welcome, Alice</h1>
          <div className={styles.planPills}>
            <span className={styles.plan}>Solo • Starter</span>
            <span className={styles.pill}>{messages.toLocaleString()} Messages</span>
            <span className={styles.pill}>{minutes} Minutes</span>
            <span className={styles.pill}>{storage} GB Storage</span>
          </div>
        </div>
        <div className={styles.filters}>
          <button className={styles.filter} aria-label="Time range">
            {range} <ChevronDown size={14} />
          </button>
          <button className={styles.filter} aria-label="Channel">
            {channel} <ChevronDown size={14} />
          </button>
          <button className={styles.filter} aria-label="Language">
            {lang} <ChevronDown size={14} />
          </button>
          <button className={styles.filter} aria-label="Environment" onClick={() => setEnv(env === "Sandbox" ? "Live" : "Sandbox")}
            data-env={env}
          >
            {env} <ChevronDown size={14} />
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className={styles.grid}>
        {/* Setup Progress */}
        <section className={styles.cardWide}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Setup Progress</h2>
            <span className={styles.progressMeta}>{progress}%</span>
          </div>

          <div className={styles.progressWrap}>
            <svg className={styles.ring} viewBox="0 0 36 36" aria-hidden>
              <path className={styles.ringTrack} d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32" />
              <path className={styles.ringFill} strokeDasharray={`${progress},100`} d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32" />
              <text x="18" y="20.5" className={styles.ringLabel}>{progress}%</text>
            </svg>

            <ol className={styles.checklist}>
              {[
                { label: "Connect your first channel", sub: "WhatsApp, Email, Web, Voice" },
                { label: "Create an Agent", sub: "Persona, tone, guardrails" },
                { label: "Add Knowledge", sub: "Docs, site, FAQs" },
                { label: "Pick a Voice", sub: "Warm, clear, natural" },
                { label: "Test in Playground + Publish", sub: "Try flows and go live" },
              ].map((item, i) => (
                <li key={i} className={styles.step}>
                  <button
                    className={styles.stepBtn}
                    aria-pressed={steps[i]}
                    onClick={() => setSteps((s) => s.map((v, idx) => (idx === i ? !v : v)))}
                  >
                    <span className={styles.stepIcon} aria-hidden>
                      {steps[i] ? <CheckCircle2 size={16} /> : <span className={styles.hairDot} />}
                    </span>
                    <div>
                      <div className={styles.stepTitle}>{item.label}</div>
                      <div className={styles.stepSub}>{item.sub}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ol>

            <div className={styles.ctaCol}>
              <p className={styles.benefit}>A few minutes to publish a helpful, compliant agent across your channels.</p>
              <button className={styles.primary}>Continue setup</button>
            </div>
          </div>
        </section>

        {/* Quick Test */}
        <section className={styles.cardTall}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Quick Test</h2>
          </div>
          <div className={styles.testTabs} role="tablist" aria-label="Quick Test">
            <button className={`${styles.tab} ${styles.tabActive}`} role="tab" aria-selected="true">
              <MessageSquareText size={16} /> Chat
            </button>
            <button className={styles.tab} role="tab" aria-selected="false">
              <Mic size={16} /> Voice
            </button>
          </div>
          <div className={styles.playground}>
            <div className={styles.promptRow}>
              <input className={styles.input} placeholder="Try: Track my order" />
              <button className={styles.ghost}>Send</button>
            </div>
            <div className={styles.presetRow}>
              <button className={styles.preset}>Track my order</button>
              <button className={styles.preset}>Reschedule delivery</button>
            </div>
            <div className={styles.convo}>
              <div className={styles.bubbleYou}>"Can you check my order status?"</div>
              <div className={styles.bubbleAgent}>Sure—what's your order ID?</div>
            </div>
            <div className={styles.playActions}>
              <button className={styles.secondary}>Save as Playbook</button>
            </div>
          </div>
        </section>

        {/* My Agents */}
        <section className={styles.cardTall}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>My Agent(s)</h2>
          </div>
          <div className={styles.agentList}>
            {[
              { name: "Support", status: "Draft", persona: "Warm, practical helper", langs: "EN, ES", chans: ["Email", "Chat"], live: false },
              { name: "Sales", status: "Live", persona: "Concise booking assistant", langs: "EN", chans: ["WhatsApp", "Web"], live: true },
              { name: "Booking", status: "Live", persona: "Schedules and reminders", langs: "EN, DE", chans: ["Voice"], live: true },
            ].map((a, idx) => (
              <article key={idx} className={styles.agentCard}>
                <div className={styles.agentTop}>
                  <div className={styles.agentTitle}><UserSquare2 size={16} /> {a.name}</div>
                  <span className={a.live ? styles.badgeLive : styles.badgeDraft}>{a.live ? "Live" : "Draft"}</span>
                </div>
                <p className={styles.agentMeta}>{a.persona}</p>
                <div className={styles.agentChips}>
                  <span className={styles.chip}><Languages size={14} /> {a.langs}</span>
                  {a.chans.map((c) => (
                    <span key={c} className={styles.chip}>{c}</span>
                  ))}
                </div>
                <div className={styles.agentActions}>
                  <button className={styles.ghost}>Edit</button>
                  <button className={styles.ghost}>Preview</button>
                  {a.live ? (
                    <button className={styles.secondary}>Take Offline</button>
                  ) : (
                    <button className={styles.primaryAlt}>Go Live</button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* My Channels */}
        <section className={styles.cardTall}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>My Channels</h2>
          </div>
          <ul className={styles.channelList}>
            {[
              { name: "WhatsApp", status: "Connected", last: "2m ago", icon: <Phone size={16} /> },
              { name: "Email", status: "Connected", last: "Yesterday", icon: <MessageSquareText size={16} /> },
              { name: "Voice", status: "Pending", last: "—", icon: <Volume2 size={16} /> },
              { name: "Web Chat", status: "Connected", last: "3h ago", icon: <Wifi size={16} /> },
            ].map((c, i) => (
              <li key={i} className={styles.channelItem}>
                <div className={styles.channelLeft}>
                  <span className={styles.channelIcon}>{c.icon}</span>
                  <div>
                    <div className={styles.channelName}>{c.name}</div>
                    <div className={styles.channelSub}>Last message {c.last}</div>
                  </div>
                </div>
                <div className={styles.channelRight}>
                  <span className={c.status === "Connected" ? styles.statusOk : styles.statusPending}>{c.status}</span>
                  <button className={styles.ghost}>Configure</button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.inlineTip}>
            <button className={styles.secondary}><Phone size={14} /> Buy a number</button>
          </div>
        </section>

        {/* Knowledge at a Glance */}
        <section className={styles.cardTall}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Knowledge at a Glance</h2>
          </div>
          <div className={styles.knowledgeRow}>
            <div className={styles.knowledgeStat}><span className={styles.big}>{12}</span> Sources</div>
            <div className={styles.knowledgeStat}>Last sync 2 hours ago</div>
          </div>
          <div className={styles.knowledgeActions}>
            <button className={styles.primaryAlt}>Add document</button>
            <button className={styles.secondary}>Import site</button>
            <button className={styles.ghost}>Open Knowledge</button>
          </div>
          <p className={styles.tip}><Sparkles size={14} /> Tip: Short, well-titled docs answer best.</p>
        </section>

        {/* Recent Conversations */}
        <section className={styles.cardTall}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Recent Conversations</h2>
          </div>
          <ul className={styles.threadList}>
            {[
              { who: "Connections", when: "2m", action: "Reply" },
              { who: "Contact – Fergus", when: "Aug", action: "Open" },
              { who: "Confirmation", when: "5h", action: "View" },
              { who: "Support", when: "Yesterday", action: "Resume" },
              { who: "Inbound – Site", when: "Mon", action: "Open" },
            ].map((t, i) => (
              <li key={i} className={styles.threadItem}>
                <div>
                  <div className={styles.threadTitle}>{t.who}</div>
                  <div className={styles.threadSub}>{t.when} ago</div>
                </div>
                <button className={styles.ghost}>{t.action}</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Suggested Templates */}
        <section className={styles.cardTall}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Suggested Templates</h2>
          </div>
          <div className={styles.templateGrid}>
            {[
              { title: "Return workflow", sub: "status" },
              { title: "Appointment booking", sub: "" },
              { title: "Shipping status", sub: "" },
              { title: "Use conversations to improve", sub: "responses" },
            ].map((t, i) => (
              <button key={i} className={styles.templateCard}>
                <span className={styles.templateTitle}>{t.title}</span>
                {t.sub && <span className={styles.templateSub}>{t.sub}</span>}
                <ChevronRight size={16} className={styles.templateIcon} />
              </button>
            ))}
          </div>
        </section>

        {/* Trust & Controls */}
        <section className={styles.cardTall}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Trust & Controls</h2>
          </div>
          <div className={styles.toggles}>
            <label className={styles.toggle}>
              <input type="checkbox" checked={retainTranscripts} onChange={(e) => setRetainTranscripts(e.target.checked)} />
              <span>
                <strong>Retain transcripts</strong>
                <em>Store conversations for review</em>
              </span>
            </label>
            <label className={styles.toggle}>
              <input type="checkbox" checked={useForImprovements} onChange={(e) => setUseForImprovements(e.target.checked)} />
              <span>
                <strong>Use conversations to improve responses</strong>
                <em>Help tune your agent on-device</em>
              </span>
            </label>
            <div className={styles.policyRow}>
              <Shield size={16} /> Policies
            </div>
          </div>
        </section>
      </main>

      {/* Footer Quick Bar */}
      <footer className={styles.quickBar}>
        <button className={styles.ghost}><Wifi size={16} /> Add Channel</button>
        <button className={styles.ghost}><UserSquare2 size={16} /> Create Agent</button>
        <button className={styles.ghost}><Sparkles size={16} /> Add Knowledge</button>
        <button className={styles.ghost}><MessageSquareText size={16} /> Open Playground</button>
        <button className={styles.ghost}><Phone size={16} /> Buy Voice Number</button>
      </footer>
    </div>
  );
}
