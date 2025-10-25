
'use client';

import React, { useEffect, useRef, useState } from "react"
import '../../styling/omni-stage.css'

export default function OmniStage() {
  const [act, setAct] = useState(1)
  const actsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const onScroll = () => {
      // simple progression by scroll position of spacers
      const spacers = Array.from(document.querySelectorAll('.act-spacer')) as HTMLDivElement[]
      const idx = spacers.findIndex(s => s.getBoundingClientRect().top > window.innerHeight * 0.35)
      const current = idx === -1 ? 5 : Math.max(1, idx)
      setAct(current)
      // set active classes
      actsRef.current.forEach((el, i) => {
        if (!el) return
        const n = i + 1
        el.classList.toggle('is-active', n === current)
        el.classList.toggle('is-past', n < current)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="omni-stage" aria-label="The Omni Stage">
      <div className="stage-bands" aria-hidden>
        {Array.from({ length: 7 }).map((_, i) => <div key={i} className="stage-bar" />)}
      </div>

      <div className="stage-pin">
        {/* Left rail */}
        <aside className="stage-rail" aria-hidden>
          <div className="act-label">ACT <span className="num">{String(act).padStart(2, '0')}</span></div>
          <div className="progress-rail"><div className="progress-dot" style={{ transform: `translate(-50%, ${((act - 1) / 4) * 100}%)` }} /></div>
        </aside>

        {/* Canvas with 5 acts */}
        <div className="stage-canvas">
          {/* Act 1 — Listen */}
          <div ref={el => (actsRef.current[0] = el!)} className="act is-active">
            <div className="act-eyebrow">LISTEN</div>
            <h2 className="act-title">Every channel, one quiet place.</h2>
            <p className="act-copy">Voice, chat, and messaging come home to a single thread.</p>
            <div className="act-visual">
              <div className="mosaic">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="msg-card">
                    <div className="msg-top"><div className="chip" /><div className="msg-line" style={{ width: '50%' }} /></div>
                    <div className="msg-line" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Act 2 — Understand */}
          <div ref={el => (actsRef.current[1] = el!)} className="act">
            <div className="act-eyebrow">UNDERSTAND</div>
            <h2 className="act-title">Intent meets identity.</h2>
            <p className="act-copy">We merge signals across handles and history—so answers start personal.</p>
            <div className="act-visual identity">
              <div className="frag" /><div className="frag" /><div className="frag" />
              <div className="profile">J. Patel</div>
              <div className="tags"><div className="tag">Language</div><div className="tag">Region</div><div className="tag">Preference</div></div>
            </div>
          </div>

          {/* Act 3 — Act */}
          <div ref={el => (actsRef.current[2] = el!)} className="act">
            <div className="act-eyebrow">ACT</div>
            <h2 className="act-title">Your stack, orchestrated.</h2>
            <p className="act-copy">Calendar, CRM, billing, webhooks—invoked only when the intent demands it.</p>
            <div className="act-visual">
              <svg className="path" viewBox="0 0 600 100" aria-hidden>
                <path d="M20 60 C120 10, 240 110, 360 60 S 540 60, 580 60" />
              </svg>
              <div className="tool-tiles">
                <div className="tile">Calendar</div>
                <div className="tile">CRM</div>
              </div>
            </div>
          </div>

          {/* Act 4 — Govern */}
          <div ref={el => (actsRef.current[3] = el!)} className="act">
            <div className="act-eyebrow">GOVERN</div>
            <h2 className="act-title">Trust is a feature.</h2>
            <p className="act-copy">Policies, redaction, approvals, and audit logs—by brand, by role, by channel.</p>
            <div className="act-visual">
              <div className="policies">
                <div className="policy">SSO/SAML</div>
                <div className="policy">RBAC</div>
                <div className="policy">Redaction</div>
                <div className="policy">Audit Log</div>
              </div>
              <div className="transcript" data-revealed="false">
                Customer: <span className="pii">4111 1111 1111 1111</span> — please confirm order
              </div>
              <div className="audit">12:41 • Flow edited • Guardrail tightened</div>
            </div>
          </div>

          {/* Act 5 — Learn */}
          <div ref={el => (actsRef.current[4] = el!)} className="act">
            <div className="act-eyebrow">LEARN</div>
            <h2 className="act-title">Outcomes you can show.</h2>
            <p className="act-copy">Deflection up, CSAT up, handle time down. Ship your first flow in minutes.</p>
            <div className="act-visual">
              <div className="stats">
                <div className="stat">Deflection ↑<div className="spark" /></div>
                <div className="stat">CSAT ↑<div className="spark" /></div>
                <div className="stat">AHT ↓<div className="spark alert" /></div>
                <div className="stat">Assisted Revenue ↑<div className="spark" /></div>
              </div>
              <div className="cta-row"><button className="pill">Create your first flow</button></div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacers to create scroll distance controlling act progression */}
      <div className="act-spacers" aria-hidden>
        <div className="act-spacer" /> <div className="act-spacer" /> <div className="act-spacer" /> <div className="act-spacer" /> <div className="act-spacer" />
      </div>
    </section>
  )
}

