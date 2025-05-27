"use client";

import { Check } from "lucide-react";

export interface Message {
  id: string;
  conversationId: string;
  sender: "customer" | "agent" | "ai";
  content: string;
  timestamp: string;
  read: boolean;
  attachments: Attachment[];
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  // Function to render attachments
  const renderAttachments = () => {
    if (message.attachments.length === 0) return null;
    
    return (
      <div className="mt-2 space-y-1">
        {message.attachments.map(attachment => (
          <div 
            key={attachment.id}
            className="flex items-center p-1.5 bg-background/80 rounded border text-sm"
          >
            <div className="w-6 h-6 bg-muted rounded flex items-center justify-center mr-2">
              <span className="text-xs">{attachment.type.split('/')[1]?.toUpperCase() || 'FILE'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs">{attachment.name}</p>
            </div>
            <a 
              href={attachment.url} 
              download
              className="ml-2 text-xs text-primary hover:underline"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          message.sender === 'customer' 
            ? 'bg-muted self-start rounded-bl-none' 
            : message.sender === 'agent'
              ? 'bg-primary text-primary-foreground self-end rounded-br-none'
              : 'bg-secondary self-start rounded-bl-none'
        }`}
      >
        {message.sender === 'ai' && (
          <div className="flex items-center mb-1 text-xs font-medium text-secondary-foreground">
            <div className="w-4 h-4 bg-secondary-foreground rounded-full flex items-center justify-center mr-1">
              <span className="text-[8px] text-secondary">AI</span>
            </div>
            AI Assistant
          </div>
        )}
        <p className={`text-sm ${message.sender === 'agent' ? 'text-primary-foreground' : ''}`}>
          {message.content}
        </p>
        {renderAttachments()}
      </div>
      <div 
        className={`text-xs text-muted-foreground mt-1 flex items-center ${
          message.sender === 'customer' ? 'self-start' : 'self-end'
        }`}
      >
        {message.timestamp}
        {message.sender === 'agent' && (
          <Check className="h-3 w-3 ml-1 text-muted-foreground" />
        )}
      </div>
    </div>
  );
}
