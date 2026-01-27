"use client";

import { useState, useEffect, useCallback } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Conversation, Message } from "@/types/conversation";
import { ConversationList } from "@/components/conversations/conversation-list";
import { ConversationView } from "@/components/conversations/conversation-view";
import { CustomerDetails } from "@/components/conversations/customer-details";
import { ConversationFilters } from "@/components/conversations/conversation-filters";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, RefreshCw } from "lucide-react";
import { mockConversations } from "@/lib/mock-conversations";

export default function ConversationsPage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showCustomerDetails, setShowCustomerDetails] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setConversations(mockConversations);
        
        // Set the first conversation as selected by default on desktop
        if (mockConversations.length > 0 && isDesktop) {
          setSelectedConversation(mockConversations[0]);
        }
      } catch (error) {
        console.error("Failed to load conversations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, [isDesktop]);

  // Filter conversations based on search and active filter
  const filteredConversations = conversations.filter(conversation => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        conversation.contact.name.toLowerCase().includes(query) ||
        conversation.lastMessage.toLowerCase().includes(query) ||
        conversation.tags?.some(tag => tag.toLowerCase().includes(query));
      
      if (!matchesSearch) return false;
    }

    // Apply status filter
    if (activeFilter === "unread") {
      return conversation.unread;
    } else if (activeFilter === "assigned") {
      return !!conversation.assignedTo;
    } else if (activeFilter === "unassigned") {
      return !conversation.assignedTo;
    } else if (activeFilter !== "all") {
      return conversation.channel === activeFilter;
    }

    return true;
  });

  // Handle sending a new message
  const handleSendMessage = useCallback((message: string) => {
    if (!selectedConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content: message,
      timestamp: new Date().toISOString(),
      sender: "agent",
      channel: selectedConversation.channel,
      status: "sent"
    };

    // Update the conversation with the new message
    const updatedConversation = {
      ...selectedConversation,
      lastMessage: message,
      timestamp: "Just now",
      history: [...selectedConversation.history, newMessage]
    };

    setSelectedConversation(updatedConversation);
    
    // Update the conversation in the list
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation.id ? updatedConversation : conv
      )
    );
  }, [selectedConversation]);

  // Handle refreshing conversations
  const handleRefresh = useCallback(() => {
    // TODO: Implement actual refresh logic
    console.log("Refreshing conversations...");
  }, []);

  // Handle starting a new conversation
  const handleNewConversation = useCallback(() => {
    // TODO: Implement new conversation logic
    console.log("Starting new conversation...");
  }, []);

  // Handle assigning a conversation to the current user
  const handleAssignToMe = useCallback(() => {
    if (!selectedConversation) return;
    
    const updatedConversation = {
      ...selectedConversation,
      assignedTo: "Me" // TODO: Replace with actual user
    };
    
    setSelectedConversation(updatedConversation);
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation.id ? updatedConversation : conv
      )
    );
  }, [selectedConversation]);

  // Toggle customer details panel
  const toggleCustomerDetails = useCallback(() => {
    setShowCustomerDetails(prev => !prev);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Chats</h1>
          <p className="text-xs text-gray-500">
            All conversations
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1 h-8 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button 
            size="sm" 
            className="gap-1 h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleNewConversation}
          >
            <MessageSquare className="h-3 w-3" />
            New
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 flex flex-1 overflow-hidden">
        {/* Conversation List */}
        <div className={`${isDesktop ? 'w-80' : selectedConversation ? 'hidden' : 'w-full'} border-r border-gray-200 flex flex-col bg-white`}>
          <ConversationFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onNewConversation={handleNewConversation}
            onRefresh={handleRefresh}
          />
          
          	<ConversationList
            	conversations={filteredConversations as any}
            	selectedConversation={selectedConversation as any}
            	onConversationSelect={setSelectedConversation as any}
            	searchQuery={searchQuery}
            	activeFilters={[activeFilter]}
            	onClearSearch={() => setSearchQuery("")}
            	onClearFilters={() => setActiveFilter("all")}
            	onStartNewConversation={handleNewConversation}
            	onConnectChannels={handleRefresh}
          	/>
        	</div>

          {/* Conversation View */}
        {selectedConversation && (
          <div className={`${isDesktop ? (showCustomerDetails ? 'flex-1' : 'flex-1') : 'w-full'} flex flex-col border-r border-gray-200 bg-white`}>
            <ConversationView
              conversation={selectedConversation}
              onSendMessage={handleSendMessage}
              onBack={!isDesktop ? () => setSelectedConversation(null) : undefined}
              onAssignToMe={handleAssignToMe}
              isMobile={!isDesktop}
            />
          </div>
        )}

        {/* Customer Details */}
        {isDesktop && selectedConversation && showCustomerDetails && (
          <div className="w-80 border-l border-gray-200 bg-white">
            <CustomerDetails
              conversation={selectedConversation}
              onClose={toggleCustomerDetails}
              onAssignToMe={handleAssignToMe}
            />
          </div>
        )}
      </div>
    </div>
  );
}
