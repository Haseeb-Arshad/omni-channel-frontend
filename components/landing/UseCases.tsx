'use client';
import React from 'react';
import { motion } from 'framer-motion';

const flows = [
  {
    id: 'signals',
    label: 'Flow 01',
    title: 'Signals -> Executive Brief',
    summary: 'Collects finance, support, and product signals to deliver a board-ready note before standup.',
    cadence: '08:00 daily',
    stack: 'Notion / Slack / Snowflake'
  },
  {
    id: 'loop',
    label: 'Flow 02',
    title: 'Customer Loop Closed',
    summary: 'Triages voice, chat, and inbox threads, routes to the right pod, and posts outcomes with receipts.',
    cadence: 'Live triggers',
    stack: 'Zendesk / Gmail / Slack'
  },
  {
    id: 'revenue',
    label: 'Flow 03',
    title: 'Revenue Intelligence Pulse',
    summary: 'Combines product usage, CRM notes, and call highlights to warn when deals slip or expand.',
    cadence: 'Every 4 hours',
    stack: 'HubSpot / Gong / Snowflake'
  }
] as const;

export default function UseCases() {
  return (
    <section className="relative border-t border-white/10 bg-[#050607] text-zinc-100">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '140px 100%'
          }}
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            className="space-y-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-zinc-500">
              Designed for the teams who live in channels
            </p>
            <h2 className="text-3xl font-light leading-tight sm:text-5xl">
              Real work, orchestrated without dashboards or handoffs.
            </h2>
            <p className="max-w-md text-base text-zinc-400">
              OmniTalk learns your rituals, picks up the tone, and ships outcomes you can forward straight to the room.
              Every flow stays auditable and reversible.
            </p>
            <div className="flex flex-col gap-2 text-sm text-zinc-500">
              <span>- Go from voice command to a shipped update in under 90 seconds.</span>
              <span>- Keep humans in the loop with approvals or auto-run modes.</span>
              <span>- Instrument everything -- metrics land in the tools you already trust.</span>
            </div>
          </motion.div>

          <div className="grid gap-5">
            {flows.map((flow, index) => (
              <motion.article
                key={flow.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 * index }}
                viewport={{ once: true, amount: 0.45 }}
                className="group rounded-3xl border border-white/12 bg-black/30 p-6 backdrop-blur transition duration-300 hover:border-white/40 hover:bg-white/10"
              >
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
                  <span>{flow.label}</span>
                  <span>{flow.cadence}</span>
                </div>
                <h3 className="mt-4 text-2xl font-light text-zinc-100">{flow.title}</h3>
                <p className="mt-3 text-sm text-zinc-400">{flow.summary}</p>
                <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-zinc-500">
                  <span>{flow.stack}</span>
                  <span className="transition duration-300 group-hover:translate-x-2">-></span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
