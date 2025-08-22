import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Star, Zap, Crown, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  enterprise?: boolean;
  delay: number;
  gradient: string;
  icon: React.ReactNode;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  popular = false, 
  enterprise = false,
  delay,
  gradient,
  icon
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className={`group relative rounded-3xl p-8 backdrop-blur-sm shadow-2xl overflow-hidden transition-all duration-300 ${
        popular 
          ? 'bg-gradient-to-br from-slate-900/30 to-slate-900/30 border-2 border-slate-600/50 scale-105' 
          : enterprise
          ? 'bg-gradient-to-br from-slate-900/30 to-slate-900/30 border border-slate-600/50'
          : 'bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/30'
      } hover:border-slate-600/50`}
      initial={{ y: 60, opacity: 0, scale: 0.9 }}
      animate={isInView ? { y: 0, opacity: 1, scale: popular ? 1.05 : 1 } : { y: 60, opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.25, 0.25, 0, 1] }}
      whileHover={{ 
        y: -8, 
        scale: popular ? 1.08 : 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-slate-700 text-white text-sm font-medium rounded-full shadow-lg">
          Most Popular
        </div>
      )}
      
      {/* Enterprise badge */}
      {enterprise && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-slate-700 text-white text-sm font-medium rounded-full shadow-lg">
          Enterprise
        </div>
      )}
      
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 ${gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${gradient} text-white mb-4 shadow-lg border border-slate-600`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
          
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-slate-200 transition-colors duration-300">
            {name}
          </h3>
          
          <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
            {description}
          </p>
        </div>
        
        {/* Price */}
        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-bold text-white group-hover:text-slate-200 transition-colors duration-300">
              {price}
            </span>
            {period && (
              <span className="text-slate-400 ml-2 group-hover:text-slate-300 transition-colors duration-300">
                /{period}
              </span>
            )}
          </div>
        </div>
        
        {/* Features */}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: delay * 0.1 + 0.3 + index * 0.1 }}
            >
              <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center`}>
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href={enterprise ? "/contact" : "/auth/register"}>
            <Button 
              className={`w-full h-12 text-lg rounded-xl font-medium transition-all duration-300 bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 hover:border-slate-500`}
            >
              {enterprise ? 'Contact Sales' : 'Get Started'}
            </Button>
          </Link>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-slate-500 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-slate-500 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
    </motion.div>
  );
};

const Pricing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: false, margin: "-100px" });
  const [isAnnual, setIsAnnual] = useState(false);
  
  const plans = [
    {
      name: "Starter",
      price: isAnnual ? "$19" : "$29",
      period: "month",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 1,000 conversations/month",
        "2 communication channels",
        "Basic AI responses",
        "Email support",
        "Standard integrations",
        "Basic analytics"
      ],
      gradient: "bg-slate-700",
      icon: <Zap className="w-7 h-7" />
    },
    {
      name: "Professional",
      price: isAnnual ? "$49" : "$69",
      period: "month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 10,000 conversations/month",
        "All communication channels",
        "Advanced AI automation",
        "Priority support",
        "Premium integrations",
        "Advanced analytics",
        "Team collaboration",
        "Custom workflows"
      ],
      popular: true,
      gradient: "bg-slate-700",
      icon: <Star className="w-7 h-7" />
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited conversations",
        "All channels + custom integrations",
        "Custom AI training",
        "Dedicated support manager",
        "White-label solution",
        "Advanced security & compliance",
        "Custom reporting",
        "SLA guarantees"
      ],
      enterprise: true,
      gradient: "bg-slate-700",
      icon: <Crown className="w-7 h-7" />
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900"
      data-scroll-section
    >
      {/* Enhanced background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-slate-700 to-slate-600 rounded-full filter blur-[120px] opacity-[0.08]"
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
          className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-gradient-to-br from-slate-600 to-slate-500 rounded-full filter blur-[150px] opacity-[0.06]"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Simple, Transparent Pricing</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Choose Your{' '}
            <span className="text-slate-100">
              Perfect Plan
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Start free, scale as you grow. No hidden fees, cancel anytime.
          </motion.p>
          
          {/* Billing Toggle */}
          <motion.div 
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <span className={`text-sm font-medium transition-colors duration-300 ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            <motion.button
              className="relative w-14 h-7 bg-slate-700 rounded-full p-1 transition-colors duration-300"
              onClick={() => setIsAnnual(!isAnnual)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-5 h-5 bg-slate-500 rounded-full shadow-lg"
                animate={{ x: isAnnual ? 28 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.button>
            <span className={`text-sm font-medium transition-colors duration-300 ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="text-xs bg-slate-700 text-white px-2 py-1 rounded-full">
                Save 30%
              </span>
            )}
          </motion.div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              enterprise={plan.enterprise}
              delay={index}
              gradient={plan.gradient}
              icon={plan.icon}
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
          <p className="text-slate-400 mb-6">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-slate-400" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-slate-400" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-slate-400" />
              <span>24/7 support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;