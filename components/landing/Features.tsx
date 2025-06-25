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
      className={`feature-card relative rounded-xl p-6 bg-gradient-to-br from-background to-background/80 border border-white/10 shadow-lg backdrop-blur-sm overflow-hidden ${className}`}
      initial={{ y: 60, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.25, 0.25, 0, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      data-scroll
      data-scroll-speed="0.2"
    >
      {/* Highlight effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-indigo-500/30 rounded-xl blur opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Background particle */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-gradient-to-r from-primary/10 to-indigo-500/10 blur-2xl" />
      
      <div className="relative z-10 flex flex-col">
        <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-4">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        
        <p className="text-muted-foreground">{description}</p>
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

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);

  useEffect(() => {
    if (!titleRef.current) return;
    
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top bottom',
        end: 'bottom top',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });
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
      className="relative py-32 overflow-hidden bg-gradient-to-b from-background/90 via-background to-background/90"
      data-scroll-section
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <div className="absolute -left-40 top-1/3 w-80 h-80 bg-primary/20 rounded-full filter blur-[100px]" />
        <div className="absolute -right-40 bottom-1/3 w-80 h-80 bg-indigo-500/20 rounded-full filter blur-[100px]" />
      </div>
      
      <motion.div 
        style={{ opacity: sectionOpacity, y: sectionY }}
        className="container px-4 mx-auto relative z-10"
      >
        <div 
          ref={titleRef}
          className="max-w-xl mx-auto text-center mb-16"
          data-scroll
          data-scroll-speed="0.3"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Modern Communication</h2>
          <p className="text-muted-foreground text-lg">
            Experience the full potential of OmniChannel with these cutting-edge capabilities designed to streamline your communication workflow.
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
      </motion.div>
    </section>
  );
};

export default Features;
