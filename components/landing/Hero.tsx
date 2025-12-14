'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import '../../styling/cofounder-hero.css';

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200">
        {/* Cloud elements with animation */}
        <div className="absolute top-20 right-20 w-32 h-16 bg-white/70 rounded-full blur-sm animate-drift shadow-lg"></div>
        <div className="absolute top-32 right-40 w-24 h-12 bg-white/50 rounded-full blur-sm animate-drift shadow-md" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-16 left-1/3 w-40 h-20 bg-white/60 rounded-full blur-sm animate-drift shadow-lg" style={{ animationDelay: '10s' }}></div>
        <div className="absolute top-40 left-1/4 w-28 h-14 bg-white/40 rounded-full blur-sm animate-drift shadow-md" style={{ animationDelay: '15s' }}></div>
        <div className="absolute top-60 right-1/3 w-36 h-18 bg-white/50 rounded-full blur-sm animate-drift shadow-md" style={{ animationDelay: '20s' }}></div>
        <div className="absolute top-80 left-1/5 w-20 h-10 bg-white/35 rounded-full blur-sm animate-drift shadow-sm" style={{ animationDelay: '25s' }}></div>

        {/* Gradient fade to white at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
      </div>

      {/* Sunflower illustration - left side */}
      <div className="absolute left-8 top-1/4 z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative animate-sway"
        >
          {/* Sunflower stem */}
          <div className="w-3 h-48 bg-gradient-to-b from-green-500 to-green-700 rounded-full mx-auto shadow-lg"></div>

          {/* Sunflower leaves */}
          <div className="absolute top-24 -left-5 w-10 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full transform -rotate-45 shadow-md"></div>
          <div className="absolute top-36 -right-5 w-8 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full transform rotate-45 shadow-md"></div>

          {/* Sunflower head */}
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center animate-float shadow-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-800 to-yellow-900 rounded-full"></div>
            {/* Petals */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-8 bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-full shadow-sm"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-24px)`,
                  transformOrigin: 'center bottom'
                }}
              ></div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sunflowers on the right */}
      <div className="absolute right-8 bottom-20 z-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative"
        >
          {/* Multiple sunflowers */}
          <div className="flex space-x-6">
            {/* First sunflower */}
            <div className="relative animate-sway" style={{ animationDelay: '1s' }}>
              <div className="w-2 h-36 bg-gradient-to-b from-green-500 to-green-700 rounded-full shadow-md"></div>
              <div className="absolute -top-7 -left-7 w-14 h-14 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="w-5 h-5 bg-gradient-to-br from-yellow-800 to-yellow-900 rounded-full"></div>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2.5 h-6 bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-full"
                    style={{
                      transform: `rotate(${i * 36}deg) translateY(-18px)`,
                      transformOrigin: 'center bottom'
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Second sunflower */}
            <div className="relative animate-sway" style={{ animationDelay: '2s' }}>
              <div className="w-2 h-32 bg-gradient-to-b from-green-500 to-green-700 rounded-full shadow-md"></div>
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-4 h-4 bg-gradient-to-br from-yellow-800 to-yellow-900 rounded-full"></div>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-5 bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-full"
                    style={{
                      transform: `rotate(${i * 45}deg) translateY(-15px)`,
                      transformOrigin: 'center bottom'
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Third smaller sunflower */}
            <div className="relative animate-sway" style={{ animationDelay: '1.5s' }}>
              <div className="w-1.5 h-24 bg-gradient-to-b from-green-500 to-green-700 rounded-full shadow-md"></div>
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-md animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-yellow-800 to-yellow-900 rounded-full"></div>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-4 bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-full"
                    style={{
                      transform: `rotate(${i * 60}deg) translateY(-10px)`,
                      transformOrigin: 'center bottom'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main headline */}
          <h1 className="hero-heading text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 leading-tight max-w-4xl">
            Automate your life with{' '}
            <span className="block">natural language</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-normal leading-relaxed font-adobe-body">
            Cofounder plugs into your existing tools, writes automations, and organizes workflows. Driving the software you're already familiar with.
          </p>

          {/* Search input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative max-w-3xl mx-auto mb-16"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Every day, research my competitors and dm me on slack"
                className="w-full px-8 py-5 text-lg bg-white/95 backdrop-blur-sm border border-gray-300 rounded-2xl shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400 transition-all duration-200 font-adobe-body"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 shadow-lg">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center text-gray-600"
            >
              <span className="text-sm mb-2 font-medium font-adobe-body">Scroll to explore</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
};

export default Hero;
