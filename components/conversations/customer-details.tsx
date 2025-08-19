import { useState } from "react";
import { Conversation } from "@/types/conversation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { getChannelIcon } from "@/lib/utils";

interface CustomerDetailsProps {
  conversation: Conversation | null;
  onClose?: () => void;
}

export function CustomerDetails({ conversation, onClose }: CustomerDetailsProps) {
  const [tags, setTags] = useState<string[]>(conversation?.tags || []);
  const [newTag, setNewTag] = useState("");
  const [note, setNote] = useState("");
  const [assignedTo, setAssignedTo] = useState(conversation?.assignedTo || "");

  if (!conversation) {
    return null;
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full md:w-80 flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h3 className="font-medium text-white text-sm">Contact Info</h3>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>

      <div className="p-4 overflow-y-auto flex-1 space-y-4">
        <div className="text-center">
          <Avatar className="h-12 w-12 mx-auto mb-2">
            <AvatarImage src={conversation.contact.avatar} alt={conversation.contact.name} />
            <AvatarFallback className="bg-gray-600 text-white">{conversation.contact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="font-medium text-white text-sm">{conversation.contact.name}</h3>
          <p className="text-xs text-gray-400">
            {conversation.channel.charAt(0).toUpperCase() + conversation.channel.slice(1)}
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-medium text-gray-300 mb-2">Contact</h4>
            <div className="space-y-1.5 text-xs">
              {conversation.contact.email && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="text-gray-200">{conversation.contact.email}</span>
                </div>
              )}
              {conversation.contact.phone && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone</span>
                  <span className="text-gray-200">{conversation.contact.phone}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-gray-300 mb-2">Details</h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Channel</span>
                <span className="text-gray-200 flex items-center">
                  {(() => { const Icon = getChannelIcon(conversation.channel); return <Icon className="h-3 w-3 mr-1" />; })()}
                  {conversation.channel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Messages</span>
                <span className="text-gray-200">{conversation.history.length}</span>
              </div>
            </div>
          </div>

          {(conversation as any).tags && (conversation as any).tags.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-gray-300 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {(conversation as any).tags.map((tag: string) => (
                  <Badge key={tag} className="bg-gray-700 text-gray-200 text-xs px-2 py-0.5 border-0">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
