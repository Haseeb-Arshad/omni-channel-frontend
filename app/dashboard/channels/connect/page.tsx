"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageSquare, MessageCircle, Phone, Mail, Facebook, Globe, Twitter, Instagram, ArrowRight, Smartphone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";
import api from "@/lib/api";

// Define channel type to match API types
type ChannelType = 'sms' | 'whatsapp' | 'email' | 'web' | 'facebook';

export default function ConnectChannelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | null>(
    searchParams.get("type") as ChannelType | null
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [credentials, setCredentials] = useState({
    accountSid: "",
    authToken: "",
    phoneNumber: ""
  });

  // Handle credentials input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle connect button click
  const handleConnect = async (channelType: ChannelType) => {
    try {
      setIsConnecting(true);
      
      // For WhatsApp, skip verification and directly create the channel
      if (channelType === 'whatsapp') {
        console.log('Bypassing verification for WhatsApp channel');
        
        // Create the WhatsApp channel directly without verification
        const createResponse = await api.createChannel({
          name: "Twilio WhatsApp",
          type: channelType,
          credentials: {
            accountSid: credentials.accountSid,
            authToken: credentials.authToken,
            phoneNumber: credentials.phoneNumber
          },
          description: "WhatsApp channel via Twilio"
        });
        
        if (!createResponse.success) {
          throw new Error(createResponse.message || "Failed to create WhatsApp channel");
        }
      } else {
        // For non-WhatsApp channels, do verification first
        const verifyResponse = await api.verifyChannelCredentials({
          type: channelType,
          credentials: {
            accountSid: credentials.accountSid,
            authToken: credentials.authToken,
            phoneNumber: credentials.phoneNumber
          }
        });

        if (!verifyResponse.success) {
          throw new Error(verifyResponse.message || "Failed to verify credentials");
        }
        
        // Create the channel in our system
        const createResponse = await api.createChannel({
          name: "Twilio SMS",
          type: channelType,
          credentials: {
            accountSid: credentials.accountSid,
            authToken: credentials.authToken,
            phoneNumber: credentials.phoneNumber
          },
          description: "SMS channel via Twilio"
        });
        
        if (!createResponse.success) {
          throw new Error(createResponse.message || "Failed to create channel");
        }
      }

      toast.success(`${channelType === "sms" ? "SMS" : "WhatsApp"} channel connected successfully!`);
      
      // Redirect back to channels page
      router.push("/dashboard/channels");
      
    } catch (error: any) {
      console.error("Error connecting channel:", error);
      toast.error(error.message || "Failed to connect channel");
    } finally {
      setIsConnecting(false);
    }
  };

  // Channel types available for connection
  const availableChannels = [
    {
      id: "sms",
      name: "SMS",
      description: "Connect via Twilio to send and receive SMS messages",
      icon: <Phone className="h-6 w-6" />,
      available: true,
      setupComplexity: "Simple",
      setupTime: "~5 minutes",
      isIntegrated: true,
      integratedWith: "Twilio",
      credentials: ["Twilio Account SID", "Twilio Auth Token", "Phone Number"]
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      description: "Connect your WhatsApp Business account via Twilio",
      icon: <Smartphone className="h-6 w-6" />,
      available: true,
      setupComplexity: "Simple",
      setupTime: "~5 minutes",
      isIntegrated: true,
      integratedWith: "Twilio",
      credentials: ["Twilio Account SID", "Twilio Auth Token", "Phone Number with WhatsApp capability"]
    },
    {
      id: "facebook",
      name: "Facebook Messenger",
      description: "Connect your Facebook Page to manage Messenger conversations",
      icon: <Facebook className="h-6 w-6" />,
      available: false,
      comingSoon: true,
      setupComplexity: "Moderate",
      setupTime: "~10 minutes",
      credentials: ["Facebook Page ID", "Facebook App Secret"]
    },
    {
      id: "instagram",
      name: "Instagram DM",
      description: "Connect your Instagram Business account to manage direct messages",
      icon: <Instagram className="h-6 w-6" />,
      available: false,
      comingSoon: true,
      setupComplexity: "Simple",
      setupTime: "~5 minutes",
      credentials: ["Instagram Business Account"]
    },
    {
      id: "email",
      name: "Email",
      description: "Connect your business email to manage customer conversations",
      icon: <Mail className="h-6 w-6" />,
      available: false,
      comingSoon: true,
      setupComplexity: "Simple",
      setupTime: "~5 minutes",
      credentials: ["IMAP/SMTP Settings" ]
    },
    {
      id: "webchat",
      name: "Web Chat Widget",
      description: "Add a customizable chat widget to your website",
      icon: <Globe className="h-6 w-6" />,
      available: false,
      comingSoon: true,
      setupComplexity: "Simple",
      setupTime: "~2 minutes",
      credentials: ["No credentials needed"]
    },
    {
      id: "twitter",
      name: "Twitter/X DMs",
      description: "Connect your Twitter account to manage direct messages",
      icon: <Twitter className="h-6 w-6" />,
      available: false,
      comingSoon: true
    },
    {
      id: "slack",
      name: "Slack",
      description: "Integrate with your Slack workspace",
      icon: <MessageCircle className="h-6 w-6" />,
      available: false,
      comingSoon: true
    },
  ];

  // Filter channels based on search query
  const filteredChannels = availableChannels.filter(channel => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      channel.name.toLowerCase().includes(query) || 
      channel.description.toLowerCase().includes(query)
    );
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Initialize selected channel from query param and handle direct redirects
  useEffect(() => {
    const type = searchParams.get("type");
    if (type && (
      type === "sms" || 
      type === "whatsapp" || 
      type === "facebook" || 
      type === "email" || 
      type === "web"
    )) {
      setSelectedChannel(type as ChannelType);
      
      // Direct redirect for specialized channel pages
      if (type === "sms") {
        router.push("/dashboard/channels/connect/sms");
        return;
      }
      if (type === "whatsapp") {
        router.push("/dashboard/channels/connect/whatsapp");
        return;
      }
    }
  }, [searchParams, router]);

  // Render the Twilio credentials form
  const renderCredentialsForm = () => {
    if (!selectedChannel || (selectedChannel !== "sms" && selectedChannel !== "whatsapp")) {
      return null;
    }

    const channelTitle = selectedChannel === "sms" ? "Twilio SMS" : "Twilio WhatsApp";
    const description = selectedChannel === "sms" 
      ? "Connect your Twilio account to send and receive SMS messages."
      : "Connect your Twilio account to send and receive WhatsApp messages.";

    return (
      <Card className="mt-6 bg-white dark:bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              {selectedChannel === "sms" ? <Phone className="h-6 w-6" /> : <Smartphone className="h-6 w-6" />}
            </div>
            <div>
              <CardTitle>{channelTitle}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountSid">Twilio Account SID</Label>
            <Input 
              id="accountSid" 
              name="accountSid" 
              placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
              value={credentials.accountSid}
              onChange={handleInputChange}
              disabled={isConnecting}
            />
            <p className="text-xs text-muted-foreground">Find this on your Twilio Console Dashboard</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="authToken">Twilio Auth Token</Label>
            <Input 
              id="authToken" 
              name="authToken" 
              type="password" 
              placeholder="Your Twilio Auth Token" 
              value={credentials.authToken}
              onChange={handleInputChange}
              disabled={isConnecting}
            />
            <p className="text-xs text-muted-foreground">Find this on your Twilio Console Dashboard</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Twilio Phone Number</Label>
            <Input 
              id="phoneNumber" 
              name="phoneNumber" 
              placeholder="+1234567890" 
              value={credentials.phoneNumber}
              onChange={handleInputChange}
              disabled={isConnecting}
            />
            <p className="text-xs text-muted-foreground">
              {selectedChannel === "sms" 
                ? "The Twilio phone number you want to use for SMS" 
                : "The Twilio phone number with WhatsApp capability"}
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Webhook Configuration</h4>
            <p className="text-xs text-muted-foreground mb-2">
              After connecting, you'll need to configure the following webhook URL in your Twilio account:
            </p>
            <div className="text-xs font-mono bg-muted/50 p-2 rounded overflow-x-auto">
              {`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/webhooks/${selectedChannel}`}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => handleConnect(selectedChannel)} 
            className="w-full" 
            disabled={isConnecting || !credentials.accountSid || !credentials.authToken || !credentials.phoneNumber}
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>Connect {selectedChannel === "sms" ? "SMS" : "WhatsApp"}</>  
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="container py-6 space-y-6 max-w-5xl bg-white dark:bg-background">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/channels" className="flex items-center justify-center">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Connect a Channel</h1>
          <p className="text-muted-foreground">
            Add a new communication channel to engage with your customers
          </p>
        </div>
      </div>

      {selectedChannel === "sms" || selectedChannel === "whatsapp" ? (
        renderCredentialsForm()
      ) : (
        <>
          <div className="relative">
            <Input
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
        {filteredChannels.map((channel) => (
          <motion.div key={channel.id} variants={itemVariants}>
            <Card className={`h-full overflow-hidden transition-all duration-200 hover:shadow-md ${!channel.available ? 'opacity-70' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      {channel.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{channel.name}</CardTitle>
                      {channel.comingSoon && (
                        <span className="text-xs text-primary">Coming Soon</span>
                      )}
                    </div>
                  </div>
                  
                  {channel.available && (
                    <Badge variant="outline" className="text-xs">
                      {channel.setupComplexity}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div>
                  <p className="text-sm text-muted-foreground">{channel.description}</p>
                  
                  {channel.available && channel.credentials && (
                    <div className="mt-3">
                      <h4 className="text-xs font-medium mb-2">You'll need:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {channel.credentials.map((credential, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-primary/60"></div>
                            {credential}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter>
                {channel.available ? (
                  channel.id === 'sms' || channel.id === 'whatsapp' ? (
                    <Button 
                      className="w-full justify-between" 
                      onClick={() => {
                        if (channel.id === 'sms') {
                          router.push('/dashboard/channels/connect/sms');
                        } else if (channel.id === 'whatsapp') {
                          router.push('/dashboard/channels/connect/whatsapp');
                        }
                      }}
                    >
                      <span>Connect</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      className="w-full justify-between" 
                      onClick={() => setSelectedChannel(channel.id as ChannelType)}
                    >
                      <span>Connect</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )
                ) : (
                  <Button className="w-full" variant="outline" disabled>
                    <span>Coming Soon</span>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
        </motion.div> {/* Added missing closing tag for containerVariants motion.div */}
        </>
      )}
    </div>
  );
}
