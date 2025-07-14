"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Clock, 
  ArrowUp, 
  ArrowDown,
  Activity,
  Calendar,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Zap,
  Target,
  Star,
  Plus,
  ArrowRight,
  Sparkles,
  Database,
  Settings,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  Globe
} from 'lucide-react'

const StatCard = ({ title, value, change, icon: Icon, trend = 'up' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <div className="flex items-center mt-2">
          {trend === 'up' ? (
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last week</span>
        </div>
      </div>
      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
        <Icon className="h-6 w-6 text-gray-600" />
      </div>
    </div>
  </motion.div>
)

const QuickAction = ({ title, description, icon: Icon, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="w-full bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors duration-200 text-left group"
  >
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
        <Icon className="h-5 w-5 text-gray-600" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </motion.button>
)

const RecentActivity = ({ activity }) => (
  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
      {activity.type === 'message' && <MessageCircle className="h-4 w-4 text-blue-600" />}
      {activity.type === 'call' && <Phone className="h-4 w-4 text-green-600" />}
      {activity.type === 'email' && <Mail className="h-4 w-4 text-purple-600" />}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
      <p className="text-xs text-gray-500">{activity.description}</p>
    </div>
    <span className="text-xs text-gray-500">{activity.time}</span>
  </div>
)

export default function DashboardHome() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      title: 'Total Conversations',
      value: '2,847',
      change: '+12%',
      icon: MessageCircle,
      trend: 'up'
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+8%',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Response Time',
      value: '2.3m',
      change: '-15%',
      icon: Clock,
      trend: 'up'
    },
    {
      title: 'Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      icon: Star,
      trend: 'up'
    }
  ]

  const quickActions = [
    {
      title: 'New Conversation',
      description: 'Start a new customer conversation',
      icon: MessageSquare,
      onClick: () => console.log('New conversation')
    },
    {
      title: 'Add Channel',
      description: 'Connect a new communication channel',
      icon: Plus,
      onClick: () => console.log('Add channel')
    },
    {
      title: 'Upload Knowledge',
      description: 'Add documents to knowledge base',
      icon: Database,
      onClick: () => console.log('Upload knowledge')
    },
    {
      title: 'AI Settings',
      description: 'Configure AI personas and responses',
      icon: Sparkles,
      onClick: () => console.log('AI settings')
    }
  ]

  const recentActivities = [
    {
      type: 'message',
      title: 'New message from Sarah Chen',
      description: 'Product inquiry about pricing',
      time: '2 min ago'
    },
    {
      type: 'call',
      title: 'Call completed with John Doe',
      description: 'Support ticket resolved',
      time: '5 min ago'
    },
    {
      type: 'email',
      title: 'Email sent to customer',
      description: 'Order confirmation sent',
      time: '8 min ago'
    },
    {
      type: 'message',
      title: 'WhatsApp message received',
      description: 'Customer asking about delivery',
      time: '12 min ago'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your conversations today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-sm text-gray-500">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <QuickAction key={index} {...action} />
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                View all
              </button>
            </div>
            <div className="space-y-1">
              {recentActivities.map((activity, index) => (
                <RecentActivity key={index} activity={activity} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              7 days
            </button>
            <button className="px-3 py-1 text-sm bg-gray-900 text-white rounded-lg">
              30 days
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              90 days
            </button>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
