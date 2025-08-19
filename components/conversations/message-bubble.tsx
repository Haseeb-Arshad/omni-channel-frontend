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
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${isAgent ? 'justify-end' : 'justify-start'} mb-2.5`}
  >
    <div className={`max-w-[72%] ${isAgent ? 'order-2' : 'order-1'}`}>
      {message.type === 'voice' ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <Button size="sm" variant="outline" className="h-7 w-7 p-0 rounded-full">
              <Play className="h-3.5 w-3.5" />
            </Button>
            <div className="flex-1">
              <div className="h-5 w-full bg-gray-100 rounded-full flex items-center px-2">
                <div className="h-1 bg-gray-400 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            <span className="text-[11px] text-gray-500">{message.duration}</span>
          </div>
          {message.transcript && (
            <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">
              <FileText className="h-3 w-3 mr-1" />
              View Transcript
            </Button>
          )}
        </div>
      ) : (
        <div className={`px-3 py-2 text-[13px] leading-5 rounded-2xl ${
          isAgent 
            ? 'bg-green-600 text-white rounded-tr-md' 
            : 'bg-gray-700 text-white rounded-tl-md'
        }`}>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      )}
      <div className={`flex items-center mt-1 gap-1.5 ${isAgent ? 'justify-end' : 'justify-start'}`}>
        <span className="text-[11px] text-gray-400">{message.timestamp}</span>
        {isAgent && <Check className="h-3 w-3 text-gray-400" />}
      </div>
    </div>
  </motion.div>
);
