"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  MessageCircle, 
  Clock, 
  ArrowUp, 
  ArrowDown,
  Activity,
  BarChart3,
  Zap,
  Star,
  ArrowRight,
  Database,
  Phone,
  Mail,
  Brain,
  ChevronRight,
  MessageSquare,
  Plus
} from 'lucide-react'

const StatCard = ({ title, value, change, icon: Icon, trend = 'up', gradient, delay = 0 }) => (
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
    
    {/* Sparkle Effect */}
    <motion.div
      className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: Math.random() * 2
      }}
    />
  </motion.div>
)

const QuickAction = ({ title, description, icon: Icon, onClick, gradient, delay = 0 }) => (
  <motion.button
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ 
      scale: 1.03,
      x: 4,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="group w-full bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:border-white/40 transition-all duration-300 text-left shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 overflow-hidden relative"
  >
    {/* Background Gradient */}
    <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
    
    <div className="relative z-10 flex items-center space-x-4">
      <motion.div 
        className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
        whileHover={{ rotate: 5, scale: 1.1 }}
      >
        <Icon className="h-6 w-6 text-white" />
      </motion.div>
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-slate-800 transition-colors">{title}</h3>
        <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors">{description}</p>
      </div>
      <motion.div
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        whileHover={{ x: 2 }}
      >
        <ChevronRight className="h-5 w-5 text-slate-400" />
      </motion.div>
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
      trend: 'up',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+8%',
      icon: Users,
      trend: 'up',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Response Time',
      value: '2.3m',
      change: '-15%',
      icon: Clock,
      trend: 'up',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      icon: Star,
      trend: 'up',
      gradient: 'from-amber-500 to-orange-600'
    }
  ]

  const quickActions = [
    {
      title: 'New Conversation',
      description: 'Start a new customer conversation',
      icon: MessageSquare,
      gradient: 'from-blue-500 to-indigo-600',
      onClick: () => console.log('New conversation')
    },
    {
      title: 'Add Channel',
      description: 'Connect a new communication channel',
      icon: Plus,
      gradient: 'from-green-500 to-emerald-600',
      onClick: () => console.log('Add channel')
    },
    {
      title: 'Upload Knowledge',
      description: 'Add documents to knowledge base',
      icon: Database,
      gradient: 'from-purple-500 to-violet-600',
      onClick: () => console.log('Upload knowledge')
    },
    {
      title: 'AI Settings',
      description: 'Configure AI personas and responses',
      icon: Brain,
      gradient: 'from-pink-500 to-rose-600',
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
            Welcome back! 👋
          </motion.h1>
          <motion.p 
            className="text-slate-600 text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Here's what's happening with your conversations today.
          </motion.p>
        </div>
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="text-right bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-black/5 border border-white/20">
            <motion.p 
              className="text-sm font-semibold text-slate-900"
              key={currentTime.toDateString()}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </motion.p>
            <motion.p 
              className="text-lg font-bold text-indigo-600"
              key={currentTime.toTimeString()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-black/5 border border-white/20 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
              </div>
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <QuickAction key={index} {...action} delay={0.9 + index * 0.1} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-black/5 border border-white/20 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/50"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-green-100/30 to-blue-100/30 rounded-full translate-y-20 -translate-x-20"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                </div>
                <motion.button 
                  className="text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium flex items-center space-x-1 group"
                  whileHover={{ x: 2 }}
                >
                  <span>View all</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                    className="flex items-center space-x-4 p-4 hover:bg-white/60 rounded-2xl transition-all duration-200 group cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${
                      activity.type === 'message' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                      activity.type === 'call' ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                      'bg-gradient-to-br from-purple-500 to-violet-600'
                    }`}>
                      {activity.type === 'message' && <MessageCircle className="h-5 w-5 text-white" />}
                      {activity.type === 'call' && <Phone className="h-5 w-5 text-white" />}
                      {activity.type === 'email' && <Mail className="h-5 w-5 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-slate-800 transition-colors">{activity.title}</p>
                      <p className="text-xs text-slate-600 group-hover:text-slate-700 transition-colors">{activity.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-500 font-medium">{activity.time}</span>
                      <ChevronRight className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Chart */}
      <motion.div 
        className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-black/5 border border-white/20 overflow-hidden relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50"></div>
        <div className="absolute top-0 left-1/2 w-64 h-64 bg-gradient-to-br from-amber-100/20 to-orange-100/20 rounded-full -translate-y-32 -translate-x-32"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Performance Overview</h2>
            </div>
            <div className="flex items-center space-x-2">
              {['7 days', '30 days', '90 days'].map((period, index) => (
                <motion.button 
                  key={period}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    index === 1 
                      ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg' 
                      : 'bg-white/60 text-slate-700 hover:bg-white/80 hover:text-slate-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {period}
                </motion.button>
              ))}
            </div>
          </div>
          <motion.div 
            className="h-80 bg-gradient-to-br from-white/60 to-slate-50/60 rounded-2xl flex items-center justify-center border border-white/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <div className="text-center">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              </motion.div>
              <p className="text-slate-500 text-lg font-medium">Interactive Chart Coming Soon</p>
              <p className="text-slate-400 text-sm mt-2">Real-time analytics and insights</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
