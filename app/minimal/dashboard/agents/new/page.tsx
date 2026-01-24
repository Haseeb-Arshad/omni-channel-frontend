"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Bot, Database, Share2, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Data for selections
const PERSONAS = [
    { id: '1', name: 'Empathetic Support', description: 'Patient, helpful, and polite.' },
    { id: '2', name: 'Aggressive Sales', description: 'Persuasive, high-energy, closer.' },
    { id: '3', name: 'Technical Expert', description: 'Precise, technical, and concise.' },
];

const KNOWLEDGE_BASES = [
    { id: '1', name: 'Product Manuals', docs: 12 },
    { id: '2', name: 'Company Policy', docs: 5 },
    { id: '3', name: 'Sales Scripts', docs: 8 },
];

const CHANNELS = [
    { id: 'web', name: 'Web Widget', icon: '🌐' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '💬' },
    { id: 'email', name: 'Email', icon: '✉️' },
    { id: 'slack', name: 'Slack', icon: '🤖' },
];

export default function NewAgentPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        purpose: '',
        personaId: '',
        knowledgeIds: [] as string[],
        channelIds: [] as string[]
    });

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const toggleKnowledge = (id: string) => {
        setFormData(prev => ({
            ...prev,
            knowledgeIds: prev.knowledgeIds.includes(id)
                ? prev.knowledgeIds.filter(k => k !== id)
                : [...prev.knowledgeIds, id]
        }));
    };

    const toggleChannel = (id: string) => {
        setFormData(prev => ({
            ...prev,
            channelIds: prev.channelIds.includes(id)
                ? prev.channelIds.filter(c => c !== id)
                : [...prev.channelIds, id]
        }));
    };

    return (
        <div className="max-w-3xl mx-auto py-12">
            {/* Header */}
            <div className="mb-12">
                <Link href="/minimal/dashboard/agents" className="text-sm text-[#242929]/50 hover:text-[#242929] mb-4 inline-block">
                    &larr; Back to Agents
                </Link>
                <h1 className="text-3xl font-[family-name:var(--font-heading)] text-[#242929]">Create New Agent</h1>
                <p className="text-[#242929]/60 font-light">Configure your autonomous agent in just a few steps.</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-4 mb-12">
                {[
                    { num: 1, label: "Identity", icon: Bot },
                    { num: 2, label: "Knowledge", icon: Database },
                    { num: 3, label: "Channels", icon: Share2 }
                ].map((s) => (
                    <div key={s.num} className="flex-1 flex flex-col items-center relative group">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 bg-white transition-colors duration-300",
                            step >= s.num ? "border-[#242929] text-[#242929]" : "border-[#242929]/10 text-[#242929]/30"
                        )}>
                            <s.icon className="w-4 h-4" />
                        </div>
                        <span className={cn(
                            "text-xs mt-2 font-medium uppercase tracking-wider transition-colors duration-300",
                            step >= s.num ? "text-[#242929]" : "text-[#242929]/30"
                        )}>{s.label}</span>

                        {/* Connector Line */}
                        {s.num < 3 && (
                            <div className={cn(
                                "absolute top-5 left-1/2 w-full h-[2px] -z-0 transition-colors duration-300",
                                step > s.num ? "bg-[#242929]" : "bg-[#242929]/10"
                            )} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="bg-white p-8 rounded-2xl border border-[#242929]/10 shadow-sm min-h-[400px]">
                {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <div>
                            <label className="block text-sm font-medium text-[#242929] mb-2">Agent Name</label>
                            <input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-[#fafafa] border border-[#242929]/10 rounded-xl px-4 py-3 outline-none focus:border-[#242929] transition-colors"
                                placeholder="e.g., Sales Assistant"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#242929] mb-2">Primary Purpose</label>
                            <textarea
                                value={formData.purpose}
                                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                                className="w-full bg-[#fafafa] border border-[#242929]/10 rounded-xl px-4 py-3 outline-none focus:border-[#242929] transition-colors h-24 resize-none"
                                placeholder="What is this agent's main goal?"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#242929] mb-2">Assign Persona</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {PERSONAS.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => setFormData({ ...formData, personaId: p.id })}
                                        className={cn(
                                            "p-4 rounded-xl border cursor-pointer transition-all",
                                            formData.personaId === p.id
                                                ? "border-[#242929] bg-[#242929]/5"
                                                : "border-[#242929]/10 hover:border-[#242929]/30"
                                        )}
                                    >
                                        <div className="font-medium text-[#242929]">{p.name}</div>
                                        <div className="text-xs text-[#242929]/60">{p.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-lg font-medium text-[#242929]">Select Knowledge Bases</h3>
                        <p className="text-sm text-[#242929]/60">Choose which documents this agent can reference.</p>
                        <div className="space-y-3">
                            {KNOWLEDGE_BASES.map(kb => (
                                <div
                                    key={kb.id}
                                    onClick={() => toggleKnowledge(kb.id)}
                                    className={cn(
                                        "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                                        formData.knowledgeIds.includes(kb.id)
                                            ? "border-[#242929] bg-[#242929]/5"
                                            : "border-[#242929]/10 hover:border-[#242929]/30"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <Database className="w-5 h-5 text-[#242929]/70" />
                                        <div>
                                            <div className="font-medium text-[#242929]">{kb.name}</div>
                                            <div className="text-xs text-[#242929]/60">{kb.docs} documents</div>
                                        </div>
                                    </div>
                                    {formData.knowledgeIds.includes(kb.id) && (
                                        <div className="w-6 h-6 rounded-full bg-[#242929] flex items-center justify-center text-white">
                                            <Check className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-lg font-medium text-[#242929]">Connect Channels</h3>
                        <p className="text-sm text-[#242929]/60">Where should this agent specificially live?</p>
                        <div className="grid grid-cols-2 gap-4">
                            {CHANNELS.map(c => (
                                <div
                                    key={c.id}
                                    onClick={() => toggleChannel(c.id)}
                                    className={cn(
                                        "p-6 rounded-xl border cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-3",
                                        formData.channelIds.includes(c.id)
                                            ? "border-[#242929] bg-[#242929]/5"
                                            : "border-[#242929]/10 hover:border-[#242929]/30"
                                    )}
                                >
                                    <div className="text-2xl">{c.icon}</div>
                                    <div className="font-medium text-[#242929]">{c.name}</div>
                                    {formData.channelIds.includes(c.id) && (
                                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#242929] flex items-center justify-center text-white">
                                            <Check className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex justify-between items-center">
                <button
                    onClick={handleBack}
                    disabled={step === 1}
                    className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
                        step === 1 ? "opacity-0 pointer-events-none" : "hover:bg-[#242929]/5 text-[#242929]"
                    )}
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <button
                    onClick={step === 3 ? () => alert('Agent Created!') : handleNext}
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#242929] text-white font-medium hover:bg-black transition-transform hover:scale-105"
                >
                    {step === 3 ? 'Deploy Agent' : 'Next Step'}
                    {step !== 3 && <ArrowRight className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
}

