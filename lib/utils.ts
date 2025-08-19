import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ComponentType } from "react"
import { Mail, Globe, Phone, MessageSquare, Facebook, Headphones } from "lucide-react"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${path}`
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

// Returns an icon Component for a given channel. Consumers should render it as <Icon className="..." />
export function getChannelIcon(channel: string): ComponentType<{ className?: string }> {
  switch ((channel || '').toLowerCase()) {
    case 'email':
      return Mail
    case 'web':
      return Globe
    case 'whatsapp':
      return MessageSquare
    case 'facebook':
      return Facebook
    case 'sms':
      return Phone
    case 'voice':
      return Headphones
    default:
      return MessageSquare
  }
}

export const DUMMY_EXPORT = 'dummy';
