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
        className="flex flex-col gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent pb-1">Communication Channels</h1>
            <p className="text-muted-foreground">
              Connect and manage all your communication channels
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1.5 border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/30"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button 
              className="gap-2 bg-gradient-to-r from-primary to-primary/80 text-white shadow-sm hover:shadow-md transition-all duration-200" 
              asChild
            >
              <Link href="/dashboard/channels/connect">
                <Plus className="h-4 w-4" />
                Add Channel
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
      
      <Tabs defaultValue="connected" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-accent/20 p-1 rounded-lg">
          <TabsTrigger 
            value="connected" 
            className="text-center data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
          >
            Connected Channels
          </TabsTrigger>
          <TabsTrigger 
            value="available" 
            className="text-center data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
          >
            Available Channels
          </TabsTrigger>
        </TabsList>
        
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
                    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-primary/10 hover:border-primary/20 h-full backdrop-blur-[2px]">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/5 flex items-center justify-center shadow-sm text-primary/80">
                              {channel.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{channel.name}</CardTitle>
                              <p className="text-xs text-muted-foreground">{channel.identifier}</p>
                            </div>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  {channel.health === "healthy" ? (
                                    <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-200 flex items-center gap-1">
                                      <CheckCircle2 className="h-3 w-3" />
                                      Healthy
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-200 flex items-center gap-1">
                                      <AlertTriangle className="h-3 w-3" />
                                      Issues
                                    </Badge>
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                {channel.health === "healthy" 
                                  ? "This channel is working properly" 
                                  : "This channel is experiencing some issues"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/5 rounded-lg p-3 text-center shadow-sm">
                              <p className="text-xs text-muted-foreground">Messages Received</p>
                              <p className="text-lg font-bold text-primary">{channel.messagesReceived}</p>
                            </div>
                            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/5 rounded-lg p-3 text-center shadow-sm">
                              <p className="text-xs text-muted-foreground">Messages Sent</p>
                              <p className="text-lg font-bold text-primary">{channel.messagesSent}</p>
                            </div>
                          </div>

                          {/* Webhook URL */}
                          <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-900/20 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium text-blue-700 dark:text-blue-400">Webhook URL</h4>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 px-2 text-xs hover:bg-blue-100/50 hover:text-blue-700 transition-colors duration-200" 
                                onClick={() => {
                                  navigator.clipboard.writeText(channel.webhookUrl);
                                  setCopied(true);
                                  setTimeout(() => setCopied(false), 2000);
                                }}
                              >
                                {copied ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                                {copied ? "Copied!" : "Copy"}
                              </Button>
                            </div>
                            <div className="text-xs font-mono bg-blue-50/80 dark:bg-blue-900/20 p-2 rounded overflow-x-auto border border-blue-100/50 dark:border-blue-800/20">
                              {channel.webhookUrl}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-2 pt-2 border-t border-primary/10">
                        <div className="flex w-full justify-between gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-1/2 border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-colors duration-200" 
                            asChild
                          >
                            <Link href={`/dashboard/channels/${channel.id}/settings`}>
                              <Settings className="h-4 w-4 mr-2" />
                              Settings
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-1/2 border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-colors duration-200" 
                            asChild
                          >
                            <Link href={`/dashboard/channels/${channel.id}/messages`}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Messages
                            </Link>
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50/50 dark:hover:bg-red-950/20 mt-1 transition-colors duration-200" 
                          onClick={() => removeChannel(channel.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Channel
                        </Button>
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
                    <Link href="/dashboard/channels/connect">Connect Your First Channel</Link>
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
                          <Link href={`/dashboard/channels/connect?type=${channel.id}`}>
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
