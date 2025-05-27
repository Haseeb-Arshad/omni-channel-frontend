'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { apiTester } from '@/lib/api-test';
import api from '@/lib/api';

interface TestResult {
  name: string;
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export default function IntegrationTestPage() {
  const [authResults, setAuthResults] = useState<TestResult[]>([]);
  const [channelResults, setChannelResults] = useState<TestResult[]>([]);
  const [knowledgeResults, setKnowledgeResults] = useState<TestResult[]>([]);
  const [conversationResults, setConversationResults] = useState<TestResult[]>([]);
  const [analyticsResults, setAnalyticsResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('auth');
  const [apiBaseUrl, setApiBaseUrl] = useState('');

  // Run all integration tests
  const runAllTests = async () => {
    setIsLoading(true);
    try {
      const results = await apiTester.runAllTests();
      
      // Filter results by category
      setAuthResults(results.filter(r => 
        r.name.includes('Login') || 
        r.name.includes('Registration') || 
        r.name.includes('Profile')
      ));
      
      setChannelResults(results.filter(r => 
        r.name.includes('Channel')
      ));
      
      setKnowledgeResults(results.filter(r => 
        r.name.includes('Document') || 
        r.name.includes('Article')
      ));
      
      setConversationResults(results.filter(r => 
        r.name.includes('Conversation') || 
        r.name.includes('Message')
      ));
      
      setAnalyticsResults(results.filter(r => 
        r.name.includes('Analytics')
      ));
    } catch (error) {
      console.error('Error running tests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Run only authentication tests
  const testAuthOnly = async () => {
    setIsLoading(true);
    try {
      // Test Login
      try {
        const loginResult = await api.login({
          email: 'test@example.com',
          password: 'Test123!'
        });
        
        setAuthResults([{
          name: 'Login',
          success: loginResult.success,
          message: loginResult.success 
            ? 'Successfully logged in' 
            : 'Login failed',
          data: loginResult.data
        }]);
        
        // Test Profile if login succeeded
        if (loginResult.success) {
          try {
            const profileResult = await api.getProfile();
            
            setAuthResults(prev => [...prev, {
              name: 'Get Profile',
              success: profileResult.success,
              message: profileResult.success 
                ? `Successfully retrieved profile for ${profileResult.data?.email}` 
                : 'Profile retrieval failed',
              data: profileResult.data
            }]);
          } catch (profileError: any) {
            setAuthResults(prev => [...prev, {
              name: 'Get Profile',
              success: false,
              message: 'Profile retrieval failed with error',
              error: profileError
            }]);
          }
        }
      } catch (loginError: any) {
        // Try registration if login fails
        setAuthResults([{
          name: 'Login',
          success: false,
          message: 'Login failed with error',
          error: loginError
        }]);
        
        try {
          const registerResult = await api.register({
            email: 'test@example.com',
            password: 'Test123!',
            name: 'Test User'
          });
          
          setAuthResults(prev => [...prev, {
            name: 'Registration',
            success: registerResult.success,
            message: registerResult.success 
              ? 'Successfully registered new user' 
              : 'Registration failed',
            data: registerResult.data
          }]);
        } catch (registerError: any) {
          setAuthResults(prev => [...prev, {
            name: 'Registration',
            success: false,
            message: 'Registration failed with error',
            error: registerError
          }]);
        }
      }
    } finally {
      setIsLoading(false);
      setActiveTab('auth');
    }
  };

  // Test document upload
  const testDocumentUpload = async () => {
    setIsLoading(true);
    try {
      // Since we can't directly upload a file without a file input,
      // we'll just test the document listing endpoint
      const documentsResult = await api.listDocuments();
      
      setKnowledgeResults([{
        name: 'List Documents',
        success: documentsResult.success,
        message: documentsResult.success 
          ? `Successfully retrieved ${documentsResult.data?.length || 0} documents` 
          : 'Document listing failed',
        data: documentsResult.data
      }]);
      
      // Test article listing
      try {
        const articlesResult = await api.listArticles();
        
        setKnowledgeResults(prev => [...prev, {
          name: 'List Articles',
          success: articlesResult.success,
          message: articlesResult.success 
            ? `Successfully retrieved ${articlesResult.data?.length || 0} articles` 
            : 'Article listing failed',
          data: articlesResult.data
        }]);
      } catch (articleError: any) {
        setKnowledgeResults(prev => [...prev, {
          name: 'List Articles',
          success: false,
          message: 'Article listing failed with error',
          error: articleError
        }]);
      }
    } catch (error: any) {
      setKnowledgeResults([{
        name: 'List Documents',
        success: false,
        message: 'Document listing failed with error',
        error
      }]);
    } finally {
      setIsLoading(false);
      setActiveTab('knowledge');
    }
  };

  // Test channel connections
  const testChannels = async () => {
    setIsLoading(true);
    try {
      const channelsResult = await api.listChannels();
      
      setChannelResults([{
        name: 'List Channels',
        success: channelsResult.success,
        message: channelsResult.success 
          ? `Successfully retrieved ${channelsResult.data?.length || 0} channels` 
          : 'Channel listing failed',
        data: channelsResult.data
      }]);
    } catch (error: any) {
      setChannelResults([{
        name: 'List Channels',
        success: false,
        message: 'Channel listing failed with error',
        error
      }]);
    } finally {
      setIsLoading(false);
      setActiveTab('channels');
    }
  };

  // Test conversation handling
  const testConversations = async () => {
    setIsLoading(true);
    try {
      const conversationsResult = await api.listConversations();
      
      setConversationResults([{
        name: 'List Conversations',
        success: conversationsResult.success,
        message: conversationsResult.success 
          ? `Successfully retrieved ${conversationsResult.data?.length || 0} conversations` 
          : 'Conversation listing failed',
        data: conversationsResult.data
      }]);
      
      // If we have conversations, test getting messages from the first one
      if (conversationsResult.success && 
          conversationsResult.data && 
          conversationsResult.data.length > 0) {
        try {
          const convId = conversationsResult.data[0].id;
          const messagesResult = await api.getMessages(convId);
          
          setConversationResults(prev => [...prev, {
            name: 'Get Messages',
            success: messagesResult.success,
            message: messagesResult.success 
              ? `Successfully retrieved ${messagesResult.data?.length || 0} messages` 
              : 'Message retrieval failed',
            data: messagesResult.data
          }]);
        } catch (msgError: any) {
          setConversationResults(prev => [...prev, {
            name: 'Get Messages',
            success: false,
            message: 'Message retrieval failed with error',
            error: msgError
          }]);
        }
      }
    } catch (error: any) {
      setConversationResults([{
        name: 'List Conversations',
        success: false,
        message: 'Conversation listing failed with error',
        error
      }]);
    } finally {
      setIsLoading(false);
      setActiveTab('conversations');
    }
  };

  // Test analytics
  const testAnalytics = async () => {
    setIsLoading(true);
    try {
      const analyticsResult = await api.getAnalyticsOverview();
      
      setAnalyticsResults([{
        name: 'Analytics Overview',
        success: analyticsResult.success,
        message: analyticsResult.success 
          ? 'Successfully retrieved analytics data' 
          : 'Analytics retrieval failed',
        data: analyticsResult.data
      }]);
    } catch (error: any) {
      setAnalyticsResults([{
        name: 'Analytics Overview',
        success: false,
        message: 'Analytics retrieval failed with error',
        error
      }]);
    } finally {
      setIsLoading(false);
      setActiveTab('analytics');
    }
  };

  // Test Google OAuth flow (redirects to Google login)
  const testGoogleOAuth = () => {
    // In a real implementation, this would redirect to Google login
    // Here we'll just inform the user
    setAuthResults([{
      name: 'Google OAuth',
      success: true,
      message: 'Google OAuth flow initiated - this would redirect to Google login in a real implementation',
      data: { info: 'Google OAuth requires browser redirection and cannot be fully tested in this interface' }
    }]);
    setActiveTab('auth');
  };

  // Check API connectivity
  const checkApiConnection = async () => {
    try {
      const response = await fetch(`${apiBaseUrl || 'http://localhost:3000'}/health`);
      return {
        online: response.ok,
        status: response.status,
        statusText: response.statusText
      };
    } catch (error) {
      return {
        online: false,
        error: (error as Error).message
      };
    }
  };

  // Render test results
  const renderResults = (results: TestResult[]) => {
    if (results.length === 0) {
      return (
        <Alert>
          <AlertTitle>No test results</AlertTitle>
          <AlertDescription>Run tests to see results here.</AlertDescription>
        </Alert>
      );
    }
    
    return results.map((result, index) => (
      <Card key={index} className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{result.name}</CardTitle>
            <Badge variant={result.success ? "success" : "destructive"}>
              {result.success ? "Success" : "Failed"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{result.message}</p>
          {result.data && (
            <div className="mt-2">
              <Separator className="my-2" />
              <h4 className="text-sm font-semibold mb-1">Response Data:</h4>
              <pre className="text-xs bg-slate-100 p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          )}
          {result.error && (
            <div className="mt-2">
              <Separator className="my-2" />
              <h4 className="text-sm font-semibold mb-1 text-red-500">Error:</h4>
              <pre className="text-xs bg-red-50 p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(result.error, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">OmniChannel API Integration Tests</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>API Connectivity</CardTitle>
            <CardDescription>Check if the backend API is reachable</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex mb-4">
              <input
                type="text"
                value={apiBaseUrl}
                onChange={(e) => setApiBaseUrl(e.target.value)}
                placeholder="http://localhost:3000"
                className="flex-1 px-3 py-2 border rounded-l-md"
              />
              <Button 
                onClick={async () => {
                  const result = await checkApiConnection();
                  alert(result.online 
                    ? `API is online (Status: ${result.status} ${result.statusText})` 
                    : `API is offline: ${(result as any).error || 'Unknown error'}`
                  );
                }}
                className="rounded-l-none"
              >
                Check
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>Test login, registration and profile retrieval</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button 
              onClick={testAuthOnly} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Testing...' : 'Test Email Auth'}
            </Button>
            <Button 
              onClick={testGoogleOAuth} 
              disabled={isLoading}
              className="w-full"
              variant="outline"
            >
              Test Google OAuth
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Full Integration Test</CardTitle>
            <CardDescription>Run all API integration tests</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={runAllTests} 
              disabled={isLoading}
              className="w-full"
              variant="default"
            >
              {isLoading ? 'Running Tests...' : 'Run All Tests'}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Base</CardTitle>
            <CardDescription>Test document and article operations</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testDocumentUpload} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Testing...' : 'Test Knowledge Base'}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Channels</CardTitle>
            <CardDescription>Test channel connections and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testChannels} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Testing...' : 'Test Channels'}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Test conversation and message handling</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testConversations} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Testing...' : 'Test Conversations'}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Test analytics endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testAnalytics} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Testing...' : 'Test Analytics'}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="auth">
          <h2 className="text-xl font-semibold mb-4">Authentication Test Results</h2>
          {renderResults(authResults)}
        </TabsContent>
        
        <TabsContent value="channels">
          <h2 className="text-xl font-semibold mb-4">Channel Test Results</h2>
          {renderResults(channelResults)}
        </TabsContent>
        
        <TabsContent value="knowledge">
          <h2 className="text-xl font-semibold mb-4">Knowledge Base Test Results</h2>
          {renderResults(knowledgeResults)}
        </TabsContent>
        
        <TabsContent value="conversations">
          <h2 className="text-xl font-semibold mb-4">Conversation Test Results</h2>
          {renderResults(conversationResults)}
        </TabsContent>
        
        <TabsContent value="analytics">
          <h2 className="text-xl font-semibold mb-4">Analytics Test Results</h2>
          {renderResults(analyticsResults)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
