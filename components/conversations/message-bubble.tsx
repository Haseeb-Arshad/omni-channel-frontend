"use client";

import { motion } from "framer-motion";
import { Check, Play, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: string;
  type: 'text' | 'voice';
  duration?: string;
  transcript?: string;
  audioUrl?: string;
}

interface MessageBubbleProps {
  message: Message;
  isAgent: boolean;
}

export const MessageBubble = ({ message, isAgent }: MessageBubbleProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${isAgent ? 'justify-end' : 'justify-start'} mb-4`}
  >
    <div className={`max-w-[70%] ${isAgent ? 'order-2' : 'order-1'}`}>
      {message.type === 'voice' ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <Play className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <div className="h-6 w-full bg-blue-200 rounded-full flex items-center px-2">
                <div className="h-1 bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <span className="text-sm text-gray-600">{message.duration}</span>
          </div>
          {message.transcript && (
            <Button variant="ghost" size="sm" className="text-xs">
              <FileText className="h-3 w-3 mr-1" />
              View Transcript & AI Analysis
            </Button>
          )}
        </div>
      ) : (
        <div className={`rounded-lg p-3 ${
          isAgent 
            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' 
            : 'bg-gray-100 text-gray-900'
        }`}>
          <p className="text-sm">{message.content}</p>
        </div>
      )}
      <div className={`flex items-center mt-1 space-x-2 ${isAgent ? 'justify-end' : 'justify-start'}`}>
        <span className="text-xs text-gray-500">{message.timestamp}</span>
        {isAgent && <Check className="h-3 w-3 text-gray-400" />}
      </div>
    </div>
  </motion.div>
);