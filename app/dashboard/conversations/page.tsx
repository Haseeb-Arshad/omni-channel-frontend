"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Clock, Star, CheckCircle2, MessageCircle, Plus } from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { SearchAndFilters, defaultFilterOptions, defaultChannelOptions } from "@/components/conversations/search-and-filters";
import { ConversationList } from "@/components/conversations/conversation-list";
import { ConversationHeader } from "@/components/conversations/conversation-header";
import { MessageBubble } from "@/components/conversations/message-bubble";
import { MessageComposer } from "@/components/conversations/message-composer";

// Mock data for conversations
const mockConversations = [
  {
    id: "1",
    contact: {
      name: "Sarah Jenkins",
      avatar: "/avatars/sarah.jpg",
      email: "sarah.jenkins@example.com",
      phone: "+1 (555) 123-4567",
      tags: ["VIP", "Premium Customer"],
      lastSeen: "2 minutes ago"
    },
    channel: "whatsapp",
    lastMessage: "I need help with my recent order, it hasn't arrived yet",
    timestamp: "5m ago",
    unread: 3,
    status: "pending",
    assignedTo: "You",
    priority: "high",
    history: [
      {
        id: "m1",
        content: "Hi, I ordered a laptop last week (Order #LP-2024-001) and it still hasn't arrived. The tracking shows it's been stuck in transit for 3 days.",
        timestamp: "10:30 AM",
        sender: "customer",
        type: "text"
      },
      {
        id: "m2",
        content: "Hi Sarah! I'm sorry to hear about the delay with your order. Let me check the status right away and see what's causing the hold-up.",
        timestamp: "10:32 AM",
        sender: "agent",
        type: "text"
      },
      {
        id: "m3",
        content: "I've contacted our shipping partner and they've confirmed there was a delay at the distribution center. Your order is now priority shipped and should arrive tomorrow by 2 PM. I've also applied a 15% discount to your next order as an apology.",
        timestamp: "10:35 AM",
        sender: "agent",
        type: "text"
      },
      {
        id: "m4",
        content: "Thank you for checking! That's great customer service. Will I get a tracking update?",
        timestamp: "10:37 AM",
        sender: "customer",
        type: "text"
      },
      {
        id: "m5",
        content: "I need help with my recent order, it hasn't arrived yet",
        timestamp: "10:42 AM",
        sender: "customer",
        type: "text"
      }
    ]
  },
  {
    id: "2",
    contact: {
      name: "+1-555-987-6543",
      avatar: null,
      phone: "+1 (555) 987-6543",
      tags: ["New Customer"],
      lastSeen: "15 minutes ago"
    },
    channel: "sms",
    lastMessage: "What are your business hours?",
    timestamp: "15m ago",
    unread: 1,
    status: "unassigned",
    assignedTo: null,
    priority: "medium",
    history: [
      {
        id: "m1",
        content: "Hi, what are your business hours? I need to visit your store.",
        timestamp: "2:15 PM",
        sender: "customer",
        type: "text"
      }
    ]
  },
  {
    id: "3",
    contact: {
      name: "Mike Chen",
      avatar: "/avatars/mike.jpg",
      email: "mike.chen@techcorp.com",
      phone: "+1 (555) 456-7890",
      tags: ["Enterprise", "Technical"],
      lastSeen: "1 hour ago"
    },
    channel: "voice",
    lastMessage: "Voice Call - 08:32 duration",
    timestamp: "1h ago",
    unread: 0,
    status: "resolved",
    assignedTo: "Technical Team",
    priority: "high",
    history: [
      {
        id: "m1",
        content: "Voice call regarding API integration issues",
        timestamp: "1:00 PM",
        sender: "customer",
        type: "voice",
        duration: "08:32",
        transcript: "Hi, I'm having trouble with the API integration. The authentication keeps failing...",
        audioUrl: "/audio/call-123.mp3"
      },
      {
        id: "m2",
        content: "I've sent you the updated API documentation and a sample integration. The issue was with the OAuth flow configuration.",
        timestamp: "1:15 PM",
        sender: "agent",
        type: "text"
      }
    ]
  }
];

// Stats for conversation overview
const conversationStats = [
  {
    title: 'Active Conversations',
    value: '47',
    change: '+12%',
    trend: 'up' as const,
    icon: MessageCircle,
    gradient: 'from-blue-500 to-blue-600',
    delay: 0
  },
  {
    title: 'Response Time',
    value: '2.3m',
    change: '-18%',
    trend: 'up' as const,
    icon: Clock,
    gradient: 'from-green-500 to-green-600',
    delay: 0.1
  },
  {
    title: 'Resolution Rate',
    value: '94.2%',
    change: '+5%',
    trend: 'up' as const,
    icon: CheckCircle2,
    gradient: 'from-purple-500 to-purple-600',
    delay: 0.2
  },
  {
    title: 'Customer Satisfaction',
    value: '4.8',
    change: '+0.3',
    trend: 'up' as const,
    icon: Star,
    gradient: 'from-orange-500 to-orange-600',
    delay: 0.3
  }
];

export default function ConversationsPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["all"]);
  const [selectedChannel, setSelectedChannel] = useState("all");

  // Create filter options with dynamic counts
  const filterOptions = defaultFilterOptions.map(option => ({
    ...option,
    count: option.value === "all" ? mockConversations.length :
      option.value === "unread" ? mockConversations.filter(c => c.unread > 0).length :
        option.value === "assigned" ? mockConversations.filter(c => c.assignedTo === "You").length :
          option.value === "unassigned" ? mockConversations.filter(c => !c.assignedTo).length :
            option.value === "high_priority" ? mockConversations.filter(c => c.priority === "high").length :
              option.value === "resolved" ? mockConversations.filter(c => c.status === "resolved").length : 0
  }));

  // Enhanced filtering logic
  const filteredConversations = mockConversations.filter(conv => {
    // Search query matching
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery.trim() ||
      conv.contact.name.toLowerCase().includes(searchLower) ||
      conv.lastMessage.toLowerCase().includes(searchLower) ||
      conv.contact.email?.toLowerCase().includes(searchLower) ||
      conv.contact.phone?.toLowerCase().includes(searchLower) ||
      conv.contact.tags?.some(tag => tag.toLowerCase().includes(searchLower));

    // Channel filtering
    const matchesChannel = selectedChannel === "all" || conv.channel === selectedChannel;

    // Status/priority filtering
    const matchesFilters = activeFilters.includes("all") || activeFilters.some(filter => {
      switch (filter) {
        case "unread": return conv.unread > 0;
        case "assigned": return conv.assignedTo === "You";
        case "unassigned": return !conv.assignedTo;
        case "high_priority": return conv.priority === "high";
        case "resolved": return conv.status === "resolved";
        default: return true;
      }
    });

    return matchesSearch && matchesChannel && matchesFilters;
  });

  const handleSendMessage = (message: string, isInternalNote: boolean) => {
    console.log('Sending message:', message, 'Internal note:', isInternalNote);
    // In a real app, this would be an API call
  };

  const handleResolve = () => {
    console.log('Resolving conversation:', selectedConversation.id);
  };

  const handleTransfer = () => {
    console.log('Transferring conversation:', selectedConversation.id);
  };

  const handleMoreActions = () => {
    console.log('More actions for conversation:', selectedConversation.id);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <PageHeader
        title="Customer Conversations"
        subtitle="Manage customer interactions, track response times, and maintain high satisfaction scores."
      />

      {/* AI Notification Banner */}
      <motion.div
        className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="font-medium text-gray-900">AI Assistant is actively helping.</span>
            <span className="text-gray-600 ml-1">3 conversations are being handled automatically with 98% accuracy</span>
          </div>
        </div>
        <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
          View AI Activity
        </button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {conversationStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </motion.div>

      {/* Main Conversation Interface */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg shadow-black/5 border border-white/20 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="h-[calc(100vh-20rem)] flex">
          {/* Left Panel - Conversation List */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Active Chats</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1 inline" />
                  New
                </motion.button>
              </div>

              {/* Search and Filters */}
              <SearchAndFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeFilters={activeFilters}
                onFiltersChange={setActiveFilters}
                selectedChannel={selectedChannel}
                onChannelChange={setSelectedChannel}
                filterOptions={filterOptions}
                channelOptions={defaultChannelOptions}
              />
            </div>

            {/* Conversation List */}
            <ConversationList
              conversations={filteredConversations}
              selectedConversation={selectedConversation}
              onConversationSelect={setSelectedConversation}
              searchQuery={searchQuery}
              activeFilters={activeFilters}
              onClearSearch={() => setSearchQuery("")}
              onClearFilters={() => setActiveFilters(["all"])}
              onStartNewConversation={() => console.log("Start new conversation")}
              onConnectChannels={() => console.log("Connect channels")}
            />
          </div>

          {/* Center Panel - Live Conversation */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Header */}
                <ConversationHeader
                  conversation={selectedConversation}
                  onResolve={handleResolve}
                  onTransfer={handleTransfer}
                  onMoreActions={handleMoreActions}
                />

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/30 to-white">
                  {selectedConversation.history.map((message: any) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      isAgent={message.sender === 'agent'}
                    />
                  ))}
                </div>

                {/* Message Composer */}
                <MessageComposer
                  onSendMessage={handleSendMessage}
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the list to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}