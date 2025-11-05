'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Database, BrainCircuit } from 'lucide-react';

const lattice = [
  { id: 'docs', title: 'Docs & Wikis', detail: 'Version-aware, auto-linked to open tickets.' },
  { id: 'crm', title: 'CRM', detail: 'Accounts, stages, and managers stitched with product signals.' },
  { id: 'support', title: 'Support', detail: 'Voice transcripts, chats, and CSAT fed straight into the index.' },
  { id: 'people', title: 'People', detail: 'Org context and relationships enrich every response.' }
] as const;

const assurances = [
  { id: 'security', icon: ShieldCheck, label: 'PII redaction by default' },
  { id: 'sync', icon: Database, label: 'Re-index every 4 minutes' },
  { id: 'brain', icon: BrainCircuit, label: 'Diffs stay explainable' }
] as const;

export default function KnowledgebaseAgent() {
  return (
    <section className="relative border-t border-white/10 bg-[#050607] text-zinc-100">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-12"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '100% 120px'
          }}
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            className="space-y-8"
          >
            <span className="inline-flex items-center gap-3 rounded-full border border-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
              Knowledge operating system
            </span>
            <h3 className="text-3xl font-light leading-tight sm:text-5xl">
              OmniTalk builds a second brain that stays current and citeable.
            </h3>
            <p className="max-w-lg text-base text-zinc-400">
              Every conversation, dashboard, and internal doc is indexed with guardrails. Ask a question, and the agent
              references the source before it answers or acts.
            </p>
            <ul className="space-y-4 text-sm text-zinc-400">
              {lattice.map((node, index) => (
                <li key={node.id} className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium tracking-[0.08em] text-zinc-200">{node.title}</p>
                    <p className="mt-1 text-sm text-zinc-500">{node.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-zinc-500">
              {assurances.map((assurance) => (
                <span
                  key={assurance.id}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-zinc-400"
                >
                  <assurance.icon className="h-3.5 w-3.5" />
                  {assurance.label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            viewport={{ once: true, amount: 0.45 }}
            className="relative rounded-[36px] border border-white/12 bg-black/30 p-8 backdrop-blur"
          >
            <div className="grid gap-4">
              {lattice.map((node) => (
                <div
                  key={node.id}
                  className="rounded-3xl border border-white/12 bg-white/[0.03] px-5 py-4 text-sm text-zinc-300 transition duration-300 hover:border-white/35 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-zinc-500">
                    <span>{node.title}</span>
                    <span>Synced</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">{node.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-xs uppercase tracking-[0.32em] text-zinc-400">
              Every answer links to the source — audit trails without leaving the conversation.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
