"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChannelCard } from "./channel-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Globe, Plus, Settings } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  type: 'whatsapp' | 'email' | 'sms' | 'voice' | 'web';
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastActivity: Date;
  messageCount: number;
  isEnabled: boolean;
}

interface ChannelsGridProps {
  channels: Channel[];
  onToggleEnabled: (id: string, enabled: boolean) => void;
  onSettings: (id: string) => void;
  onMoreActions: (id: string) => void;
  onAddChannel: () => void;
  loading?: boolean;
}

export const ChannelsGrid = ({
  channels,
  onToggleEnabled,
  onSettings,
  onMoreActions,
  onAddChannel,
  loading = false
}: ChannelsGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="h-16 bg-gray-100 rounded-lg"></div>
              <div className="h-16 bg-gray-100 rounded-lg"></div>
            </div>
            <div className="h-8 bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (channels.length === 0) {
    return (
      <EmptyState
        icon={Globe}
        title="No channels connected"
        description="Connect your first communication channel to start receiving and managing customer conversations."
        actions={[
          {
            label: "Add Channel",
            onClick: onAddChannel,
            variant: "default"
          },
          {
            label: "View Guide",
            onClick: () => console.log("View guide"),
            variant: "outline"
          }
        ]}
      />
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence>
        {channels.map((channel, index) => (
          <ChannelCard
            key={channel.id}
            channel={channel}
            onToggleEnabled={onToggleEnabled}
            onSettings={onSettings}
            onMoreActions={onMoreActions}
            index={index}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};