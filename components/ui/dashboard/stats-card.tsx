"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  loading?: boolean;
  className?: string;
  valueClassName?: string;
  iconClassName?: string;
  index?: number;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  trendLabel,
  loading = false,
  className,
  valueClassName,
  iconClassName,
  index = 0,
}: StatsCardProps) {
  const showTrend = trend !== undefined;
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;
  const trendValue = trend ? Math.abs(trend) : 0;
  const trendColor = isPositive ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                  : isNegative ? 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                  : 'bg-primary/10 text-primary border-primary/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <Card 
        className={cn(
          "backdrop-blur-[2px] overflow-hidden relative group border border-primary/5",
          "transition-all duration-500",
          className
        )}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            {icon && (
              <div 
                className={cn(
                  "h-12 w-12 rounded-lg flex items-center justify-center",
                  "bg-gradient-to-br from-primary/10 to-primary/5 text-primary",
                  "border border-primary/10 shadow-sm",
                  iconClassName
                )}
              >
                {icon}
              </div>
            )}

            {showTrend && (
              <Badge 
                variant="outline"
                className={cn(
                  "h-7 font-medium flex items-center gap-1 px-2.5",
                  trendColor
                )}
              >
                {isPositive ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
                <span>{trendValue}%</span>
              </Badge>
            )}
          </div>

          <div className="mt-3">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            
            <div className="mt-2 flex items-baseline">
              {loading ? (
                <div className="h-9 w-28 bg-muted/60 animate-pulse rounded"></div>
              ) : (
                <span className={cn("text-3xl font-semibold tracking-tight", valueClassName)}>
                  {value}
                </span>
              )}
            </div>
            
            {description && (
              <p className="mt-1.5 text-xs text-muted-foreground">{description}</p>
            )}
            
            {trendLabel && showTrend && (
              <p className="mt-1.5 text-xs text-muted-foreground">{trendLabel}</p>
            )}
          </div>
        </div>

        {/* Decorative gradient effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.01] to-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Subtle highlight line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </Card>
    </motion.div>
  );
}
