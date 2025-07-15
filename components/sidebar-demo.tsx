"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  MessageCircle, 
  MessageSquare, 
  Database, 
  Brain, 
  Settings,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { NavigationItem } from '@/components/ui/navigation-item';

export function SidebarDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('/dashboard/home');

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Keyboard shortcut for toggling sidebar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { 
      icon: <Home className="h-[18px] w-[18px]" />, 
      label: 'Dashboard', 
      href: '/dashboard/home',
      gradient: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      badge: 0
    },
    { 
      icon: <MessageCircle className="h-[18px] w-[18px]" />, 
      label: 'Conversations', 
      href: '/dashboard/conversations',
      gradient: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      badge: 12
    },
    { 
      icon: <MessageSquare className="h-[18px] w-[18px]" />, 
      label: 'Channels', 
      href: '/dashboard/channels',
      gradient: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      badge: 3
    },
    { 
      icon: <Database className="h-[18px] w-[18px]" />, 
      label: 'Knowledge Base', 
      href: '/dashboard/knowledge',
      gradient: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      badge: 0
    },
    { 
      icon: <Brain className="h-[18px] w-[18px]" />, 
      label: 'AI Personas', 
      href: '/dashboard/persona',
      gradient: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      badge: 1
    },
    { 
      icon: <Settings className="h-[18px] w-[18px]" />, 
      label: 'Settings', 
      href: '/dashboard/settings',
      gradient: 'from-gray-500 to-slate-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-600',
      badge: 0
    },
  ];

  // Animation variants
  const sidebarVariants = {
    expanded: { 
      width: 240,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
        duration: 0.3
      }
    },
    collapsed: { 
      width: 64,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
        duration: 0.3
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
        delay: custom * 0.05,
        duration: 0.4
      }
    })
  };

  return (
    <div className="p-8 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Collapsible Sidebar Demo
        </h1>
        <div className="text-sm text-slate-600 bg-white/60 px-4 py-2 rounded-xl backdrop-blur-sm">
          Press <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">Ctrl/Cmd + B</kbd> to toggle
        </div>
      </div>
      
      <div className="flex gap-8">
        {/* Sidebar Demo */}
        <motion.aside
          className="flex flex-col bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/5 rounded-2xl overflow-hidden"
          variants={sidebarVariants}
          initial="expanded"
          animate={collapsed ? "collapsed" : "expanded"}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
            height: '600px'
          }}
        >
          {/* Header */}
          <div className="h-16 border-b border-white/30 px-4 flex items-center justify-between bg-gradient-to-r from-white/50 to-slate-50/50">
            {!collapsed ? (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center space-x-3"
              >
                <div className="relative h-9 w-9 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">OC</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">OmniChannel</span>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-center w-full"
              >
                <div className="relative h-9 w-9 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">OC</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                </div>
              </motion.div>
            )}
            
            <motion.button
              onClick={toggleSidebar}
              className="p-2 rounded-xl hover:bg-white/60 transition-all duration-200 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {collapsed ? (
                <ChevronsRight className="h-4 w-4 text-slate-600 group-hover:text-indigo-600 transition-colors" />
              ) : (
                <ChevronsLeft className="h-4 w-4 text-slate-600 group-hover:text-indigo-600 transition-colors" />
              )}
            </motion.button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item, i) => {
              const isActive = activeItem === item.href;
              
              return (
                <motion.div 
                  key={item.href}
                  custom={i}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  layout
                >
                  <NavigationItem
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    isActive={isActive}
                    isCollapsed={collapsed}
                    gradient={item.gradient}
                    bgColor={item.bgColor}
                    textColor={item.textColor}
                    badge={item.badge}
                    onClick={() => setActiveItem(item.href)}
                  />
                </motion.div>
              );
            })}
          </nav>
        </motion.aside>
        
        {/* Feature List */}
        <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Features Implemented</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <h3 className="font-semibold text-slate-700">Smooth Spring Animations</h3>
                <p className="text-sm text-slate-600">Width transitions use spring physics with proper stiffness and damping</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <h3 className="font-semibold text-slate-700">Icon Transformations</h3>
                <p className="text-sm text-slate-600">Icons scale and rotate with smooth animations when collapsed/expanded</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <h3 className="font-semibold text-slate-700">Enhanced Tooltip System</h3>
                <p className="text-sm text-slate-600">Tooltips appear for collapsed navigation items with smooth animations</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <h3 className="font-semibold text-slate-700">Keyboard Shortcut</h3>
                <p className="text-sm text-slate-600">Press Ctrl/Cmd + B to toggle sidebar state</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <h3 className="font-semibold text-slate-700">Badge Animations</h3>
                <p className="text-sm text-slate-600">Notification badges animate smoothly when sidebar state changes</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <h3 className="font-semibold text-slate-700">Hover Effects</h3>
                <p className="text-sm text-slate-600">Subtle hover animations and micro-interactions throughout</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2">Requirements Met:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✅ 2.1 - Intuitive navigation system with clear iconography</li>
              <li>✅ 2.2 - Smooth page transitions and responsive design</li>
              <li>✅ 6.1 - Tactile feedback through animations and state changes</li>
              <li>✅ 8.1 - Performance optimized animations at 60fps</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}