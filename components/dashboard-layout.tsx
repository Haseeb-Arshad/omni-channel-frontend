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
  Workflow,
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
    {
      icon: <Home className="h-5 w-5" />,
      label: 'Overview',
      href: '/dashboard/home',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: 'Conversations',
      href: '/dashboard/conversations',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: <Hash className="h-5 w-5" />,
      label: 'Channels',
      href: '/dashboard/channels',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: <Bot className="h-5 w-5" />,
      label: 'AI Agents',
      href: '/dashboard/agents',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: <Brain className="h-5 w-5" />,
      label: 'Personas',
      href: '/dashboard/persona',
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: 'Knowledge',
      href: '/dashboard/knowledge',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: <Headphones className="h-5 w-5" />,
      label: 'Voice Studio',
      href: '/dashboard/voice',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      label: 'Analytics',
      href: '/dashboard/analytics',
      gradient: 'from-cyan-500 to-blue-600'
    }
  ];

  const toolsItems = [
    {
      icon: <Bell className="h-4 w-4" />,
      label: 'Notifications',
      href: '/dashboard/notifications',
      badge: '3'
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: 'Members',
      href: '/dashboard/members'
    },
    {
      icon: <Inbox className="h-4 w-4" />,
      label: 'Inbox',
      href: '/dashboard/inbox'
    },
    {
      icon: <UserPlus className="h-4 w-4" />,
      label: 'Integrations',
      href: '/dashboard/integrations'
    }
  ];
  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm h-screen overflow-y-auto flex-none"
      >
        {/* Logo & Search */}
        <div className="p-4 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center space-x-2 mb-4">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OA</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">OmniAgent</span>
              <span className="text-xs text-gray-500 block">Pro</span>
            </div>
          </Link>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search"
              className="pl-10 h-9 bg-gray-50 border-gray-200 focus:bg-white text-sm"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
              /
            </kbd>
          </div>
        </div>

        {/* Dashboard Dropdown */}
        <div className="px-4 py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-between h-8 px-2 text-sm font-medium">
                Dashboard
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>Overview</DropdownMenuItem>
              <DropdownMenuItem>Analytics</DropdownMenuItem>
              <DropdownMenuItem>Reports</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className={cn(
                    "mr-3 transition-colors",
                    isActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"
                  )}>
                    {item.icon}
                  </div>
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Tools Section */}
        <div className="px-4 py-2 border-t border-gray-100">
          <div className="text-xs font-medium text-gray-500 mb-2 px-3">Tools</div>
          <div className="space-y-1">
            {toolsItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + index) * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group relative"
                >
                  <div className="mr-3 text-gray-400 group-hover:text-gray-600 transition-colors">
                    {item.icon}
                  </div>
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Help & Settings */}
        <div className="px-4 py-2 border-t border-gray-100 space-y-1">
          <Link
            href="/dashboard/help"
            className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
          >
            <HelpCircle className="h-4 w-4 mr-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
            Help Center
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
          >
            <Settings className="h-4 w-4 mr-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
            Settings
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start h-auto p-2">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/avatars/user.jpg" />
                  <AvatarFallback className="bg-gray-900 text-white text-sm">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.username || 'David Johnson'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.email || 'david@gmail.com'}
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
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
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <motion.header
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm"
        >
          {/* Left side - Breadcrumb */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <span className="text-sm text-gray-500">omni-agent.studio</span>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-3">
            {/* Team avatars */}
            <div className="flex -space-x-2">
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src="/avatars/user1.jpg" />
                <AvatarFallback className="bg-blue-500 text-white text-xs">JD</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src="/avatars/user2.jpg" />
                <AvatarFallback className="bg-green-500 text-white text-xs">SM</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src="/avatars/user3.jpg" />
                <AvatarFallback className="bg-purple-500 text-white text-xs">AL</AvatarFallback>
              </Avatar>
              <div className="h-8 w-8 border-2 border-white rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">+4</span>
              </div>
            </div>

            {/* Voice Interface Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setVoiceInterfaceOpen(true)}
            >
              <Mic className="h-4 w-4 text-gray-600" />
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4 text-gray-600" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="h-8 w-8 relative">
              <Bell className="h-4 w-4 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>

            {/* Create Agent Button */}
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 h-8 px-4 text-sm font-medium">
              <Plus className="h-4 w-4 mr-1" />
              Create Agent
            </Button>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto p-6">
            {children}
          </div>
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