"use client"

import React from 'react'
import { StatsCard } from '@/components/ui/dashboard'
import { FileText, MessageSquare, Brain, Sparkles } from 'lucide-react'

export interface PlaygroundStatsProps {
  messageCount: number
  knowledgeBaseCount: number
  responseTime: number
  temperature: number
}

export function PlaygroundStats({
  messageCount = 0,
  knowledgeBaseCount = 0,
  responseTime = 0,
  temperature = 0.7
}: PlaygroundStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Messages"
        value={messageCount}
        description="Total conversation messages"
        icon={<MessageSquare className="h-5 w-5" />}
        index={0}
      />
      
      <StatsCard
        title="Knowledge Bases"
        value={knowledgeBaseCount}
        description="Available knowledge bases"
        icon={<Brain className="h-5 w-5" />}
        index={1}
      />
      
      <StatsCard
        title="Response Time"
        value={`${responseTime.toFixed(1)}s`}
        description="Average response time"
        icon={<FileText className="h-5 w-5" />}
        trend={-5}
        trendLabel="5% faster than previous"
        index={2}
      />
      
      <StatsCard
        title="Temperature"
        value={temperature.toFixed(1)}
        description="Current creativity setting"
        icon={<Sparkles className="h-5 w-5" />}
        index={3}
      />
    </div>
  )
}
