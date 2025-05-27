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
    <div className="w-full md:w-80 border-l flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-medium">Customer Details</h3>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>

      <div className="p-4 overflow-y-auto flex-1">
        <div className="flex flex-col items-center text-center mb-6">
          <Avatar className="h-16 w-16 mb-3">
            <AvatarImage src={conversation.contact.avatar} alt={conversation.contact.name} />
            <AvatarFallback>{conversation.contact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="font-medium">{conversation.contact.name}</h3>
          <p className="text-sm text-muted-foreground">
            {conversation.channel.charAt(0).toUpperCase() + conversation.channel.slice(1)}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Contact Information</h4>
            <div className="space-y-2">
              <div className="grid grid-cols-3 items-center gap-2">
                <span className="text-sm text-muted-foreground">Email</span>
                <Input
                  value={conversation.contact.email}
                  readOnly
                  className="col-span-2 h-8 text-sm"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <span className="text-sm text-muted-foreground">Phone</span>
                <Input
                  value={conversation.contact.phone}
                  readOnly
                  className="col-span-2 h-8 text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Conversation</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Channel</span>
                <span className="font-medium flex items-center">
                  {getChannelIcon(conversation.channel)}
                  <span className="ml-1 capitalize">{conversation.channel}</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">First Contact</span>
                <span className="font-medium">
                  {new Date(conversation.history[0].timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Messages</span>
                <span className="font-medium">{conversation.history.length}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Tags</h4>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                <Plus className="h-3 w-3" />
                <span className="sr-only">Add tag</span>
              </Button>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs">
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1.5 rounded-full bg-background/50 hover:bg-background/80 transition-colors h-3.5 w-3.5 flex items-center justify-center"
                  >
                    <X className="h-2.5 w-2.5" />
                    <span className="sr-only">Remove tag</span>
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Add a tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              className="h-8 text-sm"
            />
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Assignment</h4>
            <Select value={assignedTo} onValueChange={setAssignedTo}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Unassigned" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="john.doe@example.com">John Doe</SelectItem>
                <SelectItem value="jane.smith@example.com">Jane Smith</SelectItem>
                <SelectItem value="alex.wong@example.com">Alex Wong</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Notes</h4>
            <Textarea
              placeholder="Add notes about this customer..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[100px] text-sm"
            />
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <Button variant="outline" className="w-full">
          View Full Profile
        </Button>
      </div>
    </div>
  );
}
