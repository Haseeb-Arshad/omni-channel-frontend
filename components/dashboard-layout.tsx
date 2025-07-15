"use client";

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  MessageCircle,
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  ChevronLeft,
  ChevronRight,
  Database,
  Zap,
  Brain
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/ui/header';
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  
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
      icon: <Home className="h-5 w-5" />, 
      label: 'Dashboard', 
      href: '/dashboard/home'
    },
    { 
      icon: <MessageCircle className="h-5 w-5" />, 
      label: 'Conversations', 
      href: '/dashboard/conversations'
    },
    { 
      icon: <MessageSquare className="h-5 w-5" />, 
      label: 'Channels', 
      href: '/dashboard/channels'
    },
    { 
      icon: <Database className="h-5 w-5" />, 
      label: 'Knowledge Base', 
      href: '/dashboard/knowledge'
    },
    { 
      icon: <Brain className="h-5 w-5" />, 
      label: 'AI Personas', 
      href: '/dashboard/persona'
    },
    { 
      icon: <Zap className="h-5 w-5" />, 
      label: 'AI Playground', 
      href: '/dashboard/playground'
    },
    { 
      icon: <Settings className="h-5 w-5" />, 
      label: 'Settings', 
      href: '/dashboard/settings'
    },
  ];
  
  return (
    <div className="h-screen bg-charcoal-50 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 bg-white border-r border-charcoal-200 flex flex-col transition-all duration-200",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 border-b border-charcoal-200 flex items-center justify-between px-4">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-charcoal-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">OC</span>
              </div>
              <span className="font-semibold text-charcoal-900">OmniChannel</span>
            </Link>
          )}
          
          {collapsed && (
            <Link href="/dashboard" className="flex justify-center w-full">
              <div className="h-8 w-8 bg-charcoal-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">OC</span>
              </div>
            </Link>
          )}
          
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-charcoal-100 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-charcoal-500" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-charcoal-500" />
            )}
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.href === '/dashboard/home' 
              ? pathname === '/dashboard' || pathname === '/dashboard/home' || pathname === '/dashboard/home/'
              : pathname.startsWith(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  collapsed ? "justify-center" : "justify-start",
                  isActive 
                    ? "bg-charcoal-900 text-white" 
                    : "text-charcoal-700 hover:bg-charcoal-100"
                )}
              >
                {item.icon}
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        
        {/* User Section */}
        <div className="p-4 border-t border-charcoal-200">
          <button 
            onClick={handleLogout}
            className={cn(
              "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-red-600 hover:bg-red-50",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Sign Out</span>}
          </button>
        </div>
      </aside>
      
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          />
          
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-charcoal-200 md:hidden">
            <div className="h-16 border-b border-charcoal-200 px-4 flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-charcoal-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">OC</span>
                </div>
                <span className="font-semibold text-charcoal-900">OmniChannel</span>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="p-1.5 rounded-lg hover:bg-charcoal-100 transition-colors"
              >
                <X className="h-5 w-5 text-charcoal-500" />
              </button>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = item.href === '/dashboard/home' 
                  ? pathname === '/dashboard' || pathname === '/dashboard/home' || pathname === '/dashboard/home/'
                  : pathname.startsWith(item.href);
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-charcoal-900 text-white" 
                        : "text-charcoal-700 hover:bg-charcoal-100"
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="p-4 border-t border-charcoal-200">
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* Main Content */}
      <div 
        className={cn(
          "flex-1 flex flex-col transition-all duration-200",
          collapsed ? "ml-16" : "ml-64"
        )}
      >
        {/* Header */}
        <Header onMobileMenuToggle={toggleMobileMenu} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-charcoal-50">
          <div className="max-w-7xl mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}