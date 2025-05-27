"use client";

import { useState } from "react";
import { 
  Clock, Tag, User, AlertCircle, RefreshCw,
  ChevronRight, X, MessageSquare, CheckCircle, 
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Conversation } from "./conversation-list-item";

interface ContextPanelProps {
  conversation: Conversation;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onAssign: (userId: string | null) => void;
  onSaveNote: (note: string) => void;
}

export function ContextPanel({
  conversation,
  onAddTag,
  onRemoveTag,
  onAssign,
  onSaveNote
}: ContextPanelProps) {
  const [tagInput, setTagInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [showAssignMenu, setShowAssignMenu] = useState(false);
  
  // Mock team members for assignment
  const teamMembers = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Alex Johnson" }
  ];

  // Get sentiment analysis data (mock for now)
  const sentimentData = {
    score: 60, // 0-100, where 0 is negative, 50 is neutral, 100 is positive
    label: "Neutral"
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      onAddTag(tagInput.trim());
      setTagInput("");
      setShowTagInput(false);
    }
  };

  const handleAssign = (userId: string | null) => {
    onAssign(userId);
    setShowAssignMenu(false);
  };

  const handleSaveNote = () => {
    if (noteInput.trim()) {
      onSaveNote(noteInput.trim());
      setNoteInput("");
    }
  };

  const getSentimentColor = () => {
    if (sentimentData.score > 70) return "bg-green-500";
    if (sentimentData.score < 30) return "bg-red-500";
    return "bg-amber-500";
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-medium mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              {conversation.contact.avatar ? (
                <img 
                  src={conversation.contact.avatar}
                  alt={conversation.contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <span className="text-sm font-medium">
                  {conversation.contact.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div>
              <h4 className="font-medium">{conversation.contact.name}</h4>
              <p className="text-sm text-muted-foreground">Customer</p>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-muted-foreground mb-1">Email</p>
            <p className="text-sm">{conversation.contact.email}</p>
          </div>
          
          <div>
            <p className="text-xs text-muted-foreground mb-1">Phone</p>
            <p className="text-sm">{conversation.contact.phone}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-b">
        <h3 className="font-medium mb-3">Conversation Details</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">Status</p>
            <div className="flex items-center">
              <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                Active
              </Badge>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">SLA</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>Response time</span>
                <span className="font-medium text-amber-500">30m remaining</span>
              </div>
              <Progress value={60} className="h-1.5" />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <p className="text-xs text-muted-foreground">Tags</p>
              {showTagInput ? (
                <div className="flex items-center space-x-1">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="text-xs p-1 border rounded"
                    placeholder="Add tag..."
                    autoFocus
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleAddTag();
                    }}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0" 
                    onClick={() => setShowTagInput(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0" 
                    onClick={handleAddTag}
                  >
                    <CheckCircle className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm" className="h-5 text-xs" onClick={() => setShowTagInput(true)}>
                  <Tag className="h-3 w-3 mr-1" />
                  Add Tag
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {conversation.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="flex items-center gap-1">
                  {tag}
                  <button 
                    className="h-3 w-3 rounded-full bg-muted flex items-center justify-center"
                    onClick={() => onRemoveTag(tag)}
                  >
                    <X className="h-2 w-2" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <p className="text-xs text-muted-foreground">Assigned To</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 text-xs"
                onClick={() => setShowAssignMenu(!showAssignMenu)}
              >
                <User className="h-3 w-3 mr-1" />
                Assign
              </Button>
            </div>
            
            {showAssignMenu ? (
              <div className="border rounded-md p-1 text-sm space-y-1">
                {teamMembers.map(member => (
                  <button
                    key={member.id}
                    className="w-full text-left px-2 py-1 rounded hover:bg-muted flex items-center"
                    onClick={() => handleAssign(member.id)}
                  >
                    <div className="w-5 h-5 rounded-full bg-muted/70 flex items-center justify-center mr-2">
                      <span className="text-xs">{member.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    {member.name}
                  </button>
                ))}
                <button
                  className="w-full text-left px-2 py-1 rounded hover:bg-muted flex items-center text-muted-foreground"
                  onClick={() => handleAssign(null)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Unassign
                </button>
              </div>
            ) : (
              conversation.assignedTo ? (
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-2">
                    <span className="text-xs">{conversation.assignedTo.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <span className="text-sm">{conversation.assignedTo}</span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Unassigned</span>
              )
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">AI Insights</h3>
          <Button variant="ghost" size="sm" className="h-7">
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Update
          </Button>
        </div>
        
        <div className="space-y-3">
          <Card className="p-3">
            <h4 className="text-xs font-medium flex items-center mb-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-amber-500 mr-1" />
              Sentiment Analysis
            </h4>
            <div className="flex items-center justify-between">
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className={`${getSentimentColor()} h-1.5 rounded-full`} style={{ width: `${sentimentData.score}%` }}></div>
              </div>
              <span className="text-xs font-medium ml-3 whitespace-nowrap">{sentimentData.label}</span>
            </div>
          </Card>
          
          <Card className="p-3">
            <h4 className="text-xs font-medium flex items-center mb-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-primary mr-1" />
              Conversation Summary
            </h4>
            <p className="text-xs text-muted-foreground">Customer is inquiring about a delayed order #12345 and requesting tracking information once shipped.</p>
          </Card>
          
          <Button className="w-full" variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Suggested Replies
          </Button>
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Internal Notes</h3>
          <Button variant="ghost" size="sm" className="h-7">
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
        
        <div className="rounded-lg border p-3 bg-muted/30">
          <textarea
            placeholder="Add an internal note..."
            className="w-full bg-transparent resize-none focus:outline-none text-sm min-h-[60px]"
            rows={3}
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <Button 
              size="sm" 
              className="mt-2"
              onClick={handleSaveNote}
              disabled={!noteInput.trim()}
            >
              Save Note
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
