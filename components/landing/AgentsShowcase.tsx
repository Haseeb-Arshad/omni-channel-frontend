"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Scroll-following section that showcases a specialized agent
// Layout mirrors the screenshot: centered tagline, left image card, right copy,
// with the left rail navigation present on large screens.
const AgentsShowcase: React.FC = () => {
  return (
    <section id="product" className="py-20 bg-white relative">
      <div className="lg:ml-48 max-w-6xl mx-auto px-6">
        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl md:text-3xl font-light text-gray-900"
        >
          Access our specialized agents that automate your business for you
        </motion.h2>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-gray-200/70" />

        {/* Showcase row */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Image card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              {/* CSS-only stylized sky with clouds to keep bundle light */}
              <div
                className="w-full aspect-[16/10]"
                style={{
                  background: 'linear-gradient(#67b7ff,#2f88ff)'
                }}
              >
                <div className="relative w-full h-full">
                  {/* layered cloud blobs */}
                  <div className="absolute inset-0 opacity-95"
                    style={{
                      background:
                        'radial-gradient(circle at 20% 70%, rgba(255,255,255,0.9) 0 18%, transparent 19%),\
                         radial-gradient(circle at 35% 78%, rgba(255,255,255,0.85) 0 14%, transparent 15%),\
                         radial-gradient(circle at 55% 72%, rgba(255,255,255,0.9) 0 16%, transparent 17%),\
                         radial-gradient(circle at 75% 65%, rgba(255,255,255,0.88) 0 18%, transparent 19%),\
                         radial-gradient(circle at 70% 85%, rgba(255,255,255,0.9) 0 14%, transparent 15%),\
                         radial-gradient(circle at 40% 55%, rgba(255,255,255,0.85) 0 16%, transparent 17%),\
                         radial-gradient(circle at 15% 50%, rgba(255,255,255,0.82) 0 14%, transparent 15%)',
                    }}
                  />
                  {/* subtle sparkle dots */}
                  <div className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.45) 0 1px, transparent 2px),\
                         radial-gradient(circle at 60% 30%, rgba(255,255,255,0.35) 0 1px, transparent 2px),\
                         radial-gradient(circle at 80% 60%, rgba(255,255,255,0.4) 0 1px, transparent 2px),\
                         radial-gradient(circle at 35% 40%, rgba(255,255,255,0.3) 0 1px, transparent 2px)'
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copy block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-5"
          >
            <h3 className="text-2xl font-medium text-gray-900 mb-3 font-adobe-body">Knowledgebase Agent</h3>
            <p className="text-gray-600 leading-relaxed font-adobe-body">
              Connect your email, CRM, calendar, and Notion to build a complete and always‑updated
              memory for your business.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3 font-adobe-body">
              Cofounder Knowledgebase runs 24/7 to keep your business memory updated.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AgentsShowcase;
