"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Plus, 
  Settings, 
  Play, 
  Pause, 
  MoreVertical,
  Activity,
  MessageSquare,
  Clock,
  Users,
  Zap,
  Brain,
  Mic,
  Eye,
  Edit,
  Trash2,
  Copy,
  ChevronRight,
  Search,
  Filter,
  Star,
  TrendingUp,
  Calendar,
  ArrowUp,
  ArrowDown,
  BarChart3
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'training'
  persona: string
  channels: string[]
  conversations: number
  responseTime: string
  accuracy: number
  lastActive: string
  voiceEnabled: boolean
  avatar: string
  performance: {
    totalMessages: number
    successRate: number
    avgResponseTime: number
    trend: 'up' | 'down'
  }
}

const AgentCard = ({ agent, delay = 0 }: { agent: Agent; delay?: number }) => (
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
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    {/* Floating Orb */}
    <motion.div 
      className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
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
            className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <Bot className="h-7 w-7 text-white" />
          </motion.div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-gray-800 transition-colors">{agent.name}</h3>
            <p className="text-sm text-gray-600">{agent.description}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                agent.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : agent.status === 'training'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {agent.status === 'active' && <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />}
                {agent.status}
              </span>
              {agent.voiceEnabled && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                  <Mic className="h-3 w-3 mr-1" />
                  Voice
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <motion.div 
          className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 border border-green-200/50 rounded-2xl p-4 text-center shadow-sm group-hover:shadow-md transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-xs font-semibold text-green-700 mb-1">Conversations</p>
          <p className="text-2xl font-bold text-green-800">{agent.conversations}</p>
        </motion.div>
        <motion.div 
          className="bg-gradient-to-br from-blue-100/80 to-indigo-100/80 border border-blue-200/50 rounded-2xl p-4 text-center shadow-sm group-hover:shadow-md transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-xs font-semibold text-blue-700 mb-1">Accuracy</p>
          <p className="text-2xl font-bold text-blue-800">{agent.accuracy}%</p>
        </motion.div>
      </div>

      {/* Performance */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Performance</span>
          <div className="flex items-center space-x-1">
            {agent.performance.trend === 'up' ? (
              <ArrowUp className="h-3 w-3 text-green-600" />
            ) : (
              <ArrowDown className="h-3 w-3 text-red-600" />
            )}
            <span className={`text-xs font-semibold ${
              agent.performance.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {agent.performance.successRate}%
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${agent.performance.successRate}%` }}
            transition={{ delay: delay + 0.5, duration: 1 }}
          />
        </div>
      </div>

      {/* Channels */}
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-700 mb-2 block">Connected Channels</span>
        <div className="flex flex-wrap gap-2">
          {agent.channels.map((channel, index) => (
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
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
        >
          <Settings className="h-4 w-4 mr-2 inline" />
          Configure
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
        >
          <Eye className="h-4 w-4 mr-2 inline" />
          Monitor
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

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data for agents
  const agents: Agent[] = [
    {
      id: '1',
      name: 'Customer Support Agent',
      description: 'Handles customer inquiries and support tickets',
      status: 'active',
      persona: 'Helpful Assistant',
      channels: ['Email', 'WhatsApp', 'Web Chat'],
      conversations: 1247,
      responseTime: '2.3s',
      accuracy: 94,
      lastActive: '2 minutes ago',
      voiceEnabled: true,
      avatar: '/avatars/agent-1.png',
      performance: {
        totalMessages: 5420,
        successRate: 94,
        avgResponseTime: 2.3,
        trend: 'up'
      }
    },
    {
      id: '2',
      name: 'Sales Assistant',
      description: 'Helps with product inquiries and sales',
      status: 'active',
      persona: 'Sales Expert',
      channels: ['SMS', 'Facebook', 'Web Chat'],
      conversations: 892,
      responseTime: '1.8s',
      accuracy: 89,
      lastActive: '5 minutes ago',
      voiceEnabled: false,
      avatar: '/avatars/agent-2.png',
      performance: {
        totalMessages: 3210,
        successRate: 89,
        avgResponseTime: 1.8,
        trend: 'up'
      }
    },
    {
      id: '3',
      name: 'Technical Support',
      description: 'Provides technical assistance and troubleshooting',
      status: 'training',
      persona: 'Technical Expert',
      channels: ['Email', 'Discord'],
      conversations: 456,
      responseTime: '3.1s',
      accuracy: 87,
      lastActive: '1 hour ago',
      voiceEnabled: true,
      avatar: '/avatars/agent-3.png',
      performance: {
        totalMessages: 1890,
        successRate: 87,
        avgResponseTime: 3.1,
        trend: 'down'
      }
    },
    {
      id: '4',
      name: 'Marketing Assistant',
      description: 'Handles marketing campaigns and lead generation',
      status: 'inactive',
      persona: 'Marketing Specialist',
      channels: ['Instagram', 'Twitter'],
      conversations: 234,
      responseTime: '4.2s',
      accuracy: 82,
      lastActive: '2 days ago',
      voiceEnabled: false,
      avatar: '/avatars/agent-4.png',
      performance: {
        totalMessages: 980,
        successRate: 82,
        avgResponseTime: 4.2,
        trend: 'down'
      }
    }
  ]

  // Stats for the overview
  const stats = [
    {
      title: 'Total Agents',
      value: '12',
      change: '+2',
      icon: Bot,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Active Conversations',
      value: '2,847',
      change: '+12%',
      icon: MessageSquare,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Avg Response Time',
      value: '2.1s',
      change: '-0.3s',
      icon: Clock,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      title: 'Success Rate',
      value: '91.2%',
      change: '+3.1%',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-600'
    }
  ]

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || agent.status === filterStatus
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
        <h1 className="text-2xl font-bold text-gray-900 mb-1">AI Agents Dashboard</h1>
        <p className="text-gray-600">Manage and monitor your AI agents across all channels</p>
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
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="training">Training</option>
            </select>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Agent</span>
        </motion.button>
      </motion.div>

      {/* Agents Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {filteredAgents.map((agent, index) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            delay={0.9 + index * 0.1}
          />
        ))}
      </motion.div>

      {filteredAgents.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No agents found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Create your first AI agent to get started'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Create Your First Agent</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )