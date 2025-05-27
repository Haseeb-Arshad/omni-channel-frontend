import { Conversation, ConversationFilters, Message } from "@/types/conversation";
import { format } from 'date-fns';

export const getChannelIcon = (channel: string): string => {
  switch (channel.toLowerCase()) {
    case 'email':
      return '📧';
    case 'whatsapp':
    case 'chat':
      return '💬';
    case 'sms':
      return '📱';
    case 'web':
      return '🌐';
    case 'facebook':
      return '👍';
    default:
      return '💬';
  }
};

export const getContactInfo = (contact: { name: string; email: string; phone: string }, channel: string) => {
  if (!contact) return '';
  
  switch (channel.toLowerCase()) {
    case 'email':
      return contact.email || '';
    case 'sms':
    case 'whatsapp':
      return contact.phone || '';
    case 'facebook':
      return `@${contact.name.toLowerCase().replace(/\s+/g, '.')}`;
    case 'web':
      return 'Web Visitor';
    default:
      return contact.name;
  }
};

export const filterConversations = (
  conversations: Conversation[],
  filters: ConversationFilters
): Conversation[] => {
  return conversations.filter((conversation) => {
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch = 
        conversation.contact.name.toLowerCase().includes(query) ||
        conversation.contact.email.toLowerCase().includes(query) ||
        conversation.contact.phone.includes(query) ||
        conversation.lastMessage.toLowerCase().includes(query) ||
        conversation.tags?.some(tag => tag.toLowerCase().includes(query));
      
      if (!matchesSearch) return false;
    }

    // Filter by status
    if (filters.status && filters.status !== 'all' && conversation.status !== filters.status) {
      return false;
    }

    // Filter by channel
    if (filters.channel && filters.channel !== 'all' && conversation.channel !== filters.channel) {
      return false;
    }

    // Filter by assignment
    if (filters.assignedTo === 'me' && !conversation.assignedTo) {
      return false;
    }
    if (filters.assignedTo === 'unassigned' && conversation.assignedTo) {
      return false;
    }

    // Filter by priority
    if (filters.priority && filters.priority !== 'all' && conversation.priority !== filters.priority) {
      return false;
    }

    // Filter by tag
    if (filters.tag && !conversation.tags?.includes(filters.tag)) {
      return false;
    }

    // Filter by date range
    if (filters.startDate || filters.endDate) {
      const messageDate = new Date(conversation.timestamp);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      if (startDate && messageDate < startDate) return false;
      if (endDate) {
         // Set to end of day
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        if (messageDate > endOfDay) return false;
      }
    }

    return true;
  });
};

export const sortConversations = (
  conversations: Conversation[],
  sortBy: 'newest' | 'oldest' | 'priority' | 'unread' = 'newest'
): Conversation[] => {
  return [...conversations].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case 'oldest':
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      case 'priority': {
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
        const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
        
        if (bPriority !== aPriority) {
          return bPriority - aPriority;
        }
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      case 'unread':
        if (a.unread === b.unread) {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }
        return a.unread ? -1 : 1;
      default:
        return 0;
    }
  });
};

export const getInitials = (name: string): string => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const getStatusColor = (status: string): string => {
  if (!status) return 'bg-gray-100 text-gray-800';
  
  switch (status.toLowerCase()) {
    case 'open':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'closed':
      return 'bg-gray-100 text-gray-800';
    case 'resolved':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getPriorityColor = (priority: string): string => {
  if (!priority) return 'bg-gray-100 text-gray-800';
  
  switch (priority.toLowerCase()) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const formatMessagePreview = (message: string, maxLength: number = 60): string => {
  if (!message) return '';
  if (message.length <= maxLength) return message;
  return `${message.substring(0, maxLength)}...`;
};

export const isCurrentUser = (message: Message, currentUserId: string): boolean => {
  return message.sender === 'agent' || (message.senderId ? message.senderId === currentUserId : false);
};

export const getSenderName = (
  message: Message, 
  conversation: Conversation, 
  currentUserId: string
): string => {
  if (isCurrentUser(message, currentUserId)) {
    return 'You';
  }
  return conversation.contact.name.split(' ')[0]; // First name only
};

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;
  
  if (diffInSeconds < minute) return 'Just now';
  if (diffInSeconds < hour) {
    const minutes = Math.floor(diffInSeconds / minute);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  if (diffInSeconds < day) {
    const hours = Math.floor(diffInSeconds / hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  if (diffInSeconds < week) {
    const days = Math.floor(diffInSeconds / day);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
  if (diffInSeconds < month) {
    const weeks = Math.floor(diffInSeconds / week);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  if (diffInSeconds < year) {
    return format(date, 'MMM d'); // e.g., "Jan 15"
  }
  
  return format(date, 'MMM d, yyyy'); // e.g., "Jan 15, 2023"
};

export const getConversationAvatar = (conversation: Conversation) => {
  if (conversation.contact?.avatar) {
    return conversation.contact.avatar;
  }
  
  // Return a placeholder with initials if no avatar
  return null;
};

export const getConversationName = (conversation: Conversation): string => {
  if (conversation.contact?.name) {
    return conversation.contact.name;
  }
  
  // Fallback to contact info based on channel
  if (conversation.contact?.email) {
    return conversation.contact.email;
  }
  
  if (conversation.contact?.phone) {
    return conversation.contact.phone;
  }
  
  return 'Unknown Contact';
};

export const formatTimestamp = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  
  // Check if it's today
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Check if it's yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  
  // Check if it's within the last 7 days
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  if (date > oneWeekAgo) {
    return date.toLocaleDateString([], { weekday: 'short' });
  }
  
  // Otherwise, return the date
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};
