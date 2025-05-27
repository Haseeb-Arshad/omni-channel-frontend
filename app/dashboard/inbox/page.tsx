"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Filter, MoreHorizontal, Send, Paperclip, 
  Smile, ChevronRight, Clock, Tag, User, AlertCircle,
  MessageSquare, Check, X, RefreshCw, Phone, Video
} from "lucide-react";

// Create basic components for the inbox page
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
    assignedTo: "John Doe"
  },
  {
    id: "2",
    contact: {
      name: "Alex Morgan",
      avatar: "/avatars/alex-morgan.png",
      email: "alex.morgan@example.com",
      phone: "+1 (555) 234-5678"
    },
    channel: "chat",
    lastMessage: "When will the new product be available?",
    timestamp: "Yesterday",
    unread: false,
    tags: ["Sales", "Product Inquiry"],
    assignedTo: null
  },
  {
    id: "3",
    contact: {
      name: "Robert Chen",
      avatar: "/avatars/robert-chen.png",
      email: "robert.chen@example.com",
      phone: "+1 (555) 345-6789"
    },
    channel: "sms",
    lastMessage: "Thanks for your help with my return!",
    timestamp: "Yesterday",
    unread: false,
    tags: ["Support", "Return"],
    assignedTo: "Jane Smith"
  },
  {
    id: "4",
    contact: {
      name: "Sarah Johnson",
      avatar: "/avatars/sarah-johnson.png",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 456-7890"
    },
    channel: "whatsapp",
    lastMessage: "Do you offer international shipping?",
    timestamp: "2 days ago",
    unread: true,
    tags: ["Sales", "Shipping"],
    assignedTo: null
  },
  {
    id: "5",
    contact: {
      name: "Michael Brown",
      avatar: "/avatars/michael-brown.png",
      email: "michael.brown@example.com",
      phone: "+1 (555) 567-8901"
    },
    channel: "email",
    lastMessage: "I'd like to schedule a demo of your enterprise plan",
    timestamp: "3 days ago",
    unread: false,
    tags: ["Sales", "Enterprise", "Demo"],
    assignedTo: "John Doe"
  }
];

const mockMessages = [
  {
    id: "1",
    conversationId: "1",
    sender: "customer",
    content: "Hello, I've been having issues with my recent order #12345. It's been a week and I still haven't received any shipping confirmation.",
    timestamp: "10:30 AM",
    read: true,
    attachments: []
  },
  {
    id: "2",
    conversationId: "1",
    sender: "agent",
    content: "Hi Jane, I'm sorry to hear about the delay. Let me check on the status of your order right away.",
    timestamp: "10:35 AM",
    read: true,
    attachments: []
  },
  {
    id: "3",
    conversationId: "1",
    sender: "ai",
    content: "I've checked the order status. It looks like there was a delay at our warehouse due to high volume. Your order has been processed and should ship within 24 hours.",
    timestamp: "10:38 AM",
    read: true,
    attachments: []
  },
  {
    id: "4",
    conversationId: "1",
    sender: "customer",
    content: "Thanks for checking. Can you send me the tracking number once it ships?",
    timestamp: "10:42 AM",
    read: false,
    attachments: []
  }
];

export default function InboxPage() {
  const [activeConversation, setActiveConversation] = useState(mockConversations[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState({
    channel: "all",
    status: "all",
    assignee: "all",
    tag: "all"
  });

  useEffect(() => {
    // Simulate loading messages for the active conversation
    const conversationMessages = mockMessages.filter(
      message => message.conversationId === activeConversation.id
    );
    setMessages(conversationMessages);
  }, [activeConversation]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: `new-${Date.now()}`,
      conversationId: activeConversation.id,
      sender: "agent",
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      attachments: []
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        id: `new-ai-${Date.now()}`,
        conversationId: activeConversation.id,
        sender: "ai",
        content: "I've noted your request and will send the tracking information as soon as it's available.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true,
        attachments: []
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  return (
    <motion.div 
      className="h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1 flex overflow-hidden">
        {/* Conversation List - Left Pane */}
        <div className="w-80 border-r flex flex-col bg-white overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
            
            {filterOpen && (
              <motion.div 
                className="mt-3 p-3 bg-muted rounded-lg grid grid-cols-2 gap-2 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Channel</label>
                  <select 
                    className="w-full p-1.5 rounded border bg-white"
                    value={currentFilter.channel}
                    onChange={(e) => setCurrentFilter({...currentFilter, channel: e.target.value})}
                  >
                    <option value="all">All Channels</option>
                    <option value="email">Email</option>
                    <option value="chat">Website Chat</option>
                    <option value="sms">SMS</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Status</label>
                  <select 
                    className="w-full p-1.5 rounded border bg-white"
                    value={currentFilter.status}
                    onChange={(e) => setCurrentFilter({...currentFilter, status: e.target.value})}
                  >
                    <option value="all">All Status</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Assignee</label>
                  <select 
                    className="w-full p-1.5 rounded border bg-white"
                    value={currentFilter.assignee}
                    onChange={(e) => setCurrentFilter({...currentFilter, assignee: e.target.value})}
                  >
                    <option value="all">All Assignees</option>
                    <option value="me">Assigned to Me</option>
                    <option value="unassigned">Unassigned</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Tag</label>
                  <select 
                    className="w-full p-1.5 rounded border bg-white"
                    value={currentFilter.tag}
                    onChange={(e) => setCurrentFilter({...currentFilter, tag: e.target.value})}
                  >
                    <option value="all">All Tags</option>
                    <option value="support">Support</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((conversation) => (
              <div 
                key={conversation.id}
                className={`px-4 py-3 border-b cursor-pointer transition-colors hover:bg-muted ${activeConversation.id === conversation.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mr-3 relative">
                    <span className="text-sm font-medium">{conversation.contact.name.split(' ').map(n => n[0]).join('')}</span>
                    {conversation.channel === 'email' && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                        <MessageSquare className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                    {conversation.channel === 'chat' && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <MessageSquare className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                    {conversation.channel === 'sms' && (
                      <div className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-1">
                        <Phone className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                    {conversation.channel === 'whatsapp' && (
                      <div className="absolute -bottom-1 -right-1 bg-green-600 rounded-full p-1">
                        <MessageSquare className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
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
            ))}
          </div>
        </div>
        
        {/* Message Thread - Center Pane */}
        <div className="flex-1 flex flex-col bg-white/60 overflow-hidden">
          {activeConversation ? (
            <>
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-sm font-medium">{activeConversation.contact.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{activeConversation.contact.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="flex items-center">
                        {activeConversation.channel === 'email' && 'Email'}
                        {activeConversation.channel === 'chat' && 'Website Chat'}
                        {activeConversation.channel === 'sms' && 'SMS'}
                        {activeConversation.channel === 'whatsapp' && 'WhatsApp'}
                      </span>
                      <span className="mx-1.5">•</span>
                      <span>{activeConversation.contact.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4 mr-1" />
                    Video
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex flex-col">
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
                ))}
              </div>
              
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex items-end">
                  <div className="flex-1 rounded-lg border bg-white p-2 flex flex-col">
                    <textarea
                      className="w-full resize-none focus:outline-none text-sm min-h-[60px]"
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      rows={2}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex space-x-1">
                        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <Smile className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                      <Button type="submit" size="sm" className="h-8 px-3">
                        <Send className="h-4 w-4 mr-1" /> Send
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col p-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">No conversation selected</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Select a conversation from the list to view messages and respond.
              </p>
            </div>
          )}
        </div>
        
        {/* Context Panel - Right Pane */}
        <div className="w-80 border-l flex flex-col bg-white overflow-hidden">
          {activeConversation ? (
            <>
              <div className="p-4 border-b">
                <h3 className="font-medium mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span className="text-sm font-medium">{activeConversation.contact.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{activeConversation.contact.name}</h4>
                      <p className="text-sm text-muted-foreground">Customer</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="text-sm">{activeConversation.contact.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Phone</p>
                    <p className="text-sm">{activeConversation.contact.phone}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-b">
                <h3 className="font-medium mb-3">Conversation Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">Status</p>
                    <div className="flex items-center">
                      <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                        Active
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">SLA</p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span>Response time</span>
                        <span className="font-medium text-amber-500">30m remaining</span>
                      </div>
                      <Progress value={60} className="h-1.5" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <p className="text-xs text-muted-foreground">Tags</p>
                      <Button variant="ghost" size="sm" className="h-5 text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        Add Tag
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeConversation.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="flex items-center gap-1">
                          {tag}
                          <button className="h-3 w-3 rounded-full bg-muted flex items-center justify-center">
                            <X className="h-2 w-2" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <p className="text-xs text-muted-foreground">Assigned To</p>
                      <Button variant="ghost" size="sm" className="h-5 text-xs">
                        <User className="h-3 w-3 mr-1" />
                        Assign
                      </Button>
                    </div>
                    {activeConversation.assignedTo ? (
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-2">
                          <span className="text-xs">{activeConversation.assignedTo.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <span className="text-sm">{activeConversation.assignedTo}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Unassigned</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-b">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">AI Insights</h3>
                  <Button variant="ghost" size="sm" className="h-7">
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Update
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <Card className="p-3">
                    <h4 className="text-xs font-medium flex items-center mb-1.5">
                      <AlertCircle className="h-3.5 w-3.5 text-amber-500 mr-1" />
                      Sentiment Analysis
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-xs font-medium ml-3 whitespace-nowrap">Neutral</span>
                    </div>
                  </Card>
                  
                  <Card className="p-3">
                    <h4 className="text-xs font-medium flex items-center mb-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-primary mr-1" />
                      Conversation Summary
                    </h4>
                    <p className="text-xs text-muted-foreground">Customer is inquiring about a delayed order #12345 and requesting tracking information once shipped.</p>
                  </Card>
                  
                  <Button className="w-full" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Suggested Replies
                  </Button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Internal Notes</h3>
                  <Button variant="ghost" size="sm" className="h-7">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
                
                <div className="rounded-lg border p-3 bg-muted/30">
                  <textarea
                    placeholder="Add an internal note..."
                    className="w-full bg-transparent resize-none focus:outline-none text-sm min-h-[60px]"
                    rows={3}
                  ></textarea>
                  <div className="flex justify-end">
                    <Button size="sm" className="mt-2">
                      Save Note
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <p className="text-muted-foreground text-center">
                Select a conversation to view contact details
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
