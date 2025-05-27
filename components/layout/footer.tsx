"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MessageSquare, Github, Twitter, Mail } from "lucide-react"

export function Footer() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    { href: "/channels", label: "Channels" },
    { href: "/knowledge", label: "Knowledge Base" },
    { href: "/playground", label: "AI Playground" },
    { href: "/persona", label: "AI Persona" }
  ];
  
  // Resource links
  const resourceLinks = [
    { href: "/docs", label: "Documentation" },
    { href: "/guides", label: "Guides" },
    { href: "/api", label: "API Reference" },
    { href: "/support", label: "Support" }
  ];
  
  // Company links
  const companyLinks = [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" }
  ];

  // Legal links
  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" }
  ];

  return (
    <footer className="border-t py-12 md:py-16 relative overflow-hidden bg-background/50 backdrop-blur-sm">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 -mb-1 w-32 h-32 rounded-full blur-dot primary opacity-10"></div>
      <div className="absolute top-1/4 right-0 -mr-16 w-32 h-32 rounded-full blur-dot accent opacity-5"></div>
      
      <div className="container">
        <motion.div 
          className="flex flex-col gap-12 md:flex-row md:justify-between relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Logo and description */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 md:w-1/3">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="relative h-8 w-8 bg-primary rounded-full overflow-hidden flex items-center justify-center">
                <span className="text-white font-bold text-sm">OC</span>
              </div>
              <span className="font-bold text-lg">OmniChannel</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connect all your communication channels with AI-powered assistance. Manage conversations,
              build knowledge bases, and deliver seamless experiences across platforms.
            </p>
            
            {/* Social links */}
            <div className="flex gap-4 mt-4">
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <Twitter className="h-4 w-4 text-primary" />
              </motion.a>
              <motion.a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <Github className="h-4 w-4 text-primary" />
              </motion.a>
              <motion.a 
                href="mailto:info@omnichannel.ai" 
                className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <Mail className="h-4 w-4 text-primary" />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Link sections */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {/* Platform links */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <h3 className="text-sm font-medium text-foreground/80">Platform</h3>
              <ul className="space-y-2">
                {platformLinks.map((item, index) => (
                  <motion.li key={item.href} variants={itemVariants} custom={index}>
                    <motion.div whileHover="hover" variants={hoverVariants}>
                      <Link 
                        href={item.href} 
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Resource links */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <h3 className="text-sm font-medium text-foreground/80">Resources</h3>
              <ul className="space-y-2">
                {resourceLinks.map((item, index) => (
                  <motion.li key={item.href} variants={itemVariants} custom={index}>
                    <motion.div whileHover="hover" variants={hoverVariants}>
                      <Link 
                        href={item.href} 
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Company links */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <h3 className="text-sm font-medium text-foreground/80">Company</h3>
              <ul className="space-y-2">
                {companyLinks.map((item, index) => (
                  <motion.li key={item.href} variants={itemVariants} custom={index}>
                    <motion.div whileHover="hover" variants={hoverVariants}>
                      <Link 
                        href={item.href} 
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
                      >
                        {item.label}
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
          className="mt-12 border-t pt-8 relative"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <motion.p 
              className="text-sm text-muted-foreground"
              variants={itemVariants}
            >
              &copy; {new Date().getFullYear()} OmniChannel. All rights reserved.
            </motion.p>
            <motion.div 
              className="flex gap-6"
              variants={containerVariants}
            >
              {legalLinks.map((item) => (
                <motion.div key={item.href} variants={itemVariants} whileHover={{ y: -2 }}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
