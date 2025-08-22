"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MessageSquare, Github, Twitter, Mail, Linkedin, ArrowRight, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const hoverVariants = {
    hover: { scale: 1.05, x: 5, transition: { duration: 0.2 } }
  };

  // Platform links
  const platformLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/channels", label: "Channels" },
    { href: "/knowledge", label: "Knowledge Base" },
    { href: "/analytics", label: "Analytics" },
    { href: "/integrations", label: "Integrations" }
  ];
  
  // Resource links
  const resourceLinks = [
    { href: "/docs", label: "Documentation" },
    { href: "/guides", label: "Getting Started" },
    { href: "/api", label: "API Reference" },
    { href: "/support", label: "Help Center" },
    { href: "/status", label: "System Status" }
  ];
  
  // Company links
  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
    { href: "/press", label: "Press Kit" }
  ];

  // Legal links
  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/security", label: "Security" },
    { href: "/cookies", label: "Cookie Policy" }
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800/50">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-slate-500/10 to-slate-700/10 rounded-full filter blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-slate-600/10 to-slate-800/10 rounded-full filter blur-[120px]"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.12, 0.08]
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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      
      <div className="container px-4 mx-auto relative z-10">
        {/* Newsletter Section */}
        <motion.div 
          className="py-16 border-b border-slate-800/50"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/60 text-slate-300 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Stay Updated</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get the Latest Updates
              </h3>
              
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for product updates, tips, and exclusive insights on communication automation.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500/50 transition-all duration-300"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 group whitespace-nowrap border border-slate-700 shadow-lg shadow-black/20">
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div 
          className="py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Logo and description */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 w-fit group mb-6">
                <motion.div 
                  className="relative h-12 w-12 bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center shadow-lg border border-slate-700"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageSquare className="w-6 h-6 text-white" />
                  <div className="absolute inset-0 bg-slate-700/20 rounded-xl" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="font-bold text-2xl text-white group-hover:text-slate-200 transition-colors duration-300">
                    OmniChannel
                  </span>
                  <span className="text-sm text-slate-400 -mt-1">Communication Hub</span>
                </div>
              </Link>
              
              <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                Transform your customer communication with our AI-powered omnichannel platform. 
                Connect, automate, and scale your conversations across all channels seamlessly.
              </p>
              
              {/* Enhanced Social links */}
              <div className="flex gap-3">
                {[
                  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
                  { href: "https://github.com", icon: Github, label: "GitHub" },
                  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:hello@omnichannel.ai", icon: Mail, label: "Email" }
                ].map((social, index) => (
                  <motion.a 
                    key={social.label}
                    href={social.href} 
                    target={social.href.startsWith('http') ? "_blank" : undefined}
                    rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <social.icon className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors duration-300" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* Link sections */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Platform</h3>
              <ul className="space-y-3">
                {platformLinks.map((item, index) => (
                  <motion.li 
                    key={item.href} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <motion.div whileHover="hover" variants={hoverVariants}>
                      <Link 
                        href={item.href} 
                        className="text-slate-400 hover:text-white transition-colors duration-300 inline-flex items-center group"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Resources</h3>
              <ul className="space-y-3">
                {resourceLinks.map((item, index) => (
                  <motion.li 
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <motion.div whileHover="hover" variants={hoverVariants}>
                      <Link 
                        href={item.href} 
                        className="text-slate-400 hover:text-white transition-colors duration-300 inline-flex items-center group"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((item, index) => (
                  <motion.li 
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <motion.div whileHover="hover" variants={hoverVariants}>
                      <Link 
                        href={item.href} 
                        className="text-slate-400 hover:text-white transition-colors duration-300 inline-flex items-center group"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Bottom section */}
        <motion.div 
          className="py-8 border-t border-slate-800/50"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <motion.div 
              className="flex items-center gap-2 text-slate-400"
              variants={itemVariants}
            >
              <span>&copy; {new Date().getFullYear()} OmniChannel. Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-4 h-4 text-slate-400" />
              </motion.div>
              <span>for better communication.</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-6"
              variants={containerVariants}
            >
              {legalLinks.map((item, index) => (
                <motion.div 
                  key={item.href} 
                  variants={itemVariants} 
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Link 
                    href={item.href} 
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
