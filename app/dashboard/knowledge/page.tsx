"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { FileText, Upload, Search, Filter, Trash2, Download, Eye, ArrowUpDown, Plus, FileIcon, CheckCircle2, Clock, AlertCircle, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import api, { Document as ApiDocument } from "@/lib/api"
import { formatFileSize, formatDate } from "@/lib/utils"

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [documents, setDocuments] = useState<ApiDocument[]>([])
  
  // Fetch documents from API
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await api.listDocuments();
        if (response.success && response.data) {
          setDocuments(response.data);
        } else {
          setError(response.message || 'Failed to load documents');
        }
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('Failed to load documents. Please try again later.');
        // Add mock data for development testing when API fails
        if (process.env.NODE_ENV !== 'production') {
          setDocuments([
            {
              id: '1',
              user_id: 1,
              filename: 'example-document.pdf',
              original_filename: 'Product Catalog.pdf',
              file_path: '/path/to/file',
              mime_type: 'application/pdf',
              file_size: 1258000,
              processing_status: 'processed',
              uploaded_at: new Date().toISOString()
            }
          ]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "processed":
        return "Processed"
      case "processing":
        return "Processing"
      case "failed":
        return "Failed"
      default:
        return status
    }
  }

  const getFileIcon = (fileType: string) => {
    return <FileIcon className="h-6 w-6 text-primary" />
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleDownload = (id: string) => {
    // In a real application, this would trigger a download
    toast.success("Document download started")
  }

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  // Map processing_status to UI status
  const mapStatus = (status?: string): "processed" | "processing" | "failed" | "pending" => {
    switch (status) {
      case "completed":
        return "processed";
      case "pending":
      case "processing":
        return "processing";
      case "failed":
        return "failed";
      default:
        return "processing";
    }
  }

  // Get file type from mime_type or filename
  const getFileType = (doc: ApiDocument) => {
    if (doc.mime_type) {
      const parts = doc.mime_type.split('/');
      if (parts.length > 1) return parts[1].toUpperCase();
    }
    
    // Fallback to extension from filename
    const ext = doc.filename.split('.').pop() || '';
    return ext.toUpperCase();
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      (doc.filename?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (doc.original_filename?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    const docStatus = mapStatus(doc.processing_status);
    const docType = getFileType(doc).toLowerCase();
    
    const matchesStatus = selectedStatus === "all" || docStatus === selectedStatus;
    const matchesType = selectedType === "all" || (selectedType === docType);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Handle document delete with API
  const handleDeleteDocument = async (id: string) => {
    try {
      const response = await api.deleteDocument(id);
      if (response.success) {
        setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== id));
        toast.success("Document deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete document");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("An error occurred while deleting the document");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground max-w-2xl">
            Upload and manage documents that your AI agent can use to provide accurate responses.
          </p>
        </div>
        <Button className="gap-2 shadow-sm" asChild>
          <Link href="/dashboard/knowledge/upload">
            <Upload className="h-4 w-4" />
            <span>Upload Document</span>
          </Link>
        </Button>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card/50 border border-border/50 rounded-lg p-3 shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full rounded-md border border-input bg-background pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Status:</span>
          <select 
            className="bg-background border border-input rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="processed">Processed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Sort:</span>
          <select 
            className="bg-background border border-input rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="size">Size</option>
          </select>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8" 
            onClick={handleSortToggle}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Document List/Grid */}
      <div className="mt-6 space-y-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="border-border/40 shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
                <CardFooter className="bg-secondary/20 border-t px-4 py-3 flex justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-8 w-24 rounded-md" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="border-border/40 shadow-sm">
            <CardContent className="pt-6 pb-4 text-center">
              <p className="text-destructive">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : filteredDocuments.length === 0 ? (
          <Card className="border-border/40 shadow-sm">
            <CardContent className="pt-6 pb-4 text-center">
              <p className="text-muted-foreground">No documents found. Try adjusting your search or filters.</p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/knowledge/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload a document
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => {
              const status = mapStatus(doc.processing_status);
              const fileType = getFileType(doc);
              return (
                <Card key={doc.id} className="overflow-hidden border-border/40 shadow-sm hover:shadow-md transition-all group">
                  <CardHeader className="p-4 pb-3 space-y-0">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-11 w-11 bg-primary/10 rounded-md flex items-center justify-center">
                        {getFileIcon(fileType)}
                      </div>
                      <div className="overflow-hidden">
                        <CardTitle className="text-base font-medium truncate">
                          {doc.original_filename || doc.filename}
                        </CardTitle>
                        <CardDescription className="text-xs flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            {fileType.toUpperCase()}
                          </span>
                          <span className="text-muted-foreground">{formatFileSize(doc.file_size)}</span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 py-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(status)}
                        <span className="text-xs font-medium">{getStatusText(status)}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{formatDate(doc.uploaded_at)}</span>
                    </div>
                    {doc.tags && doc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {doc.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                            {tag}
                          </span>
                        ))}
                        {doc.tags.length > 3 && (
                          <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">+{doc.tags.length - 3}</span>
                        )}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="bg-secondary/20 border-t px-4 py-3 flex justify-between">
                    <div className="text-xs text-muted-foreground">
                      Updated {new Date(doc.uploaded_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/dashboard/knowledge/view/${doc.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDownload(doc.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive hover:bg-destructive/10" 
                        onClick={() => handleDeleteDocument(doc.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}
