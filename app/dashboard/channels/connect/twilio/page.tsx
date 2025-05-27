"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
// Dashboard layout is provided by the parent layout.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Copy, ExternalLink, Info, MessageSquare, AlertCircle, Loader2, Smartphone } from "lucide-react"
import { toast } from "sonner"
import api from "@/lib/api"

export default function TwilioConnectPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [credentials, setCredentials] = useState({
    accountSid: "",
    authToken: "",
    phoneNumber: "",
    friendlyName: "WhatsApp Channel"
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  
  // Get dynamic webhook URL based on environment
  const webhookUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/webhooks/whatsapp`
  
  // Clear any errors when inputs change
  useEffect(() => {
    if (error) setError(null);
  }, [credentials])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  const handleVerifyCredentials = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!credentials.accountSid || !credentials.authToken) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Verify the credentials with Twilio
      const response = await api.verifyChannelCredentials({
        type: 'whatsapp',
        credentials: {
          accountSid: credentials.accountSid,
          authToken: credentials.authToken
        }
      })
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to verify credentials')
      }
      
      setIsVerified(true)
      setStep(2)
      toast.success('Twilio credentials verified successfully!')
    } catch (err: any) {
      setError(err.message || 'An error occurred while verifying credentials')
      toast.error('Failed to verify credentials')
    } finally {
      setLoading(false)
    }
  }
  
  const handleConnectChannel = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!credentials.phoneNumber) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Create the channel in our system
      const response = await api.createChannel({
        name: credentials.friendlyName,
        type: 'whatsapp',
        credentials: {
          accountSid: credentials.accountSid,
          authToken: credentials.authToken,
          phoneNumber: credentials.phoneNumber
        },
        description: "WhatsApp channel via Twilio"
      })
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to create channel')
      }
      
      setStep(3)
      toast.success('WhatsApp channel connected successfully!')
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push('/dashboard/channels')
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'An error occurred while connecting channel')
      toast.error('Failed to connect channel')
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="flex flex-col gap-6 max-w-3xl mx-auto bg-white dark:bg-background p-4 sm:p-6 rounded-lg">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/channels/connect">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Connect WhatsApp</h1>
            <p className="text-muted-foreground">
              Set up WhatsApp Business messaging via Twilio
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 py-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            1
          </div>
          <div className={`h-0.5 flex-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            2
          </div>
          <div className={`h-0.5 flex-1 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            3
          </div>
        </div>

        {step === 1 && (
          <Card className="animate-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>Twilio Account Information</CardTitle>
                  <CardDescription>
                    Enter your Twilio credentials to connect your WhatsApp Business channel
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form id="credentials-form" onSubmit={handleVerifyCredentials}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="accountSid" className="block text-sm font-medium">
                      Account SID
                    </label>
                    <input
                      id="accountSid"
                      name="accountSid"
                      type="text"
                      required
                      value={credentials.accountSid}
                      onChange={handleInputChange}
                      placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Find this in your Twilio Console Dashboard
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="authToken" className="block text-sm font-medium">
                      Auth Token
                    </label>
                    <input
                      id="authToken"
                      name="authToken"
                      type="password"
                      required
                      value={credentials.authToken}
                      onChange={handleInputChange}
                      placeholder="Your Twilio Auth Token"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Find this in your Twilio Console Dashboard
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium">
                      Twilio Phone Number
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      required
                      value={credentials.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+1234567890"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Your Twilio phone number with WhatsApp Business capabilities
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg flex gap-3 items-start">
                    <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">Don't have a Twilio account?</p>
                      <p className="text-sm text-muted-foreground">
                        Sign up on <a href="https://www.twilio.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Twilio's website</a> to get started. You'll need to set up WhatsApp Business through Twilio to use this service.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                form="credentials-form" 
                className="w-full" 
                disabled={!credentials.accountSid || !credentials.authToken || loading}
              >
                {loading ? (
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

        {step === 2 && (
          <Card className="animate-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle>Configure WhatsApp</CardTitle>
                  <CardDescription>
                    Configure your Twilio WhatsApp webhook and phone number
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Alert variant="default" className="bg-green-500/10 text-green-500 border-green-500/20 mb-4">
                <CheckCircle2 className="h-4 w-4" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle>WhatsApp Connected!</CardTitle>
                    <CardDescription>
                      Your WhatsApp Business channel has been successfully connected
                    </CardDescription>
                  </div>
                </div>
              </Alert>
              
              <form id="webhook-form" onSubmit={handleConnectChannel}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Webhook URL
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button asChild>
                        <Link href="/dashboard/channels">
                          View All Channels
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/dashboard/conversations">
                          View Conversations
                        </Link>
                      </Button>
                    </div>
                    <input
                      type="text"
                      readOnly
                      value={webhookUrl}
                      className="w-full px-3 py-2 border rounded-l-md bg-muted/30 focus:outline-none"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-l-none"
                      onClick={() => copyToClipboard(webhookUrl, "Webhook URL")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <p className="text-sm text-muted-foreground text-center max-w-md mx-auto mb-6">
                      You have successfully connected WhatsApp to your account. You can now send and receive WhatsApp messages through this channel. The channel name is "{credentials.friendlyName}".
                    </p>
                  </div>

                  <div className="space-y-2 mt-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium">
                      WhatsApp Phone Number
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      required
                      value={credentials.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+1234567890"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter your Twilio phone number with WhatsApp capabilities
                    </p>
                  </div>

                  <div className="space-y-2 mt-4">
                    <label htmlFor="friendlyName" className="block text-sm font-medium">
                      Channel Name (Optional)
                    </label>
                    <input
                      id="friendlyName"
                      name="friendlyName"
                      type="text"
                      value={credentials.friendlyName}
                      onChange={handleInputChange}
                      placeholder="e.g. Business WhatsApp"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      A friendly name to identify this channel in your dashboard
                    </p>
                  </div>
                  
                  <div className="space-y-2 mt-6">
                    <p className="text-sm font-medium">Instructions:</p>
                    <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                      <li className="flex gap-2">
                        <span className="bg-primary/10 text-primary font-medium w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs">1</span> 
                        <span>Log in to your <a href="https://www.twilio.com/console" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">Twilio Console <ExternalLink className="h-3 w-3 ml-1" /></a></span>
                      </li>
                      <li className="flex gap-2">
                        <span className="bg-primary/10 text-primary font-medium w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs">2</span> 
                        <span>Navigate to Messaging → Try it out → Send a WhatsApp message</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="bg-primary/10 text-primary font-medium w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs">3</span> 
                        <span>Go to the "Sandbox Settings" section</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="bg-primary/10 text-primary font-medium w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs">4</span> 
                        <span>In the "When a message comes in" field, paste the webhook URL above</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="bg-primary/10 text-primary font-medium w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs">5</span> 
                        <span>Click Save to update your webhook configuration</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="bg-primary/10 text-primary font-medium w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs">6</span> 
                        <span>Follow Twilio's instructions to connect your WhatsApp account to their sandbox</span>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-5 w-5 text-primary" />
                      <p className="text-sm font-medium">Need help?</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Visit the <a href="https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 inline-flex">Twilio documentation <ExternalLink className="h-3 w-3" /></a> for detailed instructions on setting up webhooks.
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" onClick={() => setStep(1)} className="w-full sm:w-auto">
                Back
              </Button>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || !credentials.phoneNumber}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect WhatsApp'
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card className="animate-in">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Connection Successful!</CardTitle>
              <CardDescription>
                Your Twilio SMS channel has been connected successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="bg-muted/30 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Twilio SMS</p>
                      <ol className="text-sm text-muted-foreground mt-2 space-y-2">
                        <li className="flex gap-2">
                          <span className="bg-primary/10 text-primary font-medium w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs">1</span> 
                          <span>Log in to your <a href="https://www.twilio.com/console" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">Twilio Console <ExternalLink className="h-3 w-3 ml-1" /></a></span>
                        </li>
                        <li className="flex gap-2">
                          <span className="bg-primary/10 text-primary font-medium w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs">2</span> 
                          <span>Navigate to Messaging → Try it out → Send a WhatsApp message</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="bg-primary/10 text-primary font-medium w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs">3</span> 
                          <span>Go to the "Sandbox Settings" section</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="bg-primary/10 text-primary font-medium w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs">4</span> 
                          <span>In the "When a message comes in" field, paste the webhook URL above</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="bg-primary/10 text-primary font-medium w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs">5</span> 
                          <span>Click Save to update your webhook configuration</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="bg-primary/10 text-primary font-medium w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs">6</span> 
                          <span>Follow Twilio's instructions to connect your WhatsApp account to their sandbox</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs bg-green-500/10 text-green-500 py-1 px-2 rounded-full font-medium">
                    <CheckCircle2 className="h-3 w-3" />
                    Active
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">What's next?</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Send a test message to your Twilio number to verify everything is working</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Customize your AI persona in Settings to optimize responses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Upload documents to your Knowledge Base to help the AI provide more accurate responses</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="space-x-3">
                <Button asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/channels">View All Channels</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
  )
}
