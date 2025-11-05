'use client';
import React from 'react';
import { motion } from 'framer-motion';
import '../../styling/hero-playground.css';

const pipeline = [
  {
    id: 'listen',
    title: 'Listen',
    description: 'OmniTalk captures voice, chat, and inbox threads with entities and sentiment preserved.',
    mark: '00:08'
  },
  {
    id: 'understand',
    title: 'Understand',
    description: 'Customer history, product usage, and docs are blended into a single brief per contact.',
    mark: '00:20'
  },
  {
    id: 'act',
    title: 'Act',
    description: 'Approvals trigger polished responses, task updates, and meeting prep across your tooling.',
    mark: '00:41'
  },
  {
    id: 'show',
    title: 'Show',
    description: 'Traceable artifacts land in Slack, CRM, and dashboards—ready to forward without edits.',
    mark: '00:58'
  }
] as const;

const toggles = ['Tone memory', 'Brand guardrails', 'Approvals', 'Redaction'];

export default function PromptPlayground() {
  return (
    <section className="relative border-t border-white/10 bg-[#050607] text-zinc-100">
      <div aria-hidden className="playground-pattern absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            viewport={{ once: true, amount: 0.5 }}
            className="space-y-8"
          >
            <span className="inline-flex items-center gap-3 rounded-full border border-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
              Runbook intelligence
            </span>
            <h2 className="text-3xl font-light leading-tight sm:text-5xl">
              Your tone, your guardrails, delivered faster than you could brief a human.
            </h2>
            <p className="max-w-lg text-base text-zinc-400">
              OmniTalk adapts to how your brand speaks. Serious to board, warm to customers, concise to internal teams.
              Everything stays inspectable before it leaves the building.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {toggles.map((toggle) => (
                <div
                  key={toggle}
                  className="rounded-2xl border border-white/12 bg-black/30 px-4 py-3 text-xs uppercase tracking-[0.32em] text-zinc-500"
                >
                  {toggle}
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-white/12 bg-black/40 p-6 text-sm text-zinc-300">
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-zinc-500">This morning's send</p>
              <p className="mt-3 text-zinc-200">
                “Board prep is live in Notion. Customer churn risk flagged for ACME, follow-ups assigned in HubSpot, and a
                polished Slack update is queued for #leadership.”
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            viewport={{ once: true, amount: 0.45 }}
            className="relative rounded-[32px] border border-white/12 bg-black/40 p-8 backdrop-blur"
          >
            <div className="absolute inset-y-10 left-[18px] w-px bg-gradient-to-b from-white/50 via-white/20 to-transparent" aria-hidden />
            <div className="space-y-6">
              {pipeline.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.08 * index }}
                  viewport={{ once: true, amount: 0.6 }}
                  className="relative pl-10"
                >
                  <span className="stage-dot absolute left-0 top-1.5 h-3 w-3 rounded-full bg-white/60 shadow-[0_0_0_6px_rgba(255,255,255,0.08)]" />
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-zinc-500">
                    <span>{stage.title}</span>
                    <span>{stage.mark}</span>
                  </div>
                  <p className="mt-3 text-sm text-zinc-300">{stage.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-xs uppercase tracking-[0.32em] text-zinc-400">
              Handshake ready: export to Slack, email, Notion, or pipe straight into your CRM.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
