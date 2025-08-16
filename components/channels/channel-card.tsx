"use client";

import { motion } from "framer-motion";
import { 
  Settings, 
  MoreHorizontal, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Globe
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Channel {
  id: string;
  name: string;
  type: 'whatsapp' | 'email' | 'sms' | 'voice' | 'web';
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastActivity: Date;
  messageCount: number;
  isEnabled: boolean;
}

interface ChannelCardProps {
  channel: Channel;
  onToggleEnabled: (id: string, enabled: boolean) => void;
  onSettings: (id: string) => void;
  onMoreActions: (id: string) => void;
  index?: number;
}

const getChannelIcon = (type: string) => {
  switch (type) {
    case 'email': return Mail;
    case 'sms': return Phone;
    case 'whatsapp': return MessageCircle;
    case 'voice': return Phone;
    case 'web': return Globe;
    default: return MessageCircle;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'connected': return CheckCircle;
    case 'error': return AlertCircle;
    case 'syncing': return Clock;
    default: return AlertCircle;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'connected': return 'text-green-500 bg-green-100';
    case 'error': return 'text-red-500 bg-red-100';
    case 'syncing': return 'text-yellow-500 bg-yellow-100';
    default: return 'text-gray-500 bg-gray-100';
  }
};

export const ChannelCard = ({ 
  channel, 
  onToggleEnabled, 
  onSettings, 
  onMoreActions,
  index = 0 
}: ChannelCardProps) => {
  const IconComponent = getChannelIcon(channel.type);
  const StatusIcon = getStatusIcon(channel.status);

  return (
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
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{channel.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <StatusIcon className={`h-4 w-4 ${getStatusColor(channel.status).split(' ')[0]}`} />
              <Badge 
                variant="outline" 
                className={`text-xs ${getStatusColor(channel.status)}`}
              >
                {channel.status}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            checked={channel.isEnabled}
            onCheckedChange={(checked) => onToggleEnabled(channel.id, checked)}
            className="data-[state=checked]:bg-blue-500"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onMoreActions(channel.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-gray-900">{channel.messageCount}</p>
          <p className="text-xs text-gray-600">Messages</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-semibold text-gray-900">
            {channel.lastActivity.toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-600">Last Activity</p>
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
          onClick={() => onSettings(channel.id)}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white"
          size="sm"
        >
          <Settings className="h-4 w-4 mr-2" />
          Configure
        </Button>
      </motion.div>
    </motion.div>
  );
};