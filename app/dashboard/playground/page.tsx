"use client"

import React, { useState, useRef, useEffect } from "react"
// Dashboard layout is provided by the parent layout.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, Bot, User, ChevronDown, Settings, Trash2, Sparkles, PanelRight, FileText, Send, RotateCw, X, Download, Brain, Zap, BrainCircuit, Menu, Check, ArrowUpDown, MailQuestion, PenLine, BotMessageSquare, MessageSquare, Loader2, Eye, EyeOff, Lock } from "lucide-react"
import { toast } from "sonner"
import { v4 as uuidv4 } from 'uuid';
import { useContext, createContext } from "react" 
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SectionHeader } from "@/components/ui/section-header";
import LazySection from "@/components/ui/lazy-section";
import { Textarea } from "@/components/ui/textarea"
import ErrorBoundary from "@/components/error-boundary"
import ProgressiveImage from "@/components/ui/progressive-image"

// Message interface for typing
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: {
    title: string;
    similarity: number;
  }[];
}

// Knowledge base interface
interface KnowledgeBase {
  id: string;
  name: string;
  documentCount: number;
}

export default function Page() {
  // State definitions for the playground
  const [useKnowledgeBase, setUseKnowledgeBase] = useState<boolean>(false);
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(0.7);
  const [maxTokens, setMaxTokens] = useState<number>(1000);
  const [contextWindow, setContextWindow] = useState<number>(10);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
  const [showPersonaSection, setShowPersonaSection] = useState<boolean>(true);
  const [showSettingsSection, setShowSettingsSection] = useState<boolean>(true);
  const [showKnowledgeSection, setShowKnowledgeSection] = useState<boolean>(true);
  const [inputMessage, setInputMessage] = useState<string>("");
  
  // Sample data for demonstration
  const selectedPersona = { id: "1", label: "AI Assistant" };
  const activePersona = { id: "1", model: "gpt-4", name: "Assistant" };
  const aiModels = [
    { id: "gpt-4", description: "Advanced model for complex tasks" },
    { id: "gpt-3.5-turbo", description: "Fast and efficient" }
  ];

  // Message component
  const Message = ({ message, isLoading }: { message: Message, isLoading: boolean }) => {
    const isUser = message.role === "user";
    
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div className={`flex gap-3 max-w-3xl ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <Avatar className={`h-8 w-8 ${isUser ? "bg-primary" : "bg-secondary"}`}>
            <AvatarFallback>{isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className={`rounded-2xl p-4 ${isUser ? "bg-primary text-primary-foreground" : "bg-card border border-border/40"}`}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              ) : (
                <div className="prose dark:prose-invert prose-sm max-w-none">
                  {message.content}
                </div>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Handle message submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "This is a sample response from the AI assistant. In a real implementation, this would be replaced with an actual API call response.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">AI Playground</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Chat</CardTitle>
              <CardDescription>Interact with the AI assistant</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ErrorBoundary>
                <section className="relative space-y-4 py-4">
                  {messages.length === 0 ? (
                    <div className="mx-auto max-w-2xl text-center">
                      <h2 className="mt-2 text-xl font-semibold">
                        {selectedPersona ? `Chat with ${selectedPersona.label}` : 'Playground'}
                      </h2>
                    </div>
                  ) : null}

                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <Message 
                        key={message.id}
                        message={message}
                        isLoading={index === messages.length - 1 && isTyping}
                      />
                    ))}
                  </div>
                </section>
              </ErrorBoundary>
            </CardContent>
            <CardFooter className="border-t p-4">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input 
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" disabled={!inputMessage.trim() || isTyping}>
                  {isTyping ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                  Send
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure your playground</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  {/* Knowledge Base Settings */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2 text-foreground">
                      <Brain className="h-4 w-4 text-primary" />
                      Knowledge Base
                    </Label>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="use-knowledge-base"
                        checked={useKnowledgeBase}
                        onCheckedChange={(checked) => setUseKnowledgeBase(checked)}
                        aria-label="Use Knowledge Base"
                      />
                      <Label htmlFor="use-knowledge-base" className="text-sm text-muted-foreground cursor-pointer flex-1">
                        Use Knowledge Base
                      </Label>
                    </div>
                    {useKnowledgeBase && (
                      <Select
                        value={selectedKnowledgeBase || ''}
                        onValueChange={(value: string) => setSelectedKnowledgeBase(value)}
                        disabled={knowledgeBases.length === 0}
                      >
                        <SelectTrigger className="w-full text-sm rounded-lg border-border focus:ring-1 focus:ring-primary">
                          <SelectValue placeholder={knowledgeBases.length > 0 ? "Select a knowledge base" : "No knowledge bases found"} />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg">
                          {knowledgeBases.length > 0 ? (
                            knowledgeBases.map((kb) => (
                              <SelectItem key={kb.id} value={kb.id} className="text-sm cursor-pointer">
                                <div className="flex flex-col py-1">
                                  <span className="font-medium">{kb.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {kb.documentCount} document{kb.documentCount !== 1 ? 's' : ''}
                                  </span>
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground text-center">No knowledge bases available.</div>
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  <Separator className="my-4" />

                  {/* Model Settings */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2 text-foreground">
                      <Zap className="h-4 w-4 text-primary" />
                      Model Parameters
                    </Label>
                    
                    {/* AI Model Selection (from active persona, display only) */}
                    <div className="space-y-1.5 p-3 rounded-lg border border-border bg-background/50">
                      <Label htmlFor="model-display" className="text-xs text-muted-foreground">AI Model (from Persona)</Label>
                      <Input 
                        id="model-display" 
                        value={`${activePersona.model.replace('gpt-','GPT ')} - ${aiModels.find(m => m.id === activePersona.model)?.description || 'Custom'}`} 
                        readOnly 
                        className="text-xs h-8 bg-muted/50"
                      />
                    </div>

                    {/* Temperature Setting */}
                    <div className="space-y-1.5 p-3 rounded-lg border border-border bg-background/50">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="temperature-slider" className="text-xs text-muted-foreground">Temperature</Label>
                        <span className="text-xs font-medium text-primary">{temperature.toFixed(1)}</span>
                      </div>
                      <Slider
                        id="temperature-slider"
                        min={0}
                        max={1}
                        step={0.1}
                        value={[temperature]}
                        onValueChange={(value: number[]) => setTemperature(value[0])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground/80">
                        <span>Precise</span>
                        <span>Neutral</span>
                        <span>Creative</span>
                      </div>
                    </div>

                    {/* Max Tokens Setting */}
                    <div className="space-y-1.5 p-3 rounded-lg border border-border bg-background/50">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="max-tokens-slider" className="text-xs text-muted-foreground">Max Response Length</Label>
                        <span className="text-xs font-medium text-primary">{maxTokens} tokens</span>
                      </div>
                      <Slider
                        id="max-tokens-slider"
                        min={100}
                        max={4000}
                        step={100}
                        value={[maxTokens]}
                        onValueChange={(value: number[]) => setMaxTokens(value[0])}
                        className="w-full"
                      />
                    </div>

                    {/* Context Window */}
                    <div className="space-y-1.5 p-3 rounded-lg border border-border bg-background/50">
                      <Label htmlFor="context-window-select" className="text-xs text-muted-foreground">Context Window</Label>
                      <Select value={String(contextWindow)} onValueChange={(val: string) => setContextWindow(parseInt(val))}>
                        <SelectTrigger id="context-window-select" className="w-full text-xs h-8 rounded-md border-border focus:ring-1 focus:ring-primary">
                          <SelectValue placeholder="Select context window" />
                        </SelectTrigger>
                        <SelectContent className="rounded-md">
                          <SelectItem value="5" className="text-xs">Last 5 messages</SelectItem>
                          <SelectItem value="10" className="text-xs">Last 10 messages</SelectItem>
                          <SelectItem value="20" className="text-xs">Last 20 messages</SelectItem>
                          <SelectItem value="100" className="text-xs">All messages (Max 100)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t space-y-2 bg-card/90 backdrop-blur-sm sticky bottom-0 z-10">
              <div className="flex gap-2 w-full">
                <Button 
                  variant="outline"
                  className="flex-1 hover:bg-[#2a52be]/10 hover:text-[#2a52be] transition-colors duration-300"
                  onClick={() => {
                    setTemperature(0.7);
                    setMaxTokens(1000);
                    setContextWindow(10);
                    toast.success('Settings reset to defaults');
                  }}
                >
                  <RotateCw className="mr-2 h-4 w-4" />
                  Reset Defaults
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex-1 hover:bg-[#2a52be]/10 hover:text-[#2a52be] transition-colors duration-300"
                  onClick={() => {
                    // Logic to handle chat export
                    const chatToExport = {
                      persona: activePersona,
                      settings: {
                        temperature,
                        maxTokens,
                        contextWindow,
                        useKnowledgeBase,
                        selectedKnowledgeBaseId: selectedKnowledgeBase,
                      },
                      messages: messages.map(m => ({ 
                        role: m.role, 
                        content: m.content, 
                        timestamp: m.timestamp,
                        sources: m.sources?.map(s => ({ title: s.title, similarity: s.similarity }))
                      }))
                    };
                    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
                      JSON.stringify(chatToExport, null, 2)
                    )}`;
                    const link = document.createElement("a");
                    link.href = jsonString;
                    link.download = `playground_chat_${activePersona.name.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.json`;
                    link.click();
                    toast.success("Chat exported successfully!");
                  }}
                >
                  <Download className="mr-2 h-4 w-4" /> Export Chat
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
