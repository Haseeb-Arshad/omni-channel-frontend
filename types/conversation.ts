export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'customer' | 'agent' | 'system';
  senderId?: string; // ID of the sender (user ID or contact ID)
  channel: string;
  status?: 'sent' | 'delivered' | 'read' | 'failed';
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    size: number;
  }>;
}

export interface Conversation {
  id: string;
  contact: Contact;
  channel: 'email' | 'web' | 'whatsapp' | 'facebook' | 'sms' | string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  status?: 'open' | 'pending' | 'resolved' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string | null;
  tags?: string[];
  history: Message[];
  metadata?: {
    subject?: string;
    labels?: string[];
    customFields?: Record<string, any>;
  };
}

export interface ConversationFilters {
  status?: 'all' | 'open' | 'pending' | 'resolved' | 'closed';
  channel?: 'all' | 'email' | 'web' | 'whatsapp' | 'facebook' | 'sms';
  assignedTo?: 'me' | 'unassigned' | 'all';
  priority?: 'low' | 'medium' | 'high' | 'urgent' | 'all';
  tag?: string;
  searchQuery?: string;
  startDate?: string;
  endDate?: string;
}

export interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversation: Conversation) => void;
  searchQuery: string;
  activeFilter: string;
  isLoading?: boolean;
  onRefresh?: () => void;
  onNewConversation?: () => void;
}

export interface ConversationViewProps {
  conversation: Conversation | null;
  onSendMessage: (message: string) => void;
  onBack?: () => void;
  onAssignToMe?: () => void;
  onMarkAsResolved?: () => void;
  onAddNote?: (note: string) => void;
  onAddTag?: (tag: string) => void;
  onRemoveTag?: (tag: string) => void;
  onUpdateStatus?: (status: string) => void;
  onUpdatePriority?: (priority: string) => void;
  isMobile?: boolean;
}

export interface CustomerDetailsProps {
  conversation: Conversation | null;
  onClose?: () => void;
  onAssignToMe?: () => void;
  onAddNote?: (note: string) => void;
  onAddTag?: (tag: string) => void;
  onRemoveTag?: (tag: string) => void;
  onUpdateStatus?: (status: string) => void;
  onUpdatePriority?: (priority: string) => void;
  isMobile?: boolean;
}

export interface ConversationFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (value: string) => void;
  onNewConversation?: () => void;
  onRefresh?: () => void;
}
