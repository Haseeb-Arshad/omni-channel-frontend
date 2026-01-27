"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import api, { Document as ApiDocument } from "@/lib/api"
import { formatDate, formatFileSize } from "@/lib/utils"
import { Download, Eye, FileText, Loader2, Plus, RefreshCw, Search, Trash2 } from "lucide-react"

const statusStyles: Record<ApiDocument["processing_status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-amber-100 text-amber-700",
  processed: "bg-emerald-100 text-emerald-700",
  completed: "bg-emerald-100 text-emerald-700",
  failed: "bg-rose-100 text-rose-700",
}

const statusLabels: Record<ApiDocument["processing_status"], string> = {
  pending: "Pending",
  processing: "Processing",
  processed: "Processed",
  completed: "Processed",
  failed: "Failed",
}

export default function KnowledgeBasePage() {
  const [documents, setDocuments] = useState<ApiDocument[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchDocuments = useCallback(async (useBackground = false) => {
    try {
      if (useBackground) {
        setIsRefreshing(true)
      } else {
        setIsLoading(true)
      }

      const response = await api.listDocuments()

      if (response.success && Array.isArray(response.data)) {
        setDocuments(response.data)
        setError(null)
      } else {
        const message = response.message || "Could not load documents"
        setDocuments([])
        setError(message)
        toast.error(message)
      }
    } catch (err) {
      console.error("Error fetching documents:", err)
      const message = "An unexpected error occurred while loading documents"
      setError(message)
      toast.error(message)
    } finally {
      if (useBackground) {
        setIsRefreshing(false)
      } else {
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const stats = useMemo(() => {
    const total = documents.length
    const processed = documents.filter(doc => doc.processing_status === "processed" || doc.processing_status === "completed").length
    const processing = documents.filter(doc => doc.processing_status === "processing" || doc.processing_status === "pending").length
    const failed = documents.filter(doc => doc.processing_status === "failed").length
    const totalSize = documents.reduce((acc, doc) => acc + (doc.file_size || 0), 0)

    return {
      total,
      processed,
      processing,
      failed,
      totalSize,
    }
  }, [documents])

  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) {
      return documents
    }

    const query = searchQuery.trim().toLowerCase()

    return documents.filter(doc => {
      const nameMatch = [doc.original_filename, doc.filename].some(value => value?.toLowerCase().includes(query))
      const tagMatch = doc.tags?.some(tag => tag.toLowerCase().includes(query))
      return nameMatch || tagMatch
    })
  }, [documents, searchQuery])

  const sortedDocuments = useMemo(() => {
    return [...filteredDocuments].sort((a, b) => {
      const aDate = new Date(a.uploaded_at).getTime()
      const bDate = new Date(b.uploaded_at).getTime()
      return bDate - aDate
    })
  }, [filteredDocuments])

  const handleRefresh = () => {
    fetchDocuments(true)
  }

  const handleDownload = async (doc: ApiDocument) => {
    try {
      setDownloadingId(doc.id)
      const file = await api.downloadDocument(doc.id)

      if (!file) {
        toast.error("Could not download document")
        return
      }

      const url = window.URL.createObjectURL(file)
      const link = window.document.createElement("a")
      link.href = url
      link.download = doc.original_filename || doc.filename
      window.document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      window.document.body.removeChild(link)
      toast.success("Document downloaded")
    } catch (err) {
      console.error("Error downloading document:", err)
      toast.error("An error occurred while downloading the document")
    } finally {
      setDownloadingId(null)
    }
  }

  const handleDelete = async (doc: ApiDocument) => {
    const confirmed = window.confirm(`Delete ${doc.original_filename || doc.filename}? This cannot be undone.`)

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(doc.id)
      const response = await api.deleteDocument(doc.id)

      if (response.success) {
        toast.success("Document deleted")
        setDocuments(prev => prev.filter(item => item.id !== doc.id))
      } else {
        toast.error(response.message || "Failed to delete document")
      }
    } catch (err) {
      console.error("Error deleting document:", err)
      toast.error("An error occurred while deleting the document")
    } finally {
      setDeletingId(null)
    }
  }

  const hasDocuments = sortedDocuments.length > 0

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-slate-900">Knowledge Base</h1>
          <p className="text-slate-600">Organize and manage your AI knowledge repository</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading || isRefreshing}>
            {isRefreshing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Refresh
          </Button>
          <Button asChild>
            <Link href="/dashboard/knowledge/upload">
              <Plus className="mr-2 h-4 w-4" />
              Upload Documents
            </Link>
          </Button>
        </div>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Total Documents</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{stats.total}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Processed</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-600">{stats.processed}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Processing</p>
              <p className="mt-2 text-2xl font-semibold text-amber-600">{stats.processing}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Storage Used</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{formatFileSize(stats.totalSize || 0)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="gap-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Documents</CardTitle>
              {error && !isLoading && !hasDocuments ? (
                <p className="mt-1 text-sm text-rose-600">{error}</p>
              ) : null}
            </div>
            {stats.failed > 0 ? (
              <Badge variant="secondary" className="bg-rose-100 text-rose-700">
                {stats.failed} failed
              </Badge>
            ) : null}
          </div>
          <div className="w-full max-w-lg">
            <Input
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder="Search by file name or tag"
              leftIcon={<Search className="h-4 w-4 text-slate-500" />}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="grid grid-cols-[1.5fr,1fr,1fr,1fr,1fr] items-center gap-4 rounded-lg border border-slate-100 p-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-lg" />
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-36" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-6 w-32 rounded-full" />
                  </div>
                ))}
              </div>
            ) : hasDocuments ? (
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">Document</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">Uploaded</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">Size</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">Tags</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {sortedDocuments.map(doc => (
                    <tr key={doc.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{doc.original_filename || doc.filename}</p>
                            <p className="text-xs text-slate-500">ID: {doc.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{doc.uploaded_at ? formatDate(doc.uploaded_at) : "Unknown"}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[doc.processing_status]}`}>
                          {statusLabels[doc.processing_status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{formatFileSize(doc.file_size)}</td>
                      <td className="px-4 py-3">
                        {doc.tags && doc.tags.length > 0 ? (
                          <div className="flex flex-wrap items-center gap-2">
                            {doc.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="border-slate-200 bg-slate-100 text-slate-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">No tags</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/dashboard/knowledge/view/${doc.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(doc)}
                            disabled={downloadingId === doc.id}
                          >
                            {downloadingId === doc.id ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="mr-2 h-4 w-4" />
                            )}
                            Download
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-rose-600 hover:text-rose-700"
                            onClick={() => handleDelete(doc)}
                            disabled={deletingId === doc.id}
                          >
                            {deletingId === doc.id ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="mr-2 h-4 w-4" />
                            )}
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-medium text-slate-900">No documents yet</p>
                  <p className="text-sm text-slate-500">Upload your first file to populate the knowledge base.</p>
                  {error && <p className="text-sm text-rose-600">{error}</p>}
                </div>
                <Button asChild>
                  <Link href="/dashboard/knowledge/upload">
                    <Plus className="mr-2 h-4 w-4" />
                    Upload documents
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
