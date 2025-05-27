/**
 * Mock API Service for Frontend Testing
 * 
 * This service provides mock responses that match the backend API format,
 * allowing for frontend testing without a running backend.
 */

import { 
  ApiResponse, 
  User, 
  Channel,
  Document,
  Article,
  Conversation,
  Message,
  AnalyticsOverview
} from './api';

// Mock data
const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  username: 'Test User',
  profile_image: 'https://ui-avatars.com/api/?name=Test+User'
};

const mockChannels: Channel[] = [
  {
    id: 'ch_1',
    user_id: 1,
    name: 'Website Chat',
    type: 'web',
    credentials: {},
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ch_2',
    user_id: 1,
    name: 'Twilio SMS',
    type: 'sms',
    credentials: {
      accountSid: 'AC123',
      authToken: 'secret',
      phoneNumber: '+1234567890'
    },
    description: 'SMS channel via Twilio',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockDocuments: Document[] = [
  {
    id: 'doc_1',
    user_id: 1,
    filename: 'test-document.pdf',
    original_filename: 'product-guide.pdf',
    file_path: '/uploads/test-document.pdf',
    mime_type: 'application/pdf',
    file_size: 2048576,
    processing_status: 'completed',
    chunk_count: 15,
    uploaded_at: new Date().toISOString(),
    processed_at: new Date().toISOString()
  }
];

const mockArticles: Article[] = [
  {
    id: 'art_1',
    user_id: 1,
    title: 'Getting Started Guide',
    content: 'This is a comprehensive guide to getting started with our platform...',
    tags: ['guide', 'onboarding'],
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockConversations: Conversation[] = [
  {
    id: 'conv_1',
    user_id: 1,
    channel_id: 'ch_1',
    channel_type: 'web',
    channel_name: 'Website Chat',
    title: 'Website Support Request',
    last_message: 'How do I reset my password?',
    last_message_at: new Date().toISOString(),
    status: 'active',
    is_unread: true,
    message_count: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    conversation_id: 'conv_1',
    user_id: 1,
    username: 'Test User',
    content: 'Hello, I need help with my account.',
    role: 'user',
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 2,
    conversation_id: 'conv_1',
    content: 'Hi there! I\'m happy to help with your account. What specific issue are you experiencing?',
    role: 'assistant',
    created_at: new Date(Date.now() - 3500000).toISOString()
  },
  {
    id: 3,
    conversation_id: 'conv_1',
    user_id: 1,
    username: 'Test User',
    content: 'How do I reset my password?',
    role: 'user',
    created_at: new Date(Date.now() - 3400000).toISOString()
  }
];

const mockAnalytics: AnalyticsOverview = {
  conversations: {
    total: 15,
    active: 8,
    activePercentage: 53,
    unread: 3,
    new24h: 5
  },
  messages: {
    total: 120,
    user: 60,
    assistant: 60,
    new24h: 25
  },
  performance: {
    avgResponseTime: '45 seconds',
    avgResponseTimeSeconds: 45
  }
};

// Mock API functions
export const mockApi = {
  // Auth endpoints
  login: async (): Promise<ApiResponse<{ token: string; user: User }>> => {
    return {
      success: true,
      data: {
        token: 'mock-jwt-token',
        user: mockUser
      }
    };
  },
  
  register: async (): Promise<ApiResponse<{ token: string; user: User }>> => {
    return {
      success: true,
      data: {
        token: 'mock-jwt-token',
        user: mockUser
      }
    };
  },
  
  getProfile: async (): Promise<ApiResponse<User>> => {
    return {
      success: true,
      data: mockUser
    };
  },
  
  // Channel endpoints
  listChannels: async (): Promise<ApiResponse<Channel[]>> => {
    return {
      success: true,
      data: mockChannels
    };
  },
  
  getChannel: async (id: string): Promise<ApiResponse<Channel>> => {
    const channel = mockChannels.find(c => c.id === id);
    return {
      success: !!channel,
      data: channel,
      message: channel ? undefined : 'Channel not found'
    };
  },
  
  createChannel: async (): Promise<ApiResponse<Channel>> => {
    return {
      success: true,
      data: mockChannels[0]
    };
  },
  
  // Knowledge base endpoints
  listDocuments: async (): Promise<ApiResponse<Document[]>> => {
    return {
      success: true,
      data: mockDocuments
    };
  },
  
  getDocument: async (id: string): Promise<ApiResponse<Document>> => {
    const document = mockDocuments.find(d => d.id === id);
    return {
      success: !!document,
      data: document,
      message: document ? undefined : 'Document not found'
    };
  },
  
  listArticles: async (): Promise<ApiResponse<Article[]>> => {
    return {
      success: true,
      data: mockArticles
    };
  },
  
  // Conversation endpoints
  listConversations: async (): Promise<ApiResponse<Conversation[]>> => {
    return {
      success: true,
      data: mockConversations
    };
  },
  
  getConversation: async (id: string): Promise<ApiResponse<Conversation>> => {
    const conversation = mockConversations.find(c => c.id === id);
    return {
      success: !!conversation,
      data: conversation,
      message: conversation ? undefined : 'Conversation not found'
    };
  },
  
  getMessages: async (): Promise<ApiResponse<Message[]>> => {
    return {
      success: true,
      data: mockMessages
    };
  },
  
  sendMessage: async (): Promise<ApiResponse<Message>> => {
    const newMessage: Message = {
      id: 4,
      conversation_id: 'conv_1',
      content: 'To reset your password, please go to the login page and click on "Forgot Password". You\'ll receive an email with instructions.',
      role: 'assistant',
      created_at: new Date().toISOString()
    };
    
    return {
      success: true,
      data: newMessage
    };
  },
  
  // Analytics endpoints
  getAnalyticsOverview: async (): Promise<ApiResponse<AnalyticsOverview>> => {
    return {
      success: true,
      data: mockAnalytics
    };
  }
};

export default mockApi;
