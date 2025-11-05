'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mic, Play, Sparkles } from 'lucide-react';
import '../../styling/cofounder-hero.css';

const transmissions = [
  {
    id: 'ops',
    title: 'Ops rhythm on autopilot',
    detail: 'Daily standups drafted, blockers escalated, and a clean note queued for leadership.',
    prompt: 'Send me a weekly competitor report'
  },
  {
    id: 'sync',
    title: 'Every channel in one thread',
    detail: 'Voice follow-ups, support tickets, and outbound sequences stay in a single conversation.',
    prompt: 'Schedule the product sync for tomorrow'
  },
  {
    id: 'retention',
    title: 'Customers feel the follow-through',
    detail: 'Feedback is summarised, actions assigned, and the loop closes before anyone nudges.',
    prompt: 'Summarize customer complaints and email action plan'
  }
] as const;

const placeholders = transmissions.map((item) => item.prompt);
const ease = [0.16, 1, 0.3, 1];

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    if (searchQuery.trim().length > 0) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [searchQuery]);

  const activePlaceholder = useMemo(() => placeholders[placeholderIndex], [placeholderIndex]);

  return (
    <section className="landing-hero relative isolate overflow-hidden bg-[#050607] text-zinc-100">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: 'radial-gradient(circle at top, rgba(108,115,255,0.18), transparent 58%)'
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '100% 140px'
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.065) 1px, transparent 1px)',
            backgroundSize: '120px 100%'
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-between gap-16 px-6 pb-24 pt-28 lg:flex-row lg:items-end lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.12 }}
          className="max-w-2xl space-y-10"
        >
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.45em] text-zinc-400">
            <span className="h-px w-12 bg-gradient-to-r from-white/60 to-transparent" />
            Omni Channel OS
          </div>
          <div>
            <h1 className="text-4xl font-light leading-[1.08] tracking-tight text-zinc-100 sm:text-6xl lg:text-[72px]">
              A calm operator for every customer touchpoint.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-zinc-400 sm:text-xl">
              OmniTalk listens across voice, chat, and email, stitches the context, and delivers the next move without you juggling tabs.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button className="landing-button-primary">
              Launch the agent
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button className="landing-button-secondary">
              Watch the 90s walkthrough
              <Play className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-zinc-500">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Voice · Chat · Human handoff</span>
            </span>
            <span className="hidden h-px w-16 bg-gradient-to-r from-white/40 to-transparent sm:block" />
            <span className="text-zinc-500/80">Under 4 minutes to first automated outcome</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.24 }}
          className="w-full max-w-md space-y-6 rounded-[28px] border border-white/12 bg-white/[0.04] p-6 shadow-[0_50px_120px_-80px_rgba(15,20,40,0.85)] backdrop-blur"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-zinc-500">
              Live prompt console
            </p>
            <div className="mt-3 flex items-center gap-3 rounded-[22px] border border-white/10 bg-black/40 px-4 py-3 text-sm text-zinc-200">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Mic className="h-3.5 w-3.5" />
              </span>
              <input
                aria-label="Describe a workflow to automate"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={searchQuery ? undefined : activePlaceholder}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                Enter
              </span>
            </div>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-white/25 via-white/10 to-transparent" />
          <ul className="space-y-3 text-sm text-zinc-300">
            {transmissions.map((item, index) => {
              const isActive = index === placeholderIndex;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.1 * index }}
                  className={`rounded-2xl border px-4 py-4 transition duration-300 ${
                    isActive
                      ? 'border-white/45 bg-white/10 text-zinc-100'
                      : 'border-white/10 bg-black/20 text-zinc-400 hover:border-white/20 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.32em]">
                    <span>{item.title}</span>
                    <motion.span
                      animate={{
                        opacity: isActive ? [0.4, 1, 0.4] : 0.4
                      }}
                      transition={{
                        duration: isActive ? 2 : 0.3,
                        repeat: isActive ? Infinity : 0,
                        ease: 'easeInOut'
                      }}
                      className="inline-flex items-center gap-2 text-amber-300"
                    >
                      {isActive ? 'Syncing' : 'Idle'}
                    </motion.span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">{item.detail}</p>
                  <p className="mt-3 text-xs text-zinc-500">“{item.prompt}”</p>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
