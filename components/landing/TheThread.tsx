import React from "react"
import '../../styling/the-thread.css'

export default function TheThread() {
  return (
    <section className="story" aria-label="The Thread — scrollytelling conversation">
      <div className="bg-bars" aria-hidden>
        {Array.from({length:8}).map((_,i)=> (<div key={i} className="bar" />))}
      </div>
      <div className="story-fade" aria-hidden></div>

      <div className="story-pin">
        {/* Left Rail */}
        <aside className="story-rail" aria-hidden>
          <div className="chapter-label">CHAPTER <span className="num">01</span></div>
          <div className="progress"><div className="progress-dot" /></div>
        </aside>

        {/* Right Stack */}
        <div className="story-stack">
          {cards.map((c, i) => (
            <article key={i} className="story-card" aria-label={c.aria}>
              <h3 className="eyebrow">{c.eyebrow}</h3>
              <h2 className="title">{c.title}</h2>
              {c.copy && <p className="copy">{c.copy}</p>}
              <div className="visual" aria-hidden>
                {c.visual}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Paste this GSAP snippet into Webflow if needed, but we keep CSS-driven base here. */}
    </section>
  )
}

const cards = [
  {
    eyebrow: 'THE PING',
    title: 'It begins anywhere.',
    copy: 'A DM at 9:02. A call at lunch. An email at midnight.',
    aria: 'Chapter 1: The Ping — a message appears',
    visual: (
      <div className="v-msg">
        <div className="bubble">“Hey—quick question.”</div>
        <div className="chips">
          <div className="chip" /><div className="chip" /><div className="chip" />
        </div>
      </div>
    )
  },
  {
    eyebrow: 'IDENTITY, UNIFIED',
    title: 'Who is this, really?',
    copy: 'One identity across numbers and handles—merged by intent and history.',
    aria: 'Chapter 2: Identity unified',
    visual: (
      <div className="v-merge">
        <div className="avatar" /><div className="avatar" /><div className="arrow" /><div className="badge">Unified profile</div>
      </div>
    )
  },
  {
    eyebrow: 'THE BRAIN',
    title: 'Grounded answers, not guesses.',
    copy: 'Unified knowledge checks freshness, resolves conflicts, drafts the reply.',
    aria: 'Chapter 3: The Brain — knowledge card',
    visual: (
      <div className="v-knowledge">
        <div className="kchip">Fresh • 2d</div>
        <div className="kchip">Conflicts • 1</div>
        <div className="kchip">Draft ready</div>
      </div>
    )
  },
  {
    eyebrow: 'TOOLS AWAKEN',
    title: 'Your stack, on demand.',
    copy: 'Calendar, CRM, billing, webhooks—invoked only when needed.',
    aria: 'Chapter 4: Builder nodes draw',
    visual: (
      <svg className="v-path" viewBox="0 0 600 80">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill="#C46A2B" />
          </marker>
        </defs>
        <path d="M10,40 C120,10 240,70 360,40 C420,25 480,25 560,40" stroke="#C46A2B" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        <g fill="#3d3a35" fontSize="12">
          <text x="10" y="18">Trigger</text>
          <text x="150" y="18">Intent</text>
          <text x="290" y="18">Tool</text>
          <text x="420" y="18">Guardrail</text>
          <text x="530" y="18">Handoff</text>
        </g>
      </svg>
    )
  },
  {
    eyebrow: 'GUARDRAILS',
    title: 'Safety before speed.',
    copy: 'Policies, redaction, approvals—per channel and role.',
    aria: 'Chapter 5: Guardrails',
    visual: (
      <div className="v-pii"><span className="masked">4111 1111 1111 1111</span> → **** **** **** 1111<div className="toggle"><span>Requires approval</span><span className="switch" aria-checked="false" role="switch" /></div></div>
    )
  },
  {
    eyebrow: 'HANDOFF',
    title: 'Humans when it matters.',
    copy: 'One-click handoff; perfect summary when the agent returns.',
    aria: 'Chapter 6: Handoff',
    visual: (
      <div className="v-summary"><div className="avatar" /><div className="card">Summary • 142 words</div></div>
    )
  },
  {
    eyebrow: 'MEMORY',
    title: 'Never ask twice.',
    copy: 'Every touch updates preferences and context.',
    aria: 'Chapter 7: Memory',
    visual: (<div className="v-pref"><div className="chip">Prefers SMS</div><div className="chip">9–5 PST</div></div>)
  },
  {
    eyebrow: 'SCALE',
    title: 'One brain, many brands.',
    copy: 'Workspaces, permissions, auditability.',
    aria: 'Chapter 8: Scale',
    visual: (<div className="v-brands"><div className="tab">North</div><div className="tab">Axis</div><div className="tab">Lumen</div><div className="audit">12:41 • Flow edited • Guardrail tightened</div></div>)
  },
  {
    eyebrow: 'SCOREBOARD',
    title: 'Outcomes you can show.',
    copy: 'Deflection ↑ CSAT ↑ AHT ↓ Assisted revenue ↑ (live).',
    aria: 'Chapter 9: Scoreboard',
    visual: (
      <div className="v-stats">
        <div className="stat">Deflection ↑<div className="spark" /></div>
        <div className="stat">CSAT ↑<div className="spark" /></div>
        <div className="stat">AHT ↓<div className="spark alert" /></div>
        <div className="stat">Revenue ↑<div className="spark" /></div>
      </div>
    )
  },
  {
    eyebrow: 'YOUR FIRST FLOW',
    title: 'Connect a channel. Publish a path. Done.',
    copy: '',
    aria: 'Chapter 10: CTA',
    visual: (
      <div className="v-cta"><button className="pill">Start free—deploy in minutes</button></div>
    )
  }
]

