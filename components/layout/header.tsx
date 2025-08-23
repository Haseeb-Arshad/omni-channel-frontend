"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 py-3' 
          : 'bg-white/80 backdrop-blur-sm py-6'
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                OmniChannel
              </span>
              <span className="text-xs text-gray-500 -mt-1">Communication Hub</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-2">
          <nav className="flex items-center mr-6 space-x-2">
            {[
              { href: "#features", label: "Features" },
              { href: "#testimonials", label: "Stories" },
              { href: "#pricing", label: "Pricing" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              asChild 
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Link href="/auth/login">
                Sign In
              </Link>
            </Button>
            
            <Button 
              asChild 
              className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link href="/auth/register" className="flex items-center">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            asChild 
            className="text-gray-600 hover:text-gray-900"
          >
            <Link href="/auth/login">Sign In</Link>
          </Button>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-gray-900" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden bg-white border-b border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container px-4 py-6">
              <nav className="flex flex-col space-y-4 mb-6">
                {[
                  { href: "#features", label: "Features" },
                  { href: "#testimonials", label: "Stories" },
                  { href: "#pricing", label: "Pricing" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              <Button 
                className="w-full bg-gray-900 hover:bg-gray-800 text-white" 
                asChild
              >
                <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                  Get Started Free
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
