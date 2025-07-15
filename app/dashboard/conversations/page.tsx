"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  Search, Filter, MoreHorizontal, Send, Paperclip,
  Smile, ChevronRight, Clock, Tag, User, AlertCircle,
  MessageSquare, Check, X, RefreshCw, Phone, Video,
  Mail, MessageCircle, Facebook, Globe, Info, FileText,
  AtSign, Plus, ArrowUpRight, Settings, ChevronDown,
  Loader2, ArrowRight, ChevronLeft, MessageSquareDashed
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Custom Dashboard Components
import {
  DashboardSection,
  ConversationCard
} from "@/components/ui/dashboard";

// Animations
import { useAnimations } from "@/hooks/use-animations";

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

  // Animation setup
  const { initAnimations } = useAnimations();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  useEffect(() => {
    if (containerRef.current && isInView) {
      initAnimations();
    }
  }, [isInView, initAnimations]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        ease: [0.22, 1, 0.36, 1],
        duration: 0.5
      }
    }
  };

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
    <motion.div
      ref={containerRef}
      className="flex flex-col h-[calc(100vh-4rem)] gap-6 pb-6"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      data-scroll-section
    >
      {/* Header Section */}
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-baseline justify-between">
          <div>
            <motion.h1
              className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Conversations 💬
            </motion.h1>
            <motion.p
              className="text-slate-600 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Manage and respond to customer conversations across all channels
            </motion.p>
          </div>
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 shadow-lg shadow-black/5 rounded-2xl"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl"
                asChild
              >
                <Link href="/dashboard/conversations/new">
                  <Plus className="h-4 w-4" />
                  New Conversation
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/5 flex flex-1 overflow-hidden">
        {/* Conversation List */}
        <div className="w-1/3 border-r border-primary/10 flex flex-col">
          <div className="p-4 border-b border-primary/10 space-y-3 bg-gradient-to-r from-card/95 via-card/90 to-card/95">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                className="pl-9 bg-background/80 focus-visible:bg-background border-primary/10 focus-visible:ring-1 focus-visible:ring-primary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                size="sm"
                className={activeFilter === "all" ? "bg-primary text-white" : "border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/30"}
                onClick={() => setActiveFilter("all")}
              >
                All
              </Button>
              <Button
                variant={activeFilter === "unread" ? "default" : "outline"}
                size="sm"
                className={activeFilter === "unread" ? "bg-primary text-white" : "border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/30"}
                onClick={() => setActiveFilter("unread")}
              >
                Unread
              </Button>
              <Button
                variant={activeFilter === "email" ? "default" : "outline"}
                size="sm"
                className={activeFilter === "email" ? "bg-primary text-white" : "border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/30"}
                onClick={() => setActiveFilter("email")}
              >
                <Mail className="h-3 w-3 mr-1" /> Email
              </Button>
              <Button
                variant={activeFilter === "web" ? "default" : "outline"}
                size="sm"
                className={activeFilter === "web" ? "bg-primary text-white" : "border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/30"}
                onClick={() => setActiveFilter("web")}
              >
                <Globe className="h-3 w-3 mr-1" /> Web
              </Button>
              <Button
                variant={activeFilter === "facebook" ? "default" : "outline"}
                size="sm"
                className={activeFilter === "facebook" ? "bg-primary text-white" : "border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/30"}
                onClick={() => setActiveFilter("facebook")}
              >
                <Facebook className="h-3 w-3 mr-1" /> Facebook
              </Button>
              <Button
                variant={activeFilter === "whatsapp" ? "default" : "outline"}
                size="sm"
                className={activeFilter === "whatsapp" ? "bg-primary text-white" : "border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/30"}
                onClick={() => setActiveFilter("whatsapp")}
              >
                <MessageSquare className="h-3 w-3 mr-1" /> WhatsApp
              </Button>
              <Button
                variant={activeFilter === "sms" ? "default" : "outline"}
                size="sm"
                className={activeFilter === "sms" ? "bg-primary text-white" : "border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/30"}
                onClick={() => setActiveFilter("sms")}
              >
                <Phone className="h-3 w-3 mr-1" /> SMS
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-primary/5">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full p-6">
                <div className="animate-spin mb-2">
                  <Loader2 className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Loading conversations...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full p-6">
                <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                <h3 className="font-medium mb-1">Failed to load conversations</h3>
                <p className="text-sm text-muted-foreground text-center">{error}</p>
                <Button variant="outline" size="sm" className="mt-4 gap-1.5">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Try Again
                </Button>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6">
                <MessageSquareDashed className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="font-medium mb-1">No conversations found</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {searchQuery ? `No results for "${searchQuery}"` : "Try different filters or start a conversation"}
                </p>
                <Button className="mt-4 gap-1.5 bg-gradient-to-r from-primary to-primary/80 text-white" asChild>
                  <Link href="/dashboard/conversations/new">
                    <Plus className="h-3.5 w-3.5" />
                    New Conversation
                  </Link>
                </Button>
              </div>
            ) : (
              <AnimatePresence>
                {filteredConversations.map((conversation, index) => (
                  <div
                    key={conversation.id || `conversation-${index}`}
                    className={selectedConversation?.id === conversation.id ? 'bg-primary/5 border-l-2 border-primary' : ''}
                  >
                    <ConversationCard
                      id={conversation.id}
                      contact={{ name: conversation.contact?.name || 'Unknown' }}
                      message={conversation.lastMessage || ''}
                      time={conversation.timestamp || ''}
                      channel={conversation.channel || 'chat'}
                      channelName={conversation.channel || 'Chat'}
                      unread={conversation.unread || false}
                      index={index}
                      onClick={() => setSelectedConversation(conversation)}
                    />
                  </div>
                ))}
              </AnimatePresence>
            )}
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
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={`max-w-[80%] p-3 rounded-lg ${message.sender === 'agent'
                            ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md rounded-tr-none'
                            : 'bg-accent/80 backdrop-blur-[1px] shadow-sm rounded-tl-none'
                            }`}
                        >
                          <div className="text-sm">{message.content || 'No content'}</div>
                          <div className="text-xs mt-1.5 flex items-center gap-1.5 opacity-80">
                            <Badge
                              variant="outline"
                              className={`h-4 px-1 py-0 text-[10px] font-normal ${message.sender === 'agent'
                                ? 'border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground/90'
                                : 'border-foreground/10 bg-foreground/5 text-foreground/70'
                                }`}
                            >
                              {message.channel || 'chat'}
                            </Badge>
                            <span>{message.timestamp || new Date().toLocaleTimeString()}</span>
                            {message.sender === 'agent' && <Check className="h-3 w-3" />}
                          </div>
                        </motion.div>
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

              <div className="mt-auto p-4 border-t border-primary/10 bg-gradient-to-r from-card/95 to-card/90">
                <div className="relative rounded-lg overflow-hidden shadow-sm border border-primary/10">
                  <Input
                    placeholder="Type your message..."
                    className="pr-24 bg-background/80 backdrop-blur-[1px] focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/30 border-transparent"
                  />
                  <div className="absolute right-1 top-1 flex items-center gap-1.5">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-200">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-200">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary/90 text-white shadow-sm hover:shadow-md transition-all duration-200">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-full mb-4 shadow-sm">
                <MessageSquareDashed className="h-12 w-12 text-primary/60" />
              </div>
              <h3 className="text-xl font-medium mb-2">No conversation selected</h3>
              <p className="text-muted-foreground max-w-sm mb-6">
                Select a conversation from the list or start a new one to begin messaging
              </p>
              <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 text-white shadow-sm hover:shadow-md transition-all duration-200" asChild>
                <Link href="/dashboard/conversations/new">
                  <Plus className="h-4 w-4" />
                  New Conversation
                </Link>
              </Button>
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
    </motion.div>
  );
}
