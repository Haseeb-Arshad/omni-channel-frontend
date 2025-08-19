"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MessageComposerProps {
  onSendMessage: (message: string, isInternalNote: boolean) => void;
  disabled?: boolean;
}

export const MessageComposer = ({ onSendMessage, disabled = false }: MessageComposerProps) => {
  const [messageText, setMessageText] = useState("");
  const [isInternalNote, setIsInternalNote] = useState(false);

  const handleSend = () => {
    if (!messageText.trim() || disabled) return;
    
    onSendMessage(messageText, isInternalNote);
    setMessageText("");
    setIsInternalNote(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-gray-700 bg-gray-900">
      <div className="flex items-end gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-full transition-colors"
          disabled={disabled}
        >
          <Paperclip className="h-4 w-4" />
        </motion.button>
        
        <div className="flex-1">
          <Textarea
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[40px] max-h-24 resize-none rounded-2xl border-0 bg-gray-700 text-white text-sm placeholder-gray-400 focus:ring-1 focus:ring-gray-600 focus:bg-gray-600"
            disabled={disabled}
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!messageText.trim() || disabled}
          className={`p-2 rounded-full transition-all duration-200 ${
            messageText.trim() && !disabled
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Send className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
};