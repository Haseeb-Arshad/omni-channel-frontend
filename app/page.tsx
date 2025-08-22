import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "../styling/landing.css";

export default function Home() {
  return (
    <div className="landing">
      <Header />

      <main>
        {/* Hero */}
        <section id="home" className="section hero">
          <div className="container" style={{ maxWidth: "720px" }}>
            <span className="h-eyebrow">OmniChannel AI</span>
            <h1 className="h1">One place to talk to your customers everywhere</h1>
            <p className="p-lead">
              Connect chat, email, social, and more—so every conversation feels effortless. No noise. No clutter. Just clarity.
            </p>
            <div className="btn-row">
              <a href="/signup" className="btn btn-primary">Start free</a>
              <a href="#demo" className="btn btn-ghost">See a quick demo</a>
            </div>
            <p className="small-note">No credit card required</p>
          </div>
        </section>

        {/* Social proof */}
        <section id="logos" className="section social-proof">
          <div className="container" style={{ maxWidth: "880px" }}>
            <p className="h-eyebrow" style={{ display: "block", textAlign: "center" }}>Trusted by teams who value clarity</p>
            <div className="logos">
              <img src="/vercel.svg" alt="Vercel" className="logo-img" />
              <img src="/next.svg" alt="Next.js" className="logo-img" />
              <img src="/globe.svg" alt="Global" className="logo-img" />
              <img src="/window.svg" alt="Window" className="logo-img" />
            </div>
          </div>
        </section>

        {/* Value props */}
        <section id="features" className="section value-props">
          <div className="container" style={{ maxWidth: "960px" }}>
            <div className="grid">
              <div>
                <h3>Unify every channel</h3>
                <p>Bring WhatsApp, Instagram, Email, Web chat, and more into a single, tidy inbox.</p>
              </div>
              <div>
                <h3>Automate the busywork</h3>
                <p>Smart routing and AI replies help you resolve routine questions in seconds.</p>
              </div>
              <div>
                <h3>See what matters</h3>
                <p>Lightweight reporting gives you visibility without the dashboards maze.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Story/narrative */}
        <section id="story" className="section story">
          <div className="container" style={{ maxWidth: "720px" }}>
            <h2 className="h1" style={{ fontSize: "clamp(22px, 4vw, 32px)" }}>From scattered pings to one clear conversation</h2>
            <p className="p-lead" style={{ fontSize: "var(--text-base)" }}>
              Your customers don’t care which channel they used—they care about getting help. OmniChannel AI turns scattered messages into a single thread, with context that follows every reply. The result? Faster answers, happier customers, and a calmer team.
            </p>
            <div className="quote">
              <div className="avatar" />
              <div>
                <p style={{ color: "hsl(var(--foreground))", fontWeight: 500 }}>
                  “We closed tickets 2x faster in our first week.”
                </p>
                <p className="small-note">Head of Support, Early Startup</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="section cta">
          <div className="container">
            <div className="cta-card">
              <h3>Make every conversation effortless</h3>
              <p>Launch in minutes. Connect your first channel and invite your team.</p>
              <div className="btn-row" style={{ marginTop: "var(--space-6)" }}>
                <a href="/signup" className="btn btn-primary">Get started</a>
                <a href="/contact" className="btn btn-ghost">Talk to us</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
