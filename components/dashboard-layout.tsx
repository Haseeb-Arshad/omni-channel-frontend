"use client";

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  Home
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
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
  
  // Animation variants
  const sidebarVariants = {
    hidden: { x: -32, opacity: 0 },
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
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };
  
  const navItems = [
    { icon: <LayoutGrid className="h-5 w-5" />, label: 'Dashboard', href: '/dashboard/home' },
    { icon: <MessageCircle className="h-5 w-5" />, label: 'Conversations', href: '/dashboard/conversations' },
    { icon: <MessageSquare className="h-5 w-5" />, label: 'Channels', href: '/dashboard/channels' },
    { icon: <Upload className="h-5 w-5" />, label: 'Knowledge Base', href: '/dashboard/knowledge' },
    { icon: <Users className="h-5 w-5" />, label: 'AI Personas', href: '/dashboard/persona' },
    { icon: <Bot className="h-5 w-5" />, label: 'AI Playground', href: '/dashboard/playground' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', href: '/dashboard/settings' },
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
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Desktop */}
      <motion.aside 
        className="hidden md:flex w-64 flex-col fixed inset-y-0 border-r bg-card/80 shadow-md z-20"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-center h-16 border-b px-4 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="relative h-9 w-9 bg-gradient-to-br from-primary to-indigo-600 rounded-full overflow-hidden flex items-center justify-center shadow-md ring-2 ring-primary/20">
              <span className="text-white font-bold text-sm">OC</span>
            </div>
            <span className="font-semibold text-xl bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">OmniChannel</span>
          </Link>
        </div>
        
        <nav className="flex-1 pt-5 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item, i) => {
            // Special case for dashboard to prevent it from being active for all routes
            const isActive = item.href === '/dashboard/home' 
              ? pathname === '/dashboard' || pathname === '/dashboard/home' || pathname === '/dashboard/home/'
              : pathname.startsWith(item.href);
            
            return (
              <motion.div 
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <Link 
                  href={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive ? 'bg-gradient-to-r from-primary/20 to-primary/5 text-primary font-semibold shadow-md' : 'hover:bg-primary/5 hover:text-primary'}`}
                >
                  <div className={`mr-3 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'} transition-colors`}>
                    {item.icon}
                  </div>
                  {item.label}
                  {isActive && <div className="w-1.5 h-5 bg-gradient-to-b from-primary to-indigo-600 absolute right-0 rounded-l-md"></div>}
                </Link>
              </motion.div>
            );
          })}
        </nav>
        
        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            disabled={isLoading}
            className="flex items-center w-full px-3 py-3 text-sm font-medium rounded-lg
              text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            ) : (
              <LogOut className="mr-3 h-5 w-5" />
            )}
            Sign Out
          </button>
        </div>
      </motion.aside>
      
      {/* Mobile sidebar - Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            
            {/* Mobile menu */}
            <motion.div
              className="fixed inset-y-0 left-0 z-40 w-64 bg-card/95 border-r shadow-xl md:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between h-16 border-b px-4 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
                <Link href="/dashboard" className="flex items-center space-x-2">
                  <div className="relative h-9 w-9 bg-gradient-to-br from-primary to-indigo-600 rounded-full overflow-hidden flex items-center justify-center shadow-md ring-2 ring-primary/20">
                    <span className="text-white font-bold text-sm">OC</span>
                  </div>
                  <span className="font-semibold text-xl bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">OmniChannel</span>
                </Link>
                <button
                  onClick={toggleMobileMenu}
                  className="text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-primary/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <nav className="flex-1 pt-5 px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = item.href === '/dashboard/home' 
                    ? pathname === '/dashboard' || pathname === '/dashboard/home' || pathname === '/dashboard/home/'
                    : pathname.startsWith(item.href);
                  
                  return (
                    <Link 
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                        ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-primary/10 hover:text-primary'}`}
                      onClick={toggleMobileMenu}
                    >
                      <div className={`mr-3 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'} transition-colors`}>
                        {item.icon}
                      </div>
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              
              <div className="p-4 border-t">
                <button 
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="flex items-center w-full px-3 py-3 text-sm font-medium rounded-lg
                    text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
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
        className="flex-1 flex flex-col md:pl-64 relative"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top navbar */}
        <header className="h-16 border-b bg-gradient-to-r from-card/90 via-card/80 to-card/90 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-primary/5 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/dashboard/home" className="p-2 rounded-md hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors">
                <Home className="h-5 w-5" />
              </Link>
              <div className="h-5 border-r mx-1 border-border/50"></div>
            </div>
            
            <div className="relative max-w-md hidden md:flex items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="pl-9 h-9 w-[180px] lg:w-[280px] bg-background/50 focus-visible:bg-background border-muted" 
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-md hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors relative">
              <HelpCircle className="h-5 w-5" />
            </button>
            
            <button className="p-2 rounded-md hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card"></span>
            </button>
            
            <ThemeToggle />
            
            <div className="h-5 border-r mx-0.5 border-border/50 hidden sm:block"></div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full p-0 h-9 overflow-hidden focus-visible:ring-offset-0 focus-visible:ring-1">
                  <Avatar className="h-9 w-9 border-2 border-background transition-all hover:border-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-indigo-600/20 text-foreground">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.username || 'User'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email || 'user@example.com'}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-background/90">
          <div 
            className="mx-auto w-full max-w-7xl animate-fade-in p-4 sm:p-6 relative"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, var(--border) 1px, transparent 0), radial-gradient(circle at 75px 75px, var(--border) 1px, transparent 0)`,
              backgroundSize: '100px 100px'
            }}
          >
            {children}
          </div>
        </main>
      </motion.div>
    </div>
  );
}
