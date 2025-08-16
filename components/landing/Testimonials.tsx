import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  delay: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  name, 
  role, 
  company, 
  content, 
  rating, 
  avatar, 
  delay 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="group relative rounded-2xl p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm shadow-xl overflow-hidden hover:border-slate-600/50"
      initial={{ y: 60, opacity: 0, scale: 0.9 }}
      animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 60, opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.25, 0.25, 0, 1] }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      <div className="relative z-10">
        {/* Quote icon */}
        <div className="flex items-center justify-between mb-6">
          <Quote className="w-8 h-8 text-blue-400 opacity-60" />
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} 
              />
            ))}
          </div>
        </div>
        
        {/* Content */}
        <p className="text-slate-300 text-lg leading-relaxed mb-6 group-hover:text-slate-200 transition-colors duration-300">
          "{content}"
        </p>
        
        {/* Author */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {avatar}
          </div>
          <div>
            <div className="font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">
              {name}
            </div>
            <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              {role} at {company}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: false, margin: "-100px" });
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Customer Success Manager",
      company: "TechFlow Inc",
      content: "OmniChannel transformed how we handle customer communications. The AI-powered responses save us hours daily, and the unified inbox is a game-changer.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Operations Director",
      company: "Global Solutions",
      content: "The seamless integration across WhatsApp, SMS, and email has improved our response times by 60%. Our customers love the consistent experience.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Lead",
      company: "StartupXYZ",
      content: "Setting up took less than 10 minutes, and the analytics dashboard gives us insights we never had before. Highly recommend for growing teams.",
      rating: 5,
      avatar: "ER"
    },
    {
      name: "David Thompson",
      role: "CEO",
      company: "InnovateCorp",
      content: "The security features and enterprise-grade reliability give us confidence. Our team productivity has increased significantly since switching.",
      rating: 5,
      avatar: "DT"
    },
    {
      name: "Lisa Park",
      role: "Support Manager",
      company: "ServicePro",
      content: "The automated workflows and smart routing have revolutionized our support process. We can now handle 3x more conversations with the same team.",
      rating: 5,
      avatar: "LP"
    },
    {
      name: "James Wilson",
      role: "CTO",
      company: "TechVenture",
      content: "Excellent API documentation and integration capabilities. The platform scales beautifully with our growing business needs.",
      rating: 5,
      avatar: "JW"
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950"
      data-scroll-section
    >
      {/* Enhanced background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full filter blur-[120px] opacity-[0.08]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-gradient-to-br from-purple-500 to-pink-500 rounded-full filter blur-[150px] opacity-[0.06]"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.06, 0.1, 0.06]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />

      <div className="container px-4 mx-auto relative z-10">
        {/* Section Header */}
        <div
          ref={titleRef}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span>Trusted by Industry Leaders</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            What Our{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Customers
            </span>{' '}
            Say
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Join thousands of satisfied customers who have transformed their communication workflows with OmniChannel
          </motion.p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              content={testimonial.content}
              rating={testimonial.rating}
              avatar={testimonial.avatar}
              delay={index}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-slate-400 mb-6">Ready to join our satisfied customers?</p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Success Story
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;