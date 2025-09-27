"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { 
  Wand2, 
  Save, 
  XCircle, 
  HelpCircle, 
  Info, 
  Palette 
} from "lucide-react"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover"
import { 
  Persona, 
  PersonaInput, 
  MODEL_OPTIONS, 
  TONE_OPTIONS,
  RESPONSE_STYLE_OPTIONS,
  KNOWLEDGE_DEPTH_OPTIONS,
  INTERACTION_STYLE_OPTIONS,
  AVATAR_OPTIONS
} from "@/types/persona"
import { toast } from "sonner"

interface PersonaFormProps {
  initialData?: Partial<Persona>
  onSave: (personaData: PersonaInput) => Promise<any>
  onCancel: () => void
}

export default function PersonaForm({
  initialData,
  onSave,
  onCancel
}: PersonaFormProps) {
  const [formData, setFormData] = useState<PersonaInput>({
    name: initialData?.name || "New Persona",
    description: initialData?.description || "Description of this AI persona",
    system_prompt: initialData?.system_prompt || "You are a helpful AI assistant that provides accurate and useful information.",
    tone: initialData?.tone || "professional",
    model: initialData?.model || "gpt-4o",
    temperature: initialData?.temperature || 0.7,
    response_style: initialData?.response_style || "balanced",
    knowledge_depth: initialData?.knowledge_depth || "comprehensive",
    interaction_style: initialData?.interaction_style || "conversational",
    avatar: initialData?.avatar || "default",
    primary_color: initialData?.primary_color || "#2563eb",
    accent_color: initialData?.accent_color || "#3b82f6"
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleTemperatureChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, temperature: value[0] }))
  }
  
  const handleColorChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const generateSystemPrompt = () => {
    // Get tone adjective based on selected tone
    const toneAdjective = TONE_OPTIONS.find(t => t.value === formData.tone)?.label.toLowerCase() || "professional"
    
    // Generate a system prompt based on form data
    const newPrompt = `You are a ${toneAdjective} AI assistant named "${formData.name}". ${formData.description}

When interacting with users:
- Maintain a ${formData.tone} tone throughout the conversation
- Provide ${formData.knowledge_depth} information based on the knowledge base documents
- Be ${formData.response_style} in your responses
- Be ${formData.interaction_style} in your conversation style
- If you don't know the answer, be honest about it
- Use the user's name when provided
- Reference specific information from the knowledge base when answering questions

Your primary goal is to provide exceptional assistance while representing the brand effectively.`

    setFormData(prev => ({ ...prev, system_prompt: newPrompt }))
    toast.success("Generated new system prompt")
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await onSave(formData)
    } catch (error) {
      console.error("Error saving persona:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{initialData?.id ? "Edit Persona" : "Create New Persona"}</span>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                  <XCircle className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button type="submit" variant="default" size="sm" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-1" /> Save Persona
                    </>
                  )}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Basic Information */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="e.g. Customer Support Agent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model" className="text-sm font-medium">
                  AI Model
                </Label>
                <Select 
                  value={formData.model} 
                  onValueChange={(value) => handleSelectChange("model", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {MODEL_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full"
                placeholder="A brief description of this AI persona"
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="tone" className="text-sm font-medium flex items-center gap-1">
                  Tone
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                        <HelpCircle className="h-3 w-3" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60">
                      <p className="text-xs">How the AI should sound in conversations</p>
                    </PopoverContent>
                  </Popover>
                </Label>
                <Select 
                  value={formData.tone} 
                  onValueChange={(value) => handleSelectChange("tone", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TONE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="response_style" className="text-sm font-medium flex items-center gap-1">
                  Response Style
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                        <HelpCircle className="h-3 w-3" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60">
                      <p className="text-xs">How detailed the AI's responses should be</p>
                    </PopoverContent>
                  </Popover>
                </Label>
                <Select 
                  value={formData.response_style} 
                  onValueChange={(value) => handleSelectChange("response_style", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {RESPONSE_STYLE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="knowledge_depth" className="text-sm font-medium flex items-center gap-1">
                  Knowledge Depth
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                        <HelpCircle className="h-3 w-3" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60">
                      <p className="text-xs">How comprehensive the AI's knowledge should be</p>
                    </PopoverContent>
                  </Popover>
                </Label>
                <Select 
                  value={formData.knowledge_depth} 
                  onValueChange={(value) => handleSelectChange("knowledge_depth", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select depth" />
                  </SelectTrigger>
                  <SelectContent>
                    {KNOWLEDGE_DEPTH_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="temperature" className="text-sm font-medium flex items-center gap-1">
                  Temperature
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                        <HelpCircle className="h-3 w-3" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60">
                      <p className="text-xs">Controls randomness: Lower values are more deterministic, higher values are more creative</p>
                    </PopoverContent>
                  </Popover>
                </Label>
                <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                  {formData.temperature}
                </span>
              </div>
              <Slider
                defaultValue={[formData.temperature]}
                max={1}
                min={0}
                step={0.1}
                onValueChange={handleTemperatureChange}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Precise</span>
                <span>Balanced</span>
                <span>Creative</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="system_prompt" className="text-sm font-medium">
                  System Prompt
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateSystemPrompt}
                  className="gap-1"
                >
                  <Wand2 className="h-3.5 w-3.5" /> Generate
                </Button>
              </div>
              <Textarea
                id="system_prompt"
                name="system_prompt"
                value={formData.system_prompt}
                onChange={handleInputChange}
                className="min-h-[150px] font-mono text-xs"
                placeholder="Instructions for how the AI should behave"
              />
              <p className="text-xs text-muted-foreground">
                <Info className="h-3 w-3 inline mr-1" />
                The system prompt defines how your AI assistant behaves and responds to users
              </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="interaction_style" className="text-sm font-medium">
                  Interaction Style
                </Label>
                <Select 
                  value={formData.interaction_style} 
                  onValueChange={(value) => handleSelectChange("interaction_style", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {INTERACTION_STYLE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="primary_color" className="text-sm font-medium flex items-center gap-1">
                  Primary Color
                  <Palette className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                </Label>
                <div className="flex items-center gap-2">
                  <div 
                    className="h-9 w-9 rounded-md border"
                    style={{ backgroundColor: formData.primary_color }}
                  />
                  <Input
                    id="primary_color"
                    name="primary_color"
                    type="color"
                    value={formData.primary_color}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accent_color" className="text-sm font-medium">
                  Accent Color
                </Label>
                <div className="flex items-center gap-2">
                  <div 
                    className="h-9 w-9 rounded-md border"
                    style={{ backgroundColor: formData.accent_color }}
                  />
                  <Input
                    id="accent_color"
                    name="accent_color"
                    type="color"
                    value={formData.accent_color}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Persona"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </motion.div>
  )
}
