"use client";

import { motion } from "framer-motion";
import { MoreHorizontal, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Agent {
  id: string;
  name: string;
  avatar?: string | null;
  isActive: boolean;
  metrics: {
    resolutionsThisWeek: number;
    successRate: number;
  };
  activeChannels: string[];
  lastActivity: Date;
}

interface AgentCardProps {
  agent: Agent;
  onToggleActive: (id: string, active: boolean) => void;
  onManage: (id: string) => void;
  onMoreActions: (id: string) => void;
  index?: number;
}

const getChannelIcon = (channel: string) => {
  // Return appropriate channel icons
  return channel.substring(0, 2).toUpperCase();
};

export const AgentCard = ({ 
  agent, 
  onToggleActive, 
  onManage, 
  onMoreActions,
  index = 0 
}: AgentCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="group bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20 hover:shadow-xl hover:shadow-black/10 transition-all duration-300"
  >
    {/* Header */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
          {agent.avatar ? (
            <AvatarImage src={agent.avatar} />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white font-semibold">
              {agent.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h3 className="font-semibold text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-500">
            Last active {agent.lastActivity.toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={agent.isActive}
          onCheckedChange={(checked) => onToggleActive(agent.id, checked)}
          className="data-[state=checked]:bg-purple-500"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onMoreActions(agent.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>

    {/* Metrics */}
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="text-center p-3 bg-gray-50 rounded-lg">
        <p className="text-2xl font-bold text-gray-900">{agent.metrics.resolutionsThisWeek}</p>
        <p className="text-xs text-gray-600">Resolutions</p>
      </div>
      <div className="text-center p-3 bg-gray-50 rounded-lg">
        <p className="text-2xl font-bold text-gray-900">{agent.metrics.successRate}%</p>
        <p className="text-xs text-gray-600">Success Rate</p>
      </div>
    </div>

    {/* Active Channels */}
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-700 mb-2">Active Channels</p>
      <div className="flex flex-wrap gap-1">
        {agent.activeChannels.map((channel) => (
          <Badge key={channel} variant="outline" className="text-xs">
            {getChannelIcon(channel)} {channel}
          </Badge>
        ))}
      </div>
    </div>

    {/* Actions */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <Button
        onClick={() => onManage(agent.id)}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white"
        size="sm"
      >
        <Settings className="h-4 w-4 mr-2" />
        Manage Agent
      </Button>
    </motion.div>
  </motion.div>
);