"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRightLeft, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Contact {
  name: string;
  avatar?: string | null;
  email?: string;
  phone?: string;
}

interface Conversation {
  id: string;
  contact: Contact;
  channel: string;
}

interface ConversationHeaderProps {
  conversation: Conversation;
  onResolve: () => void;
  onTransfer: () => void;
  onMoreActions: () => void;
}

export const ConversationHeader = ({ 
  conversation, 
  onResolve, 
  onTransfer, 
  onMoreActions 
}: ConversationHeaderProps) => (
  <div className="p-6 border-b border-gray-200 bg-gray-50/50">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
          {conversation.contact.avatar ? (
            <AvatarImage src={conversation.contact.avatar} />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {conversation.contact.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h2 className="font-semibold text-gray-900">
            {conversation.contact.name}
          </h2>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs bg-white">
              {conversation.channel}
            </Badge>
            <span className="text-xs text-gray-500">
              {conversation.contact.email || conversation.contact.phone}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onResolve}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-sm"
        >
          <CheckCircle2 className="h-4 w-4 mr-2 inline" />
          Resolve
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onTransfer}
          className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl font-medium transition-colors"
        >
          <ArrowRightLeft className="h-4 w-4 mr-2 inline" />
          Transfer
        </motion.button>
        <Button variant="ghost" size="icon" className="rounded-xl" onClick={onMoreActions}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);