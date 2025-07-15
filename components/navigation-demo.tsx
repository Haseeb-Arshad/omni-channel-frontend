"use client";

import { useState } from 'react';
import { NavigationItem } from '@/components/ui/navigation-item';
import { Home, MessageCircle, MessageSquare, Database, Brain, Settings } from 'lucide-react';

export function NavigationDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('/dashboard/home');

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

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">Navigation Item Demo</h1>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
      
      <div className={`bg-white rounded-2xl shadow-lg p-4 space-y-2 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
        {navItems.map((item) => (
          <NavigationItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={activeItem === item.href}
            isCollapsed={collapsed}
            gradient={item.gradient}
            bgColor={item.bgColor}
            textColor={item.textColor}
            badge={item.badge}
            onClick={() => setActiveItem(item.href)}
          />
        ))}
      </div>
      
      <div className="text-sm text-gray-600 space-y-2">
        <p><strong>Features demonstrated:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>Gradient active states with smooth transitions</li>
          <li>Hover effects with scale and color changes</li>
          <li>Badge support with notification counts</li>
          <li>Smooth animations for collapsed/expanded states</li>
          <li>Tooltip support for collapsed mode</li>
        </ul>
      </div>
    </div>
  );
}