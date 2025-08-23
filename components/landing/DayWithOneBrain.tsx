import React, { useEffect, useRef, useState } from 'react'
import '../..//styling/day-with-one-brain.css'
import { MessageSquare, Phone, Mail, MessageCircle } from 'lucide-react'

function useOnScreen<T extends Element>(options: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, options)
    io.observe(el)
    return () => io.disconnect()
  }, [options])
  return { ref, visible }
}

const dots = new Array(10).fill(0)

export default function DayWithOneBrain() {
  const [active, setActive] = useState(1)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-chapter]')) as HTMLElement[]
    if (!sections.length) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = Number((e.target as HTMLElement).dataset.chapter)
          setActive(id)
        }
      })
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 })
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <section className="day-section" aria-label="A Day With One Brain">
      <div className="day-bands" aria-hidden>
        <div className="day-band" />
        <div className="day-band" />
        <div className="day-band" />
        <div className="day-band" />
        <div className="day-band" />
        <div className="day-band" />
      </div>
      <div className="seam s1" />
      <div className="seam s2" />
      <div className="seam s3" />

      <div className="day-grid">
        {/* Sticky rail */}
        <aside className="left-rail">
          <div className="chapter-label">A DAY WITH</div>
          <div className="ribbon-title">One Brain</div>
          <div className="progress" aria-label={`Chapter ${active} of 10`}>
            {dots.map((_, i) => (
              <div key={i} className={`dot ${active - 1 === i ? 'active' : ''}`} />
            ))}
          </div>
        </aside>

        {/* Right narrative */}
        <div className="right-stack">
          {/* Chapter 1 */}
          <Chapter id={1} eyebrow="CHAPTER 1" title="It begins anywhere." body="A short WhatsApp DM at 9:02. A call at lunch. An email at midnight.">
            <div className="msg-bubble">“Hey—have a quick question.”</div>
            <div className="chips" aria-hidden>
              <div className="chip"><MessageSquare size={16}/></div>
              <div className="chip"><Phone size={16}/></div>
              <div className="chip"><Mail size={16}/></div>
              <div className="chip"><MessageCircle size={16}/></div>
            </div>
          </Chapter>

          {/* Chapter 2 */}
          <Chapter id={2} eyebrow="CHAPTER 2" title="Who is this, really?" body="The same person across numbers and handles—merged by intent and history.">
            <div className="merge">
              <div className="avatar" />
              <div className="avatar" />
              <div className="arrow" />
              <div className="badge">J. Patel • unified profile</div>
            </div>
          </Chapter>

          {/* Chapter 3 */}
          <Chapter id={3} eyebrow="CHAPTER 3" title="Grounded answers, not guesses." body="Unified knowledge checks freshness, resolves conflicts, and drafts the reply.">
            <div className="knowledge">
              <div className="k-chip">Fresh • 2d</div>
              <div className="k-chip">Conflicts • 1</div>
              <div className="k-chip">Draft ready</div>
            </div>
          </Chapter>

          {/* Chapter 4 */}
          <Chapter id={4} eyebrow="CHAPTER 4" title="Your stack, on demand." body="Calendar, CRM, billing, and webhooks—invoked only when needed.">
            <svg className="path" viewBox="0 0 600 80" role="img" aria-label="Trigger to Handoff path">
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#C46A2B" />
                </marker>
              </defs>
              <path d="M10,40 C120,10 240,70 360,40 C420,25 480,25 560,40" stroke="#C46A2B" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
              <g fill="#3d3a35" fontSize="12" fontFamily="Switzer, sans-serif">
                <text x="10" y="18">Trigger</text>
                <text x="150" y="18">Intent</text>
                <text x="290" y="18">Tool</text>
                <text x="420" y="18">Guardrail</text>
                <text x="530" y="18">Handoff</text>
              </g>
            </svg>
          </Chapter>

          {/* Chapter 5 */}
          <Chapter id={5} eyebrow="CHAPTER 5" title="Safety before speed." body="Policies, PII redaction, approvals—by channel and role.">
            <div className="pii">
              <div><span className="masked">4111 1111 1111 1111</span> → **** **** **** 1111</div>
              <div className="toggle"><span>Requires approval</span><span className="switch" role="switch" aria-checked="false"/></div>
            </div>
          </Chapter>

          {/* Chapter 6 */}
          <Chapter id={6} eyebrow="CHAPTER 6" title="Humans when it matters." body="One-click handoff and a perfect summary when the agent returns the thread.">
            <div className="summary">
              <div className="avatar" />
              <div className="card">Summary drafted • 142 words</div>
            </div>
          </Chapter>

          {/* Chapter 7 */}
          <Chapter id={7} eyebrow="CHAPTER 7" title="Every touch makes the graph smarter." body="Preferences, purchases, context—never asked twice.">
            <div className="pref"><div className="chip">Prefers SMS</div><div className="chip">9–5 PST</div></div>
          </Chapter>

          {/* Chapter 8 */}
          <Chapter id={8} eyebrow="CHAPTER 8" title="One brain, many brands." body="Workspaces, themes, permissions—consistent, governed, auditable.">
            <div className="brands"><div className="brand-tab">North</div><div className="brand-tab">Axis</div><div className="brand-tab">Lumen</div></div>
            <div className="audit">12:41 • Flow edited • Guardrail tightened</div>
          </Chapter>

          {/* Chapter 9 */}
          <Chapter id={9} eyebrow="CHAPTER 9" title="Outcomes you can show." body="Deflection ↑, CSAT ↑, AHT ↓, Assisted revenue ↑—in real time.">
            <div className="stats">
              <div className="stat">Deflection ↑<div className="spark" /></div>
              <div className="stat">CSAT ↑<div className="spark" /></div>
              <div className="stat">AHT ↓<div className="spark alert" /></div>
              <div className="stat">Revenue ↑<div className="spark" /></div>
            </div>
          </Chapter>

          {/* Chapter 10 */}
          <Chapter id={10} eyebrow="CHAPTER 10" title="Connect a channel. Publish a path. Done." body="">
            <div className="day-cta">
              <div className="day-bands" aria-hidden>
                <div className="day-band" /><div className="day-band" /><div className="day-band" />
              </div>
              <div className="cta-inner">
                <button className="pill">Start free—deploy in minutes</button>
                <a className="secondary" href="#builder">See a live flow</a>
              </div>
            </div>
          </Chapter>
        </div>
      </div>
    </section>
  )
}

function Chapter({ id, eyebrow, title, body, children }:{ id:number; eyebrow:string; title:string; body:string; children?:React.ReactNode }){
  const { ref, visible } = useOnScreen<HTMLDivElement>({ rootMargin: '-10% 0px -10% 0px', threshold: 0.2 })
  return (
    <section ref={ref} data-chapter={id} className="chapter-card" data-animate={visible} aria-label={`Chapter ${id}: ${title}`}>
      <div className="card-eyebrow">{eyebrow}</div>
      <h3 className="card-title">{title}</h3>
      {body && <p className="card-body">{body}</p>}
      <div style={{ marginTop: 12 }}>{children}</div>
    </section>
  )
}

