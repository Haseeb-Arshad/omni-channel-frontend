"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  MessageSquare, 
  Clock, 
  Target,
  ArrowUp,
  ArrowDown,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Activity,
  Zap,
  Star,
  ChevronRight,
  PieChart,
  LineChart,
  MoreVertical
} from 'lucide-react'

const StatCard = ({ title, value, change, icon: Icon, trend = 'up', gradient, delay = 0, subtitle }: {
  title: string
  value: string
  change: string
  icon: any
  trend?: 'up' | 'down'
  gradient: string
  delay?: number
  subtitle?: string
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
    
    {/* Floating Orb */}
    <motion.div 
      className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
      animate={{ 
        rotate: 360,
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
    ></motion.div>
    
    <div className="relative z-10 flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-600 mb-2">{title}</p>
        <motion.p 
          className="text-3xl font-bold text-slate-900 mb-1"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.4, ease: "backOut" }}
        >
          {value}
        </motion.p>
        {subtitle && (
          <p className="text-xs text-slate-500 mb-3">{subtitle}</p>
        )}
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
          <span className="text-xs text-slate-500 ml-2">vs last period</span>
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

const ChartCard = ({ title, children, delay = 0 }: {
  title: string
  children: React.ReactNode
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
    className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg shadow-black/5 border border-white/20 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 overflow-hidden relative"
  >
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-gray-50/50"></div>
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-100/30 to-gray-100/30 rounded-full -translate-y-16 translate-x-16"></div>
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <MoreVertical className="h-4 w-4 text-gray-500" />
        </motion.button>
      </div>
      {children}
    </div>
  </motion.div>
)

const MetricRow = ({ label, value, change, trend }: {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
}) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <div className="flex items-center space-x-3">
      <span className="text-sm font-bold text-gray-900">{value}</span>
      <div className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
        trend === 'up' 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-100 text-red-700'
      }`}>
        {trend === 'up' ? (
          <ArrowUp className="h-3 w-3 mr-1" />
        ) : (
          <ArrowDown className="h-3 w-3 mr-1" />
        )}
        {change}
      </div>
    </div>
  </div>
)

const ChannelPerformanceCard = ({ channel, stats, delay = 0 }: {
  channel: {
    name: string
    icon: React.ReactNode
    color: string
  }
  stats: {
    messages: number
    responseTime: string
    satisfaction: number
    trend: 'up' | 'down'
  }
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:bg-white/80 hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 ${channel.color} rounded-2xl flex items-center justify-center shadow-md`}>
          {channel.icon}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{channel.name}</h4>
          <p className="text-xs text-gray-600">{stats.messages} messages</p>
        </div>
      </div>
      <div className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
        stats.trend === 'up' 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-100 text-red-700'
      }`}>
        {stats.trend === 'up' ? (
          <TrendingUp className="h-3 w-3 mr-1" />
        ) : (
          <TrendingDown className="h-3 w-3 mr-1" />
        )}
        {stats.trend === 'up' ? '+' : '-'}12%
      </div>
    </div>
    
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">Response Time</span>
        <span className="text-sm font-semibold text-gray-900">{stats.responseTime}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">Satisfaction</span>
        <div className="flex items-center space-x-1">
          <span className="text-sm font-semibold text-gray-900">{stats.satisfaction}/5</span>
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div 
          className={`h-2 rounded-full ${channel.color.replace('bg-', 'bg-gradient-to-r from-').replace('-500', '-400 to-').replace('-600', '-600')}`}
          initial={{ width: 0 }}
          animate={{ width: `${(stats.satisfaction / 5) * 100}%` }}
          transition={{ delay: delay + 0.5, duration: 1 }}
        />
      </div>
    </div>
  </motion.div>
)

import { EditorialHeader, EditorialPanel, EditorialStatTile } from "@/components/ui/editorial"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('conversations')

  // Mock data for analytics
  const overviewStats = [
    {
      title: 'Total Conversations',
      value: '12,847',
      change: '+12.5%',
      icon: MessageSquare,
      gradient: 'from-blue-500 to-indigo-600',
      subtitle: 'Across all channels'
    },
    {
      title: 'Response Rate',
      value: '94.2%',
      change: '+2.1%',
      icon: Target,
      gradient: 'from-green-500 to-emerald-600',
      subtitle: 'Average response rate'
    },
    {
      title: 'Avg Response Time',
      value: '2.3s',
      change: '-0.4s',
      icon: Clock,
      gradient: 'from-orange-500 to-red-600',
      subtitle: 'Faster than last week'
    },
    {
      title: 'Customer Satisfaction',
      value: '4.7/5',
      change: '+0.2',
      icon: Star,
      gradient: 'from-purple-500 to-pink-600',
      subtitle: 'Based on 2,341 ratings'
    }
  ]

  const channelPerformance = [
    {
      channel: {
        name: 'WhatsApp',
        icon: <MessageSquare className="h-5 w-5 text-white" />,
        color: 'bg-green-500'
      },
      stats: {
        messages: 4521,
        responseTime: '1.8s',
        satisfaction: 4.8,
        trend: 'up' as const
      }
    },
    {
      channel: {
        name: 'Email',
        icon: <MessageSquare className="h-5 w-5 text-white" />,
        color: 'bg-blue-500'
      },
      stats: {
        messages: 3247,
        responseTime: '2.1s',
        satisfaction: 4.6,
        trend: 'up' as const
      }
    },
    {
      channel: {
        name: 'Web Chat',
        icon: <MessageSquare className="h-5 w-5 text-white" />,
        color: 'bg-purple-500'
      },
      stats: {
        messages: 2891,
        responseTime: '1.5s',
        satisfaction: 4.9,
        trend: 'up' as const
      }
    },
    {
      channel: {
        name: 'SMS',
        icon: <MessageSquare className="h-5 w-5 text-white" />,
        color: 'bg-orange-500'
      },
      stats: {
        messages: 1456,
        responseTime: '3.2s',
        satisfaction: 4.3,
        trend: 'down' as const
      }
    }
  ]

  const agentMetrics = [
    { label: 'Total Active Agents', value: '12', change: '+2', trend: 'up' as const },
    { label: 'Avg Conversations/Agent', value: '1,071', change: '+8.5%', trend: 'up' as const },
    { label: 'Agent Utilization', value: '87%', change: '+5%', trend: 'up' as const },
    { label: 'Escalation Rate', value: '3.2%', change: '-1.1%', trend: 'up' as const }
  ]

  const conversationMetrics = [
    { label: 'Resolved Conversations', value: '11,234', change: '+15%', trend: 'up' as const },
    { label: 'Avg Resolution Time', value: '4.2 min', change: '-1.3 min', trend: 'up' as const },
    { label: 'First Contact Resolution', value: '78%', change: '+3%', trend: 'up' as const },
    { label: 'Customer Effort Score', value: '2.1/5', change: '-0.3', trend: 'up' as const }
  ]

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <EditorialHeader
        title="Analytics"
        subtitle="Performance across channels and agents"
        actions={
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </motion.button>
          </div>
        }
      />

      {/* Overview Stats */}
      <section className="editorial-container editorial-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((s, i) => (
            <EditorialStatTile key={i} label={s.title} value={s.value} meta={`${s.change} • ${s.subtitle}`} />
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversation Trends */}
        <ChartCard title="Conversation Trends" delay={0.7}>
          <div className="h-64 flex items-center justify-center editorial-panel-alt rounded-2xl">
            <div className="text-center">
              <LineChart className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600">Interactive chart showing conversation trends over time</p>
              <p className="text-sm text-gray-500 mt-2">Peak hours: 2-4 PM daily</p>
            </div>
          </div>
        </ChartCard>

        {/* Channel Distribution */}
        <ChartCard title="Channel Distribution" delay={0.8}>
          <div className="h-64 flex items-center justify-center editorial-panel-alt rounded-2xl">
            <div className="text-center">
              <PieChart className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <p className="text-gray-600">Distribution of conversations across channels</p>
              <div className="flex justify-center space-x-4 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>WhatsApp 35%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Email 28%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Web 37%</span>
                </div>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Channel Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Channel Performance</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
            >
              <span>View Details</span>
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {channelPerformance.map((item, index) => (
              <ChannelPerformanceCard
                key={index}
                channel={item.channel}
                stats={item.stats}
                delay={1.0 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Performance */}
        <ChartCard title="Agent Performance" delay={1.4}>
          <div className="space-y-1">
            {agentMetrics.map((metric, index) => (
              <MetricRow
                key={index}
                label={metric.label}
                value={metric.value}
                change={metric.change}
                trend={metric.trend}
              />
            ))}
          </div>
        </ChartCard>

        {/* Conversation Quality */}
        <ChartCard title="Conversation Quality" delay={1.5}>
          <div className="space-y-1">
            {conversationMetrics.map((metric, index) => (
              <MetricRow
                key={index}
                label={metric.label}
                value={metric.value}
                change={metric.change}
                trend={metric.trend}
              />
            ))}
          </div>
        </ChartCard>
      </div>
    </motion.div>
  )
}