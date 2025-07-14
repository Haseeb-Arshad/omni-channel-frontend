"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Home, 
  MessageSquare, 
  Settings, 
  Database, 
  BarChart3, 
  Globe, 
  Users, 
  Mail,
  Brain,
  Menu,
  X
} from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface NavItemProps {
  href: string
  label: string
  icon: React.ReactNode
  isActive: boolean
}

const NavItem = ({ href, label, icon, isActive }: NavItemProps) => {
  return (
    <Link 
      href={href} 
      className={`eleven-nav-item group ${isActive ? 'active' : ''}`}
    >
      <span className="text-current">{icon}</span>
      <span className="text-current">{label}</span>
      
      {isActive && (
        <motion.div 
          layoutId="activeNavIndicator"
          className="absolute right-0 w-1 h-8 bg-blue-600 rounded-l-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // For hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { href: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { href: "/dashboard/channels", label: "Channels", icon: <Globe size={18} /> },
    { href: "/dashboard/conversations", label: "Conversations", icon: <MessageSquare size={18} /> },
    { href: "/dashboard/inbox", label: "Inbox", icon: <Mail size={18} /> },
    { href: "/dashboard/kb", label: "Knowledge Base", icon: <Database size={18} /> },
    { href: "/dashboard/persona", label: "Personas", icon: <Users size={18} /> },
    { href: "/dashboard/playground", label: "Playground", icon: <Brain size={18} /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
  ]

  // Animation variants
  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 40,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile menu toggle */}
      <div className="flex items-center h-16 px-4 border-b md:hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mr-2"
        >
          <Menu size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-semibold text-xs">OC</span>
          </div>
          <span className="font-semibold text-lg">OmniChannel</span>
        </div>
      </div>
      
      {/* Sidebar */}
      <motion.aside 
        className={`eleven-sidebar ${isMobileMenuOpen ? 'open' : ''}`}
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 md:hidden">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-semibold text-xs">OC</span>
            </div>
            <span className="font-semibold text-lg">OmniChannel</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={18} />
          </Button>
        </div>
        
        {/* Logo */}
        <div className="hidden md:flex items-center gap-2 p-4 h-16">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">OC</span>
          </div>
          <span className="font-semibold text-xl">OmniChannel</span>
        </div>
        
        {/* Navigation */}
        <div className="p-4">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <motion.div key={item.href} variants={childVariants}>
                <NavItem 
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                />
              </motion.div>
            ))}
          </nav>
        </div>
        
        {/* User section */}
        <motion.div 
          className="border-t p-4 mt-auto"
          variants={childVariants}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium">U</span>
            </div>
            <div>
              <p className="text-sm font-medium">User Name</p>
              <p className="text-xs text-gray-500">user@example.com</p>
            </div>
          </div>
        </motion.div>
      </motion.aside>
    </>
  )
}
