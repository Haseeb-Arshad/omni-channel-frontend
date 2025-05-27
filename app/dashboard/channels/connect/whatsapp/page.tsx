"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Smartphone, Check, Info, Loader2, CheckCircle2, AlertCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Steps, Step } from "@/components/ui/steps";
import { toast } from "sonner";
import api from "@/lib/api";

export default function ConnectWhatsAppPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("twilio");
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    accountSid: "",
    authToken: "",
    phoneNumber: "",
    friendlyName: "WhatsApp Channel"
  });
  
  // Get dynamic webhook URL based on environment
  const webhookUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/webhooks/whatsapp`;
  
  // Clear any errors when inputs change
  useEffect(() => {
    if (error) setError(null);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  // Skip verification and go directly to step 2
  const handleSkipVerification = () => {
    if (!formData.accountSid || !formData.authToken) {
      setError('Account SID and Auth Token are required');
      toast.error('Please enter all required fields');
      return;
    }
    
    // Skip verification and go directly to step 2
    setIsVerified(true);
    setCurrentStep(2);
    toast.success('Proceeding to next step');
  };

  const handleConnectChannel = async () => {
    if (!formData.phoneNumber || !formData.accountSid || !formData.authToken) {
      setError('Account SID, Auth Token, and Phone Number are all required to connect');
      toast.error('Please enter all required fields');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Connecting WhatsApp channel with:', {
        accountSid: formData.accountSid,
        authToken: '***' + formData.authToken.substring(formData.authToken.length - 4),
        phoneNumber: formData.phoneNumber
      });
      
      // Create the channel in our system without prior verification
      const response = await api.createChannel({
        name: formData.friendlyName || 'WhatsApp Channel',
        type: 'whatsapp',
        credentials: {
          accountSid: formData.accountSid,
          authToken: formData.authToken,
          phoneNumber: formData.phoneNumber
        },
        description: "WhatsApp channel via Twilio"
      });
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to create channel');
      }
      
      setCurrentStep(3);
      toast.success('WhatsApp channel connected successfully!');
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push('/dashboard/channels');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while connecting channel');
      toast.error('Failed to connect channel');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-6 space-y-6 max-w-3xl">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/channels/connect">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Connect WhatsApp Channel</h1>
          <p className="text-muted-foreground">
            Set up WhatsApp messaging for your business
          </p>
        </div>
      </div>

      <div className="mb-6">
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li className={`flex md:w-full items-center ${currentStep >= 1 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
            <span className={`flex items-center justify-center w-6 h-6 mr-2 text-xs border rounded-full shrink-0 ${currentStep >= 1 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'}`}>
              1
            </span>
            Connect Account
            <svg className="w-3 h-3 ml-2 sm:ml-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 5 5 4 5-4"/></svg>
          </li>
          <li className={`flex md:w-full items-center ${currentStep >= 2 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
            <span className={`flex items-center justify-center w-6 h-6 mr-2 text-xs border rounded-full shrink-0 ${currentStep >= 2 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'}`}>
              2
            </span>
            Configure Number
            <svg className="w-3 h-3 ml-2 sm:ml-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 5 5 4 5-4"/></svg>
          </li>
          <li className={`flex items-center ${currentStep >= 3 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
            <span className={`flex items-center justify-center w-6 h-6 mr-2 text-xs border rounded-full shrink-0 ${currentStep >= 3 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'}`}>
              3
            </span>
            Complete
          </li>
        </ol>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="twilio" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span>Twilio</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="twilio" className="mt-4">
          {/* Step 1: Account Connection */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Connect your Twilio Account</CardTitle>
                <CardDescription>
                  Provide your Twilio credentials to connect your WhatsApp Business account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="accountSid">Twilio Account SID</Label>
                  <Input 
                    id="accountSid"
                    name="accountSid"
                    value={formData.accountSid}
                    onChange={handleInputChange}
                    placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    disabled={isLoading || isVerified}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authToken">Twilio Auth Token</Label>
                  <Input 
                    id="authToken"
                    name="authToken"
                    type="password"
                    value={formData.authToken}
                    onChange={handleInputChange}
                    placeholder="Your Twilio Auth Token"
                    disabled={isLoading || isVerified}
                  />
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Where to find these credentials</AlertTitle>
                  <AlertDescription>
                    You can find your Account SID and Auth Token in your 
                    <a 
                      href="https://www.twilio.com/console" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary underline ml-1"
                    >
                      Twilio Console Dashboard
                    </a>.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/channels/connect">Cancel</Link>
                </Button>
                <Button 
                  onClick={handleSkipVerification} 
                  disabled={!formData.accountSid || !formData.authToken || isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Continuing...
                    </>
                  ) : (
                    'Next'
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 2: Phone Number Configuration */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Configure WhatsApp Number</CardTitle>
                <CardDescription>
                  Provide the Twilio phone number you want to use with WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">WhatsApp Phone Number</Label>
                  <Input 
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+1234567890"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the phone number in E.164 format (e.g., +1234567890)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="friendlyName">Channel Name (Optional)</Label>
                  <Input 
                    id="friendlyName"
                    name="friendlyName"
                    value={formData.friendlyName}
                    onChange={handleInputChange}
                    placeholder="My WhatsApp Channel"
                    disabled={isLoading}
                  />
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Webhook Configuration Required</AlertTitle>
                  <AlertDescription className="space-y-2">
                    <p>
                      After connecting, you'll need to configure the following webhook URL in your Twilio account:
                    </p>
                    <div className="text-xs font-mono bg-muted/50 p-2 rounded overflow-x-auto flex justify-between items-center">
                      <span>{`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/webhooks/whatsapp`}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => copyToClipboard(webhookUrl, 'Webhook URL')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Set this URL as the webhook for incoming messages in your Twilio WhatsApp service configuration.
                    </p>
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCurrentStep(1);
                    setIsVerified(false);
                  }}
                >
                  Back
                </Button>
                <Button 
                  onClick={handleConnectChannel} 
                  disabled={!formData.phoneNumber || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    'Connect WhatsApp Channel'
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Completion */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Channel Connected!</CardTitle>
                <CardDescription>
                  Your WhatsApp channel has been successfully connected
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-800 dark:text-green-300">Success</AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    Your WhatsApp channel has been successfully connected. You can now start sending and receiving WhatsApp messages.
                  </AlertDescription>
                </Alert>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Next Steps:</p>
                  <ol className="list-decimal list-inside text-sm space-y-1 pl-2">
                    <li>Configure the webhook URL in your Twilio WhatsApp configuration</li>
                    <li>Set up your message templates in the Twilio console</li>
                    <li>Start sending and receiving WhatsApp messages through OmniChannel</li>
                  </ol>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dashboard/channels">
                    Go to Channels
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
