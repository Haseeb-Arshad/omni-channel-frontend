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
import { AlertCircle, Bot, User, ChevronDown, Settings, Trash2, Sparkles, PanelRight, FileText, Send, RotateCw, X, Download, Brain, Zap, BrainCircuit, Menu, Check, ArrowUpDown, MailQuestion, PenLine, BotMessageSquare, MessageSquare, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { v4 as uuidv4 } from 'uuid';
import api, { 
  Persona as ApiPersona, 
  Message as ApiMessage, 
  KnowledgeBase as ApiKnowledgeBase, 
  PlaygroundKnowledgeBase, 
  PlaygroundChatRequest,
  PlaygroundChatResponse
} from "@/lib/api"; // Import the actual API client
// Import from local context files or create them if they don't exist
import { useContext, createContext } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

// Create auth context if it doesn't exist
const AuthContext = createContext({ user: null, isAuthenticated: false })
const useAuth = () => useContext(AuthContext)

// Create persona context if it doesn't exist
const PersonaContext = createContext<{ personas: ApiPersona[] }>({ personas: [] })
const usePersona = () => useContext(PersonaContext)

// Define default personas to match those from the persona page
const defaultPersonas: ApiPersona[] = [
  {
    id: "default",
    user_id: 0, // Assuming a placeholder user_id for default personas not tied to a specific DB user
    name: "Customer Support Agent",
    description: "A helpful customer support agent that assists customers with inquiries about products and services.",
    system_prompt: "You are a helpful customer support agent for our company. You should be friendly, professional, and concise. Always try to address the customer's concerns directly, and offer solutions when possible. If you don't know the answer, be honest and suggest ways the customer can get more help. Use the knowledge base documents to provide accurate information about our products and services.",
    tone: "professional",
    model: "gpt-4",
    avatar: "/avatars/support.png", // Changed from avatarUrl to avatar to match lib/api Persona type
    // role: "Customer Support", // 'role' is not in lib/api Persona, consider adding if needed or removing
    is_active: true, // Assuming default personas are active
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    // knowledgeBaseId: "kb_customer_support", // 'knowledgeBaseId' is not directly in lib/api Persona, it's part of Channel or other contexts
  },
  {
    id: "sales",
    user_id: 0,
    name: "Sales Representative",
    description: "A persuasive sales representative that helps potential customers find the right products.",
    system_prompt: "You are a sales representative for our company. Your goal is to help potential customers find the right products for their needs. Be persuasive but not pushy. Highlight the benefits and unique selling points of our products. When appropriate, suggest complementary products or premium alternatives. Use the knowledge base to provide accurate information about product specifications, pricing, and availability.",
    tone: "persuasive",
    model: "gpt-4",
    avatar: "/avatars/sales.png",
    is_active: true,
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "technical",
    user_id: 0,
    name: "Technical Support Specialist",
    description: "A knowledgeable technical support specialist that helps troubleshoot issues and provide technical guidance.",
    system_prompt: "You are a technical support specialist for our company. You help customers troubleshoot issues with our products and provide technical guidance. Be patient and thorough in your explanations. Walk customers through solutions step by step. Use technical terminology when appropriate, but be prepared to explain concepts in simpler terms when needed. Reference the knowledge base for accurate technical specifications and troubleshooting guides.",
    tone: "technical",
    model: "gpt-4",
    avatar: "/avatars/tech.png",
    is_active: true,
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  }
];

// Define AI models
const aiModels: ModelSetting[] = [
  { id: "gpt-4", name: "GPT-4", description: "Most capable model, best for complex tasks" },
  { id: "gpt-3.5", name: "GPT-3.5", description: "Faster responses, good for common questions" },
  { id: "claude-3-sonnet", name: "Claude 3 Sonnet", description: "Advanced reasoning with high accuracy" },
  { id: "claude-3-opus", name: "Claude 3 Opus", description: "Highest capability model for critical applications" },
];

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  sources?: MessageSource[];
}

type MessageSource = {
  documentId: string;
  title: string;
  similarity: number;
  snippet?: string;
}

type ModelSetting = {
  id: string;
  name: string;
  description: string;
}

type KnowledgeBase = {
  id: string;
  name: string;
  description: string;
  documentCount: number;
}

export default function PlaygroundPage() {
  // This CSS class will be used for the typing animation
  const typingAnimationClass = `
    @keyframes typingDots {
      0%, 20% { content: '.'; }
      40%, 60% { content: '..'; }
      80%, 100% { content: '...'; }
    }
    .typing-animation::after {
      content: '...';
      animation: typingDots 1.5s infinite;
    }
  `;
  const { user } = useAuth()
  const { personas: globalPersonas } = usePersona()
  
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPanel, setShowPanel] = useState(true) // Show panel by default for better UX
  const [personas, setPersonas] = useState<ApiPersona[]>(defaultPersonas)
  const [activePersona, setActivePersona] = useState<ApiPersona>(defaultPersonas[0])
  const [temperature, setTemperature] = useState<number>(0.7)
  const [maxTokens, setMaxTokens] = useState<number>(1000)
  const [contextWindow, setContextWindow] = useState<number>(10)
  const [useKnowledgeBase, setUseKnowledgeBase] = useState<boolean>(true)
  const [knowledgeBases, setKnowledgeBases] = useState<PlaygroundKnowledgeBase[]>([])
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Fetch knowledge bases when component mounts
  useEffect(() => {
    const fetchKnowledgeBases = async () => {
      setApiError(null);
      try {
        const response = await api.listKnowledgeBasesForPlayground();
        if (response.success && response.data) {
          setKnowledgeBases(response.data);
          if (response.data.length > 0 && !selectedKnowledgeBase) {
            setSelectedKnowledgeBase(response.data[0].id);
          }
        } else {
          setApiError(response.message || 'Failed to fetch knowledge bases.');
          toast.error(response.message || 'Failed to fetch knowledge bases.');
        }
      } catch (error) {
        console.error("Error fetching knowledge bases:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred while fetching knowledge bases.';
        setApiError(errorMessage);
        toast.error(errorMessage);
      }
    };

    if (user) {
      fetchKnowledgeBases();
    }
  }, [user, selectedKnowledgeBase]); // Added selectedKnowledgeBase to avoid re-fetching if already set

  // Merge global personas with default personas
  useEffect(() => {
    if (globalPersonas && globalPersonas.length > 0) {
      // Create a merged list with global personas taking precedence
      const mergedPersonas = [...defaultPersonas];
      
      globalPersonas.forEach((globalPersona: ApiPersona) => {
        if (globalPersona && typeof globalPersona === 'object' && 'id' in globalPersona) {
          const existingIndex = mergedPersonas.findIndex(p => p.id === globalPersona.id);
          if (existingIndex >= 0) {
            // Ensure all required properties are present
            const mergedPersona: ApiPersona = {
              ...mergedPersonas[existingIndex],
              ...globalPersona,
              // Ensure these required fields are always present
              user_id: globalPersona.user_id !== undefined ? globalPersona.user_id : mergedPersonas[existingIndex].user_id,
              system_prompt: globalPersona.system_prompt || mergedPersonas[existingIndex].system_prompt,
              tone: globalPersona.tone || mergedPersonas[existingIndex].tone,
              model: globalPersona.model || mergedPersonas[existingIndex].model,
              is_active: globalPersona.is_active !== undefined ? globalPersona.is_active : mergedPersonas[existingIndex].is_active,
              created_at: globalPersona.created_at || mergedPersonas[existingIndex].created_at,
              updated_at: globalPersona.updated_at || mergedPersonas[existingIndex].updated_at,
            };
            mergedPersonas[existingIndex] = mergedPersona;
          } else {
            // Add as new persona, ensuring all fields of ApiPersona are present
            const newPersona: ApiPersona = {
              id: globalPersona.id,
              user_id: globalPersona.user_id || 0, // Adding user_id with default value of 0
              name: globalPersona.name || 'Unnamed Persona',
              description: globalPersona.description || 'No description provided',
              system_prompt: globalPersona.system_prompt || 'You are a helpful assistant.',
              tone: globalPersona.tone || 'neutral',
              model: globalPersona.model || 'gpt-4',
              avatar: globalPersona.avatar,
              is_active: globalPersona.is_active !== undefined ? globalPersona.is_active : true,
              created_at: globalPersona.created_at || new Date().toISOString(),
              updated_at: globalPersona.updated_at || new Date().toISOString()
            };
            mergedPersonas.push(newPersona);
          }
        }
      });
      
      setPersonas(mergedPersonas);
    }
  }, [globalPersonas]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateId = () => {
    return uuidv4()
  }

  // Function to handle when user sends a message
  const handleSendMessage = (e: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: generateId(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    simulateResponse(inputValue)
  }

  // Function to simulate AI response based on user query with API integration
  const simulateResponse = async (query: string) => {
    setIsTyping(true);
    setIsProcessing(true);
    setApiError(null);
    
    try {
      const payload: PlaygroundChatRequest = {
        query: query, // Changed from 'message' to 'query' to match backend expectation
        personaId: activePersona.id,
        sessionId: generateId(),
        temperature,
        maxTokens,
        contextWindow,
        // Filter out 'system' role messages as the API only accepts 'user' or 'assistant' roles
        history: messages
          .slice(-contextWindow)
          .filter(msg => msg.role === 'user' || msg.role === 'assistant')
          .map(msg => ({ role: msg.role as 'user' | 'assistant', content: msg.content })),
      };

      if (useKnowledgeBase && selectedKnowledgeBase) {
        payload.knowledgeBaseId = selectedKnowledgeBase;
      }

      const assistantApiResponse = await api.playgroundChat(payload);

      if (assistantApiResponse.success && assistantApiResponse.data) {
        const aiContent = assistantApiResponse.data.choices?.[0]?.message?.content || assistantApiResponse.data.content || "Sorry, I couldn't generate a response.";

        // Create a new message with the API response
        const newMessage: Message = {
          id: generateId(),
          content: aiContent,
          role: 'assistant',
          timestamp: new Date(),
          // Map API sources to our MessageSource format
          sources: assistantApiResponse.data.sources?.map(source => ({
            documentId: source.id,
            title: source.name,
            similarity: source.score || 0,
            snippet: source.content
          }))
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        // Show a toast notification if sources were found
        if (newMessage.sources && newMessage.sources.length > 0) {
          toast.success(`Found ${newMessage.sources.length} relevant document${newMessage.sources.length > 1 ? 's' : ''} in the knowledge base`);
        }
      } else {
        // Fallback to client-side simulation if API response is missing
        fallbackSimulation(query);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Check if error has a response and data message for more specific error reporting
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred while getting AI response.';
      setApiError(errorMessage);
      toast.error(errorMessage);
      
      // Fallback to client-side simulation if API call fails
      fallbackSimulation(query);
    } finally {
      setIsTyping(false);
      setIsProcessing(false);
    }
  };
  
  // Fallback simulation function when API is unavailable
  const fallbackSimulation = (query: string) => {
    // Get persona-specific language style based on tone
    const getToneStyle = (persona: ApiPersona) => {
      switch (persona.tone) {
        case 'professional':
          return { 
            greeting: "Hello there! ",
            positive: "I'm happy to help with that. ",
            thinking: "Let me check that for you. ",
            closing: "Is there anything else you'd like to know?"
          }
        case 'persuasive':
          return { 
            greeting: "Great to connect with you! ",
            positive: "I'm excited to tell you about ",
            thinking: "That's a great question about ",
            closing: "Would you like to hear more about our premium options?"
          }
        case 'technical':
          return { 
            greeting: "Hello, ",
            positive: "I can certainly explain that. ",
            thinking: "Let me provide you with the technical details. ",
            closing: "Let me know if you need any clarification."
          }
        default:
          return { 
            greeting: "Hi there! ",
            positive: "I'd be happy to help. ",
            thinking: "Let me see... ",
            closing: "Anything else you'd like to know?"
          }
      }
    }

    const toneStyle = getToneStyle(activePersona);
    const lowercaseQuery = query.toLowerCase();
    let response = "";
    
    // Simple query matching logic
    if (lowercaseQuery.includes('hello') || lowercaseQuery.includes('hi') || lowercaseQuery.match(/^hey/)) {
      response = `${toneStyle.greeting}How can I assist you today?`;
    } 
    else if (lowercaseQuery.includes('product') || lowercaseQuery.includes('catalog')) {
      response = `${toneStyle.positive}Our product catalog includes a variety of items across electronics, home goods, and fashion categories. Our most popular products this month are the UltraBook Pro laptop, SmartHome Hub, and ErgoPro Office Chair. Would you like more specific information about any of these product categories?`;
    }
    else if (lowercaseQuery.includes('return') || lowercaseQuery.includes('refund')) {
      // Persona-specific return policy responses
      if (activePersona.id === "sales") {
        response = `${toneStyle.positive}While we're confident you'll love our products, we do offer a hassle-free return policy. You can return any product within 30 days with your receipt, and we'll process your refund to the original payment method within 5-7 business days. Our customer satisfaction is our priority. What product were you considering?`;
      } else if (activePersona.id === "technical") {
        response = `${toneStyle.thinking}According to our return policy documentation (Rev. 2025.1), returns are accepted within a 30-day window from the date of purchase, contingent upon presentation of the original receipt. Refund processing occurs within a 5-7 business day timeframe to the original payment method. Technical issues with products should be reported to technical support before initiating a return to explore potential troubleshooting solutions. Would you like me to outline the specific return procedure steps?`;
      } else {
        response = `${toneStyle.thinking}Our return policy allows returns within 30 days of purchase with the original receipt. Refunds are processed back to the original payment method within 5-7 business days. Would you like more specific information about return exceptions or the process?`;
      }
    }
    else if (useKnowledgeBase) {
      response = `${toneStyle.thinking}I've searched our knowledge base for information about "${query}". ${activePersona.id === "technical" ? 'According to our technical documentation, ' : ''}In a full implementation, I would provide relevant information from our knowledge base documents. Would you like me to explain anything specific about this topic?`;
    }
    else {
      // Generic responses based on persona
      if (activePersona.id === "sales") {
        response = `${toneStyle.thinking}That's a great question about ${query.split(' ').slice(0,3).join(' ')}... I'd be happy to find the specific information for you. In a full implementation, I would search our product database to give you the most compelling information to help with your decision. Is there a particular product feature or benefit you're most interested in?`;
      } else if (activePersona.id === "technical") {
        response = `${toneStyle.thinking}Regarding your inquiry about ${query.split(' ').slice(0,3).join(' ')}, I would need to reference our technical documentation database for precise specifications and procedures. In a production environment, I would query our knowledge base to provide you with accurate technical details. To help narrow down the information, could you specify which system version or hardware model you're working with?`;
      } else {
        response = `${toneStyle.thinking}I understand you're asking about "${query}". ${useKnowledgeBase ? 'I\'ve checked our knowledge base and ' : ''}While I don't have specific information on that query, I'd be happy to help you find what you're looking for. Could you provide more details about what you need assistance with? ${toneStyle.closing}`;
      }
    }

    // Add the persona's closing phrase if the response doesn't already include a question
    if (!response.endsWith('?')) {
      response += ` ${toneStyle.closing}`;
    }

    // Apply temperature variation (higher temp = more creative/variable responses)
    if (temperature > 0.8) {
      // Add some creative elements or personal touches at high temperature
      const creativeAdditions = [
        "I think you'll find this particularly interesting. ",
        "From my perspective, this is quite fascinating. ",
        "Here's a thought that might help: ",
        "I've seen similar questions before, and "
      ];
      
      // Randomly insert a creative element if temperature is high
      if (Math.random() > 0.5) {
        const randomAddition = creativeAdditions[Math.floor(Math.random() * creativeAdditions.length)];
        const insertPoint = response.indexOf('. ') + 2;
        if (insertPoint > 2) {
          response = response.substring(0, insertPoint) + randomAddition + response.substring(insertPoint);
        }
      }
    } else if (temperature < 0.4) {
      // More concise and direct at low temperature
      response = response.replace(/\. I'd be happy to |\. I can |\. Let me /g, '. I\'ll ');
      response = response.replace(/Would you like|Do you want/g, 'Need');
    }
    
    // Create a new message with the simulated response
    const newMessage: Message = {
      id: generateId(),
      content: response,
      role: 'assistant',
      timestamp: new Date(),
      sources: useKnowledgeBase ? [{
        documentId: 'simulated-doc',
        title: 'Simulated Knowledge Base Document',
        similarity: 0.85,
        snippet: 'This is a simulated document snippet for demonstration purposes.'
      }] : undefined
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const handleClearConversation = () => {
    setMessages([])
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
      <TooltipProvider>
        <div className="flex flex-col h-[calc(100vh-4rem)]" style={{ minHeight: '85vh' }}> {/* Expanded height to fill screen */}
          <div className="flex items-center justify-between mb-6"> {/* Increased mb */} 
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <BrainCircuit className="h-6 w-6 text-primary" />
                AI Playground
              </h1>
              <p className="text-muted-foreground">
                Test your AI personas and see how they respond to different queries
              </p>
            </div>
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={`gap-2 ${showPanel ? 'bg-primary/5 text-primary border-primary/20' : ''}`}
                    onClick={() => setShowPanel(!showPanel)}
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Settings</span>
                    <ChevronDown className={`h-4 w-4 sm:ml-2 transition-transform ${showPanel ? 'rotate-180' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{showPanel ? 'Hide' : 'Show'} persona and model settings</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={handleClearConversation}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Clear Chat</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear the conversation history</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

        <div className="flex flex-1 gap-4 overflow-hidden h-full"> {/* Added h-full to ensure full height */}
          {/* Chat Interface */}
          <Card className="flex-1 flex flex-col gradient-border overflow-hidden h-full"> {/* Added h-full for full height */} {/* flex-1 to take available space, flex-col for vertical layout */}
            <CardHeader className="border-b py-3 px-4"> {/* Adjusted padding */} 
              <div className="flex items-center gap-3"> {/* Increased gap */} 
                <Avatar className="h-9 w-9 border border-primary/20"> {/* Slightly larger avatar */} 
                  <AvatarImage src={activePersona.avatar} alt={activePersona.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {activePersona.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base font-semibold">{activePersona.name}</CardTitle> {/* Increased font-size */} 
                  <CardDescription className="text-xs text-muted-foreground whitespace-normal line-clamp-2" title={activePersona.description}>{activePersona.description || 'AI Assistant'}</CardDescription> {/* Display persona description with line clamp */} 
                </div>
              </div>
            </CardHeader>
            {/* Messages Area - takes up remaining vertical space and scrolls */}
            <CardContent className="flex-1 p-0"> {/* flex-1 to grow, p-0 as ScrollArea will have padding */}
              <ScrollArea className="h-[calc(100vh-10rem)] p-4"> {/* Taller height for chat content area */}
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center"> {/* Larger icon bg */} 
                      <MessageSquare className="h-12 w-12 text-primary/80" /> {/* Adjusted icon color/size */} 
                    </div>
                    <h3 className="text-xl font-semibold">Start Your AI Conversation</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Type your message below to see how {activePersona.name} responds.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5 py-4" ref={messagesEndRef}> {/* Added padding for better spacing */} {/* Increased space-y */} 
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${ 
                            message.role === 'user' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${ 
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-primary/10'
                            }`}
                          >
                            {message.role === 'user' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <div
                              className={`rounded-lg p-3 text-sm ${ 
                                message.role === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              {message.content}
                              
                              {/* Display knowledge base sources if available */}
                              {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
                                <div className="mt-3 pt-2 border-t border-border">
                                  <div className="text-xs font-medium mb-1 flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    <span>Sources ({message.sources.length})</span>
                                  </div>
                                  <div className="space-y-1.5">
                                    {message.sources.map((source) => (
                                      <div key={source.documentId} className="text-xs bg-background/50 rounded p-1.5">
                                        <div className="flex justify-between items-start gap-2 mb-1">
                                          <span className="font-medium truncate">{source.title}</span>
                                          <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
                                            {Math.round(source.similarity * 100)}% match
                                          </Badge>
                                        </div>
                                        {source.snippet && (
                                          <div className="text-muted-foreground leading-tight line-clamp-2">
                                            {source.snippet}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div
                              className={`text-xs text-muted-foreground ${ 
                                message.role === 'user' ? 'text-right' : 'text-left'
                              }`}
                            >
                              {formatTime(message.timestamp)}
                              {message.role === 'assistant' && (
                                <span className="ml-1 italic">{activePersona.name}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start animate-in fade-in-50 duration-300">
                        <div className="flex gap-3 max-w-[80%]">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <div className="rounded-lg p-3 text-sm bg-muted">
                              <span className="typing-animation">Typing</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
            {/* Message Input Area - stays at the bottom */}
            <CardFooter className="p-4 border-t bg-background/95 backdrop-blur-sm"> 
              {/* API Error alert */}
              {apiError && (
                <div className="mb-3 p-3 text-sm bg-destructive/10 text-destructive rounded-lg flex items-center gap-2"> 
                  <AlertCircle className="h-5 w-5" />
                  <span>{apiError}</span>
                </div>
              )}
              <form onSubmit={handleSendMessage} className="flex w-full items-start gap-3"> 
                <Textarea
                  placeholder={`Ask ${activePersona.name}...`}
                  className="min-h-[80px] resize-none rounded-lg p-4 pr-12 border-primary/20 focus-visible:ring-1 focus-visible:ring-primary text-base"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage(e)
                    }
                  }}
                  ref={inputRef}
                  disabled={isProcessing}
                />
                <Button type="submit" size="icon" className="h-12 w-12 rounded-lg" disabled={isTyping || !inputValue.trim()}> 
                  {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </form>
            </CardFooter>
          </Card>

          {/* Settings Panel (Persona Sidebar) */}
          {showPanel && (
            <Card className="w-[400px] flex flex-col transform transition-all duration-300 ease-in-out animate-in slide-in-from-right-12 bg-card"> 
              <CardHeader className="border-b py-3 px-4"> 
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-semibold flex items-center gap-2"> 
                    <Settings className="h-5 w-5" />
                    Playground Settings
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowPanel(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="text-xs">Customize your AI persona and model parameters.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full p-4 space-y-6"> 
                  {/* Persona Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2 text-foreground">
                      <BotMessageSquare className="h-4 w-4 text-primary" />
                      AI Persona
                    </Label>
                    <div className="space-y-2">
                      {personas.map((persona) => (
                        <div 
                          key={persona.id}
                          className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 hover:bg-accent/80 ${activePersona.id === persona.id ? 'bg-primary/10 border-primary/50 shadow-sm' : 'border-border hover:border-accent-foreground/20'}`}
                          onClick={() => setActivePersona(persona)}
                          style={{ minWidth: '250px' }} 
                        >
                          <Avatar className="h-9 w-9 flex-shrink-0 border border-border">
                            <AvatarImage src={persona.avatar} alt={persona.name} />
                            <AvatarFallback className={`text-xs font-semibold ${activePersona.id === persona.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                              {persona.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-0.5">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm truncate max-w-[180px]">{persona.name}</p>
                              {activePersona.id === persona.id && (
                                <Badge variant="outline" className="ml-2 text-[10px] py-0 px-1.5 h-5 bg-primary/10 text-primary border-primary/30">
                                  <Check className="mr-1 h-3 w-3" /> Active
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs">
                              <Badge variant="outline" className="rounded-sm px-1 py-0 text-[10px] font-normal truncate max-w-[80px]">{persona.tone}</Badge>
                              <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">• {persona.model}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Knowledge Base Settings */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2 text-foreground">
                      <Brain className="h-4 w-4 text-primary" />
                      Knowledge Base
                    </Label>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border bg-background/50">
                      <Switch
                        id="use-knowledge-base"
                        checked={useKnowledgeBase}
                        onCheckedChange={setUseKnowledgeBase}
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
                    {apiError && useKnowledgeBase && <p className="text-xs text-destructive mt-1.5 px-1">{apiError}</p>}
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
                      <Input id="model-display" value={`${activePersona.model.replace('gpt-','GPT ')} - ${aiModels.find(m => m.id === activePersona.model)?.description || 'Custom'}`} readOnly className="text-xs h-8 bg-muted/50"/>
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
                        className="w-full [&>span:first-child]:h-1.5 [&>span:first-child>span]:h-1.5 [&>span:first-child>span]:w-1.5 [&>span:first-child>span]:border-2"
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
                        className="w-full [&>span:first-child]:h-1.5 [&>span:first-child>span]:h-1.5 [&>span:first-child>span]:w-1.5 [&>span:first-child>span]:border-2"
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
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-3 border-t bg-background/95 backdrop-blur-sm flex justify-between items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs gap-1.5 h-8 rounded-md"
                  onClick={() => {
                    setActivePersona(personas.find(p => p.id === 'default') || defaultPersonas[0]);
                    setTemperature(0.7);
                    setMaxTokens(1000);
                    setContextWindow(10);
                    setUseKnowledgeBase(true);
                    setSelectedKnowledgeBase(null);
                    toast.info("Settings reset to default values.")
                  }}
                >
                  <RotateCw className="h-3.5 w-3.5" />
                  Reset Defaults
                </Button>
                <Button variant="outline" size="sm" className="text-xs gap-1.5 h-8 rounded-md" onClick={() => {
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
                  toast.success("Chat exported successfully!")
                }}>
                  <Download className="h-3.5 w-3.5" />
                  Export Chat
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
