"use client";

import { useState } from "react";
import { 
  User, Bell, Shield, CreditCard, Users, Building, Key, Palette, 
  Save, Mail, Phone, Globe, Check, Plus, Trash, Edit, ExternalLink, 
  MoreHorizontal
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <div className="bg-card border rounded-lg p-1">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile" onClick={() => setActiveTab("profile")}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" onClick={() => setActiveTab("notifications")}>
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" onClick={() => setActiveTab("security")}>
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" onClick={() => setActiveTab("billing")}>
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="team" onClick={() => setActiveTab("team")}>
              <Users className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger value="appearance" onClick={() => setActiveTab("appearance")}>
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your profile information and contact details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" defaultValue="Administrator" disabled />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>
                    Configure your account preferences and regional settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="America/New_York">
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en-US">
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="en-GB">English (UK)</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="MM/DD/YYYY">
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time-format">Time Format</Label>
                      <Select defaultValue="12h">
                        <SelectTrigger>
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                          <SelectItem value="24h">24-hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Photo</CardTitle>
                  <CardDescription>
                    Upload or update your profile picture.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/avatars/placeholder.png" />
                    <AvatarFallback className="text-xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Change</Button>
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose which notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  {[
                    { id: "new-message", label: "New messages from customers" },
                    { id: "assignment", label: "Conversation assignments" },
                    { id: "channel-alert", label: "Channel connectivity alerts" },
                    { id: "analytics", label: "Weekly analytics reports" },
                    { id: "account", label: "Account security alerts" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="flex-1">{item.label}</Label>
                      <Switch id={item.id} defaultChecked={item.id !== "analytics"} />
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">In-App Notifications</h3>
                <div className="space-y-2">
                  {[
                    { id: "in-new-message", label: "New messages" },
                    { id: "in-mention", label: "Mentions and replies" },
                    { id: "in-assignment", label: "Assignment changes" },
                    { id: "in-system", label: "System notifications" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="flex-1">{item.label}</Label>
                      <Switch id={item.id} defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Push Notifications</h3>
                <div className="space-y-2">
                  {[
                    { id: "push-new-message", label: "New messages when app is closed" },
                    { id: "push-assignment", label: "New conversation assignments" },
                    { id: "push-alert", label: "Urgent system alerts" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="flex-1">{item.label}</Label>
                      <Switch id={item.id} defaultChecked={item.id === "push-alert"} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password or enable two-factor authentication.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Key className="h-4 w-4 mr-2" />
                  Update Password
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable 2FA</h4>
                    <p className="text-sm text-muted-foreground">
                      Require a verification code when logging in
                    </p>
                  </div>
                  <Switch id="2fa" />
                </div>
                
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">How it works</h4>
                  <p className="text-sm text-muted-foreground">
                    When enabled, you'll need to enter a verification code from your 
                    authenticator app whenever you sign in to your account.
                  </p>
                  <Button variant="link" className="px-0 py-1 h-auto">
                    Learn more about 2FA
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button disabled>
                  <Shield className="h-4 w-4 mr-2" />
                  Set Up 2FA
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>
                  Manage your currently active sessions across devices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      device: "Chrome on Windows", 
                      ip: "192.168.1.1", 
                      location: "New York, USA", 
                      lastActive: "Now",
                      current: true
                    },
                    { 
                      device: "Safari on iPhone", 
                      ip: "192.168.1.2", 
                      location: "New York, USA", 
                      lastActive: "2 hours ago",
                      current: false
                    }
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h4 className="font-medium">{session.device}</h4>
                          {session.current && (
                            <Badge variant="outline" className="ml-2">Current</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {`${session.ip} • ${session.location} • Last active: ${session.lastActive}`}
                        </div>
                      </div>
                      {!session.current && (
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4 mr-1" />
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your subscription plan and billing information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-semibold text-lg">Professional Plan</h3>
                    <Badge className="ml-2">Current</Badge>
                  </div>
                  <p className="text-muted-foreground">$49/month, billed monthly</p>
                </div>
                <Button variant="outline">
                  Change Plan
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {[
                  { name: "Multi-channel support", included: true },
                  { name: "AI-powered responses", included: true },
                  { name: "Custom knowledge base", included: true },
                  { name: "Analytics dashboard", included: true },
                  { name: "Team collaboration", included: true },
                  { name: "Priority support", included: false },
                  { name: "API access", included: true },
                  { name: "Custom integrations", included: false },
                  { name: "Dedicated account manager", included: false },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Update your billing information and payment method.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-16 bg-muted rounded flex items-center justify-center mr-4">
                    <span className="font-medium">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/25</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
              
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View your past invoices and billing history.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    id: "INV-2025-001", 
                    date: "May 01, 2025", 
                    amount: "$49.00", 
                    status: "Paid" 
                  },
                  { 
                    id: "INV-2025-002", 
                    date: "April 01, 2025", 
                    amount: "$49.00", 
                    status: "Paid" 
                  },
                  { 
                    id: "INV-2025-003", 
                    date: "March 01, 2025", 
                    amount: "$49.00", 
                    status: "Paid" 
                  }
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-b last:border-0">
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{invoice.amount}</p>
                      <Badge variant="outline" className="mt-1">
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Team Settings */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage your team members and their permissions.
                </CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    name: "John Doe", 
                    email: "john.doe@example.com", 
                    role: "Admin", 
                    status: "Active" 
                  },
                  { 
                    name: "Jane Smith", 
                    email: "jane.smith@example.com", 
                    role: "Agent", 
                    status: "Active" 
                  },
                  { 
                    name: "David Johnson", 
                    email: "david.j@example.com", 
                    role: "Agent", 
                    status: "Away" 
                  }
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={member.status === "Active" ? "default" : "outline"}>
                        {member.status}
                      </Badge>
                      <Select defaultValue={member.role}>
                        <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Agent">Agent</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>
                Manage pending team member invitations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    email: "mark.wilson@example.com", 
                    role: "Agent", 
                    sent: "Yesterday",
                    expires: "6 days" 
                  }
                ].map((invite, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{invite.email}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>Sent: {invite.sent}</span>
                        <span className="mx-2">•</span>
                        <span>Expires in: {invite.expires}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{invite.role}</Badge>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Resend
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Customize the appearance of your dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme Mode</Label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "light", name: "Light" },
                    { id: "dark", name: "Dark" },
                    { id: "system", name: "System" }
                  ].map((theme) => (
                    <div
                      key={theme.id}
                      className={`border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors ${
                        theme.id === "light" ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <div className="font-medium">{theme.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Color Scheme</Label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "blue", name: "Blue", color: "bg-blue-500" },
                    { id: "purple", name: "Purple", color: "bg-purple-500" },
                    { id: "green", name: "Green", color: "bg-green-500" },
                    { id: "orange", name: "Orange", color: "bg-orange-500" },
                    { id: "teal", name: "Teal", color: "bg-teal-500" },
                    { id: "red", name: "Red", color: "bg-red-500" }
                  ].map((color) => (
                    <div
                      key={color.id}
                      className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors flex flex-col items-center"
                    >
                      <div className={`w-8 h-8 rounded-full ${color.color} mb-2`}></div>
                      <div className="font-medium">{color.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Layout Density</Label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "compact", name: "Compact" },
                    { id: "comfortable", name: "Comfortable" },
                    { id: "spacious", name: "Spacious" }
                  ].map((density) => (
                    <div
                      key={density.id}
                      className={`border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors ${
                        density.id === "comfortable" ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <div className="font-medium">{density.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Appearance Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
