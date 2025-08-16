"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AgentCard } from "./agent-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Bot, Plus, Settings } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  avatar?: string | null;
  isActive: boolean;
  metrics: {
    resolutionsThisWeek: number;
    successRate: number;
  };
  activeChannels: string[];
  lastActivity: Date;
}

interface AgentsGridProps {
  agents: Agent[];
  onToggleActive: (id: string, active: boolean) => void;
  onManageAgent: (id: string) => void;
  onMoreActions: (id: string) => void;
  onCreateAgent: () => void;
  loading?: boolean;
}

export const AgentsGrid = ({
  agents,
  onToggleActive,
  onManageAgent,
  onMoreActions,
  onCreateAgent,
  loading = false
}: AgentsGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="h-16 bg-gray-100 rounded-lg"></div>
              <div className="h-16 bg-gray-100 rounded-lg"></div>
            </div>
            <div className="h-8 bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <EmptyState
        icon={Bot}
        title="No AI agents yet"
        description="Create your first AI agent to start automating customer conversations across all channels."
        actions={[
          {
            label: "Create Agent",
            onClick: onCreateAgent,
            variant: "default"
          },
          {
            label: "Learn More",
            onClick: () => console.log("Learn more"),
            variant: "outline"
          }
        ]}
      />
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence>
        {agents.map((agent, index) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onToggleActive={onToggleActive}
            onManage={onManageAgent}
            onMoreActions={onMoreActions}
            index={index}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};