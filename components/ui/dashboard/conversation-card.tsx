"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Mail, Phone, Facebook, Globe, MessageCircle } from 'lucide-react';

interface ConversationCardProps {
  id: string;
  contact: {
    name: string;
    avatar?: string;
  };
  message: string;
  time: string;
  channel: string;
  channelName: string;
  unread?: boolean;
  index?: number;
  onClick?: () => void;
}

export function ConversationCard({
  id,
  contact,
  message,
  time,
  channel,
  channelName,
  unread = false,
  index = 0,
  onClick,
}: ConversationCardProps) {
  
  const getChannelIcon = () => {
    switch (channel?.toLowerCase()) {
      case 'sms':
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4" />;
      case 'web':
        return <Globe className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <Card 
        className={cn(
          "border border-border/30 hover:border-primary/20 backdrop-blur-[2px] overflow-hidden",
          "transition-all duration-200 cursor-pointer",
          unread ? "bg-primary/[0.02] border-l-2 border-l-primary" : "bg-card hover:bg-primary/[0.01]"
        )}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 border border-border/50">
              {contact.avatar ? (
                <AvatarImage src={contact.avatar} alt={contact.name} />
              ) : null}
              <AvatarFallback className="bg-primary/5 text-primary">
                {getInitials(contact.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium truncate">{contact.name}</h3>
                  {unread && (
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
                
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Badge variant="outline" className="px-1.5 py-0 h-5 text-[10px] font-normal border-primary/10 bg-primary/5 text-primary/90 flex items-center gap-1">
                    {getChannelIcon()}
                    <span>{channelName}</span>
                  </Badge>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground line-clamp-1 mt-1.5">
                {message}
              </p>
              
              <div className="mt-2 text-[10px] text-muted-foreground/70">
                {time}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
