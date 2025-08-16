"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Modal } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Loader2, 
  Phone, 
  Smartphone, 
  Mail, 
  Facebook, 
  Globe,
  AlertCircle,
  CheckCircle2,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import api from "@/lib/api"

// Channel types
export type ChannelType = 'sms' | 'whatsapp' | 'email' | 'facebook' | 'web'

// Channel configuration
const channelConfigs = {
  sms: {
    name: "SMS",
    icon: Phone,
    description: "Connect via Twilio to send and receive SMS messages",
    color: "from-blue-500 to-blue-600",
    steps: ["Select Channel", "Configure Credentials", "Test Connection", "Complete Setup"]
  },
  whatsapp: {
    name: "WhatsApp",
    icon: Smartphone,
    description: "Connect your WhatsApp Business account via Twilio",
    color: "from-green-500 to-green-600",
    steps: ["Select Channel", "Configure Credentials", "Test Connection", "Complete Setup"]
  },
  email: {
    name: "Email",
    icon: Mail,
    description: "Connect your business email to manage customer conversations",
    color: "from-purple-500 to-purple-600",
    steps: ["Select Channel", "Configure SMTP", "Test Connection", "Complete Setup"]
  },
  facebook: {
    name: "Facebook Messenger",
    icon: Facebook,
    description: "Connect your Facebook Page to manage Messenger conversations",
    color: "from-blue-600 to-blue-700",
    steps: ["Select Channel", "Facebook OAuth", "Select Page", "Complete Setup"]
  },
  web: {
    name: "Web Chat",
    icon: Globe,
    description: "Add a customizable chat widget to your website",
    color: "from-indigo-500 to-indigo-600",
    steps: ["Select Channel", "Customize Widget", "Generate Code", "Complete Setup"]
  }
}

// Form data interface
interface ChannelFormData {
  name: string
  type: ChannelType
  credentials: {
    accountSid?: string
    authToken?: string
    phoneNumber?: string
    smtpHost?: string
    smtpPort?: string
    smtpUser?: string
    smtpPassword?: string
    fromEmail?: string
    pageId?: string
    accessToken?: string
    widgetColor?: string
    widgetPosition?: string
  }
}

// Step component props
interface StepProps {
  formData: ChannelFormData
  setFormData: (data: ChannelFormData) => void
  onNext: () => void
  onPrev: () => void
  isLoading: boolean
}

// Step 1: Channel Selection
const ChannelSelectionStep = ({ formData, setFormData, onNext }: StepProps) => {
  const availableChannels: ChannelType[] = ['sms', 'whatsapp', 'email', 'facebook', 'web']

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-charcoal-900 mb-2">Choose Your Channel</h2>
        <p className="text-charcoal-600">Select the communication channel you want to connect</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {availableChannels.map((channelType) => {
          const config = channelConfigs[channelType]
          const IconComponent = config.icon
          const isSelected = formData.type === channelType
          const isAvailable = channelType === 'sms' || channelType === 'whatsapp'

          return (
            <motion.div
              key={channelType}
              whileHover={{ scale: isAvailable ? 1.02 : 1 }}
              whileTap={{ scale: isAvailable ? 0.98 : 1 }}
            >
              <Card 
                className={cn(
                  "cursor-pointer transition-all duration-300 border-2",
                  isSelected 
                    ? "border-accent-blue bg-accent-blue/5" 
                    : "border-charcoal-200 hover:border-charcoal-300",
                  !isAvailable && "opacity-60 cursor-not-allowed"
                )}
                onClick={() => {
                  if (isAvailable) {
                    setFormData({ ...formData, type: channelType })
                  }
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-white",
                        `bg-gradient-to-r ${config.color}`
                      )}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{config.name}</CardTitle>
                        {!isAvailable && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-accent-blue" />
                      </motion.div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-charcoal-600">{config.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          disabled={!formData.type}
          className="bg-gradient-to-r from-accent-blue to-accent-purple text-white"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

// Step 2: Credentials Configuration
const CredentialsStep = ({ formData, setFormData, onNext, onPrev, isLoading }: StepProps) => {
  const config = channelConfigs[formData.type]
  const IconComponent = config.icon

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      credentials: {
        ...formData.credentials,
        [field]: value
      }
    })
  }

  const renderCredentialsForm = () => {
    switch (formData.type) {
      case 'sms':
      case 'whatsapp':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountSid">Twilio Account SID</Label>
              <Input
                id="accountSid"
                placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                value={formData.credentials.accountSid || ''}
                onChange={(e) => handleInputChange('accountSid', e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-charcoal-500">Find this on your Twilio Console Dashboard</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="authToken">Twilio Auth Token</Label>
              <Input
                id="authToken"
                type="password"
                placeholder="Your Twilio Auth Token"
                value={formData.credentials.authToken || ''}
                onChange={(e) => handleInputChange('authToken', e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-charcoal-500">Find this on your Twilio Console Dashboard</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Twilio Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="+1234567890"
                value={formData.credentials.phoneNumber || ''}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-charcoal-500">
                {formData.type === 'sms' 
                  ? "The Twilio phone number you want to use for SMS" 
                  : "The Twilio phone number with WhatsApp capability"}
              </p>
            </div>
          </div>
        )
      
      case 'email':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                placeholder="smtp.gmail.com"
                value={formData.credentials.smtpHost || ''}
                onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                placeholder="587"
                value={formData.credentials.smtpPort || ''}
                onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fromEmail">From Email</Label>
              <Input
                id="fromEmail"
                type="email"
                placeholder="support@yourcompany.com"
                value={formData.credentials.fromEmail || ''}
                onChange={(e) => handleInputChange('fromEmail', e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        )
      
      default:
        return (
          <div className="text-center py-8">
            <Info className="h-12 w-12 text-charcoal-400 mx-auto mb-4" />
            <p className="text-charcoal-600">Configuration for {config.name} coming soon!</p>
          </div>
        )
    }
  }

  const isFormValid = () => {
    switch (formData.type) {
      case 'sms':
      case 'whatsapp':
        return formData.credentials.accountSid && 
               formData.credentials.authToken && 
               formData.credentials.phoneNumber
      case 'email':
        return formData.credentials.smtpHost && 
               formData.credentials.smtpPort && 
               formData.credentials.fromEmail
      default:
        return false
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className={cn(
          "w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white",
          `bg-gradient-to-r ${config.color}`
        )}>
          <IconComponent className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-charcoal-900 mb-2">Configure {config.name}</h2>
        <p className="text-charcoal-600">Enter your credentials to connect this channel</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          {renderCredentialsForm()}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} disabled={isLoading}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={!isFormValid() || isLoading}
          className="bg-gradient-to-r from-accent-blue to-accent-purple text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              Test Connection
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  )
}

// Step 3: Connection Test
const ConnectionTestStep = ({ formData, onNext, onPrev, isLoading }: StepProps) => {
  const config = channelConfigs[formData.type]
  const IconComponent = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className={cn(
          "w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white",
          `bg-gradient-to-r ${config.color}`
        )}>
          <IconComponent className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-charcoal-900 mb-2">Testing Connection</h2>
        <p className="text-charcoal-600">We're verifying your {config.name} credentials</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-accent-blue" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
              <span className="text-sm">
                {isLoading ? "Verifying credentials..." : "Credentials verified successfully"}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              {isLoading ? (
                <div className="h-5 w-5 rounded-full border-2 border-charcoal-200" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
              <span className="text-sm">
                {isLoading ? "Testing connection..." : "Connection established"}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              {isLoading ? (
                <div className="h-5 w-5 rounded-full border-2 border-charcoal-200" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
              <span className="text-sm">
                {isLoading ? "Configuring webhooks..." : "Webhooks configured"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} disabled={isLoading}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={isLoading}
          className="bg-gradient-to-r from-accent-blue to-accent-purple text-white"
        >
          Complete Setup
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

// Step 4: Completion
const CompletionStep = ({ formData, onPrev }: StepProps) => {
  const config = channelConfigs[formData.type]
  const IconComponent = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-green-500 flex items-center justify-center text-white"
        >
          <Check className="h-8 w-8" />
        </motion.div>
        <h2 className="text-2xl font-bold text-charcoal-900 mb-2">Channel Connected!</h2>
        <p className="text-charcoal-600">Your {config.name} channel is now ready to use</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-charcoal-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-white",
                  `bg-gradient-to-r ${config.color}`
                )}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">{formData.name || config.name}</p>
                  <p className="text-sm text-charcoal-600">{config.description}</p>
                </div>
              </div>
              <Badge variant="success">Connected</Badge>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Next Steps:</h4>
              <ul className="text-sm text-charcoal-600 space-y-1">
                <li>• Your channel is now active and ready to receive messages</li>
                <li>• Configure your AI agent settings in the Agents section</li>
                <li>• Test your setup by sending a message to your channel</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Main Modal Component
interface ChannelConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (channelData: ChannelFormData) => void
  initialChannelType?: ChannelType
}

export const ChannelConnectionModal = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  initialChannelType 
}: ChannelConnectionModalProps) => {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [formData, setFormData] = React.useState<ChannelFormData>({
    name: '',
    type: initialChannelType || 'sms',
    credentials: {}
  })

  const steps = formData.type ? channelConfigs[formData.type].steps : []
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = async () => {
    if (currentStep === 1) {
      // Test connection step
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Here you would make the actual API call to test credentials
        const response = await api.verifyChannelCredentials({
          type: formData.type,
          credentials: formData.credentials
        })

        if (!response.success) {
          throw new Error(response.message || "Failed to verify credentials")
        }

        setCurrentStep(currentStep + 1)
      } catch (error: any) {
        toast.error(error.message || "Failed to test connection")
      } finally {
        setIsLoading(false)
      }
    } else if (currentStep === 2) {
      // Create channel step
      setIsLoading(true)
      try {
        const response = await api.createChannel({
          name: formData.name || channelConfigs[formData.type].name,
          type: formData.type,
          credentials: formData.credentials,
          description: channelConfigs[formData.type].description
        })

        if (!response.success) {
          throw new Error(response.message || "Failed to create channel")
        }

        setCurrentStep(currentStep + 1)
        onSuccess?.(formData)
      } catch (error: any) {
        toast.error(error.message || "Failed to create channel")
      } finally {
        setIsLoading(false)
      }
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    setCurrentStep(Math.max(0, currentStep - 1))
  }

  const handleClose = () => {
    if (currentStep === steps.length - 1) {
      // If on completion step, close and refresh
      onClose()
      window.location.reload()
    } else {
      onClose()
    }
  }

  const renderStep = () => {
    const stepProps = {
      formData,
      setFormData,
      onNext: handleNext,
      onPrev: handlePrev,
      isLoading
    }

    switch (currentStep) {
      case 0:
        return <ChannelSelectionStep {...stepProps} />
      case 1:
        return <CredentialsStep {...stepProps} />
      case 2:
        return <ConnectionTestStep {...stepProps} />
      case 3:
        return <CompletionStep {...stepProps} />
      default:
        return <ChannelSelectionStep {...stepProps} />
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size="lg"
      showClose={currentStep !== steps.length - 1}
      closeOnOverlayClick={currentStep !== steps.length - 1}
    >
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-charcoal-600">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-charcoal-500">
            {steps.map((step, index) => (
              <span 
                key={index}
                className={cn(
                  "transition-colors",
                  index <= currentStep ? "text-accent-blue font-medium" : ""
                )}
              >
                {step}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </Modal>
  )
}