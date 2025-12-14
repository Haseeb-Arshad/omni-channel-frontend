import { ArrowRight, CheckCircle2, Zap, Shield, Globe } from "lucide-react";
import Link from "next/link";

export default function MinimalPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Navigation */}
            <nav className="w-full py-6 px-6 lg:px-12 flex items-center justify-between border-b border-[rgba(0,0,0,0.04)] backdrop-blur-md sticky top-0 z-50 bg-[hsla(var(--background),0.8)]">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg">O</div>
                    <span className="font-bold text-xl tracking-tight">OmniChannel</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-[hsl(var(--charcoal-light))]">
                    <Link href="#" className="hover:text-black transition-colors">Products</Link>
                    <Link href="#" className="hover:text-black transition-colors">Solutions</Link>
                    <Link href="#" className="hover:text-black transition-colors">Pricing</Link>
                    <Link href="#" className="hover:text-black transition-colors">Company</Link>
                </div>
                <div className="flex gap-4">
                    <button className="minimalist-btn-outline text-sm px-5 py-2">Log in</button>
                    <button className="minimalist-btn text-sm px-5 py-2">Get Started</button>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center">

                {/* Hero Section */}
                <section className="w-full max-w-[var(--content-max-width)] px-6 lg:px-12 pt-24 pb-32 flex flex-col items-center text-center">
                    <div className="animate-fade-in opacity-0 fill-mode-forwards">
                        <span className="inline-block py-1 px-3 rounded-full bg-[rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.06)] text-xs font-semibold uppercase tracking-wider mb-6 text-[hsl(var(--charcoal-light))]">
                            Introducing OmniChannel 2.0
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-8 max-w-4xl animate-fade-in opacity-0 fill-mode-forwards delay-100 sleak-text-gradient">
                        Unified communication for <span className="text-[hsl(var(--charcoal-light))]">modern teams</span>.
                    </h1>

                    <p className="text-xl md:text-2xl text-[hsl(var(--charcoal-light))] max-w-2xl mb-12 leading-relaxed animate-fade-in opacity-0 fill-mode-forwards delay-200">
                        Connect your channels, automate your workflows, and delight your customers with one beautiful, intelligent platform.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0 fill-mode-forwards delay-300">
                        <button className="minimalist-btn text-lg px-8 py-4">
                            Start Building Free <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="minimalist-btn-outline text-lg px-8 py-4 bg-white">
                            View Interactive Demo
                        </button>
                    </div>

                    {/* Abstract Visual / Hero Image */}
                    <div className="mt-24 w-full relative animate-scale-in opacity-0 fill-mode-forwards delay-400">
                        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] to-transparent z-10 bottom-0 h-32 pointer-events-none"></div>
                        <div className="rounded-2xl overflow-hidden shadow-2xl border border-[rgba(0,0,0,0.08)] bg-white p-2">
                            <div className="rounded-xl overflow-hidden bg-[hsl(var(--gray-light))] aspect-[16/9] relative flex items-center justify-center group">
                                {/* Placeholder for actual sophisticated dashboard screenshot */}
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop')] bg-cover bg-center opacity-90 group-hover:scale-105 transition-transform duration-700"></div>
                                <div className="absolute inset-0 bg-black/5"></div>
                                <div className="relative z-10 bg-white/90 backdrop-blur rounded-full px-6 py-3 shadow-lg flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="font-medium text-sm">System Operational</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Clients / Social Proof */}
                <section className="w-full border-y border-[rgba(0,0,0,0.04)] bg-[rgba(0,0,0,0.01)] py-12">
                    <div className="max-w-[var(--content-max-width)] mx-auto px-6 lg:px-12 flex flex-col items-center">
                        <p className="text-sm font-medium text-[hsl(var(--charcoal-light))] mb-8 opacity-70">TRUSTED BY INNOVATIVE TEAMS WORLDWIDE</p>
                        <div className="flex flex-wrap justify-center gap-12 lg:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Replaced SVGs with simple text for cleanliness if SVGs unavailable, but using Lucide icons as placeholders for logos conceptually */}
                            <div className="flex items-center gap-2 font-bold text-xl"><Globe className="w-6 h-6" /> Acme Corp</div>
                            <div className="flex items-center gap-2 font-bold text-xl"><Zap className="w-6 h-6" /> Bolt</div>
                            <div className="flex items-center gap-2 font-bold text-xl"><Shield className="w-6 h-6" /> SecureIO</div>
                            <div className="flex items-center gap-2 font-bold text-xl"><CheckCircle2 className="w-6 h-6" /> Verified</div>
                        </div>
                    </div>
                </section>

                {/* Feature Grid */}
                <section className="w-full max-w-[var(--content-max-width)] px-6 lg:px-12 py-32">
                    <div className="mb-20 text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold mb-6 tracking-tight">Simplicity is the ultimate sophistication.</h2>
                        <p className="text-lg text-[hsl(var(--charcoal-light))] leading-relaxed">
                            We've stripped away the noise to provide a focused, powerful environment for your most important work.
                        </p>
                    </div>

                    <div className="minimalist-grid">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="minimalist-card p-8 flex flex-col h-full bg-white group">
                                <div className="w-12 h-12 rounded-lg bg-[hsl(var(--gray-light))] mb-6 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                    {i === 1 && <Zap className="w-6 h-6" />}
                                    {i === 2 && <Shield className="w-6 h-6" />}
                                    {i === 3 && <Globe className="w-6 h-6" />}
                                </div>
                                <h3 className="text-xl font-bold mb-3">
                                    {i === 1 && "Lightning Fast"}
                                    {i === 2 && "Bank-Grade Security"}
                                    {i === 3 && "Global Infrastructure"}
                                </h3>
                                <p className="text-[hsl(var(--charcoal-light))] text-sm leading-relaxed mb-6 flex-1">
                                    {i === 1 && "Optimized for speed with edge computing capabilities ensuring zero latency."}
                                    {i === 2 && "Enterprise-level encryption and compliance standards built-in from day one."}
                                    {i === 3 && "Deployed across 35 regions worldwide to be close to your customers."}
                                </p>
                                <Link href="#" className="inline-flex items-center text-sm font-semibold hover:gap-2 transition-all">
                                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="w-full px-6 lg:px-12 pb-24">
                    <div className="minimalist-card glass w-full max-w-[var(--content-max-width)] mx-auto p-12 lg:p-24 text-center rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black to-transparent opacity-20"></div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight relative z-10">Ready to simplify?</h2>
                        <p className="text-xl text-[hsl(var(--charcoal-light))] mb-10 max-w-2xl mx-auto relative z-10">
                            Join thousands of teams who have switched to a better way of working.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                            <button className="minimalist-btn text-lg px-10 py-4">
                                Get Started Now
                            </button>
                        </div>

                        {/* Background Decor */}
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[hsl(var(--gray-light))] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[hsl(var(--gray-light))] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="w-full border-t border-[rgba(0,0,0,0.04)] py-12 px-6 lg:px-12 bg-white">
                <div className="max-w-[var(--content-max-width)] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm text-[hsl(var(--charcoal-light))]">
                        &copy; {new Date().getFullYear()} OmniChannel Inc. All rights reserved.
                    </div>
                    <div className="flex gap-8 text-sm font-medium text-[hsl(var(--charcoal-light))]">
                        <Link href="#" className="hover:text-black">Privacy</Link>
                        <Link href="#" className="hover:text-black">Terms</Link>
                        <Link href="#" className="hover:text-black">Twitter</Link>
                        <Link href="#" className="hover:text-black">GitHub</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
