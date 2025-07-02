import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { MessageSquare, Mail, Phone, Bot, Shield, BarChart3 } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className={`feature-card relative rounded-lg p-6 bg-slate-800 border border-slate-700 shadow-lg overflow-hidden hover:border-blue-500/30 ${className}`}
      initial={{ y: 60, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.25, 0.25, 0, 1] }}
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)', transition: { duration: 0.2 } }}
      data-scroll
      data-scroll-speed="0.2"
    >
      <div className="relative z-10 flex flex-col">
        <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-blue-600/30 to-teal-500/30 text-white mb-4">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        
        <p className="text-slate-300">{description}</p>
      </div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  useEffect(() => {
    // Initialize animations
    if (titleRef.current) {
      gsap.from(titleRef.current.querySelectorAll('.reveal-text'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, []);
  
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Multi-channel Messaging",
      description: "Unify SMS, WhatsApp, Email, and Web Chat in a single interface for seamless communications."
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI-Powered Responses",
      description: "Let AI handle routine inquiries while you focus on complex customer interactions."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Authentication",
      description: "Enterprise-grade security with email and Google OAuth authentication systems."
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Automated Workflows",
      description: "Set up triggers and actions to streamline repetitive tasks and responses."
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Seamless Integration",
      description: "Connect with your existing tools and platforms for a unified workflow."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Insights",
      description: "Gain valuable insights with comprehensive reporting and analytics dashboards."
    }
  ];

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-slate-900"
      data-scroll-section
    >
      {/* Background Elements - Subtle colored shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full filter blur-[120px] opacity-[0.07]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-500 rounded-full filter blur-[150px] opacity-[0.05]" />
      </div>

      <div className="minimalist-container px-4 mx-auto relative z-10">
        <div
          ref={titleRef}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal-text text-white">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-300 reveal-text">
            Everything you need to manage and streamline your communication across all channels
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
