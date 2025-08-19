import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConversationFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (value: string) => void;
  onNewConversation?: () => void;
  onRefresh?: () => void;
}

export function ConversationFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  onNewConversation,
  onRefresh,
}: ConversationFiltersProps) {
  return (
    <div className="p-3 border-b border-gray-700 space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
        <Input
          placeholder="Search conversations..."
          className="pl-9 h-9 bg-gray-700 border-gray-600 text-white text-sm placeholder-gray-400 focus:bg-gray-600 focus:border-gray-500"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {[
          { key: "all", label: "All" },
          { key: "unread", label: "Unread" },
          { key: "assigned", label: "Mine" },
          { key: "email", label: "Email" },
          { key: "web", label: "Web" },
          { key: "whatsapp", label: "WhatsApp" },
          { key: "facebook", label: "Facebook" },
          { key: "sms", label: "SMS" },
        ].map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? "default" : "ghost"}
            size="sm"
            className={`h-7 px-2 text-xs ${
              activeFilter === filter.key
                ? "bg-gray-600 text-white hover:bg-gray-500"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
