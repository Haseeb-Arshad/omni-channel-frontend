"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Save, X, Calendar, Globe, Lock, Clock, CheckCircle2,
  AlertCircle, User, Tag, ChevronDown, Eye, FileText
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Define article categories
const categories = [
  "Guides",
  "Channels",
  "AI",
  "Support",
  "Email",
  "Security",
  "Settings",
  "General"
];

// Define common tags
const commonTags = [
  "Getting Started",
  "Setup",
  "Integration",
  "Troubleshooting",
  "Best Practices",
  "Customization",
  "FAQ",
  "Tutorial"
];

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [articleTags, setArticleTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [visibility, setVisibility] = useState("External");
  const [enableAI, setEnableAI] = useState(true);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handle creating a new article
  const handleSave = (status: "Draft" | "Published" | "Pending Approval") => {
    setIsSaving(true);
    
    // Simulating API call to save the article
    setTimeout(() => {
      setIsSaving(false);
      
      // In a real app, you'd save the article to the database here
      // and then redirect to the article view or list page
      router.push("/kb");
    }, 1000);
  };

  // Handle adding a tag
  const handleAddTag = (tag: string = tagInput) => {
    if (tag && !articleTags.includes(tag)) {
      setArticleTags([...articleTags, tag]);
      setTagInput("");
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    setArticleTags(articleTags.filter(t => t !== tag));
  };

  // Handle tag input key press
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">New Article</h1>
          <p className="text-muted-foreground">
            Create a new knowledge base article
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Edit
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/kb")}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSave("Draft")}
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave("Published")}
            disabled={isSaving || !title || !content}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="p-0 overflow-hidden">
            <div className="p-4 border-b">
              <input
                type="text"
                placeholder="Article Title"
                className="w-full text-xl font-semibold border-0 focus:outline-none focus:ring-0 p-0"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className={showPreview ? "hidden" : "block"}>
              <div className="p-4 border-b bg-muted/30">
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <span className="font-bold">B</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <span className="italic">I</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <span className="font-mono">{'<>'}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <span className="font-mono">#</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <span className="font-mono">-</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <span className="font-mono">[ ]</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <span className="font-mono">🔗</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <span className="font-mono">📷</span>
                  </Button>
                </div>
              </div>
              <textarea
                placeholder="Write your article content here... (Supports Markdown formatting)"
                className="w-full min-h-[400px] p-4 resize-none focus:outline-none text-sm"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            
            {showPreview && (
              <div className="p-6 prose prose-sm max-w-none">
                {/* In a real app, you would use a markdown parser like react-markdown */}
                <div className="text-sm">
                  <h2 className="text-xl font-bold mt-0 mb-4">{title || "Article Title"}</h2>
                  {content ? (
                    <pre className="whitespace-pre-wrap">{content}</pre>
                  ) : (
                    <p className="text-muted-foreground italic">No content to preview</p>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-3">Article Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Category
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between rounded-md border p-2 text-sm"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  >
                    {category || "Select a category"}
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>
                  
                  {showCategoryDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-md z-10 max-h-48 overflow-y-auto">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                          onClick={() => {
                            setCategory(cat);
                            setShowCategoryDropdown(false);
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Tags
                </label>
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder="Add a tag"
                    className="w-full rounded-md border p-2 text-sm pr-9"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    onFocus={() => setShowTagsDropdown(true)}
                    onBlur={() => setTimeout(() => setShowTagsDropdown(false), 200)}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => handleAddTag()}
                    disabled={!tagInput}
                  >
                    <Tag className="h-4 w-4 text-muted-foreground" />
                  </button>
                  
                  {showTagsDropdown && tagInput && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-md z-10 max-h-48 overflow-y-auto">
                      {commonTags
                        .filter(tag => tag.toLowerCase().includes(tagInput.toLowerCase()))
                        .map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                            onClick={() => handleAddTag(tag)}
                          >
                            {tag}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {articleTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="flex items-center gap-1">
                      {tag}
                      <button 
                        className="h-3 w-3 rounded-full bg-muted flex items-center justify-center"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-2 w-2" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Visibility
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className={`flex-1 rounded-md border p-2 text-sm flex items-center justify-center ${visibility === "External" ? "bg-primary/10 border-primary" : ""}`}
                    onClick={() => setVisibility("External")}
                  >
                    <Globe className="h-4 w-4 mr-1.5" />
                    External
                  </button>
                  <button
                    type="button"
                    className={`flex-1 rounded-md border p-2 text-sm flex items-center justify-center ${visibility === "Internal" ? "bg-primary/10 border-primary" : ""}`}
                    onClick={() => setVisibility("Internal")}
                  >
                    <Lock className="h-4 w-4 mr-1.5" />
                    Internal
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {visibility === "External" 
                    ? "This article will be visible to customers in the self-service portal."
                    : "This article will only be visible to agents and AI assistants."
                  }
                </p>
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  AI Integration
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableAI"
                    checked={enableAI}
                    onChange={(e) => setEnableAI(e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="enableAI" className="text-sm">
                    Enable for AI assistants
                  </label>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  AI assistants will use this article to answer customer questions.
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-3">Workflow Information</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Created Date
                </div>
                <span>Today</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-muted-foreground">
                  <User className="h-4 w-4 mr-2" />
                  Author
                </div>
                <span>John Doe</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-muted-foreground">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Status
                </div>
                <Badge className="bg-gray-500 text-white hover:bg-gray-600">Draft</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  Scheduled Publish
                </div>
                <button
                  type="button"
                  className="text-primary text-xs"
                >
                  Set Schedule
                </button>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-3">Version History</h3>
            
            <div className="text-sm text-center text-muted-foreground py-3">
              No versions yet
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
