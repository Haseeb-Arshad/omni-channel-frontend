"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Plus, Activity, MessageSquare, Clock, Users } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { NotificationBanner } from "@/components/dashboard/notification-banner";
import { AgentsGrid } from "@/components/agents/agents-grid";
import { Button } from "@/components/ui/button";

// Mock data for agents
const mockAgents = [
  {
    id: "1",
    name: "Customer Support Bot",
    avatar: null,
    isActive: true,
    metrics: {
      resolutionsThisWeek: 47,
      successRate: 94
    },
    activeChannels: ["whatsapp", "email", "web"],
    lastActivity: new Date("2024-01-15")
  },
  {
    id: "2", 
    name: "Sales Assistant",
    avatar: null,
    isActive: true,
    metrics: {
      resolutionsThisWeek: 23,
      successRate: 87
    },
    activeChannels: ["phone", "web"],
    lastActivity: new Date("2024-01-14")
  },
  {
    id: "3",
    name: "Technical Support",
    avatar: null,
    isActive: false,
    metrics: {
      resolutionsThisWeek: 12,
      successRate: 96
    },
    activeChannels: ["email", "web"],
    lastActivity: new Date("2024-01-13")
  }
];

// Stats for agents overview
const agentStats = [
  {
    title: 'Active Agents',
    value: '3',
    change: '+1',
    trend: 'up' as const,
    icon: Bot,
    gradient: 'from-purple-500 to-purple-600',
    delay: 0
  },
  {
    title: 'Total Conversations',
    value: '1,247',
    change: '+23%',
    trend: 'up' as const,
    icon: MessageSquare,
    gradient: 'from-blue-500 to-blue-600',
    delay: 0.1
  },
  {
    title: 'Avg Response Time',
    value: '1.2s',
    change: '-0.3s',
    trend: 'up' as const,
    icon: Clock,
    gradient: 'from-green-500 to-green-600',
    delay: 0.2
  },
  {
    title: 'Customer Satisfaction',
    value: '4.9',
    change: '+0.2',
    trend: 'up' as const,
    icon: Users,
    gradient: 'from-orange-500 to-orange-600',
    delay: 0.3
  }
];

export default function AgentsPage() {
  const [agents, setAgents] = useState(mockAgents);

  const handleToggleActive = (id: string, active: boolean) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id ? { ...agent, isActive: active } : agent
    ));
  };

  const handleManageAgent = (id: string) => {
    console.log("Managing agent:", id);
    // Navigate to agent management page
  };

  const handleMoreActions = (id: string) => {
    console.log("More actions for agent:", id);
  };

  const handleCreateAgent = () => {
    console.log("Creating new agent");
    // Open create agent modal/page
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <PageHeader
        title="AI Agents"
        subtitle="Create, manage, and monitor AI agents across all your communication channels."
      >
        <Button
          onClick={handleCreateAgent}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Agent
        </Button>
      </PageHeader>

      {/* AI Performance Banner */}
      <NotificationBanner
        icon={Activity}
        title="AI Performance Update"
        description="Your agents handled 89% of conversations automatically this week, saving 12 hours of manual work."
        action={{
          label: "View Details",
          onClick: () => console.log("View AI performance details")
        }}
        variant="success"
      />

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {agentStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </motion.div>

      {/* Agents Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <AgentsGrid
          agents={agents}
          onToggleActive={handleToggleActive}
          onManageAgent={handleManageAgent}
          onMoreActions={handleMoreActions}
          onCreateAgent={handleCreateAgent}
        />
      </motion.div>
    </motion.div>
  );
}