"use client"

import React, { useState, useRef } from "react"
// Dashboard layout is provided by the parent layout.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, FileUp, X, CheckCircle2, File, AlertCircle, Upload as UploadIcon } from "lucide-react"
import { toast } from "sonner"
import api from "@/lib/api"
import { useRouter } from "next/navigation"

const ACCEPTED_FILE_TYPES = [
  ".pdf", ".docx", ".doc", ".txt", ".csv", ".xlsx", ".xls", ".pptx", ".ppt", ".md"
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes

export default function UploadDocumentPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [uploadResults, setUploadResults] = useState<Record<string, { success: boolean; error?: string }>>({})
  
  const router = useRouter()
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    const selectedFiles = Array.from(e.target.files)
    const newErrors: Record<string, string> = {}
    const validFiles = selectedFiles.filter(file => {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        newErrors[file.name] = `File size exceeds the 10MB limit`
        return false
      }
      
      // Check file type
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`
      if (!ACCEPTED_FILE_TYPES.includes(fileExtension)) {
        newErrors[file.name] = `File type not supported`
        return false
      }
      
      return true
    })
    
    setErrors(newErrors)
    setFiles(prev => [...prev, ...validFiles])
    
    // Reset the input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }
  
  const handleRemoveFile = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName))
    
    // Also remove any errors for this file
    const newErrors = { ...errors }
    delete newErrors[fileName]
    setErrors(newErrors)
  }
  
  const formatFileSize = (sizeInBytes: number) => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(1)} KB`
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`
    }
  }
  
  const getFileIcon = (fileName: string) => {
    return <File className="h-5 w-5" />
  }
  
  const uploadFiles = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one file to upload")
      return
    }
    
    setIsUploading(true)
    const initialProgress: Record<string, number> = {}
    const results: Record<string, { success: boolean; error?: string }> = {}
    
    files.forEach(file => {
      initialProgress[file.name] = 0
    })
    
    setUploadProgress(initialProgress)
    
    // Upload files sequentially to avoid overwhelming the server
    for (const file of files) {
      try {
        // Update progress to show upload started
        setUploadProgress(prev => ({ ...prev, [file.name]: 10 }))
        
        // Create form data to send file
        const formData = new FormData()
        formData.append('file', file)
        
        // Add optional metadata
        formData.append('description', `Uploaded on ${new Date().toLocaleString()}`)
        formData.append('tags', JSON.stringify(['auto-upload']))
        
        // Call the API to upload the document
        const response = await api.uploadDocument(file, {
          description: `Uploaded on ${new Date().toLocaleString()}`,
          tags: ['auto-upload']
        })
        
        // Set progress to 100% for this file
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }))
        
        // Save the result
        results[file.name] = { 
          success: response.success,
          error: response.success ? undefined : (response.message || 'Upload failed')
        }
        
        if (response.success) {
          console.log(`Document ${file.name} uploaded successfully:`, response.data)
        } else {
          console.error(`Failed to upload ${file.name}:`, response.message)
        }
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error)
        
        // Set progress to show error
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }))
        
        // Save the error result
        results[file.name] = { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      }
    }
    
    // Check if all files were uploaded successfully
    const allSuccess = Object.values(results).every(result => result.success)
    const successCount = Object.values(results).filter(result => result.success).length
    
    setUploadResults(results)
    setIsUploading(false)
    
    if (allSuccess) {
      setUploadSuccess(true)
      toast.success(`${files.length} ${files.length === 1 ? 'document' : 'documents'} uploaded successfully`)
    } else if (successCount > 0) {
      setUploadSuccess(true)
      toast.warning(`${successCount} of ${files.length} documents uploaded successfully`)
    } else {
      toast.error('Failed to upload documents. Please try again.')
    }
  }
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      const newErrors: Record<string, string> = {}
      const validFiles = droppedFiles.filter(file => {
        // Check file size
        if (file.size > MAX_FILE_SIZE) {
          newErrors[file.name] = `File size exceeds the 10MB limit`
          return false
        }
        
        // Check file type
        const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`
        if (!ACCEPTED_FILE_TYPES.includes(fileExtension)) {
          newErrors[file.name] = `File type not supported`
          return false
        }
        
        return true
      })
      
      setErrors(newErrors)
      setFiles(prev => [...prev, ...validFiles])
    }
  }

  return (
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/knowledge">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Upload Documents</h1>
        </div>

        {!uploadSuccess ? (
          <Card className="animate-in">
            <CardHeader>
              <CardTitle>Knowledge Base Documents</CardTitle>
              <CardDescription>
                Upload documents to be used by your AI agent when responding to messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* File Upload Area */}
              <div 
                className="border-2 border-dashed rounded-lg p-6 text-center transition-colors hover:bg-muted/50 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept={ACCEPTED_FILE_TYPES.join(",")}
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <FileUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Drop your files here or click to browse</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Upload PDF, Word, Excel, PowerPoint, or text files (max 10MB each)
                  </p>
                </div>
              </div>

              {/* Selected Files List */}
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-sm font-medium">Selected Files ({files.length})</h3>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div 
                        key={`${file.name}-${index}`} 
                        className={`flex items-center justify-between p-3 rounded-lg ${errors[file.name] ? 'bg-destructive/10' : 'bg-muted/50'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            {getFileIcon(file.name)}
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate" title={file.name}>
                              {file.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                              {errors[file.name] && (
                                <span className="text-xs text-destructive flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  {errors[file.name]}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {isUploading ? (
                          <div className="w-20">
                            <div className="h-1.5 w-full bg-muted rounded-full">
                              <div 
                                className="h-1.5 bg-primary rounded-full transition-all" 
                                style={{ width: `${uploadProgress[file.name] || 0}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-right mt-1">{uploadProgress[file.name] || 0}%</p>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFile(file.name)}
                            disabled={isUploading}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Information about Processing */}
              <div className="bg-muted/50 p-4 rounded-lg mt-6">
                <h3 className="text-sm font-medium mb-2">What happens after upload?</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="p-1 bg-primary/10 rounded-full mt-0.5">1</span>
                    <span>Your documents will be securely stored in your account's knowledge base.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="p-1 bg-primary/10 rounded-full mt-0.5">2</span>
                    <span>Our system will process the documents to extract and index their content.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="p-1 bg-primary/10 rounded-full mt-0.5">3</span>
                    <span>The AI agent will use this information when responding to messages across all your connected channels.</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/dashboard/knowledge">Cancel</Link>
              </Button>
              <Button
                className="w-full sm:w-auto gap-2"
                onClick={uploadFiles}
                disabled={isUploading || files.length === 0 || Object.keys(errors).length > 0}
              >
                {isUploading ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-background border-t-transparent animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadIcon className="h-4 w-4" />
                    Upload Documents
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="animate-in">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Upload Successful!</CardTitle>
              <CardDescription>
                Your documents have been uploaded and are being processed
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="border rounded-lg divide-y">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          {getFileIcon(file.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-xs py-1 px-2 rounded-full font-medium bg-amber-500/10 text-amber-500">
                        Processing
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Next Steps</h3>
                  <p className="text-sm text-muted-foreground">
                    Your documents are being processed. This may take a few minutes depending on their size and complexity. You'll be notified when processing is complete.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-3">
              <Button asChild>
                <Link href="/dashboard/knowledge">Go to Knowledge Base</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/knowledge/upload">Upload More</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
  )
}
