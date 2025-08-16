"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  X, 
  Filter, 
  Check, 
  Globe, 
  MessageCircle, 
  Mail, 
  Phone,
  MessageSquare,
  Inbox,
  User,
  Users,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface FilterOption {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
  count: number;
}

interface ChannelOption {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilters: string[];
  onFiltersChange: (filters: string[]) => void;
  selectedChannel: string;
  onChannelChange: (channel: string) => void;
  filterOptions: FilterOption[];
  channelOptions: ChannelOption[];
}

export const SearchAndFilters = ({
  searchQuery,
  onSearchChange,
  activeFilters,
  onFiltersChange,
  selectedChannel,
  onChannelChange,
  filterOptions,
  channelOptions
}: SearchAndFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterToggle = (filterValue: string) => {
    if (filterValue === "all") {
      onFiltersChange(["all"]);
    } else {
      const newFilters = activeFilters.filter(f => f !== "all");
      if (newFilters.includes(filterValue)) {
        const updated = newFilters.filter(f => f !== filterValue);
        onFiltersChange(updated.length === 0 ? ["all"] : updated);
      } else {
        onFiltersChange([...newFilters, filterValue]);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Enhanced Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by name, message, email, or tags..."
          className="pl-10 pr-4 bg-gray-50/50 border-gray-200 rounded-xl focus:bg-white transition-colors"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </div>

      {/* Advanced Filters */}
      <div className="space-y-3">
        {/* Channel Filter */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-700">Channel</span>
          <Select value={selectedChannel} onValueChange={onChannelChange}>
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {channelOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center space-x-2">
                    <option.icon className="h-3 w-3" />
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Multi-select Status Filters */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700">Filters</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Filter className="h-3 w-3 inline mr-1" />
              {activeFilters.length > 1 || !activeFilters.includes("all") 
                ? `${activeFilters.filter(f => f !== "all").length} active` 
                : "None"
              }
            </motion.button>
          </div>
          
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2 bg-gray-50 rounded-lg p-3"
              >
                {filterOptions.map((option) => {
                  const isActive = activeFilters.includes(option.value);
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => handleFilterToggle(option.value)}
                      className={`w-full flex items-center justify-between p-2 rounded-md text-xs transition-all duration-200 ${
                        isActive 
                          ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-2">
                        <option.icon className="h-3 w-3" />
                        <span>{option.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs h-5 px-1.5">
                          {option.count}
                        </Badge>
                        {isActive && <Check className="h-3 w-3" />}
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Active Filter Tags */}
        <AnimatePresence>
          {(activeFilters.length > 1 || !activeFilters.includes("all")) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap gap-1"
            >
              {activeFilters.filter(f => f !== "all").map((filter) => {
                const option = filterOptions.find(o => o.value === filter);
                return (
                  <motion.div
                    key={filter}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs"
                  >
                    {option && <option.icon className="h-3 w-3" />}
                    <span>{option?.label}</span>
                    <button
                      onClick={() => handleFilterToggle(filter)}
                      className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-2 w-2" />
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Default filter and channel options
export const defaultFilterOptions: FilterOption[] = [
  { value: "all", label: "All Conversations", icon: MessageSquare, count: 0 },
  { value: "unread", label: "Unread", icon: Inbox, count: 0 },
  { value: "assigned", label: "Assigned to Me", icon: User, count: 0 },
  { value: "unassigned", label: "Unassigned", icon: Users, count: 0 },
  { value: "high_priority", label: "High Priority", icon: AlertCircle, count: 0 },
  { value: "resolved", label: "Resolved", icon: CheckCircle2, count: 0 },
];

export const defaultChannelOptions: ChannelOption[] = [
  { value: "all", label: "All Channels", icon: Globe },
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { value: "email", label: "Email", icon: Mail },
  { value: "sms", label: "SMS", icon: Phone },
  { value: "voice", label: "Voice", icon: Phone },
];