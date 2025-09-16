"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Paperclip, Check } from 'lucide-react';

// Minimal, sleek looping demo matching the provided screenshots
const AnimatedDemo: React.FC = () => {
  const steps = useMemo(
    () => [
      {
        type: 'greeting' as const,
        title: 'Good morning, Andrew',
        subtitle: "Describe what you want to automate — we'll take it from there.",
        inputText:
          'Monitor linear for issues marked as done or completed. Filter for issues tagged with feature or bug that should be included in release notes. For each qualifying issue, append an entry to the release notes page.',
      },
      {
        type: 'automation' as const,
        title: 'Linear Issue Closed to Notion Release Notes',
        content:
          'Also add linear issues tagged as enhancement to the release notes',
        toast: false,
      },
      {
        type: 'automation' as const,
        title: 'Linear Issue Closed to Notion Release Notes',
        content:
          'Also add linear issues tagged as enhancement to the release notes',
        toast: true,
        toastText: 'New tag added to the automation',
      },
    ],
    []
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [typed, setTyped] = useState('');

  // Loop steps with per-step timing; type on greeting
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const step = steps[stepIndex];

    if (step.type === 'greeting') {
      setTyped('');
      const text = step.inputText;
      let i = 0;
      const tick = () => {
        i += 2; // slightly faster typing
        setTyped(text.slice(0, Math.min(i, text.length)));
        if (i < text.length) {
          timer = setTimeout(tick, 18);
        } else {
          timer = setTimeout(() => setStepIndex((s) => (s + 1) % steps.length), 900);
        }
      };
      timer = setTimeout(tick, 200);
    } else {
      timer = setTimeout(() => setStepIndex((s) => (s + 1) % steps.length), 2600);
    }

    return () => timer && clearTimeout(timer);
  }, [stepIndex, steps]);

  const step = steps[stepIndex];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle, minimal background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(17,24,39,.06),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(17,24,39,.05),transparent_60%)]" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[600px]">
          <AnimatePresence mode="wait">
            {step.type === 'greeting' && (
              <motion.div
                key="greeting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className="w-full max-w-3xl text-center"
              >
                <div className="text-4xl md:text-5xl font-light text-gray-900 mb-6">{step.title}</div>
                <div className="text-base md:text-lg text-gray-600 mb-8">{step.subtitle}</div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/70 backdrop-blur-xl border border-gray-200/60 shadow-lg rounded-2xl p-5 text-left"
                >
                  <div className="min-h-[110px] text-[15px] leading-relaxed text-gray-800">
                    {typed}
                    <motion.span
                      className="inline-block align-bottom w-[2px] h-5 bg-gray-700 ml-0.5"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-200/70 pt-3">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="h-9 w-9 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-sm"
                    >
                      <ArrowUp className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {step.type === 'automation' && (
              <motion.div
                key={`automation-${stepIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className="w-full max-w-3xl"
              >
                <div className="bg-white/75 backdrop-blur-xl border border-gray-200/70 shadow-lg rounded-2xl p-5 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="text-[17px] font-medium text-gray-900">{step.title}</div>
                    <div className="flex gap-2">
                      <div className="h-6 w-6 rounded bg-gray-900 text-white text-[11px] grid place-items-center">L</div>
                      <div className="h-6 w-6 rounded bg-gray-900 text-white text-[11px] grid place-items-center">N</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-xl border border-gray-200/70 shadow-lg rounded-2xl p-5">
                  <p className="text-[15px] leading-relaxed text-gray-800 mb-5">
                    {step.content.split('enhancement').map((part, i) => (
                      <span key={i}>
                        {part}
                        {i === 0 && (
                          <span className="align-baseline ml-1 mr-1 inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[12px] text-blue-700">
                            enhancement
                          </span>
                        )}
                      </span>
                    ))}
                  </p>

                  <div className="flex items-center justify-between">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="h-9 w-9 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-sm"
                    >
                      <ArrowUp className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step.type === 'automation' && (step as any).toast && (
              <motion.div
                key={`toast-${stepIndex}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2"
              >
                <div className="rounded-xl bg-gray-900 text-white/95 px-4 py-3 shadow-xl flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-[13px]">{(step as any).toastText}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 text-center text-gray-700 text-[15px]"
        >
          Automate your work with natural language across the tools you use. Update it anytime with plain English.
        </motion.p>
      </div>
    </section>
  );
};

export default AnimatedDemo;
