"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, DashboardCard, StatCard } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, 
  Plus, 
  Users, 
  ArrowUpRight, 
  FileText, 
  Bot, 
  Settings, 
  BarChart3, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Upload, 
  AlertCircle, 
  CheckCircle,
  AlertTriangle,
  Bell,
  ChevronUp,
  ChevronDown,
  Facebook,
  Mail,
  MessageCircle,
  RefreshCw,
  Phone,
  X
} from "lucide-react"

export default function DashboardPage() {


  // KPI metrics
  const kpiMetrics = [
    {
      id: "open-tickets",
      label: "Open Conversations",
      value: 25,
      change: 5,
      changeType: "increase",
      period: "yesterday",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      id: "new-messages",
      label: "New Messages Today",
      value: 142,
      change: 12,
      changeType: "increase",
      period: "yesterday",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10"
    },
    {
      id: "response-time",
      label: "Avg. Response Time",
      value: "2.4m",
      change: 0.8,
      changeType: "decrease",
      period: "yesterday",
      icon: <Clock className="h-5 w-5" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      id: "sla-compliance",
      label: "SLA Compliance",
      value: "94%",
      change: 2,
      changeType: "increase",
      period: "last week",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    }
  ];

  // Recent conversations
  const recentConversations = [
    {
      id: "1",
      channel: "sms",
      channelName: "Twilio SMS",
      contact: "John Smith",
      contactId: "+1234567890",
      preview: "Hi, I recently ordered your product but haven't received any shipping confirmation yet...",
      time: "2 minutes ago",
      unread: true,
      status: "active"
    },
    {
      id: "2",
      channel: "facebook",
      channelName: "Facebook Messenger",
      contact: "Maria Garcia",
      contactId: "maria.garcia123",
      preview: "Thank you for the quick response! I'll check my email for the tracking number.",
      time: "15 minutes ago",
      unread: false,
      status: "active"
    },
    {
      id: "3",
      channel: "whatsapp",
      channelName: "WhatsApp",
      contact: "David Johnson",
      contactId: "+1567890123",
      preview: "Do you have this product in a different color? I was hoping for something in blue.",
      time: "42 minutes ago",
      unread: false,
      status: "active"
    },
    {
      id: "4",
      channel: "email",
      channelName: "Email",
      contact: "Sarah Williams",
      contactId: "sarah.w@example.com",
      preview: "I've attached the receipt for my recent purchase. As mentioned, the item arrived damaged...",
      time: "1 hour ago",
      unread: false,
      status: "active"
    },
    {
      id: "5",
      channel: "web",
      channelName: "Web Chat",
      contact: "Alex Chen",
      contactId: "session_839201",
      preview: "I'm on your website right now and having trouble finding the warranty information...",
      time: "1 hour ago",
      unread: true,
      status: "active"
    }
  ];

  // Channel health
  const channelHealth = [
    { id: "sms", name: "SMS", status: "healthy", icon: <Phone className="h-4 w-4" /> },
    { id: "facebook", name: "Facebook", status: "issues", icon: <Facebook className="h-4 w-4" /> },
    { id: "email", name: "Email", status: "healthy", icon: <Mail className="h-4 w-4" /> },
    { id: "whatsapp", name: "WhatsApp", status: "healthy", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "web", name: "Web Chat", status: "healthy", icon: <MessageCircle className="h-4 w-4" /> }
  ];

  // Animation variants for staggered animations
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
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };
  
  // Icon mapping for channels
  const getChannelIcon = (channel: string) => {
    switch(channel) {
      case 'sms': return <Phone className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'whatsapp': return <MessageSquare className="h-4 w-4" />;
      case 'web': return <MessageCircle className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <motion.div 
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <style jsx global>{`
        /* Enhanced card hover animations */
        .dashboard-card {
          transition: all 0.3s ease;
          border: 1px solid rgba(42, 82, 190, 0.1);
        }
        .dashboard-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px -5px rgba(42, 82, 190, 0.15);
          border-color: rgba(42, 82, 190, 0.3);
        }
        .stat-card {
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(42, 82, 190, 0), rgba(42, 82, 190, 0));
          transition: all 0.3s ease;
          z-index: -1;
        }
        .stat-card:hover::before {
          background: linear-gradient(45deg, rgba(42, 82, 190, 0.05), rgba(42, 82, 190, 0));
        }
        .conversation-item {
          transition: all 0.25s ease-in-out;
          border: 1px solid transparent;
        }
        .conversation-item:hover {
          transform: translateY(-2px);
          border-color: rgba(42, 82, 190, 0.3);
          box-shadow: 0 4px 12px rgba(42, 82, 190, 0.1);
        }
        .table-row {
          transition: background-color 0.2s ease;
        }
        .table-row:hover {
          background-color: rgba(42, 82, 190, 0.05);
        }
      `}</style>
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent pb-1">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your OmniChannel system.
            </p>
          </div>
          <Button className="gap-2 bg-gradient-to-r from-[#2a52be] to-[#3a62ce] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <Plus className="h-4 w-4" />
            New Conversation
          </Button>
        </div>
      </div>
      
      {/* KPI Section */}
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
      >
        {kpiMetrics.map((metric) => (
          <motion.div key={metric.id} variants={itemVariants}>
            <StatCard
              icon={metric.icon}
              value={metric.value}
              label={metric.label}
              trend={metric.change * (metric.changeType === "increase" ? 1 : -1)}
              trendLabel={`vs ${metric.period}`}
              color="#2a52be"
              className="stat-card dashboard-card"
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Recent Conversations */}
      <motion.div variants={containerVariants}>
        <DashboardCard>
          <CardHeader separated>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Recent Conversations</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-1 hover:bg-[#2a52be]/5 hover:text-[#2a52be] hover:border-[#2a52be]/30 transition-all duration-300" asChild>
                  <Link href="/dashboard/conversations">
                    <span>View All</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5 mt-1">
              {recentConversations.map((convo) => (
                <motion.div 
                  key={convo.id}
                  variants={itemVariants}
                  className="p-3.5 rounded-lg border bg-card/80 hover:bg-[#2a52be]/5 transition-all conversation-item"
                >
                  <div className="flex justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#2a52be]/10 to-[#3a62ce]/10 border border-[#2a52be]/5 flex items-center justify-center shadow-sm">
                        {getChannelIcon(convo.channel)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-medium truncate">{convo.contact}</h3>
                            {convo.unread && (
                              <span className="flex-shrink-0 h-2 w-2 rounded-full bg-[#2a52be] animate-pulse"></span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Badge variant="outline" className="px-1.5 py-0 h-5 text-[10px] font-normal border-[#2a52be]/10 bg-[#2a52be]/5 text-[#2a52be]/90 hover:bg-[#2a52be]/10 transition-colors">
                              {convo.channelName}
                            </Badge>
                            <span className="text-muted-foreground/70">{convo.time}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1.5">
                          {convo.preview}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <CardFooter separated>
            <Button className="w-full gap-1.5" variant="outline" asChild>
              <Link href="/dashboard/conversations/new">
                <Plus className="h-3.5 w-3.5" />
                <span>New Conversation</span>
              </Link>
            </Button>
          </CardFooter>
        </DashboardCard>
      </motion.div>
      
      {/* Channel Health & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Channel Health */}
        <motion.div
          className="md:col-span-6 lg:col-span-5"
          variants={containerVariants}
        >
          <DashboardCard>
            <CardHeader separated>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Channel Health</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3.5 mt-1">
                {channelHealth.map((channel) => (
                  <motion.div 
                    key={channel.id}
                    variants={itemVariants}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card/80 hover:bg-[#2a52be]/5 transition-all conversation-item"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-background to-muted border border-muted flex items-center justify-center shadow-sm">
                        {channel.icon}
                      </div>
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    <Badge 
                      variant={channel.status === "healthy" ? "outline" : "destructive"} 
                      className={channel.status === "healthy" ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-200" : ""}
                    >
                      {channel.status === "healthy" ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Healthy
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Issues
                        </span>
                      )}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter separated>
              <Button variant="outline" className="w-full gap-1.5" asChild>
                <Link href="/dashboard/channels">
                  <Settings className="h-3.5 w-3.5" />
                  <span>Manage Channels</span>
                </Link>
              </Button>
            </CardFooter>
          </DashboardCard>
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div
          className="md:col-span-6 lg:col-span-7"
          variants={containerVariants}
        >
          <div className="grid gap-6 h-full">
            {/* Add Channel */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mt-8 -mr-8"></div>
              <CardHeader className="relative z-10">
                <CardTitle>Connect a Channel</CardTitle>
                <CardDescription>
                  Integrate with SMS, WhatsApp, Email, or other messaging platforms
                </CardDescription>
              </CardHeader>
              <CardFooter className="relative z-10">
                <Button className="w-full group" asChild>
                  <Link href="/dashboard/channels/connect" className="flex items-center gap-2 w-full justify-center">
                    <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                    Add Channel
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Upload Documents */}
            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full -mt-8 -mr-8"></div>
              <CardHeader className="relative z-10">
                <CardTitle>Upload Knowledge</CardTitle>
                <CardDescription>
                  Add documents to your knowledge base for better AI responses
                </CardDescription>
              </CardHeader>
              <CardFooter className="relative z-10">
                <Button className="w-full bg-accent hover:bg-accent/90 group" asChild>
                  <Link href="/dashboard/knowledge/upload" className="flex items-center gap-2 w-full justify-center">
                    <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                    Upload
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
