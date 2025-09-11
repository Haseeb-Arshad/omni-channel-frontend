"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  Search,
  Grid3X3,
  List,
  Plus,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Play,
  Pause,
  Users,
  Clock,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  Bot,
  Mic,
  X
} from "lucide-react";
import styles from "./agents.module.css";

// Types
interface Agent {
  id: string;
  name: string;
  type: 'Text' | 'Voice' | 'Hybrid';
  status: 'Live' | 'Draft' | 'Paused' | 'Archived';
  purpose: string;
  owner: string;
  team: string;
  tags: string[];
  channels: string[];
  tools: string[];
  hasCustomVoice: boolean;
  memoryMode: 'Per-user' | 'Global';
  memoryTTL: string;
  knowledgeBase: boolean;
  knowledgeLastIndexed: string;
  conversations: number;
  errors: number;
  voiceMinutes: number;
  lastActive: string;
  isActive: boolean;
  avatar?: string;
}

interface FilterState {
  search: string;
  type: string[];
  status: string[];
  channels: string[];
  tools: string[];
  owner: string;
  hasErrors: boolean;
  timeRange: string;
}

export default function AgentsPage() {
  const router = useRouter();
  
  // View state
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: [],
    status: [],
    channels: [],
    tools: [],
    owner: '',
    hasErrors: false,
    timeRange: '7d'
  });

  // Sample data
  const [agents] = useState<Agent[]>([
    {
      id: 'agent-1',
      name: 'Customer Support',
      type: 'Hybrid',
      status: 'Live',
      purpose: 'Handles customer inquiries, order tracking, and basic troubleshooting',
      owner: 'Sarah Chen',
      team: 'Support',
      tags: ['customer-service', 'orders', 'troubleshooting'],
      channels: ['Web', 'Email', 'WhatsApp'],
      tools: ['CRM', 'Order-Lookup', 'Knowledge-Base'],
      hasCustomVoice: true,
      memoryMode: 'Per-user',
      memoryTTL: '30d',
      knowledgeBase: true,
      knowledgeLastIndexed: '2h ago',
      conversations: 1247,
      errors: 3,
      voiceMinutes: 156,
      lastActive: '5m ago',
      isActive: true
    },
    {
      id: 'agent-2',
      name: 'Sales Assistant',
      type: 'Text',
      status: 'Live',
      purpose: 'Qualifies leads, schedules demos, and provides product information',
      owner: 'Mike Johnson',
      team: 'Sales',
      tags: ['sales', 'lead-qualification', 'demos'],
      channels: ['Web', 'Email'],
      tools: ['CRM', 'Calendar', 'Product-Catalog'],
      hasCustomVoice: false,
      memoryMode: 'Per-user',
      memoryTTL: '90d',
      knowledgeBase: true,
      knowledgeLastIndexed: '1d ago',
      conversations: 892,
      errors: 1,
      voiceMinutes: 0,
      lastActive: '12m ago',
      isActive: true
    },
    {
      id: 'agent-3',
      name: 'Technical Support',
      type: 'Voice',
      status: 'Draft',
      purpose: 'Provides advanced technical support and troubleshooting guidance',
      owner: 'Alex Rivera',
      team: 'Engineering',
      tags: ['technical', 'troubleshooting', 'advanced'],
      channels: ['Phone', 'Web'],
      tools: ['Knowledge-Base', 'Ticketing', 'Remote-Access'],
      hasCustomVoice: true,
      memoryMode: 'Global',
      memoryTTL: '30d',
      knowledgeBase: true,
      knowledgeLastIndexed: '3h ago',
      conversations: 0,
      errors: 0,
      voiceMinutes: 0,
      lastActive: 'Never',
      isActive: false
    },
    {
      id: 'agent-4',
      name: 'HR Assistant',
      type: 'Text',
      status: 'Paused',
      purpose: 'Assists with HR inquiries, policy questions, and employee onboarding',
      owner: 'Lisa Park',
      team: 'HR',
      tags: ['hr', 'policies', 'onboarding'],
      channels: ['Email', 'Slack'],
      tools: ['HR-System', 'Knowledge-Base'],
      hasCustomVoice: false,
      memoryMode: 'Per-user',
      memoryTTL: '60d',
      knowledgeBase: true,
      knowledgeLastIndexed: '1w ago',
      conversations: 234,
      errors: 12,
      voiceMinutes: 0,
      lastActive: '2d ago',
      isActive: false
    }
  ]);

  // Filter and sort agents
  const filteredAgents = agents.filter(agent => {
    if (filters.search && !agent.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !agent.purpose.toLowerCase().includes(filters.search.toLowerCase()) &&
        !agent.owner.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.type.length > 0 && !filters.type.includes(agent.type)) return false;
    if (filters.status.length > 0 && !filters.status.includes(agent.status)) return false;
    if (filters.hasErrors && agent.errors === 0) return false;
    return true;
  }).sort((a, b) => {
    let aVal: any = a[sortBy as keyof Agent];
    let bVal: any = b[sortBy as keyof Agent];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });

  // Handle filter changes
  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: [],
      status: [],
      channels: [],
      tools: [],
      owner: '',
      hasErrors: false,
      timeRange: '7d'
    });
  };

  // Handle agent actions
  const handleToggleActive = (agentId: string) => {
    toast.success('Agent status updated');
  };

  const handleCreateAgent = () => {
    toast.success('Create agent wizard opened');
  };

  const handleAgentClick = (agentId: string) => {
    router.push(`/dashboard/agents/${agentId}`);
  };

  const handleMoreActions = (agentId: string, action: string) => {
    toast.success(`${action} action for agent ${agentId}`);
  };

  // Get channel icon
  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'web': return <Globe size={12} />;
      case 'email': return <Mail size={12} />;
      case 'whatsapp': return <MessageSquare size={12} />;
      case 'phone': return <Phone size={12} />;
      case 'slack': return <MessageSquare size={12} />;
      default: return <MessageSquare size={12} />;
    }
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Voice': return <Mic size={12} />;
      case 'Text': return <MessageSquare size={12} />;
      case 'Hybrid': return <Bot size={12} />;
      default: return <Bot size={12} />;
    }
  };

  // Render agent card
  const renderAgentCard = (agent: Agent) => (
    <div key={agent.id} className={styles.agentCard} onClick={() => handleAgentClick(agent.id)}>
      <div className={styles.cardHeader}>
        <div className={styles.cardLeft}>
          <div className={styles.agentAvatar}>
            {getTypeIcon(agent.type)}
          </div>
          <div className={styles.cardInfo}>
            <h3 className={styles.agentName}>{agent.name}</h3>
            <div className={styles.agentType}>
              {getTypeIcon(agent.type)}
              {agent.type}
            </div>
          </div>
        </div>
        <div className={styles.cardActions}>
          <div className={`${styles.statusPill} ${styles[`status${agent.status}`]}`}>
            {agent.status}
          </div>
          <button
            className={`${styles.activeToggle} ${agent.isActive ? styles.activeToggleActive : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleActive(agent.id);
            }}
          >
            {agent.isActive ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button
            className={styles.moreButton}
            onClick={(e) => {
              e.stopPropagation();
              handleMoreActions(agent.id, 'more');
            }}
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <p className={styles.agentPurpose}>{agent.purpose}</p>

      <div className={styles.cardMeta}>
        <div className={styles.metaItem}>
          <Users size={12} />
          {agent.owner}
        </div>
        <div className={styles.metaItem}>
          <Clock size={12} />
          {agent.lastActive}
        </div>
      </div>

      <div className={styles.cardChannels}>
        {agent.channels.map(channel => (
          <div key={channel} className={styles.channelChip}>
            {getChannelIcon(channel)}
            {channel}
          </div>
        ))}
      </div>

      <div className={styles.cardTools}>
        {agent.tools.slice(0, 3).map(tool => (
          <div key={tool} className={styles.toolChip}>
            {tool}
          </div>
        ))}
        {agent.tools.length > 3 && (
          <div className={styles.toolChip}>
            +{agent.tools.length - 3} more
          </div>
        )}
      </div>

      <div className={styles.cardStats}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{agent.conversations}</div>
          <div className={styles.statLabel}>Conversations</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{agent.errors}</div>
          <div className={styles.statLabel}>Errors</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{agent.voiceMinutes}m</div>
          <div className={styles.statLabel}>Voice</div>
        </div>
      </div>
    </div>
  );

  // Render table row
  const renderTableRow = (agent: Agent) => (
    <tr key={agent.id} className={styles.tableRow} onClick={() => handleAgentClick(agent.id)}>
      <td className={styles.tableCell}>
        <div className={styles.tableCellAgent}>
          <div className={styles.agentAvatar}>
            {getTypeIcon(agent.type)}
          </div>
          <div>
            <div className={styles.agentName}>{agent.name}</div>
            <div className={styles.agentType}>
              {getTypeIcon(agent.type)}
              {agent.type}
            </div>
          </div>
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className={`${styles.statusPill} ${styles[`status${agent.status}`]}`}>
          {agent.status}
        </div>
      </td>
      <td className={styles.tableCell}>{agent.purpose}</td>
      <td className={styles.tableCell}>{agent.owner}</td>
      <td className={styles.tableCell}>
        <div className={styles.tableCellChannels}>
          {agent.channels.map(channel => (
            <div key={channel} className={styles.channelChip}>
              {getChannelIcon(channel)}
            </div>
          ))}
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className={styles.tableCellTools}>
          {agent.tools.slice(0, 2).map(tool => (
            <div key={tool} className={styles.toolChip}>
              {tool}
            </div>
          ))}
          {agent.tools.length > 2 && <span>+{agent.tools.length - 2}</span>}
        </div>
      </td>
      <td className={`${styles.tableCell} ${styles.tableCellStats}`}>{agent.conversations}</td>
      <td className={`${styles.tableCell} ${styles.tableCellStats}`}>{agent.errors}</td>
      <td className={styles.tableCell}>{agent.lastActive}</td>
      <td className={styles.tableCell}>
        <div className={styles.cardActions}>
          <button
            className={`${styles.activeToggle} ${agent.isActive ? styles.activeToggleActive : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleActive(agent.id);
            }}
          >
            {agent.isActive ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button
            className={styles.moreButton}
            onClick={(e) => {
              e.stopPropagation();
              handleMoreActions(agent.id, 'more');
            }}
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className={styles.agents}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Agents</h1>
          <p className={styles.subtitle}>Manage and monitor your AI agents across all channels and workflows.</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.viewButton} ${viewMode === 'grid' ? styles.viewButtonActive : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={16} />
            </button>
            <button 
              className={`${styles.viewButton} ${viewMode === 'table' ? styles.viewButtonActive : ''}`}
              onClick={() => setViewMode('table')}
            >
              <List size={16} />
            </button>
          </div>
          <button className={styles.createButton} onClick={handleCreateAgent}>
            <Plus size={16} />
            Create Agent
          </button>
        </div>
      </header>

      {/* Controls Bar */}
      <div className={styles.controlsBar}>
        <div className={styles.searchAndFilters}>
          <div className={styles.searchContainer}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search agents..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button
            className={`${styles.filtersButton} ${showFilters ? styles.filtersButtonActive : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
            <ChevronDown size={16} />
          </button>
        </div>
        <div className={styles.sortContainer}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="name">Name</option>
            <option value="lastActive">Last Active</option>
            <option value="conversations">Conversations</option>
            <option value="errors">Errors</option>
            <option value="status">Status</option>
          </select>
          <button
            className={styles.sortOrderButton}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className={styles.filtersPanel}>
          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Type</label>
              <select
                className={styles.filterSelect}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value && !filters.type.includes(value)) {
                    handleFilterChange('type', [...filters.type, value]);
                  }
                }}
              >
                <option value="">Select type...</option>
                <option value="Text">Text</option>
                <option value="Voice">Voice</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <div className={styles.filterChips}>
                {filters.type.map(type => (
                  <div key={type} className={styles.filterChip}>
                    {type}
                    <button
                      className={styles.filterChipRemove}
                      onClick={() => handleFilterChange('type', filters.type.filter(t => t !== type))}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Status</label>
              <select
                className={styles.filterSelect}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value && !filters.status.includes(value)) {
                    handleFilterChange('status', [...filters.status, value]);
                  }
                }}
              >
                <option value="">Select status...</option>
                <option value="Live">Live</option>
                <option value="Draft">Draft</option>
                <option value="Paused">Paused</option>
                <option value="Archived">Archived</option>
              </select>
              <div className={styles.filterChips}>
                {filters.status.map(status => (
                  <div key={status} className={styles.filterChip}>
                    {status}
                    <button
                      className={styles.filterChipRemove}
                      onClick={() => handleFilterChange('status', filters.status.filter(s => s !== status))}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Time Range</label>
              <select
                value={filters.timeRange}
                onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                className={styles.filterSelect}
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="custom">Custom range</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <button
                onClick={clearFilters}
                className={styles.emptyButtonSecondary}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        {filteredAgents.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Bot size={24} />
            </div>
            <h3 className={styles.emptyTitle}>No agents found</h3>
            <p className={styles.emptyText}>
              {filters.search || filters.type.length > 0 || filters.status.length > 0
                ? "No agents match your current filters. Try adjusting your search criteria."
                : "Get started by creating your first AI agent to handle customer interactions."}
            </p>
            <div className={styles.emptyActions}>
              <button className={styles.emptyButtonPrimary} onClick={handleCreateAgent}>
                <Plus size={16} />
                Create Agent
              </button>
              {(filters.search || filters.type.length > 0 || filters.status.length > 0) && (
                <button className={styles.emptyButtonSecondary} onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className={styles.agentsGrid}>
            {filteredAgents.map(renderAgentCard)}
          </div>
        ) : (
          <table className={styles.agentsTable}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Agent</th>
                <th className={styles.tableHeaderCell}>Status</th>
                <th className={styles.tableHeaderCell}>Purpose</th>
                <th className={styles.tableHeaderCell}>Owner</th>
                <th className={styles.tableHeaderCell}>Channels</th>
                <th className={styles.tableHeaderCell}>Tools</th>
                <th className={styles.tableHeaderCell}>Conversations</th>
                <th className={styles.tableHeaderCell}>Errors</th>
                <th className={styles.tableHeaderCell}>Last Active</th>
                <th className={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.map(renderTableRow)}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}