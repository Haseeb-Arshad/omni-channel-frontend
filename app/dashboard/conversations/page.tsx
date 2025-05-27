"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, Filter, MoreHorizontal, Send, Paperclip, 
  Smile, ChevronRight, Clock, Tag, User, AlertCircle,
  MessageSquare, Check, X, RefreshCw, Phone, Video,
  Mail, MessageCircle, Facebook, Globe, Info, FileText,
  AtSign, Plus
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for demonstration
const mockConversations = [
  {
    id: "1",
    contact: {
      name: "Jane Cooper",
      avatar: "/avatars/jane-cooper.png",
      email: "jane.cooper@example.com",
      phone: "+1 (555) 123-4567"
    },
    channel: "email",
    lastMessage: "I've been having issues with my recent order...",
    timestamp: "10:42 AM",
    unread: true,
    tags: ["Support", "Order Issue"],
    assignedTo: "John Doe",
    history: [
      { 
        id: "m1", 
        content: "Hello, I ordered product XYZ last week and it still hasn't arrived. Order #12345", 
        timestamp: "Yesterday, 2:30 PM", 
        sender: "customer",
        channel: "email"
      },
      { 
        id: "m2", 
        content: "Hi Jane, I'm sorry to hear about the delay. Let me check the status of your order right away.", 
        timestamp: "Yesterday, 2:45 PM", 
        sender: "agent",
        channel: "email"
      },
      { 
        id: "m3", 
        content: "I've checked your order and it looks like there was a delay at our warehouse. It should ship today and arrive within 2-3 business days. I'll email you the tracking information once it's available.", 
        timestamp: "Yesterday, 2:52 PM", 
        sender: "agent",
        channel: "email"
      },
      { 
        id: "m4", 
        content: "Thank you for checking. I was getting worried since the website said it would arrive by yesterday.", 
        timestamp: "Yesterday, 3:05 PM", 
        sender: "customer",
        channel: "email"
      },
      { 
        id: "m5", 
        content: "I understand your concern. As a token of apology for the delay, I've applied a 10% discount to your next order. You'll receive an email with the discount code shortly.", 
        timestamp: "Yesterday, 3:12 PM", 
        sender: "agent", 
        channel: "email"
      },
      { 
        id: "m6", 
        content: "I've been having issues with my recent order...", 
        timestamp: "Today, 10:42 AM", 
        sender: "customer",
        channel: "email"
      }
    ]
  },
  {
    id: "2",
    contact: {
      name: "Alex Morgan",
      avatar: "/avatars/alex-morgan.png",
      email: "alex.morgan@example.com",
      phone: "+1 (555) 234-5678"
    },
    channel: "web",
    lastMessage: "When will the new product be available?",
    timestamp: "Yesterday",
    unread: false,
    tags: ["Sales", "Product Inquiry"],
    assignedTo: null,
    history: [
      { 
        id: "m1", 
        content: "Hi there! I'm interested in your upcoming product launch. When will it be available?", 
        timestamp: "Yesterday, 11:20 AM", 
        sender: "customer",
        channel: "web"
      },
      { 
        id: "m2", 
        content: "Hello Alex! Our new product line will be launching on June 15th. Would you like to be notified when it's available?", 
        timestamp: "Yesterday, 11:25 AM", 
        sender: "agent",
        channel: "web"
      },
      { 
        id: "m3", 
        content: "Yes, please! Will there be any early access or pre-order options?", 
        timestamp: "Yesterday, 11:30 AM", 
        sender: "customer",
        channel: "web"
      }
    ]
  },
  {
    id: "3",
    contact: {
      name: "Robert Johnson",
      avatar: "/avatars/robert-johnson.png",
      email: "robert.j@example.com",
      phone: "+1 (555) 345-6789"
    },
    channel: "whatsapp",
    lastMessage: "Thanks for the information!",
    timestamp: "Yesterday",
    unread: false,
    tags: ["Support"],
    assignedTo: "Sarah Williams",
    history: [
      { 
        id: "m1", 
        content: "Hello, I need help resetting my account password", 
        timestamp: "2 days ago, 3:40 PM", 
        sender: "customer",
        channel: "whatsapp"
      },
      { 
        id: "m2", 
        content: "Hi Robert, I'd be happy to help you reset your password. Please verify your account by providing the email address associated with your account.", 
        timestamp: "2 days ago, 3:45 PM", 
        sender: "agent",
        channel: "whatsapp"
      },
      { 
        id: "m3", 
        content: "My email is robert.j@example.com", 
        timestamp: "2 days ago, 3:50 PM", 
        sender: "customer",
        channel: "whatsapp"
      },
      { 
        id: "m4", 
        content: "Thank you. I've sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password.", 
        timestamp: "2 days ago, 3:55 PM", 
        sender: "agent",
        channel: "whatsapp"
      },
      { 
        id: "m5", 
        content: "Thanks for the information!", 
        timestamp: "2 days ago, 4:10 PM", 
        sender: "customer",
        channel: "whatsapp"
      }
    ]
  },
  {
    id: "4",
    contact: {
      name: "Emily Davis",
      avatar: "/avatars/emily-davis.png",
      email: "emily.davis@example.com",
      phone: "+1 (555) 456-7890"
    },
    channel: "facebook",
    lastMessage: "I'll check out the new features. Thanks!",
    timestamp: "2 days ago",
    unread: false,
    tags: ["Feedback", "Feature Request"],
    assignedTo: "Michael Brown",
    history: [
      { 
        id: "m1", 
        content: "Hello, I have some suggestions for your app.", 
        timestamp: "3 days ago, 10:15 AM", 
        sender: "customer",
        channel: "facebook"
      },
      { 
        id: "m2", 
        content: "Hi Emily! We always appreciate feedback. Please share your suggestions, and I'll make sure they're passed along to our product team.", 
        timestamp: "3 days ago, 10:30 AM", 
        sender: "agent",
        channel: "facebook"
      },
      { 
        id: "m3", 
        content: "I think it would be great if you could add a dark mode and improve the search functionality.", 
        timestamp: "3 days ago, 10:45 AM", 
        sender: "customer",
        channel: "facebook"
      },
      { 
        id: "m4", 
        content: "Those are excellent suggestions! I've noted them and will share them with our development team. Actually, we're already working on a dark mode feature that should be released in our next update.", 
        timestamp: "3 days ago, 11:00 AM", 
        sender: "agent",
        channel: "facebook"
      },
      { 
        id: "m5", 
        content: "I'll check out the new features. Thanks!", 
        timestamp: "3 days ago, 11:15 AM", 
        sender: "customer",
        channel: "facebook"
      }
    ]
  },
  {
    id: "5",
    contact: {
      name: "David Wilson",
      avatar: "/avatars/david-wilson.png",
      email: "david.wilson@example.com",
      phone: "+1 (555) 567-8901"
    },
    channel: "sms",
    lastMessage: "Can you send me a link to reset my password?",
    timestamp: "3 days ago",
    unread: true,
    tags: ["Support", "Account Issue"],
    assignedTo: null,
    history: [
      { 
        id: "m1", 
        content: "Hi, I can't log in to my account", 
        timestamp: "4 days ago, 9:00 AM", 
        sender: "customer",
        channel: "sms"
      },
      { 
        id: "m2", 
        content: "Hello David, I'm sorry to hear you're having trouble logging in. Have you tried resetting your password?", 
        timestamp: "4 days ago, 9:05 AM", 
        sender: "agent",
        channel: "sms"
      },
      { 
        id: "m3", 
        content: "Yes, but I didn't receive any reset email", 
        timestamp: "4 days ago, 9:15 AM", 
        sender: "customer",
        channel: "sms"
      },
      { 
        id: "m4", 
        content: "Let me help you with that. Please confirm the email address associated with your account so I can check if there are any issues.", 
        timestamp: "4 days ago, 9:20 AM", 
        sender: "agent",
        channel: "sms"
      },
      { 
        id: "m5", 
        content: "david.wilson@example.com", 
        timestamp: "4 days ago, 9:25 AM", 
        sender: "customer",
        channel: "sms"
      },
      { 
        id: "m6", 
        content: "Can you send me a link to reset my password?", 
        timestamp: "3 days ago, 10:30 AM", 
        sender: "customer",
        channel: "sms"
      }
    ]
  }
];

// Helper function to get channel icon
function getChannelIcon(channel: string | undefined | null) {
  if (!channel || typeof channel !== 'string' || channel.trim() === '') {
    return <MessageSquare className="h-4 w-4" />; // Default icon for invalid channel
  }
  switch (channel.toLowerCase()) {
    case 'email': return <Mail className="h-4 w-4" />;
    case 'web': return <Globe className="h-4 w-4" />;
    case 'chat': return <MessageCircle className="h-4 w-4" />;
    case 'whatsapp': return <MessageSquare className="h-4 w-4" />;
    case 'facebook': return <Facebook className="h-4 w-4" />;
    case 'sms': return <Phone className="h-4 w-4" />;
    default: return <MessageSquare className="h-4 w-4" />;
  }
}

// Helper function to format contact info based on channel
function getContactInfo(contact: any, channel: string) {
  switch (channel.toLowerCase()) {
    case 'email': return contact.email;
    case 'sms': 
    case 'whatsapp': return contact.phone;
    case 'facebook': return '@' + contact.name.toLowerCase().replace(' ', '.');
    case 'web': 
    case 'chat': return 'Web Visitor';
    default: return contact.name;
  }
}

export default function ConversationsPage() {
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState<any[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch conversations from API
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Import the API client
        const api = (await import('@/lib/api')).default;
        
        const response = await api.listConversations();
        
        if (response.success) {
          setConversations(response.data || []);
        } else {
          setError(response.message || 'Failed to load conversations');
          // Fall back to mock data in development for testing
          if (process.env.NODE_ENV === 'development') {
            setConversations(mockConversations);
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load conversations');
        // Fall back to mock data in development for testing
        if (process.env.NODE_ENV === 'development') {
          setConversations(mockConversations);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchConversations();
  }, []);
  
  // Filter conversations based on search and active filter
  useEffect(() => {
    let result = conversations;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(conv => {
        const contactName = conv.contact_info?.name || '';
        return contactName.toLowerCase().includes(query) || 
          (conv.last_message || '').toLowerCase().includes(query) ||
          (conv.tags && conv.tags.some((tag: string) => tag.toLowerCase().includes(query)));
      });
    }
    
    // Apply status filter
    if (activeFilter !== "all") {
      if (activeFilter === "unread") {
        result = result.filter(conv => conv.is_unread);
      } else if (activeFilter === "active") {
        result = result.filter(conv => conv.status === 'active');
      } else if (activeFilter === "archived") {
        result = result.filter(conv => conv.status === 'archived');
      } else if (activeFilter === "closed") {
        result = result.filter(conv => conv.status === 'closed');
      } else {
        // Filter by channel type
        result = result.filter(conv => conv.channel_type === activeFilter);
      }
    }
    
    setFilteredConversations(result);
  }, [searchQuery, activeFilter, conversations]);

  // Set initial selected conversation
  useEffect(() => {
    if (filteredConversations.length > 0 && !selectedConversation) {
      setSelectedConversation(filteredConversations[0]);
    }
  }, [filteredConversations]);

  // Animation variants
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent pb-1">Conversations</h1>
          <p className="text-muted-foreground">Manage and respond to customer conversations across all channels</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1.5 border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/30"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button 
            size="sm" 
            className="gap-1.5 bg-gradient-to-r from-primary/90 to-indigo-600/90 text-primary-foreground shadow-md hover:shadow-lg" 
            asChild
          >
            <Link href="/dashboard/conversations/new">
              <Plus className="h-4 w-4" />
              New Conversation
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-md flex flex-1 overflow-hidden">
        {/* Conversation List */}
        <div className="w-1/3 border-r flex flex-col">
          <div className="p-4 border-b space-y-3 bg-gradient-to-r from-card/90 via-card/80 to-card/90">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-9 bg-background/70 focus-visible:bg-background border-muted focus-visible:ring-1 focus-visible:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <Button 
                variant={activeFilter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={activeFilter === "unread" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter("unread")}
              >
                Unread
              </Button>
              <Button 
                variant={activeFilter === "email" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter("email")}
              >
                <Mail className="h-3 w-3 mr-1" /> Email
              </Button>
              <Button 
                variant={activeFilter === "web" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter("web")}
              >
                <Globe className="h-3 w-3 mr-1" /> Web
              </Button>
              <Button 
                variant={activeFilter === "facebook" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter("facebook")}
              >
                <Facebook className="h-3 w-3 mr-1" /> Facebook
              </Button>
              <Button 
                variant={activeFilter === "whatsapp" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter("whatsapp")}
              >
                <MessageSquare className="h-3 w-3 mr-1" /> WhatsApp
              </Button>
              <Button 
                variant={activeFilter === "sms" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter("sms")}
              >
                <Phone className="h-3 w-3 mr-1" /> SMS
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-primary/40 border-t-primary rounded-full mx-auto mb-4 shadow-md"></div>
                  <p className="text-muted-foreground">Loading conversations...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                  <p>{error}</p>
                  <Button onClick={() => window.location.reload()} variant="outline" size="sm" className="mt-4">
                    <RefreshCw className="h-4 w-4 mr-2" /> Try Again
                  </Button>
                </div>
              ) : filteredConversations.map((conversation, index) => {
                // Ensure we always have a valid, non-empty key
                const conversationKey = conversation.id ? `conversation-${conversation.id}` : `conversation-index-${index}`;
                
                return (
                <motion.div 
                  key={conversationKey}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={listItemVariants}
                  className={`p-4 border-b cursor-pointer transition-all duration-200 ${
                    selectedConversation?.id === conversation.id ? 'bg-gradient-to-r from-primary/10 to-primary/5 border-primary/10 shadow-sm' : 'hover:bg-accent/50'
                  } ${conversation.unread ? 'border-l-4 border-l-primary' : ''}`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-card/90 via-card/80 to-card/90 shadow-sm">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-indigo-600/10 border border-primary/5 flex items-center justify-center mr-3 shadow-sm">
                        {conversation.contact && conversation.contact.name ? 
                          conversation.contact.name.charAt(0) : '?'}
                      </div>
                      <div>
                        <div className="font-medium">
                          {conversation.contact && conversation.contact.name ? 
                            conversation.contact.name : 'Unknown Contact'}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Badge variant="outline" className="text-xs h-5 px-1.5 py-0 border-primary/10 bg-primary/5 text-primary/80 hover:bg-primary/10 capitalize">
                            {conversation.channel || 'chat'}
                          </Badge>
                          <span>
                            {conversation.contact ? 
                              getContactInfo(conversation.contact, conversation.channel || 'chat') : 
                              'No contact info'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10 hover:text-primary">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10 hover:text-primary">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10 hover:text-primary">
                        <User className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10 hover:text-primary">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm line-clamp-2">{conversation.lastMessage || 'New conversation'}</div>
                  <div className="flex mt-2 gap-1.5">
                    {conversation.tags && Array.isArray(conversation.tags) && conversation.tags.map((tag: string, i: number) => {
                      // Ensure each tag has a unique key
                      const tagKey = `tag-${conversation.id || index}-${i}-${tag.replace(/\s/g, '_')}`;
                      return (
                        <Badge key={tagKey} variant="outline" className="text-xs px-1 py-0">
                          {tag}
                        </Badge>
                      );
                    })}
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      {conversation.status || 'active'}
                    </Badge>
                  </div>
                </motion.div>
              );
              })}
              {filteredConversations.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No conversations found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Conversation Detail */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-card/90 via-card/80 to-card/90 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/10 to-indigo-600/10 border border-primary/5 flex items-center justify-center overflow-hidden shadow-sm">
                    {getChannelIcon(selectedConversation.channel)}
                  </div>
                  <div>
                    <h2 className="font-medium">{selectedConversation.contact.name}</h2>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Badge variant="outline" className="text-xs h-5 px-1.5 py-0 border-primary/10 bg-primary/5 text-primary/80 hover:bg-primary/10 capitalize">
                        {selectedConversation.channel}
                      </Badge>
                      <span>{getContactInfo(selectedConversation.contact, selectedConversation.channel)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.history && Array.isArray(selectedConversation.history) ? (
                  selectedConversation.history.map((message: any, index: number) => {
                    // Generate a reliably unique key for each message
                    const messageKey = message.id ? `msg-${message.id}` : `msg-${selectedConversation.id}-${index}`;
                    
                    return (
                    <div 
                      key={messageKey} 
                      className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'agent' 
                            ? 'bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground shadow-md' 
                            : 'bg-muted/80 shadow-sm'
                        }`}
                      >
                        <div className="text-sm">{message.content || 'No content'}</div>
                        <div className="text-xs mt-1 flex items-center gap-1 opacity-80">
                          {message.timestamp || new Date().toLocaleTimeString()}
                          {message.sender === 'agent' && <Check className="h-3 w-3" />}
                          <span className="ml-1 flex items-center text-[10px] uppercase font-medium">
                            {getChannelIcon(message.channel || 'chat')}
                            <span className="ml-0.5">{message.channel || 'chat'}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                  })
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No messages found</p>
                    <p className="text-sm">Start the conversation by typing below</p>
                  </div>
                )}
              </div>
              
              <div className="mt-auto p-4 border-t bg-gradient-to-r from-background/90 to-background/80">
                <div className="relative">
                  <Input 
                    placeholder="Type your message..."
                    className="pr-24 bg-background/80 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/20 border-muted"
                  />
                  <div className="absolute right-1 top-1 flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-indigo-600 text-white hover:shadow-md">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-1">No conversation selected</h3>
              <p className="text-muted-foreground max-w-sm">
                Select a conversation from the list or start a new conversation
              </p>
            </div>
          )}
        </div>
        
        {/* Customer Details Sidebar */}
        {selectedConversation && (
          <div className="w-1/4 border-l flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-medium">Customer Details</h3>
            </div>
            
            <div className="p-4 overflow-y-auto flex-1">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  {selectedConversation.contact.name.charAt(0)}
                </div>
                <h3 className="font-medium">{selectedConversation.contact.name}</h3>
                <p className="text-sm text-muted-foreground">{getContactInfo(selectedConversation.contact, selectedConversation.channel)}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{selectedConversation.contact.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{selectedConversation.contact.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Conversation</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Channel</span>
                      <span className="font-medium flex items-center">
                        {getChannelIcon(selectedConversation.channel)}
                        <span className="ml-1 capitalize">{selectedConversation.channel}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">First Contact</span>
                      <span className="font-medium">{selectedConversation.history[0].timestamp.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Messages</span>
                      <span className="font-medium">{selectedConversation.history.length}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedConversation.tags && Array.isArray(selectedConversation.tags) && selectedConversation.tags.map((tag: string, i: number) => {
                      // Ensure each tag in sidebar has a unique key
                      const sidebarTagKey = `sidebar-tag-${selectedConversation.id || 'selected'}-${i}-${tag.replace(/\s/g, '_')}`;
                      return (
                        <Badge key={sidebarTagKey} variant="outline">
                          {tag}
                        </Badge>
                      );
                    })}
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Assignment</h4>
                  <Select defaultValue={selectedConversation.assignedTo || "unassigned"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign to..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      <SelectItem value="John Doe">John Doe</SelectItem>
                      <SelectItem value="Sarah Williams">Sarah Williams</SelectItem>
                      <SelectItem value="Michael Brown">Michael Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Notes</h4>
                  <textarea
                    className="w-full p-2 rounded-md border text-sm min-h-[80px]"
                    placeholder="Add notes about this customer..."
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t">
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                View Customer Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
