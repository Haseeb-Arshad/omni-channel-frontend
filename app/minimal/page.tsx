import { ArrowRight, Bot, MessageSquare, Mic, Globe, Zap, Layers, Network } from "lucide-react";
import Link from "next/link";

export default function MinimalPage() {
    return (
        <div className="flex flex-col w-full bg-white">
            {/* Navigation */}
            <nav className="w-full py-6 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[rgba(36,41,41,0.05)]">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#242929] rounded-full flex items-center justify-center text-white">
                        <Network className="w-4 h-4" />
                    </div>
                    <span className="font-[family-name:var(--font-heading)] text-xl text-[#242929] tracking-tight">OmniAgent</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-[#242929]/70 font-[family-name:var(--font-body)]">
                    <Link href="#" className="hover:text-[#242929] transition-colors">Agents</Link>
                    <Link href="#" className="hover:text-[#242929] transition-colors">Channels</Link>
                    <Link href="#" className="hover:text-[#242929] transition-colors">Intelligence</Link>
                    <Link href="#" className="hover:text-[#242929] transition-colors">Enterprise</Link>
                </div>
                <div className="flex gap-4">
                    <button className="minimalist-btn-outline text-sm px-6 py-2.5">Log in</button>
                    <button className="minimalist-btn text-sm px-6 py-2.5">Deploy Agent</button>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center">

                {/* Hero Section */}
                <section className="w-full max-w-[1400px] px-6 lg:px-12 pt-32 pb-32 flex flex-col items-center text-center">
                    <div className="animate-fade-in opacity-0 fill-mode-forwards">
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#242929]/5 text-[#242929] text-xs font-medium uppercase tracking-widest mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#242929] animate-pulse"></span>
                            Agentic AI Grid Active
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl mb-10 max-w-5xl text-[#242929] leading-[0.9] tracking-tight animate-fade-in opacity-0 fill-mode-forwards delay-100">
                        AI that lives <br /><span className="italic opacity-80">everywhere.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-[#242929]/70 max-w-2xl mb-14 leading-relaxed animate-fade-in opacity-0 fill-mode-forwards delay-200 font-light">
                        Deploy autonomous agents that traverse your entire digital ecosystem. One brain, infinite channels.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 animate-fade-in opacity-0 fill-mode-forwards delay-300">
                        <button className="minimalist-btn text-lg px-8 py-4 bg-[#242929] hover:bg-black group">
                            Start Auto-Pilot <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="minimalist-btn-outline text-lg px-8 py-4 border-[#242929]/20 hover:bg-[#242929]/5">
                            See Agents Work
                        </button>
                    </div>

                    {/* Visual Representation of Agentic Connections */}
                    <div className="mt-32 w-full animate-scale-in opacity-0 fill-mode-forwards delay-500">
                        <div className="relative w-full max-w-4xl mx-auto aspect-[16/8] rounded-2xl border border-[#242929]/10 bg-[#fafafa] overflow-hidden flex items-center justify-center p-8 shadow-sm">
                            <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-[0.03] pointer-events-none">
                                {Array.from({ length: 400 }).map((_, i) => (
                                    <div key={i} className="border-[0.5px] border-[#242929]"></div>
                                ))}
                            </div>

                            {/* Central Node */}
                            <div className="relative z-10 w-24 h-24 rounded-full bg-[#242929] flex items-center justify-center shadow-xl animate-pulse-slow">
                                <Network className="w-10 h-10 text-white" />
                                <div className="absolute -inset-4 border border-[#242929]/20 rounded-full animate-ping-slow"></div>
                            </div>

                            {/* Channel Nodes */}
                            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-16 h-16 bg-white border border-[#242929]/10 rounded-2xl flex items-center justify-center shadow-md animate-float-1">
                                <MessageSquare className="w-6 h-6 text-[#242929]" />
                            </div>
                            <div className="absolute top-1/4 right-1/4 w-14 h-14 bg-white border border-[#242929]/10 rounded-2xl flex items-center justify-center shadow-md animate-float-2">
                                <Globe className="w-5 h-5 text-[#242929]" />
                            </div>
                            <div className="absolute bottom-1/4 right-1/3 w-14 h-14 bg-white border border-[#242929]/10 rounded-2xl flex items-center justify-center shadow-md animate-float-3">
                                <Bot className="w-5 h-5 text-[#242929]" />
                            </div>
                            <div className="absolute top-1/3 right-10 w-12 h-12 bg-white border border-[#242929]/10 rounded-2xl flex items-center justify-center shadow-md animate-float-1">
                                <Mic className="w-5 h-5 text-[#242929]" />
                            </div>

                            {/* Connecting Lines (Conceptually visualized with CSS or SVG) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                <path d="M448 240 L280 240" stroke="#242929" strokeWidth="1" strokeOpacity="0.2" />
                                <path d="M448 240 L600 160" stroke="#242929" strokeWidth="1" strokeOpacity="0.2" />
                                <path d="M448 240 L550 320" stroke="#242929" strokeWidth="1" strokeOpacity="0.2" />
                                <path d="M600 160 L780 180" stroke="#242929" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="4 4" />
                            </svg>
                        </div>
                        <div className="text-center mt-6 text-sm text-[#242929]/60 font-medium tracking-wide uppercase">
                            Architecture 2.0 • Autonomous • Multi-Modal
                        </div>
                    </div>
                </section>

                {/* Core Pillars */}
                <section className="w-full bg-[#f8f9f9] py-32 border-y border-[#242929]/5">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            <div className="group">
                                <div className="mb-6 w-12 h-12 border border-[#242929]/20 rounded-full flex items-center justify-center group-hover:bg-[#242929] group-hover:text-white transition-colors duration-300">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-[family-name:var(--font-heading)] mb-4 text-[#242929]">Autonomous Agents</h3>
                                <p className="text-[#242929]/70 leading-relaxed font-light">
                                    Agents that don't just wait for commands. They proactively monitor, analyze, and act across your channels to solve problems before they escalate.
                                </p>
                            </div>
                            <div className="group">
                                <div className="mb-6 w-12 h-12 border border-[#242929]/20 rounded-full flex items-center justify-center group-hover:bg-[#242929] group-hover:text-white transition-colors duration-300">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-[family-name:var(--font-heading)] mb-4 text-[#242929]">Omn-Channel Context</h3>
                                <p className="text-[#242929]/70 leading-relaxed font-light">
                                    A unified memory graph. What an agent learns in an email, it applies to a voice call. No data silos, just one continuous brain.
                                </p>
                            </div>
                            <div className="group">
                                <div className="mb-6 w-12 h-12 border border-[#242929]/20 rounded-full flex items-center justify-center group-hover:bg-[#242929] group-hover:text-white transition-colors duration-300">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-[family-name:var(--font-heading)] mb-4 text-[#242929]">Real-time Synthesis</h3>
                                <p className="text-[#242929]/70 leading-relaxed font-light">
                                    Sub-millisecond decision making. Our agents process inputs from thousands of concurrent streams to orchestrate complex workflows instantly.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Minimal CTA */}
                <section className="w-full py-40 px-6 lg:px-12 bg-white flex flex-col items-center text-center">
                    <h2 className="text-5xl md:text-7xl mb-8 font-[family-name:var(--font-heading)] text-[#242929] tracking-tight">
                        Ready to deploy intelligence?
                    </h2>
                    <p className="text-xl text-[#242929]/60 mb-12 max-w-xl font-light">
                        Join the future of automated work. No credit card required for the sandbox.
                    </p>
                    <button className="minimalist-btn text-xl px-12 py-5 bg-[#242929] hover:scale-105 transition-transform">
                        Initialize Sandbox
                    </button>
                </section>

            </main>

            <footer className="w-full py-12 px-6 lg:px-12 border-t border-[#242929]/10 bg-white">
                <div className="max-w-[1400px] mx-auto flex justify-between items-center text-xs text-[#242929]/50 font-medium uppercase tracking-widest">
                    <div>OmniChannel Systems © 2025</div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-[#242929]">Status</Link>
                        <Link href="#" className="hover:text-[#242929]">Docs</Link>
                        <Link href="#" className="hover:text-[#242929]">Legal</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
