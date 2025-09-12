"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Search,
  Grid3X3,
  List,
  Plus,
  Filter,
  ChevronRight,
  MoreHorizontal,
  Play,
  Pause,
  Clock,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  Bot,
  Mic,
  X,
  Command,
  Eye,
  TestTube,
  Copy,
  Archive,
  Trash2,
  Settings,
  ChevronDown,
  Bookmark,
  Tag,
  Users
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
  channels: Channel[];
  tools: Tool[];
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
  systemPrompt: string;
  recentChanges: Change[];
  traces: Trace[];
}

interface Channel {
  name: string;
  enabled: boolean;
  type: 'Web' | 'Email' | 'WhatsApp' | 'Phone' | 'Slack';
}

interface Tool {
  name: string;
  authenticated: boolean;
  rateLimit?: string;
}

interface Change {
  id: string;
  author: string;
  timestamp: string;
  description: string;
}

interface Trace {
  id: string;
  steps: string[];
  hasError: boolean;
  timestamp: string;
}

interface FilterState {
  search: string;
  type: string[];
  status: string[];
  channels: string[];
  tools: string[];
  owner: string;
  hasErrors: boolean;
  timeRange: '24h' | '7d' | '30d' | 'custom';
}

interface SavedView {
  id: string;
  name: string;
  filters: FilterState;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  viewMode: 'grid' | 'table';
}

export default function AgentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Core state
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showPeekDrawer, setShowPeekDrawer] = useState(false);
  const [peekAgent, setPeekAgent] = useState<Agent | null>(null);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  
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

  // Sample data with enhanced structure
  const [agents] = useState<Agent[]>([
    {
      id: 'agent-1',
      name: 'Customer Support',
      type: 'Hybrid',
      status: 'Live',
      purpose: 'Handles order tracking and basic troubleshooting',
      owner: 'Sarah Chen',
      team: 'Support',
      tags: ['customer-service', 'orders', 'troubleshooting'],
      channels: [
        { name: 'Web', enabled: true, type: 'Web' },
        { name: 'Email', enabled: true, type: 'Email' },
        { name: 'WhatsApp', enabled: true, type: 'WhatsApp' }
      ],
      tools: [
        { name: 'CRM', authenticated: true, rateLimit: '100/min' },
        { name: 'Order-Lookup', authenticated: true },
        { name: 'Knowledge-Base', authenticated: true }
      ],
      hasCustomVoice: true,
      memoryMode: 'Per-user',
      memoryTTL: '30d',
      knowledgeBase: true,
      knowledgeLastIndexed: '2h ago',
      conversations: 1247,
      errors: 3,
      voiceMinutes: 156,
      lastActive: '5m ago',
      isActive: true,
      systemPrompt: 'You are a helpful customer support agent. Always be polite and professional...',
      recentChanges: [
        { id: '1', author: 'Sarah Chen', timestamp: '2h ago', description: 'Updated system prompt' },
        { id: '2', author: 'Mike Johnson', timestamp: '1d ago', description: 'Added WhatsApp channel' }
      ],
      traces: [
        { id: '1', steps: ['user', 'model', 'tool'], hasError: false, timestamp: '5m ago' },
        { id: '2', steps: ['user', 'model'], hasError: true, timestamp: '12m ago' }
      ]
    },
    {
      id: 'agent-2',
      name: 'Sales Assistant',
      type: 'Text',
      status: 'Live',
      purpose: 'Qualifies leads and schedules product demos',
      owner: 'Mike Johnson',
      team: 'Sales',
      tags: ['sales', 'lead-qualification', 'demos'],
      channels: [
        { name: 'Web', enabled: true, type: 'Web' },
        { name: 'Email', enabled: true, type: 'Email' }
      ],
      tools: [
        { name: 'CRM', authenticated: true, rateLimit: '50/min' },
        { name: 'Calendar', authenticated: true },
        { name: 'Product-Catalog', authenticated: false }
      ],
      hasCustomVoice: false,
      memoryMode: 'Per-user',
      memoryTTL: '90d',
      knowledgeBase: true,
      knowledgeLastIndexed: '1d ago',
      conversations: 892,
      errors: 1,
      voiceMinutes: 0,
      lastActive: '12m ago',
      isActive: true,
      systemPrompt: 'You are a sales assistant focused on qualifying leads...',
      recentChanges: [
        { id: '1', author: 'Mike Johnson', timestamp: '3h ago', description: 'Updated lead scoring criteria' }
      ],
      traces: [
        { id: '1', steps: ['user', 'model', 'tool'], hasError: false, timestamp: '12m ago' }
      ]
    },
    {
      id: 'agent-3',
      name: 'Technical Support',
      type: 'Voice',
      status: 'Draft',
      purpose: 'Provides advanced technical support and troubleshooting',
      owner: 'Alex Rivera',
      team: 'Engineering',
      tags: ['technical', 'troubleshooting', 'advanced'],
      channels: [
        { name: 'Phone', enabled: false, type: 'Phone' },
        { name: 'Web', enabled: false, type: 'Web' }
      ],
      tools: [
        { name: 'Knowledge-Base', authenticated: true },
        { name: 'Ticketing', authenticated: true },
        { name: 'Remote-Access', authenticated: false }
      ],
      hasCustomVoice: true,
      memoryMode: 'Global',
      memoryTTL: '30d',
      knowledgeBase: true,
      knowledgeLastIndexed: '3h ago',
      conversations: 0,
      errors: 0,
      voiceMinutes: 0,
      lastActive: 'Never',
      isActive: false,
      systemPrompt: 'You are a technical support specialist with deep knowledge...',
      recentChanges: [
        { id: '1', author: 'Alex Rivera', timestamp: '1h ago', description: 'Created initial configuration' }
      ],
      traces: []
    }
  ]);

  // URL state management
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.get('view')) setViewMode(params.get('view') as 'grid' | 'table');
    if (params.get('sort')) setSortBy(params.get('sort') || 'name');
    if (params.get('order')) setSortOrder(params.get('order') as 'asc' | 'desc');
    if (params.get('search')) setFilters(prev => ({ ...prev, search: params.get('search') || '' }));
    if (params.get('timeRange')) setFilters(prev => ({ ...prev, timeRange: params.get('timeRange') as any || '7d' }));
  }, [searchParams]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      } else if (e.key === '/') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      } else if (e.key === 'g') {
        setViewMode(prev => prev === 'grid' ? 'table' : 'grid');
      } else if (e.key === 'f') {
        setShowFilters(prev => !prev);
      } else if (e.key === 'Escape') {
        setShowFilters(false);
        setShowCommandPalette(false);
        setShowPeekDrawer(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update URL when state changes
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (viewMode !== 'grid') params.set('view', viewMode);
    if (sortBy !== 'name') params.set('sort', sortBy);
    if (sortOrder !== 'asc') params.set('order', sortOrder);
    if (filters.search) params.set('search', filters.search);
    if (filters.timeRange !== '7d') params.set('timeRange', filters.timeRange);
    
    const newURL = params.toString() ? `?${params.toString()}` : '';
    window.history.replaceState({}, '', newURL);
  }, [viewMode, sortBy, sortOrder, filters.search, filters.timeRange]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

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
    // In real app, this would make an API call
    console.log('Toggle agent:', agentId);
  };

  const handleCreateAgent = () => {
    router.push('/dashboard/agents/new');
  };

  const handleAgentClick = (agentId: string) => {
    router.push(`/dashboard/agents/${agentId}`);
  };

  const handlePeekAgent = (agent: Agent) => {
    setPeekAgent(agent);
    setShowPeekDrawer(true);
  };

  const handleMoreActions = (agentId: string, action: string) => {
    console.log(`${action} action for agent ${agentId}`);
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
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.cardLeft}>
          <div className={`${styles.agentGlyph} ${styles[`glyph${agent.type}`]}`}>
            {getTypeIcon(agent.type)}
          </div>
          <div className={styles.cardInfo}>
            <h3 className={styles.agentName}>
              {agent.name}
              <ChevronRight size={14} className={styles.nameChevron} />
            </h3>
            <div className={styles.agentMeta}>
              <div className={styles.typeBadge}>{agent.type}</div>
              <span>•</span>
              <span>{agent.owner}</span>
              {agent.tags.slice(0, 3).map(tag => (
                <span key={tag}>• {tag}</span>
              ))}
              {agent.tags.length > 3 && <span>• +{agent.tags.length - 3}</span>}
            </div>
          </div>
        </div>
        <div className={styles.cardStatus}>
          <div className={`${styles.statusDot} ${styles[`status${agent.status}`]}`} />
          <button
            className={`${styles.toggleSwitch} ${agent.isActive ? styles.toggleActive : styles.toggleInactive}`}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleActive(agent.id);
            }}
            title={agent.isActive ? 'Pause agent' : 'Activate agent'}
          />
        </div>
      </div>

      {/* Purpose */}
      <p className={styles.agentPurpose}>{agent.purpose}</p>

      {/* Connections */}
      <div className={styles.cardConnections}>
        <div className={styles.connectionRow}>
          <div className={styles.connectionLabel}>Channels</div>
          <div className={styles.connectionChips}>
            {agent.channels.slice(0, 3).map(channel => (
              <div key={channel.name} className={styles.connectionChip}>
                {getChannelIcon(channel.type)}
                <span>{channel.name}</span>
              </div>
            ))}
            {agent.channels.length > 3 && (
              <div className={styles.connectionChip}>+{agent.channels.length - 3}</div>
            )}
          </div>
        </div>
        
        <div className={styles.connectionRow}>
          <div className={styles.connectionLabel}>Tools</div>
          <div className={styles.connectionChips}>
            {agent.tools.slice(0, 3).map(tool => (
              <div key={tool.name} className={styles.connectionChip}>
                {tool.name}
              </div>
            ))}
            {agent.tools.length > 3 && (
              <div className={styles.connectionChip}>+{agent.tools.length - 3}</div>
            )}
          </div>
        </div>
      </div>

      {/* Memory & Knowledge */}
      <div className={styles.memoryInfo}>
        Memory: {agent.memoryMode} • TTL {agent.memoryTTL} • Knowledge: Files (reindexed {agent.knowledgeLastIndexed})
      </div>

      {/* Footer */}
      <div className={styles.cardFooter}>
        <div className={styles.cardStats}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{agent.conversations.toLocaleString()}</div>
            <div className={styles.statLabel}>Used</div>
          </div>
          {agent.errors > 0 && (
            <div className={styles.statItem}>
              <div className={`${styles.statValue} ${styles.statError}`}>{agent.errors}</div>
              <div className={styles.statLabel}>Errors</div>
            </div>
          )}
          {agent.type !== 'Text' && (
            <div className={styles.statItem}>
              <div className={styles.statValue}>{agent.voiceMinutes}m</div>
              <div className={styles.statLabel}>Voice</div>
            </div>
          )}
          <div className={styles.statItem}>
            <div className={styles.statValue}>{agent.lastActive}</div>
            <div className={styles.statLabel}>Last active</div>
          </div>
        </div>
        
        <div className={styles.cardActions}>
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              handlePeekAgent(agent);
            }}
            title="Quick peek"
          >
            <Eye size={14} />
          </button>
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              handleMoreActions(agent.id, 'test');
            }}
            title="Test"
          >
            <TestTube size={14} />
          </button>
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              handleMoreActions(agent.id, 'duplicate');
            }}
            title="Duplicate"
          >
            <Copy size={14} />
          </button>
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              handleMoreActions(agent.id, 'more');
            }}
            title="More actions"
          >
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  // Render table row
  const renderTableRow = (agent: Agent) => (
    <tr key={agent.id} className={styles.tableRow} onClick={() => handleAgentClick(agent.id)}>
      <td className={styles.tableCell}>
        <div className={styles.tableCellAgent}>
          <div className={`${styles.agentGlyph} ${styles[`glyph${agent.type}`]}`}>
            {getTypeIcon(agent.type)}
          </div>
          <div>
            <div className={styles.agentName}>{agent.name}</div>
            <div className={styles.typeBadge}>{agent.type}</div>
          </div>
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className={`${styles.statusDot} ${styles[`status${agent.status}`]}`} />
      </td>
      <td className={styles.tableCell}>{agent.purpose}</td>
      <td className={styles.tableCell}>
        <div className={styles.connectionChips}>
          {agent.channels.slice(0, 3).map(channel => (
            <div key={channel.name} className={styles.connectionChip}>
              {getChannelIcon(channel.type)}
            </div>
          ))}
          {agent.channels.length > 3 && <span>+{agent.channels.length - 3}</span>}
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className={styles.connectionChips}>
          {agent.tools.slice(0, 2).map(tool => (
            <div key={tool.name} className={styles.connectionChip}>
              {tool.name}
            </div>
          ))}
          {agent.tools.length > 2 && <span>+{agent.tools.length - 2}</span>}
        </div>
      </td>
      <td className={styles.tableCell}>
        <div style={{ fontSize: '11px', color: '#86868b' }}>
          {agent.memoryMode} • {agent.memoryTTL}
        </div>
      </td>
      <td className={`${styles.tableCell} ${styles.tableCellStats}`}>{agent.conversations.toLocaleString()}</td>
      <td className={`${styles.tableCell} ${styles.tableCellStats}`}>
        {agent.errors > 0 && <span className={styles.statError}>{agent.errors}</span>}
      </td>
      <td className={styles.tableCell}>{agent.lastActive}</td>
      <td className={styles.tableCell}>
        <div className={styles.cardActions}>
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              handlePeekAgent(agent);
            }}
            title="Peek"
          >
            <Eye size={14} />
          </button>
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              handleMoreActions(agent.id, 'more');
            }}
            title="More"
          >
            <MoreHorizontal size={14} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className={styles.agents}>
      {/* App Bar */}
      <header className={styles.appBar}>
        <div className={styles.appBarLeft}>
          <h1 className={styles.title}>Agents</h1>
        </div>
        
        <div className={styles.appBarCenter}>
          <div className={styles.globalSearch}>
            <Search size={16} className={styles.searchIcon} />
            <input
              id="global-search"
              type="text"
              placeholder="Search agents..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={styles.searchInput}
            />
            <div className={styles.searchHint}>
              <Command size={12} />
              <span>K</span>
            </div>
          </div>
        </div>

        <div className={styles.appBarRight}>
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.toggleButton} ${viewMode === 'grid' ? styles.toggleActive : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <Grid3X3 size={14} />
            </button>
            <button 
              className={`${styles.toggleButton} ${viewMode === 'table' ? styles.toggleActive : ''}`}
              onClick={() => setViewMode('table')}
              title="Table view"
            >
              <List size={14} />
            </button>
          </div>

          <select
            value={filters.timeRange}
            onChange={(e) => handleFilterChange('timeRange', e.target.value)}
            className={styles.timeRangeSelect}
          >
            <option value="24h">Last 24h</option>
            <option value="7d">Last 7d</option>
            <option value="30d">Last 30d</option>
          </select>

          <button className={styles.savedViewsButton}>
            <Bookmark size={14} />
            <ChevronDown size={12} />
          </button>

          <button className={styles.primaryButton} onClick={handleCreateAgent}>
            <Plus size={14} />
            New Agent
          </button>
        </div>
      </header>

      {/* Filters & Controls */}
      <div className={styles.controlsSection}>
        {/* Collapsible Filters */}
        <div className={`${styles.filtersRail} ${showFilters ? styles.filtersOpen : ''}`}>
          <button 
            className={styles.filtersToggle}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={14} />
            <span>Filters</span>
            <ChevronRight size={12} className={showFilters ? styles.rotated : ''} />
          </button>
          
          {showFilters && (
            <div className={styles.filterGroups}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Type</label>
                <div className={styles.filterOptions}>
                  {['Text', 'Voice', 'Hybrid'].map(type => (
                    <label key={type} className={styles.filterOption}>
                      <input
                        type="checkbox"
                        checked={filters.type.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange('type', [...filters.type, type]);
                          } else {
                            handleFilterChange('type', filters.type.filter(t => t !== type));
                          }
                        }}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Status</label>
                <div className={styles.filterOptions}>
                  {['Live', 'Draft', 'Paused', 'Archived'].map(status => (
                    <label key={status} className={styles.filterOption}>
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange('status', [...filters.status, status]);
                          } else {
                            handleFilterChange('status', filters.status.filter(s => s !== status));
                          }
                        }}
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Issues</label>
                <div className={styles.filterOptions}>
                  <label className={styles.filterOption}>
                    <input
                      type="checkbox"
                      checked={filters.hasErrors}
                      onChange={(e) => handleFilterChange('hasErrors', e.target.checked)}
                    />
                    <span>Has errors</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Filter Chips */}
        {(filters.type.length > 0 || filters.status.length > 0 || filters.hasErrors) && (
          <div className={styles.activeFilters}>
            {filters.type.map(type => (
              <div key={type} className={styles.filterChip}>
                <span>Type: {type}</span>
                <button
                  className={styles.chipRemove}
                  onClick={() => handleFilterChange('type', filters.type.filter(t => t !== type))}
                >
                  <X size={10} />
                </button>
              </div>
            ))}
            {filters.status.map(status => (
              <div key={status} className={styles.filterChip}>
                <span>Status: {status}</span>
                <button
                  className={styles.chipRemove}
                  onClick={() => handleFilterChange('status', filters.status.filter(s => s !== status))}
                >
                  <X size={10} />
                </button>
              </div>
            ))}
            {filters.hasErrors && (
              <div className={styles.filterChip}>
                <span>Has errors</span>
                <button
                  className={styles.chipRemove}
                  onClick={() => handleFilterChange('hasErrors', false)}
                >
                  <X size={10} />
                </button>
              </div>
            )}
            <button className={styles.clearAll} onClick={clearFilters}>
              Clear all
            </button>
          </div>
        )}

        {/* Sort Controls */}
        <div className={styles.sortControls}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="name">Name</option>
            <option value="lastActive">Last active</option>
            <option value="conversations">Used</option>
            <option value="errors">Errors</option>
            <option value="created">Created</option>
          </select>
          <button
            className={styles.sortOrder}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Filters Backdrop */}
      {showFilters && (
        <div 
          className={styles.filtersBackdrop}
          onClick={() => setShowFilters(false)}
        />
      )}

      {/* Filters Sidebar */}
      <div className={`${styles.filtersPanel} ${showFilters ? styles.open : ''}`}>
          <div className={styles.filtersHeader}>
            <h3 className={styles.filtersTitle}>Filters</h3>
            <button 
              className={styles.filtersClose}
              onClick={() => setShowFilters(false)}
            >
              <X size={16} />
            </button>
          </div>
          <div className={styles.filtersContent}>
            <div className={styles.filterSection}>
              <h4 className={styles.filterSectionTitle}>Type</h4>
              <div className={styles.filterOptions}>
                {['Text', 'Voice', 'Hybrid'].map(type => (
                  <label key={type} className={styles.filterOption}>
                    <input
                      type="checkbox"
                      checked={filters.type.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange('type', [...filters.type, type]);
                        } else {
                          handleFilterChange('type', filters.type.filter(t => t !== type));
                        }
                      }}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className={styles.filterSection}>
              <h4 className={styles.filterSectionTitle}>Status</h4>
              <div className={styles.filterOptions}>
                {['Live', 'Draft', 'Paused', 'Archived'].map(status => (
                  <label key={status} className={styles.filterOption}>
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange('status', [...filters.status, status]);
                        } else {
                          handleFilterChange('status', filters.status.filter(s => s !== status));
                        }
                      }}
                    />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4 className={styles.filterSectionTitle}>Errors</h4>
              <div className={styles.filterOptions}>
                <label className={styles.filterOption}>
                  <input
                    type="checkbox"
                    checked={filters.hasErrors}
                    onChange={(e) => handleFilterChange('hasErrors', e.target.checked)}
                  />
                  <span>Has errors</span>
                </label>
              </div>
            </div>
          </div>
        </div>

      {/* Content */}
      <div className={styles.content}>
        {filteredAgents.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Bot size={32} />
            </div>
            <h3 className={styles.emptyTitle}>
              {filters.search || filters.type.length > 0 || filters.status.length > 0 || filters.hasErrors
                ? "No matches"
                : "No agents yet"}
            </h3>
            <p className={styles.emptyText}>
              {filters.search || filters.type.length > 0 || filters.status.length > 0 || filters.hasErrors
                ? "No agents match your current filters. Adjust filters or clear all."
                : "Start from a template or create from scratch."}
            </p>
            
            {!filters.search && filters.type.length === 0 && filters.status.length === 0 && !filters.hasErrors ? (
              <>
                <div className={styles.templateGrid}>
                  <div className={styles.templateCard} onClick={() => handleCreateAgent()}>
                    <h4 className={styles.templateTitle}>Support</h4>
                    <p className={styles.templateDesc}>Customer service and troubleshooting</p>
                  </div>
                  <div className={styles.templateCard} onClick={() => handleCreateAgent()}>
                    <h4 className={styles.templateTitle}>Sales</h4>
                    <p className={styles.templateDesc}>Lead qualification and demos</p>
                  </div>
                  <div className={styles.templateCard} onClick={() => handleCreateAgent()}>
                    <h4 className={styles.templateTitle}>Tech</h4>
                    <p className={styles.templateDesc}>Technical support and documentation</p>
                  </div>
                  <div className={styles.templateCard} onClick={() => handleCreateAgent()}>
                    <h4 className={styles.templateTitle}>Voice IVR</h4>
                    <p className={styles.templateDesc}>Phone system integration</p>
                  </div>
                </div>
                <div className={styles.emptyActions}>
                  <button className={styles.primaryButton} onClick={handleCreateAgent}>
                    <Plus size={14} />
                    New Agent
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.emptyActions}>
                <button className={styles.primaryButton} onClick={clearFilters}>
                  Clear all
                </button>
              </div>
            )}
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
                <th className={styles.tableHeaderCell}>Channels</th>
                <th className={styles.tableHeaderCell}>Tools</th>
                <th className={styles.tableHeaderCell}>Memory</th>
                <th className={styles.tableHeaderCell}>Used</th>
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
      {/* Quick-Peek Drawer */}
      {showPeekDrawer && peekAgent && (
        <>
          <div 
            className={styles.peekBackdrop}
            onClick={() => setShowPeekDrawer(false)}
          />
          <div className={styles.peekDrawer}>
            <div className={styles.peekHeader}>
              <h3 className={styles.peekTitle}>{peekAgent.name}</h3>
              <button 
                className={styles.peekClose}
                onClick={() => setShowPeekDrawer(false)}
              >
                <X size={16} />
              </button>
            </div>
            
            <div className={styles.peekContent}>
              <div className={styles.peekSection}>
                <h4 className={styles.peekSectionTitle}>Summary</h4>
                <p className={styles.peekMission}>{peekAgent.purpose}</p>
                <div className={styles.peekPrompt}>
                  <code>{peekAgent.systemPrompt.slice(0, 200)}...</code>
                </div>
              </div>

              <div className={styles.peekSection}>
                <h4 className={styles.peekSectionTitle}>Channels</h4>
                <div className={styles.peekChannels}>
                  {peekAgent.channels.map(channel => (
                    <div key={channel.name} className={styles.peekChannelItem}>
                      <div className={styles.peekChannelInfo}>
                        {getChannelIcon(channel.type)}
                        <span>{channel.name}</span>
                      </div>
                      <div className={`${styles.peekChannelStatus} ${channel.enabled ? styles.enabled : styles.disabled}`}>
                        {channel.enabled ? 'Enabled' : 'Disabled'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.peekSection}>
                <h4 className={styles.peekSectionTitle}>Tools</h4>
                <div className={styles.peekTools}>
                  {peekAgent.tools.map(tool => (
                    <div key={tool.name} className={styles.peekToolItem}>
                      <div className={styles.peekToolInfo}>
                        <span>{tool.name}</span>
                        {tool.rateLimit && <span className={styles.peekToolLimit}>{tool.rateLimit}</span>}
                      </div>
                      <div className={`${styles.peekToolAuth} ${tool.authenticated ? styles.authenticated : styles.notAuthenticated}`}>
                        {tool.authenticated ? 'Auth OK' : 'No Auth'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.peekActions}>
              <button 
                className={styles.peekActionPrimary}
                onClick={() => handleAgentClick(peekAgent.id)}
              >
                Open Workspace
              </button>
              <button 
                className={styles.peekActionSecondary}
                onClick={() => handleMoreActions(peekAgent.id, 'test')}
              >
                Run Quick Test
              </button>
            </div>
          </div>
        </>
      )}

      {/* Command Palette */}
      {showCommandPalette && (
        <>
          <div 
            className={styles.commandBackdrop}
            onClick={() => setShowCommandPalette(false)}
          />
          <div className={styles.commandPalette}>
            <div className={styles.commandSearch}>
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Type a command or search..."
                autoFocus
              />
            </div>
            <div className={styles.commandResults}>
              <div className={styles.commandGroup}>
                <div className={styles.commandGroupTitle}>Actions</div>
                <div className={styles.commandItem} onClick={handleCreateAgent}>
                  <Plus size={14} />
                  <span>Create new agent</span>
                </div>
                <div className={styles.commandItem} onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}>
                  {viewMode === 'grid' ? <List size={14} /> : <Grid3X3 size={14} />}
                  <span>Switch to {viewMode === 'grid' ? 'table' : 'grid'} view</span>
                </div>
              </div>
              <div className={styles.commandGroup}>
                <div className={styles.commandGroupTitle}>Agents</div>
                {filteredAgents.slice(0, 5).map(agent => (
                  <div 
                    key={agent.id} 
                    className={styles.commandItem}
                    onClick={() => handleAgentClick(agent.id)}
                  >
                    <div className={`${styles.commandAgentGlyph} ${styles[`glyph${agent.type}`]}`}>
                      {getTypeIcon(agent.type)}
                    </div>
                    <span>{agent.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}