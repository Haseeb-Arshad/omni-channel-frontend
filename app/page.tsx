import Link from "next/link";
import Image from "next/image";
import { MessageSquare, MessageCircle, BrainCircuit, Upload, Bot, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: "Omnichannel Communication",
    description: "Connect with customers across multiple channels including SMS, WhatsApp, Telegram, and more - all in one place.",
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: "AI-Powered Assistance",
    description: "Leverage cutting-edge AI models to provide intelligent responses and automate customer interactions.",
  },
  {
    icon: <Upload className="h-10 w-10 text-primary" />,
    title: "Knowledge Base Management",
    description: "Upload and manage documents that your AI can reference to provide accurate and contextual responses.",
  },
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: "Custom AI Personas",
    description: "Create AI personas with specific tones, styling choices, and system prompts to match your brand identity.",
  },
];

const channels = [
  {
    name: "Twilio SMS",
    icon: "/icons/twilio.svg",
    description: "Connect your Twilio account to handle SMS conversations.",
    available: true,
  },
  {
    name: "WhatsApp",
    icon: "/icons/whatsapp.svg",
    description: "Integrate with WhatsApp to engage with customers.",
    available: false,
    comingSoon: true,
  },
  {
    name: "Telegram",
    icon: "/icons/telegram.svg",
    description: "Add Telegram support for real-time messaging.",
    available: false,
    comingSoon: true,
  },
  {
    name: "Slack",
    icon: "/icons/slack.svg",
    description: "Connect to Slack for team collaborations.",
    available: false,
    comingSoon: true,
  },
];

export default function Home() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 px-4">
        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="flex flex-col gap-6 animate-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">OmniChannel</span> Communication with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">AI</span> Assistance
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect all your communication channels in one place and enhance customer interactions with AI-powered assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="micro-interaction">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    Get Started
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="micro-interaction">
                  <Link href="/docs" className="flex items-center gap-2">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-indigo-500/20 rounded-3xl blur-2xl -z-10"></div>
              <div className="glass-morphism rounded-3xl p-6 shadow-xl animate-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Customer Support</h3>
                    <p className="text-xs text-muted-foreground">Twilio SMS Channel</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs">JD</span>
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-none p-3 text-sm max-w-[80%]">
                      <p>Hi, I recently ordered your product but haven't received a shipping confirmation yet. Can you help?</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary/10 rounded-2xl rounded-tr-none p-3 text-sm max-w-[80%]">
                      <p>I'd be happy to help with your order! I'll look up your shipping status. Could you please provide your order number?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs">JD</span>
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-none p-3 text-sm max-w-[80%]">
                      <p>Sure, it's ORD-12345678.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary/10 rounded-2xl rounded-tr-none p-3 text-sm max-w-[80%]">
                      <p>Thanks! I found your order ORD-12345678. Your package was shipped yesterday and is expected to arrive on May 24th. You should receive the tracking information in your email shortly.</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to streamline communication and enhance customer interactions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="micro-interaction animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <CardHeader>
                  <div className="mb-4 p-2 w-fit rounded-xl bg-primary/10">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Channels Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect Your Channels</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Seamlessly integrate with multiple communication platforms
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {channels.map((channel, i) => (
              <Card key={i} className={`relative overflow-hidden micro-interaction animate-in ${!channel.available ? 'opacity-70' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
                {channel.comingSoon && (
                  <div className="absolute top-3 right-3 bg-primary/20 text-primary text-xs py-1 px-2 rounded-full">
                    Coming Soon
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                      {/* Placeholder for channel icon */}
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{channel.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{channel.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant={channel.available ? "default" : "outline"} className="w-full" disabled={!channel.available}>
                    {channel.available ? "Connect" : "Coming Soon"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <Card className="p-8 gradient-border overflow-hidden animate-in">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-indigo-500/10 rounded-3xl blur-3xl -z-10"></div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your customer communication?</h2>
                <p className="text-xl text-muted-foreground mb-6">
                  Get started with OmniChannel today and experience the power of AI-assisted communication.
                </p>
                <Button size="lg" className="micro-interaction">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Get Started for Free
                  </Link>
                </Button>
              </div>
              <div className="relative p-4">
                <div className="glass-morphism rounded-xl p-6 backdrop-blur-lg shadow-xl">
                  <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <h3 className="font-medium">Connection Status</h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-sm">Active</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <MessageCircle className="h-4 w-4 text-primary" />
                        </div>
                        <span>Twilio SMS</span>
                      </div>
                      <div className="text-sm text-green-500">Connected</div>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <BrainCircuit className="h-4 w-4" />
                        </div>
                        <span>Knowledge Base</span>
                      </div>
                      <div className="text-sm text-green-500">3 Documents</div>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <Bot className="h-4 w-4" />
                        </div>
                        <span>AI Persona</span>
                      </div>
                      <div className="text-sm text-green-500">Active</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </>
  );
}
