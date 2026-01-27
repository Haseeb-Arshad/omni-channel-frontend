"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Key,
  Mail,
  Phone,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Check,
  X,
  Upload,
  Download,
  Trash2,
  Plus,
  Edit,
  Lock,
  Unlock,
  AlertTriangle,
  Info,
  ChevronRight,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  Wifi,
  HardDrive
} from 'lucide-react'

const SettingsCard = ({ title, description, children, delay = 0 }: {
  title: string
  description: string
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
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {children}
    </div>
  </motion.div>
)

const ToggleSwitch = ({ enabled, onChange, label }: {
  enabled: boolean
  onChange: (enabled: boolean) => void
  label: string
}) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <motion.button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
        layout
      />
    </motion.button>
  </div>
)

const StatCard = ({ title, value, icon: Icon, gradient, delay = 0 }: {
  title: string
  value: string
  icon: any
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
    
    <div className="relative z-10 flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-600 mb-2">{title}</p>
        <motion.p 
          className="text-2xl font-bold text-slate-900"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.4, ease: "backOut" }}
        >
          {value}
        </motion.p>
      </div>
      
      <motion.div 
        className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="h-6 w-6 text-white" />
      </motion.div>
    </div>
  </motion.div>
)

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    desktop: true
  })
  const [privacy, setPrivacy] = useState({
    analytics: true,
    cookies: true,
    tracking: false,
    dataSharing: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'data', label: 'Data & Storage', icon: Database }
  ]

  const systemStats = [
    {
      title: 'Storage Used',
      value: '2.4 GB',
      icon: HardDrive,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'API Calls',
      value: '47.2K',
      icon: Wifi,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Active Sessions',
      value: '3',
      icon: Monitor,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Connected Devices',
      value: '5',
      icon: Smartphone,
      gradient: 'from-orange-500 to-red-600'
    }
  ]

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <SettingsCard
              title="Personal Information"
              description="Update your personal details and contact information"
              delay={0.1}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="David"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Wilson"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue="david@example.com"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    rows={3}
                    defaultValue="AI enthusiast and customer experience professional focused on creating seamless omni-channel solutions."
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm resize-none"
                  />
                </div>
              </div>
            </SettingsCard>

            <SettingsCard
              title="Profile Picture"
              description="Upload and manage your profile picture"
              delay={0.2}
            >
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  DW
                </div>
                <div className="flex-1">
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload New</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-300 transition-colors flex items-center space-x-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Remove</span>
                    </motion.button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>
            </SettingsCard>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <SettingsCard
              title="Notification Preferences"
              description="Choose how you want to be notified about important updates"
              delay={0.1}
            >
              <div className="space-y-1">
                <ToggleSwitch
                  enabled={notifications.email}
                  onChange={(enabled) => setNotifications(prev => ({ ...prev, email: enabled }))}
                  label="Email Notifications"
                />
                <ToggleSwitch
                  enabled={notifications.push}
                  onChange={(enabled) => setNotifications(prev => ({ ...prev, push: enabled }))}
                  label="Push Notifications"
                />
                <ToggleSwitch
                  enabled={notifications.sms}
                  onChange={(enabled) => setNotifications(prev => ({ ...prev, sms: enabled }))}
                  label="SMS Notifications"
                />
                <ToggleSwitch
                  enabled={notifications.desktop}
                  onChange={(enabled) => setNotifications(prev => ({ ...prev, desktop: enabled }))}
                  label="Desktop Notifications"
                />
              </div>
            </SettingsCard>

            <SettingsCard
              title="Notification Categories"
              description="Customize which types of notifications you receive"
              delay={0.2}
            >
              <div className="space-y-4">
                {[
                  { label: 'System Alerts', description: 'Important system updates and maintenance' },
                  { label: 'Agent Performance', description: 'AI agent performance and status updates' },
                  { label: 'Channel Activity', description: 'New messages and channel status changes' },
                  { label: 'Security Alerts', description: 'Login attempts and security notifications' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <ToggleSwitch
                      enabled={true}
                      onChange={() => {}}
                      label=""
                    />
                  </div>
                ))}
              </div>
            </SettingsCard>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <SettingsCard
              title="Password & Authentication"
              description="Manage your password and two-factor authentication"
              delay={0.1}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Update Password
                </motion.button>
              </div>
            </SettingsCard>

            <SettingsCard
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              delay={0.2}
            >
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-green-900">2FA Enabled</p>
                    <p className="text-sm text-green-700">Your account is protected with 2FA</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Manage
                </motion.button>
              </div>
            </SettingsCard>
          </div>
        )

      case 'appearance':
        return (
          <div className="space-y-6">
            <SettingsCard
              title="Theme Preferences"
              description="Customize the look and feel of your dashboard"
              delay={0.1}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                      {isDarkMode ? <Moon className="h-5 w-5 text-white" /> : <Sun className="h-5 w-5 text-yellow-500" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Dark Mode</p>
                      <p className="text-sm text-gray-600">Switch to dark theme</p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={isDarkMode}
                    onChange={setIsDarkMode}
                    label=""
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { name: 'Light', color: 'bg-white border-2 border-gray-200' },
                    { name: 'Dark', color: 'bg-gray-900' },
                    { name: 'Auto', color: 'bg-gradient-to-r from-white to-gray-900' }
                  ].map((theme, index) => (
                    <motion.button
                      key={theme.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${theme.color} h-20 rounded-xl flex items-center justify-center text-sm font-medium ${
                        theme.name === 'Dark' ? 'text-white' : 'text-gray-900'
                      } ${index === 0 ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      {theme.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </SettingsCard>

            <SettingsCard
              title="Display Settings"
              description="Adjust display preferences and accessibility options"
              delay={0.2}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm">
                    <option>Small</option>
                    <option selected>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
                <ToggleSwitch
                  enabled={true}
                  onChange={() => {}}
                  label="Reduce Motion"
                />
                <ToggleSwitch
                  enabled={false}
                  onChange={() => {}}
                  label="High Contrast"
                />
              </div>
            </SettingsCard>
          </div>
        )

      case 'integrations':
        return (
          <div className="space-y-6">
            <SettingsCard
              title="Connected Services"
              description="Manage your third-party integrations and API connections"
              delay={0.1}
            >
              <div className="space-y-4">
                {[
                  { name: 'ElevenLabs', status: 'Connected', color: 'green' },
                  { name: 'Twilio', status: 'Connected', color: 'green' },
                  { name: 'OpenAI', status: 'Connected', color: 'green' },
                  { name: 'Slack', status: 'Disconnected', color: 'gray' }
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-${service.color}-500 rounded-full flex items-center justify-center`}>
                        <Globe className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{service.name}</p>
                        <p className={`text-sm ${service.color === 'green' ? 'text-green-600' : 'text-gray-500'}`}>
                          {service.status}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                        service.status === 'Connected'
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {service.status === 'Connected' ? 'Disconnect' : 'Connect'}
                    </motion.button>
                  </div>
                ))}
              </div>
            </SettingsCard>

            <SettingsCard
              title="API Keys"
              description="Manage your API keys and access tokens"
              delay={0.2}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Production API Key</p>
                    <p className="text-sm text-gray-600 font-mono">sk-...7a2b</p>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Generate New API Key</span>
                </motion.button>
              </div>
            </SettingsCard>
          </div>
        )

      case 'data':
        return (
          <div className="space-y-6">
            {/* System Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {systemStats.map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  gradient={stat.gradient}
                  delay={0.2 + index * 0.1}
                />
              ))}
            </motion.div>

            <SettingsCard
              title="Data Management"
              description="Export, backup, and manage your data"
              delay={0.6}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-100 text-blue-700 p-4 rounded-xl font-semibold hover:bg-blue-200 transition-colors flex items-center space-x-3"
                  >
                    <Download className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-semibold">Export Data</p>
                      <p className="text-sm opacity-80">Download all your data</p>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-100 text-green-700 p-4 rounded-xl font-semibold hover:bg-green-200 transition-colors flex items-center space-x-3"
                  >
                    <Upload className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-semibold">Import Data</p>
                      <p className="text-sm opacity-80">Upload data from backup</p>
                    </div>
                  </motion.button>
                </div>
              </div>
            </SettingsCard>

            <SettingsCard
              title="Privacy & Data Control"
              description="Control how your data is used and shared"
              delay={0.7}
            >
              <div className="space-y-1">
                <ToggleSwitch
                  enabled={privacy.analytics}
                  onChange={(enabled) => setPrivacy(prev => ({ ...prev, analytics: enabled }))}
                  label="Analytics & Performance Data"
                />
                <ToggleSwitch
                  enabled={privacy.cookies}
                  onChange={(enabled) => setPrivacy(prev => ({ ...prev, cookies: enabled }))}
                  label="Functional Cookies"
                />
                <ToggleSwitch
                  enabled={privacy.tracking}
                  onChange={(enabled) => setPrivacy(prev => ({ ...prev, tracking: enabled }))}
                  label="Usage Tracking"
                />
                <ToggleSwitch
                  enabled={privacy.dataSharing}
                  onChange={(enabled) => setPrivacy(prev => ({ ...prev, dataSharing: enabled }))}
                  label="Data Sharing with Partners"
                />
              </div>
            </SettingsCard>
          </div>
        )

      default:
        return null
    }
  }

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
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
            <p className="text-gray-600">Manage your account preferences and system configuration</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
          >
            {isSaving ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <motion.div 
          className="lg:w-64 flex-shrink-0"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-lg shadow-black/5 border border-white/20">
            <nav className="space-y-2">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </motion.div>
  )
}