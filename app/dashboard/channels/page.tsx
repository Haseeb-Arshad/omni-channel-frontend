"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
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
  RefreshCw
} from "lucide-react"
import api from "@/lib/api"

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
    <div className="space-y-6 bg-white dark:bg-background">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Communication Channels</h1>
          <p className="text-muted-foreground">Connect and manage all your communication channels</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm" className="gap-1" asChild>
            <Link href="/dashboard/channels/connect">
              <Plus className="h-4 w-4" />
              Add Channel
            </Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="connected" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="connected" className="text-center">
            Connected Channels
          </TabsTrigger>
          <TabsTrigger value="available" className="text-center">
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
              <div className="w-full p-12 flex justify-center items-center">
                <div className="text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading channels...</p>
                </div>
              </div>
            ) : error ? (
              <div className="w-full p-12 flex justify-center items-center">
                <div className="text-center text-red-500">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                  <p>{error}</p>
                  <Button onClick={() => window.location.reload()} variant="outline" size="sm" className="mt-4">
                    <RefreshCw className="h-4 w-4 mr-2" /> Try Again
                  </Button>
                </div>
              </div>
            ) : connectedChannels.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {connectedChannels.map((channel) => (
                  <motion.div key={channel.id} variants={itemVariants}>
                    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border-opacity-80 hover:border-primary/20 h-full bg-white dark:bg-card">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              {channel.icon}
                            </div>
                            <div>
                              <CardTitle>{channel.name}</CardTitle>
                              <p className="text-xs text-muted-foreground">{channel.identifier}</p>
                            </div>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  {channel.health === "healthy" ? (
                                    <Badge variant="success" className="flex items-center gap-1">
                                      <CheckCircle2 className="h-3 w-3" />
                                      Healthy
                                    </Badge>
                                  ) : (
                                    <Badge variant="warning" className="flex items-center gap-1">
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
                            <div className="bg-muted/30 rounded-lg p-3 text-center">
                              <p className="text-xs text-muted-foreground">Messages Received</p>
                              <p className="text-lg font-bold">{channel.messagesReceived}</p>
                            </div>
                            <div className="bg-muted/30 rounded-lg p-3 text-center">
                              <p className="text-xs text-muted-foreground">Messages Sent</p>
                              <p className="text-lg font-bold">{channel.messagesSent}</p>
                            </div>
                          </div>

                          {/* Webhook URL */}
                          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium">Webhook URL</h4>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 px-2 text-xs" 
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
                            <div className="text-xs font-mono bg-muted/50 p-2 rounded overflow-x-auto">
                              {channel.webhookUrl}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-2">
                        <div className="flex w-full justify-between gap-2">
                          <Button variant="outline" size="sm" className="w-1/2" asChild>
                            <Link href={`/dashboard/channels/${channel.id}/settings`}>
                              <Settings className="h-4 w-4 mr-2" />
                              Settings
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="w-1/2" asChild>
                            <Link href={`/dashboard/channels/${channel.id}/messages`}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Messages
                            </Link>
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 w-full justify-start"
                          onClick={() => removeChannel(channel.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Disconnect Channel
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
    </div>
  );
}
