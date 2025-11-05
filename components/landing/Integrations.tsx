'use client';
import React from 'react';
import { motion } from 'framer-motion';

type Capability = {
  id: string;
  title: string;
  description: string;
  tools: string[];
};

const CAPABILITIES: Capability[] = [
  {
    id: 'communication',
    title: 'Communication',
    description: 'Announce product changes, recap meetings, and queue replies to customers without opening a tab.',
    tools: ['Slack', 'Gmail', 'Loom']
  },
  {
    id: 'work-management',
    title: 'Work Management',
    description: 'Keep sprints, retros, and roadmaps in motion with automatic updates and escalations.',
    tools: ['Linear', 'Airtable', 'ClickUp']
  },
  {
    id: 'knowledge-docs',
    title: 'Knowledge & Docs',
    description: 'Write, link, and refresh the documents that explain what happened and why.',
    tools: ['Notion', 'Google Docs', 'Google Drive']
  },
  {
    id: 'crm-sales',
    title: 'CRM & Sales',
    description: 'Blend usage metrics with call notes, trigger follow-ups, and surface at-risk accounts before the call.',
    tools: ['HubSpot', 'Intercom', 'Snowflake']
  },
  {
    id: 'engineering-data',
    title: 'Engineering Signals',
    description: 'Tie deploys, incidents, and analytics to customer impact so teams stay aligned.',
    tools: ['GitHub', 'Vercel', 'OpenAI']
  }
];

export default function Integrations() {
  return (
    <section className="relative border-t border-white/10 bg-[#050607] text-zinc-100">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-12"
          style={{
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '140px 100%'
          }}
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            className="space-y-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-zinc-500">Integrations</p>
            <h3 className="text-3xl font-light leading-tight sm:text-5xl">
              Bring the tools you already live in. OmniTalk orchestrates them with receipts.
            </h3>
            <p className="text-base text-zinc-400">
              Each workflow keeps owners, guardrails, and audit logs intact. No custom build required — just connect the
              accounts you rely on and decide what the agent can ship.
            </p>
            <div className="rounded-3xl border border-white/12 bg-black/30 p-6 text-sm text-zinc-300">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-500">Control tower</p>
              <p className="mt-3 text-sm text-zinc-400">
                Per-integration approvals, rate limits, and observability hooks keep security teams confident while
                operators move fast.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {CAPABILITIES.map((capability, index) => (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 * index }}
                viewport={{ once: true, amount: 0.4 }}
                className="rounded-3xl border border-white/12 bg-white/[0.03] px-6 py-5 text-sm text-zinc-300 transition duration-300 hover:border-white/35 hover:bg-white/10"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.32em] text-zinc-500">
                  <span>{capability.title}</span>
                  <span className="text-zinc-400">{capability.tools.join(' · ')}</span>
                </div>
                <p className="mt-3 text-sm text-zinc-400">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
