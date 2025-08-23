"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MessageSquare, MessageCircle, Phone, Mail, ShieldCheck, Check, ChevronRight } from "lucide-react"
import '../../styling/ribbon.css'

// From Ping to Proof — Scroll-driven ribbon beneath Hero
// Uses GSAP + ScrollTrigger with reduced-motion fallback.
export default function Ribbon() {
  const rootRef = useRef<HTMLElement | null>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(m.matches)
    handler()
    m.addEventListener?.('change', handler)
    return () => m.removeEventListener?.('change', handler)
  }, [])

  useEffect(() => {
    let ctx: any | null = null
    let cleanupFns: Array<() => void> = []

    async function init() {
      if (!rootRef.current) return
      if (reduced) return // fallback handled by CSS/IO below

      const [{ default: gsap }, { ScrollTrigger }, { ScrollToPlugin }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('gsap/ScrollToPlugin')
      ])
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

      const root = rootRef.current!
      const scenes = Array.from(root.querySelectorAll<HTMLElement>('.scene'))
      // Initialize stacked scenes: show first, hide others
      gsap.set(scenes, { autoAlpha: 0, pointerEvents: 'none' })
      gsap.set(scenes[0], { autoAlpha: 1, pointerEvents: 'auto' })

      // Background drift element (real element, avoid pseudo)
      const bg = root.querySelector('.ribbon-bg') as HTMLElement
      if (bg) {
        gsap.to(bg, { x: 60, duration: 40, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.to(bg, { filter: 'blur(46px)', duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      }

      // Allocate equal scroll distance per scene
      const per = () => window.innerHeight * 0.9
      const endVal = () => `+=${Math.round(per() * scenes.length)}`

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          id: 'ribbon-master',
          trigger: root,
          start: 'top top',
          end: endVal,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      })

      // Helper to space scenes equally
      const addStep = (label: string) => {
        tl.addLabel(label)
        // reserve time proportional to a viewport height so dot math is linear
        tl.to({}, { duration: 1 })
      }

      // Scene 1 — Ping
      addStep('s1')
      tl.from('.s1 .message', { y: 30, autoAlpha: 0 })
        .from('.s1 .chip-row .chip', { y: 20, autoAlpha: 0, stagger: 0.06 }, '<0.2')

      // Scene 2 — Identity merge
      addStep('s2')
      tl.to(scenes[0], { autoAlpha: 0, duration: 0.25 })
        .to(scenes[1], { autoAlpha: 1, pointerEvents: 'auto', duration: 0.25 }, '<')
      tl.from('.s2 .id-frag.a', { x: -140, y: 50, autoAlpha: 0 })
        .from('.s2 .id-frag.b', { x: 140, y: -30, autoAlpha: 0 }, '<')
        .to(['.s2 .id-frag.a', '.s2 .id-frag.b'], { x: 0, y: 0, duration: 0.6 })
        .to('.s2 .profile-chip', { autoAlpha: 1, scale: 1 }, '<')

      // Scene 3 — Knowledge resolve
      addStep('s3')
      tl.to(scenes[1], { autoAlpha: 0, duration: 0.25 })
        .to(scenes[2], { autoAlpha: 1, pointerEvents: 'auto', duration: 0.25 }, '<')
      tl.from('.s3 .knowledge', { y: 40, autoAlpha: 0 })
        .from('.s3 .conflict-badge', { autoAlpha: 0, scale: 0.7 }, '<')
        .from('.s3 .resolve', { autoAlpha: 0, y: 20 }, '<')

      // Scene 4 — Orchestrate Tools (draw path)
      addStep('s4')
      tl.to(scenes[2], { autoAlpha: 0, duration: 0.25 })
        .to(scenes[3], { autoAlpha: 1, pointerEvents: 'auto', duration: 0.25 }, '<')
      tl.fromTo('.s4 .path-line', { strokeDasharray: 800, strokeDashoffset: 800 }, { strokeDashoffset: 0, duration: 1.2 })
        .from('.s4 .usecase-toggle', { autoAlpha: 0, y: 20 }, '<0.2')
        .from('.s4 .node', { autoAlpha: 0, y: 20, stagger: 0.08 }, '<0.1')

      // Scene 5 — Guardrails toast
      addStep('s5')
      tl.to(scenes[3], { autoAlpha: 0, duration: 0.25 })
        .to(scenes[4], { autoAlpha: 1, pointerEvents: 'auto', duration: 0.25 }, '<')
      tl.from('.s5 .transcript', { autoAlpha: 0, y: 20 })
        .from('.s5 .policy-toast', { autoAlpha: 0, y: 16, scale: 0.98 }, '<0.3')

      // Scene 6 — Handoff long press
      addStep('s6')
      tl.to(scenes[4], { autoAlpha: 0, duration: 0.25 })
        .to(scenes[5], { autoAlpha: 1, pointerEvents: 'auto', duration: 0.25 }, '<')
      tl.from('.s6 .handoff-btn', { autoAlpha: 0, y: 20 })
        .from('.s6 .summary', { autoAlpha: 0 }, '+=0.2')

      // Scene 7 — Memory & Preferences
      addStep('s7')
      tl.to(scenes[5], { autoAlpha: 0, duration: 0.25 })
        .to(scenes[6], { autoAlpha: 1, pointerEvents: 'auto', duration: 0.25 }, '<')
      tl.from('.s7 .pref-chip', { autoAlpha: 0, y: 18, stagger: 0.08 })
        .from('.s7 .moss-check', { autoAlpha: 0, scale: 0.6 }, '<0.2')

      // Scene 8 — Brands tint
      addStep('s8')
      tl.to(scenes[6], { autoAlpha: 0, duration: 0.25 })
        .to(scenes[7], { autoAlpha: 1, pointerEvents: 'auto', duration: 0.25 }, '<')
      tl.from('.s8 .brand-tabs', { autoAlpha: 0, y: 20 })
        .from('.s8 .brand-preview', { autoAlpha: 0, y: 20 }, '<0.1')

      // Scene 9 — Scoreboard
      addStep('s9')
      tl.to(scenes[7], { autoAlpha: 0, duration: 0.25 })
        .to(scenes[8], { autoAlpha: 1, pointerEvents: 'auto', duration: 0.25 }, '<')
      tl.from('.s9 .stat', { autoAlpha: 0, y: 20, stagger: 0.08 })
        .from('.s9 .spark', { autoAlpha: 0, scaleX: 0.6, transformOrigin: '0 0', stagger: 0.08 }, '<')

      // Scene 10 — Mini demo
      addStep('s10')
      tl.to(scenes[8], { autoAlpha: 0, duration: 0.25 })
        .to(scenes[9], { autoAlpha: 1, pointerEvents: 'auto', duration: 0.25 }, '<')
      tl.from('.s10 .microflow', { autoAlpha: 0, y: 20 })
        .from('.s10 .cta-row', { autoAlpha: 0, y: 12 }, '<0.2')

      // Progress dots
      const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('.ribbon-progress button'))
      const st = tl.scrollTrigger!

      dots.forEach((btn, i) => {
        const handler = (e: Event) => {
          e.preventDefault()
          const start = st.start as number
          const end = st.end as number
          const total = end - start
          const stepY = total / scenes.length
          gsap.to(window, { duration: 0.6, ease: 'power2.out', scrollTo: start + (i * stepY) })
        }
        btn.addEventListener('click', handler)
        btn.addEventListener('keydown', (ev) => {
          if (ev.key === 'Enter' || ev.key === ' ') handler(ev)
        })
        cleanupFns.push(() => {
          btn.removeEventListener('click', handler)
        })
      })

      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: () => st.end as number,
        onUpdate: self => {
          const idx = Math.min(scenes.length - 1, Math.round(self.progress * (scenes.length - 1)))
          dots.forEach((b, i) => b.setAttribute('aria-current', i === idx ? 'true' : 'false'))
        }
      })

      // Count-up for stats when scene 9 enters
      const countEls = Array.from(root.querySelectorAll<HTMLElement>('.s9 [data-count-to]'))
      countEls.forEach((el) => {
        const to = Number(el.dataset.countTo)
        const dur = Number(el.dataset.countDur || 1)
        ScrollTrigger.create({
          trigger: el.closest('.scene')!,
          start: 'top center',
          once: true,
          onEnter: () => {
            gsap.fromTo(el, { innerText: 0 }, {
              innerText: to,
              duration: dur,
              ease: 'power1.out',
              snap: { innerText: 1 },
              onUpdate: function () {
                el.textContent = formatMetric(el, Math.round(Number((this as any).targets()[0].innerText)))
              }
            })
          }
        })
      })

      // Reduced will not run; add minor optimization
      ctx = gsap.context(() => {}, root)
    }

    // Reduced-motion fallback: simple intersection cross-fades
    function initReducedFallback() {
      if (!rootRef.current) return
      const root = rootRef.current
      const scenes = Array.from(root.querySelectorAll<HTMLElement>('.scene'))
      scenes.forEach((s) => s.style.opacity = '0')
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target && ((en.target as HTMLElement).style.opacity = '1')
        })
      }, { rootMargin: '0px 0px -20% 0px', threshold: 0.2 })
      scenes.forEach(s => io.observe(s))
      cleanupFns.push(() => io.disconnect())
    }

    // Initialize immediately for reliable pinning/scene switching
    if (reduced) {
      initReducedFallback()
    } else {
      init()
    }

    return () => {
      cleanupFns.forEach(fn => fn())
      // GSAP context cleanup handled by plugin on route change
      ctx && ctx.revert()
    }
  }, [reduced])

  // Interactive handlers (not requiring GSAP timelines)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    // Use-case toggle
    const toggle = root.querySelector('.usecase-toggle') as HTMLDivElement | null
    if (toggle) {
      const buttons = Array.from(toggle.querySelectorAll<HTMLButtonElement>('button'))
      const selectIndex = (idx: number) => {
        buttons.forEach((b, i) => b.setAttribute('aria-pressed', i === idx ? 'true' : 'false'))
        const val = buttons[idx].dataset.case
        const labelEl = root.querySelector('.s4 .usecase-value')!
        if (labelEl) labelEl.textContent = String(val)
        buttons[idx].focus()
      }
      const clickHandler = (e: Event) => {
        const t = e.currentTarget as HTMLButtonElement
        const idx = buttons.indexOf(t)
        if (idx >= 0) selectIndex(idx)
      }
      const keyHandler = (e: KeyboardEvent) => {
        const current = buttons.findIndex(b => b.getAttribute('aria-pressed') === 'true')
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          selectIndex((current + 1) % buttons.length)
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          selectIndex((current - 1 + buttons.length) % buttons.length)
        }
      }
      buttons.forEach(b => { b.addEventListener('click', clickHandler); b.addEventListener('keydown', keyHandler) })
      return () => buttons.forEach(b => { b.removeEventListener('click', clickHandler); b.removeEventListener('keydown', keyHandler) })
    }
  }, [])

  // Long-press handoff handler
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const btn = root.querySelector<HTMLButtonElement>('.handoff-btn')
    if (!btn) return

    let timer: any
    let pressed = false
    const holdMs = 600

    const start = () => {
      pressed = true
      btn.classList.add('is-holding')
      timer = setTimeout(() => {
        if (pressed) {
          btn.classList.add('is-committed')
          const summary = root.querySelector('.s6 .summary') as HTMLElement | null
          if (summary) {
            summary.setAttribute('data-show', 'true')
          }
        }
      }, holdMs)
    }

    const end = () => {
      pressed = false
      btn.classList.remove('is-holding')
      clearTimeout(timer)
    }

    btn.addEventListener('mousedown', start)
    btn.addEventListener('touchstart', start)
    btn.addEventListener('mouseup', end)
    btn.addEventListener('mouseleave', end)
    btn.addEventListener('touchend', end)
    btn.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') start() })
    btn.addEventListener('keyup', end)

    return () => {
      btn.removeEventListener('mousedown', start)
      btn.removeEventListener('touchstart', start)
      btn.removeEventListener('mouseup', end)
      btn.removeEventListener('mouseleave', end)
      btn.removeEventListener('touchend', end)
      btn.removeEventListener('keydown', () => {})
      btn.removeEventListener('keyup', end)
    }
  }, [])

  // Brand tinting
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('.brand-tabs button'))
    if (tabs.length === 0) return
    const setBrand = (i: number) => {
      root.style.setProperty('--tint-neutral', i === 0 ? '#EFE7DC' : i === 1 ? '#ECE6DF' : '#E8E0D6')
      root.style.setProperty('--tint-ink', i === 0 ? '#111111' : i === 1 ? '#222222' : '#1A1A1A')
      tabs.forEach((t, idx) => t.setAttribute('aria-selected', idx === i ? 'true' : 'false'))
    }
    const onClick = (e: Event) => setBrand(Number((e.currentTarget as HTMLElement).dataset.idx))
    tabs.forEach((t, idx) => { t.dataset.idx = String(idx); t.addEventListener('click', onClick) })
    setBrand(0)
    return () => tabs.forEach((t) => t.removeEventListener('click', onClick))
  }, [])

  return (
    <section id="ribbon" className="ribbon" ref={rootRef} aria-label="From Ping to Proof">
      {/* Background bands element (animated with GSAP) */}
      <div className="ribbon-bg" aria-hidden="true" />

      {/* Progress rail */}
      <nav className="ribbon-progress" aria-label="Scene progress">
        <ol>
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i}>
              <button aria-label={`Go to scene ${i + 1}`} aria-current={i === 0 ? 'true' : 'false'} />
            </li>
          ))}
        </ol>
      </nav>

      {/* Pinned track with 10 scenes */}
      <div className="ribbon-track">
        {/* Scene 1 */}
        <article className="scene s1" data-scene="1">
          <h2 className="scene-title">The Ping</h2>
          <div className="glass message" role="note">It begins anywhere.</div>
          <div className="chip-row" role="list" aria-label="Channels">
            <div className="chip" role="listitem"><MessageSquare aria-hidden className="ic" /><span>WhatsApp</span></div>
            <div className="chip" role="listitem"><Phone aria-hidden className="ic" /><span>Voice</span></div>
            <div className="chip" role="listitem"><MessageCircle aria-hidden className="ic" /><span>SMS</span></div>
            <div className="chip" role="listitem"><Mail aria-hidden className="ic" /><span>Email</span></div>
            <div className="chip" role="listitem"><MessageSquare aria-hidden className="ic" /><span>Discord</span></div>
            <div className="chip" role="listitem"><MessageCircle aria-hidden className="ic" /><span>Messenger</span></div>
          </div>
        </article>

        {/* Scene 2 */}
        <article className="scene s2" data-scene="2">
          <h2 className="scene-title">Identity, Unified</h2>
          <div className="merge-area" aria-describedby="s2copy">
            <div className="id-frag a" aria-label="Fragment A"></div>
            <div className="id-frag b" aria-label="Fragment B"></div>
            <div className="profile-chip" aria-hidden><span className="avatar">JP</span><span className="name">J. Patel</span></div>
          </div>
          <p id="s2copy" className="copy">One person, many handles—merged by intent and history.</p>
        </article>

        {/* Scene 3 */}
        <article className="scene s3" data-scene="3">
          <h2 className="scene-title">The Brain (Knowledge)</h2>
          <div className="knowledge glass" role="group" aria-label="Knowledge card">
            <div className="row">
              <div className="fresh">Freshness <strong>97%</strong></div>
              <div className="conflict-badge" aria-live="polite">1 conflict</div>
            </div>
            <div className="source">Source: /docs/returns-policy-v3</div>
            <button className="resolve" aria-label="Resolve conflict">Resolve</button>
          </div>
        </article>

        {/* Scene 4 */}
        <article className="scene s4" data-scene="4">
          <h2 className="scene-title">Orchestrate Tools</h2>
          <div className="usecase-toggle" role="tablist" aria-label="Use-case">
            <button role="tab" aria-pressed="true" data-case="Support">Support</button>
            <button role="tab" aria-pressed="false" data-case="Sales">Sales</button>
            <button role="tab" aria-pressed="false" data-case="IT">IT</button>
          </div>
          <div className="path-wrap" aria-label="Node path: Trigger to Handoff">
            <svg className="path" viewBox="0 0 600 100" aria-hidden>
              <path className="path-line" d="M20 60 C120 10, 240 110, 360 60 S 540 60, 580 60" />
            </svg>
            <div className="nodes">
              <div className="node">Trigger</div>
              <div className="node">Intent</div>
              <div className="node">Tool</div>
              <div className="node">Guardrail</div>
              <div className="node">Handoff</div>
            </div>
          </div>
          <div className="usecase-label">Current: <span className="usecase-value">Support</span></div>
        </article>

        {/* Scene 5 */}
        <article className="scene s5" data-scene="5">
          <h2 className="scene-title">Guardrails & Consent</h2>
          <div className="transcript glass">
            Customer: <span className="pii">4111 1111 1111 1111</span> — please confirm order.
          </div>
          <div className="policy-toast" role="status" aria-live="polite">
            <ShieldCheck className="ic" aria-hidden /> Policy applied
          </div>
        </article>

        {/* Scene 6 */}
        <article className="scene s6" data-scene="6">
          <h2 className="scene-title">Human Handoff & Back</h2>
          <button className="handoff-btn" aria-label="Press and hold to handoff" title="Press and hold">
            <span className="ring" aria-hidden></span>
            Handoff
          </button>
          <div className="summary glass" aria-live="polite" data-show="false">
            Auto-summary: "Customer asked about returns window for order #10291..."
          </div>
        </article>

        {/* Scene 7 */}
        <article className="scene s7" data-scene="7">
          <h2 className="scene-title">Memory & Preferences</h2>
          <div className="pref-list">
            <div className="pref-chip">Language: EN + UR</div>
            <div className="pref-chip">Channel: SMS</div>
            <div className="pref-chip">Hours: 9–5 PST</div>
          </div>
          <div className="moss" aria-live="polite"><Check className="moss-check" aria-hidden /> Saved</div>
        </article>

        {/* Scene 8 */}
        <article className="scene s8" data-scene="8">
          <h2 className="scene-title">Scale & Brands</h2>
          <div className="brand-tabs" role="tablist" aria-label="Brands">
            <button role="tab" aria-selected="true">A</button>
            <button role="tab" aria-selected="false">B</button>
            <button role="tab" aria-selected="false">C</button>
          </div>
          <div className="brand-preview glass">One brain, many brands—governed, auditable.</div>
        </article>

        {/* Scene 9 */}
        <article className="scene s9" data-scene="9" aria-live="polite">
          <h2 className="scene-title">Outcomes (Scoreboard)</h2>
          <div className="stats-grid">
            <div className="stat glass">
              <div className="label">Deflection</div>
              <div className="value">+<span data-count-to="38" data-count-dur="1.2">0</span>%</div>
              <svg className="spark" viewBox="0 0 100 20" aria-hidden><path d="M0 18 L20 12 L40 14 L60 8 L80 10 L100 4"/></svg>
            </div>
            <div className="stat glass">
              <div className="label">CSAT</div>
              <div className="value"><span data-count-to="4" data-count-dur="1">0</span>.<span data-count-to="7" data-count-dur="1.4">0</span>/5</div>
              <svg className="spark" viewBox="0 0 100 20" aria-hidden><path d="M0 14 L20 10 L40 12 L60 10 L80 6 L100 8"/></svg>
            </div>
            <div className="stat glass">
              <div className="label">AHT</div>
              <div className="value">−<span data-count-to="29" data-count-dur="1.2">0</span>%</div>
              <svg className="spark" viewBox="0 0 100 20" aria-hidden><path d="M0 6 L20 8 L40 10 L60 12 L80 14 L100 16"/></svg>
            </div>
            <div className="stat glass">
              <div className="label">Assisted revenue</div>
              <div className="value">+<span data-count-to="21" data-count-dur="1.2">0</span>%</div>
              <svg className="spark" viewBox="0 0 100 20" aria-hidden><path d="M0 16 L20 8 L40 10 L60 6 L80 8 L100 4"/></svg>
            </div>
          </div>
        </article>

        {/* Scene 10 */}
        <article className="scene s10" data-scene="10">
          <h2 className="scene-title">Mini Demo & CTA</h2>
          <div className="microflow">
            <div className="mf-step">Message</div>
            <ChevronRight className="arrow" aria-hidden />
            <div className="mf-step">Intent</div>
            <ChevronRight className="arrow" aria-hidden />
            <div className="mf-step">Tool</div>
            <ChevronRight className="arrow" aria-hidden />
            <div className="mf-step">Summary</div>
          </div>
          <div className="cta-row">
            <Link href="/auth/register" className="cta-primary">Start free</Link>
            <Link href="#demo" className="cta-secondary">See live demo</Link>
          </div>
        </article>
      </div>

      {/* Sticky CTA after scenes */}
      <footer className="ribbon-cta" aria-label="Get started">
        <div className="cta-inner glass">
          <div className="cta-copy">Connect a channel. Publish a path. Done.</div>
          <div className="cta-actions">
            <Link href="/auth/register" className="cta-primary">Start free</Link>
            <Link href="#demo" className="cta-secondary">See live demo</Link>
          </div>
        </div>
      </footer>
    </section>
  )
}

function formatMetric(el: HTMLElement, v: number) {
  // Format integers normally; keep decimals for CSAT fractional part if requested
  if (el.closest('.stat')?.querySelector('.label')?.textContent?.includes('CSAT')) {
    return String(v)
  }
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(v)
}

