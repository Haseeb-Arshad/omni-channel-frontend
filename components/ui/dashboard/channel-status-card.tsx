"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChannelStatusCardProps {
  id: string;
  name: string;
  status: 'healthy' | 'issues' | 'offline';
  icon: React.ReactNode;
  index?: number;
  className?: string;
  onClick?: () => void;
}

export function ChannelStatusCard({
  id,
  name,
  status,
  icon,
  index = 0,
  className,
  onClick,
}: ChannelStatusCardProps) {
  const getStatusInfo = () => {
    switch (status) {
      case 'healthy':
        return {
          label: 'Healthy',
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
          color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20'
        };
      case 'issues':
        return {
          label: 'Issues',
          icon: <AlertTriangle className="h-3.5 w-3.5" />,
          color: 'bg-amber-500/10 text-amber-600 border-amber-200 hover:bg-amber-500/20'
        };
      case 'offline':
        return {
          label: 'Offline',
          icon: <AlertTriangle className="h-3.5 w-3.5" />,
          color: 'bg-rose-500/10 text-rose-600 border-rose-200 hover:bg-rose-500/20'
        };
      default:
        return {
          label: 'Unknown',
          icon: <AlertTriangle className="h-3.5 w-3.5" />,
          color: 'bg-gray-500/10 text-gray-600 border-gray-200 hover:bg-gray-500/20'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={cn(
        "flex items-center justify-between p-3 rounded-lg border", 
        "bg-card/80 hover:bg-primary/[0.01] transition-all duration-200",
        "border-border/30 hover:border-primary/20",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/5 flex items-center justify-center shadow-sm text-primary/80">
          {icon}
        </div>
        <span className="font-medium">{name}</span>
      </div>
      
      <Badge 
        variant="outline" 
        className={cn(
          "flex items-center gap-1 px-2.5 py-1",
          statusInfo.color
        )}
      >
        {statusInfo.icon}
        <span>{statusInfo.label}</span>
      </Badge>
    </motion.div>
  );
}
