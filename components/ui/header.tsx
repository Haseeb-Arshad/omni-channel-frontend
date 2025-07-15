"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Settings, 
  Users, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  onMobileMenuToggle?: () => void;
  className?: string;
}

export function Header({ onMobileMenuToggle, className }: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Handle scroll-based styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Command/Ctrl + K for search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setShowSearch(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }

      // Escape to close search
      if (event.key === 'Escape') {
        if (showSearch) {
          setShowSearch(false);
          setSearchValue('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSearch]);

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
      setShowSearch(false);
      setSearchValue('');
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b border-charcoal-200 bg-white transition-all duration-200",
          isScrolled ? "shadow-sm" : "",
          className
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          {/* Left section */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={onMobileMenuToggle}
              className="md:hidden p-2 rounded-lg hover:bg-charcoal-100 transition-colors"
            >
              <Menu className="h-5 w-5 text-charcoal-600" />
            </button>

            {/* Search */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setShowSearch(true)}
                className="flex items-center gap-3 px-4 py-2 bg-charcoal-100 hover:bg-charcoal-200 rounded-lg transition-colors text-sm text-charcoal-600"
              >
                <Search className="h-4 w-4" />
                <span>Search...</span>
                <kbd className="px-2 py-1 text-xs bg-white rounded border border-charcoal-300">⌘K</kbd>
              </button>
            </div>

            {/* Mobile search button */}
            <button
              onClick={() => setShowSearch(true)}
              className="md:hidden p-2 rounded-lg hover:bg-charcoal-100 transition-colors"
            >
              <Search className="h-5 w-5 text-charcoal-600" />
            </button>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-charcoal-100 transition-colors relative">
              <Bell className="h-5 w-5 text-charcoal-600" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative rounded-full p-0 h-10 w-10">
                  <Avatar className="h-10 w-10 border-2 border-charcoal-200">
                    <AvatarFallback className="bg-charcoal-900 text-white font-semibold">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 mt-2">
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-charcoal-900 text-white font-semibold">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold text-charcoal-900">
                        {user?.username || 'User'}
                      </p>
                      <p className="text-xs text-charcoal-500">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="cursor-pointer">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowSearch(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Search modal */}
            <motion.div
              className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl border border-charcoal-200"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <form onSubmit={handleSearchSubmit} className="p-4 border-b border-charcoal-200">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-charcoal-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search conversations, channels, knowledge..."
                    className="flex-1 bg-transparent text-lg placeholder:text-charcoal-400 focus:outline-none text-charcoal-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSearch(false)}
                    className="p-1 rounded hover:bg-charcoal-100 transition-colors"
                  >
                    <X className="h-4 w-4 text-charcoal-500" />
                  </button>
                </div>
              </form>
              <div className="p-2 max-h-96 overflow-y-auto">
                <div className="px-3 py-2 text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                  Quick Actions
                </div>
                <div className="space-y-1">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-charcoal-50 transition-colors text-left">
                    <span className="text-sm text-charcoal-700">New Conversation</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-charcoal-50 transition-colors text-left">
                    <span className="text-sm text-charcoal-700">Open Settings</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}