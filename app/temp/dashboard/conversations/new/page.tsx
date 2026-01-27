"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function NewConversationPage() {
  const [selectedChannel, setSelectedChannel] = useState("email");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock contacts for demonstration
  const recentContacts = [
    { id: "1", name: "Jane Cooper", email: "jane.cooper@example.com", avatar: "/avatars/jane-cooper.png" },
    { id: "2", name: "Robert Fox", email: "robert.fox@example.com", avatar: "/avatars/robert-fox.png" },
    { id: "3", name: "Leslie Alexander", email: "leslie@example.com", avatar: "/avatars/leslie-alexander.png" },
  ];

  const getPlaceholder = () => {
    switch (selectedChannel) {
      case "email": return "Email address";
      case "sms": 
      case "whatsapp": return "Phone number";
      case "facebook": return "Facebook username";
      default: return "Recipient";
    }
  };

  const handleStartConversation = () => {
    // In a real application, this would send the message through the selected channel
    // and then redirect to the conversation thread
    window.location.href = "/dashboard/conversations";
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/conversations">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">New Conversation</h1>
          <p className="text-muted-foreground">Start a new conversation with a customer</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Message Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="channel">Channel</Label>
              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger id="channel">
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="facebook">Facebook Messenger</SelectItem>
                  <SelectItem value="web">Web Chat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input 
                id="recipient" 
                placeholder={getPlaceholder()} 
                value={recipient}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
              />
            </div>

            {selectedChannel === "email" && (
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="Email subject" 
                  value={subject}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Type your message here..." 
                rows={6}
                value={message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard/conversations">
                Cancel
              </Link>
            </Button>
            <Button onClick={handleStartConversation} disabled={!recipient || !message}>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Contacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="Search contacts..." 
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
            
            <div className="space-y-2">
              {recentContacts.map(contact => (
                <div 
                  key={contact.id}
                  className="flex items-center p-2 rounded-md hover:bg-accent cursor-pointer"
                  onClick={() => setRecipient(contact.email)}
                >
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{contact.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{contact.email}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              New Contact
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
