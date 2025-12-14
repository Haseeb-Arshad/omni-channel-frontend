'use client'
import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { MessageSquare, PhoneCall, Mail, Globe, MessageCircle } from 'lucide-react';

interface ChannelCardProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
  delay: number;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ icon, color, title, description, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`channel-card relative rounded-lg overflow-hidden transition-all duration-300 border border-slate-700 bg-slate-800 shadow-lg hover:border-slate-500/40`}>
        <div className="relative p-6 flex flex-col">
          {/* Channel Icon */}
          <div className={`w-12 h-12 rounded-lg bg-slate-700/20 text-slate-300 flex items-center justify-center mb-4`}>
            {icon}
          </div>

          {/* Channel Content */}
          <h3 className="text-xl font-medium mb-2 text-white">{title}</h3>
          <p className="text-slate-300">{description}</p>
        </div>
      </div>

      {/* Bottom accent line - colored version */}
      <motion.div
        className={`h-0.5 bg-slate-500 rounded-b-lg`}
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: delay * 0.1 + 0.3 }}
      />
    </motion.div>
  );
};

const Channels: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const channels = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-green-500",
      title: "WhatsApp",
      description: "Connect with customers on their preferred messaging platform with rich media support."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-blue-500",
      title: "SMS",
      description: "Reach customers directly with text messaging for time-sensitive communications."
    },
    {
      icon: <Mail className="w-6 h-6" />,
      color: "bg-purple-500",
      title: "Email",
      description: "Send detailed messages with attachments through integrated email functionality."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      color: "bg-amber-500",
      title: "Web Chat",
      description: "Provide real-time support through your website with our embedded chat widget."
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-slate-900"
      data-scroll-section
    >
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-slate-600 opacity-[0.07] blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-slate-500 opacity-[0.06] blur-3xl" />
      </div>

      <div className="minimalist-container px-4 mx-auto relative z-10">
        <div className="max-w-xl mx-auto text-center mb-16">
          <motion.span
            className="inline-block text-sm font-medium text-white mb-3 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            data-scroll
            data-scroll-speed="0.3"
          >
            Multi-Channel Support
          </motion.span>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            data-scroll
            data-scroll-speed="0.2"
          >
            All Your Communication Channels in One Place
          </motion.h2>

          <motion.p
            className="text-slate-300 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Seamlessly integrate and manage multiple communication channels from a single unified platform.
          </motion.p>
        </div>

        <div className="relative">
          {/* Channel Illustration */}
          <motion.div
            className="mb-16 relative flex justify-center"
            style={{ y }}
          >
            <motion.div
              className="relative w-full max-w-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <svg viewBox="0 0 700 400" className="w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="channel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(100, 116, 139, 0.2)" />
                    <stop offset="100%" stopColor="rgba(100, 116, 139, 0.2)" />
                  </linearGradient>
                </defs>

                {/* Center Hub */}
                <circle cx="350" cy="200" r="60" fill="url(#channel-gradient)" stroke="#64748b" strokeWidth="2" />
                <text x="350" y="205" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="18">OmniChannel</text>

                {/* Connection Lines */}
                <motion.g
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  <path d="M350,140 L350,50" stroke="#64748b" strokeWidth="2" fill="none" strokeDasharray="3,3" />
                  <path d="M350,260 L350,350" stroke="#64748b" strokeWidth="2" fill="none" strokeDasharray="3,3" />
                  <path d="M290,200 L150,200" stroke="#64748b" strokeWidth="2" fill="none" strokeDasharray="3,3" />
                  <path d="M410,200 L550,200" stroke="#64748b" strokeWidth="2" fill="none" strokeDasharray="3,3" />
                </motion.g>

                {/* Channel Nodes */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                >
                  <circle cx="350" cy="50" r="30" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="2" />
                  <circle cx="350" cy="350" r="30" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="2" />
                  <circle cx="150" cy="200" r="30" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="2" />
                  <circle cx="550" cy="200" r="30" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="2" />
                </motion.g>

                {/* Channel Icons */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <text x="350" y="55" textAnchor="middle" fill="#94a3b8" fontWeight="500" fontSize="12">Email</text>
                  <text x="350" y="355" textAnchor="middle" fill="#94a3b8" fontWeight="500" fontSize="12">SMS</text>
                  <text x="150" y="205" textAnchor="middle" fill="#94a3b8" fontWeight="500" fontSize="12">WhatsApp</text>
                  <text x="550" y="205" textAnchor="middle" fill="#94a3b8" fontWeight="500" fontSize="12">Web Chat</text>
                </motion.g>
              </svg>
            </motion.div>
          </motion.div>

          {/* Channel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {channels.map((channel, index) => (
              <ChannelCard
                key={index}
                icon={channel.icon}
                color={channel.color}
                title={channel.title}
                description={channel.description}
                delay={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Channels;
