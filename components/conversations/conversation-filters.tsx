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
    <div className="p-3 border-b space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" onClick={onRefresh}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
            <path d="M16 16h5v5"></path>
          </svg>
          <span className="sr-only">Refresh</span>
        </Button>
        <Button onClick={onNewConversation} className="gap-1">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New</span>
        </Button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("all")}
        >
          All
        </Button>
        <Button
          variant={activeFilter === "unread" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("unread")}
        >
          Unread
        </Button>
        <Button
          variant={activeFilter === "assigned" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("assigned")}
        >
          Assigned to me
        </Button>
        <Button
          variant={activeFilter === "unassigned" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("unassigned")}
        >
          Unassigned
        </Button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Button
          variant={activeFilter === "email" ? "default" : "outline"}
          size="sm"
          className="gap-1"
          onClick={() => onFilterChange("email")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          <span>Email</span>
        </Button>
        <Button
          variant={activeFilter === "web" ? "default" : "outline"}
          size="sm"
          className="gap-1"
          onClick={() => onFilterChange("web")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" x2="22" y1="12" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span>Web</span>
        </Button>
        <Button
          variant={activeFilter === "whatsapp" ? "default" : "outline"}
          size="sm"
          className="gap-1"
          onClick={() => onFilterChange("whatsapp")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <path d="M21 12a9 9 0 0 1-18 0 9 9 0 0 1 18 0Z"></path>
            <path d="M8 12h.01"></path>
            <path d="M12 12h.01"></path>
            <path d="M16 12h.01"></path>
          </svg>
          <span>WhatsApp</span>
        </Button>
        <Button
          variant={activeFilter === "facebook" ? "default" : "outline"}
          size="sm"
          className="gap-1"
          onClick={() => onFilterChange("facebook")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
          <span>Facebook</span>
        </Button>
        <Button
          variant={activeFilter === "sms" ? "default" : "outline"}
          size="sm"
          className="gap-1"
          onClick={() => onFilterChange("sms")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>SMS</span>
        </Button>
      </div>
    </div>
  );
}
