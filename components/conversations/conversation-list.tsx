import { motion, AnimatePresence } from "framer-motion";
import { Conversation } from "@/types/conversation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getChannelIcon, getContactInfo } from "@/lib/utils";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversation: Conversation) => void;
  searchQuery: string;
  activeFilter: string;
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
  searchQuery,
  activeFilter,
}: ConversationListProps) {
  // Animation variants
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  if (conversations.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>No conversations found</p>
        <p className="text-sm mt-1">
          {searchQuery || activeFilter !== "all"
            ? "Try adjusting your search or filters"
            : "Start a new conversation to see it here"}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto flex-1">
      <AnimatePresence>
        {conversations.map((conversation) => (
          <motion.div
            key={conversation.id}
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => onSelectConversation(conversation)}
            className={`p-3 border-b cursor-pointer transition-colors hover:bg-muted/50 ${
              selectedConversationId === conversation.id ? "bg-muted" : ""
            } ${conversation.unread ? "border-l-4 border-l-primary" : ""}`}
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
                    <span className="ml-1">
                      {getContactInfo(conversation.contact, conversation.channel)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {conversation.timestamp}
              </div>
            </div>
            <div className="text-sm line-clamp-2">{conversation.lastMessage}</div>
            <div className="flex mt-2 gap-1.5">
              {conversation.tags?.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs px-1 py-0">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
