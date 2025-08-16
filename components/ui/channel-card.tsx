"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Loader2,
  Settings,
  MessageSquare,
  Trash2,
  Activity,
  Clock,
  TrendingUp,
  TrendingDown
} from "lucide-react"

// Channel status types
export type ChannelStatus = 'connected' | 'disconnected' | 'error' | 'syncing' | 'inactive'
export type ChannelHealth = 'healthy' | 'warning' | 'critical'

// Channel card props interface
export interface ChannelCardProps {
  id: string
  name: string
  type: string
  icon: React.ReactNode
  status: ChannelStatus
  health?: ChannelHealth
  identifier: string
  messagesReceived?: number
  messagesSent?: number
  lastActivity?: string
  webhookUrl?: string
  onSettings?: (id: string) => void
  onMessages?: (id: string) => void
  onRemove?: (id: string) => void
  className?: string
}

// Status indicator component
const StatusIndicator = ({ status, health }: { status: ChannelStatus, health?: ChannelHealth }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          variant: health === 'critical' ? 'danger' : health === 'warning' ? 'warning' : 'success' as const,
          icon: health === 'critical' ? AlertCircle : health === 'warning' ? AlertTriangle : CheckCircle2,
          label: health === 'critical' ? 'Issues' : health === 'warning' ? 'Warning' : 'Connected',
          animate: true
        }
      case 'syncing':
        return {
          variant: 'info' as const,
          icon: Loader2,
          label: 'Syncing',
          animate: true,
          spin: true
        }
      case 'disconnected':
        return {
          variant: 'secondary' as const,
          icon: AlertCircle,
          label: 'Disconnected',
          animate: false
        }
      case 'error':
        return {
          variant: 'danger' as const,
          icon: AlertCircle,
          label: 'Error',
          animate: true
        }
      case 'inactive':
        return {
          variant: 'secondary' as const,
          icon: Clock,
          label: 'Inactive',
          animate: false
        }
      default:
        return {
          variant: 'secondary' as const,
          icon: AlertCircle,
          label: 'Unknown',
          animate: false
        }
    }
  }

  const config = getStatusConfig()
  const IconComponent = config.icon

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Badge 
        variant={config.variant}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold transition-all duration-300",
          config.animate && "hover:scale-105"
        )}
      >
        <motion.div
          animate={config.spin ? { rotate: 360 } : {}}
          transition={config.spin ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
        >
          <IconComponent className="h-3 w-3" />
        </motion.div>
        {config.label}
      </Badge>
    </motion.div>
  )
}

// Activity metrics component
const ActivityMetrics = ({ 
  messagesReceived = 0, 
  messagesSent = 0 
}: { 
  messagesReceived?: number
  messagesSent?: number 
}) => {
  const total = messagesReceived + messagesSent
  const receivedPercentage = total > 0 ? (messagesReceived / total) * 100 : 50

  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div 
        className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 border border-green-200/50 rounded-2xl p-4 text-center shadow-sm group-hover:shadow-md transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-center gap-1 mb-1">
          <TrendingDown className="h-3 w-3 text-green-700" />
          <p className="text-xs font-semibold text-green-700">Received</p>
        </div>
        <motion.p 
          className="text-2xl font-bold text-green-800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          {messagesReceived.toLocaleString()}
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="bg-gradient-to-br from-blue-100/80 to-indigo-100/80 border border-blue-200/50 rounded-2xl p-4 text-center shadow-sm group-hover:shadow-md transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-1 mb-1">
          <TrendingUp className="h-3 w-3 text-blue-700" />
          <p className="text-xs font-semibold text-blue-700">Sent</p>
        </div>
        <motion.p 
          className="text-2xl font-bold text-blue-800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          {messagesSent.toLocaleString()}
        </motion.p>
      </motion.div>
    </div>
  )
}

// Main channel card component
export const ChannelCard = React.forwardRef<HTMLDivElement, ChannelCardProps>(
  ({ 
    id,
    name,
    type,
    icon,
    status,
    health,
    identifier,
    messagesReceived,
    messagesSent,
    lastActivity,
    webhookUrl,
    onSettings,
    onMessages,
    onRemove,
    className,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
      <motion.div
        ref={ref}
        className={cn("h-full", className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        {...props}
      >
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-charcoal-900/10 border-charcoal-200/50 hover:border-charcoal-300/50 h-full bg-white/80 backdrop-blur-sm hover:-translate-y-2">
          <CardHeader className="pb-4 relative">
            {/* Background Gradient */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
            />
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-lg text-white group-hover:shadow-xl transition-all duration-300"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {icon}
                </motion.div>
                <div>
                  <motion.h3 
                    className="text-lg font-bold text-charcoal-900 group-hover:text-charcoal-800 transition-colors"
                    layoutId={`title-${id}`}
                  >
                    {name}
                  </motion.h3>
                  <p className="text-sm text-charcoal-600 font-medium">{identifier}</p>
                  {lastActivity && (
                    <div className="flex items-center gap-1 mt-1">
                      <Activity className="h-3 w-3 text-charcoal-400" />
                      <span className="text-xs text-charcoal-500">{lastActivity}</span>
                    </div>
                  )}
                </div>
              </div>
              <StatusIndicator status={status} health={health} />
            </div>
          </CardHeader>

          <CardContent className="relative z-10 space-y-5">
            {/* Activity Metrics */}
            <ActivityMetrics 
              messagesReceived={messagesReceived} 
              messagesSent={messagesSent} 
            />

            {/* Webhook URL Section */}
            {webhookUrl && (
              <motion.div 
                className="p-4 bg-gradient-to-br from-charcoal-50/80 to-charcoal-100/80 rounded-2xl border border-charcoal-200/50 shadow-sm group-hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.01 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-charcoal-700 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Webhook URL
                  </h4>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-3 text-xs bg-white/80 hover:bg-white hover:text-charcoal-700 transition-all duration-200 rounded-xl font-semibold shadow-sm" 
                      onClick={() => navigator.clipboard.writeText(webhookUrl)}
                    >
                      Copy
                    </Button>
                  </motion.div>
                </div>
                <div className="text-xs font-mono bg-white/80 p-3 rounded-xl overflow-x-auto border border-charcoal-200/50 text-charcoal-600">
                  {webhookUrl}
                </div>
              </motion.div>
            )}
          </CardContent>

          <CardFooter className="relative z-10 flex flex-col gap-3 pt-4 border-t border-charcoal-200/30">
            <div className="flex w-full justify-between gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-white/60 border-charcoal-200/40 hover:bg-white hover:border-accent-blue/30 hover:text-accent-blue transition-all duration-200 rounded-xl font-semibold shadow-sm" 
                  onClick={() => onSettings?.(id)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-white/60 border-charcoal-200/40 hover:bg-white hover:border-accent-blue/30 hover:text-accent-blue transition-all duration-200 rounded-xl font-semibold shadow-sm" 
                  onClick={() => onMessages?.(id)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-red-500 hover:text-red-600 hover:bg-red-50/80 transition-all duration-200 rounded-xl font-semibold" 
                onClick={() => onRemove?.(id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Channel
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }
)

ChannelCard.displayName = "ChannelCard"

// Export types for external use
export type { ChannelStatus, ChannelHealth }