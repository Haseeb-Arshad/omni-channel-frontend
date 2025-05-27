/**
 * API Integration Test Utility
 * 
 * This utility helps test the connection between the frontend and backend API.
 * It can be used to verify that all endpoints are working correctly in the development
 * or production environment.
 */

import api from './api';

interface TestResult {
  name: string;
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

class ApiTester {
  private results: TestResult[] = [];
  private testUser = {
    email: 'test@example.com',
    password: 'Test123!',
    name: 'Test User'
  };
  
  /**
   * Run all API tests and return results
   */
  async runAllTests(): Promise<TestResult[]> {
    this.results = []; // Reset results
    
    console.log('🚀 Starting API integration tests...');
    
    // Authentication tests
    await this.testAuth();
    
    // Channel tests
    await this.testChannels();
    
    // Knowledge base tests
    await this.testKnowledgeBase();
    
    // Conversation tests
    await this.testConversations();
    
    // Analytics tests
    await this.testAnalytics();
    
    console.log(`✅ Tests completed: ${this.results.filter(r => r.success).length} passed, ${this.results.filter(r => !r.success).length} failed`);
    
    return this.results;
  }
  
  /**
   * Record a test result
   */
  private recordResult(name: string, success: boolean, message: string, data?: any, error?: any) {
    this.results.push({
      name,
      success,
      message,
      data,
      error
    });
    
    if (success) {
      console.log(`✅ ${name}: ${message}`);
    } else {
      console.error(`❌ ${name}: ${message}`, error);
    }
  }
  
  /**
   * Test authentication endpoints
   */
  private async testAuth(): Promise<void> {
    // Test login
    try {
      const loginResponse = await api.login({
        email: this.testUser.email,
        password: this.testUser.password
      });
      
      if (loginResponse.success && loginResponse.data?.token) {
        this.recordResult(
          'Login',
          true,
          'Successfully logged in and received token',
          { userId: loginResponse.data.user.id }
        );
      } else {
        this.recordResult(
          'Login',
          false,
          'Login request failed',
          loginResponse
        );
      }
    } catch (error) {
      // Try registration if login fails
      try {
        console.log('Login failed, trying registration...');
        const registerResponse = await api.register(this.testUser);
        
        if (registerResponse.success && registerResponse.data?.token) {
          this.recordResult(
            'Registration',
            true,
            'Successfully registered new user',
            { userId: registerResponse.data.user.id }
          );
        } else {
          this.recordResult(
            'Registration',
            false,
            'Registration request failed',
            registerResponse
          );
        }
      } catch (regError) {
        this.recordResult(
          'Authentication',
          false,
          'Both login and registration failed',
          null,
          regError
        );
      }
    }
    
    // Test profile retrieval
    try {
      const profileResponse = await api.getProfile();
      
      if (profileResponse.success && profileResponse.data) {
        this.recordResult(
          'Get Profile',
          true,
          'Successfully retrieved user profile',
          { email: profileResponse.data.email }
        );
      } else {
        this.recordResult(
          'Get Profile',
          false,
          'Profile retrieval failed',
          profileResponse
        );
      }
    } catch (error) {
      this.recordResult(
        'Get Profile',
        false,
        'Profile retrieval request failed',
        null,
        error
      );
    }
  }
  
  /**
   * Test channel endpoints
   */
  private async testChannels(): Promise<void> {
    // Test listing channels
    try {
      const channelsResponse = await api.listChannels();
      
      if (channelsResponse.success) {
        this.recordResult(
          'List Channels',
          true,
          `Successfully retrieved ${channelsResponse.data?.length || 0} channels`,
          { count: channelsResponse.data?.length || 0 }
        );
      } else {
        this.recordResult(
          'List Channels',
          false,
          'Channel listing failed',
          channelsResponse
        );
      }
    } catch (error) {
      this.recordResult(
        'List Channels',
        false,
        'Channel listing request failed',
        null,
        error
      );
    }
    
    // Test creating a channel
    try {
      const channelData = {
        name: 'Test Web Channel',
        type: 'web' as 'web',
        credentials: {},
        description: 'Created during API testing'
      };
      
      const createResponse = await api.createChannel(channelData);
      
      if (createResponse.success && createResponse.data) {
        this.recordResult(
          'Create Channel',
          true,
          'Successfully created a new channel',
          { channelId: createResponse.data.id }
        );
      } else {
        this.recordResult(
          'Create Channel',
          false,
          'Channel creation failed',
          createResponse
        );
      }
    } catch (error) {
      this.recordResult(
        'Create Channel',
        false,
        'Channel creation request failed',
        null,
        error
      );
    }
  }
  
  /**
   * Test knowledge base endpoints
   */
  private async testKnowledgeBase(): Promise<void> {
    // Test listing documents
    try {
      const documentsResponse = await api.listDocuments();
      
      if (documentsResponse.success) {
        this.recordResult(
          'List Documents',
          true,
          `Successfully retrieved ${documentsResponse.data?.length || 0} documents`,
          { count: documentsResponse.data?.length || 0 }
        );
      } else {
        this.recordResult(
          'List Documents',
          false,
          'Document listing failed',
          documentsResponse
        );
      }
    } catch (error) {
      this.recordResult(
        'List Documents',
        false,
        'Document listing request failed',
        null,
        error
      );
    }
    
    // Test listing articles
    try {
      const articlesResponse = await api.listArticles();
      
      if (articlesResponse.success) {
        this.recordResult(
          'List Articles',
          true,
          `Successfully retrieved ${articlesResponse.data?.length || 0} articles`,
          { count: articlesResponse.data?.length || 0 }
        );
      } else {
        this.recordResult(
          'List Articles',
          false,
          'Article listing failed',
          articlesResponse
        );
      }
    } catch (error) {
      this.recordResult(
        'List Articles',
        false,
        'Article listing request failed',
        null,
        error
      );
    }
    
    // Test creating an article
    try {
      const articleData = {
        title: 'Test API Article',
        content: 'This is a test article created during API testing.',
        tags: ['test', 'api'],
        published: true
      };
      
      const createResponse = await api.createArticle(articleData);
      
      if (createResponse.success && createResponse.data) {
        this.recordResult(
          'Create Article',
          true,
          'Successfully created a new article',
          { articleId: createResponse.data.id }
        );
      } else {
        this.recordResult(
          'Create Article',
          false,
          'Article creation failed',
          createResponse
        );
      }
    } catch (error) {
      this.recordResult(
        'Create Article',
        false,
        'Article creation request failed',
        null,
        error
      );
    }
  }
  
  /**
   * Test conversation endpoints
   */
  private async testConversations(): Promise<void> {
    // Test listing conversations
    try {
      const conversationsResponse = await api.listConversations();
      
      if (conversationsResponse.success) {
        this.recordResult(
          'List Conversations',
          true,
          `Successfully retrieved ${conversationsResponse.data?.length || 0} conversations`,
          { count: conversationsResponse.data?.length || 0 }
        );
        
        // If we have a conversation, test getting messages
        if (conversationsResponse.data && conversationsResponse.data.length > 0) {
          const convId = conversationsResponse.data[0].id;
          await this.testGetMessages(convId);
        }
      } else {
        this.recordResult(
          'List Conversations',
          false,
          'Conversation listing failed',
          conversationsResponse
        );
      }
    } catch (error) {
      this.recordResult(
        'List Conversations',
        false,
        'Conversation listing request failed',
        null,
        error
      );
    }
    
    // Test creating a conversation
    try {
      // First get a channel to use
      const channelsResponse = await api.listChannels();
      let channelId = '';
      
      if (channelsResponse.success && channelsResponse.data && channelsResponse.data.length > 0) {
        channelId = channelsResponse.data[0].id;
      }
      
      const conversationData = {
        title: 'Test API Conversation',
        channelId,
        initialMessage: 'Hello, this is a test message from API testing'
      };
      
      const createResponse = await api.createConversation(conversationData);
      
      if (createResponse.success && createResponse.data) {
        this.recordResult(
          'Create Conversation',
          true,
          'Successfully created a new conversation',
          { conversationId: createResponse.data.id }
        );
        
        // Test sending a message to this conversation
        await this.testSendMessage(createResponse.data.id);
      } else {
        this.recordResult(
          'Create Conversation',
          false,
          'Conversation creation failed',
          createResponse
        );
      }
    } catch (error) {
      this.recordResult(
        'Create Conversation',
        false,
        'Conversation creation request failed',
        null,
        error
      );
    }
  }
  
  /**
   * Test getting messages for a conversation
   */
  private async testGetMessages(conversationId: string): Promise<void> {
    try {
      const messagesResponse = await api.getMessages(conversationId);
      
      if (messagesResponse.success) {
        this.recordResult(
          'Get Messages',
          true,
          `Successfully retrieved ${messagesResponse.data?.length || 0} messages`,
          { 
            conversationId,
            count: messagesResponse.data?.length || 0 
          }
        );
      } else {
        this.recordResult(
          'Get Messages',
          false,
          'Message retrieval failed',
          messagesResponse
        );
      }
    } catch (error) {
      this.recordResult(
        'Get Messages',
        false,
        'Message retrieval request failed',
        null,
        error
      );
    }
  }
  
  /**
   * Test sending a message to a conversation
   */
  private async testSendMessage(conversationId: string): Promise<void> {
    try {
      const messageData = {
        content: 'This is a test message sent during API testing'
      };
      
      const sendResponse = await api.sendMessage(conversationId, messageData);
      
      if (sendResponse.success && sendResponse.data) {
        this.recordResult(
          'Send Message',
          true,
          'Successfully sent a message',
          { 
            conversationId,
            messageId: sendResponse.data.id 
          }
        );
      } else {
        this.recordResult(
          'Send Message',
          false,
          'Message sending failed',
          sendResponse
        );
      }
    } catch (error) {
      this.recordResult(
        'Send Message',
        false,
        'Message sending request failed',
        null,
        error
      );
    }
  }
  
  /**
   * Test analytics endpoints
   */
  private async testAnalytics(): Promise<void> {
    try {
      const analyticsResponse = await api.getAnalyticsOverview();
      
      if (analyticsResponse.success && analyticsResponse.data) {
        this.recordResult(
          'Analytics Overview',
          true,
          'Successfully retrieved analytics data',
          { 
            conversations: analyticsResponse.data.conversations?.total || 0,
            messages: analyticsResponse.data.messages?.total || 0
          }
        );
      } else {
        this.recordResult(
          'Analytics Overview',
          false,
          'Analytics retrieval failed',
          analyticsResponse
        );
      }
    } catch (error) {
      this.recordResult(
        'Analytics Overview',
        false,
        'Analytics retrieval request failed',
        null,
        error
      );
    }
  }
}

// Export the tester
export const apiTester = new ApiTester();
export default apiTester;
