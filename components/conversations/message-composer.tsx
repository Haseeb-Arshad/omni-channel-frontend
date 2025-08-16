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
    <div className="p-6 border-t border-gray-200 bg-white">
      <div className="flex items-center space-x-2 mb-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsInternalNote(!isInternalNote)}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
            isInternalNote 
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          <StickyNote className="h-3 w-3 mr-1 inline" />
          Internal Note
        </motion.button>
      </div>
      
      <div className="flex items-end space-x-3">
        <div className="flex-1">
          <Textarea
            placeholder={isInternalNote ? "Add an internal note..." : "Type your message..."}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`min-h-[60px] max-h-32 resize-none rounded-xl border-2 transition-all duration-200 ${
              isInternalNote 
                ? 'border-yellow-200 bg-yellow-50/50 focus:border-yellow-400' 
                : 'border-gray-200 focus:border-purple-400'
            }`}
            disabled={disabled}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            disabled={disabled}
          >
            <Paperclip className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!messageText.trim() || disabled}
            className={`p-3 rounded-xl font-medium transition-all duration-200 ${
              messageText.trim() && !disabled
                ? isInternalNote
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
      
      {isInternalNote && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-yellow-700 mt-2 flex items-center"
        >
          <StickyNote className="h-3 w-3 mr-1" />
          This note will only be visible to your team
        </motion.p>
      )}
    </div>
  );
};