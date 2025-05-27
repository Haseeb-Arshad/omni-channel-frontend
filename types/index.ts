export interface User {
  id: string
  name: string
  email: string
  image?: string
  role: string
}

export interface Channel {
  id: string
  name: string
  type: 'twilio' | 'telegram' | 'whatsapp' | 'slack' | 'email' | 'other'
  isConnected: boolean
  credentials?: Record<string, string>
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant' | 'system'
  channel: string
  channelId?: string
  userId: string
  createdAt: Date
  metadata?: Record<string, any>
}

export interface KnowledgeBase {
  id: string
  name: string
  description?: string
  userId: string
  createdAt: Date
  updatedAt: Date
  documentCount: number
}

export interface Document {
  id: string
  originalFilename: string
  mimeType: string
  size: number
  knowledgeBaseId: string
  userId: string
  uploadedAt: Date
  contentSummary?: string
  status: 'processing' | 'processed' | 'failed'
}

export interface AIModel {
  id: string
  name: string
  provider: 'openai' | 'anthropic' | 'google' | 'other'
  version?: string
  capabilities: string[]
  maxContextLength: number
}

export interface AIPersona {
  id: string
  name: string
  description: string
  systemPrompt: string
  tone: string
  userId: string
  createdAt: Date
  updatedAt: Date
  modelId: string
}

export interface APIKey {
  id: string
  name: string
  key: string
  provider: string
  createdAt: Date
  lastUsed?: Date
  userId: string
}

export interface NavigationItem {
  title: string
  href: string
  icon?: React.ReactNode
  description?: string
  isActive?: boolean
  disabled?: boolean
  external?: boolean
}

export interface Tab {
  title: string
  value: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  status: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
