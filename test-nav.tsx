"use client";

import { NavigationItem } from '@/components/ui/navigation-item';
import { Home, MessageCircle } from 'lucide-react';

export default function TestNav() {
  return (
    <div className="p-8 space-y-4">
      <h1>Navigation Item Test</h1>
      
      <div className="w-64 space-y-2">
        <NavigationItem
          icon={<Home className="h-[18px] w-[18px]" />}
          label="Dashboard"
          href="/dashboard/home"
          isActive={true}
          isCollapsed={false}
          gradient="from-blue-500 to-indigo-600"
          bgColor="bg-blue-50"
          textColor="text-blue-600"
          badge={0}
        />
        
        <NavigationItem
          icon={<MessageCircle className="h-[18px] w-[18px]" />}
          label="Conversations"
          href="/dashboard/conversations"
          isActive={false}
          isCollapsed={false}
          gradient="from-green-500 to-emerald-600"
          bgColor="bg-green-50"
          textColor="text-green-600"
          badge={12}
        />
        
        <NavigationItem
          icon={<MessageCircle className="h-[18px] w-[18px]" />}
          label="Conversations"
          href="/dashboard/conversations"
          isActive={false}
          isCollapsed={true}
          gradient="from-green-500 to-emerald-600"
          bgColor="bg-green-50"
          textColor="text-green-600"
          badge={5}
        />
      </div>
    </div>
  );
}