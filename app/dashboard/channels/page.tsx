"use client"

import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Link from "next/link"
import { 
  MessageSquare, 
  MessageCircle, 
  Check, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Settings, 
  AlertCircle, 
  Phone, 
  Mail, 
  Facebook, 
  Globe, 
  Smartphone, 
  Info, 
  AlertTriangle,
  ExternalLink,
  Copy,
  CheckCircle2,
  RefreshCw,
  Loader2,
  ArrowUpRight,
  MessageSquareDashed,
  Activity,
  PieChart
} from "lucide-react"
import api from "@/lib/api"

// Custom Dashboard Components
import { 
  DashboardSection,
  ChannelStatusCard,
  ActionCard
} from "@/components/ui/dashboard"

// Animations
import { useAnimations } from "@/hooks/use-animations"

// Helper function to get channel identifier based on type
function getChannelIdentifier(channel: any) {
  const credentials = channel.credentials || {};
  switch (channel.type) {
    case 'sms':
      return credentials.phoneNumber || 'Phone number not set';
    case 'whatsapp':
      return credentials.phoneNumber || 'WhatsApp number not set';
    case 'email':
      return credentials.fromEmail || 'Email not set';
    case 'facebook':
      return credentials.pageId || 'Facebook page';
    case 'web':
      return 'Website Embed';
    default:
      return channel.name;
  }
}

// Helper function to get channel icon based on type
function getChannelIcon(type: string) {
  switch (type?.toLowerCase()) {
    case 'sms':
      return <Phone className="h-6 w-6" />;
    case 'whatsapp':
      return <Smartphone className="h-6 w-6" />;
    case 'email':
      return <Mail className="h-6 w-6" />;
    case 'facebook':
      return <Facebook className="h-6 w-6" />;
    case 'web':
      return <Globe className="h-6 w-6" />;
    default:
      return <MessageSquare className="h-6 w-6" />;
  }
}

export default function ChannelsPage() {
  // State for managing the active tab
  const [activeTab, setActiveTab] = useState("connected");
  
  // State for copied status (for embed code)
  const [copied, setCopied] = useState(false);
  
  // Channel state
  const [connectedChannels, setConnectedChannels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Animation setup
  const { initAnimations } = useAnimations();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  
  useEffect(() => {
    if (containerRef.current && isInView) {
      initAnimations();
    }
  }, [isInView, initAnimations]);
  
  // Mock data for sample channels to add (with only SMS and WhatsApp active)
  const availableChannels = [
    { id: "sms", name: "SMS", icon: <Phone className="h-6 w-6" />, description: "Send and receive text messages via Twilio", available: true, isIntegrated: true },
    { id: "whatsapp", name: "WhatsApp", icon: <Smartphone className="h-6 w-6" />, description: "Connect with WhatsApp Business API via Twilio", available: true, isIntegrated: true },
    { id: "email", name: "Email", icon: <Mail className="h-6 w-6" />, description: "Send and receive emails", available: false, comingSoon: true },
    { id: "facebook", name: "Facebook Messenger", icon: <Facebook className="h-6 w-6" />, description: "Chat through Facebook Messenger", available: false, comingSoon: true },
    { id: "web", name: "Web Chat", icon: <Globe className="h-6 w-6" />, description: "Embed chat on your website", available: false, comingSoon: true },
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  // Copy embed code function
  const copyEmbedCode = () => {
    navigator.clipboard.writeText('<script src="https://omnichannel.example.com/widget.js" data-id="web-chat-id" async></script>');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Remove channel function
  const removeChannel = async (id: string) => {
    try {
      const response = await api.deleteChannel(id);
      if (response.success) {
        setConnectedChannels(prevChannels => prevChannels.filter(channel => channel.id !== id));
      } else {
        throw new Error(response.message || "Failed to delete channel");
      }
    } catch (err: any) {
      console.error("Error deleting channel:", err);
      // We would normally show an error toast here
    }
  };
  
  // Fetch channels from API
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await api.listChannels();
        
        if (response.success) {
          // Transform API data to match our component requirements
          const formattedChannels = (response.data || []).map((channel: any) => ({
            id: channel.id,
            name: channel.name,
            type: channel.type,
            status: channel.is_active ? 'connected' : 'inactive',
            health: 'healthy', // We could determine this based on other factors
            identifier: getChannelIdentifier(channel),
            messagesReceived: 0, // This would come from analytics in a real implementation
            messagesSent: 0, // This would come from analytics in a real implementation
            lastActive: new Date(channel.updated_at).toLocaleString(),
            settings: {
              autoReply: true,
              aiHandling: "all",
              slaMinutes: 15
            },
            icon: getChannelIcon(channel.type),
            webhookUrl: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/webhooks/${channel.type}/${channel.id}`
          }));
          
          setConnectedChannels(formattedChannels);
        } else {
          setError(response.message || 'Failed to load channels');
          // Fall back to mock data in development for testing
          if (process.env.NODE_ENV === 'development') {
            setConnectedChannels([
              {
                id: "1",
                name: "Twilio SMS",
                type: "sms",
                status: "connected",
                health: "healthy",
                identifier: "+1234567890",
                messagesReceived: 76,
                messagesSent: 82,
                lastActive: "10 minutes ago",
                settings: {
                  autoReply: true,
                  aiHandling: "all",
                  slaMinutes: 15
                },
                icon: <Phone className="h-6 w-6" />,
                webhookUrl: "http://localhost:3000/webhooks/sms/1"
              },
              {
                id: "2",
                name: "Twilio WhatsApp",
                type: "whatsapp",
                status: "connected",
                health: "healthy",
                identifier: "+1234567890",
                messagesReceived: 45,
                messagesSent: 39,
                lastActive: "35 minutes ago",
                settings: {
                  autoReply: true,
                  aiHandling: "all",
                  slaMinutes: 15
                },
                icon: <Smartphone className="h-6 w-6" />,
                webhookUrl: "http://localhost:3000/webhooks/whatsapp/2"
              }
            ]);
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load channels');
        // Fall back to mock data in development for testing
        if (process.env.NODE_ENV === 'development') {
          setConnectedChannels([
            {
              id: "1",
              name: "Twilio SMS",
              type: "sms",
              status: "connected",
              health: "healthy",
              identifier: "+1234567890",
              messagesReceived: 76,
              messagesSent: 82,
              lastActive: "10 minutes ago",
              settings: {
                autoReply: true,
                aiHandling: "all",
                slaMinutes: 15
              },
              icon: <Phone className="h-6 w-6" />,
              webhookUrl: "http://localhost:3000/webhooks/sms/1"
            },
            {
              id: "2",
              name: "Twilio WhatsApp",
              type: "whatsapp",
              status: "connected",
              health: "healthy", 
              identifier: "+1234567890",
              messagesReceived: 45,
              messagesSent: 39,
              lastActive: "35 minutes ago",
              settings: {
                autoReply: true,
                aiHandling: "all",
                slaMinutes: 15
              },
              icon: <Smartphone className="h-6 w-6" />,
              webhookUrl: "http://localhost:3000/webhooks/whatsapp/2"
            }
          ]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChannels();
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="flex flex-col gap-6 pb-6"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      data-scroll-section
    >
      {/* Header Section */}
      <motion.div 
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-baseline justify-between">
          <div>
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Communication Channels 📡
            </motion.h1>
            <motion.p 
              className="text-slate-600 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Connect and manage all your communication channels
            </motion.p>
          </div>
          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 shadow-lg shadow-black/5 rounded-2xl"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl" 
                asChild
              >
                <Link href="/dashboard/channels/connect" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Channel</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      <Tabs defaultValue="connected" value={activeTab} onValueChange={setActiveTab}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/80 backdrop-blur-sm p-1.5 rounded-2xl shadow-lg shadow-black/5 border border-white/20">
            <TabsTrigger 
              value="connected" 
              className="text-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl font-semibold"
            >
              Connected Channels
            </TabsTrigger>
            <TabsTrigger 
              value="available" 
              className="text-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl font-semibold"
            >
              Available Channels
            </TabsTrigger>
          </TabsList>
        </motion.div>
        
        {/* Connected Channels Tab */}
        <TabsContent value="connected" className="mt-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full p-12">
                <div className="animate-spin mb-2">
                  <Loader2 className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Loading channels...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full p-12">
                <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                <h3 className="font-medium mb-1">Failed to load channels</h3>
                <p className="text-sm text-muted-foreground text-center">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 gap-1.5 border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Try Again
                </Button>
              </div>
            ) : connectedChannels.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {connectedChannels.map((channel, index) => (
                  <motion.div 
                    key={channel.id} 
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 border-white/20 hover:border-white/40 h-full bg-white/80 backdrop-blur-sm hover:-translate-y-2">
                      <CardHeader className="pb-4 relative">
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <motion.div 
                              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg text-white group-hover:shadow-xl transition-all duration-300"
                              whileHover={{ rotate: 5, scale: 1.1 }}
                            >
                              {channel.icon}
                            </motion.div>
                            <div>
                              <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-slate-800 transition-colors">{channel.name}</CardTitle>
                              <p className="text-sm text-slate-600 font-medium">{channel.identifier}</p>
                            </div>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                  {channel.health === "healthy" ? (
                                    <Badge variant="outline" className="bg-green-100/80 text-green-700 hover:bg-green-200/80 border-green-300 flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold">
                                      <CheckCircle2 className="h-3 w-3" />
                                      Healthy
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-amber-100/80 text-amber-700 hover:bg-amber-200/80 border-amber-300 flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold">
                                      <AlertTriangle className="h-3 w-3" />
                                      Issues
                                    </Badge>
                                  )}
                                </motion.div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-white/95 backdrop-blur-sm border-white/20">
                                {channel.health === "healthy" 
                                  ? "This channel is working properly" 
                                  : "This channel is experiencing some issues"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <div className="space-y-5">
                          <div className="grid grid-cols-2 gap-4">
                            <motion.div 
                              className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 border border-green-200/50 rounded-2xl p-4 text-center shadow-sm group-hover:shadow-md transition-all duration-300"
                              whileHover={{ scale: 1.02 }}
                            >
                              <p className="text-xs font-semibold text-green-700 mb-1">Messages Received</p>
                              <p className="text-2xl font-bold text-green-800">{channel.messagesReceived}</p>
                            </motion.div>
                            <motion.div 
                              className="bg-gradient-to-br from-blue-100/80 to-indigo-100/80 border border-blue-200/50 rounded-2xl p-4 text-center shadow-sm group-hover:shadow-md transition-all duration-300"
                              whileHover={{ scale: 1.02 }}
                            >
                              <p className="text-xs font-semibold text-blue-700 mb-1">Messages Sent</p>
                              <p className="text-2xl font-bold text-blue-800">{channel.messagesSent}</p>
                            </motion.div>
                          </div>

                          {/* Webhook URL */}
                          <motion.div 
                            className="p-4 bg-gradient-to-br from-slate-50/80 to-gray-50/80 rounded-2xl border border-slate-200/50 shadow-sm group-hover:shadow-md transition-all duration-300"
                            whileHover={{ scale: 1.01 }}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                Webhook URL
                              </h4>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 px-3 text-xs bg-white/80 hover:bg-white hover:text-slate-700 transition-all duration-200 rounded-xl font-semibold shadow-sm" 
                                  onClick={() => {
                                    navigator.clipboard.writeText(channel.webhookUrl);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                  }}
                                >
                                  {copied ? <CheckCircle2 className="h-3 w-3 mr-1.5" /> : <Copy className="h-3 w-3 mr-1.5" />}
                                  {copied ? "Copied!" : "Copy"}
                                </Button>
                              </motion.div>
                            </div>
                            <div className="text-xs font-mono bg-white/80 p-3 rounded-xl overflow-x-auto border border-slate-200/50 text-slate-600">
                              {channel.webhookUrl}
                            </div>
                          </motion.div>
                        </div>
                      </CardContent>
                      <CardFooter className="relative z-10 flex flex-col gap-3 pt-4 border-t border-white/30">
                        <div className="flex w-full justify-between gap-3">
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full bg-white/60 border-white/40 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all duration-200 rounded-xl font-semibold shadow-sm" 
                              asChild
                            >
                              <Link href={`/dashboard/channels/${channel.id}/settings`} className="flex items-center gap-2">
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
                              </Link>
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full bg-white/60 border-white/40 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all duration-200 rounded-xl font-semibold shadow-sm" 
                              asChild
                            >
                              <Link href={`/dashboard/channels/${channel.id}/messages`} className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                <span>Messages</span>
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50/80 transition-all duration-200 rounded-xl font-semibold" 
                            onClick={() => removeChannel(channel.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Channel
                          </Button>
                        </motion.div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-white dark:bg-card">
                <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">No channels connected yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect your first communication channel to start engaging with your customers through AI-powered conversations.
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/channels/connect" className="flex items-center gap-2">
                      <span>Connect Your First Channel</span>
                    </Link>
                  </Button>
                </div>
              </Card>
            )}
          </motion.div>
        </TabsContent>

        {/* Available Channels Tab */}
        <TabsContent value="available" className="mt-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Available Communication Channels</h2>
            </div>
            
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {availableChannels.map((channel) => (
                <motion.div key={channel.id} variants={itemVariants}>
                  <Card className="relative overflow-hidden hover:shadow-md transition-all duration-200 border-opacity-80 hover:border-primary/20 h-full bg-white dark:bg-card">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          {channel.icon}
                        </div>
                        <div>
                          <CardTitle>{channel.name}</CardTitle>
                          {channel.comingSoon && (
                            <Badge variant="outline" className="text-xs mt-1">Coming Soon</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{channel.description}</p>
                      {channel.isIntegrated && (
                        <div className="mt-2 flex items-center">
                          <Badge variant="success" className="text-xs">
                            <Check className="h-3 w-3 mr-1" />
                            Integrated with Twilio
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full group" disabled={!channel.available}>
                        {channel.available ? (
                          <Link href={`/dashboard/channels/connect?type=${channel.id}`} className="flex items-center gap-2">
                            <span>Connect</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        ) : (
                          <span>Coming Soon</span>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
