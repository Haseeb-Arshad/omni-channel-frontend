# Auth Flows: Login and Register

This document describes the user experience, states, and implementation details for the redesigned authentication screens.

## Overview
- Aesthetic: Editorial serif headlines, glass card, backdrop‑blur, hairline borders, neutral Sand/Bone with faint Copper accents, no blues.
- Background: Tall blurred vertical gradient bands that drift slowly; honors `prefers-reduced-motion`.
- Accessibility: High contrast, keyboard navigation, Escape to close drawers, ARIA live for toasts.

## Routes & Entry Points
- Login: `/auth/login`
  - File: `frontend/app/auth/login/page.tsx:1`
- Register: `/auth/register`
  - File: `frontend/app/auth/register/page.tsx:1`
- Shared UI:
  - Banded background: `frontend/components/ui/BandedBackground.tsx:1`
  - Drawer (bottom/right): `frontend/components/ui/Drawer.tsx:1`
  - Theme CSS: `frontend/app/auth/auth-theme.module.css:1`

## Dependencies
- Auth context/API: `frontend/contexts/AuthContext.tsx:1`, `frontend/lib/api.ts:1`
- Toasts: `sonner`
- Icons: `lucide-react`

---

## Login Flow (Email‑first)
1) Email entry and intel
- User enters email. A small hint appears based on the value:
  - Invited: shows inviter + workspace with “Accept” link.
  - Existing + SSO: suggests available SSO provider for that domain.
  - New: indicates we’ll create an account on register.
- Implementation: `intelFor()` (stub) in `frontend/app/auth/login/page.tsx:26`.
- Device hint: shows “Last used on <browser • platform>” using localStorage.

2) Password + controls
- Fields: Email, Password, Remember me, Forgot?
- Micro‑interactions: inputs lift by 2px on focus; copper ring (`#A4653F`); floating label via placeholder.

3) Alternatives
- Magic link: button opens a bottom drawer “Magic link sent” with next steps.
- SSO: monochrome buttons for Apple, Google, Microsoft.
- Passkey: if available, shows a “Use a passkey” button (stubbed).

4) 2FA
- For specific domains (e.g., `@acme.com`) or emails containing “2fa”, submission triggers a right drawer prompting a 6‑digit OTP.
- Fallback: “Receive code by call”, “Resend”, “Enter backup code” (UI only).

5) Submit
- Calls `useAuth().login(email, password, remember)`; AuthContext delegates to `api.login()` and sets token on success.

6) Drawers (not modals)
- Magic link and 2FA use the shared `Drawer` component with overlay, Escape handling, and side animation.

### Query Parameters
- `?invite=1`: flags the email as invited; shows invite hint.
- `?email=<value>`: preloads email in the field.

### Error/Empty States
- Friendly, specific messages; never blame the user. Red bordered alert with icon.

---

## Register Flow (Email‑first → Track → Form)
1) Email step
- User provides email; if `?invite=1`, shows inviter/workspace note.
- Continue advances to track selection.

2) Track selection
- Individual vs Business.
- If Business and domain matches known workspaces (stub: acme/contoso/example), user is shown Workspace selection; otherwise proceed to form.

3) Workspace selection (Business only)
- Cards of discovered workspaces with member counts; or create a new workspace with live slug preview.

4) Forms
- Individual form
  - Fields: Name, Email, Password (strength meter), Country, Time zone, optional consent.
- Business form
  - Fields: Name, Company/Workspace (slug preview), Role, Team size, Intended use (multi‑select), Password, consent toggles (updates, DPA).

5) Submit
- Both tracks call `useAuth().register(email, password, name)` and transition to the “done” state on success.

6) Post‑register inline Playground
- The auth card morphs into a tiny inline playground with a sample prompt and a “Hear this voice” chip.
- Primary CTAs: “Create first agent” and “Connect a channel”.

### Query Parameters
- `?invite=1&email=<value>`: starts at track with invite notice and prefilled email.

### Error/Empty States
- Inline alert for validation failures (missing fields, weak password, etc.).

---

## Visual & Theme Implementation
- Background bands: `BandedBackground` renders five blurred vertical gradients with slow drift.
- Glass card: `auth-theme.module.css` (`.glass`, `.hairline`) applies backdrop‑blur, translucent panel, and subtle inner highlight.
- Focus ring: Copper accent used for focus; no blue accents.
- Motion: Bands animated only when `prefers-reduced-motion: no-preference`.

---

## Accessibility
- Drawers: `role="dialog"` with `aria-modal`, labeled title, Escape to close, overlay click to close.
- ARIA live: “Magic link sent” uses screen‑reader only element with polite updates.
- Keyboard: All controls reachable; OTP inputs accept numeric and auto‑advance.
- Contrast: Neutral text on white glass with hairline borders for clear delineation.

---

## API Expectations
- Login: `POST /api/auth/login` — handled via `api.login()`.
- Register: `POST /api/auth/register` — handled via `api.register()`.
- Optional (to implement):
  - Email intel endpoint to replace `intelFor()` stub.
  - Magic link send/resend.
  - WebAuthn passkey registration/auth.
  - 2FA: send/resend/voice call and verify endpoints.

Reference: `frontend/lib/api.ts:1` and `frontend/contexts/AuthContext.tsx:1`.

---

## Testing Recipes
- SSO hint: use `you@acme.com` (Microsoft) or `you@icloud.com` (Apple).
- Invite hint: `/auth/register?invite=1&email=alex@copper.co`.
- 2FA drawer: try `user@acme.com` or any email containing `2fa`.
- Post‑register: complete Individual form to see inline Playground.

---

## Future Enhancements
- Replace stubs with live backend integrations for email intel, passkey, magic link, and 2FA.
- Add resend timers, rate‑limit notices, and server error mapping for consistent copy.
- Add E2E happy‑path tests for Login/Register, including drawers and keyboard navigation.

