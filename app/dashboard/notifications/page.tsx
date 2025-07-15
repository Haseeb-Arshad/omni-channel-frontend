"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  BellRing,
  Check, 
  X, 
  Settings, 
  Filter,
  Search,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  MessageSquare,
  Users,
  Activity,
  Zap,
  Clock,
  Calendar,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Trash2,
  Archive,
  Star,
  ChevronRight
} from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  category: 'system' | 'agent' | 'channel' | 'conversation'
  timestamp: string
  isRead: boolean
  isStarred: boolean
  priority: 'low' | 'medium' | 'high' | 'critical'
  actionUrl?: string
  metadata?: {
    agentName?: string
    channelName?: string
    conversationId?: string
    count?: number
  }
}

const NotificationCard = ({ notification, delay = 0, onMarkRead, onStar, onDelete }: { 
  notification: Notification
  delay?: number
  onMarkRead: (id: string) => void
  onStar: (id: string) => void
  onDelete: (id: string) => void
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success':
        return 'border-green-200'
      case 'warning':
        return 'border-yellow-200'
      case 'error':
        return 'border-red-200'
      default:
        return 'border-blue-200'
    }
  }

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'from-green-50/50 to-emerald-50/50'
      case 'warning':
        return 'from-yellow-50/50 to-orange-50/50'
      case 'error':
        return 'from-red-50/50 to-pink-50/50'
      default:
        return 'from-blue-50/50 to-indigo-50/50'
    }
  }

  const getPriorityColor = () => {
    switch (notification.priority) {
      case 'critical':
        return 'bg-red-500'
      case 'high':
        return 'bg-orange-500'
      case 'medium':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -4, 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
      className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-black/5 border ${getBorderColor()} hover:shadow-xl hover:shadow-black/10 transition-all duration-300 overflow-hidden ${
        !notification.isRead ? 'ring-2 ring-blue-100' : ''
      }`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getBgColor()} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      {/* Priority Indicator */}
      {notification.priority !== 'low' && (
        <div className={`absolute top-0 left-0 w-1 h-full ${getPriorityColor()}`}></div>
      )}
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1">
            <motion.div 
              className="mt-0.5"
              whileHover={{ scale: 1.1 }}
            >
              {getIcon()}
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className={`font-semibold text-gray-900 ${!notification.isRead ? 'font-bold' : ''}`}>
                  {notification.title}
                </h4>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{notification.message}</p>
              
              {/* Metadata */}
              {notification.metadata && (
                <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                  {notification.metadata.agentName && (
                    <span className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{notification.metadata.agentName}</span>
                    </span>
                  )}
                  {notification.metadata.channelName && (
                    <span className="flex items-center space-x-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{notification.metadata.channelName}</span>
                    </span>
                  )}
                  {notification.metadata.count && (
                    <span className="flex items-center space-x-1">
                      <Activity className="h-3 w-3" />
                      <span>{notification.metadata.count} items</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1 ml-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onStar(notification.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                notification.isStarred 
                  ? 'text-yellow-500 hover:text-yellow-600' 
                  : 'text-gray-400 hover:text-yellow-500'
              }`}
            >
              <Star className={`h-4 w-4 ${notification.isStarred ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onMarkRead(notification.id)}
              className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
            >
              {notification.isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(notification.id)}
              className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold capitalize ${
              notification.category === 'system' ? 'bg-gray-100 text-gray-700' :
              notification.category === 'agent' ? 'bg-blue-100 text-blue-700' :
              notification.category === 'channel' ? 'bg-green-100 text-green-700' :
              'bg-purple-100 text-purple-700'
            }`}>
              {notification.category}
            </span>
            <span className="text-xs text-gray-500 flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{notification.timestamp}</span>
            </span>
          </div>
          
          {notification.actionUrl && (
            <motion.button
              whileHover={{ scale: 1.05, x: 2 }}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
            >
              <span>View Details</span>
              <ChevronRight className="h-3 w-3" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

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

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  // Mock data for notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'High Volume Alert',
      message: 'WhatsApp channel is experiencing 300% higher than normal message volume. Consider scaling resources.',
      type: 'warning',
      category: 'channel',
      timestamp: '2 minutes ago',
      isRead: false,
      isStarred: true,
      priority: 'high',
      metadata: {
        channelName: 'WhatsApp Business',
        count: 1247
      }
    },
    {
      id: '2',
      title: 'Agent Performance Alert',
      message: 'Customer Support Agent has achieved 98% satisfaction rate this week - excellent performance!',
      type: 'success',
      category: 'agent',
      timestamp: '15 minutes ago',
      isRead: false,
      isStarred: false,
      priority: 'medium',
      metadata: {
        agentName: 'Customer Support Agent'
      }
    },
    {
      id: '3',
      title: 'System Maintenance Complete',
      message: 'Scheduled maintenance for voice processing services has been completed successfully. All services are now operational.',
      type: 'success',
      category: 'system',
      timestamp: '1 hour ago',
      isRead: true,
      isStarred: false,
      priority: 'low'
    },
    {
      id: '4',
      title: 'Failed Message Delivery',
      message: 'Unable to deliver 12 messages via SMS channel due to carrier issues. Messages have been queued for retry.',
      type: 'error',
      category: 'channel',
      timestamp: '2 hours ago',
      isRead: false,
      isStarred: false,
      priority: 'high',
      metadata: {
        channelName: 'SMS Gateway',
        count: 12
      }
    },
    {
      id: '5',
      title: 'New Conversation Assigned',
      message: 'A high-priority conversation from VIP customer has been assigned to Technical Support Agent.',
      type: 'info',
      category: 'conversation',
      timestamp: '3 hours ago',
      isRead: true,
      isStarred: true,
      priority: 'high',
      metadata: {
        agentName: 'Technical Support Agent',
        conversationId: 'CONV-2024-001'
      }
    },
    {
      id: '6',
      title: 'Knowledge Base Updated',
      message: 'Product documentation has been updated with 15 new articles. AI agents will be retrained automatically.',
      type: 'info',
      category: 'system',
      timestamp: '5 hours ago',
      isRead: true,
      isStarred: false,
      priority: 'low',
      metadata: {
        count: 15
      }
    }
  ])

  // Stats for the overview
  const stats = [
    {
      title: 'Total Notifications',
      value: '47',
      change: '+12',
      icon: Bell,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Unread',
      value: '8',
      change: '+3',
      icon: BellRing,
      gradient: 'from-red-500 to-pink-600'
    },
    {
      title: 'High Priority',
      value: '5',
      change: '+2',
      icon: AlertTriangle,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      title: 'Starred',
      value: '12',
      change: '+1',
      icon: Star,
      gradient: 'from-yellow-500 to-orange-600'
    }
  ]

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: !n.isRead } : n
    ))
  }

  const handleStar = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isStarred: !n.isStarred } : n
    ))
  }

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || notification.type === filterType
    const matchesCategory = filterCategory === 'all' || notification.category === filterCategory
    const matchesUnread = !showUnreadOnly || !notification.isRead
    
    return matchesSearch && matchesType && matchesCategory && matchesUnread
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Notifications</h1>
            <p className="text-gray-600">Stay updated with system alerts and important updates</p>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMarkAllRead}
              className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
            >
              <Check className="h-4 w-4" />
              <span>Mark All Read</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </motion.button>
          </div>
        </div>
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

      {/* Filters */}
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
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            >
              <option value="all">All Types</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            >
              <option value="all">All Categories</option>
              <option value="system">System</option>
              <option value="agent">Agent</option>
              <option value="channel">Channel</option>
              <option value="conversation">Conversation</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Unread only</span>
          </label>
        </div>
      </motion.div>

      {/* Notifications List */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              delay={0.9 + index * 0.05}
              onMarkRead={handleMarkRead}
              onStar={handleStar}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-600">
              {searchQuery || filterType !== 'all' || filterCategory !== 'all' || showUnreadOnly
                ? 'Try adjusting your search or filter criteria' 
                : 'You\'re all caught up! No new notifications at the moment.'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}