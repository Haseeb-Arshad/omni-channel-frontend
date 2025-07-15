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
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Knowledge Base 📚
          </motion.h1>
          <motion.p 
            className="text-slate-600 text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Organize and manage your AI knowledge repository
          </motion.p>
        </div>
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button 
            className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/30 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all duration-200 rounded-2xl font-semibold shadow-lg shadow-black/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </motion.button>
          <motion.button 
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="h-4 w-4" />
            <span>Upload Documents</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-black/5 border border-white/20 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100/30 to-red-100/30 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                    <Database className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Browse</h2>
                </div>
                <motion.button 
                  className="p-2 rounded-xl hover:bg-white/60 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="h-4 w-4 text-slate-600" />
                </motion.button>
              </div>

              {/* Knowledge Base Selector */}
              <motion.div 
                className="relative mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <button className="w-full flex items-center justify-between p-3 text-left bg-white/60 rounded-2xl hover:bg-white/80 transition-all duration-200 shadow-sm">
                  <span className="text-sm font-semibold text-slate-700">{selectedKnowledgeBase}</span>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>
              </motion.div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search knowledge..."
                  className="w-full pl-11 pr-4 py-3 bg-white/60 border border-white/30 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all duration-200 placeholder:text-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Tabs */}
              <div className="flex bg-white/40 rounded-2xl p-1 mb-6">
                <button
                  className={cn(
                    "flex-1 py-2 px-3 text-sm font-semibold rounded-xl transition-all duration-200",
                    activeView === "folders" 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-slate-600 hover:text-slate-900"
                  )}
                  onClick={() => setActiveView("folders")}
                >
                  Folders
                </button>
                <button
                  className={cn(
                    "flex-1 py-2 px-3 text-sm font-semibold rounded-xl transition-all duration-200",
                    activeView === "tags" 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-slate-600 hover:text-slate-900"
                  )}
                  onClick={() => setActiveView("tags")}
                >
                  Tags
                </button>
              </div>

              {/* Folder Tree */}
              <div className="space-y-2">
                {renderFolderTree(folderStructure)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-black/5 border border-white/20 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full translate-y-20 -translate-x-20"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <FolderOpen className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Knowledge Repository</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button 
                    className="p-2 rounded-xl hover:bg-white/60 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Grid3X3 className="h-5 w-5 text-slate-600" />
                  </motion.button>
                  <motion.button 
                    className="p-2 rounded-xl hover:bg-white/60 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Filter className="h-5 w-5 text-slate-600" />
                  </motion.button>
                </div>
              </div>
              
              {/* Folder Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {[
                  { name: "Onboarding", files: "15 Files", gradient: "from-blue-500 to-indigo-600", bgGradient: "from-blue-100/80 to-indigo-100/80" },
                  { name: "Integrations", files: "5 Files", gradient: "from-green-500 to-emerald-600", bgGradient: "from-green-100/80 to-emerald-100/80" },
                  { name: "Documents", files: "10 Files", gradient: "from-purple-500 to-violet-600", bgGradient: "from-purple-100/80 to-violet-100/80" }
                ].map((folder, index) => (
                  <motion.div
                    key={folder.name}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className={`bg-gradient-to-br ${folder.bgGradient} rounded-2xl p-6 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 border border-white/30 relative overflow-hidden`}>
                      {/* Floating Orb */}
                      <motion.div 
                        className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${folder.gradient} rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                      />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div 
                            className={`w-12 h-12 bg-gradient-to-br ${folder.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                            whileHover={{ rotate: 5, scale: 1.1 }}
                          >
                            <Folder className="h-6 w-6 text-white" />
                          </motion.div>
                          <motion.button
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-xl hover:bg-white/40"
                            whileHover={{ scale: 1.1 }}
                          >
                            <MoreHorizontal className="h-4 w-4 text-slate-600" />
                          </motion.button>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 text-lg">{folder.name}</h3>
                        <p className="text-sm text-slate-700 font-medium">{folder.files}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Files Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Recent Files</h3>
                  </div>
                  <motion.button 
                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium flex items-center space-x-1 group"
                    whileHover={{ x: 2 }}
                  >
                    <span>View all</span>
                    <ChevronDown className="h-4 w-4 group-hover:translate-x-1 transition-transform rotate-[-90deg]" />
                  </motion.button>
                </div>
                
                {/* Files List */}
                <div className="space-y-4">
                  {currentFiles.map((file, index) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                      className="group flex items-center justify-between p-4 bg-white/60 rounded-2xl border border-white/30 hover:bg-white/80 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 cursor-pointer"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        >
                          <FileText className="h-6 w-6 text-white" />
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-slate-900 group-hover:text-slate-800 transition-colors">{file.name}</h4>
                          <p className="text-sm text-slate-600 font-medium">{formatFileSize(file.size || 0)} • {formatDate(file.lastModified || '')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md",
                            getAvatarColor(file.addedBy || '')
                          )}>
                            {getInitials(file.addedBy || '')}
                          </div>
                          <span className="text-sm text-slate-700 font-medium">{file.addedBy}</span>
                        </div>
                        <motion.button 
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-xl hover:bg-white/60"
                          whileHover={{ scale: 1.1 }}
                        >
                          <MoreHorizontal className="h-4 w-4 text-slate-500" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
