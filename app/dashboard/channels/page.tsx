"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Plus, Activity, MessageSquare, Clock, CheckCircle } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { NotificationBanner } from "@/components/dashboard/notification-banner";
import { ChannelsGrid } from "@/components/channels/channels-grid";
import { Button } from "@/components/ui/button";

// Mock data for channels
const mockChannels = [
  {
    id: "1",
    name: "WhatsApp Business",
    type: "whatsapp" as const,
    status: "connected" as const,
    lastActivity: new Date("2024-01-15"),
    messageCount: 1247,
    isEnabled: true
  },
  {
    id: "2",
    name: "Support Email",
    type: "email" as const,
    status: "connected" as const,
    lastActivity: new Date("2024-01-15"),
    messageCount: 892,
    isEnabled: true
  },
  {
    id: "3",
    name: "SMS Gateway",
    type: "sms" as const,
    status: "syncing" as const,
    lastActivity: new Date("2024-01-14"),
    messageCount: 234,
    isEnabled: true
  },
  {
    id: "4",
    name: "Voice Support",
    type: "voice" as const,
    status: "error" as const,
    lastActivity: new Date("2024-01-13"),
    messageCount: 45,
    isEnabled: false
  }
];

// Stats for channels overview
const channelStats = [
  {
    title: 'Connected Channels',
    value: '4',
    change: '+1',
    trend: 'up' as const,
    icon: Globe,
    gradient: 'from-blue-500 to-blue-600',
    delay: 0
  },
  {
    title: 'Total Messages',
    value: '2.4K',
    change: '+18%',
    trend: 'up' as const,
    icon: MessageSquare,
    gradient: 'from-green-500 to-green-600',
    delay: 0.1
  },
  {
    title: 'Uptime',
    value: '99.9%',
    change: '+0.1%',
    trend: 'up' as const,
    icon: Activity,
    gradient: 'from-purple-500 to-purple-600',
    delay: 0.2
  },
  {
    title: 'Avg Response',
    value: '2.1s',
    change: '-0.3s',
    trend: 'up' as const,
    icon: Clock,
    gradient: 'from-orange-500 to-orange-600',
    delay: 0.3
  }
];

export default function ChannelsPage() {
  const [channels, setChannels] = useState(mockChannels);

  const handleToggleEnabled = (id: string, enabled: boolean) => {
    setChannels(prev => prev.map(channel => 
      channel.id === id ? { ...channel, isEnabled: enabled } : channel
    ));
  };

  const handleSettings = (id: string) => {
    console.log("Opening settings for channel:", id);
    // Open channel settings modal/page
  };

  const handleMoreActions = (id: string) => {
    console.log("More actions for channel:", id);
  };

  const handleAddChannel = () => {
    console.log("Adding new channel");
    // Open add channel modal/page
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <PageHeader
        title="Communication Channels"
        subtitle="Connect and manage all your customer communication channels in one place."
      >
        <Button
          onClick={handleAddChannel}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Channel
        </Button>
      </PageHeader>

      {/* Channel Status Banner */}
      <NotificationBanner
        icon={CheckCircle}
        title="All systems operational"
        description="All connected channels are running smoothly with 99.9% uptime this month."
        variant="success"
      />

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {channelStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </motion.div>

      {/* Channels Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <ChannelsGrid
          channels={channels}
          onToggleEnabled={handleToggleEnabled}
          onSettings={handleSettings}
          onMoreActions={handleMoreActions}
          onAddChannel={handleAddChannel}
        />
      </motion.div>
    </motion.div>
  );
}