"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Modal } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Settings, 
  Save, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  Clock,
  Bot,
  Bell,
  Key,
  Shield,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// Channel settings interface
interface ChannelSettings {
  id: string
  name: string
  type: string
  status: string
  credentials: {
    accountSid?: string
    authToken?: string
    phoneNumber?: string
    smtpHost?: string
    smtpPort?: string
    smtpUser?: string
    smtpPassword?: string
    fromEmail?: string
    apiKey?: string
  }
  settings: {
    autoReply: boolean
    responseTime: string
    workingHours: {
      enabled: boolean
      start: string
      end: string
      timezone: string
      offHoursMessage: string
    }
    aiAssistant: {
      enabled: boolean
      personaId: string
      handoffThreshold: string
    }
    notifications: {
      email: boolean
      desktop: boolean
      slack: boolean
    }
  }
  personaId?: string
  knowledgeBaseId?: string
}

// Tab configuration
const tabConfig = [
  {
    id: "general",
    label: "General",
    icon: Settings,
    description: "Basic channel settings"
  },
  {
    id: "automation",
    label: "Automation", 
    icon: Bot,
    description: "AI and auto-reply settings"
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    description: "Alert preferences"
  },
  {
    id: "credentials",
    label: "Credentials",
    icon: Key,
    description: "API keys and authentication"
  }
]

// General Settings Tab
const GeneralSettingsTab = ({ 
  settings, 
  onUpdate 
}: { 
  settings: ChannelSettings
  onUpdate: (updates: Partial<ChannelSettings>) => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Basic Settings
          </CardTitle>
          <CardDescription>
            Configure the fundamental settings for your channel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="channel-name">Channel Name</Label>
            <Input
              id="channel-name"
              value={settings.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="bg-white dark:bg-charcoal-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="response-time">Expected Response Time</Label>
            <Select 
              value={settings.settings.responseTime} 
              onValueChange={(value) => onUpdate({
                settings: {
                  ...settings.settings,
                  responseTime: value
                }
              })}
            >
              <SelectTrigger id="response-time">
                <SelectValue placeholder="Select response time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instant">Instant (less than 5 minutes)</SelectItem>
                <SelectItem value="1min">Quick (less than 1 hour)</SelectItem>
                <SelectItem value="4hour">Same day (less than 4 hours)</SelectItem>
                <SelectItem value="24hour">Next day (less than 24 hours)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Working Hours
          </CardTitle>
          <CardDescription>
            Set your business hours and automated responses for off-hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="working-hours-enabled" className="flex-1">
              Enable working hours
            </Label>
            <Switch 
              id="working-hours-enabled" 
              checked={settings.settings.workingHours.enabled}
              onCheckedChange={(checked) => onUpdate({
                settings: {
                  ...settings.settings,
                  workingHours: {
                    ...settings.settings.workingHours,
                    enabled: checked
                  }
                }
              })}
            />
          </div>

          <AnimatePresence>
            {settings.settings.workingHours.enabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 pt-2"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input 
                      id="start-time" 
                      type="time"
                      value={settings.settings.workingHours.start}
                      onChange={(e) => onUpdate({
                        settings: {
                          ...settings.settings,
                          workingHours: {
                            ...settings.settings.workingHours,
                            start: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input 
                      id="end-time" 
                      type="time"
                      value={settings.settings.workingHours.end}
                      onChange={(e) => onUpdate({
                        settings: {
                          ...settings.settings,
                          workingHours: {
                            ...settings.settings.workingHours,
                            end: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={settings.settings.workingHours.timezone} 
                    onValueChange={(value) => onUpdate({
                      settings: {
                        ...settings.settings,
                        workingHours: {
                          ...settings.settings.workingHours,
                          timezone: value
                        }
                      }
                    })}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="off-hours-message">Off-Hours Message</Label>
                  <Textarea 
                    id="off-hours-message" 
                    rows={3}
                    value={settings.settings.workingHours.offHoursMessage}
                    onChange={(e) => onUpdate({
                      settings: {
                        ...settings.settings,
                        workingHours: {
                          ...settings.settings.workingHours,
                          offHoursMessage: e.target.value
                        }
                      }
                    })}
                    className="resize-none"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Automation Settings Tab
const AutomationSettingsTab = ({ 
  settings, 
  onUpdate 
}: { 
  settings: ChannelSettings
  onUpdate: (updates: Partial<ChannelSettings>) => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Assistant
          </CardTitle>
          <CardDescription>
            Configure AI-powered responses for this channel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled" className="flex-1">
              Enable AI Assistant
            </Label>
            <Switch 
              id="ai-enabled" 
              checked={settings.settings.aiAssistant.enabled}
              onCheckedChange={(checked) => onUpdate({
                settings: {
                  ...settings.settings,
                  aiAssistant: {
                    ...settings.settings.aiAssistant,
                    enabled: checked
                  }
                }
              })}
            />
          </div>

          <AnimatePresence>
            {settings.settings.aiAssistant.enabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 pt-2"
              >
                <div className="space-y-2">
                  <Label htmlFor="persona">AI Persona</Label>
                  <Select 
                    value={settings.personaId || "default"}
                    onValueChange={(value) => onUpdate({ personaId: value })}
                  >
                    <SelectTrigger id="persona">
                      <SelectValue placeholder="Select an AI persona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Assistant</SelectItem>
                      <SelectItem value="friendly">Friendly Support</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="technical">Technical Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-charcoal-500">The persona defines how the AI assistant communicates</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="knowledge-base">Knowledge Base</Label>
                  <Select 
                    value={settings.knowledgeBaseId || ""}
                    onValueChange={(value) => onUpdate({ knowledgeBaseId: value || undefined })}
                  >
                    <SelectTrigger id="knowledge-base">
                      <SelectValue placeholder="Select a knowledge base" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      <SelectItem value="general">General Knowledge</SelectItem>
                      <SelectItem value="product">Product Documentation</SelectItem>
                      <SelectItem value="support">Support Articles</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-charcoal-500">The AI will use this knowledge to respond to inquiries</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="handoff-threshold">Human Handoff Threshold</Label>
                  <Select 
                    value={settings.settings.aiAssistant.handoffThreshold} 
                    onValueChange={(value) => onUpdate({
                      settings: {
                        ...settings.settings,
                        aiAssistant: {
                          ...settings.settings.aiAssistant,
                          handoffThreshold: value
                        }
                      }
                    })}
                  >
                    <SelectTrigger id="handoff-threshold">
                      <SelectValue placeholder="Select handoff threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Hand off easily</SelectItem>
                      <SelectItem value="medium">Medium - Balanced approach</SelectItem>
                      <SelectItem value="high">High - AI handles most queries</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-charcoal-500 mt-1">
                    Determines how quickly the AI will transfer complex conversations to human agents
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Auto-Reply</CardTitle>
          <CardDescription>
            Configure automatic response settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-reply" className="flex-1">
              Enable auto-reply
            </Label>
            <Switch 
              id="auto-reply" 
              checked={settings.settings.autoReply}
              onCheckedChange={(checked) => onUpdate({
                settings: {
                  ...settings.settings,
                  autoReply: checked
                }
              })}
            />
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-blue-800 dark:text-blue-300">
              <p>Auto-reply settings work together with the AI Assistant. If AI Assistant is disabled, auto-replies will use template messages.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Notifications Settings Tab
const NotificationsSettingsTab = ({ 
  settings, 
  onUpdate 
}: { 
  settings: ChannelSettings
  onUpdate: (updates: Partial<ChannelSettings>) => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose how you want to be notified about channel activity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-charcoal-50 dark:bg-charcoal-800 rounded-lg">
              <div className="flex-1">
                <Label htmlFor="email-notifications" className="font-medium">
                  Email notifications
                </Label>
                <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
                  Receive email alerts for new messages and important events
                </p>
              </div>
              <Switch 
                id="email-notifications" 
                checked={settings.settings.notifications.email}
                onCheckedChange={(checked) => onUpdate({
                  settings: {
                    ...settings.settings,
                    notifications: {
                      ...settings.settings.notifications,
                      email: checked
                    }
                  }
                })}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-charcoal-50 dark:bg-charcoal-800 rounded-lg">
              <div className="flex-1">
                <Label htmlFor="desktop-notifications" className="font-medium">
                  Desktop notifications
                </Label>
                <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
                  Show browser notifications for real-time updates
                </p>
              </div>
              <Switch 
                id="desktop-notifications" 
                checked={settings.settings.notifications.desktop}
                onCheckedChange={(checked) => onUpdate({
                  settings: {
                    ...settings.settings,
                    notifications: {
                      ...settings.settings.notifications,
                      desktop: checked
                    }
                  }
                })}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-charcoal-50 dark:bg-charcoal-800 rounded-lg">
              <div className="flex-1">
                <Label htmlFor="slack-notifications" className="font-medium">
                  Slack notifications
                </Label>
                <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
                  Send notifications to your Slack workspace
                </p>
              </div>
              <Switch 
                id="slack-notifications" 
                checked={settings.settings.notifications.slack}
                onCheckedChange={(checked) => onUpdate({
                  settings: {
                    ...settings.settings,
                    notifications: {
                      ...settings.settings.notifications,
                      slack: checked
                    }
                  }
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Credentials Settings Tab
const CredentialsSettingsTab = ({ 
  settings, 
  onUpdate 
}: { 
  settings: ChannelSettings
  onUpdate: (updates: Partial<ChannelSettings>) => void 
}) => {
  const renderCredentialsForm = () => {
    switch (settings.type) {
      case 'sms':
      case 'whatsapp':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="account-sid">Twilio Account SID</Label>
              <Input 
                id="account-sid" 
                type="password"
                value={settings.credentials.accountSid || ""}
                onChange={(e) => onUpdate({
                  credentials: {
                    ...settings.credentials,
                    accountSid: e.target.value
                  }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth-token">Twilio Auth Token</Label>
              <Input 
                id="auth-token" 
                type="password"
                value={settings.credentials.authToken || ""}
                onChange={(e) => onUpdate({
                  credentials: {
                    ...settings.credentials,
                    authToken: e.target.value
                  }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input 
                id="phone-number" 
                value={settings.credentials.phoneNumber || ""}
                onChange={(e) => onUpdate({
                  credentials: {
                    ...settings.credentials,
                    phoneNumber: e.target.value
                  }
                })}
              />
            </div>
          </div>
        )
      
      case 'email':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input 
                id="smtp-host" 
                value={settings.credentials.smtpHost || ""}
                onChange={(e) => onUpdate({
                  credentials: {
                    ...settings.credentials,
                    smtpHost: e.target.value
                  }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input 
                id="smtp-port" 
                value={settings.credentials.smtpPort || ""}
                onChange={(e) => onUpdate({
                  credentials: {
                    ...settings.credentials,
                    smtpPort: e.target.value
                  }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-email">From Email</Label>
              <Input 
                id="from-email" 
                type="email"
                value={settings.credentials.fromEmail || ""}
                onChange={(e) => onUpdate({
                  credentials: {
                    ...settings.credentials,
                    fromEmail: e.target.value
                  }
                })}
              />
            </div>
          </div>
        )
      
      default:
        return (
          <div className="text-center py-8">
            <Key className="h-12 w-12 text-charcoal-400 mx-auto mb-4" />
            <p className="text-charcoal-600">No credentials required for this channel type.</p>
          </div>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Credentials
          </CardTitle>
          <CardDescription>
            Manage the API credentials for this channel
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderCredentialsForm()}
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <Shield className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div>
              <h4 className="font-medium text-red-800 dark:text-red-200">Delete Channel</h4>
              <p className="text-sm text-red-600 dark:text-red-400">
                Permanently remove this channel and all its data
              </p>
            </div>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Main Modal Component
interface ChannelSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  channelId: string
  onSave?: (settings: ChannelSettings) => void
}

export const ChannelSettingsModal = ({ 
  isOpen, 
  onClose, 
  channelId,
  onSave 
}: ChannelSettingsModalProps) => {
  const [activeTab, setActiveTab] = React.useState("general")
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSaving, setIsSaving] = React.useState(false)
  const [settings, setSettings] = React.useState<ChannelSettings>({
    id: channelId,
    name: "",
    type: "sms",
    status: "connected",
    credentials: {},
    settings: {
      autoReply: true,
      responseTime: "1min",
      workingHours: {
        enabled: true,
        start: "09:00",
        end: "17:00",
        timezone: "America/New_York",
        offHoursMessage: "Thanks for reaching out! Our team is currently offline. We'll respond as soon as we're back."
      },
      aiAssistant: {
        enabled: true,
        personaId: "default",
        handoffThreshold: "medium"
      },
      notifications: {
        email: true,
        desktop: true,
        slack: false
      }
    }
  })

  // Load channel settings
  React.useEffect(() => {
    if (isOpen && channelId) {
      setIsLoading(true)
      // Simulate API call - replace with actual API call
      setTimeout(() => {
        setSettings({
          id: channelId,
          name: "Sample Channel",
          type: "sms",
          status: "connected",
          credentials: {
            accountSid: "AC*****************",
            authToken: "••••••••••••••••",
            phoneNumber: "+1234567890"
          },
          settings: {
            autoReply: true,
            responseTime: "1min",
            workingHours: {
              enabled: true,
              start: "09:00",
              end: "17:00",
              timezone: "America/New_York",
              offHoursMessage: "Thanks for reaching out! Our team is currently offline. We'll respond as soon as we're back."
            },
            aiAssistant: {
              enabled: true,
              personaId: "default",
              handoffThreshold: "medium"
            },
            notifications: {
              email: true,
              desktop: true,
              slack: false
            }
          }
        })
        setIsLoading(false)
      }, 1000)
    }
  }, [isOpen, channelId])

  const handleUpdate = (updates: Partial<ChannelSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      onSave?.(settings)
      toast.success("Channel settings saved successfully!")
      onClose()
    } catch (error) {
      toast.error("Failed to save channel settings")
    } finally {
      setIsSaving(false)
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettingsTab settings={settings} onUpdate={handleUpdate} />
      case "automation":
        return <AutomationSettingsTab settings={settings} onUpdate={handleUpdate} />
      case "notifications":
        return <NotificationsSettingsTab settings={settings} onUpdate={handleUpdate} />
      case "credentials":
        return <CredentialsSettingsTab settings={settings} onUpdate={handleUpdate} />
      default:
        return <GeneralSettingsTab settings={settings} onUpdate={handleUpdate} />
    }
  }

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-accent-blue" />
            <p className="text-charcoal-600">Loading channel settings...</p>
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-charcoal-900">{settings.name} Settings</h2>
            <p className="text-charcoal-600">Configure your channel settings and preferences</p>
          </div>
          <Badge variant={settings.status === 'connected' ? 'success' : 'secondary'}>
            {settings.status}
          </Badge>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-charcoal-100 dark:bg-charcoal-800">
            {tabConfig.map((tab) => {
              const IconComponent = tab.icon
              return (
                <TabsTrigger 
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-charcoal-700"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <TabsContent key={activeTab} value={activeTab} className="mt-6">
                {renderTabContent()}
              </TabsContent>
            </AnimatePresence>
          </div>
        </Tabs>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-charcoal-200 dark:border-charcoal-700">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-gradient-to-r from-accent-blue to-accent-purple text-white"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  )
}