# OmniAgent — YC‑Inspired Authentication UI (Design Brief)

Audience: designers and front‑end engineers. Non‑coding brief for a conversion‑first Login and Registration experience.

## Objective
- Convey enterprise trust, speed, and clarity.
- Ship a polished, neutral, editorial aesthetic with controlled motion.
- Optimize for fast conversion (email‑first), low friction, and accessibility.

## Tone
- Confident, calm, neutral. Headlines are editorial; body is neutral/system. Motion is subtle and purposeful.

## Layout
- Desktop (max‑width 1100px): two columns inside a centered container.
  - Left (primary): brand headline, short subcopy, primary glass form card (Login/Register).
  - Right (secondary): stacked glass trust cards (Why OmniAgent, Security, Docs/Status).
- Mobile: single column; form card first; trust cards collapse below.
- Spacing scale: 8 / 16 / 24 / 32 / 40 px; card radius 12 px.

## Design Tokens (CSS)
- Colors
  - sand: #F5F2EE (page background)
  - bone: #EAE6E0 (card backdrop)
  - copper: #A4653F (accent/focus/CTAs)
  - text: #1F1D1B (primary)
  - muted: #8B8580 (secondary)
  - hairline: rgba(31,29,27,0.06)
  - shadow: 0 6px 24px rgba(31,29,27,0.06)
- Typography
  - Headline: Playfair Display 600
  - Body/UI: Inter or system (400/600)
- Motion
  - Micro: 120ms; Standard: 320ms; Spring for CTAs (soft)
  - Eases: ease‑out for standard, spring for press/hover
- Example tokens (reference only)
  - --oa-sand: #F5F2EE; --oa-bone: #EAE6E0; --oa-copper: #A4653F;
  - --oa-text: #1F1D1B; --oa-muted: #8B8580; --oa-hairline: rgba(31,29,27,.06);
  - --oa-radius: 12px; --oa-shadow: 0 6px 24px rgba(31,29,27,.06);

## Background
- 3 blurred vertical gradient bands drifting over 30–40s; minimal opacity; stops when `prefers-reduced-motion`.
- Keep weight near‑zero (pure CSS) and do not interfere with readability.

## Components
1) Glass Card (core pattern)
- Backdrop blur(8px), 1px hairline border, radius 12px, padding 24px (desktop), subtle inner highlight.
- Never pure white; use bone with translucency for depth over sand.

2) Headline & Subcopy
- Headline: “Sign in to OmniAgent” / “Create your OmniAgent account”.
- Subcopy: one short line (value / reassurance). Avoid marketing fluff.

3) Inputs (email‑first)
- Height 48px; underline hairline by default, or faint surface border.
- Floating label: placeholder becomes label on focus/value.
- Focus: copper ring (low alpha), high‑contrast text; no blue.
- Error: explicit helper (“Check your password or request a magic link”).

4) Primary CTA
- Copper background, white text, 8px radius, full‑width on mobile.
- Hover: micro‑rise -2px, scale 1.01, shadow slightly stronger.

5) SSO Buttons
- Monochrome (Apple, Google, Microsoft) with hairline borders, minimal icon + label.
- Same height as inputs, no color floods.

6) Email‑First Transition
- Step 1: email only + Continue.
- Step 2: cross‑fade or scale‑in to password (existing) or track options (new) with 320ms ease‑out; animate only transform/opacity.
- Intel hint: single‑line below email (inviter/workspace or SSO hint).

7) Magic Link Drawer (not modal)
- Role=dialog with overlay. Bottom on mobile; right side on desktop.
- Copy: “We emailed a link to <address>. It expires in 15 minutes.”
- Actions: Open mail app, Resend (timer), Close. `aria-live="polite"` for send confirmation.

8) 2FA Drawer (OTP)
- Role=dialog with focus trap. Bottom (mobile) / right (desktop).
- Six numeric inputs, auto‑advance, backspace to previous, paste support.
- Links: Resend, Enter backup code, Receive code by call.

9) Register — Track Selection
- Two cards (Individual / Business) with concise copy.
- Individual → Name, Email, Password (strength meter), Country, Time zone, consent toggle.
- Business → Name, Company/Workspace (slug preview), Role, Team size, Intended use (Support/Sales/IT), consent toggles.
- Invite awareness: show inviter/workspace; accept invite within flow.
- Domain match: suggest joining an existing workspace or creating new; editable slug.

10) Workspace Selection (Business)
- List existing workspaces (name, members, slug). Card highlight on hover.
- “Create new workspace” inline card with name → slug preview.

11) Post‑Register Inline Playground (first‑run)
- The form card morphs to a mini playground: sample prompt and “Hear this voice” chip.
- Primary CTAs: “Create first agent” and “Connect a channel”.

## Motion Spec
- Properties: transform + opacity only (no layout anims on critical path).
- Timings: 120ms micro; 320ms standard; drawers 280–320ms.
- Easing: standard cubic‑bezier(0.22, 1, 0.36, 1); springs for CTA hover/press.
- Reduced motion: turn off background drift; replace transitions with instant state changes.

## Accessibility
- Keyboard‑first: logical tab order, visible focus; Escape closes drawers and returns focus to trigger.
- Labels: explicit <label> for every input; floating label is visual only.
- Live regions: magic‑link notices `aria-live=polite`.
- OTP: role=group with label; numeric input semantics; screen reader hints.
- Contrast: body text and key UI ≥ 4.5:1; hint/muted ≥ 3:1.

## Copy Voice
- Headline: short value prop; e.g., “Sign in to OmniAgent”.
- Microcopy: helpful, neutral; no blame.
- Errors: prescriptive (“Check your password or request a magic link”).

## Performance Targets
- LCP ≤ 1.5s on mid‑tier mobile; TTI ≤ 2.0s.
- Fonts: 2 families, swap, limited weights (Playfair 600; Inter 400/600). Preload only if needed.
- No large imagery; CSS‑only background; minimal JS for drawers.

## Testing Checklist
- Keyboard‑only
  - Tab order matches reading order; Enter submits; Escape closes drawers and returns focus.
- Screen reader
  - Headings and labels announce properly; error messages announced on focus; drawers announce as dialogs.
- Reduced motion
  - Background bands static; transitions disabled or shortened.
- States
  - Empty, loading, success, error, invite, SSO domain, magic link sent, 2FA, reduced‑motion.
- Performance
  - No layout thrash on step change; LCP/TTI within budget; request waterfall remains minimal.

## Dev Handoff Notes (non‑binding)
- Pages: `/auth/login`, `/auth/register`.
- Patterns to implement: Glass Card, Email‑first stepper, Intel hint, SSO row, Magic Link Drawer, 2FA Drawer, Track + Workspace selection, Inline Playground.
- Respect tokens above; avoid blue hues. Copper is the only accent.

## Deliverables
- Figma: tokens, components, and interactive prototype (desktop + mobile) for login email‑first, register (Individual/Business), Magic link drawer, 2FA drawer, all states (empty/loading/success/error/reduced‑motion).
- Exportable tokens (CSS vars), motion spec sheet (timings/eases), short dev handoff doc.
- Priority outcomes: fast conversion, polished and trustworthy feel, sprint‑ready.

