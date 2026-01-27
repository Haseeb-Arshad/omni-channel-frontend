"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EditorialHeader } from '@/components/ui/editorial/editorial-header'
import { EditorialStatTile } from '@/components/ui/editorial/editorial-stat-tile'
import { 
  Bot, 
  Plus, 
  Settings, 
  Edit, 
  Trash2,
  Copy,
  Brain,
  MessageSquare,
  Users,
  Clock,
  Star,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Search,
  Filter,
  Sparkles,
  Mic,
  Eye,
  Play,
  Save,
  X
} from 'lucide-react'

interface Persona {
  id: string
  name: string
  description: string
  tone: string
  model: string
  systemPrompt: string
  status: 'active' | 'inactive' | 'draft'
  usageCount: number
  successRate: number
  lastUsed: string
  channels: string[]
  voiceEnabled: boolean
  avatar?: string
  performance: {
    totalInteractions: number
    avgRating: number
    responseTime: number
    trend: 'up' | 'down'
  }
}

const PersonaCard = ({ persona, delay = 0, onEdit, onDuplicate, onDelete }: { 
  persona: Persona
  delay?: number
  onEdit: (persona: Persona) => void
  onDuplicate: (persona: Persona) => void
  onDelete: (id: string) => void
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      duration: 0.6, 
      delay,
      ease: [0.22, 1, 0.36, 1]
    }}
    whileHover={{ 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.2 }
    }}
    className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg shadow-black/5 border border-white/20 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 overflow-hidden"
  >
    {/* Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    {/* Floating Orb */}
    <motion.div 
      className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
      animate={{ 
        rotate: 360,
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
    ></motion.div>
    
    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <motion.div 
            className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <Brain className="h-7 w-7 text-white" />
          </motion.div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-gray-800 transition-colors">{persona.name}</h3>
            <p className="text-sm text-gray-600">{persona.description}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                persona.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : persona.status === 'draft'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {persona.status === 'active' && <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />}
                {persona.status}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 capitalize">
                {persona.tone}
              </span>
              {persona.voiceEnabled && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                  <Mic className="h-3 w-3 mr-1" />
                  Voice
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <motion.div 
          className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 border border-green-200/50 rounded-2xl p-4 text-center shadow-sm group-hover:shadow-md transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-xs font-semibold text-green-700 mb-1">Interactions</p>
          <p className="text-2xl font-bold text-green-800">{persona.performance.totalInteractions}</p>
        </motion.div>
        <motion.div 
          className="bg-gradient-to-br from-blue-100/80 to-indigo-100/80 border border-blue-200/50 rounded-2xl p-4 text-center shadow-sm group-hover:shadow-md transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-xs font-semibold text-blue-700 mb-1">Rating</p>
          <p className="text-2xl font-bold text-blue-800">{persona.performance.avgRating}/5</p>
        </motion.div>
      </div>

      {/* Performance */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Success Rate</span>
          <div className="flex items-center space-x-1">
            {persona.performance.trend === 'up' ? (
              <ArrowUp className="h-3 w-3 text-green-600" />
            ) : (
              <ArrowDown className="h-3 w-3 text-red-600" />
            )}
            <span className={`text-xs font-semibold ${
              persona.performance.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {persona.successRate}%
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${persona.successRate}%` }}
            transition={{ delay: delay + 0.5, duration: 1 }}
          />
        </div>
      </div>

      {/* Channels */}
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-700 mb-2 block">Connected Channels</span>
        <div className="flex flex-wrap gap-2">
          {persona.channels.map((channel, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
            >
              {channel}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onEdit(persona)}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
        >
          <Edit className="h-4 w-4 mr-2 inline" />
          Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onDuplicate(persona)}
          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
        >
          <Copy className="h-4 w-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onDelete(persona.id)}
          className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-all duration-200"
        >
          <Trash2 className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  </motion.div>
)


export default function PersonaPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null)

  // Mock data for personas
  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: '1',
      name: 'Customer Support Assistant',
      description: 'Friendly and helpful customer service representative',
      tone: 'professional',
      model: 'gpt-4o',
      systemPrompt: 'You are a helpful customer support assistant...',
      status: 'active',
      usageCount: 1247,
      successRate: 94,
      lastUsed: '2 minutes ago',
      channels: ['Email', 'WhatsApp', 'Web Chat'],
      voiceEnabled: true,
      performance: {
        totalInteractions: 5420,
        avgRating: 4.8,
        responseTime: 2.3,
        trend: 'up'
      }
    },
    {
      id: '2',
      name: 'Sales Expert',
      description: 'Persuasive sales assistant for product inquiries',
      tone: 'persuasive',
      model: 'gpt-4o',
      systemPrompt: 'You are a knowledgeable sales expert...',
      status: 'active',
      usageCount: 892,
      successRate: 89,
      lastUsed: '5 minutes ago',
      channels: ['SMS', 'Facebook', 'Web Chat'],
      voiceEnabled: false,
      performance: {
        totalInteractions: 3210,
        avgRating: 4.6,
        responseTime: 1.8,
        trend: 'up'
      }
    },
    {
      id: '3',
      name: 'Technical Specialist',
      description: 'Expert in technical troubleshooting and support',
      tone: 'technical',
      model: 'gpt-4o',
      systemPrompt: 'You are a technical support specialist...',
      status: 'draft',
      usageCount: 456,
      successRate: 87,
      lastUsed: '1 hour ago',
      channels: ['Email', 'Discord'],
      voiceEnabled: true,
      performance: {
        totalInteractions: 1890,
        avgRating: 4.4,
        responseTime: 3.1,
        trend: 'down'
      }
    },
    {
      id: '4',
      name: 'Casual Chat Bot',
      description: 'Friendly and casual conversational assistant',
      tone: 'casual',
      model: 'gpt-4o-mini',
      systemPrompt: 'You are a casual and friendly chat assistant...',
      status: 'inactive',
      usageCount: 234,
      successRate: 82,
      lastUsed: '2 days ago',
      channels: ['Instagram', 'Twitter'],
      voiceEnabled: false,
      performance: {
        totalInteractions: 980,
        avgRating: 4.2,
        responseTime: 4.2,
        trend: 'down'
      }
    }
  ])

  // Stats for the overview
  const stats = [
    {
      title: 'Total Personas',
      value: '8',
      change: '+2',
      icon: Brain,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Active Personas',
      value: '6',
      change: '+1',
      icon: Bot,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Avg Success Rate',
      value: '88.2%',
      change: '+2.1%',
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Total Interactions',
      value: '11.5K',
      change: '+15%',
      icon: MessageSquare,
      gradient: 'from-orange-500 to-red-600'
    }
  ]

  const handleEdit = (persona: Persona) => {
    setEditingPersona(persona)
  }

  const handleDuplicate = (persona: Persona) => {
    const newPersona = {
      ...persona,
      id: Date.now().toString(),
      name: `${persona.name} (Copy)`,
      status: 'draft' as const
    }
    setPersonas([...personas, newPersona])
  }

  const handleDelete = (id: string) => {
    setPersonas(personas.filter(p => p.id !== id))
  }

  const handleCreateNew = () => {
    const newPersona: Persona = {
      id: Date.now().toString(),
      name: 'New Persona',
      description: 'Describe your persona\'s purpose',
      tone: 'friendly',
      model: 'gpt-4o',
      systemPrompt: 'You are a helpful AI assistant...',
      status: 'draft',
      usageCount: 0,
      successRate: 0,
      lastUsed: 'Never',
      channels: [],
      voiceEnabled: false,
      performance: {
        totalInteractions: 0,
        avgRating: 0,
        responseTime: 0,
        trend: 'up'
      }
    }
    setPersonas([...personas, newPersona])
    setEditingPersona(newPersona)
  }

  const filteredPersonas = personas.filter(persona => {
    const matchesSearch = persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         persona.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || persona.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="editorial-container">
      <div className="editorial-panel">
        <EditorialHeader
          title="AI Personas"
          description="Create and manage AI personalities for different use cases"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <EditorialStatTile
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              trend={stat.change.startsWith('+') ? 'up' : 'down'}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search personas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCreateNew}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Persona</span>
          </button>
        </div>

        {/* Personas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPersonas.map((persona, index) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              delay={0.9 + index * 0.1}
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {filteredPersonas.length === 0 && (
          <div className="text-center py-12">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No personas found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Create your first AI persona to get started'}
            </p>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Create Your First Persona</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
