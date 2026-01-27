"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Save, X, Calendar, Globe, Lock, Clock, CheckCircle2,
  AlertCircle, User, Tag, ChevronDown, Eye, FileText,
  History, RotateCcw
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Mock data for existing articles
const mockArticles = {
  "1": {
    id: "1",
    title: "Getting Started with OmniChannel",
    category: "Guides",
    content: "# Getting Started with OmniChannel\n\nWelcome to OmniChannel! This guide will help you set up your account and start managing your customer conversations across multiple channels.\n\n## What is OmniChannel?\n\nOmniChannel is a unified customer engagement platform that lets you manage conversations from multiple channels in one place. Whether your customers reach out via email, chat, SMS, or social media, you can view and respond to all messages from a single inbox.\n\n## Key Features\n\n- **Unified Inbox**: View and respond to all customer messages in one place\n- **AI Assistance**: Get AI-powered suggestions and automations\n- **Knowledge Base**: Create and manage help articles for customers and agents\n- **Analytics**: Track performance and customer satisfaction metrics\n\n## Setting Up Your Account\n\n1. **Connect Channels**: Navigate to the Channels section to connect your email, chat, and social media accounts\n2. **Create Team Members**: Add team members and assign roles in the Settings section\n3. **Customize Workflows**: Set up automation rules for message routing and quick responses\n4. **Build Your Knowledge Base**: Create helpful articles that can be shared with customers or used by AI assistants\n\nWe're excited to have you on board!",
    status: "Published",
    tags: ["Getting Started", "Onboarding"],
    lastUpdated: "2025-05-15T10:30:00Z",
    author: "John Doe",
    views: 1240,
    helpful: 45,
    notHelpful: 5,
    visibility: "External",
    aiEnabled: true,
    versions: [
      { id: "v1", timestamp: "2025-05-10T08:15:00Z", author: "John Doe" },
      { id: "v2", timestamp: "2025-05-15T10:30:00Z", author: "John Doe" }
    ]
  },
  "2": {
    id: "2",
    title: "How to Connect Your WhatsApp Business Account",
    category: "Channels",
    content: "# Connecting Your WhatsApp Business Account\n\nThis guide walks you through the process of connecting your WhatsApp Business account to OmniChannel.\n\n## Prerequisites\n\n- A WhatsApp Business account\n- Admin access to your OmniChannel workspace\n- Your business phone number verified with WhatsApp\n\n## Connection Steps\n\n1. Go to the **Channels** section in your OmniChannel dashboard\n2. Click on **Add Channel** and select WhatsApp\n3. Follow the authentication process with WhatsApp\n4. Set up your welcome message and automated responses\n5. Test the connection by sending a test message\n\n## Troubleshooting\n\nIf you encounter issues connecting your account, check that:\n\n- Your WhatsApp Business account is active and in good standing\n- You've completed the WhatsApp Business API verification process\n- Your phone number is correctly formatted\n\n## Best Practices\n\n- Respond to WhatsApp messages within 24 hours to maintain the conversation window\n- Use templates for outbound messages\n- Set up automated welcome messages and away responses\n\nFor additional help, contact our support team.",
    status: "Published",
    tags: ["WhatsApp", "Setup", "Integration"],
    lastUpdated: "2025-05-10T14:20:00Z",
    author: "Jane Smith",
    views: 890,
    helpful: 38,
    notHelpful: 3,
    visibility: "External",
    aiEnabled: true,
    versions: [
      { id: "v1", timestamp: "2025-05-08T11:45:00Z", author: "Jane Smith" },
      { id: "v2", timestamp: "2025-05-10T14:20:00Z", author: "Jane Smith" }
    ]
  }
};

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
  "Tutorial",
  "WhatsApp",
  "Email",
  "Chat",
  "SMS",
  "Social Media",
  "API"
];

export default function EditArticlePage({ params }: { params: { articleId: string } }) {
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
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
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  
  // Fetch the article data
  useEffect(() => {
    // In a real app, you would fetch the article from an API
    // For now, we'll use our mock data
    const fetchArticle = () => {
      const articleData = mockArticles[params.articleId as keyof typeof mockArticles];
      if (articleData) {
        setArticle(articleData);
        setTitle(articleData.title);
        setCategory(articleData.category);
        setContent(articleData.content);
        setArticleTags(articleData.tags);
        setVisibility(articleData.visibility);
        setEnableAI(articleData.aiEnabled);
      } else {
        // Handle article not found
        router.push("/kb");
      }
    };
    
    fetchArticle();
  }, [params.articleId, router]);

  // Handle updating an article
  const handleSave = (status: "Draft" | "Published" | "Pending Approval") => {
    setIsSaving(true);
    
    // Simulating API call to save the article
    setTimeout(() => {
      setIsSaving(false);
      
      // In a real app, you'd update the article in the database here
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

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!article) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Edit Article</h1>
          <p className="text-muted-foreground">
            Edit an existing knowledge base article
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
            Update
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
                <span>{formatDate(article.lastUpdated)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-muted-foreground">
                  <User className="h-4 w-4 mr-2" />
                  Author
                </div>
                <span>{article.author}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-muted-foreground">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Status
                </div>
                <Badge className="bg-green-500 text-white hover:bg-green-600">{article.status}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-muted-foreground">
                  <Eye className="h-4 w-4 mr-2" />
                  Views
                </div>
                <span>{article.views.toLocaleString()}</span>
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
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">Version History</h3>
              <Button variant="ghost" size="sm" className="h-7" onClick={() => setShowVersionHistory(!showVersionHistory)}>
                <History className="h-3.5 w-3.5 mr-1" />
                {showVersionHistory ? "Hide History" : "Show History"}
              </Button>
            </div>
            
            {showVersionHistory ? (
              <div className="space-y-3">
                {article.versions.map((version: any) => (
                  <div key={version.id} className="flex items-center justify-between text-sm border-b pb-2">
                    <div>
                      <div className="font-medium">{version.id}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(version.timestamp)} by {version.author}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7">
                      <RotateCcw className="h-3.5 w-3.5 mr-1" />
                      Restore
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                {article.versions.length} versions available
              </div>
            )}
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
