"use client";

import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Clock, 
  Star, 
  CheckCircle2, 
  Bot, 
  TrendingUp,
  Users,
  Activity
} from "lucide-react";

import { NotificationBanner } from "@/components/dashboard";
import { EditorialHeader, EditorialStatTile, EditorialPanel } from "@/components/ui/editorial";

// Stats for dashboard overview
const dashboardStats = [
  {
    title: 'Total Conversations',
    value: '1,247',
    change: '+23%',
    trend: 'up' as const,
    icon: MessageSquare,
    gradient: 'from-blue-500 to-blue-600',
    delay: 0
  },
  {
    title: 'Avg Response Time',
    value: '2.3m',
    change: '-18%',
    trend: 'up' as const,
    icon: Clock,
    gradient: 'from-green-500 to-green-600',
    delay: 0.1
  },
  {
    title: 'Customer Satisfaction',
    value: '4.8',
    change: '+0.3',
    trend: 'up' as const,
    icon: Star,
    gradient: 'from-orange-500 to-orange-600',
    delay: 0.2
  },
  {
    title: 'Resolution Rate',
    value: '94.2%',
    change: '+5%',
    trend: 'up' as const,
    icon: CheckCircle2,
    gradient: 'from-purple-500 to-purple-600',
    delay: 0.3
  }
];

export default function HomePage() {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <EditorialHeader
        title="Overview"
        subtitle="Monitor omni-channel performance and AI agent activity"
      />

      {/* AI Performance Banner */}
      <NotificationBanner
        icon={Bot}
        title="AI Performance Update"
        description="Your AI agents handled 89% of conversations automatically this week, saving 12 hours of manual work."
        action={{
          label: "View AI Analytics",
          onClick: () => console.log("View AI analytics")
        }}
        variant="success"
      />

      {/* Stats Grid */}
      <section className="editorial-container editorial-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat, index) => (
            <EditorialStatTile
              key={index}
              label={stat.title}
              value={stat.value}
              meta={`${stat.change} vs last period`}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {/* Recent Activity Card */}
        <div className="editorial-panel p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New conversation from WhatsApp</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">AI agent resolved 3 tickets</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Channel sync completed</span>
            </div>
          </div>
        </div>

        {/* Performance Trends Card */}
        <div className="editorial-panel p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Response Time</span>
              <span className="text-sm font-semibold text-green-600">↓ 18%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Resolution Rate</span>
              <span className="text-sm font-semibold text-green-600">↑ 5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Customer Satisfaction</span>
              <span className="text-sm font-semibold text-green-600">↑ 0.3</span>
            </div>
          </div>
        </div>

        {/* Team Performance Card */}
        <div className="editorial-panel p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Team Performance</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Agents</span>
              <span className="text-sm font-semibold text-gray-900">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Conversations Handled</span>
              <span className="text-sm font-semibold text-gray-900">1,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Automation Rate</span>
              <span className="text-sm font-semibold text-purple-600">89%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}