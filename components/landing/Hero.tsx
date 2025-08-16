import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import { ArrowRight, Play, MessageSquare, Mail, Phone, Bot, Sparkles, Zap } from 'lucide-react';
import { Button } from '../ui/button';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Enhanced text animation
  useEffect(() => {
    if (!textRef.current) return;

    // Animate text elements with stagger
    gsap.fromTo('.hero-title',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    );

    gsap.fromTo('.hero-subtitle',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 }
    );

    gsap.fromTo('.hero-buttons',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.9 }
    );

    // Animate dashboard preview
    gsap.fromTo(imageRef.current,
      { y: 100, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 1.2 }
    );

    // Animate floating elements
    gsap.fromTo('.floating-element',
      { y: 50, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', stagger: 0.2, delay: 1.8 }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
      data-scroll-section
    >
      {/* Enhanced background with animated gradients */}
      <div className="absolute w-full h-full top-0 left-0 z-0">
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full opacity-20 blur-[120px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-[50%] left-[-15%] w-[700px] h-[700px] bg-gradient-to-br from-purple-500 to-pink-400 rounded-full opacity-15 blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-gradient-to-br from-teal-400 to-green-400 rounded-full opacity-10 blur-[100px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          ref={textRef}
          style={{ y: y1, opacity }}
          className="max-w-5xl mx-auto text-center mb-20"
          data-scroll
          data-scroll-speed="1"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Communication Platform</span>
            <Zap className="w-4 h-4" />
          </motion.div>

          <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-white leading-tight">
            Unify All Your{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Communication
            </span>{' '}
            Channels
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            One intelligent platform to connect, engage, and respond across SMS, WhatsApp, Email, and Web Chat—powered by advanced AI automation
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-w-[200px] h-16 text-lg text-white border-0 shadow-2xl shadow-blue-500/25 group transition-all duration-300"
              asChild
            >
              <Link href="/dashboard" className="flex items-center justify-center">
                <span>Start Free Trial</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-slate-400 text-white hover:bg-white/10 hover:text-white min-w-[200px] h-16 text-lg backdrop-blur-sm group"
              asChild
            >
              <Link href="#demo" className="flex items-center justify-center">
                <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 mt-12 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>24/7 Support</span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced dashboard preview */}
        <motion.div
          ref={imageRef}
          style={{ y: y2 }}
          className="relative max-w-6xl mx-auto"
          data-scroll
          data-scroll-speed="-0.5"
        >
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900">
            {/* Dashboard mockup */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="p-8">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="flex-1 bg-slate-700 rounded-lg h-8 flex items-center px-4">
                    <span className="text-slate-400 text-sm">omnichannel.app/dashboard</span>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="grid grid-cols-4 gap-6 h-80">
                  {/* Sidebar */}
                  <div className="col-span-1 space-y-4">
                    <div className="h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg" />
                    <div className="space-y-2">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-6 bg-slate-700 rounded opacity-60" />
                      ))}
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="col-span-3 space-y-4">
                    <div className="flex gap-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex-1 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-4 border border-slate-600">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg mb-2" />
                          <div className="h-3 bg-slate-600 rounded w-2/3" />
                        </div>
                      ))}
                    </div>

                    <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg border border-slate-600 p-4">
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-2">OmniChannel Dashboard</div>
                          <div className="text-slate-400">Real-time communication hub</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced floating elements */}
          <motion.div
            className="floating-element absolute -top-16 -left-16 w-32 h-32 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 p-1 shadow-2xl"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
              <MessageSquare className="w-12 h-12 text-green-600" />
            </div>
          </motion.div>

          <motion.div
            className="floating-element absolute -bottom-12 -right-12 w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 p-1 shadow-2xl"
            animate={{
              y: [0, 10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
              <Mail className="w-10 h-10 text-blue-600" />
            </div>
          </motion.div>

          <motion.div
            className="floating-element absolute top-1/2 -translate-y-1/2 -right-20 w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 p-1 shadow-2xl"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <Phone className="w-8 h-8 text-purple-600" />
            </div>
          </motion.div>

          <motion.div
            className="floating-element absolute top-1/4 -left-20 w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 p-1 shadow-2xl"
            animate={{
              y: [0, 12, 0],
              x: [0, 5, 0]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <Bot className="w-7 h-7 text-orange-600" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-slate-400 text-sm">Scroll to explore</span>
        <motion.div
          className="w-8 h-12 rounded-full border-2 border-slate-400 p-1 flex items-start justify-center"
          initial={{ y: 0 }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full bg-gradient-to-b from-blue-400 to-purple-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
