"use client";

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  ChevronDown,
  Database,
  Zap,
  Brain,
  Search,
  Bell,
  Plus,
  Calendar,
  BarChart3,
  Users,
  Shield,
  HelpCircle,
  Inbox,
  UserPlus,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Mic,
  Bot,
  Headphones,
  Activity,
  Hash,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VoiceInterface from './voice-interface';
import styles from './dashboard-layout.module.css';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [voiceInterfaceOpen, setVoiceInterfaceOpen] = useState(false);

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

  // Get user initials for avatar
  const getInitials = () => {
    if (!user || !user.username) return 'U';
    return user.username
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Home', href: '/dashboard/home' },
    { icon: <MessageCircle className="h-5 w-5" />, label: 'Conversations', href: '/dashboard/conversations' },
    { icon: <Bot className="h-5 w-5" />, label: 'Agents', href: '/dashboard/agents' },
    { icon: <BookOpen className="h-5 w-5" />, label: 'Knowledge', href: '/dashboard/knowledge' },
    { icon: <Hash className="h-5 w-5" />, label: 'Channels', href: '/dashboard/channels' },
    { icon: <Headphones className="h-5 w-5" />, label: 'Voice Studio', href: '/dashboard/voice' },
    { icon: <Activity className="h-5 w-5" />, label: 'Playground', href: '/dashboard/playground' },
    { icon: <Zap className="h-5 w-5" />, label: 'Integrations', href: '/dashboard/integrations' },
    { icon: <TrendingUp className="h-5 w-5" />, label: 'Analytics', href: '/dashboard/analytics' },
  ];

  const toolsItems = [
    { icon: <Database className="h-4 w-4" />, label: 'Tools', href: '/dashboard/tools' },
    { icon: <Bell className="h-4 w-4" />, label: 'Notifications', href: '/dashboard/notifications', badge: '3' },
  ];
  return (
    <div className="dashboard font-sans h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
className={`${styles.sidebar} w-64 border-r border-border flex flex-col shadow-sm h-screen overflow-y-auto flex-none`}
      >
        {/* Logo & Search */}
        <div className="p-4 border-b border-border">
          <Link href="/dashboard" className="flex items-center space-x-2 mb-4">
<div className={`${styles.logoTile} h-8 w-8 rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">OA</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">OmniAgent</span>
              <span className="text-xs text-charcoal-500 block">Pro</span>
            </div>
          </Link>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
            <Input
              placeholder="Search"
              className="pl-10 h-9 bg-muted border-input focus:bg-card text-sm"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal-400 bg-secondary px-1.5 py-0.5 rounded">
              /
            </kbd>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1">
          {navItems.map((item, index) => {
            const isActive = item.href === '/dashboard/home'
              ? pathname === '/dashboard' || pathname === '/dashboard/home' || pathname === '/dashboard/home/'
              : pathname.startsWith(item.href);

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={item.href}
className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive ? styles.navItemActive : styles.navItem
                  )}
                >
                  <div className={cn(
                    "mr-3 transition-colors",
                    isActive ? "text-foreground" : "text-charcoal-400 group-hover:text-charcoal-600"
                  )}>
                    {item.icon}
                  </div>
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Tools & Notifications */}
        <div className="px-4 py-2 border-t border-border">
<div className={`${styles.groupLabel} text-xs font-medium mb-2 px-3`}>Tools & Utilities</div>
          <div className="space-y-1">
            {toolsItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + index) * 0.08 }}
              >
                <Link
                  href={item.href}
className={cn("flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group relative", styles.navItem)}
                >
<div className={`${styles.navIcon} mr-3 transition-colors`}>
                    {item.icon}
                  </div>
                  {item.label}
                  {item.badge && (
<span className={`${styles.badge} ml-auto text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Business-only */}
        <div className="px-4 py-2 border-t border-border">
<div className={`${styles.groupLabel} text-xs font-medium mb-2 px-3`}>Business</div>
          <div className="space-y-1">
            {[
              { icon: <Users className="h-4 w-4" />, label: 'Teams & Roles', href: '/dashboard/teams' },
              { icon: <LayoutDashboard className="h-4 w-4" />, label: 'Brands & Environments', href: '/dashboard/brands' },
              { icon: <Shield className="h-4 w-4" />, label: 'Governance & Audit', href: '/dashboard/governance' },
            ].map((item, index) => (
              <motion.div key={item.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (navItems.length + toolsItems.length + index) * 0.08 }}>
<Link href={item.href} className={cn("flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group border border-transparent", styles.navItem)}>
                  <div className="mr-3 text-charcoal-400 group-hover:text-charcoal-600 transition-colors">{item.icon}</div>
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Help & Settings */}
        <div className="px-4 py-2 border-t border-border space-y-1">
          <Link
            href="/dashboard/help"
            className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-charcoal-600 hover:bg-secondary hover:text-foreground transition-all duration-200 group"
          >
            <HelpCircle className="h-4 w-4 mr-3 text-charcoal-400 group-hover:text-charcoal-600 transition-colors" />
            Help Center
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-charcoal-600 hover:bg-secondary hover:text-foreground transition-all duration-200 group"
          >
            <Settings className="h-4 w-4 mr-3 text-charcoal-400 group-hover:text-charcoal-600 transition-colors" />
            Settings
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start h-auto p-2">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/avatars/user.jpg" />
                  <AvatarFallback className="bg-charcoal-900 text-white text-sm">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left flex-1">
                  <div className="text-sm font-medium text-foreground">
                    {user?.username || 'David Johnson'}
                  </div>
                  <div className="text-xs text-charcoal-500">
                    {user?.email || 'david@gmail.com'}
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-charcoal-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          />

          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border md:hidden">
            <div className="h-16 border-b border-border px-4 flex items-center justify-between">
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
                        ? "bg-primary text-primary-foreground"
                        : "text-charcoal-700 hover:bg-secondary"
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
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <motion.header
          initial={{ y: -60 }}
          animate={{ y: 0 }}
className={`${styles.topbar} h-16 flex items-center justify-between px-4 md:px-6`}
        >
          {/* Left side - Breadcrumb */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Menu className="h-5 w-5 text-charcoal-600" />
            </button>
            <span className="text-sm text-charcoal-500">omni-agent.studio</span>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-3">
            {/* Team avatars */}
            <div className="flex -space-x-2">
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src="/avatars/user1.jpg" />
                <AvatarFallback className="bg-amber-600 text-white text-xs">JD</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src="/avatars/user2.jpg" />
                <AvatarFallback className="bg-emerald-600 text-white text-xs">SM</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src="/avatars/user3.jpg" />
                <AvatarFallback className="bg-stone-700 text-white text-xs">AL</AvatarFallback>
              </Avatar>
              <div className="h-8 w-8 border-2 border-white rounded-full bg-secondary flex items-center justify-center">
                <span className="text-xs font-medium text-charcoal-600">+4</span>
              </div>
            </div>

            {/* Voice Interface Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setVoiceInterfaceOpen(true)}
            >
              <Mic className="h-4 w-4 text-charcoal-600" />
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4 text-charcoal-600" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="h-8 w-8 relative">
              <Bell className="h-4 w-4 text-charcoal-600" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>

            {/* Create Agent Button */}
<Button className={`${styles.copperBtn} h-8 px-4 text-sm font-medium text-white`}>
              <Plus className="h-4 w-4 mr-1" />
              Create Agent
            </Button>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>

      {/* Voice Interface */}
      <VoiceInterface
        onVoiceCommand={(command: string) => {
          console.log('Voice command:', command);
          // Handle voice commands here
          if (command.toLowerCase().includes('conversations')) {
            router.push('/dashboard/conversations');
          } else if (command.toLowerCase().includes('channels')) {
            router.push('/dashboard/channels');
          } else if (command.toLowerCase().includes('agents')) {
            router.push('/dashboard/agents');
          } else if (command.toLowerCase().includes('knowledge')) {
            router.push('/dashboard/knowledge');
          }
        }}
      />
    </div>
  );
}