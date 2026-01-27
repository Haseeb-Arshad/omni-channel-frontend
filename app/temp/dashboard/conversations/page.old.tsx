"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Filter, MoreHorizontal, Send, Paperclip, 
  Smile, ChevronRight, Clock, Tag, User, AlertCircle,
  MessageSquare, Check, X, RefreshCw, Phone, Video,
  Mail, MessageCircle, Facebook, Globe, Info, FileText,
  AtSign
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
function getChannelIcon(channel: string) {
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
  const [filteredConversations, setFilteredConversations] = useState(mockConversations);
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter conversations based on search and active filter
  useEffect(() => {
    let result = mockConversations;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(conv => 
        conv.contact.name.toLowerCase().includes(query) || 
        conv.lastMessage.toLowerCase().includes(query) ||
        (conv.tags && conv.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    // Apply status filter
    if (activeFilter !== "all") {
      if (activeFilter === "unread") {
        result = result.filter(conv => conv.unread);
      } else if (activeFilter === "assigned") {
        result = result.filter(conv => conv.assignedTo);
      } else if (activeFilter === "unassigned") {
        result = result.filter(conv => !conv.assignedTo);
      } else {
        // Filter by channel
        result = result.filter(conv => conv.channel === activeFilter);
      }
    }
    
    setFilteredConversations(result);
  }, [searchQuery, activeFilter]);

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
          <h1 className="text-2xl font-bold">Conversations</h1>
          <p className="text-muted-foreground">Manage and respond to customer conversations across all channels</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm" className="gap-1">
            <MessageSquare className="h-4 w-4" />
            New Conversation
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-sm flex flex-1 overflow-hidden">
        {/* Conversation List */}
        <div className="w-1/3 border-r flex flex-col">
          <div className="p-3 border-b space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
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
              {filteredConversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-3 border-b cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedConversation?.id === conversation.id ? 'bg-muted' : ''
                  } ${conversation.unread ? 'border-l-4 border-l-primary' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        {conversation.contact.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium flex items-center">
                          {conversation.contact.name}
                          {conversation.unread && (
                            <span className="ml-2 w-2 h-2 rounded-full bg-primary"></span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          {getChannelIcon(conversation.channel)}
                          <span className="ml-1">{getContactInfo(conversation.contact, conversation.channel)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{conversation.timestamp}</div>
                  </div>
                  <div className="text-sm line-clamp-2">{conversation.lastMessage}</div>
                  <div className="flex mt-2 gap-1.5">
                    {conversation.tags && conversation.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs px-1 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
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
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    {selectedConversation.contact.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{selectedConversation.contact.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      {getChannelIcon(selectedConversation.channel)}
                      <span className="ml-1.5 capitalize">{selectedConversation.channel}</span>
                      <span className="mx-1.5">•</span>
                      <span>{getContactInfo(selectedConversation.contact, selectedConversation.channel)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <User className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.history.map((message: any) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'agent' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div className="text-xs mt-1 flex items-center gap-1 opacity-80">
                        {message.timestamp}
                        {message.sender === 'agent' && <Check className="h-3 w-3" />}
                        <span className="ml-1 flex items-center text-[10px] uppercase font-medium">
                          {getChannelIcon(message.channel)}
                          <span className="ml-0.5">{message.channel}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <textarea
                      className="w-full p-3 pr-10 rounded-lg border focus:border-primary focus:ring-1 focus:ring-primary min-h-[80px] resize-none"
                      placeholder="Type your message..."
                    />
                    <div className="absolute right-3 bottom-3">
                      <Button size="icon" variant="ghost">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button>
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
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
                    {selectedConversation.tags && selectedConversation.tags.map((tag: string, i: number) => (
                      <Badge key={i} variant="outline">
                        {tag}
                      </Badge>
                    ))}
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
