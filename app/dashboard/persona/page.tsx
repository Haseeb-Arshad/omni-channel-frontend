"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePersona } from "@/context/persona-context"
// Dashboard layout is provided by the parent layout.tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Bot, 
  Sparkles, 
  MessageSquare, 
  RefreshCw, 
  PlusCircle,
  LayoutGrid,
  LayoutList,
  Loader2,
  Check,
  AlertCircle,
  Trash2,
  Edit3,
  Save,
  Copy,
  BrainCircuit,
  Settings,
  MoreHorizontal,
  Pencil,
  Play,
  X,
  Brain,
  Zap,
  Plus,
  Users,
  Share2,
  Clock,
  ExternalLink
} from "lucide-react"
import { toast } from "sonner"

// Import custom persona components
import PersonaCard from "@/components/persona/persona-card"
import PersonaForm from "@/components/persona/persona-form"

type Persona = {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  tone: string;
  model: string;
  lastUpdated?: string;
}

// Define communication tone options
const toneOptions = [
  { value: "professional", label: "Professional", description: "Formal and business-appropriate communication" },
  { value: "friendly", label: "Friendly", description: "Warm and approachable interactions" },
  { value: "technical", label: "Technical", description: "Detailed and precise technical explanations" },
  { value: "persuasive", label: "Persuasive", description: "Compelling and convincing communication" },
  { value: "empathetic", label: "Empathetic", description: "Understanding and compassionate responses" },
  { value: "formal", label: "Formal", description: "Highly structured and traditional communication" },
  { value: "casual", label: "Casual", description: "Relaxed and conversational interactions" },
]

// Define AI model options
const modelOptions = [
  { value: "gpt-4", label: "GPT-4 (Most Capable)", description: "Best for complex tasks and nuanced understanding" },
  { value: "gpt-3.5", label: "GPT-3.5 (Faster)", description: "Efficient for common tasks with quick response times" },
  { value: "claude-3-sonnet", label: "Claude 3 Sonnet", description: "Advanced reasoning with strong document analysis" },
  { value: "claude-3-opus", label: "Claude 3 Opus", description: "Highest capability model for critical applications" },
]

export default function PersonaPage() {
  // Default persona with more professional description and updated system prompt
  const defaultPersona: Persona = {
    id: "default",
    name: "Customer Support Agent",
    description: "A helpful customer support agent that assists customers with inquiries about products and services.",
    systemPrompt: "You are a helpful customer support agent for our company. You should be friendly, professional, and concise. Always try to address the customer's concerns directly, and offer solutions when possible. If you don't know the answer, be honest and suggest ways the customer can get more help. Use the knowledge base documents to provide accurate information about our products and services.",
    tone: "professional",
    model: "gpt-4",
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
      lastUpdated: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
      id: "technical",
      name: "Technical Support Specialist",
      description: "A knowledgeable technical support specialist that helps troubleshoot issues and provide technical guidance.",
      systemPrompt: "You are a technical support specialist for our company. You help customers troubleshoot issues with our products and provide technical guidance. Be patient and thorough in your explanations. Walk customers through solutions step by step. Use technical terminology when appropriate, but be prepared to explain concepts in simpler terms when needed. Reference the knowledge base for accurate technical specifications and troubleshooting guides.",
      tone: "technical",
      model: "gpt-4",
      lastUpdated: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    }
  ]);
  
  const [activePersona, setActivePersona] = useState<Persona>(defaultPersona);
  const [editedPersona, setEditedPersona] = useState<Persona>(defaultPersona);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationOptions, setShowGenerationOptions] = useState(false);
  const [generationSettings, setGenerationSettings] = useState({
    tone: "helpful",
    model: "gpt-4",
  });

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.01, 
      boxShadow: "0px 0px 15px hsl(var(--primary) / 0.2)", 
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.99 }
  };

  const listItemVariants = {
    hover: { 
      backgroundColor: "hsl(var(--primary) / 0.1)", 
      x: 2, 
      transition: { duration: 0.15 } 
    },
    tap: { scale: 0.98 }
  };

  // Event handlers
  const handlePersonaChange = (persona: Persona) => {
    if (isEditing) {
      const confirmed = window.confirm("You have unsaved changes. Are you sure you want to switch personas?");
      if (!confirmed) return;
    }
    
    setActivePersona(persona);
    setEditedPersona(persona);
    setIsEditing(false);
    toast.success(`Switched to ${persona.name} persona`);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Discard changes
      setEditedPersona(activePersona);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedPersona(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setEditedPersona(prev => ({ ...prev, [name]: value }));
  };

  const handleSavePersona = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update with timestamp
      const updatedPersona = {
        ...editedPersona,
        lastUpdated: new Date().toISOString()
      };
      
      // Update active persona
      setActivePersona(updatedPersona);
      
      // Update personas list
      setPersonas(prev => 
        prev.map(p => p.id === updatedPersona.id ? updatedPersona : p)
      );
      
      setIsEditing(false);
      setIsSaving(false);
      toast.success("Persona saved successfully", {
        description: `${updatedPersona.name} has been updated.`,
        action: {
          label: "View",
          onClick: () => console.log("Viewed persona details")
        }
      });
    }, 800);
  };

  const handleCreateNewPersona = () => {
    const newId = `persona-${Date.now()}`;
    const newPersona: Persona = {
      id: newId,
      name: "New Persona",
      description: "Description of your new AI persona",
      systemPrompt: "You are an AI assistant helping users with their questions.",
      tone: "professional",
      model: "gpt-4",
      lastUpdated: new Date().toISOString(),
    };
    
    setPersonas(prev => [...prev, newPersona]);
    setActivePersona(newPersona);
    setEditedPersona(newPersona);
    setIsEditing(true);
    toast.success("Created new persona");
  };

  const handleDeletePersona = (id: string) => {
    if (personas.length <= 1) {
      toast.error("Cannot delete the only persona");
      return;
    }
    
    // Ask for confirmation
    const personaToDelete = personas.find(p => p.id === id);
    const confirmed = window.confirm(`Are you sure you want to delete the persona "${personaToDelete?.name}"? This action cannot be undone.`);
    
    if (!confirmed) return;
    
    setPersonas(prev => prev.filter(p => p.id !== id));
    
    // If we're deleting the active persona, switch to the first available
    if (activePersona.id === id) {
      const remainingPersona = personas.find(p => p.id !== id) || personas[0];
      setActivePersona(remainingPersona);
      setEditedPersona(remainingPersona);
    }
    
    toast.success("Persona deleted", {
      description: `"${personaToDelete?.name}" has been removed.`
    });
  };

  const handleGenerateSystemPrompt = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      // Create tone adjective based on selected tone
      const toneAdjective = editedPersona.tone === 'professional' ? 'professional and courteous' : 
                            editedPersona.tone === 'friendly' ? 'friendly and approachable' : 
                            editedPersona.tone === 'technical' ? 'technical and precise' :
                            editedPersona.tone === 'persuasive' ? 'persuasive and compelling' :
                            editedPersona.tone === 'empathetic' ? 'empathetic and understanding' :
                            editedPersona.tone === 'formal' ? 'formal and respectful' :
                            'casual and conversational';
      
      // Create an enhanced system prompt
      const newPrompt = `You are a ${toneAdjective} AI assistant named "${editedPersona.name}". ${editedPersona.description} 

When interacting with users:
- Maintain a ${editedPersona.tone} tone throughout the conversation
- Provide accurate information based on the knowledge base documents
- Be helpful and concise in your responses
- If you don't know the answer, be honest about it
- Use the user's name when provided
- Reference specific information from the knowledge base when answering questions
- Respond in a way that best represents our brand values and voice

Your primary goal is to provide exceptional assistance while representing the brand effectively.

Knowledge Constraints:
- Only provide information that is factually accurate and based on the provided knowledge
- When uncertain, acknowledge the limitations and suggest appropriate next steps
- Never share sensitive information about pricing or unreleased features unless explicitly provided in the knowledge base

${editedPersona.tone === 'technical' ? 'Technical Guidelines:\n- Use precise terminology when appropriate\n- Provide step-by-step instructions for complex tasks\n- Link to relevant documentation when available' : ''}
${editedPersona.tone === 'persuasive' ? 'Sales Guidelines:\n- Focus on benefits rather than features\n- Address customer needs and pain points\n- Present options based on value, not just price' : ''}
${editedPersona.tone === 'empathetic' ? 'Support Guidelines:\n- Acknowledge user frustrations\n- Show understanding before offering solutions\n- Focus on resolution and positive outcomes' : ''}`;

      setEditedPersona(prev => ({ ...prev, systemPrompt: newPrompt }));
      setIsGenerating(false);
      setShowGenerationOptions(false);
      
      toast.success("Generated new system prompt", {
        description: "AI-generated prompt based on your persona settings"
      });
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };
  
  // Duplicate persona function
  const handleDuplicatePersona = (persona: Persona) => {
    const newId = `${persona.id}-copy-${Date.now()}`;
    const duplicatedPersona: Persona = {
      ...persona,
      id: newId,
      name: `${persona.name} (Copy)`,
      lastUpdated: new Date().toISOString(),
    };
    
    setPersonas(prev => [...prev, duplicatedPersona]);
    toast.success(`Duplicated "${persona.name}"`, {
      description: "New copy created and added to your personas."
    });
  };
  
  // Sync to channels function
  const handleSyncToChannels = (persona: Persona) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)), 
      {
        loading: `Syncing "${persona.name}" to connected channels...`,
        success: `"${persona.name}" successfully synced to all channels`,
        error: "Failed to sync persona to channels"
      }
    );
  };

  // Test in playground function  
  const handleTestInPlayground = (persona: Persona) => {
    toast.success(`Opening "${persona.name}" in Playground`, {
      description: "Redirecting to test environment..."
    });
    // In real implementation, this would navigate to the playground with the selected persona
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">AI Persona Configuration</h1>
            </div>
            <p className="text-muted-foreground">
              Customize how your AI assistant communicates with users across all channels
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Sync All Personas to Channels
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Push all persona configurations to connected channels</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="default" size="sm" className="gap-1" asChild>
                  <Link href="/dashboard/playground">
                    <Play className="h-3.5 w-3.5" />
                    Test in Playground
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Test your personas in a live conversation</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {/* Left Pane - Persona Management */}
          <motion.div 
            className="md:col-span-1 lg:col-span-1 xl:col-span-1 min-w-[250px]" 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            <Card className="h-full shadow-md border-primary/10 hover:border-primary/20 transition-all duration-300 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Personas
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={handleCreateNewPersona}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Create a new persona</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
                <CardDescription>Select or create an AI persona</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-1">
                <ScrollArea className="h-[340px] pr-4">
                  <div className="space-y-2">
                    <AnimatePresence>
                      {personas.map((persona) => (
                        <motion.div
                          key={persona.id}
                          variants={listItemVariants}
                          whileHover="hover"
                          whileTap="tap"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-150 ease-in-out ${
                            activePersona.id === persona.id 
                              ? "font-medium border border-primary/20 bg-primary/10" 
                              : "border border-transparent hover:border-border hover:bg-accent"
                          }`}
                          onClick={() => handlePersonaChange(persona)}
                        >
                          <Avatar className="h-9 w-9 border border-border flex-shrink-0">
                            <AvatarFallback className={activePersona.id === persona.id ? "bg-primary text-primary-foreground" : "bg-muted"}>
                              {persona.name.substring(0, 1).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0 overflow-hidden">
                            <div className="flex items-center justify-between w-full">
                              <p className="text-sm font-medium truncate max-w-[100px]">{persona.name}</p>
                              {activePersona.id === persona.id && (
                                <motion.div 
                                  initial={{opacity:0, scale:0.8}} 
                                  animate={{opacity:1, scale:1}} 
                                  transition={{duration:0.2}}
                                  className="ml-1 flex-shrink-0"
                                >
                                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 flex items-center gap-0.5">
                                    <Check className="h-3 w-3" /> 
                                    <span className="text-[10px]">Active</span>
                                  </Badge>
                                </motion.div>
                              )}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground gap-1 mt-0.5 w-full">
                              <span className="capitalize truncate max-w-[70px]">{persona.tone} tone</span>
                              <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground/40 flex-shrink-0"></span>
                              <span className="truncate max-w-[60px]">{persona.model}</span>
                            </div>
                          </div>
                          
                          {activePersona.id === persona.id && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-70 hover:opacity-100">
                                  <MoreHorizontal className="h-3.5 w-3.5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem onClick={(e) => {
                                  e.stopPropagation();
                                  setIsEditing(true);
                                }}>
                                  <Pencil className="mr-2 h-3.5 w-3.5" />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => {
                                  e.stopPropagation();
                                  handleDuplicatePersona(persona);
                                }}>
                                  <Copy className="mr-2 h-3.5 w-3.5" />
                                  <span>Duplicate</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeletePersona(persona.id);
                                }} disabled={persona.id === "default"} className="text-destructive focus:text-destructive">
                                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              </CardContent>
              
              <CardFooter className="flex justify-between py-4">
                <Button 
                  variant="default" 
                  className="w-full gap-1"
                  onClick={handleCreateNewPersona}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Create New Persona
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Main Content / Editor */}
          {/* Right Pane - Persona Editor */}
          <motion.div 
            className="md:col-span-2 lg:col-span-3 xl:col-span-3 w-full" 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="h-full shadow-md border-primary/10 overflow-hidden">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-2 border-b">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className={`p-1.5 rounded-md ${isEditing ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" : "bg-primary/10 text-primary"}`}>
                      {isEditing ? <Edit3 className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <span>
                      {isEditing ? `Editing: ${editedPersona.name}` : activePersona.name}
                    </span>
                    {!isEditing && (
                      <Badge variant="outline" className="ml-2 text-xs bg-muted">
                        {activePersona.model}
                      </Badge>
                    )}
                  </CardTitle>
                  {!isEditing && (
                    <CardDescription className="mt-1">{activePersona.description}</CardDescription>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" size="sm" onClick={handleEditToggle} className="gap-1">
                        <X className="h-3.5 w-3.5" />
                        Cancel
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        onClick={handleSavePersona} 
                        className="gap-1"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-3.5 w-3.5" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleDuplicatePersona(activePersona)}>
                            <Copy className="mr-2 h-3.5 w-3.5" />
                            <span>Duplicate Persona</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSyncToChannels(activePersona)}>
                            <Share2 className="mr-2 h-3.5 w-3.5" />
                            <span>Sync to Channels</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTestInPlayground(activePersona)}>
                            <Play className="mr-2 h-3.5 w-3.5" />
                            <span>Test in Playground</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeletePersona(activePersona.id)} disabled={activePersona.id === "default"} className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            <span>Delete Persona</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="default" size="sm" onClick={handleEditToggle} className="gap-1">
                        <Edit3 className="h-3.5 w-3.5" />
                        Edit Persona
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          value={editedPersona.name}
                          onChange={handleInputChange}
                          className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="model" className="text-sm font-medium">
                          AI Model
                        </label>
                        <select
                          id="model"
                          name="model"
                          value={editedPersona.model}
                          onChange={handleInputChange}
                          className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                        >
                          {modelOptions.map(option => (
                            <option key={option.value} value={option.value} className="bg-background">
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Description
                      </label>
                      <input
                        id="description"
                        name="description"
                        value={editedPersona.description}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="tone" className="text-sm font-medium">
                        Communication Tone
                      </label>
                      <select
                        id="tone"
                        name="tone"
                        value={editedPersona.tone}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                      >
                        {toneOptions.map(option => (
                          <option key={option.value} value={option.value} className="bg-background">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="systemPrompt" className="text-sm font-medium">
                          System Prompt
                        </label>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(editedPersona.systemPrompt)}
                          >
                            <Copy className="h-3.5 w-3.5 mr-1" />
                            Copy
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleGenerateSystemPrompt}
                          >
                            <Sparkles className="h-3.5 w-3.5 mr-1" />
                            Generate
                          </Button>
                        </div>
                      </div>
                      <div className="relative">
                        <textarea
                          id="systemPrompt"
                          name="systemPrompt"
                          rows={10}
                          className="w-full p-3 border rounded-md bg-background/70 border-border focus:ring-2 focus:ring-primary focus:border-primary transition-shadow font-mono text-sm"
                          value={editedPersona.systemPrompt}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Enter system instructions for how the AI should behave, communicate, and respond to users..."
                        />
                        {!isEditing && editedPersona.systemPrompt.length > 100 && (
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleGenerateSystemPrompt} 
                        disabled={!isEditing}
                        className="mt-2 text-primary hover:text-primary/80 disabled:text-muted-foreground"
                      >
                        <Sparkles className="mr-2 h-4 w-4" /> Generate with AI
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="tone" className="text-sm font-medium flex items-center gap-1.5">
                            <BrainCircuit className="h-3.5 w-3.5 text-muted-foreground" />
                            Tone of Voice
                          </Label>
                        </div>
                        <select
                          id="tone"
                          name="tone"
                          className="w-full p-2 border rounded-md bg-background/70 border-border focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
                          value={editedPersona.tone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        >
                          {toneOptions.map(option => (
                            <option key={option.value} value={option.value} className="bg-background">
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {isEditing && <p className="text-xs text-muted-foreground mt-1">Sets the overall communication style of the AI.</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="model" className="text-sm font-medium flex items-center gap-1.5">
                            <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                            AI Model
                          </Label>
                          {isEditing && <Badge variant="outline" className="font-normal bg-blue-50 text-blue-600 border-blue-200">Advanced</Badge>}
                        </div>
                        <select
                          id="model"
                          name="model"
                          className="w-full p-2 border rounded-md bg-background/70 border-border focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
                          value={editedPersona.model}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        >
                          {modelOptions.map(option => (
                            <option key={option.value} value={option.value} className="bg-background">
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {isEditing && <p className="text-xs text-muted-foreground mt-1">Select the AI model that powers this persona.</p>}
                      </div>
                    </div>
                  </div> 
                ) : (
                  // Display Mode
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs text-muted-foreground uppercase mb-1">Description</h3>
                      <p className="text-foreground/90 whitespace-pre-wrap break-words">{activePersona.description}</p>
                    </div>
                    <div>
                      <h3 className="text-xs text-muted-foreground uppercase mb-1 flex items-center">
                        System Prompt
                        <Button variant="ghost" size="icon" className="h-7 w-7 ml-1" onClick={() => copyToClipboard(activePersona.systemPrompt)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </h3>
                      <div className="relative p-4 border rounded-md bg-black/20 dark:bg-black/40 max-h-60 overflow-y-auto text-sm font-mono text-foreground/80 whitespace-pre-wrap break-words">
                        {activePersona.systemPrompt}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-xs text-muted-foreground uppercase mb-1">Tone of Voice</h3>
                        <p className="text-foreground/90 capitalize">{activePersona.tone}</p>
                      </div>
                      <div>
                        <h3 className="text-xs text-muted-foreground uppercase mb-1">AI Model</h3>
                        <p className="text-foreground/90">{modelOptions.find(m => m.value === activePersona.model)?.label || activePersona.model}</p>
                      </div>
                    </div>
                  </div>
                )}
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="w-full flex flex-col sm:flex-row items-center gap-2 justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
                    Last updated: {formatDate(activePersona.lastUpdated)}
                  </div>
                  <div className="flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1" onClick={() => handleTestInPlayground(activePersona)} asChild>
                          <Link href="/dashboard/playground">
                            <Play className="h-3.5 w-3.5" />
                            Test in Playground
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Test this persona in a live conversation</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1" onClick={() => handleSyncToChannels(activePersona)}>
                          <Share2 className="h-3.5 w-3.5" />
                          Sync to Channels
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Push this persona configuration to all connected channels</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
}
