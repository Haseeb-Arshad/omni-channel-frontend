"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useAnimations } from "@/hooks/use-animations"

// Dashboard UI components
import { 
  StatsCard, 
  ConversationCard, 
  ChannelStatusCard,
  ActionCard,
  DashboardSection 
} from "@/components/ui/dashboard"

import { 
  // Messaging
  MessageSquare, 
  MessageCircle,
  Mail,
  Phone,
  Facebook,
  Globe,
  
  // UI
  Plus, 
  ArrowUpRight, 
  RefreshCw,
  Settings,
  Check,
  X,
  ExternalLink,
  MoreHorizontal,
  
  // Status
  AlertTriangle,
  CheckCircle,
  CheckCircle2,
  AlertCircle,
  Clock,
  Activity,
  
  // Actions
  Upload,
  Download,
  FileText,
  Users,
  Bot,
  BrainCircuit,
  Zap,
  PieChart
} from "lucide-react";

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

  // Animation setup
  const { initAnimations } = useAnimations();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (containerRef.current && isInView) {
      initAnimations();
    }
  }, [isInView, initAnimations]);
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        ease: [0.22, 1, 0.36, 1],
        duration: 0.5
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
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  // Helper functions for routing
  const navigateToConversation = (id: string) => {
    // This is a placeholder function - in a real app, you would use router.push
    console.log(`Navigating to conversation: ${id}`);
  };

  return (
    <motion.div 
      ref={containerRef}
      className="flex flex-col gap-8 pb-10"
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
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent pb-1">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your OmniChannel system.
            </p>
          </div>
          <Button asChild className="gap-2 bg-gradient-to-r from-primary to-primary/80 text-white shadow-sm hover:shadow-md transition-all duration-200">
            <Link href="/dashboard/conversations/new">
              <Plus className="h-4 w-4" />
              New Conversation
            </Link>
          </Button>
        </div>
      </motion.div>
      
      {/* KPI Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((metric, index) => (
          <StatsCard
            key={metric.id}
            index={index}
            title={metric.label}
            value={metric.value}
            icon={metric.icon}
            trend={metric.change * (metric.changeType === "increase" ? 1 : -1)}
            trendLabel={`vs ${metric.period}`}
          />
        ))}
      </div>
      
      {/* Recent Conversations */}
      <DashboardSection
        title="Recent Conversations"
        action={{ label: "View All", href: "/dashboard/conversations", icon: <ArrowUpRight className="h-3.5 w-3.5" /> }}
        moreActions={
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
            <RefreshCw className="h-4 w-4" />
          </Button>
        }
        delay={0.1}
      >
        <Card className="border-primary/10 shadow-sm backdrop-blur-[2px] overflow-hidden">
          <CardContent className="p-4 space-y-3">
            {recentConversations.map((convo, index) => (
              <ConversationCard
                key={convo.id}
                id={convo.id}
                contact={{ name: convo.contact }}
                message={convo.preview}
                time={convo.time}
                channel={convo.channel}
                channelName={convo.channelName}
                unread={convo.unread}
                index={index}
                onClick={() => navigateToConversation(convo.id)}
              />
            ))}
          </CardContent>
          <CardFooter className="px-4 py-3 border-t">
            <Button className="w-full gap-1.5" variant="outline" asChild>
              <Link href="/dashboard/conversations/new">
                <Plus className="h-3.5 w-3.5" />
                <span>New Conversation</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </DashboardSection>
      
      {/* Two-column layout section */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Channel Health */}
        <div className="md:col-span-6 lg:col-span-5">
          <DashboardSection
            title="Channel Health"
            action={{ label: "Manage Channels", href: "/dashboard/channels", icon: <Settings className="h-3.5 w-3.5" /> }}
            moreActions={
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
                <RefreshCw className="h-4 w-4" />
              </Button>
            }
            delay={0.2}
          >
            <Card className="border-primary/10 shadow-sm backdrop-blur-[2px] overflow-hidden">
              <CardContent className="p-4 space-y-3">
                {channelHealth.map((channel, index) => (
                  <ChannelStatusCard
                    key={channel.id}
                    id={channel.id}
                    name={channel.name}
                    status={channel.status as 'healthy' | 'issues' | 'offline'}
                    icon={channel.icon}
                    index={index}
                    onClick={() => console.log(`Navigating to channel: ${channel.id}`)}
                  />
                ))}
              </CardContent>
            </Card>
          </DashboardSection>
        </div>
        
        {/* Quick Actions */}
        <div className="md:col-span-6 lg:col-span-7">
          <DashboardSection
            title="Quick Actions"
            description="Access common tasks and operations"
            delay={0.3}
          >
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              <ActionCard 
                title="Connect Channel"
                description="Add SMS, WhatsApp, Email or other messaging platforms"
                icon={<MessageCircle className="h-5 w-5" />}
                buttonText="Add Channel"
                buttonIcon={<Plus className="h-4 w-4" />}
                href="/dashboard/channels/connect"
                gradient="from-primary/5 to-primary/10 border-primary/20"
                index={0}
              />
              
              <ActionCard 
                title="Upload Knowledge"
                description="Add documents to your knowledge base for better AI responses"
                icon={<Upload className="h-5 w-5" />}
                buttonText="Upload"
                buttonIcon={<Plus className="h-4 w-4" />}
                href="/dashboard/knowledge/upload"
                gradient="from-accent/5 to-accent/10 border-accent/20"
                index={1}
              />
              
              <ActionCard 
                title="Manage Personas"
                description="Create and customize AI personalities for your channels"
                icon={<Bot className="h-5 w-5" />}
                buttonText="Personas"
                buttonIcon={<Users className="h-4 w-4" />}
                href="/dashboard/persona"
                gradient="from-indigo-500/5 to-indigo-500/10 border-indigo-500/20"
                index={2}
              />
              
              <ActionCard 
                title="Analytics"
                description="View conversation metrics and performance insights"
                icon={<PieChart className="h-5 w-5" />}
                buttonText="View Stats"
                buttonIcon={<Activity className="h-4 w-4" />}
                href="/dashboard/analytics"
                gradient="from-emerald-500/5 to-emerald-500/10 border-emerald-500/20"
                index={3}
              />
            </div>
          </DashboardSection>
        </div>
      </div>
      
      {/* Activity Feed Section - Coming Soon */}
      <DashboardSection
        title="Recent Activity"
        description="Monitor your system's activity and performance"
        action={{ label: "View All", href: "/dashboard/activity" }}
        delay={0.4}
      >
        <Card className="border-primary/10 shadow-sm backdrop-blur-[2px] overflow-hidden p-8 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Activity Feed Coming Soon</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              We're working on a comprehensive activity feed to help you monitor all interactions across your channels in one place.
            </p>
          </div>
        </Card>
      </DashboardSection>
    </motion.div>
  )
}
