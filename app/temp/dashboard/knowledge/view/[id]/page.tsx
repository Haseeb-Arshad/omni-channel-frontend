"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ChevronLeft, FileText, Download, Trash2, CheckCircle2, Clock, AlertCircle, FileIcon } from "lucide-react"
import { toast } from "sonner"
import api, { Document as ApiDocument } from "@/lib/api"
import { formatFileSize, formatDate } from "@/lib/utils"

export default function DocumentViewPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  
  const [document, setDocument] = useState<ApiDocument | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [chunks, setChunks] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("preview")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await api.getDocument(id)
        if (response.success && response.data) {
          setDocument(response.data)
          
          // Generate preview URL based on file type
          if (response.data.ipfs_hash) {
            // Using IPFS gateway for preview if file is on IPFS
            setPreviewUrl(`${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL || 'https://gateway.pinata.cloud/ipfs/'}${response.data.ipfs_hash}`)
          } else if (response.data.file_path) {
            // Use backend URL for local files
            const filePathSegments = response.data.file_path.split('\\')
            const fileName = filePathSegments[filePathSegments.length - 1]
            setPreviewUrl(`${process.env.NEXT_PUBLIC_API_URL}/api/knowledge/preview/${id}`)
          }
          
          // Also fetch document chunks if document is processed
          if (response.data.processing_status === 'processed' || response.data.processing_status === 'completed') {
            const chunksResponse = await api.getDocumentChunks(id)
            if (chunksResponse.success && chunksResponse.data) {
              setChunks(chunksResponse.data)
            }
          }
        } else {
          setError(response.message || 'Failed to load document')
        }
      } catch (err) {
        console.error('Error fetching document:', err)
        setError('Failed to load document. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchDocument()
    }
  }, [id])

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "processed":
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "processing":
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4 text-amber-500" />
    }
  }

  const getStatusText = (status?: string) => {
    switch (status) {
      case "processed":
      case "completed":
        return "Processed"
      case "processing":
      case "pending":
        return "Processing"
      case "failed":
        return "Failed"
      default:
        return "Processing"
    }
  }

  const handleDelete = async () => {
    if (!document) return
    
    try {
      const response = await api.deleteDocument(document.id)
      if (response.success) {
        toast.success("Document deleted successfully")
        router.push('/dashboard/knowledge')
      } else {
        toast.error(response.message || "Failed to delete document")
      }
    } catch (err) {
      console.error('Error deleting document:', err)
      toast.error("An error occurred while deleting the document")
    }
  }

  const handleDownload = async () => {
    if (!document) return
    
    try {
      // Fetch document file for download
      const response = await api.downloadDocument(document.id)
      if (response) {
        // Create download link
        const url = window.URL.createObjectURL(response)
        const link = window.document.createElement('a')
        link.href = url
        link.setAttribute('download', document.original_filename || document.filename)
        window.document.body.appendChild(link)
        link.click()
        
        // Clean up
        window.URL.revokeObjectURL(url)
        window.document.body.removeChild(link)
        
        toast.success("Document downloaded successfully")
      } else {
        toast.error("Failed to download document")
      }
    } catch (err) {
      console.error('Error downloading document:', err)
      toast.error("An error occurred while downloading the document")
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/knowledge">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-64 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !document) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/knowledge">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error || "Document not found"}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/dashboard/knowledge">Go Back</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/knowledge">
            <ChevronLeft className="h-4 w-4" />
            Back to Knowledge Base
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{document.original_filename || document.filename}</CardTitle>
              <CardDescription className="mt-1">
                {formatFileSize(document.file_size)} • Uploaded on {formatDate(document.uploaded_at)}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(document.processing_status)}
              <Badge variant={document.processing_status === "failed" ? "destructive" : (document.processing_status === "processed" || document.processing_status === "completed") ? "default" : "outline"}>
                {getStatusText(document.processing_status)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              {(document.processing_status === "processed" || document.processing_status === "completed") && (
                <TabsTrigger value="chunks">Chunks</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="preview" className="min-h-[500px]">
              {previewUrl ? (
                document.mime_type?.includes('pdf') ? (
                  <iframe 
                    src={previewUrl} 
                    className="w-full h-[600px] border rounded-md"
                    title={document.original_filename || document.filename}
                  />
                ) : document.mime_type?.includes('image') ? (
                  <div className="flex justify-center">
                    <img 
                      src={previewUrl} 
                      alt={document.original_filename || document.filename}
                      className="max-h-[600px] object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] border rounded-md bg-muted/20">
                    <FileIcon className="h-16 w-16 text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">
                      Preview not available for this file type
                    </p>
                    <Button variant="outline" size="sm" className="mt-4" onClick={handleDownload}>
                      Download to view
                    </Button>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] border rounded-md bg-muted/20">
                  <FileIcon className="h-16 w-16 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    Preview not available
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="details">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">File Name</h3>
                    <p>{document.original_filename || document.filename}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">File Type</h3>
                    <p>{document.mime_type || 'Unknown'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">File Size</h3>
                    <p>{formatFileSize(document.file_size)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Upload Date</h3>
                    <p>{formatDate(document.uploaded_at)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Processing Status</h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(document.processing_status)}
                      <span>{getStatusText(document.processing_status)}</span>
                    </div>
                  </div>
                  {document.processed_at && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Processing Completed</h3>
                      <p>{formatDate(document.processed_at)}</p>
                    </div>
                  )}
                  {document.ipfs_hash && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">IPFS Hash</h3>
                      <p className="truncate">{document.ipfs_hash}</p>
                    </div>
                  )}
                  {document.description && (
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                      <p>{document.description}</p>
                    </div>
                  )}
                  {document.tags && document.tags.length > 0 && (
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {document.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {document.content_summary && (
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Content Summary</h3>
                      <p className="whitespace-pre-line">{document.content_summary}</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {(document.processing_status === "processed" || document.processing_status === "completed") && (
              <TabsContent value="chunks">
                {chunks.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      This document has been processed into {chunks.length} chunks for AI retrieval.
                    </p>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                      {chunks.map((chunk, index) => (
                        <Card key={index}>
                          <CardHeader className="py-3">
                            <CardTitle className="text-sm">Chunk {index + 1}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm whitespace-pre-line">{chunk.text}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px] border rounded-md bg-muted/20">
                    <p className="text-muted-foreground">No chunks available</p>
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
