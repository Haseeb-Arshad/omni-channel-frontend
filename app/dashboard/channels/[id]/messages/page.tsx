"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Paperclip, Smile, Settings, Download, Filter, Search, ChevronDown, MoreHorizontal } from "lucide-react";
import { 
  Card, 
  CardContent,  
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Message type definition
interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'customer' | 'agent' | 'system' | 'ai';
  status?: 'sent' | 'delivered' | 'read';
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
}

export default function ChannelMessagesPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState({
    id: params.id,
    name: "",
    type: "",
    customerName: "",
    customerAvatar: "",
    customerInfo: ""
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // In a real app, this would fetch channel data and messages from the API
  useEffect(() => {
    // Simulate API fetch with sample data based on the channel ID
    setTimeout(() => {
      const sampleData = {
        id: params.id,
        name: params.id === "1" ? "Twilio SMS" : 
             params.id === "email" ? "Business Email" : 
             params.id === "webchat" ? "Website Chat Widget" :
             params.id === "whatsapp" ? "WhatsApp Business" :
             "Channel " + params.id,
        type: params.id === "1" ? "sms" : 
             params.id === "email" ? "email" : 
             params.id === "webchat" ? "web" :
             params.id === "whatsapp" ? "whatsapp" :
             "unknown",
        customerName: "Jane Cooper",
        customerAvatar: "/avatars/jane-cooper.png",
        customerInfo: params.id === "1" || params.id === "whatsapp" ? "+1 (555) 123-4567" :
                      params.id === "email" ? "jane.cooper@example.com" :
                      params.id === "webchat" ? "Website Visitor" : ""
      };
      
      // Sample messages
      const sampleMessages: Message[] = [
        {
          id: "1",
          content: "Hello, I'm having trouble with my recent order #12345. It's been a week and I haven't received any shipping confirmation.",
          timestamp: "Yesterday, 2:30 PM",
          sender: "customer"
        },
        {
          id: "2",
          content: "Hi Jane, thank you for reaching out. I'll check the status of your order right away.",
          timestamp: "Yesterday, 2:32 PM",
          sender: "agent"
        },
        {
          id: "3",
          content: "I can see that your order has been processed and is currently being prepared for shipping. There seems to be a slight delay due to high volume.",
          timestamp: "Yesterday, 2:35 PM",
          sender: "agent"
        },
        {
          id: "4",
          content: "Thanks for checking. Do you know when it might be shipped?",
          timestamp: "Yesterday, 2:40 PM",
          sender: "customer"
        },
        {
          id: "5",
          content: "Based on the current status, your order should be shipped within the next 24-48 hours. You'll receive an email notification with tracking information once it's on its way.",
          timestamp: "Yesterday, 2:45 PM",
          sender: "ai",
          status: "delivered"
        },
        {
          id: "6",
          content: "That's good to hear. I was getting concerned since it's been a while.",
          timestamp: "Yesterday, 3:00 PM",
          sender: "customer"
        },
        {
          id: "7",
          content: "I understand your concern. As a token of appreciation for your patience, I'd like to offer you a 10% discount on your next purchase. Would that be helpful?",
          timestamp: "Yesterday, 3:05 PM",
          sender: "agent",
          status: "read"
        },
        {
          id: "8",
          content: "Yes, that would be great! Thank you for your help.",
          timestamp: "Yesterday, 3:10 PM",
          sender: "customer"
        },
        {
          id: "9",
          content: "Hello, I just wanted to check if there's any update on my order?",
          timestamp: "Today, 10:15 AM",
          sender: "customer"
        }
      ];
      
      setChannelData(sampleData);
      setMessages(sampleMessages);
      setLoading(false);
    }, 500);
  }, [params.id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // In a real app, this would send the message through the API
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      timestamp: "Just now",
      sender: "agent",
      status: "sent"
    };
    
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getChannelIcon = () => {
    switch(channelData.type) {
      case 'sms': return "💬";
      case 'email': return "📧";
      case 'web': return "🌐";
      case 'whatsapp': return "📱";
      default: return "📨";
    }
  };

  const getSenderInfo = (message: Message) => {
    switch(message.sender) {
      case 'customer': return {
        name: channelData.customerName,
        avatar: channelData.customerAvatar || "/avatars/default.png",
        fallback: channelData.customerName.charAt(0)
      };
      case 'agent': return {
        name: "You",
        avatar: "/avatars/agent.png",
        fallback: "A"
      };
      case 'ai': return {
        name: "AI Assistant",
        avatar: "/avatars/bot.png",
        fallback: "AI"
      };
      case 'system': return {
        name: "System",
        avatar: "",
        fallback: "S"
      };
      default: return {
        name: "Unknown",
        avatar: "",
        fallback: "?"
      };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6 max-w-6xl h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/channels">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <span>{getChannelIcon()}</span>
              <span>{channelData.name} Messages</span>
            </h1>
            <p className="text-muted-foreground">
              View and respond to messages from {channelData.customerName}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/channels/${params.id}/settings`} className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
          </Button>
          <Button size="sm">
            View Customer Profile
          </Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={channelData.customerAvatar || "/avatars/default.png"} alt={channelData.customerName} />
                <AvatarFallback>{channelData.customerName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{channelData.customerName}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{channelData.customerInfo}</span>
                  <Badge variant="outline" className="text-xs">
                    {channelData.type.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export Conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Messages
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Search className="h-4 w-4 mr-2" />
                  Search in Conversation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => {
            const senderInfo = getSenderInfo(message);
            const isCustomer = message.sender === 'customer';
            const isSystem = message.sender === 'system';
            
            return (
              <div key={message.id} className={`flex ${isCustomer ? 'justify-start' : 'justify-end'} ${isSystem ? 'justify-center' : ''}`}>
                <div className={`flex gap-2 max-w-[80%] ${isCustomer ? 'flex-row' : 'flex-row-reverse'} ${isSystem ? 'flex-col items-center' : ''}`}>
                  {!isSystem && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src={senderInfo.avatar} alt={senderInfo.name} />
                      <AvatarFallback>{senderInfo.fallback}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div className={`flex ${isCustomer ? 'flex-row' : 'flex-row-reverse'} items-center gap-2 mb-1`}>
                      <span className="text-xs font-medium">{senderInfo.name}</span>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      {message.status && !isCustomer && (
                        <span className="text-xs text-muted-foreground">
                          {message.status === 'sent' && '✓'}
                          {message.status === 'delivered' && '✓✓'}
                          {message.status === 'read' && '✓✓'}
                        </span>
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      isSystem 
                        ? 'bg-muted text-muted-foreground text-xs text-center' 
                        : isCustomer 
                          ? 'bg-muted' 
                          : message.sender === 'ai' 
                            ? 'bg-primary/10 text-primary-foreground' 
                            : 'bg-primary text-primary-foreground'
                    }`}>
                      {message.content}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.attachments.map(attachment => (
                            <div key={attachment.id} className="flex items-center gap-2 p-2 bg-background/50 rounded">
                              <Paperclip className="h-3 w-3" />
                              <span className="text-xs truncate">{attachment.name}</span>
                              <Button variant="ghost" size="icon" className="h-5 w-5 ml-auto">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </CardContent>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button variant="ghost" size="icon">
              <Smile className="h-5 w-5" />
            </Button>
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
