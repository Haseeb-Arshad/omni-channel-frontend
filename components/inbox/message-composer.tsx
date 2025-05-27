"use client";

import { useState, useRef } from "react";
import { Paperclip, Smile, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageComposerProps {
  onSendMessage: (content: string, attachments: File[]) => void;
  conversationId: string;
  placeholder?: string;
}

export function MessageComposer({ 
  onSendMessage, 
  conversationId,
  placeholder = "Type your message..."
}: MessageComposerProps) {
  const [messageInput, setMessageInput] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() && attachments.length === 0) return;
    
    onSendMessage(messageInput, attachments);
    setMessageInput("");
    setAttachments([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments([...attachments, ...newFiles]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {attachments.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div key={index} className="flex items-center bg-muted rounded-md px-2 py-1 text-sm">
              <span className="truncate max-w-[150px]">{file.name}</span>
              <button
                type="button"
                className="ml-1 text-muted-foreground hover:text-foreground"
                onClick={() => handleRemoveAttachment(index)}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="rounded-lg border bg-white p-2 flex flex-col">
        <textarea
          className="w-full resize-none focus:outline-none text-sm min-h-[60px]"
          placeholder={placeholder}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          rows={2}
        />
        <div className="flex justify-between items-center mt-2">
          <div className="flex space-x-1">
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4 text-muted-foreground" />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
              />
            </Button>
            <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
              <Smile className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
          <Button type="submit" size="sm" className="h-8 px-3" disabled={!messageInput.trim() && attachments.length === 0}>
            <Send className="h-4 w-4 mr-1" /> Send
          </Button>
        </div>
      </div>
    </form>
  );
}
