"use client"

import React, { useState, useEffect } from "react"
// Dashboard layout is provided by the parent layout.tsx
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

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id))
    toast.success("Document deleted successfully")
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
  })

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
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="text-muted-foreground">
          Upload and manage documents that your AI agent can use to provide accurate responses.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full rounded-md border border-input pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button className="gap-2" asChild>
            <Link href="/dashboard/knowledge/upload">
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div className="flex items-start gap-3">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <Skeleton className="h-4 w-full my-1" />
                <Skeleton className="h-4 w-4/5 my-1" />
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-between">
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : error ? (
        /* Error State */
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold">Failed to load documents</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </Card>
      ) : filteredDocuments.length > 0 ? (
        /* Documents Grid */
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => {
            const fileType = getFileType(doc);
            const status = mapStatus(doc.processing_status);
            
            return (
              <Card key={doc.id} className="micro-interaction gradient-border overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        {getFileIcon(fileType)}
                      </div>
                      <div>
                        <CardTitle className="text-base font-medium line-clamp-1">
                          {doc.original_filename || doc.filename}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <span className="capitalize">{fileType}</span>
                          <span className="text-muted-foreground">•</span>
                          <span>{formatFileSize(doc.file_size)}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs rounded-full py-1 px-2.5 bg-muted">
                      {getStatusIcon(status)}
                      <span>{getStatusText(status)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  {status === "processed" || status === "completed" ? (
                    <div className="text-sm space-y-2">
                      {/* Content summary if available */}
                      {doc.content_summary ? (
                        <p className="text-muted-foreground line-clamp-3">
                          {doc.content_summary}
                        </p>
                      ) : (
                        <p className="text-muted-foreground">
                          Document successfully processed with {doc.chunk_count || 0} chunks.
                        </p>
                      )}
                      {/* Document metadata */}
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                        {/* PDF-specific info */}
                        {doc.mime_type?.includes('pdf') && doc.metadata?.pageCount && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <FileText className="h-3 w-3 mr-1" />
                            <span>{doc.metadata.pageCount} {doc.metadata.pageCount === 1 ? 'page' : 'pages'}</span>
                          </div>
                        )}
                        {/* Show document tags if available */}
                        {doc.tags && doc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
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
                      </div>
                    </div>
                  ) : status === "processing" ? (
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span>Processing document. This may take a few minutes...</span>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      <span>{doc.status_message || "Failed to process document. Please try again."}</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t pt-3 flex justify-between text-xs text-muted-foreground">
                  <div>Uploaded on {formatDate(doc.uploaded_at)}</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleDownload(doc.id)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/knowledge/view/${doc.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteDocument(doc.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">No documents found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 
                "No documents match your search criteria. Try adjusting your filters or search query." : 
                "Upload documents to your knowledge base to help the AI provide more accurate responses."}
            </p>
            <Button asChild>
              <Link href="/dashboard/knowledge/upload" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Upload Your First Document
              </Link>
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
