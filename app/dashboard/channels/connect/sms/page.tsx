"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, Check, Info, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
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

export default function ConnectSmsPage() {
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
    friendlyName: "SMS Channel"
  });
  
  // Clear any errors when inputs change
  useEffect(() => {
    if (error) setError(null);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVerify = async () => {
    if (!formData.accountSid || !formData.authToken) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Verify the credentials with Twilio
      const response = await api.verifyChannelCredentials({
        type: 'sms',
        credentials: {
          accountSid: formData.accountSid,
          authToken: formData.authToken
        }
      });
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to verify credentials');
      }
      
      setIsVerified(true);
      setCurrentStep(2);
      toast.success('Twilio credentials verified successfully!');
    } catch (err: any) {
      setError(err.message || 'An error occurred while verifying credentials');
      toast.error('Failed to verify credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectChannel = async () => {
    if (!formData.phoneNumber) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Create the channel in our system
      const response = await api.createChannel({
        name: formData.friendlyName,
        type: 'sms',
        credentials: {
          accountSid: formData.accountSid,
          authToken: formData.authToken,
          phoneNumber: formData.phoneNumber
        },
        description: "SMS channel via Twilio"
      });
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to create channel');
      }
      
      setCurrentStep(3);
      toast.success('SMS channel connected successfully!');
      
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
    <div className="container py-6 space-y-6 max-w-3xl bg-white dark:bg-background">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/channels/connect">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Connect SMS Channel</h1>
          <p className="text-muted-foreground">
            Set up SMS messaging for your business
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

      <Tabs defaultValue="twilio" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-1">
          <TabsTrigger value="twilio" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Twilio SMS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="twilio" className="mt-6">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Connect Twilio Account</CardTitle>
                <CardDescription>
                  Enter your Twilio credentials to connect your SMS channel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <Alert variant="default" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  <Info className="h-4 w-4" />
                  <AlertTitle>How to get your Twilio credentials</AlertTitle>
                  <AlertDescription className="mt-2 text-sm">
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Sign in to your Twilio account or <a href="https://www.twilio.com/try-twilio" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">create a new one</a></li>
                      <li>Go to your Twilio Dashboard</li>
                      <li>Find your Account SID and Auth Token under "Account Info"</li>
                    </ol>
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="accountSid">Account SID</Label>
                  <Input 
                    id="accountSid" 
                    name="accountSid"
                    placeholder="Enter your Account SID" 
                    value={formData.accountSid}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authToken">Auth Token</Label>
                  <Input 
                    id="authToken" 
                    name="authToken"
                    type="password" 
                    placeholder="Enter your Auth Token" 
                    value={formData.authToken}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="friendlyName">Channel Name (Optional)</Label>
                  <Input 
                    id="friendlyName" 
                    name="friendlyName"
                    placeholder="e.g. Customer Support SMS" 
                    value={formData.friendlyName}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    A friendly name to identify this channel in your dashboard
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/channels/connect">
                    Cancel
                  </Link>
                </Button>
                <Button 
                  onClick={handleVerify} 
                  disabled={!formData.accountSid || !formData.authToken || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify Credentials'
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Configure Phone Number</CardTitle>
                <CardDescription>
                  Choose a phone number to use for your SMS channel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Credentials verified successfully!</AlertTitle>
                  <AlertDescription>
                    Your Twilio account has been successfully connected.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input 
                    id="phoneNumber" 
                    name="phoneNumber"
                    placeholder="+1234567890" 
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter a Twilio phone number from your account. Make sure it's formatted with the country code (e.g., +1 for US).
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg mt-6">
                  <h4 className="text-sm font-medium mb-2">Webhook Configuration</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    After connecting, you'll need to configure the following webhook URL in your Twilio account:
                  </p>
                  <div className="text-xs font-mono bg-muted/50 p-2 rounded overflow-x-auto">
                    {`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/webhooks/sms`}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Set this URL as the webhook for incoming messages in your Twilio SMS service configuration.
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-md mt-4">
                  <h4 className="text-sm font-medium mb-2">Don't have a Twilio phone number?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    You can purchase a new phone number directly from your Twilio account:
                  </p>
                  <ol className="list-decimal pl-4 text-sm space-y-1 text-muted-foreground">
                    <li>Go to your Twilio Console</li>
                    <li>Navigate to "Phone Numbers" → "Buy a Number"</li>
                    <li>Select a number with SMS capabilities</li>
                    <li>Complete the purchase and enter it above</li>
                  </ol>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </Button>
                <Button 
                  onClick={handleConnectChannel} 
                  disabled={!formData.phoneNumber || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    'Connect Channel'
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Channel Connected Successfully!</CardTitle>
                <CardDescription>
                  Your SMS channel has been set up and is ready to use
                </CardDescription>
              </CardHeader>
              <CardContent className="py-6">
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">All Set!</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Your SMS channel "{formData.friendlyName}" has been successfully connected. You can now start sending and receiving SMS messages through this channel.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild>
                      <Link href="/dashboard/channels">
                        View All Channels
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/dashboard/channels/1/settings`}>
                        Configure Channel Settings
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
