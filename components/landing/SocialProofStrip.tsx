'use client';
import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  'Atlas Labs',
  'Northwind Ops',
  'Lumen AI',
  'Kinetic Systems',
  'Seven Rooms',
  'Polar Street'
] as const;

export default function SocialProofStrip() {
  return (
    <section className="relative border-t border-white/10 bg-[#050607] text-zinc-100">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '100% 120px'
          }}
        />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-sm text-xs font-medium uppercase tracking-[0.35em] text-zinc-500">
          Trusted by operators who run always-on product and support channels
        </div>
        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-wrap justify-center gap-x-10 gap-y-5 text-sm font-semibold uppercase tracking-[0.52em] text-zinc-400/90"
        >
          {partners.map((partner) => (
            <li key={partner} className="flex items-center gap-2">
              <span className="h-px w-6 bg-gradient-to-r from-white/35 to-transparent" />
              <span>{partner}</span>
            </li>
          ))}
        </motion.ul>
      </div>
      <div className="relative mx-auto max-w-4xl px-6 pb-14 text-center text-sm text-zinc-500 lg:px-8">
        "It feels like we onboarded a chief of staff who was already in every channel." -- CTO, Series B SaaS
      </div>
    </section>
  );
}
