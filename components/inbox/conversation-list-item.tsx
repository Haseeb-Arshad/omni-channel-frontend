"use client";

import { MessageSquare, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Contact {
  name: string;
  avatar?: string;
  email: string;
  phone: string;
}

export interface Conversation {
  id: string;
  contact: Contact;
  channel: "email" | "chat" | "sms" | "whatsapp";
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  tags: string[];
  assignedTo: string | null;
}

interface ConversationListItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export function ConversationListItem({ 
  conversation, 
  isActive, 
  onClick 
}: ConversationListItemProps) {
  // Get channel icon and color
  const getChannelIcon = () => {
    switch (conversation.channel) {
      case "email":
        return <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
          <MessageSquare className="h-2.5 w-2.5 text-white" />
        </div>;
      case "chat":
        return <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
          <MessageSquare className="h-2.5 w-2.5 text-white" />
        </div>;
      case "sms":
        return <div className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-1">
          <Phone className="h-2.5 w-2.5 text-white" />
        </div>;
      case "whatsapp":
        return <div className="absolute -bottom-1 -right-1 bg-green-600 rounded-full p-1">
          <MessageSquare className="h-2.5 w-2.5 text-white" />
        </div>;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`px-4 py-3 border-b cursor-pointer transition-colors hover:bg-muted ${
        isActive ? 'bg-primary/5 border-l-4 border-l-primary' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mr-3 relative">
          {conversation.contact.avatar ? (
            <img 
              src={conversation.contact.avatar} 
              alt={conversation.contact.name} 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium">
              {conversation.contact.name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
          {getChannelIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm truncate">{conversation.contact.name}</h4>
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{conversation.timestamp}</span>
          </div>
          <p className="text-sm text-muted-foreground truncate mt-0.5">{conversation.lastMessage}</p>
          <div className="flex items-center mt-1.5 space-x-2">
            {conversation.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="px-1.5 py-0 text-xs rounded">{tag}</Badge>
            ))}
          </div>
        </div>
        {conversation.unread && (
          <div className="ml-2 w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5"></div>
        )}
      </div>
    </div>
  );
}
