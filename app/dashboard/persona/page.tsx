"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Bot,
  Loader2,
  Trash2,
  Edit3,
  Save,
  Copy,
  BrainCircuit,
  MoreHorizontal,
  Pencil,
  Play,
  X,
  Plus,
  Users,
  Clock,
  Share2,
  Sparkles
} from "lucide-react"
import { toast } from "sonner"

// Type definition for Persona
type Persona = {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  tone: string;
  model: string;
  avatar?: string;
  lastUpdated?: string;
}

// Define communication tone options
const toneOptions = [
  { value: "professional", label: "Professional", description: "Formal and business-appropriate communication" },
  { value: "friendly", label: "Friendly", description: "Warm and approachable interactions" },
  { value: "technical", label: "Technical", description: "Detailed and precise technical explanations" },
  { value: "casual", label: "Casual", description: "Relaxed and conversational tone" },
  { value: "persuasive", label: "Persuasive", description: "Convincing and influential communication" }
];

// Define available models
const modelOptions = [
  { value: "gpt-4", label: "GPT-4", description: "Most capable model for complex tasks" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", description: "Fast and efficient for most common tasks" },
  { value: "claude-2", label: "Claude 2", description: "Balanced reasoning and factual responses" },
  { value: "gemini-pro", label: "Gemini Pro", description: "Advanced reasoning and problem solving" }
];

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      duration: 0.3
    }
  },
  hover: {
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
    transition: {
      duration: 0.3
    }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 24
    }
  },
  hover: {
    backgroundColor: "rgba(var(--accent), 0.3)",
    transition: {
      duration: 0.2
    }
  }
};

// Helper function to format dates
const formatDate = (dateString?: string) => {
  if (!dateString) return "Never updated";
  
  const date = new Date(dateString);
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export default function PersonaPage() {
  // Default persona with professional description and updated system prompt
  const defaultPersona: Persona = {
    id: "default",
    name: "Customer Support Agent",
    description: "A helpful customer support agent that assists customers with inquiries about products and services.",
    systemPrompt: "You are a helpful customer support agent for our company. You should be friendly, professional, and concise. Always try to address the customer's concerns directly, and offer solutions when possible. If you don't know the answer, be honest and suggest ways the customer can get more help. Use the knowledge base documents to provide accurate information about our products and services.",
    tone: "professional",
    model: "gpt-4",
    avatar: "/avatars/support.png",
    lastUpdated: new Date().toISOString(),
  };

  // State management
  const [personas, setPersonas] = useState<Persona[]>([
    defaultPersona,
    {
      id: "sales",
      name: "Sales Representative",
      description: "A persuasive sales representative that helps potential customers find the right products.",
      systemPrompt: "You are a sales representative for our company. Your goal is to help potential customers find the right products for their needs. Be persuasive but not pushy. Highlight the benefits and unique selling points of our products. When appropriate, suggest complementary products or premium alternatives. Use the knowledge base to provide accurate information about product specifications, pricing, and availability.",
      tone: "persuasive",
      model: "gpt-4",
      avatar: "/avatars/sales.png",
      lastUpdated: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
      id: "technical",
      name: "Technical Support Specialist",
      description: "A knowledgeable technical support specialist that helps troubleshoot issues and provide technical guidance.",
      systemPrompt: "You are a technical support specialist for our company. You help customers troubleshoot issues with our products and provide technical guidance. Be patient and thorough in your explanations. Walk customers through solutions step by step. Use technical terminology when appropriate, but be prepared to explain concepts in simpler terms when needed. Reference the knowledge base for accurate technical specifications and troubleshooting guides.",
      tone: "technical",
      model: "gpt-4",
      avatar: "/avatars/technical.png",
      lastUpdated: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    }
  ]);
  
  const [activePersona, setActivePersona] = useState<Persona>(defaultPersona);
  const [editedPersona, setEditedPersona] = useState<Persona>(defaultPersona);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Handler functions
  const handlePersonaChange = (persona: Persona) => {
    setActivePersona(persona);
    setEditedPersona(persona);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedPersona(activePersona);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedPersona(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedPersona(prev => ({ ...prev, [name]: value }));
  };

  const handleSavePersona = () => {
    setIsSaving(true);
    
    // Validation
    if (!editedPersona.name.trim()) {
      toast.error("Name cannot be empty");
      setIsSaving(false);
      return;
    }

    if (!editedPersona.systemPrompt.trim()) {
      toast.error("System prompt cannot be empty");
      setIsSaving(false);
      return;
    }

    // Update timestamps
    const updatedPersona = {
      ...editedPersona,
      lastUpdated: new Date().toISOString()
    };

    // Update personas array
    setPersonas(prevPersonas => 
      prevPersonas.map(p => p.id === updatedPersona.id ? updatedPersona : p)
    );

    // Update active persona
    setActivePersona(updatedPersona);
    
    // Exit edit mode
    setIsEditing(false);
    
    // Show success toast
    toast.success("Persona saved successfully", {
      description: `"${updatedPersona.name}" has been updated.`
    });
    
    setIsSaving(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedPersona(activePersona);
  };

  const handleCreateNewPersona = () => {
    // Create a new unique ID
    const newId = `persona-${Date.now()}`;
    
    // Create a new persona with default values
    const newPersona: Persona = {
      id: newId,
      name: "New Persona",
      description: "Description of this persona's purpose and capabilities.",
      systemPrompt: "You are a helpful AI assistant. Provide accurate and helpful responses to user queries.",
      tone: "friendly",
      model: "gpt-4",
      lastUpdated: new Date().toISOString()
    };
    
    // Add to personas array
    setPersonas(prevPersonas => [...prevPersonas, newPersona]);
    
    // Set as active and edit mode
    setActivePersona(newPersona);
    setEditedPersona(newPersona);
    setIsEditing(true);
    
    // Show success toast
    toast.success("New persona created", {
      description: "Configure your new persona and save changes."
    });
  };

  const handleDuplicatePersona = (persona: Persona) => {
    // Create a new unique ID
    const newId = `${persona.id}-copy-${Date.now()}`;
    
    // Create a duplicate with new ID and name
    const duplicatedPersona: Persona = {
      ...persona,
      id: newId,
      name: `${persona.name} (Copy)`,
      lastUpdated: new Date().toISOString()
    };
    
    // Add to personas array
    setPersonas(prevPersonas => [...prevPersonas, duplicatedPersona]);
    
    // Set as active and edit mode
    setActivePersona(duplicatedPersona);
    setEditedPersona(duplicatedPersona);
    setIsEditing(true);
    
    // Show success toast
    toast.success("Persona duplicated", {
      description: `Created copy of "${persona.name}"`
    });
  };

  const handleDeletePersona = (id: string) => {
    // Prevent deleting the last persona
    if (personas.length <= 1) {
      toast.error("Cannot delete the only persona");
      return;
    }
    
    // Remove from array
    setPersonas(prevPersonas => prevPersonas.filter(p => p.id !== id));
    
    // If active persona is deleted, switch to the first available
    if (activePersona.id === id) {
      const remainingPersonas = personas.filter(p => p.id !== id);
      setActivePersona(remainingPersonas[0]);
      setEditedPersona(remainingPersonas[0]);
    }
    
    // Show success toast
    toast.success("Persona deleted", {
      description: "The persona has been removed."
    });
  };

  const handleGenerateSystemPrompt = () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const generatedPrompt = `You are a ${editedPersona.tone} AI assistant specializing in ${editedPersona.description.toLowerCase().includes("customer support") ? "customer support" : "providing information and assistance"}. Your name is ${editedPersona.name}. You should always maintain a ${editedPersona.tone} tone in your responses. You should be knowledgeable, helpful, and accurate. When users ask questions, provide detailed and informative responses using the knowledge base materials available to you. If you don't know the answer, be honest and suggest alternative ways the user can find the information they need.`;
      
      setEditedPersona(prev => ({
        ...prev,
        systemPrompt: generatedPrompt
      }));
      
      setIsGenerating(false);
      
      toast.success("System prompt generated", {
        description: "AI-generated prompt based on persona details."
      });
    }, 1500);
  };

  const handleSyncToChannels = (persona: Persona) => {
    // Simulate syncing process
    toast.success(`Persona "${persona.name}" synchronized`, {
      description: "Applied to all compatible channels"
    });
  };

  const handleTestInPlayground = (persona: Persona) => {
    // Simulate opening in playground
    toast.success(`Opening "${persona.name}" in Playground`, {
      description: "Redirecting to test environment..."
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">AI Personas</h1>
          <p className="text-muted-foreground max-w-2xl">
            Create and customize AI personas for different communication channels. Each persona can have its own personality, tone, and knowledge base access.
          </p>
        </div>
        <Button className="gap-2 shadow-sm" onClick={handleCreateNewPersona}>
          <Plus className="h-4 w-4" />
          <span>Create Persona</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-4">
        {/* Left Pane - Persona Management */}
        <Card className="md:col-span-1 lg:col-span-1 shadow-sm border-border/50 hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-3.5 w-3.5 text-primary" />
                </div>
                <span>AI Personas</span>
              </span>
              <Badge variant="outline" className="ml-2 text-xs">{personas.length}</Badge>
            </CardTitle>
            <CardDescription className="text-xs">
              Select or create personas for your channels
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <ScrollArea className="h-[340px] pr-4">
              <div className="space-y-1.5">
                {personas.map((persona) => (
                  <div
                    key={persona.id}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                      activePersona.id === persona.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-accent/50"
                    }`}
                    onClick={() => handlePersonaChange(persona)}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <Avatar className="h-9 w-9 border border-border/30 flex-shrink-0">
                        {persona.avatar ? (
                          <AvatarImage src={persona.avatar} alt={persona.name} />
                        ) : (
                          <AvatarFallback className={activePersona.id === persona.id ? "bg-primary/20 text-primary" : "bg-muted"}>
                            {persona.name.substring(0, 1).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-medium truncate">{persona.name}</span>
                        <span className="text-xs text-muted-foreground truncate">
                          {persona.tone.charAt(0).toUpperCase() + persona.tone.slice(1)} · {formatDate(persona.lastUpdated).split(',')[0]}
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicatePersona(persona);
                        }}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleSyncToChannels(persona);
                        }}>
                          <Share2 className="h-4 w-4 mr-2" />
                          Sync to Channels
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePersona(persona.id);
                        }}
                        className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          
          <CardFooter className="pt-2 pb-4">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full text-sm" 
              onClick={handleCreateNewPersona}
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              New Persona
            </Button>
          </CardFooter>
        </Card>

        {/* Right Pane - Persona Editor */}
        <Card className="md:col-span-3 lg:col-span-3 shadow-sm border-border/50">
          <CardHeader className="pb-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  {activePersona.avatar ? (
                    <AvatarImage src={activePersona.avatar} alt={activePersona.name} />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {activePersona.name.substring(0, 1).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <CardTitle className="text-xl">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <Edit3 className="h-4 w-4 text-primary" />
                        <span>Editing {editedPersona.name}</span>
                      </div>
                    ) : (
                      activePersona.name
                    )}
                  </CardTitle>
                  {!isEditing && (
                    <CardDescription className="mt-1">
                      {activePersona.description}
                    </CardDescription>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCancelEdit}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleSavePersona}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-1" />
                      )}
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => handleTestInPlayground(activePersona)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Test in Playground
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button 
                      onClick={handleEditToggle}
                      size="sm"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit Persona
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            {isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter persona name"
                        value={editedPersona.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe this persona's purpose"
                        value={editedPersona.description}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tone">Communication Tone</Label>
                        <Select
                          value={editedPersona.tone}
                          onValueChange={(value) => handleSelectChange("tone", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                          <SelectContent>
                            {toneOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                <div className="flex flex-col">
                                  <span>{option.label}</span>
                                  <span className="text-xs text-muted-foreground">{option.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="model">AI Model</Label>
                        <Select
                          value={editedPersona.model}
                          onValueChange={(value) => handleSelectChange("model", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            {modelOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                <div className="flex flex-col">
                                  <span>{option.label}</span>
                                  <span className="text-xs text-muted-foreground">{option.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="systemPrompt">System Prompt</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={handleGenerateSystemPrompt}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Sparkles className="h-3 w-3 mr-1" />
                        )}
                        Generate
                      </Button>
                    </div>
                    <Textarea
                      id="systemPrompt"
                      name="systemPrompt"
                      placeholder="Enter system instructions for this persona"
                      value={editedPersona.systemPrompt}
                      onChange={handleInputChange}
                      rows={12}
                      className="font-mono text-sm resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      The system prompt defines how the AI persona behaves and responds. Be specific about tone, style, and knowledge constraints.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BrainCircuit className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">AI Model</h3>
                    </div>
                    <div className="text-sm">
                      {modelOptions.find(m => m.value === activePersona.model)?.label || activePersona.model}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {modelOptions.find(m => m.value === activePersona.model)?.description || "Advanced language model"}
                    </div>
                  </div>
                  
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Communication Style</h3>
                    </div>
                    <div className="text-sm capitalize">
                      {activePersona.tone}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {toneOptions.find(t => t.value === activePersona.tone)?.description || "Standard communication style"}
                    </div>
                  </div>
                  
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Last Updated</h3>
                    </div>
                    <div className="text-sm">
                      {formatDate(activePersona.lastUpdated).split(',')[0]}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatDate(activePersona.lastUpdated).split(',')[1]}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <BrainCircuit className="h-4 w-4 text-primary" />
                    System Prompt
                  </h3>
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap font-mono text-xs text-foreground/90 leading-relaxed">
                      {activePersona.systemPrompt}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between py-4 border-t">
            <div className="text-xs text-muted-foreground">
              {isEditing ? "Editing mode" : `Last updated: ${formatDate(activePersona.lastUpdated)}`}
            </div>
            {!isEditing && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDuplicatePersona(activePersona)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Duplicate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSyncToChannels(activePersona)}
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Apply to Channels
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
