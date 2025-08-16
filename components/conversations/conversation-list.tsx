"use client";

import { AnimatePresence } from "framer-motion";
import { Search, Filter, MessageSquare, Plus } from "lucide-react";
import { ConversationCard } from "./conversation-card";
import { EmptyState } from "@/components/dashboard/empty-state";

interface Conversation {
  id: string;
  contact: {
    name: string;
    avatar?: string | null;
    email?: string;
    phone?: string;
    tags?: string[];
    lastSeen?: string;
  };
  channel: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: string;
  assignedTo?: string | null;
  priority: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation?: Conversation | null;
  onConversationSelect: (conversation: Conversation) => void;
  searchQuery: string;
  activeFilters: string[];
  onClearSearch: () => void;
  onClearFilters: () => void;
  onStartNewConversation: () => void;
  onConnectChannels: () => void;
}

export const ConversationList = ({
  conversations,
  selectedConversation,
  onConversationSelect,
  searchQuery,
  activeFilters,
  onClearSearch,
  onClearFilters,
  onStartNewConversation,
  onConnectChannels
}: ConversationListProps) => {
  const getEmptyStateProps = () => {
    if (searchQuery) {
      return {
        icon: Search,
        title: "No conversations found",
        description: `We couldn't find any conversations matching "${searchQuery}". Try adjusting your search terms.`,
        actions: [
          {
            label: "Clear Search",
            onClick: onClearSearch,
            variant: "default" as const
          }
        ]
      };
    }
    
    if (activeFilters.length > 1 || !activeFilters.includes("all")) {
      return {
        icon: Filter,
        title: "No conversations match your filters",
        description: "Try adjusting your filters to see more conversations.",
        actions: [
          {
            label: "Clear Filters",
            onClick: onClearFilters,
            variant: "default" as const
          }
        ]
      };
    }
    
    return {
      icon: MessageSquare,
      title: "No conversations yet",
      description: "Start engaging with customers across all your connected channels.",
      actions: [
        {
          label: "Start New Conversation",
          onClick: onStartNewConversation,
          variant: "default" as const
        },
        {
          label: "Connect Channels",
          onClick: onConnectChannels,
          variant: "outline" as const
        }
      ]
    };
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <AnimatePresence>
        {conversations.length === 0 ? (
          <EmptyState {...getEmptyStateProps()} />
        ) : (
          conversations.map((conversation, index) => (
            <ConversationCard
              key={conversation.id}
              conversation={conversation}
              isSelected={selectedConversation?.id === conversation.id}
              onClick={() => onConversationSelect(conversation)}
              searchQuery={searchQuery}
              index={index}
            />
          ))
        )}
      </AnimatePresence>
    </div>
  );
};