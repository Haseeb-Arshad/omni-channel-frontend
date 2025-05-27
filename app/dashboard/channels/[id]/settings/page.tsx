"use client";

import { useState, useEffect } from "react";

// Define channel credentials interface
interface ChannelCredentials {
  accountSid?: string;
  authToken?: string;
  phoneNumber?: string;
  smtpServer?: string;
  smtpPort?: number;
  username?: string;
  password?: string;
  apiKey?: string;
  [key: string]: any; // Allow any other properties
}
import Link from "next/link";
import { ArrowLeft, Save, Trash2, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ChannelSettingsPage({ params }: { params: { id: string } }) {
  const [channelData, setChannelData] = useState({
    id: params.id,
    name: "",
    type: "",
    status: "connected",
    credentials: {} as ChannelCredentials,
    persona_id: "default",
    knowledge_base_id: null as string | null,
    settings: {
      autoReply: true,
      responseTime: "1min",
      workingHours: {
        enabled: true,
        start: "09:00",
        end: "17:00",
        timezone: "America/New_York",
        offHoursMessage: "Thanks for reaching out! Our team is currently offline. We'll respond as soon as we're back."
      },
      aiAssistant: {
        enabled: true,
        personaId: "default",
        handoffThreshold: "medium"
      },
      notifications: {
        email: true,
        desktop: true,
        slack: false
      }
    }
  });

  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<null | "success" | "error">(null);
  const [isSaving, setIsSaving] = useState(false);
  const [personas, setPersonas] = useState<Array<{id: string, name: string}>>([]);
  const [knowledgeBases, setKnowledgeBases] = useState<Array<{id: string, name: string}>>([]);
  
  // Fetch personas and knowledge bases
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch personas
        const personasResponse = await fetch('/api/personas');
        if (personasResponse.ok) {
          const personasData = await personasResponse.json();
          setPersonas(personasData.personas || []);
        }
        
        // Fetch knowledge bases
        const kbResponse = await fetch('/api/knowledge-bases');
        if (kbResponse.ok) {
          const kbData = await kbResponse.json();
          setKnowledgeBases(kbData.knowledgeBases || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  // In a real app, this would fetch channel data from the API
  useEffect(() => {
    // Simulate API fetch with sample data based on the channel ID
    setTimeout(() => {
      const sampleData = {
        id: params.id,
        name: params.id === "1" ? "Twilio SMS" : 
             params.id === "email" ? "Business Email" : 
             params.id === "webchat" ? "Website Chat Widget" :
             params.id === "whatsapp" ? "WhatsApp Business" :
             "Channel " + params.id,
        type: params.id === "1" ? "sms" : 
             params.id === "email" ? "email" : 
             params.id === "webchat" ? "web" :
             params.id === "whatsapp" ? "whatsapp" :
             "unknown",
        status: "connected",
        credentials: {
          accountSid: "AC*****************",
          authToken: "••••••••••••••••",
          phoneNumber: "+1234567890"
        },
        persona_id: "default",
        knowledge_base_id: params.id === "1" ? "product" : params.id === "email" ? "support" : null,
        settings: {
          autoReply: true,
          responseTime: "1min",
          workingHours: {
            enabled: true,
            start: "09:00",
            end: "17:00",
            timezone: "America/New_York",
            offHoursMessage: "Thanks for reaching out! Our team is currently offline. We'll respond as soon as we're back."
          },
          aiAssistant: {
            enabled: true,
            personaId: "default",
            handoffThreshold: "medium"
          },
          notifications: {
            email: true,
            desktop: true,
            slack: false
          }
        }
      };
      
      setChannelData(sampleData);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      setSaveStatus(null);
      // First, update the channel settings
      const updateData = {
        name: channelData.name,
        credentials: channelData.credentials,
        // Use settings from the channelData state
        autoReply: channelData.settings.autoReply,
        responseTime: channelData.settings.responseTime,
        // No description or is_active in our current state, can add if needed
        isActive: true // Default to active
      };
      
      // Update the channel using the API
      const updateResult = await fetch(`/api/channels/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (!updateResult.ok) {
        throw new Error('Failed to update channel settings');
      }
      
      // Set the persona for the channel
      if (channelData.persona_id) {
        const personaResult = await fetch(`/api/channels/${params.id}/persona`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ personaId: channelData.persona_id }),
        });
        
        if (!personaResult.ok) {
          throw new Error('Failed to update channel persona');
        }
      }
      
      // Set the knowledge base for the channel
      const knowledgeBaseResult = await fetch(`/api/channels/${params.id}/knowledge-base`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ knowledgeBaseId: channelData.knowledge_base_id }),
      });
      
      if (!knowledgeBaseResult.ok) {
        throw new Error('Failed to update channel knowledge base');
      }
      
      // Show success message
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error('Error saving channel settings:', error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDisconnect = () => {
    // In a real app, this would disconnect the channel via API
    // and redirect to the channels page
    window.location.href = "/dashboard/channels";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading channel settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6 max-w-4xl">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/channels">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{channelData.name} Settings</h1>
          <p className="text-muted-foreground">
            Configure settings and credentials for your channel
          </p>
        </div>
      </div>

      {saveStatus === "success" && (
        <Alert variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your settings have been saved successfully.
          </AlertDescription>
        </Alert>
      )}

      {saveStatus === "error" && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error saving your settings. Please try again.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-6">
        <div className="bg-card border rounded-lg p-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">
              General
            </TabsTrigger>
            <TabsTrigger value="automation">
              Automation
            </TabsTrigger>
            <TabsTrigger value="credentials">
              Credentials
            </TabsTrigger>
          </TabsList>
        </div>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic settings for your channel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="channel-name">Channel Name</Label>
                <Input 
                  id="channel-name" 
                  value={channelData.name}
                  onChange={(e) => setChannelData({...channelData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notifications">Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications" className="flex-1">
                      Email notifications
                    </Label>
                    <Switch 
                      id="email-notifications" 
                      checked={channelData.settings.notifications.email}
                      onCheckedChange={(checked) => setChannelData({
                        ...channelData, 
                        settings: {
                          ...channelData.settings,
                          notifications: {
                            ...channelData.settings.notifications,
                            email: checked
                          }
                        }
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="desktop-notifications" className="flex-1">
                      Desktop notifications
                    </Label>
                    <Switch 
                      id="desktop-notifications" 
                      checked={channelData.settings.notifications.desktop}
                      onCheckedChange={(checked) => setChannelData({
                        ...channelData, 
                        settings: {
                          ...channelData.settings,
                          notifications: {
                            ...channelData.settings.notifications,
                            desktop: checked
                          }
                        }
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slack-notifications" className="flex-1">
                      Slack notifications
                    </Label>
                    <Switch 
                      id="slack-notifications" 
                      checked={channelData.settings.notifications.slack}
                      onCheckedChange={(checked) => setChannelData({
                        ...channelData, 
                        settings: {
                          ...channelData.settings,
                          notifications: {
                            ...channelData.settings.notifications,
                            slack: checked
                          }
                        }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="response-time">Expected Response Time</Label>
                <Select 
                  value={channelData.settings.responseTime} 
                  onValueChange={(value) => setChannelData({
                    ...channelData,
                    settings: {
                      ...channelData.settings,
                      responseTime: value
                    }
                  })}
                >
                  <SelectTrigger id="response-time">
                    <SelectValue placeholder="Select response time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instant">Instant (less than 5 minutes)</SelectItem>
                    <SelectItem value="1min">Quick (less than 1 hour)</SelectItem>
                    <SelectItem value="4hour">Same day (less than 4 hours)</SelectItem>
                    <SelectItem value="24hour">Next day (less than 24 hours)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Working Hours</CardTitle>
              <CardDescription>
                Set your business hours and automated responses for off-hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="working-hours-enabled" className="flex-1">
                  Enable working hours
                </Label>
                <Switch 
                  id="working-hours-enabled" 
                  checked={channelData.settings.workingHours.enabled}
                  onCheckedChange={(checked) => setChannelData({
                    ...channelData, 
                    settings: {
                      ...channelData.settings,
                      workingHours: {
                        ...channelData.settings.workingHours,
                        enabled: checked
                      }
                    }
                  })}
                />
              </div>

              {channelData.settings.workingHours.enabled && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input 
                        id="start-time" 
                        type="time"
                        value={channelData.settings.workingHours.start}
                        onChange={(e) => setChannelData({
                          ...channelData, 
                          settings: {
                            ...channelData.settings,
                            workingHours: {
                              ...channelData.settings.workingHours,
                              start: e.target.value
                            }
                          }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-time">End Time</Label>
                      <Input 
                        id="end-time" 
                        type="time"
                        value={channelData.settings.workingHours.end}
                        onChange={(e) => setChannelData({
                          ...channelData, 
                          settings: {
                            ...channelData.settings,
                            workingHours: {
                              ...channelData.settings.workingHours,
                              end: e.target.value
                            }
                          }
                        })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={channelData.settings.workingHours.timezone} 
                      onValueChange={(value) => setChannelData({
                        ...channelData,
                        settings: {
                          ...channelData.settings,
                          workingHours: {
                            ...channelData.settings.workingHours,
                            timezone: value
                          }
                        }
                      })}
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="off-hours-message">Off-Hours Message</Label>
                    <Textarea 
                      id="off-hours-message" 
                      rows={3}
                      value={channelData.settings.workingHours.offHoursMessage}
                      onChange={(e) => setChannelData({
                        ...channelData, 
                        settings: {
                          ...channelData.settings,
                          workingHours: {
                            ...channelData.settings.workingHours,
                            offHoursMessage: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Settings */}
        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>
                Configure AI-powered responses for this channel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="ai-enabled" className="flex-1">
                  Enable AI Assistant
                </Label>
                <Switch 
                  id="ai-enabled" 
                  checked={channelData.settings.aiAssistant.enabled}
                  onCheckedChange={(checked) => setChannelData({
                    ...channelData, 
                    settings: {
                      ...channelData.settings,
                      aiAssistant: {
                        ...channelData.settings.aiAssistant,
                        enabled: checked
                      }
                    }
                  })}
                />
              </div>

              {channelData.settings.aiAssistant.enabled && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="persona">AI Persona</Label>
                    <Select 
                      value={channelData.persona_id || "default"}
                      onValueChange={(value) => {
                        setChannelData({
                          ...channelData,
                          persona_id: value
                        });
                      }}
                    >
                      <SelectTrigger id="persona">
                        <SelectValue placeholder="Select an AI persona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default Assistant</SelectItem>
                        {personas.map(persona => (
                          <SelectItem key={persona.id} value={persona.id}>{persona.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">The persona defines how the AI assistant communicates</p>
                    <div className="flex justify-end">
                      <Button variant="link" size="sm" asChild className="h-auto p-0">
                        <Link href="/dashboard/persona">
                          Manage Personas
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="knowledge-base">Knowledge Base</Label>
                    <Select 
                      value={channelData.knowledge_base_id || ""}
                      onValueChange={(value) => {
                        setChannelData({
                          ...channelData,
                          knowledge_base_id: value || null
                        });
                      }}
                    >
                      <SelectTrigger id="knowledge-base">
                        <SelectValue placeholder="Select a knowledge base" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {knowledgeBases.map(kb => (
                          <SelectItem key={kb.id} value={kb.id}>{kb.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">The AI will use this knowledge to respond to inquiries</p>
                    <div className="flex justify-end">
                      <Button variant="link" size="sm" asChild className="h-auto p-0">
                        <Link href="/dashboard/knowledge">
                          Manage Knowledge Bases
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="handoff-threshold">Human Handoff Threshold</Label>
                    <Select 
                      value={channelData.settings.aiAssistant.handoffThreshold} 
                      onValueChange={(value) => setChannelData({
                        ...channelData,
                        settings: {
                          ...channelData.settings,
                          aiAssistant: {
                            ...channelData.settings.aiAssistant,
                            handoffThreshold: value
                          }
                        }
                      })}
                    >
                      <SelectTrigger id="handoff-threshold">
                        <SelectValue placeholder="Select handoff threshold" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Hand off easily</SelectItem>
                        <SelectItem value="medium">Medium - Balanced approach</SelectItem>
                        <SelectItem value="high">High - AI handles most queries</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Determines how quickly the AI will transfer complex conversations to human agents
                    </p>
                  </div>
                  
                  {/* View knowledge base documents button if a knowledge base is selected */}
                  {channelData.knowledge_base_id && (
                    <div className="mt-4">
                      <Link href={`/dashboard/knowledge-base/${channelData.knowledge_base_id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <Info className="w-4 h-4 mr-2" />
                          View Knowledge Base Documents
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auto-Reply</CardTitle>
              <CardDescription>
                Configure automatic response settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-reply" className="flex-1">
                  Enable auto-reply
                </Label>
                <Switch 
                  id="auto-reply" 
                  checked={channelData.settings.autoReply}
                  onCheckedChange={(checked) => setChannelData({
                    ...channelData, 
                    settings: {
                      ...channelData.settings,
                      autoReply: checked
                    }
                  })}
                />
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-md p-3 text-sm flex items-start gap-2">
                <Info className="h-4 w-4 text-amber-500 mt-0.5" />
                <div className="text-amber-800 dark:text-amber-300">
                  <p>Auto-reply settings work together with the AI Assistant. If AI Assistant is disabled, auto-replies will use template messages.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Credentials Settings */}
        <TabsContent value="credentials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Credentials</CardTitle>
              <CardDescription>
                Manage the API credentials for this channel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {channelData.type === "sms" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="account-sid">Twilio Account SID</Label>
                    <Input 
                      id="account-sid" 
                      type="password"
                      value={channelData.credentials.accountSid || ""}
                      onChange={(e) => setChannelData({
                        ...channelData, 
                        credentials: {
                          ...channelData.credentials,
                          accountSid: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auth-token">Twilio Auth Token</Label>
                    <Input 
                      id="auth-token" 
                      type="password"
                      value={channelData.credentials.authToken || ""}
                      onChange={(e) => setChannelData({
                        ...channelData, 
                        credentials: {
                          ...channelData.credentials,
                          authToken: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input 
                      id="phone-number" 
                      value={channelData.credentials.phoneNumber || ""}
                      onChange={(e) => setChannelData({
                        ...channelData, 
                        credentials: {
                          ...channelData.credentials,
                          phoneNumber: e.target.value
                        }
                      })}
                    />
                  </div>
                </>
              )}

              {channelData.type === "email" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-server">SMTP Server</Label>
                    <Input 
                      id="smtp-server" 
                      value={channelData.credentials.smtpServer || "smtp.example.com"}
                      onChange={(e) => setChannelData({
                        ...channelData, 
                        credentials: {
                          ...channelData.credentials,
                          smtpServer: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input 
                      id="smtp-port" 
                      type="number"
                      value={channelData.credentials.smtpPort || "587"}
                      onChange={(e) => setChannelData({
                        ...channelData, 
                        credentials: {
                          ...channelData.credentials,
                          smtpPort: parseInt(e.target.value, 10) || 587
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-username">Email Username</Label>
                    <Input 
                      id="email-username" 
                      value={channelData.credentials.username || "support@yourdomain.com"}
                      onChange={(e) => setChannelData({
                        ...channelData, 
                        credentials: {
                          ...channelData.credentials,
                          username: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-password">Email Password</Label>
                    <Input 
                      id="email-password" 
                      type="password"
                      value={channelData.credentials.password || "••••••••••••"}
                      onChange={(e) => setChannelData({
                        ...channelData, 
                        credentials: {
                          ...channelData.credentials,
                          password: e.target.value
                        }
                      })}
                    />
                  </div>
                </>
              )}

              {channelData.type === "web" && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">No credentials needed. Configure the embed code in the general settings.</p>
                </div>
              )}

              {channelData.type === "whatsapp" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="wa-phone-number">WhatsApp Phone Number</Label>
                    <Input 
                      id="wa-phone-number" 
                      value={channelData.credentials.phoneNumber || "+1234567890"}
                      onChange={(e) => setChannelData({
                        ...channelData, 
                        credentials: {
                          ...channelData.credentials,
                          phoneNumber: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wa-api-key">WhatsApp API Key</Label>
                    <Input 
                      id="wa-api-key" 
                      type="password"
                      value={channelData.credentials.apiKey || "••••••••••••••••"}
                      onChange={(e) => setChannelData({
                        ...channelData, 
                        credentials: {
                          ...channelData.credentials,
                          apiKey: e.target.value
                        }
                      })}
                    />
                  </div>
                </>
              )}
              
              <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-md p-3 text-sm flex items-start gap-2 mt-4">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                <div className="text-red-800 dark:text-red-300">
                  <p><strong>Warning:</strong> Changing API credentials may disrupt message delivery. Make sure to enter valid credentials.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
              <CardDescription>
                Permanently disconnect this channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-md p-3 text-sm flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                  <div className="text-red-800 dark:text-red-300">
                    <p><strong>Warning:</strong> Disconnecting this channel will permanently remove it from your account. All configuration will be lost.</p>
                  </div>
                </div>
                <Button 
                  variant="destructive" 
                  className="w-full sm:w-auto ml-auto"
                  onClick={handleDisconnect}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Disconnect Channel
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3">
        <Button 
          variant="outline" 
          asChild
        >
          <Link href="/dashboard/channels">
            Cancel
          </Link>
        </Button>
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
