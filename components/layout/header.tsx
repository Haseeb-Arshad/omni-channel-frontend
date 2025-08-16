"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Menu, X, ArrowRight, Sparkles, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24
      }
    }
  }

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren" as const,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren" as const,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const mobileNavItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-slate-800/50 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Enhanced Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center"
        >
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              className="relative h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl overflow-hidden flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-5 h-5 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-xl" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white group-hover:text-blue-100 transition-colors duration-300">
                OmniChannel
              </span>
              <span className="text-xs text-slate-400 -mt-1">Communication Hub</span>
            </div>
          </Link>
        </motion.div>

        {/* Enhanced Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-2">
          <motion.nav 
            className="flex items-center mr-6 space-x-2"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
          >
            {[
              { href: "#features", label: "Features" },
              { href: "#pricing", label: "Pricing" },
              { href: "#testimonials", label: "Reviews" },
              { href: "/docs", label: "Docs" },
            ].map((item, index) => (
              <motion.div key={item.href} variants={navItemVariants}>
                <Link
                  href={item.href}
                  className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 flex items-center font-medium backdrop-blur-sm"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                asChild 
                className="text-slate-300 hover:text-white hover:bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
              >
                <Link href="/auth/login" className="flex items-center justify-center">
                  Sign In
                </Link>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                asChild 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 border-0 transition-all duration-300 group"
              >
                <Link href="/auth/register" className="flex items-center justify-center">
                  <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="sm"
              asChild 
              className="text-slate-300 hover:text-white hover:bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </motion.div>
          
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl hover:bg-slate-800/50 transition-all duration-300 border border-slate-700/50 backdrop-blur-sm"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-slate-300" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden overflow-hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="container px-4 py-6">
              <nav className="flex flex-col space-y-2 mb-8">
                {[
                  { href: "#features", label: "Features", desc: "Explore our powerful tools" },
                  { href: "#pricing", label: "Pricing", desc: "Simple, transparent plans" },
                  { href: "#testimonials", label: "Reviews", desc: "What customers say" },
                  { href: "/docs", label: "Documentation", desc: "Get started quickly" },
                ].map((item) => (
                  <motion.div key={item.href} variants={mobileNavItemVariants}>
                    <Link
                      href={item.href}
                      className="block py-4 px-4 rounded-xl hover:bg-slate-800/50 transition-all duration-300 border border-transparent hover:border-slate-700/50 backdrop-blur-sm group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white group-hover:text-blue-100 transition-colors duration-300">
                            {item.label}
                          </div>
                          <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                            {item.desc}
                          </div>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <motion.div 
                className="space-y-3"
                variants={mobileNavItemVariants}
              >
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 h-12 text-lg group" 
                  asChild
                >
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                
                <div className="text-center">
                  <p className="text-xs text-slate-400">
                    Already have an account?{' '}
                    <Link 
                      href="/auth/login" 
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
