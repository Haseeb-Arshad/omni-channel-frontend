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
      <div className={`channel-card relative rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl`}>
        {/* Card Background with gradient */}
        <div className={`absolute inset-0 ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
        
        <div className="relative p-6 flex flex-col">
          {/* Channel Icon */}
          <div className={`w-12 h-12 ${color.replace('bg-', 'text-')} rounded-lg bg-white/5 flex items-center justify-center mb-4`}>
            {icon}
          </div>
          
          {/* Channel Content */}
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      
      {/* Bottom border animation */}
      <motion.div 
        className={`h-1 ${color} rounded-b-xl`}
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
      className="relative py-32 overflow-hidden"
      data-scroll-section
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95 z-0" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/5 blur-3xl" />
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-xl mx-auto text-center mb-16">
          <motion.span
            className="inline-block text-sm font-medium text-primary mb-3 px-3 py-1 bg-primary/10 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            data-scroll
            data-scroll-speed="0.3"
          >
            Multi-Channel Support
          </motion.span>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            data-scroll
            data-scroll-speed="0.2"
          >
            All Your Communication Channels in One Place
          </motion.h2>
          
          <motion.p
            className="text-muted-foreground text-lg"
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
                    <stop offset="0%" stopColor="rgba(124, 58, 237, 0.2)" />
                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
                  </linearGradient>
                </defs>
                
                {/* Center Hub */}
                <circle cx="350" cy="200" r="60" fill="url(#channel-gradient)" stroke="#7c3aed" strokeWidth="2" />
                <text x="350" y="205" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="18">OmniChannel</text>
                
                {/* Connection Lines */}
                <motion.g
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  <path d="M350,140 L350,50" stroke="#7c3aed" strokeWidth="2" fill="none" strokeDasharray="3,3" />
                  <path d="M350,260 L350,350" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="3,3" />
                  <path d="M290,200 L150,200" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="3,3" />
                  <path d="M410,200 L550,200" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="3,3" />
                </motion.g>
                
                {/* Channel Nodes */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                >
                  <circle cx="350" cy="50" r="30" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2" />
                  <circle cx="350" cy="350" r="30" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="150" cy="200" r="30" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2" />
                  <circle cx="550" cy="200" r="30" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="2" />
                </motion.g>
                
                {/* Channel Icons */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <text x="350" y="55" textAnchor="middle" fill="#8b5cf6" fontWeight="500" fontSize="12">Email</text>
                  <text x="350" y="355" textAnchor="middle" fill="#3b82f6" fontWeight="500" fontSize="12">SMS</text>
                  <text x="150" y="205" textAnchor="middle" fill="#10b981" fontWeight="500" fontSize="12">WhatsApp</text>
                  <text x="550" y="205" textAnchor="middle" fill="#f59e0b" fontWeight="500" fontSize="12">Web Chat</text>
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
