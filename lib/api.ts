import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'sonner';

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface GoogleAuthRequest {
  token: string;
  remember?: boolean;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface UpdateProfileRequest {
  username?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  profileImage?: string;
}

export interface User {
  id: number;
  email: string;
  username?: string;
  profile_image?: string;
}

// Persona types
export interface Persona {
  id: string;
  user_id: number;
  name: string;
  description: string;
  system_prompt: string;
  tone: string;
  model: string;
  temperature?: number;
  response_style?: string;
  knowledge_depth?: string;
  interaction_style?: string;
  avatar?: string;
  primary_color?: string;
  accent_color?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePersonaRequest {
  name: string;
  description: string;
  system_prompt: string;
  tone: string;
  model: string;
  temperature?: number;
  response_style?: string;
  knowledge_depth?: string;
  interaction_style?: string;
  avatar?: string;
  primary_color?: string;
  accent_color?: string;
  is_active?: boolean;
}

export interface UpdatePersonaRequest {
  name?: string;
  description?: string;
  system_prompt?: string;
  tone?: string;
  model?: string;
  temperature?: number;
  response_style?: string;
  knowledge_depth?: string;
  interaction_style?: string;
  avatar?: string;
  primary_color?: string;
  accent_color?: string;
  is_active?: boolean;
}

// Knowledge Base types
export interface KnowledgeBase {
  id: string;
  user_id: number;
  name: string;
  description?: string;
  is_global: boolean;
  created_at: string;
  updated_at: string;
  documents?: Document[];
  documentCount?: number;
}

export interface PlaygroundKnowledgeBase {
  id: string;
  name: string;
  documentCount: number;
}

export interface OpenAIModel {
  id: string;
  created?: number;
  owned_by?: string;
}

export interface CreateKnowledgeBaseRequest {
  name: string;
  description?: string;
  is_global?: boolean;
}

export interface UpdateKnowledgeBaseRequest {
  name?: string;
  description?: string;
  is_global?: boolean;
}

// Channel types
export interface ChannelCredentials {
  accountSid?: string;
  authToken?: string;
  phoneNumber?: string;
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  fromEmail?: string;
  pageId?: string;
  accessToken?: string;
}

export interface Channel {
  id: string;
  user_id: number;
  name: string;
  type: 'sms' | 'whatsapp' | 'email' | 'web' | 'facebook';
  credentials: ChannelCredentials;
  description?: string;
  is_active: boolean;
  persona_id?: string;
  knowledge_base_id?: string;
  created_at: string;
  updated_at: string;
  persona?: Persona;
  knowledgeBase?: KnowledgeBase;
}

export interface CreateChannelRequest {
  name: string;
  type: 'sms' | 'whatsapp' | 'email' | 'web' | 'facebook';
  credentials: ChannelCredentials;
  description?: string;
  isActive?: boolean;
}

export interface UpdateChannelRequest {
  name?: string;
  credentials?: ChannelCredentials;
  description?: string;
  isActive?: boolean;
}

export interface VerifyChannelRequest {
  type: 'sms' | 'whatsapp' | 'email' | 'web' | 'facebook';
  credentials: ChannelCredentials;
}

// Knowledge base types
export interface Document {
  id: string;
  user_id: number;
  filename: string;
  original_filename: string;
  file_path: string;
  mime_type: string;
  file_size: number;
  ipfs_hash?: string;
  processing_status: 'pending' | 'processing' | 'processed' | 'completed' | 'failed';
  status_message?: string;
  chunk_count?: number;
  description?: string;
  content_summary?: string;
  tags?: string[];
  metadata?: any;
  uploaded_at: string;
  processed_at?: string;
}

export interface Article {
  id: string;
  user_id: number;
  title: string;
  content: string;
  tags?: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateArticleRequest {
  title: string;
  content: string;
  tags?: string[];
  published?: boolean;
}

export interface UpdateArticleRequest {
  title?: string;
  content?: string;
  tags?: string[];
  published?: boolean;
}

// Conversation types
export interface Conversation {
  id: string;
  user_id: number;
  channel_id?: string;
  channel_type?: string;
  channel_name?: string;
  title: string;
  contact_info?: any;
  last_message?: string;
  last_message_at?: string;
  status: 'active' | 'archived' | 'closed';
  is_unread: boolean;
  tags?: string[];
  message_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  conversation_id: string;
  user_id?: number;
  username?: string;
  content: string;
  role: 'user' | 'assistant';
  attachments?: any[];
  metadata?: any;
  created_at: string;
}

export interface CreateConversationRequest {
  title?: string;
  channelId?: string;
  contactInfo?: any;
  initialMessage?: string;
}

export interface UpdateConversationRequest {
  title?: string;
  status?: 'active' | 'archived' | 'closed';
  tags?: string[];
  isUnread?: boolean;
}

export interface SendMessageRequest {
  content?: string;
  attachments?: any[];
}

export interface AnalyticsOverview {
  conversations: {
    total: number;
    active: number;
    activePercentage: number;
    unread: number;
    new24h: number;
  };
  messages: {
    total: number;
    user: number;
    assistant: number;
    new24h: number;
  };
  performance: {
    avgResponseTime: string;
    avgResponseTimeSeconds: number;
  };
}

export interface ChannelAnalytics {
  channel_type: string;
  channel_name: string;
  conversation_count: number;
  message_count: number;
  active_count: number;
  unread_count: number;
}

export interface ConversationAnalytics {
  time_period: string;
  new_conversations: number;
  new_messages: number;
  user_messages: number;
  assistant_messages: number;
}

interface ErrorResponseWithMessage {
  message: string;
  [key: string]: any; // Allow other properties
}

function hasMessage(data: any): data is ErrorResponseWithMessage {
  return data && typeof data === 'object' && typeof data.message === 'string';
}

// Playground specific types
export interface PlaygroundChatRequest {
  query: string;
  personaId: string;
  sessionId: string;
  temperature?: number;
  maxTokens?: number;
  contextWindow?: number;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  knowledgeBaseId?: string | null;
}

export interface PlaygroundChatResponse {
  id: string; // session or message id
  choices: Array<{
    index?: number;
    message: {
      role: 'assistant';
      content: string;
    };
    finish_reason?: string;
  }>;
  content?: string; // Fallback if choices is not the primary way to get content
  sources?: Array<{ id: string; name: string; type: string; content?: string; score?: number }>; // If knowledge base is used
}

// API Client class
class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    // Create axios instance
    const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL 
      || process.env.NEXT_PUBLIC_API_URL 
      || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000')) as string;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to attach token
    this.client.interceptors.request.use(
      (config) => {
        // Check if token exists in localStorage during client-side execution
        if (typeof window !== 'undefined') {
          const storedToken = localStorage.getItem('token');
          if (storedToken) {
            this.token = storedToken;
          }
        }

        // Attach token to request if available
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const status = error.response?.status;
        const url = (error.config?.url || '').toString();

        // Allowlist: do NOT redirect on 401 for public playground endpoints
        const noAuthRedirect = (
          url.includes('/api/playground/chat') ||
          url.includes('/api/knowledge-bases') ||
          url.includes('/api/models')
        );

        if (status === 401 && !noAuthRedirect) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            this.token = null;
            window.location.href = '/auth/login?session=expired';
          }
        }

        // Show error notifications for non-auth errors
        if (status !== 401 && typeof window !== 'undefined') {
          let apiMessage: string | undefined;
          const responseData: unknown = error.response?.data;
          if (hasMessage(responseData)) apiMessage = responseData.message;
          const errorMessage = apiMessage || (error as any).message || 'Something went wrong';
          toast.error(errorMessage);
        }

        return Promise.reject(error);
      }
    );
  }

  // Set token manually (e.g., after login)
  setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  // Clear token (e.g., for logout)
  clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  // Generic request method
  private async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client(config);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiResponse<T>;
      }
      throw error;
    }
  }

  // ===== AUTH ENDPOINTS =====

  // Login with email and password
  async login(data: LoginRequest): Promise<ApiResponse<{ token: string; user: User }>> {
    const apiUrl = this.client.defaults.baseURL;
    const loginPath = '/api/auth/login';
    console.log(`[ApiClient] Attempting POST to ${apiUrl}${loginPath} with data:`, JSON.stringify(data));
    try {
      const response: AxiosResponse<{ token: string; user: User }> = await this.client.post(loginPath, data);
      console.log(`[ApiClient] Raw response from POST ${loginPath}:`, response);

      if (response.data && response.data.token && response.data.user) {
        this.setToken(response.data.token);
        console.log('[ApiClient] Token set. Login successful.');
        return { success: true, data: response.data };
      } else {
        console.error('[ApiClient] Login response data malformed:', response.data);
        return { success: false, message: 'Login response from server was malformed.' };
      }
    } catch (error: any) {
      console.error('[ApiClient] Error during POST /auth/login:', axios.isAxiosError(error) ? error.response?.data : error.message, 'Full error object:', error);
      let apiMessage: string | undefined;
      const responseData: unknown = error.response?.data;
      if (hasMessage(responseData)) {
        apiMessage = responseData.message;
      }
      const errorMessage = apiMessage || error.message || 'Login request failed. Check console for details.';
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  }

  // Register new user
  async register(data: RegisterRequest): Promise<ApiResponse<{ token: string; user: User }>> {
    const apiUrl = this.client.defaults.baseURL;
    const registerPath = '/api/auth/register';
    console.log(`[ApiClient] Attempting POST to ${apiUrl}${registerPath} with data:`, JSON.stringify(data));
    try {
      const response: AxiosResponse<{ token: string; user: User }> = await this.client.post(registerPath, data);
      console.log(`[ApiClient] Raw response from POST ${registerPath}:`, response);
      if (response.data && response.data.token && response.data.user) {
        this.setToken(response.data.token);
        console.log('[ApiClient] Token set. Registration successful.');
        return { success: true, data: response.data };
      } else {
        console.error('[ApiClient] Register response data malformed:', response.data);
        return { success: false, message: 'Registration response from server was malformed.' };
      }
    } catch (error: any) {
      console.error('[ApiClient] Error during POST /auth/register:', axios.isAxiosError(error) ? error.response?.data : error.message, 'Full error object:', error);
      let apiMessage: string | undefined;
      const responseData: unknown = error.response?.data;
      if (hasMessage(responseData)) {
        apiMessage = responseData.message;
      }
      const errorMessage = apiMessage || error.message || 'Registration request failed. Check console for details.';
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  }

  // Login with Google
  async googleAuth(data: GoogleAuthRequest): Promise<ApiResponse<{ token: string; user: User }>> {
    const apiUrl = this.client.defaults.baseURL;
    const googleAuthPath = '/api/auth/google';
    console.log(`[ApiClient] Attempting POST to ${apiUrl}${googleAuthPath} with data:`, data);
    try {
      const response: AxiosResponse<{ token: string; user: User }> = await this.client.post(googleAuthPath, data);
      console.log(`[ApiClient] Raw response from POST ${googleAuthPath}:`, response);
      if (response.data && response.data.token && response.data.user) {
        this.setToken(response.data.token);
        console.log('[ApiClient] Token set. Google Auth successful.');
        return { success: true, data: response.data };
      } else {
        console.error('[ApiClient] Google Auth response data malformed:', response.data);
        return { success: false, message: 'Google Auth response from server was malformed.' };
      }
    } catch (error: any) {
      console.error('[ApiClient] Error during POST /auth/google:', axios.isAxiosError(error) ? error.response?.data : error.message, 'Full error object:', error);
      let apiMessage: string | undefined;
      const responseData: unknown = error.response?.data;
      if (hasMessage(responseData)) {
        apiMessage = responseData.message;
      }
      const errorMessage = apiMessage || error.message || 'Google Auth request failed. Check console for details.';
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  }

  // Forgot password
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
    return this.request({
      method: 'POST',
      url: '/api/auth/forgot-password',
      data,
    });
  }

  // Reset password
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
    return this.request({
      method: 'POST',
      url: '/api/auth/reset-password',
      data,
    });
  }

  // Verify email
  async verifyEmail(token: string): Promise<ApiResponse> {
    return this.request({
      method: 'POST',
      url: '/api/auth/verify-email',
      data: { token },
    });
  }

  // Get user profile
  async getProfile(): Promise<ApiResponse<User>> {
    console.log('[ApiClient] Fetching user profile');
    try {
      const response = await this.client.get('/api/auth/profile');
      console.log('[ApiClient] Profile response:', response.data);
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error: any) {
      console.error('[ApiClient] Error fetching profile:', error.response?.data || error.message);
      let apiMessage: string | undefined;
      const responseData: unknown = error.response?.data;
      if (hasMessage(responseData)) {
        apiMessage = responseData.message;
      }
      const errorMessage = apiMessage || error.message || 'Failed to fetch profile';
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  }

  // Update user profile
  async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<User>> {
    return this.request<User>({
      method: 'PUT',
      url: '/api/auth/profile',
      data,
    });
  }

  // Logout
  logout(): void {
    this.clearToken();
  }

  // ===== CHANNEL ENDPOINTS =====

  // List channels
  async listChannels(): Promise<ApiResponse<Channel[]>> {
    return this.request<Channel[]>({
      method: 'GET',
      url: '/api/channels',
    });
  }

  // Get channel by ID
  async getChannel(id: string): Promise<ApiResponse<Channel>> {
    return this.request<Channel>({
      method: 'GET',
      url: `/api/channels/${id}`,
    });
  }

  // Create channel
  async createChannel(data: CreateChannelRequest): Promise<ApiResponse<Channel>> {
    return this.request<Channel>({
      method: 'POST',
      url: '/api/channels',
      data,
    });
  }

  // Update channel
  async updateChannel(id: string, data: UpdateChannelRequest): Promise<ApiResponse<Channel>> {
    return this.request<Channel>({
      method: 'PUT',
      url: `/api/channels/${id}`,
      data,
    });
  }

  // Delete channel
  async deleteChannel(id: string): Promise<ApiResponse> {
    return this.request({
      method: 'DELETE',
      url: `/api/channels/${id}`,
    });
  }

  // Verify channel credentials
  async verifyChannelCredentials(data: VerifyChannelRequest): Promise<ApiResponse> {
    console.log('API Client - verifyChannelCredentials called with:', JSON.stringify(data));
    // Ensure phoneNumber is present for whatsapp and sms channels
    if ((data.type === 'whatsapp' || data.type === 'sms') && 
        (!data.credentials.phoneNumber || data.credentials.phoneNumber.trim() === '')) {
      console.error('Phone number is missing or empty for ' + data.type + ' channel verification');
    }
    
    return this.request<ApiResponse>({
      method: 'POST',
      url: '/api/channels/verify', // Fixed URL to match backend route
      data,
    });
  }

  // ===== KNOWLEDGE BASE ENDPOINTS =====

  // List documents
  async listDocuments(): Promise<ApiResponse<Document[]>> {
    return this.request<Document[]>({
      method: 'GET',
      url: '/api/knowledge/documents',
    });
  }

  // Get document by ID
  async getDocument(id: string): Promise<ApiResponse<Document>> {
    return this.request<Document>({
      method: 'GET',
      url: `/api/knowledge/documents/${id}`,
    });
  }
  
  // Get document chunks by document ID
  async getDocumentChunks(documentId: string, limit: number = 100): Promise<ApiResponse<any[]>> {
    return this.request<any[]>({
      method: 'GET',
      url: `/api/knowledge/documents/${documentId}/chunks`,
      params: { limit }
    });
  }
  
  // Download document file
  async downloadDocument(id: string): Promise<Blob> {
    try {
      const response = await this.client({
        method: 'GET',
        url: `/api/knowledge/documents/${id}/download`,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error downloading document:', error);
      throw error;
    }
  }

  /**
   * Upload document to knowledge base with enhanced RAG options
   * @param file File to upload
   * @param options Advanced processing options
   * @returns Promise with the uploaded document
   */
  uploadDocument(
    file: File, 
    options: {
      description?: string;
      tags?: string[];
      useLargeModel?: boolean;
      chunkSize?: number;
      chunkOverlap?: number;
    } = {}
  ): Promise<ApiResponse<Document>> {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add options to form data
    if (options.description) {
      formData.append('description', options.description);
    }

    if (options.tags && options.tags.length > 0) {
      formData.append('tags', JSON.stringify(options.tags));
    }

    if (options.useLargeModel !== undefined) {
      formData.append('useLargeModel', options.useLargeModel.toString());
    }

    if (options.chunkSize) {
      formData.append('chunkSize', options.chunkSize.toString());
    }

    if (options.chunkOverlap) {
      formData.append('chunkOverlap', options.chunkOverlap.toString());
    }
    
    return this.request({
      method: 'POST',
      url: '/api/knowledge/documents',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Delete document
  async deleteDocument(id: string): Promise<ApiResponse> {
    return this.request({
      method: 'DELETE',
      url: `/api/knowledge/documents/${id}`,
    });
  }
  
  /**
   * Update document description
   * @param id Document ID
   * @param description New description
   * @returns Promise with updated document
   */
  async updateDocumentDescription(id: string, description: string): Promise<ApiResponse<Document>> {
    return this.request({
      method: 'PATCH',
      url: `/api/knowledge/documents/${id}/description`,
      data: { description },
    });
  }

  /**
   * Add tags to a document
   * @param id Document ID
   * @param tags Tags to add
   * @returns Promise with updated document
   */
  async addDocumentTags(id: string, tags: string[]): Promise<ApiResponse<Document>> {
    return this.request({
      method: 'POST',
      url: `/api/knowledge/documents/${id}/tags`,
      data: { tags },
    });
  }

  /**
   * Remove tags from a document
   * @param id Document ID
   * @param tags Tags to remove
   * @returns Promise with updated document
   */
  async removeDocumentTags(id: string, tags: string[]): Promise<ApiResponse<Document>> {
    return this.request({
      method: 'DELETE',
      url: `/api/knowledge/documents/${id}/tags`,
      data: { tags },
    });
  }

  /**
   * Get processing status of a document
   * @param id Document ID
   * @returns Promise with document status
   */
  async getDocumentStatus(id: string): Promise<ApiResponse<Document>> {
    return this.request({
      method: 'GET',
      url: `/api/knowledge/documents/${id}/status`,
    });
  }

  /**
   * Force reprocessing of a document
   * @param id Document ID
   * @param options Processing options
   * @returns Promise with reprocessing result
   */
  async reprocessDocument(
    id: string, 
    options: {
      useLargeModel?: boolean;
      chunkSize?: number;
      chunkOverlap?: number;
    } = {}
  ): Promise<ApiResponse<Document>> {
    return this.request({
      method: 'POST',
      url: `/api/knowledge/documents/${id}/reprocess`,
      data: options,
    });
  }

  // List articles
  async listArticles(): Promise<ApiResponse<Article[]>> {
    return this.request<Article[]>({
      method: 'GET',
      url: '/api/knowledge/articles',
    });
  }

  // Get article by ID
  async getArticle(id: string): Promise<ApiResponse<Article>> {
    return this.request<Article>({
      method: 'GET',
      url: `/api/knowledge/articles/${id}`,
    });
  }

  // Create article
  async createArticle(data: CreateArticleRequest): Promise<ApiResponse<Article>> {
    return this.request<Article>({
      method: 'POST',
      url: '/api/knowledge/articles',
      data,
    });
  }

  // Update article
  async updateArticle(id: string, data: UpdateArticleRequest): Promise<ApiResponse<Article>> {
    return this.request<Article>({
      method: 'PUT',
      url: `/api/knowledge/articles/${id}`,
      data,
    });
  }

  // Delete article
  async deleteArticle(id: string): Promise<ApiResponse> {
    return this.request({
      method: 'DELETE',
      url: `/api/knowledge/articles/${id}`,
    });
  }

  // ===== CONVERSATION ENDPOINTS =====

  // List conversations
  async listConversations(params?: {
    limit?: number;
    offset?: number;
    status?: string;
    channel?: string;
    search?: string;
  }): Promise<ApiResponse<Conversation[]>> {
    return this.request<Conversation[]>({
      method: 'GET',
      url: '/api/conversations',
      params,
    });
  }

  // Get conversation by ID
  async getConversation(id: string): Promise<ApiResponse<Conversation>> {
    return this.request<Conversation>({
      method: 'GET',
      url: `/api/conversations/${id}`,
    });
  }

  // Get messages for a conversation
  async getMessages(conversationId: string, params?: {
    limit?: number;
    before?: string;
  }): Promise<ApiResponse<Message[]>> {
    return this.request<Message[]>({
      method: 'GET',
      url: `/api/conversations/${conversationId}/messages`,
      params,
    });
  }

  // Send message in a conversation
  async sendMessage(conversationId: string, data: SendMessageRequest): Promise<ApiResponse<Message>> {
    return this.request<Message>({
      method: 'POST',
      url: `/api/conversations/${conversationId}/messages`,
      data,
    });
  }

  // Create conversation
  async createConversation(data: CreateConversationRequest): Promise<ApiResponse<Conversation>> {
    return this.request<Conversation>({
      method: 'POST',
      url: '/api/conversations',
      data,
    });
  }

  // Update conversation
  async updateConversation(id: string, data: UpdateConversationRequest): Promise<ApiResponse<Conversation>> {
    return this.request<Conversation>({
      method: 'PUT',
      url: `/api/conversations/${id}`,
      data,
    });
  }

  // Delete conversation
  async deleteConversation(id: string): Promise<ApiResponse> {
    return this.request({
      method: 'DELETE',
      url: `/api/conversations/${id}`,
    });
  }

  // ===== ANALYTICS ENDPOINTS =====

  // Get analytics overview
  async getAnalyticsOverview(period: string = '7d'): Promise<ApiResponse<AnalyticsOverview>> {
    return this.request<AnalyticsOverview>({
      method: 'GET',
      url: '/api/analytics/overview',
      params: { period },
    });
  }

  // Get channel analytics
  async getChannelAnalytics(period: string = '7d'): Promise<ApiResponse<ChannelAnalytics[]>> {
    return this.request<ChannelAnalytics[]>({
      method: 'GET',
      url: '/api/analytics/channels',
      params: { period },
    });
  }

  // Get conversation analytics
  async getConversationAnalytics(period: string = '7d', groupBy: string = 'day'): Promise<ApiResponse<ConversationAnalytics[]>> {
    return this.request<ConversationAnalytics[]>({
      method: 'GET',
      url: '/api/analytics/conversations',
      params: { period, groupBy },
    });
  }

  // List knowledge bases for playground
  async listKnowledgeBasesForPlayground(): Promise<ApiResponse<PlaygroundKnowledgeBase[]>> {
    return this.request<PlaygroundKnowledgeBase[]>({ method: 'GET', url: '/api/knowledge-bases/playground' });
  }

  // Playground chat endpoint
  async playgroundChat(data: PlaygroundChatRequest): Promise<ApiResponse<PlaygroundChatResponse>> {
    return this.request<PlaygroundChatResponse>({ method: 'POST', url: '/api/playground/chat', data });
  }

  // List personas
  async listPersonas(): Promise<ApiResponse<Persona[]>> {
    return this.request<Persona[]>({ method: 'GET', url: '/api/personas' });
  }

  // Get active persona
  async getActivePersona(): Promise<ApiResponse<Persona>> {
    return this.request<Persona>({ method: 'GET', url: '/api/personas/active' });
  }

  // List available models (filterable via ?only= prefix)
  async listModels(only?: string): Promise<ApiResponse<{ models: OpenAIModel[] }>> {
    const url = only ? `/api/models?only=${encodeURIComponent(only)}` : '/api/models';
    return this.request<{ models: OpenAIModel[] }>({ method: 'GET', url });
  }

  // Method to get user's active subscription
  async getActiveSubscription(): Promise<ApiResponse<any>> { // Replace 'any' with actual Subscription type
    return this.request({
      method: 'GET',
      url: '/api/subscriptions/active',
    });
  }
}

// Create and export singleton instance
const api = new ApiClient();
export default api;
