"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRight, MoreHorizontal } from 'lucide-react';

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
  moreActions?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function DashboardSection({
  title,
  description,
  children,
  action,
  moreActions,
  className,
  delay = 0,
}: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={cn("space-y-4", className)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {moreActions}
          
          {action && (
            <Button variant="outline" size="sm" className="h-8 gap-1" asChild>
              <Link href={action.href}>
                <span>{action.label}</span>
                {action.icon || <ArrowUpRight className="h-3.5 w-3.5" />}
              </Link>
            </Button>
          )}
        </div>
      </div>
      
      <div>{children}</div>
    </motion.section>
  );
}
