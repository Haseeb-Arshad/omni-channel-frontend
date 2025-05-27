"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Bell, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
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
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const mobileNavItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 bg-primary rounded-full overflow-hidden flex items-center justify-center">
              <span className="text-white font-bold text-sm">OC</span>
            </div>
            <span className={`font-bold text-xl transition-all ${
              scrolled ? 'text-foreground' : 'text-foreground'
            }`}>OmniChannel</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <motion.nav 
            className="flex items-center mr-4 space-x-1"
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
              { href: "/features", label: "Features" },
              { href: "/pricing", label: "Pricing" },
              { href: "/docs", label: "Documentation" },
            ].map((item, index) => (
              <motion.div key={item.href} variants={navItemVariants}>
                <Link
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-primary/5 transition-colors flex items-center"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <ThemeToggle />
            
            <Button variant="ghost" asChild className="hover:bg-primary/5">
              <Link href="/auth">Sign in</Link>
            </Button>
            
            <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0">
              <Link href="/auth">Get Started</Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 ml-3 rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="container px-4 py-4">
              <nav className="flex flex-col space-y-1 mb-6">
                {[
                  { href: "/features", label: "Features" },
                  { href: "/pricing", label: "Pricing" },
                  { href: "/docs", label: "Documentation" },
                ].map((item) => (
                  <motion.div key={item.href} variants={mobileNavItemVariants}>
                    <Link
                      href={item.href}
                      className="block py-3 px-4 rounded-lg hover:bg-primary/5 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <div className="grid grid-cols-2 gap-3">
                <motion.div variants={mobileNavItemVariants}>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/auth">Sign in</Link>
                  </Button>
                </motion.div>
                
                <motion.div variants={mobileNavItemVariants}>
                  <Button className="w-full" asChild>
                    <Link href="/auth">Get Started</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
