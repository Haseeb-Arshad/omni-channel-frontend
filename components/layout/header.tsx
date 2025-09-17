"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

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
          ? 'bg-white/95 backdrop-blur-xl py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <circle cx="16" cy="8" r="3" fill="#F59E0B" />
                <path d="M16 12 L12 20 L20 20 Z" fill="#10B981" />
                <path d="M16 20 L16 28" stroke="#10B981" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-xl font-medium text-gray-900 font-adobe-body">
              Cofounder
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <nav className="flex items-center space-x-8">
            <Link
              href="#pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium font-adobe-body"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium font-adobe-body"
            >
              Log in
            </Link>
            
            <Link
              href="/login"
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium font-adobe-body"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <Link
            href="/login"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium font-adobe-body"
          >
            Log in
          </Link>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
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
            <div className="px-6 py-6">
              <nav className="flex flex-col space-y-4 mb-6">
                <Link
                  href="#pricing"
                  className="py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-adobe-body"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
              </nav>
              
              <Link
                href="/login"
                className="block w-full bg-gray-900 hover:bg-gray-800 text-white text-center px-4 py-3 rounded-lg transition-all duration-200 font-medium font-adobe-body"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}


