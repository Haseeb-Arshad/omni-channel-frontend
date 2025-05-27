"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Edit, Calendar, User, Eye, 
  ThumbsUp, ThumbsDown, Share, Globe, Lock,
  Download, Printer, Copy, ExternalLink
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Mock data for existing articles (same as in the editor)
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

export default function ArticleViewPage({ params }: { params: { articleId: string } }) {
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
  const [userFeedback, setUserFeedback] = useState<"helpful" | "not-helpful" | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Fetch the article data
  useEffect(() => {
    // In a real app, you would fetch the article from an API
    // For now, we'll use our mock data
    const fetchArticle = () => {
      const articleData = mockArticles[params.articleId as keyof typeof mockArticles];
      if (articleData) {
        setArticle(articleData);
        // Increment view count (in a real app, this would be an API call)
      } else {
        // Handle article not found
        router.push("/kb");
      }
    };
    
    fetchArticle();
  }, [params.articleId, router]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  // Handle providing feedback
  const handleFeedback = (type: "helpful" | "not-helpful") => {
    if (userFeedback === type) {
      setUserFeedback(null);
      // In a real app, you would make an API call to remove feedback
    } else {
      setUserFeedback(type);
      // In a real app, you would make an API call to save feedback
    }
  };

  // Copy article URL to clipboard
  const copyArticleLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    // In a real app, you might show a toast notification
    setShowShareOptions(false);
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
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-2" 
          onClick={() => router.push("/kb")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Knowledge Base
        </Button>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{article.title}</h1>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <div className="flex items-center mr-4">
                <Calendar className="h-4 w-4 mr-1.5" />
                {formatDate(article.lastUpdated)}
              </div>
              <div className="flex items-center mr-4">
                <User className="h-4 w-4 mr-1.5" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1.5" />
                {article.views.toLocaleString()} views
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <Badge variant="outline">{article.category}</Badge>
              {article.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
              {article.visibility === "External" ? (
                <Badge className="bg-blue-500 text-white hover:bg-blue-600 flex items-center">
                  <Globe className="h-3 w-3 mr-1" />
                  External
                </Badge>
              ) : (
                <Badge className="bg-purple-500 text-white hover:bg-purple-600 flex items-center">
                  <Lock className="h-3 w-3 mr-1" />
                  Internal
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={() => router.push(`/kb/editor/${article.id}`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <div className="relative">
              <Button 
                variant="outline"
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              {showShareOptions && (
                <Card className="absolute right-0 mt-2 w-48 p-2 z-10">
                  <button 
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md flex items-center"
                    onClick={copyArticleLink}
                  >
                    <Copy className="h-4 w-4 mr-2 text-muted-foreground" />
                    Copy Link
                  </button>
                  <button 
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md flex items-center"
                    onClick={() => window.print()}
                  >
                    <Printer className="h-4 w-4 mr-2 text-muted-foreground" />
                    Print
                  </button>
                  <button 
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2 text-muted-foreground" />
                    Download PDF
                  </button>
                  <button 
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md flex items-center"
                    onClick={() => window.open(`mailto:?subject=${article.title}&body=Check out this article: ${window.location.href}`)}
                  >
                    <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                    Email
                  </button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Card className="mb-6">
        <div className="p-6 prose prose-sm max-w-none">
          {/* In a real app, you would use a markdown parser like react-markdown */}
          <div className="text-sm">
            <pre className="whitespace-pre-wrap">{article.content}</pre>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between items-center p-4 bg-muted rounded-lg mb-6">
        <div className="text-sm">
          <p className="font-medium">Was this article helpful?</p>
          <p className="text-muted-foreground text-xs mt-1">
            Your feedback helps us improve our knowledge base.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={userFeedback === "helpful" ? "default" : "outline"} 
            size="sm"
            onClick={() => handleFeedback("helpful")}
            className={userFeedback === "helpful" ? "bg-green-500 hover:bg-green-600" : ""}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Helpful
            {userFeedback !== "helpful" && <span className="ml-1.5 text-muted-foreground">({article.helpful})</span>}
          </Button>
          <Button 
            variant={userFeedback === "not-helpful" ? "default" : "outline"} 
            size="sm"
            onClick={() => handleFeedback("not-helpful")}
            className={userFeedback === "not-helpful" ? "bg-red-500 hover:bg-red-600" : ""}
          >
            <ThumbsDown className="h-4 w-4 mr-2" />
            Not Helpful
            {userFeedback !== "not-helpful" && <span className="ml-1.5 text-muted-foreground">({article.notHelpful})</span>}
          </Button>
        </div>
      </div>
      
      <div className="border-t pt-6 pb-8">
        <h3 className="text-lg font-medium mb-4">Related Articles</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.values(mockArticles)
            .filter((relatedArticle: any) => relatedArticle.id !== article.id)
            .slice(0, 2)
            .map((relatedArticle: any) => (
              <Card 
                key={relatedArticle.id} 
                className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => router.push(`/kb/articles/${relatedArticle.id}`)}
              >
                <h4 className="font-medium text-base">{relatedArticle.title}</h4>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {formatDate(relatedArticle.lastUpdated)}
                  <span className="mx-1.5">•</span>
                  <Badge variant="outline" className="text-xs">{relatedArticle.category}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {relatedArticle.content.split('\n').filter(Boolean)[1] || ""}
                </p>
              </Card>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
