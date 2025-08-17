"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { 
  Search, Filter, Plus, MoreHorizontal, Tag, Edit, Clock,
  Calendar, Eye, ThumbsUp, ThumbsDown, Trash, CheckCircle2,
  AlertCircle, Clock8, ExternalLink, Download, FileText,
  LayoutList, LayoutGrid
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EditorialHeader } from "@/components/ui/editorial";
import api from "@/lib/api";

// API Document interface - what comes from the backend API
interface ApiDocument {
  id: string;
  user_id: number;
  filename: string;
  original_filename: string;
  file_path: string;
  mime_type: string;
  file_size: number;
  ipfs_hash?: string;
  processing_status: 'pending' | 'processing' | 'processed' | 'failed';
  status_message?: string;
  chunk_count?: number;
  description?: string;
  tags?: string[];
  metadata?: any;
  uploaded_at: string;
  processed_at?: string;
}

// Mock Document interface with display properties for UI
interface MockDocument {
  id: string;
  title: string;
  category: string;
  status: string;
  tags: string[];
  lastUpdated: string;
  author: string;
  views: number;
  helpful: number;
  notHelpful: number;
  visibility: string;
  aiEnabled: boolean;
}

// Combined Document interface for use in the UI
type Document = ApiDocument & Partial<MockDocument>;

// Real data fetching with fallback mock data
const useFetchDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await api.listDocuments();
        if (response.success && response.data) {
          // Map API documents to our Document type with defaults for missing fields
          const mappedDocs = response.data.map((doc: ApiDocument) => ({
            ...doc,
            title: doc.original_filename || doc.filename,
            category: doc.metadata?.category || 'Document',
            status: doc.processing_status === 'processed' ? 'Published' : 
                   doc.processing_status === 'failed' ? 'Error' : 'Processing',
            lastUpdated: doc.processed_at || doc.uploaded_at,
            author: 'You',
            views: doc.metadata?.views || 0,
            helpful: doc.metadata?.helpful || 0,
            notHelpful: doc.metadata?.notHelpful || 0,
            visibility: doc.metadata?.visibility || 'Internal',
            aiEnabled: true, // All documents are RAG-enabled
            tags: doc.tags || []
          }));
          setDocuments(mappedDocs);
        } else {
          setError(response.message || "Failed to fetch documents");
        }
      } catch (err) {
        setError("An error occurred while fetching documents");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return { documents, loading, error, refetch: () => {
    setLoading(true);
    // This will trigger the useEffect to run again
  }};
};

// Mock data for demonstration as fallback
const mockArticles = [
  {
    id: "1",
    title: "Getting Started with OmniChannel",
    category: "Guides",
    status: "Published",
    tags: ["Getting Started", "Onboarding"],
    lastUpdated: "2025-05-15T10:30:00Z",
    author: "John Doe",
    views: 1240,
    helpful: 45,
    notHelpful: 5,
    visibility: "External",
    aiEnabled: true
  },
  {
    id: "2",
    title: "How to Connect Your WhatsApp Business Account",
    category: "Channels",
    status: "Published",
    tags: ["WhatsApp", "Setup", "Integration"],
    lastUpdated: "2025-05-10T14:20:00Z",
    author: "Jane Smith",
    views: 890,
    helpful: 38,
    notHelpful: 3,
    visibility: "External",
    aiEnabled: true
  },
  {
    id: "3",
    title: "Advanced AI Persona Configuration",
    category: "AI",
    status: "Draft",
    tags: ["AI", "Customization", "Advanced"],
    lastUpdated: "2025-05-18T09:45:00Z",
    author: "Alex Johnson",
    views: 0,
    helpful: 0,
    notHelpful: 0,
    visibility: "Internal",
    aiEnabled: false
  },
  {
    id: "4",
    title: "Troubleshooting Common Integration Issues",
    category: "Support",
    status: "Published",
    tags: ["Troubleshooting", "API", "Integration"],
    lastUpdated: "2025-05-08T16:15:00Z",
    author: "Sam Wilson",
    views: 1560,
    helpful: 87,
    notHelpful: 12,
    visibility: "External",
    aiEnabled: true
  },
  {
    id: "5",
    title: "Setting Up Email Templates",
    category: "Email",
    status: "Pending Approval",
    tags: ["Email", "Templates", "Setup"],
    lastUpdated: "2025-05-20T11:25:00Z",
    author: "Emily Chen",
    views: 0,
    helpful: 0,
    notHelpful: 0,
    visibility: "External",
    aiEnabled: true
  },
  {
    id: "6",
    title: "Security Best Practices",
    category: "Security",
    status: "Published",
    tags: ["Security", "Best Practices", "Guidelines"],
    lastUpdated: "2025-05-05T13:10:00Z",
    author: "Michael Brown",
    views: 720,
    helpful: 29,
    notHelpful: 2,
    visibility: "Internal",
    aiEnabled: true
  },
  {
    id: "7",
    title: "Creating Custom Tags for Conversations",
    category: "Settings",
    status: "Published",
    tags: ["Tags", "Customization", "Organization"],
    lastUpdated: "2025-05-12T10:50:00Z",
    author: "John Doe",
    views: 650,
    helpful: 32,
    notHelpful: 1,
    visibility: "External",
    aiEnabled: true
  }
];

export default function KnowledgeBasePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [viewType, setViewType] = useState<"table" | "grid">("table");
  const [currentFilter, setCurrentFilter] = useState({
    category: "all",
    status: "all",
    visibility: "all",
    aiEnabled: "all"
  });
  
  // Fetch real documents if available
  const { documents, loading, error } = useFetchDocuments();
  
  // File upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // File upload handler
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setIsUploading(true);
    setUploadProgress(10);
    
    try {
      // Upload with enhanced RAG options
      const response = await api.uploadDocument(file, {
        description: `Uploaded document: ${file.name}`,
        useLargeModel: file.size > 5 * 1024 * 1024, // Use large model for files > 5MB
        chunkSize: 1000,
        chunkOverlap: 200
      });
      
      setUploadProgress(100);
      
      if (response.success) {
        toast.success(`Document ${file.name} uploaded successfully and is being processed`);
        // Refresh the document list
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(response.message || "Failed to upload document");
      }
    } catch (err) {
      console.error("Error uploading document:", err);
      toast.error("An error occurred while uploading the document");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Reset the file input
      event.target.value = "";
    }
  };

  const handleSelectArticle = (id: string) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter(articleId => articleId !== id));
    } else {
      setSelectedArticles([...selectedArticles, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedArticles.length === mockArticles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(mockArticles.map(article => article.id));
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "Published":
        return <Badge className="bg-green-500 text-white hover:bg-green-600">Published</Badge>;
      case "Draft":
        return <Badge className="bg-gray-500 text-white hover:bg-gray-600">Draft</Badge>;
      case "Pending Approval":
        return <Badge className="bg-amber-500 text-white hover:bg-amber-600">Pending Approval</Badge>;
      case "Processing":
        return <Badge className="bg-blue-500 text-white hover:bg-blue-600">Processing</Badge>;
      case "Error":
        return <Badge className="bg-red-500 text-white hover:bg-red-600">Failed</Badge>;
      default:
        return <Badge>{status || 'Unknown'}</Badge>;
    }
  };

  // Filter articles based on search and filters
  const displayArticles = documents.length > 0 ? documents : mockArticles;
  const filteredArticles = displayArticles.filter(article => {
    // Search filter
    if (searchQuery && article.title && !article.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (currentFilter.category !== "all" && article.category && article.category !== currentFilter.category) {
      return false;
    }
    
    // Status filter
    if (currentFilter.status !== "all" && article.status && article.status !== currentFilter.status) {
      return false;
    }
    
    // Visibility filter
    if (currentFilter.visibility !== "all" && article.visibility && article.visibility !== currentFilter.visibility) {
      return false;
    }
    
    // AI Enabled filter
    if (currentFilter.aiEnabled !== "all" && article.aiEnabled !== undefined && 
        ((currentFilter.aiEnabled === "yes" && !article.aiEnabled) || 
         (currentFilter.aiEnabled === "no" && article.aiEnabled))) {
      return false;
    }
    
    return true;
  });

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <EditorialHeader
        title="Knowledge Base"
        subtitle="Manage articles, FAQs, and guides for customers and agents."
        actions={
          <div className="flex gap-2">
            <Button
              onClick={() => router.push("/dashboard/kb/editor")}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Article
            </Button>
            <div className="relative">
              <input 
                type="file" 
                id="document-upload" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt,.csv,.md,.ppt,.pptx,.xls,.xlsx,.json,.html"
                disabled={isUploading}
              />
              <Button
                variant="outline"
                className={`border-dashed border-gray-400 flex items-center gap-2 ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <span className="animate-pulse">Uploading... {uploadProgress}%</span>
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" />
                    Upload Document
                  </>
                )}
              </Button>
            </div>
          </div>
        }
      />

      <div className="editorial-container editorial-section flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className={viewType === "table" ? "bg-muted" : ""}
              onClick={() => setViewType("table")}
            >
              <FileText className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className={viewType === "grid" ? "bg-muted" : ""}
              onClick={() => setViewType("grid")}
            >
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
              </div>
            </Button>
          </div>
        </div>
        
        {filterOpen && (
          <motion.div 
            className="p-4 bg-muted rounded-lg grid grid-cols-4 gap-4 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Category</label>
              <select 
                className="w-full p-2 rounded border bg-white"
                value={currentFilter.category}
                onChange={(e) => setCurrentFilter({...currentFilter, category: e.target.value})}
              >
                <option value="all">All Categories</option>
                <option value="Guides">Guides</option>
                <option value="Channels">Channels</option>
                <option value="AI">AI</option>
                <option value="Support">Support</option>
                <option value="Email">Email</option>
                <option value="Security">Security</option>
                <option value="Settings">Settings</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Status</label>
              <select 
                className="w-full p-2 rounded border bg-white"
                value={currentFilter.status}
                onChange={(e) => setCurrentFilter({...currentFilter, status: e.target.value})}
              >
                <option value="all">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Pending Approval">Pending Approval</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Visibility</label>
              <select 
                className="w-full p-2 rounded border bg-white"
                value={currentFilter.visibility}
                onChange={(e) => setCurrentFilter({...currentFilter, visibility: e.target.value})}
              >
                <option value="all">All Visibility</option>
                <option value="External">External</option>
                <option value="Internal">Internal</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">AI Enabled</label>
              <select 
                className="w-full p-2 rounded border bg-white"
                value={currentFilter.aiEnabled}
                onChange={(e) => setCurrentFilter({...currentFilter, aiEnabled: e.target.value})}
              >
                <option value="all">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </motion.div>
        )}
        
        {selectedArticles.length > 0 && (
          <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
            <div className="text-sm font-medium">
              {selectedArticles.length} articles selected
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Tag className="h-4 w-4 mr-2" />
                Add Tags
              </Button>
              <Button variant="outline" size="sm">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Publish
              </Button>
              <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}
        
        {viewType === "table" ? (
          <div className="editorial-panel">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-4 text-left font-medium">
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox"
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          checked={selectedArticles.length === mockArticles.length}
                          onChange={handleSelectAll}
                        />
                        <span>Title</span>
                      </div>
                    </th>
                    <th className="h-10 px-4 text-left font-medium">Category</th>
                    <th className="h-10 px-4 text-left font-medium">Status</th>
                    <th className="h-10 px-4 text-left font-medium">Last Updated</th>
                    <th className="h-10 px-4 text-left font-medium">Views</th>
                    <th className="h-10 px-4 text-left font-medium">Helpfulness</th>
                    <th className="h-10 px-4 text-left font-medium">Visibility</th>
                    <th className="h-10 px-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((article) => (
                    <tr key={article.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                            checked={selectedArticles.includes(article.id)}
                            onChange={() => handleSelectArticle(article.id)}
                          />
                          <span className="font-medium">{article.title || 'Untitled'}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{article.category}</Badge>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(article.status)}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1.5" />
                          {formatDate(article.lastUpdated)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-muted-foreground">
                          <Eye className="h-3.5 w-3.5 mr-1.5" />
                          {(article.views || 0).toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center text-green-600">
                            <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                            {article.helpful}
                          </span>
                          <span className="flex items-center text-red-500">
                            <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                            {article.notHelpful}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          {article.visibility === "External" ? (
                            <Badge className="bg-blue-500 text-white hover:bg-blue-600 flex items-center">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              External
                            </Badge>
                          ) : (
                            <Badge className="bg-purple-500 text-white hover:bg-purple-600">
                              Internal
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => router.push(`/kb/articles/${article.id}`)}
                          >
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => router.push(`/kb/editor/${article.id}`)}
                          >
                            <Edit className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <div className="p-4 border-b flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-base mb-1 line-clamp-1">{article.title || 'Untitled'}</h3>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate('uploaded_at' in article ? article.uploaded_at : article.lastUpdated)}
                      <span className="mx-1.5">•</span>
                      <Badge variant="outline" className="text-xs">{article.category || 'Document'}</Badge>
                    </div>
                  </div>
                  <input 
                    type="checkbox"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    checked={selectedArticles.includes(article.id)}
                    onChange={() => handleSelectArticle(article.id)}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(article.status || 'Processing')}
                      {(article.visibility === "External") ? (
                        <Badge className="bg-blue-500 text-white hover:bg-blue-600 flex items-center">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          External
                        </Badge>
                      ) : (
                        <Badge className="bg-purple-500 text-white hover:bg-purple-600">
                          Internal
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      by {article.author || 'You'}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center text-muted-foreground text-sm">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        {(article.views || 0).toLocaleString()}
                      </span>
                      <span className="flex items-center text-green-600 text-sm">
                        <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                        {article.helpful || 0}
                      </span>
                      <span className="flex items-center text-red-500 text-sm">
                        <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                        {article.notHelpful || 0}
                      </span>
                    </div>
                    {article.aiEnabled && (
                      <Badge className="bg-violet-500 text-white hover:bg-violet-600">
                        AI Enabled
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags && article.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/kb/articles/${article.id}`)}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1.5" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/kb/editor/${article.id}`)}
                    >
                      <Edit className="h-3.5 w-3.5 mr-1.5" />
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
