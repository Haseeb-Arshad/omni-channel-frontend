"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, ChevronDown, Plus, MoreHorizontal, Folder, FileText, User, Calendar, Grid3X3, Menu, X, Download, Eye, Trash2, Filter, SortDesc, FolderOpen, Home, Database, RefreshCw, Settings, Bell, Star } from "lucide-react"
import { toast } from "sonner"
import api, { Document as ApiDocument } from "@/lib/api"
import { formatFileSize, formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

// Folder structure interface
interface FolderItem {
  id: string
  name: string
  type: 'folder' | 'file'
  fileCount?: number
  children?: FolderItem[]
  icon?: React.ReactNode
  color?: string
  addedBy?: string
  lastModified?: string
  size?: number
}

// Sample folder structure matching the image
const folderStructure: FolderItem[] = [
  {
    id: "general",
    name: "General Knowledge",
    type: "folder",
    fileCount: 10,
    children: [
      {
        id: "onboarding",
        name: "Onboarding",
        type: "folder",
        fileCount: 3,
        children: [
          { id: "subfolder1", name: "Subfolder 1", type: "folder", fileCount: 5 },
          { id: "subfolder2", name: "Subfolder 2", type: "folder", fileCount: 10 }
        ]
      },
      { id: "integrations", name: "Integrations", type: "folder", fileCount: 0 },
      { id: "documents", name: "Documents", type: "folder", fileCount: 0 }
    ]
  },
  { id: "onboarding-design", name: "Onboarding Design", type: "folder", fileCount: 0 },
  { id: "team-interviews", name: "Team Interviews", type: "folder", fileCount: 0 }
]

// Sample files matching the image
const sampleFiles: FolderItem[] = [
  {
    id: "onboarding-guide",
    name: "Onboarding-Guide.pdf",
    type: "file",
    addedBy: "kevin@mail.com",
    lastModified: "2024-01-15",
    size: 2450000
  },
  {
    id: "product-roadmap",
    name: "Product-Roadmap.docx",
    type: "file",
    addedBy: "antonwe@gmail.com",
    lastModified: "2024-01-14",
    size: 1850000
  }
]

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("general")
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["general", "onboarding"])
  const [activeView, setActiveView] = useState<"folders" | "tags">("folders")
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState("General Knowledge")
  const [isLoading, setIsLoading] = useState(false)
  const [documents, setDocuments] = useState<ApiDocument[]>([])
  const [currentFiles, setCurrentFiles] = useState(sampleFiles)
  
  // Toggle folder expansion
  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    )
  }

  // Render folder tree
  const renderFolderTree = (folders: FolderItem[], level = 0) => {
    return folders.map(folder => (
      <div key={folder.id} className="select-none">
        <div 
          className={cn(
            "flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer rounded-md hover:bg-gray-100 transition-colors",
            selectedFolder === folder.id && "bg-gray-100"
          )}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => {
            if (folder.children) {
              toggleFolder(folder.id)
            }
            setSelectedFolder(folder.id)
          }}
        >
          {folder.children && (
            <ChevronDown 
              className={cn(
                "h-4 w-4 transition-transform text-gray-500",
                !expandedFolders.includes(folder.id) && "-rotate-90"
              )}
            />
          )}
          <Folder className="h-4 w-4 text-gray-600" />
          <span className="text-gray-700">{folder.name}</span>
          {folder.fileCount !== undefined && (
            <span className="ml-auto text-xs text-gray-500">{folder.fileCount}</span>
          )}
        </div>
        {folder.children && expandedFolders.includes(folder.id) && (
          <div className="ml-2">
            {renderFolderTree(folder.children, level + 1)}
          </div>
        )}
      </div>
    ))
  }

  // Get avatar color based on email
  const getAvatarColor = (email: string) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500']
    const index = email.charCodeAt(0) % colors.length
    return colors[index]
  }

  // Get initials from email
  const getInitials = (email: string) => {
    const name = email.split('@')[0]
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="h-full bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">Knowledge Base</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Settings className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Knowledge Base Selector */}
          <div className="relative">
            <button className="w-full flex items-center justify-between p-2 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-sm font-medium text-gray-700">{selectedKnowledgeBase}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={cn(
              "flex-1 py-2 px-4 text-sm font-medium transition-colors",
              activeView === "folders" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-gray-900"
            )}
            onClick={() => setActiveView("folders")}
          >
            Folders
          </button>
          <button
            className={cn(
              "flex-1 py-2 px-4 text-sm font-medium transition-colors",
              activeView === "tags" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-gray-900"
            )}
            onClick={() => setActiveView("tags")}
          >
            Tags
          </button>
        </div>

        {/* Folder Tree */}
        <div className="flex-1 overflow-y-auto p-4">
          {renderFolderTree(folderStructure)}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Folders</h2>
          
          {/* Folder Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { name: "Onboarding", files: "15 Files", color: "bg-blue-500" },
              { name: "Integrations", files: "5 Files", color: "bg-green-500" },
              { name: "Documents", files: "10 Files", color: "bg-purple-500" }
            ].map((folder, index) => (
              <motion.div
                key={folder.name}
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                        <Folder className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex items-center gap-1">
                        <div className={cn("w-3 h-3 rounded-full", folder.color)}></div>
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{folder.name}</h3>
                  <p className="text-sm text-gray-600">{folder.files}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Files Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Files</h3>
            
            {/* Files Table Header */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm font-medium text-gray-600">
              <div>Name</div>
              <div className="text-right">Added By</div>
            </div>
            
            {/* Files List */}
            <div className="space-y-3">
              {currentFiles.map((file) => (
                <motion.div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{file.name}</h4>
                      <p className="text-sm text-gray-600">{formatFileSize(file.size || 0)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white",
                        getAvatarColor(file.addedBy || '')
                      )}>
                        {getInitials(file.addedBy || '')}
                      </div>
                      <span className="text-sm text-gray-700">{file.addedBy}</span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
