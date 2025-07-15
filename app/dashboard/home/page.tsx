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
  Plus,
  Calendar
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

  // Stats matching the design
  const stats = [
    {
      title: 'Active Employees',
      value: '216',
      icon: Users,
      bgColor: 'bg-gray-900',
      textColor: 'text-white'
    },
    {
      title: 'Active Projects',
      value: '312',
      icon: MessageSquare,
      bgColor: 'bg-gray-900',
      textColor: 'text-white'
    },
    {
      title: 'Number of Task',
      value: '184',
      icon: Calendar,
      bgColor: 'bg-gray-900',
      textColor: 'text-white'
    },
    {
      title: 'Target Percentage Completed',
      value: '84.12%',
      icon: Activity,
      bgColor: 'bg-gray-900',
      textColor: 'text-white'
    }
  ]

  // Task columns matching the design
  const taskColumns = [
    {
      title: 'Not Started',
      count: 24,
      color: 'bg-gray-100',
      dotColor: 'bg-gray-400',
      tasks: [
        {
          id: 1,
          title: 'Partone Consultancy Website',
          subtitle: 'New Homepage',
          priority: 'Urgent',
          priorityColor: 'bg-red-100 text-red-600',
          dueDate: 'March 21, 25',
          assignees: [
            { name: 'JD', color: 'bg-blue-500' },
            { name: 'SM', color: 'bg-green-500' }
          ],
          comments: 13,
          lastUpdate: 'March 16, 2025'
        }
      ]
    },
    {
      title: 'Pending',
      count: 24,
      color: 'bg-orange-50',
      dotColor: 'bg-orange-400',
      tasks: [
        {
          id: 2,
          title: 'Modify Content for Homepage',
          subtitle: 'New Homepage',
          priority: 'Urgent',
          priorityColor: 'bg-red-100 text-red-600',
          dueDate: 'May 23, 25',
          assignees: [
            { name: 'AL', color: 'bg-purple-500' },
            { name: 'JD', color: 'bg-blue-500' }
          ],
          comments: 36,
          lastUpdate: 'May 16, 2025'
        }
      ]
    },
    {
      title: 'Completed',
      count: 24,
      color: 'bg-green-50',
      dotColor: 'bg-green-400',
      tasks: [
        {
          id: 3,
          title: 'MTC Design Approval',
          subtitle: 'New Homepage',
          priority: 'Low',
          priorityColor: 'bg-green-100 text-green-600',
          dueDate: 'March 10, 25',
          assignees: [
            { name: 'SM', color: 'bg-green-500' },
            { name: 'AL', color: 'bg-purple-500' }
          ],
          comments: 10,
          lastUpdate: 'March 04, 2025'
        }
      ]
    },
    {
      title: 'Under Review',
      count: 24,
      color: 'bg-purple-50',
      dotColor: 'bg-purple-400',
      tasks: [
        {
          id: 4,
          title: 'V01 Components Design System',
          subtitle: 'Components & Elements',
          priority: 'Urgent',
          priorityColor: 'bg-red-100 text-red-600',
          dueDate: 'March 20, 25',
          assignees: [
            { name: 'JD', color: 'bg-blue-500' }
          ],
          comments: 14,
          lastUpdate: 'March 06, 2025'
        }
      ]
    }
  ]

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
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back David..!</h1>
        <p className="text-gray-600">Stay on top of your tasks, monitor progress, and track status.</p>
      </motion.div>

      {/* AI Notification Banner */}
      <motion.div 
        className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="font-medium text-gray-900">Taskify AI is now available.</span>
            <span className="text-gray-600 ml-1">Access your activity and timeline right away on all new dashboard</span>
          </div>
        </div>
        <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
          View Details
        </button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
            <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors mt-2">
              View Details
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Task Management Tabs */}
      <motion.div 
        className="flex items-center space-x-6 border-b border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <button className="pb-3 border-b-2 border-gray-900 text-sm font-medium text-gray-900">
          Kanban
        </button>
        <button className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
          Timeline
        </button>
        <button className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
          Spreadsheet
        </button>
        <button className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
          Calendar
        </button>
        <div className="ml-auto flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <BarChart3 className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Users className="h-4 w-4" />
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            New
          </button>
        </div>
      </motion.div>

      {/* Task Columns */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        {taskColumns.map((column, columnIndex) => (
          <motion.div
            key={column.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + columnIndex * 0.1, duration: 0.4 }}
            className="space-y-4"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${column.dotColor}`}></div>
                <span className="font-medium text-gray-900">{column.title}</span>
                <span className="text-sm text-gray-500">{column.count}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Task Cards */}
            <div className="space-y-3">
              {column.tasks.map((task, taskIndex) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + taskIndex * 0.1, duration: 0.3 }}
                  className={`${column.color} rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group`}
                >
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">WEB - 21</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.priorityColor}`}>
                        {task.priority}
                      </span>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Task Content */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.subtitle}</p>
                  </div>

                  {/* Due Date */}
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Due to: {task.dueDate}</span>
                  </div>

                  {/* Task Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {task.assignees.map((assignee, index) => (
                        <div
                          key={index}
                          className={`w-6 h-6 ${assignee.color} rounded-full flex items-center justify-center text-xs font-medium text-white border-2 border-white`}
                        >
                          {assignee.name}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{task.comments}</span>
                      </div>
                      <span>{task.lastUpdate}</span>
                    </div>
                  </div>

                  {/* Add New Page Button */}
                  <button className="w-full mt-3 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors border-t border-gray-200 pt-3">
                    + New Page
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
