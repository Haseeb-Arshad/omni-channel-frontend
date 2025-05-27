"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bot, Check, Edit3, Trash2, MessageSquare } from "lucide-react"
import { Persona } from "@/types/persona"
import Link from "next/link"

interface PersonaCardProps {
  persona: Persona
  isActive: boolean
  onEdit: () => void
  onDelete: () => void
  onActivate: () => void
}

export default function PersonaCard({ 
  persona, 
  isActive, 
  onEdit, 
  onDelete, 
  onActivate 
}: PersonaCardProps) {
  // Avatar icon based on persona type
  const getAvatarIcon = () => {
    return <Bot className="h-5 w-5" />
  }
  
  // Get color style from persona
  const getCardStyle = () => {
    return {
      borderColor: isActive ? persona.primary_color || 'hsl(var(--primary))' : 'hsl(var(--border))',
      boxShadow: isActive ? `0 0 0 1px ${persona.primary_color || 'hsl(var(--primary))'}, 0 4px 10px rgba(0, 0, 0, 0.1)` : ''
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <Card className="h-full overflow-hidden" style={getCardStyle()}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Avatar className={`h-9 w-9 ${isActive ? 'ring-2 ring-primary' : ''}`}>
                <AvatarFallback style={{ 
                  backgroundColor: isActive ? persona.primary_color || 'hsl(var(--primary))' : 'hsl(var(--muted))' 
                }}>
                  {persona.name.substring(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{persona.name}</h3>
                <p className="text-xs text-muted-foreground">{persona.tone} tone • {persona.model}</p>
              </div>
            </div>
            {isActive && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Check className="h-3 w-3 mr-1" /> Active
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="text-sm">
          <p className="line-clamp-2 text-muted-foreground">{persona.description}</p>
          
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="text-xs">
              <span className="text-muted-foreground">Style:</span>{" "}
              <span className="font-medium">{persona.response_style || "Balanced"}</span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Depth:</span>{" "}
              <span className="font-medium">{persona.knowledge_depth || "Comprehensive"}</span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Temperature:</span>{" "}
              <span className="font-medium">{persona.temperature || 0.7}</span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Interaction:</span>{" "}
              <span className="font-medium">{persona.interaction_style || "Conversational"}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-2 pt-2">
          {isActive ? (
            <>
              <Button variant="outline" size="sm" className="w-full" onClick={onEdit}>
                <Edit3 className="h-3.5 w-3.5 mr-1.5" /> Edit
              </Button>
              <Button variant="default" size="sm" className="w-full" asChild>
                <Link href="/dashboard/playground">
                  <MessageSquare className="h-3.5 w-3.5 mr-1.5" /> Try
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-destructive hover:text-destructive"
                onClick={onDelete}
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
              </Button>
              <Button variant="default" size="sm" className="w-full" onClick={onActivate}>
                <Check className="h-3.5 w-3.5 mr-1.5" /> Activate
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
