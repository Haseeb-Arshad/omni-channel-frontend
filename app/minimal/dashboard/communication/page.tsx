"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export default function CommunicationPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMsg: Message = {
            id: uuidv4(),
            role: "user",
            content: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate API call - In real implementation, this would call '@/lib/api'
        setTimeout(() => {
            const aiMsg: Message = {
                id: uuidv4(),
                role: "assistant",
                content: "I've received your message. I am a simulated agent response in this minimalist dashboard. I can help you test your agent's logic flows.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleClear = () => {
        setMessages([]);
        toast.success("Conversation cleared");
    };

    return (
        <div className="h-[calc(100vh-140px)] flex bg-white rounded-2xl border border text-[#242929] border-[#242929]/10 overflow-hidden shadow-sm">
            {/* Sidebar - Sessions */}
            <div className="w-80 border-r border-[#242929]/5 bg-[#fafafa] flex flex-col hidden md:flex">
                <div className="p-4 border-b border-[#242929]/5 flex justify-between items-center">
                    <span className="font-semibold text-sm">Active Sessions</span>
                    <span className="text-xs bg-[#242929]/10 px-2 py-0.5 rounded-full">12 Live</span>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={cn(
                            "p-4 border-b border-[#242929]/5 cursor-pointer hover:bg-[#242929]/5 transition-colors",
                            i === 1 ? "bg-white border-l-4 border-l-[#242929]" : "border-l-4 border-l-transparent text-[#242929]/60"
                        )}>
                            <div className="flex justify-between mb-1">
                                <span className="font-medium text-sm">User #{1000 + i}</span>
                                <span className="text-[10px] opacity-60">2m</span>
                            </div>
                            <p className="text-xs opacity-80 truncate">
                                {i === 1 ? 'Can you help me with the pricing tier?' : 'How do I reset my password?'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col relative bg-white">
                {/* Chat Header */}
                <div className="p-4 border-b border-[#242929]/5 flex justify-between items-center bg-white/50 backdrop-blur-sm z-10 absolute top-0 w-full">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#242929]/5 flex items-center justify-center">
                            <User className="w-4 h-4 text-[#242929]" />
                        </div>
                        <div>
                            <h3 className="font-medium text-sm text-[#242929]">User #1001</h3>
                            <div className="text-[10px] text-[#242929]/40 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online • Via WhatsApp
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleClear} className="p-2 text-[#242929]/40 hover:text-[#242929] transition-colors" title="Clear Chat">
                            <RefreshCcw className="w-4 h-4" />
                        </button>
                        <button className="minimalist-btn-outline text-xs px-3 py-1.5 bg-white">Take Over</button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 pt-20 space-y-6 overflow-y-auto custom-scrollbar bg-[#ffffff]">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-[#242929]/20">
                            <Sparkles className="w-12 h-12 mb-4" />
                            <p className="font-medium">Sandbox Ready</p>
                            <p className="text-sm">Start typing to test the agent flow.</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg.id} className={cn("flex w-full", msg.role === "user" ? "justify-start" : "justify-end")}>
                                <div className={cn(
                                    "max-w-[80%] rounded-2xl px-5 py-3 text-sm shadow-sm",
                                    msg.role === "user"
                                        ? "bg-[#fafafa] border border-[#242929]/10 text-[#242929] rounded-tl-sm"
                                        : "bg-[#242929] text-white rounded-tr-sm"
                                )}>
                                    {msg.content}
                                </div>
                            </div>
                        ))
                    )}
                    {isTyping && (
                        <div className="flex w-full justify-end">
                            <div className="bg-[#242929] text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-sm flex items-center gap-2">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span className="text-xs opacity-80">Thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-[#242929]/5">
                    <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full bg-[#fafafa] rounded-xl pl-5 pr-14 py-4 text-sm outline-none border border-transparent focus:border-[#242929]/10 transition-colors placeholder:text-[#242929]/30 text-[#242929]"
                            placeholder="Type a message to simulate user input..."
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className={cn(
                                "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all",
                                !input.trim() || isTyping
                                    ? "bg-[#242929]/10 text-[#242929]/30 cursor-not-allowed"
                                    : "bg-[#242929] text-white hover:opacity-90 hover:scale-105"
                            )}
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
