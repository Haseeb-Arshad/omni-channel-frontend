'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap } from 'lucide-react';

const guarantees = [
  {
    id: 'security',
    icon: Shield,
    title: 'Enterprise grade security',
    detail: 'SSO/SAML, SCIM, per-tenant keys, and full audit trails ship as standard.'
  },
  {
    id: 'privacy',
    icon: Lock,
    title: 'Private by design',
    detail: 'PII redaction, on-prem deploy options, and human approvals baked into every flow.'
  },
  {
    id: 'performance',
    icon: Zap,
    title: 'Performance that scales',
    detail: 'Sub-second responses, dedicated queues, and observability hooks for platform teams.'
  }
] as const;

export default function PerformanceSecurity() {
  return (
    <section className="relative border-t border-white/10 bg-[#050607] text-zinc-100">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-12"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '100% 110px'
          }}
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-3xl space-y-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-zinc-500">Performance & Security</p>
          <h3 className="text-3xl font-light leading-tight sm:text-5xl">Enterprise ready on day one.</h3>
          <p className="text-base text-zinc-400">
            Your identity provider, your cloud, your logs. OmniTalk fits into the guardrails your security teams already
            enforce.
          </p>
        </motion.div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {guarantees.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 * index }}
              viewport={{ once: true, amount: 0.4 }}
              className="rounded-3xl border border-white/12 bg-white/[0.03] px-6 py-6 text-sm text-zinc-300 transition duration-300 hover:border-white/35 hover:bg-white/10"
            >
              <item.icon className="h-6 w-6 text-zinc-200" />
              <h4 className="mt-4 text-lg font-medium tracking-[0.08em] text-zinc-100">{item.title}</h4>
              <p className="mt-3 text-sm text-zinc-400">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
