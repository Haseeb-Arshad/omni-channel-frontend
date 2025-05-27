import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Conversation, Message } from "@/types/conversation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { getChannelIcon } from "@/lib/utils";

interface ConversationViewProps {
  conversation: Conversation | null;
  onSendMessage: (message: string) => void;
  onBack?: () => void;
}

export function ConversationView({
  conversation,
  onSendMessage,
  onBack,
}: ConversationViewProps) {
  const [message, setMessage] = useState("");

  if (!conversation) {
    return (
      <div className="hidden md:flex flex-col items-center justify-center h-full text-muted-foreground">
        <div className="text-center p-6 max-w-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">No conversation selected</h3>
          <p className="text-sm text-muted-foreground">
            Select a conversation or start a new one
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-1"
              onClick={onBack}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              <span className="sr-only">Back</span>
            </Button>
          )}
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={conversation.contact.avatar} alt={conversation.contact.name} />
              <AvatarFallback>
                {conversation.contact.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium">{conversation.contact.name}</h2>
              <div className="flex items-center text-xs text-muted-foreground">
                {getChannelIcon(conversation.channel)}
                <span className="ml-1">
                  {conversation.channel.charAt(0).toUpperCase() + conversation.channel.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M4 12a8 8 0 0 1 8-8v8H4z"></path>
              <path d="M12 4v8h8a8 8 0 0 0-8-8z"></path>
              <path d="M12 12h8a8 8 0 0 1-8 8v-8z"></path>
              <path d="M12 20v-8H4a8 8 0 0 0 8 8z"></path>
            </svg>
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {conversation.history.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === "customer" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === "customer"
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === "customer"
                      ? "text-muted-foreground"
                      : "text-primary-foreground/70"
                  }`}
                >
                  {format(new Date(msg.timestamp), "h:mm a")}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Message Input */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <Button type="button" variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
            <span className="sr-only">Attach file</span>
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              className="pr-12"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16s-1.5 2-4 2 2-3.5 2-3.5V8"></path>
              </svg>
              <span className="sr-only">Add emoji</span>
            </Button>
          </div>
          <Button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 mr-2"
            >
              <path d="m22 2-7 20-4-9-9-4Z"></path>
              <path d="M22 2 11 13"></path>
            </svg>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
