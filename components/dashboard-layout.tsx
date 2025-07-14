"use client";

import { ReactNode, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  LayoutGrid, 
  MessageSquare, 
  MessageCircle,
  Upload, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Bot,
  Loader2,
  Search,
  HelpCircle,
  Home,
  ChevronsLeft,
  ChevronsRight,
  BookOpen,
  Database,
  Zap,
  Circle,
  Sparkles
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  // Get initials for avatar
  const getInitials = () => {
    if (!user || !user.username) return 'U';
    return user.username
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const handleLogout = () => {
    logout();
    router.push('/auth');
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  // Add smooth scrolling to the main content
  useEffect(() => {
    if (mainContentRef.current) {
      // Import and initialize smooth scrolling libraries dynamically
      const initSmoothScroll = async () => {
        try {
          const LocomotiveScroll = (await import('locomotive-scroll')).default;
          const scroll = new LocomotiveScroll({
            el: mainContentRef.current as HTMLElement,
            smooth: true,
            smoothMobile: false,
            resetNativeScroll: true
          });
          
          return () => scroll.destroy();
        } catch (error) {
          console.error("Failed to initialize smooth scroll:", error);
        }
      };
      
      // Only initialize on desktop to avoid mobile performance issues
      if (window.innerWidth > 768) {
        const cleanup = initSmoothScroll();
        return () => {
          if (cleanup instanceof Promise) {
            cleanup.then(fn => fn && fn());
          }
        };
      }
    }
  }, []);
  
  // Animation variants
  const sidebarVariants = {
    expanded: { 
      width: 200,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.3
      }
    },
    collapsed: { 
      width: 64,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.3
      }
    },
    hidden: { x: -64, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };
  
  const contentVariants = {
    expanded: {
      paddingLeft: 240,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 26,
        duration: 0.3
      }
    },
    collapsed: {
      paddingLeft: 72,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 26,
        duration: 0.3
      }
    },
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: custom * 0.05,
        duration: 0.4
      }
    })
  };
  
  const navItems = [
    { icon: <Home className="h-[18px] w-[18px]" />, label: 'Dashboard', href: '/dashboard/home' },
    { icon: <MessageCircle className="h-[18px] w-[18px]" />, label: 'Conversations', href: '/dashboard/conversations' },
    { icon: <MessageSquare className="h-[18px] w-[18px]" />, label: 'Channels', href: '/dashboard/channels' },
    { icon: <Database className="h-[18px] w-[18px]" />, label: 'Knowledge Base', href: '/dashboard/knowledge' },
    { icon: <Sparkles className="h-[18px] w-[18px]" />, label: 'AI Personas', href: '/dashboard/persona' },
    { icon: <Zap className="h-[18px] w-[18px]" />, label: 'AI Playground', href: '/dashboard/playground' },
    { icon: <Settings className="h-[18px] w-[18px]" />, label: 'Settings', href: '/dashboard/settings' },
  ];
  
  // Handle page title display
  const getPageTitle = () => {
    // Check if we're on the main dashboard
    if (pathname === '/dashboard' || pathname === '/dashboard/') {
      return 'Dashboard';
    }
    
    // Find matching nav item
    const matchingNavItem = navItems.find(item => 
      pathname.startsWith(item.href)
    );
    
    if (matchingNavItem) {
      return matchingNavItem.label;
    }
    
    // Default fallback
    return 'Dashboard';
  };
  
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        className="fixed left-0 top-0 bottom-0 z-50 flex flex-col bg-white border-r border-gray-200 shadow-xl"
        variants={sidebarVariants}
        initial="expanded"
        animate={collapsed ? "collapsed" : "expanded"}
      >
        {/* Header */}
        <div className="h-16 border-b border-gray-200 px-4 flex items-center justify-between bg-gray-50/50">
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div 
                key="full-logo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center space-x-3"
              >
                <Link href="/dashboard" className="flex items-center space-x-3">
                  <div className="relative h-9 w-9 bg-gray-900 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-sm">OC</span>
                  </div>
                  <span className="font-semibold text-lg text-gray-900">OmniChannel</span>
                </Link>
              </motion.div>
            ) : (
              <motion.div 
                key="icon-only"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-center w-full"
              >
                <Link href="/dashboard">
                  <div className="relative h-9 w-9 bg-gray-900 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-white font-bold text-sm">OC</span>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {collapsed ? (
              <ChevronsRight className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronsLeft className="h-4 w-4 text-gray-600" />
            )}
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item, i) => {
            const isActive = item.href === '/dashboard/home' 
              ? pathname === '/dashboard' || pathname === '/dashboard/home' || pathname === '/dashboard/home/'
              : pathname.startsWith(item.href);
            
            return (
              <motion.div 
                key={item.href}
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link 
                        href={item.href}
                        className={cn(
                          "group flex items-center rounded-xl transition-all duration-200 relative",
                          collapsed ? "justify-center py-3 px-0" : "px-3 py-2.5",
                          isActive ? 
                            "bg-gray-900 text-white shadow-lg" : 
                            "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        )}
                      >
                        <div 
                          className={cn(
                            "flex items-center justify-center transition-all",
                            collapsed ? "w-10 h-10" : "w-5 h-5 mr-3"
                          )}
                        >
                          {item.icon}
                        </div>
                        
                        {!collapsed && (
                          <span className="text-sm font-medium whitespace-nowrap">
                            {item.label}
                          </span>
                        )}
                        
                        {isActive && (
                          <motion.div 
                            layoutId="activeNav"
                            className="absolute inset-0 bg-gray-900 rounded-xl"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            style={{ zIndex: -1 }}
                          />
                        )}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" className="font-medium">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            );
          })}
        </nav>
        
        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={handleLogout}
                  disabled={isLoading}
                  className={cn(
                    "flex items-center w-full text-sm font-medium rounded-xl transition-all duration-200",
                    collapsed ? "justify-center py-3 px-0" : "px-3 py-2.5",
                    "text-red-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                  )}
                >
                  {isLoading ? (
                    <Loader2 className={cn("h-5 w-5 animate-spin", !collapsed && "mr-3")} />
                  ) : (
                    <LogOut className={cn("h-5 w-5", !collapsed && "mr-3")} />
                  )}
                  {!collapsed && "Sign Out"}
                </button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right" className="font-medium">
                  Sign Out
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </motion.aside>
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            
            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-2xl md:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="h-16 border-b border-gray-200 px-4 flex items-center justify-between bg-gray-50/50">
                <Link href="/dashboard" className="flex items-center space-x-3">
                  <div className="relative h-9 w-9 bg-gray-900 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-sm">OC</span>
                  </div>
                  <span className="font-semibold text-lg text-gray-900">OmniChannel</span>
                </Link>
                <button
                  onClick={toggleMobileMenu}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              
              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = item.href === '/dashboard/home' 
                    ? pathname === '/dashboard' || pathname === '/dashboard/home' || pathname === '/dashboard/home/'
                    : pathname.startsWith(item.href);
                  
                  return (
                    <Link 
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                        isActive ? 
                          "bg-gray-900 text-white shadow-lg" : 
                          "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      )}
                      onClick={toggleMobileMenu}
                    >
                      <div className="mr-3 w-5 h-5 flex items-center justify-center">
                        {item.icon}
                      </div>
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              
              <div className="p-4 border-t border-gray-200">
                <button 
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 text-red-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  ) : (
                    <LogOut className="mr-3 h-5 w-5" />
                  )}
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <motion.div 
        className="flex-1 flex flex-col relative"
        variants={contentVariants}
        initial="hidden"
        animate={["visible", collapsed ? "collapsed" : "expanded"]}
      >
        {/* Top Bar */}
        <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/dashboard/home" className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Home className="h-5 w-5 text-gray-600" />
              </Link>
              <div className="h-4 w-px bg-gray-300"></div>
            </div>
            
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                type="search" 
                placeholder="Search everything..." 
                className="pl-10 h-9 w-80 bg-gray-50 border-gray-200 focus:bg-white focus:border-gray-300 rounded-xl transition-colors duration-200" 
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
              <HelpCircle className="h-5 w-5 text-gray-600" />
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            <div className="h-4 w-px bg-gray-300 mx-2"></div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full p-0 h-9 w-9">
                  <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                    <AvatarFallback className="bg-gray-900 text-white font-medium">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 mt-2 bg-white border-gray-200 shadow-xl rounded-xl">
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-gray-900">{user?.username || 'User'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer p-3 flex items-center">
                    <Settings className="mr-3 h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Account Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer p-3 flex items-center"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="text-sm font-medium">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Page Content */}
        <main 
          ref={mainContentRef}
          className="flex-1 overflow-y-auto bg-gray-50"
          data-scroll-container
        >
          <motion.div 
            className="mx-auto w-full max-w-7xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.22, 1, 0.36, 1]
            }}
            data-scroll-section
          >
            {children}
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
}
