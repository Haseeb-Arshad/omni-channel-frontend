"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Contact {
  name: string;
  avatar?: string | null;
  email?: string;
  phone?: string;
  tags?: string[];
  lastSeen?: string;
}

interface Conversation {
  id: string;
  contact: Contact;
  channel: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: string;
  assignedTo?: string | null;
  priority: string;
}

interface ConversationCardProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
  searchQuery?: string;
  index?: number;
}

// Helper functions
const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'email': return <Mail className="h-4 w-4" />;
    case 'sms': return <Phone className="h-4 w-4" />;
    case 'whatsapp': return <MessageCircle className="h-4 w-4" />;
    case 'voice': return <Phone className="h-4 w-4" />;
    case 'web': return <Globe className="h-4 w-4" />;
    default: return <MessageCircle className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
    case 'unassigned': return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'under_review': return 'bg-purple-100 text-purple-700 border-purple-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-400';
  }
};

// Text highlighting function
const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text;
  
  try {
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  } catch (error) {
    return text;
  }
};

export const ConversationCard = ({ 
  conversation, 
  isSelected, 
  onClick, 
  searchQuery = "",
  index = 0 
}: ConversationCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.2 }}
    onClick={onClick}
    className={`px-4 py-3 cursor-pointer hover:bg-gray-700/50 transition-all duration-200 ${
      isSelected ? 'bg-gray-700/70' : ''
    }`}
  >
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="relative">
        <Avatar className="h-10 w-10">
          {conversation.contact.avatar ? (
            <AvatarImage src={conversation.contact.avatar} />
          ) : (
            <AvatarFallback className="bg-gray-600 text-white text-sm">
              {conversation.channel === 'voice' ? (
                <Phone className="h-4 w-4" />
              ) : conversation.contact.name.includes('+') ? (
                <Phone className="h-4 w-4" />
              ) : (
                conversation.contact.name.substring(0, 2).toUpperCase()
              )}
            </AvatarFallback>
          )}
        </Avatar>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <h3 className="font-medium text-white text-sm truncate">
            {conversation.contact.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">{conversation.timestamp}</span>
            {conversation.unread > 0 && (
              <div className="bg-green-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                {conversation.unread}
              </div>
            )}
          </div>
        </div>
        
        <p className="text-xs text-gray-300 truncate">
          {conversation.lastMessage}
        </p>
      </div>
    </div>
  </motion.div>
);
