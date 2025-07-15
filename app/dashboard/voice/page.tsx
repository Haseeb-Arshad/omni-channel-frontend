"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Mic, 
  Plus, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Settings, 
  Edit, 
  Trash2,
  Copy,
  Download,
  Upload,
  Waves,
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
  Brain,
  Eye,
  Save,
  X,
  MoreVertical,
  Headphones,
  Radio
} from 'lucide-react'

interface VoiceModel {
  id: string
  name: string
  description: string
  provider: 'elevenlabs' | 'openai' | 'azure'
  language: string
  gender: 'male' | 'female' | 'neutral'
  accent: string
  status: 'active' | 'inactive' | 'training'
  usageCount: number
  quality: number
  lastUsed: string
  sampleUrl?: string
  isPlaying?: boolean
  performance: {
    totalGenerations: number
    avgRating: number
    responseTime: number
    trend: 'up' | 'down'
  }
}

const VoiceModelCard = ({ voice, delay = 0, onPlay, onEdit, onDuplicate, onDelete }: { 
  voice: VoiceModel
  delay?: number
  onPlay: (voice: VoiceModel) => void
  onEdit: (voice: VoiceModel) => void
  onDuplicate: (voice: VoiceModel) => void
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
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    {/* Floating Orb */}
    <motion.div 
      className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
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
            className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            {voice.isPlaying ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Radio className="h-7 w-7 text-white" />
              </motion.div>
            ) : (
              <Mic className="h-7 w-7 text-white" />
            )}
          </motion.div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-gray-800 transition-colors">{voice.name}</h3>
            <p className="text-sm text-gray-600">{voice.description}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                voice.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : voice.status === 'training'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {voice.status === 'active' && <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />}
                {voice.status}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 capitalize">
                {voice.provider}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 capitalize">
                {voice.gender}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onPlay(voice)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {voice.isPlaying ? (
              <Pause className="h-4 w-4 text-gray-500" />
            ) : (
              <Play className="h-4 w-4 text-gray-500" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </motion.button>
        </div>
      </div>

      {/* Voice Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gradient-to-br from-blue-100/80 to-indigo-100/80 border border-blue-200/50 rounded-2xl p-3 text-center shadow-sm group-hover:shadow-md transition-all duration-300">
          <p className="text-xs font-semibold text-blue-700 mb-1">Language</p>
          <p className="text-sm font-bold text-blue-800">{voice.language}</p>
        </div>
        <div className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 border border-green-200/50 rounded-2xl p-3 text-center shadow-sm group-hover:shadow-md transition-all duration-300">
          <p className="text-xs font-semibold text-green-700 mb-1">Quality</p>
          <p className="text-sm font-bold text-green-800">{voice.quality}/10</p>
        </div>
      </div>

      {/* Performance */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Usage</span>
          <div className="flex items-center space-x-1">
            {voice.performance.trend === 'up' ? (
              <ArrowUp className="h-3 w-3 text-green-600" />
            ) : (
              <ArrowDown className="h-3 w-3 text-red-600" />
            )}
            <span className={`text-xs font-semibold ${
              voice.performance.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {voice.usageCount}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(voice.usageCount / 10, 100)}%` }}
            transition={{ delay: delay + 0.5, duration: 1 }}
          />
        </div>
      </div>

      {/* Accent & Last Used */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Accent:</span>
          <span className="font-medium text-gray-900">{voice.accent}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last Used:</span>
          <span className="font-medium text-gray-900">{voice.lastUsed}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onEdit(voice)}
          className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
        >
          <Settings className="h-4 w-4 mr-2 inline" />
          Configure
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onDuplicate(voice)}
          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
        >
          <Copy className="h-4 w-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onDelete(voice.id)}
          className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-all duration-200"
        >
          <Trash2 className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  </motion.div>
)

const StatCard = ({ title, value, change, icon: Icon, trend = 'up', gradient, delay = 0 }: {
  title: string
  value: string
  change: string
  icon: any
  trend?: 'up' | 'down'
  gradient: string
  delay?: number
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
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
    
    <div className="relative z-10 flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-600 mb-2">{title}</p>
        <motion.p 
          className="text-3xl font-bold text-slate-900 mb-3"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.4, ease: "backOut" }}
        >
          {value}
        </motion.p>
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: delay + 0.4, duration: 0.3 }}
            className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
              trend === 'up' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}
          >
            {trend === 'up' ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            {change}
          </motion.div>
          <span className="text-xs text-slate-500 ml-2">vs last week</span>
        </div>
      </div>
      
      <motion.div 
        className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="h-7 w-7 text-white" />
      </motion.div>
    </div>
  </motion.div>
)

export default function VoiceStudioPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterProvider, setFilterProvider] = useState('all')
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)

  // Mock data for voice models
  const [voiceModels, setVoiceModels] = useState<VoiceModel[]>([
    {
      id: '1',
      name: 'Sarah Professional',
      description: 'Professional female voice for customer service',
      provider: 'elevenlabs',
      language: 'English (US)',
      gender: 'female',
      accent: 'American',
      status: 'active',
      usageCount: 1247,
      quality: 9,
      lastUsed: '2 minutes ago',
      performance: {
        totalGenerations: 5420,
        avgRating: 4.8,
        responseTime: 2.3,
        trend: 'up'
      }
    },
    {
      id: '2',
      name: 'Marcus Friendly',
      description: 'Warm and approachable male voice',
      provider: 'elevenlabs',
      language: 'English (UK)',
      gender: 'male',
      accent: 'British',
      status: 'active',
      usageCount: 892,
      quality: 8,
      lastUsed: '5 minutes ago',
      performance: {
        totalGenerations: 3210,
        avgRating: 4.6,
        responseTime: 1.8,
        trend: 'up'
      }
    },
    {
      id: '3',
      name: 'Alex Technical',
      description: 'Clear and precise voice for technical support',
      provider: 'openai',
      language: 'English (US)',
      gender: 'neutral',
      accent: 'American',
      status: 'training',
      usageCount: 456,
      quality: 7,
      lastUsed: '1 hour ago',
      performance: {
        totalGenerations: 1890,
        avgRating: 4.4,
        responseTime: 3.1,
        trend: 'down'
      }
    },
    {
      id: '4',
      name: 'Emma Casual',
      description: 'Casual and friendly voice for social interactions',
      provider: 'azure',
      language: 'English (AU)',
      gender: 'female',
      accent: 'Australian',
      status: 'inactive',
      usageCount: 234,
      quality: 6,
      lastUsed: '2 days ago',
      performance: {
        totalGenerations: 980,
        avgRating: 4.2,
        responseTime: 4.2,
        trend: 'down'
      }
    }
  ])

  // Stats for the overview
  const stats = [
    {
      title: 'Voice Models',
      value: '12',
      change: '+3',
      icon: Mic,
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Active Voices',
      value: '8',
      change: '+2',
      icon: Radio,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Total Generations',
      value: '24.7K',
      change: '+18%',
      icon: Waves,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Avg Quality Score',
      value: '8.2/10',
      change: '+0.3',
      icon: Star,
      gradient: 'from-orange-500 to-red-600'
    }
  ]

  const handlePlay = (voice: VoiceModel) => {
    if (playingVoice === voice.id) {
      setPlayingVoice(null)
      setVoiceModels(prev => prev.map(v => ({ ...v, isPlaying: false })))
    } else {
      setPlayingVoice(voice.id)
      setVoiceModels(prev => prev.map(v => ({ 
        ...v, 
        isPlaying: v.id === voice.id 
      })))
      
      // Simulate audio playback
      setTimeout(() => {
        setPlayingVoice(null)
        setVoiceModels(prev => prev.map(v => ({ ...v, isPlaying: false })))
      }, 3000)
    }
  }

  const handleEdit = (voice: VoiceModel) => {
    console.log('Edit voice:', voice.name)
  }

  const handleDuplicate = (voice: VoiceModel) => {
    const newVoice = {
      ...voice,
      id: Date.now().toString(),
      name: `${voice.name} (Copy)`,
      status: 'inactive' as const
    }
    setVoiceModels([...voiceModels, newVoice])
  }

  const handleDelete = (id: string) => {
    setVoiceModels(voiceModels.filter(v => v.id !== id))
  }

  const handleCreateNew = () => {
    const newVoice: VoiceModel = {
      id: Date.now().toString(),
      name: 'New Voice Model',
      description: 'Custom voice model',
      provider: 'elevenlabs',
      language: 'English (US)',
      gender: 'neutral',
      accent: 'American',
      status: 'training',
      usageCount: 0,
      quality: 5,
      lastUsed: 'Never',
      performance: {
        totalGenerations: 0,
        avgRating: 0,
        responseTime: 0,
        trend: 'up'
      }
    }
    setVoiceModels([...voiceModels, newVoice])
  }

  const filteredVoices = voiceModels.filter(voice => {
    const matchesSearch = voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         voice.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterProvider === 'all' || voice.provider === filterProvider
    return matchesSearch && matchesFilter
  })

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Voice Studio</h1>
        <p className="text-gray-600">Create and manage AI voice models with ElevenLabs integration</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            gradient={stat.gradient}
            delay={0.3 + index * 0.1}
          />
        ))}
      </motion.div>

      {/* Controls */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search voice models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterProvider}
              onChange={(e) => setFilterProvider(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            >
              <option value="all">All Providers</option>
              <option value="elevenlabs">ElevenLabs</option>
              <option value="openai">OpenAI</option>
              <option value="azure">Azure</option>
            </select>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreateNew}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Voice Model</span>
        </motion.button>
      </motion.div>

      {/* Voice Models Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {filteredVoices.map((voice, index) => (
          <VoiceModelCard
            key={voice.id}
            voice={voice}
            delay={0.9 + index * 0.1}
            onPlay={handlePlay}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        ))}
      </motion.div>

      {filteredVoices.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Mic className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No voice models found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || filterProvider !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Create your first voice model to get started'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateNew}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Create Your First Voice Model</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}