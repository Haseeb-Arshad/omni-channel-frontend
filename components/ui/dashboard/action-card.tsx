"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonIcon?: React.ReactNode;
  href: string;
  gradient?: string;
  index?: number;
  className?: string;
}

export function ActionCard({
  title,
  description,
  icon,
  buttonText,
  buttonIcon,
  href,
  gradient = 'from-primary/5 to-primary/10 border-primary/20',
  index = 0,
  className,
}: ActionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.1 + 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <Card 
        className={cn(
          `bg-gradient-to-br ${gradient} overflow-hidden relative`,
          className
        )}
      >
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full -mt-8 -mr-8 bg-gradient-to-br from-primary/10 to-primary/5"></div>
        
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">{title}</CardTitle>
              <CardDescription className="mt-1.5">
                {description}
              </CardDescription>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          </div>
        </CardHeader>
        
        <CardFooter className="relative z-10">
          <Button 
            className="w-full group transition-all duration-300" 
            variant="default"
            asChild
          >
            <Link href={href} className="flex items-center gap-2 w-full justify-center">
              {buttonIcon && (
                <span className="transition-transform duration-300 group-hover:rotate-12">
                  {buttonIcon}
                </span>
              )}
              {buttonText}
            </Link>
          </Button>
        </CardFooter>
        
        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </Card>
    </motion.div>
  );
}
