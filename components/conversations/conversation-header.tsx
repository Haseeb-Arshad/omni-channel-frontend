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
  <div className="px-4 py-3 border-b border-gray-700 bg-gray-800">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          {conversation.contact.avatar ? (
            <AvatarImage src={conversation.contact.avatar} />
          ) : (
            <AvatarFallback className="bg-gray-600 text-white text-xs">
              {conversation.contact.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h2 className="font-medium text-sm text-white">
            {conversation.contact.name}
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-5 px-1.5 text-[11px] bg-gray-700 text-gray-300 border-gray-600">
              {conversation.channel}
            </Badge>
            <span className="text-[11px] text-gray-400">
              {conversation.contact.email || conversation.contact.phone}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onResolve}
          className="bg-green-600 hover:bg-green-700 text-white h-8 px-3 rounded-lg text-xs"
        >
          <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 inline" />
          Resolve
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onTransfer}
          className="border border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-200 h-8 px-3 rounded-lg text-xs"
        >
          <ArrowRightLeft className="h-3.5 w-3.5 mr-1.5 inline" />
          Transfer
        </motion.button>
        <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700" onClick={onMoreActions}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);
