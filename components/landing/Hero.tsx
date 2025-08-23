import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageSquare, Mail, Phone, MessageCircle, Play } from 'lucide-react';
import '../../styling/hero-sequence.css';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={`hero-container ${isLoaded ? 'hero-loaded' : 'hero-loading'}`}>
      {/* Background with gradient bands */}
      <div className="hero-background" aria-hidden="true">
        <div className="gradient-band"></div>
        <div className="gradient-band"></div>
        <div className="gradient-band"></div>
        <div className="gradient-band"></div>
        <div className="gradient-band"></div>
        <div className="gradient-band"></div>
      </div>

      {/* Editorial seams */}
      <div className="editorial-seam" aria-hidden="true"></div>
      <div className="editorial-seam" aria-hidden="true"></div>
      <div className="editorial-seam" aria-hidden="true"></div>

      {/* Glass pill navigation */}
      <nav className="glass-nav" aria-label="Primary">
        <Link href="#overview" className="nav-item">Overview</Link>
        <Link href="#features" className="nav-item">Features</Link>
        <Link href="#pricing" className="nav-item">Pricing</Link>
      </nav>

      {/* Top-left eyebrow outside content */}
      <motion.div
        className="eyebrow-top-left"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Omni-channel agentic platform
      </motion.div>

      {/* Hero content */}
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Display headline */}
        <motion.h1 
          className="hero-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          One brain.
          <br />
          Every channel.
        </motion.h1>

        {/* Subhead */}
        <motion.p 
          className="hero-subhead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Deploy agentic workflows across voice, chat, and messaging—grounded in a unified knowledge base.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          className="cta-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Link href="/auth/register" className="cta-primary">
            Start free
          </Link>
          <button className="cta-secondary" onClick={() => {
            console.log('Demo clicked');
          }}>
            <Play className="w-4 h-4" />
            See live demo
          </button>
        </motion.div>

        {/* Channel icons row */}
        <motion.div 
          className="channel-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="channel-item">
            <div className="channel-circle"><MessageSquare className="channel-icon" /></div>
            <div className="channel-text">WhatsApp</div>
          </div>
          <div className="channel-item">
            <div className="channel-circle"><Phone className="channel-icon" /></div>
            <div className="channel-text">Voice</div>
          </div>
          <div className="channel-item">
            <div className="channel-circle"><MessageCircle className="channel-icon" /></div>
            <div className="channel-text">SMS</div>
          </div>
          <div className="channel-item">
            <div className="channel-circle"><Mail className="channel-icon" /></div>
            <div className="channel-text">Email</div>
          </div>
          <div className="channel-item">
            <div className="channel-circle"><MessageSquare className="channel-icon" /></div>
            <div className="channel-text">Discord</div>
          </div>
          <div className="channel-item">
            <div className="channel-circle"><MessageCircle className="channel-icon" /></div>
            <div className="channel-text">Messenger</div>
          </div>
        </motion.div>

        {/* Trust strip */}
        <motion.div 
          className="trust-strip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="trust-logo">HubSpot</div>
          <div className="trust-logo">shopify</div>
          <div className="trust-logo">zoom</div>
          <div className="trust-logo">NVIDIA</div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
