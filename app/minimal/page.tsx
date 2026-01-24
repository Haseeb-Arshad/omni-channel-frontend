import { ArrowRight, Bot, Layers, Zap, Network, Sparkles } from "lucide-react";
import Link from "next/link";

export default function MinimalPage() {
    return (
        <div className="relative flex flex-col w-full min-h-screen overflow-hidden bg-[#0a0a0b]">
            {/* Ambient gradient orbs - Awwwards style background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Primary gradient orb */}
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-gradient-to-br from-violet-600/30 via-fuchsia-500/20 to-transparent rounded-full blur-[120px] animate-float-slow" />
                {/* Secondary gradient orb */}
                <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-bl from-cyan-500/25 via-blue-600/15 to-transparent rounded-full blur-[100px] animate-float-slower" />
                {/* Tertiary subtle orb */}
                <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent rounded-full blur-[80px] animate-float-slow" />

                {/* Noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.015]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }} />

                {/* Subtle grid pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
                    <defs>
                        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Navigation - Glassmorphism */}
            <nav className="relative z-50 w-full py-5 px-6 lg:px-12">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-black/20">
                            <Network className="w-5 h-5 text-white" />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <span className="text-xl font-medium text-white tracking-tight">OmniAgent</span>
                    </div>

                    <div className="hidden md:flex items-center gap-1 p-1 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
                        {["Agents", "Channels", "Docs", "Pricing"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="px-5 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors duration-300">
                            Log in
                        </button>
                        <button className="group relative px-6 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/15 rounded-full border border-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden">
                            <span className="relative z-10">Get Started</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 flex-1 flex flex-col items-center">

                {/* Hero Section - Premium Typography + Glow */}
                <section className="w-full max-w-[1400px] px-6 lg:px-12 pt-28 pb-32 flex flex-col items-center text-center">

                    {/* Badge with glow */}
                    <div className="animate-fade-in-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-10 group hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-default">
                            <Sparkles className="w-4 h-4 text-violet-400 animate-pulse-slow" />
                            <span className="text-sm font-medium text-white/80">Powered by Agentic AI</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                    </div>

                    {/* Main headline with gradient text */}
                    <h1 className="animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards] text-5xl md:text-7xl lg:text-[5.5rem] font-medium mb-8 max-w-4xl leading-[1.1] tracking-tight">
                        <span className="text-white">AI that lives</span>
                        <br />
                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                            everywhere.
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards] text-lg md:text-xl text-white/50 max-w-xl mb-12 leading-relaxed font-light">
                        Deploy autonomous agents across every channel. One unified brain that understands context, takes action, and learns continuously.
                    </p>

                    {/* CTA Buttons with premium styling */}
                    <div className="animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] flex flex-col sm:flex-row gap-4">
                        <button className="group relative px-8 py-4 text-base font-medium text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]">
                            {/* Gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] animate-gradient-x" />
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                            {/* Content */}
                            <span className="relative z-10 flex items-center gap-2">
                                Start Building
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </button>

                        <button className="group px-8 py-4 text-base font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300">
                            Watch Demo
                        </button>
                    </div>

                    {/* Hero visual - Abstract SVG composition */}
                    <div className="animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards] mt-24 w-full max-w-4xl">
                        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                            {/* Decorative SVG elements */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450">
                                {/* Central glow */}
                                <defs>
                                    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="rgba(139,92,246,0.3)" />
                                        <stop offset="50%" stopColor="rgba(139,92,246,0.1)" />
                                        <stop offset="100%" stopColor="transparent" />
                                    </radialGradient>
                                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                                        <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
                                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                                    </linearGradient>
                                </defs>

                                {/* Central orb */}
                                <circle cx="400" cy="225" r="120" fill="url(#centerGlow)" className="animate-pulse-slow" />
                                <circle cx="400" cy="225" r="60" fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="1" className="animate-spin-slow" />
                                <circle cx="400" cy="225" r="90" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="1" strokeDasharray="8 8" className="animate-spin-reverse" />

                                {/* Connecting lines */}
                                <line x1="100" y1="225" x2="340" y2="225" stroke="url(#lineGradient)" strokeWidth="1" />
                                <line x1="460" y1="225" x2="700" y2="225" stroke="url(#lineGradient)" strokeWidth="1" />
                                <line x1="400" y1="50" x2="400" y2="165" stroke="url(#lineGradient)" strokeWidth="1" />
                                <line x1="400" y1="285" x2="400" y2="400" stroke="url(#lineGradient)" strokeWidth="1" />

                                {/* Floating nodes */}
                                <g className="animate-float-1">
                                    <circle cx="100" cy="225" r="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
                                    <circle cx="100" cy="225" r="8" fill="rgba(139,92,246,0.5)" />
                                </g>
                                <g className="animate-float-2">
                                    <circle cx="700" cy="225" r="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
                                    <circle cx="700" cy="225" r="8" fill="rgba(6,182,212,0.5)" />
                                </g>
                                <g className="animate-float-3">
                                    <circle cx="400" cy="50" r="20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
                                    <circle cx="400" cy="50" r="6" fill="rgba(236,72,153,0.5)" />
                                </g>
                                <g className="animate-float-1">
                                    <circle cx="400" cy="400" r="20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
                                    <circle cx="400" cy="400" r="6" fill="rgba(52,211,153,0.5)" />
                                </g>

                                {/* Central icon placeholder */}
                                <circle cx="400" cy="225" r="32" fill="rgba(139,92,246,0.2)" stroke="rgba(139,92,246,0.5)" strokeWidth="2" />
                            </svg>

                            {/* Center icon */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-500/30">
                                <Network className="w-8 h-8 text-white" />
                            </div>

                            {/* Scan line effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent h-[2px] animate-scan" />
                        </div>

                        {/* Caption */}
                        <p className="mt-6 text-sm text-white/30 tracking-wider uppercase">
                            Unified Intelligence Grid • Real-time • Multi-modal
                        </p>
                    </div>
                </section>

                {/* Features Section - Card Grid with Glassmorphism */}
                <section className="w-full max-w-[1400px] px-6 lg:px-12 py-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">
                            Built for the future
                        </h2>
                        <p className="text-white/40 text-lg max-w-xl mx-auto">
                            Three pillars that power autonomous intelligence
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Bot,
                                title: "Autonomous Agents",
                                description: "Agents that monitor, analyze, and act across your channels—without waiting for commands.",
                                gradient: "from-violet-500/20 to-fuchsia-500/20",
                                iconColor: "text-violet-400"
                            },
                            {
                                icon: Layers,
                                title: "Unified Context",
                                description: "What an agent learns in email, it applies to voice. One continuous memory graph.",
                                gradient: "from-cyan-500/20 to-blue-500/20",
                                iconColor: "text-cyan-400"
                            },
                            {
                                icon: Zap,
                                title: "Real-time Synthesis",
                                description: "Sub-millisecond decisions across thousands of concurrent streams, instantly.",
                                gradient: "from-emerald-500/20 to-teal-500/20",
                                iconColor: "text-emerald-400"
                            }
                        ].map((feature, i) => (
                            <div
                                key={feature.title}
                                className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1"
                            >
                                {/* Hover gradient */}
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${feature.iconColor}`}>
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                                    <p className="text-white/50 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="w-full max-w-[1400px] px-6 lg:px-12 py-32">
                    <div className="relative rounded-3xl overflow-hidden">
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-transparent" />
                        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl" />

                        <div className="relative z-10 flex flex-col items-center text-center py-20 px-8">
                            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">
                                Ready to deploy?
                            </h2>
                            <p className="text-white/50 text-lg mb-10 max-w-md">
                                Get started with OmniAgent in minutes. No credit card required.
                            </p>
                            <button className="group relative px-10 py-4 text-base font-medium text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                                <div className="absolute inset-0 bg-white" />
                                <span className="relative z-10 text-black flex items-center gap-2">
                                    Start Free Trial
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </button>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="relative z-10 w-full py-10 px-6 lg:px-12 border-t border-white/5">
                <div className="max-w-[1400px] mx-auto flex justify-between items-center text-sm text-white/30">
                    <div>OmniAgent © 2025</div>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white/60 transition-colors">Status</Link>
                        <Link href="#" className="hover:text-white/60 transition-colors">Docs</Link>
                        <Link href="#" className="hover:text-white/60 transition-colors">Legal</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
