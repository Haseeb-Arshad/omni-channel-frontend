'use client';
import React, { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function PricingCTA() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Hook into waitlist endpoint.
  };

  return (
    <section className="relative border-t border-white/10 bg-[#050607] text-zinc-100">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-16"
          style={{
            background: 'radial-gradient(circle at top, rgba(132,138,255,0.18), transparent 60%)'
          }}
        />
      </div>
      <div className="relative mx-auto max-w-5xl px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.6 }}
          className="rounded-[36px] border border-white/12 bg-black/40 px-8 py-14 text-center backdrop-blur"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-zinc-500">Pricing & access</p>
          <h3 className="mt-6 text-3xl font-light leading-tight text-zinc-100 sm:text-5xl">
            Start with a pilot. Graduate to a co-pilot that runs the channel.
          </h3>
          <p className="mt-6 text-base text-zinc-400">
            Join the monthly cohort for founders, operators, and enterprise teams. No credit card required -- we pair you
            with a dedicated success lead before launch.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
          >
            <label htmlFor="waitlist-email" className="sr-only">
              Work email
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              className="w-full rounded-full border border-white/15 bg-black/40 px-6 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 sm:w-72"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.08] px-8 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-zinc-100 transition duration-300 hover:border-white/40 hover:bg-white/20"
            >
              Join waitlist
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-6 text-sm text-zinc-500">
            We onboard a limited cohort every month to keep automation outcomes high.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
