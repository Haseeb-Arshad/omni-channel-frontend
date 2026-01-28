import { ArrowRight, Network, Sparkles, Zap, Layers, Globe } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="flex flex-col w-full min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">

            {/* Header */}
            <nav className="w-full h-20 px-6 lg:px-12 flex items-center justify-between border-b border-white/5 sticky top-0 bg-black/50 backdrop-blur-md z-50">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                        <Network className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">OmniAgent</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {["Protocol", "Network", "Docs"].map((item) => (
                        <Link key={item} href="#" className="text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-white transition-colors mr-2">
                        Log In
                    </Link>
                    <button className="crixet-btn !py-2 !px-5 !text-xs !uppercase !tracking-widest !rounded-md">
                        Start
                    </button>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center">

                {/* Hero Section */}
                <section className="w-full max-w-6xl px-6 pt-32 pb-48 flex flex-col items-center text-center">

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-10">
                        <Sparkles className="w-3.5 h-3.5 text-white/60" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Autonomous Intelligence Protocol</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 leading-[0.9]">
                        One Brain.<br />
                        <span className="text-gradient">Every Channel.</span>
                    </h1>

                    <p className="max-w-2xl text-lg md:text-xl text-white/40 font-medium leading-relaxed mb-14">
                        Deploy autonomous agents that learn, act, and evolve across your entire communication ecosystem—instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 items-center">
                        <button className="crixet-btn text-sm uppercase tracking-widest py-4 px-10">
                            Deploy Now
                        </button>
                        <button className="crixet-btn-outline text-sm uppercase tracking-widest py-4 px-10 flex items-center gap-3 group">
                            Protocol Overview
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </section>

                {/* Core Pillars - Hyper Clear */}
                <section className="w-full border-y border-white/5 bg-white/[0.02]">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
                        {[
                            {
                                icon: Zap,
                                title: "Zero Latency",
                                desc: "Proprietary real-time engine ensures sub-50ms response times across text and voice."
                            },
                            {
                                icon: Layers,
                                title: "Unified Context",
                                desc: "Every channel feeds a single neural graph. What's learned in Email, is known in WhatsApp."
                            },
                            {
                                icon: Globe,
                                title: "Global Scale",
                                desc: "Infrastructure designed for billions of concurrent agentic operations."
                            }
                        ].map((pillar) => (
                            <div key={pillar.title} className="p-12 lg:p-16 flex flex-col gap-6">
                                <div className="w-10 h-10 rounded border border-white/10 flex items-center justify-center bg-white/5">
                                    <pillar.icon className="w-5 h-5 text-white/60" />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">{pillar.title}</h3>
                                <p className="text-white/40 leading-relaxed font-medium">
                                    {pillar.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Simplified Value Prop */}
                <section className="w-full max-w-5xl px-6 py-40 flex flex-col items-center text-center">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Ready to unify your communications?</h2>
                    <p className="max-w-md text-white/40 mb-12">
                        Get started in minutes. No complex configuration, just pure autonomous intelligence.
                    </p>
                    <button className="crixet-btn text-sm uppercase tracking-widest py-4 px-16 rounded-full">
                        Initiate Protocol
                    </button>
                </section>

            </main>

            {/* Footer */}
            <footer className="w-full py-12 px-6 lg:px-12 border-t border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/30 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>© 2025 OmniAgent Protocol</div>
                <div className="flex gap-10">
                    <Link href="#" className="hover:text-white transition-colors">Stack</Link>
                    <Link href="#" className="hover:text-white transition-colors">Uptime</Link>
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                </div>
            </footer>
        </div>
    );
}
