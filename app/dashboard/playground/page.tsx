"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  Bot, 
  User, 
  Send, 
  RotateCw, 
  Download, 
  Brain, 
  Zap, 
  Loader2, 
  Settings,
  MessageSquare,
  Sparkles,
  ChevronDown,
  Play,
  Pause,
  Mic,
  Volume2
} from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import styles from "./playground.module.css";
import dynamic from "next/dynamic";
const HumeVoicePlayground = dynamic(() => import("@/components/hume/VoicePlayground"), { ssr: false });

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: {
    title: string;
    similarity: number;
  }[];
}

interface KnowledgeBase {
  id: string;
  name: string;
  documentCount: number;
}

export default function PlaygroundPage() {
  // Core state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Settings state
  const [useKnowledgeBase, setUseKnowledgeBase] = useState(false);
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [contextWindow, setContextWindow] = useState(10);
  const [enableWebSearch, setEnableWebSearch] = useState(true);
  const [sessionId, setSessionId] = useState<string>("");
  
  // UI state
  const [testMode, setTestMode] = useState<'chat' | 'voice'>('chat');
  
  // Data loaded from backend
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
  const [personas, setPersonas] = useState<any[]>([]);
  const [activePersona, setActivePersona] = useState<any | null>(null);
  const [models, setModels] = useState<string[]>(["gpt-5", "gpt-5-mini", "gpt-5-pro", "gpt-4o", "gpt-4o-mini"]);
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4o-mini");

  useEffect(() => {
    // Persist a session id for memory
    const existing = typeof window !== 'undefined' ? localStorage.getItem('playground_session_id') : '';
    const sid = existing || (uuidv4());
    setSessionId(sid);
    if (!existing && typeof window !== 'undefined') {
      localStorage.setItem('playground_session_id', sid);
    }

    (async () => {
      try {
        const api = (await import('@/lib/api')).default;
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const promises: Promise<any>[] = [
          api.listKnowledgeBasesForPlayground(),
          api.listModels('gpt-5')
        ];
        if (token) {
          promises.push(api.listPersonas());
          promises.push(api.getActivePersona());
        }
        const results = await Promise.all(promises);
        const kbRes = results[0];
        const modelsRes = results[1];
        const personaRes = token ? results[2] : { success: false } as any;
        const activeRes = token ? results[3] : { success: false } as any;
        if (kbRes.success && (kbRes.data as any)?.knowledgeBases) setKnowledgeBases((kbRes.data as any).knowledgeBases);
        if (token && personaRes.success && Array.isArray(personaRes.data)) setPersonas(personaRes.data);
        if (token && activeRes.success && activeRes.data) {
          setActivePersona(activeRes.data);
          if (activeRes.data.model) setSelectedModel(activeRes.data.model);
        }
        if (modelsRes.success && modelsRes.data?.models?.length) {
          const ids = modelsRes.data.models.map((m: any) => m.id);
          const common = ['gpt-5', 'gpt-5-mini', 'gpt-5-pro', 'o5-mini', 'gpt-4.1', 'gpt-4o', 'gpt-4o-mini'];
          const merged = Array.from(new Set([...ids, ...common]));
          setModels(merged);
        }
      } catch (_) {
        // ignore and keep defaults
      }
    })();
  }, []);

  // Message component
  const MessageBubble = ({ message, isLoading }: { message: Message, isLoading?: boolean }) => {
    const isUser = message.role === "user";
    
    return (
      <div className={`${styles.messageRow} ${isUser ? styles.messageUser : styles.messageAssistant}`}>
        <div className={styles.messageAvatar}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>
        <div className={styles.messageContent}>
          <div className={`${styles.messageBubble} ${isUser ? styles.bubbleUser : styles.bubbleBot}`}>
            {isLoading ? (
              <div className={styles.loadingMessage}>
                <Loader2 size={16} className={styles.spinner} />
                <span>Thinking...</span>
              </div>
            ) : (
              message.content
            )}
          </div>
          <div className={styles.messageTime}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    );
  };

  // Handle message submission
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isTyping) return;
    
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    try {
      const api = (await import('@/lib/api')).default;
      const ctx = messages.slice(-contextWindow).map(m => ({ role: m.role, content: m.content }));
      const res = await api.playgroundChat({
        query: userMessage.content,
        personaId: activePersona?.id,
        model: selectedModel,
        temperature,
        maxTokens,
        useKnowledgeBase,
        knowledgeBaseId: selectedKnowledgeBase || undefined,
        systemPrompt: activePersona?.system_prompt,
        contextMessages: ctx,
        sessionId,
        enableWebSearch
      } as any);
      const content = res?.data?.response?.content || 'Sorry, I could not generate a response.';
      const aiMessage: Message = { id: uuidv4(), role: 'assistant', content, timestamp: new Date() };
      setMessages(prev => [...prev, aiMessage]);
    } catch (_) {
      const aiMessage: Message = { id: uuidv4(), role: 'assistant', content: 'There was an error contacting the AI service.', timestamp: new Date() };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle preset messages
  const handlePresetMessage = (message: string) => {
    setInputMessage(message);
    setTimeout(() => {
      const event = new Event('submit') as any;
      handleSendMessage(event);
    }, 100);
  };

  // Reset settings to defaults
  const resetSettings = () => {
    setTemperature(0.7);
    setMaxTokens(1000);
    setContextWindow(10);
    setUseKnowledgeBase(false);
    setSelectedKnowledgeBase("");
    toast.success('Settings reset to defaults');
  };

  // Export chat
  const exportChat = () => {
    const chatData = {
      persona: activePersona,
      settings: {
        temperature,
        maxTokens,
        contextWindow,
        useKnowledgeBase,
        selectedKnowledgeBase
      },
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp
      }))
    };
    
    const dataStr = JSON.stringify(chatData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `playground_chat_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Chat exported successfully!');
  };

  return (
    <div className={styles.playground}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>AI Playground</h1>
          <p className={styles.subtitle}>Test prompts, adjust settings, and explore responses with your AI assistant.</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.personaInfo}>
            <div className={styles.personaIcon}><Bot size={16} /></div>
            <div>
              <div className={styles.personaName}>{activePersona?.name || 'Persona'}</div>
              <div className={styles.personaModel}>{selectedModel}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.container}>
        {/* Chat Section */}
        <div className={styles.chatSection}>
          <div className={styles.chatHeader}>
            <div className={styles.testTabs}>
              <button 
                className={`${styles.tab} ${testMode === 'chat' ? styles.tabActive : ''}`}
                onClick={() => setTestMode('chat')}
              >
                <MessageSquare size={16} />
                Chat
              </button>
              <button 
                className={`${styles.tab} ${testMode === 'voice' ? styles.tabActive : ''}`}
                onClick={() => setTestMode('voice')}
              >
                <Mic size={16} />
                Voice
              </button>
            </div>
          </div>

          <div className={styles.chatContent}>
            {testMode === 'chat' ? (
              <>
                <div className={styles.messagesContainer}>
                  {messages.length === 0 ? (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>
                        <Sparkles size={24} />
                      </div>
                      <h3 className={styles.emptyTitle}>Start a conversation</h3>
                      <p className={styles.emptyText}>Try asking a question or use one of the preset messages below.</p>
                    </div>
                  ) : (
                    <div className={styles.messages}>
                      {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                      ))}
                      {isTyping && (
                        <MessageBubble 
                          message={{
                            id: 'typing',
                            role: 'assistant',
                            content: '',
                            timestamp: new Date()
                          }}
                          isLoading={true}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Preset Messages */}
                {messages.length === 0 && (
                  <div className={styles.presets}>
                    <div className={styles.presetsLabel}>Try these examples:</div>
                    <div className={styles.presetButtons}>
                      <button 
                        className={styles.presetButton}
                        onClick={() => handlePresetMessage("What are your business hours?")}
                      >
                        What are your business hours?
                      </button>
                      <button 
                        className={styles.presetButton}
                        onClick={() => handlePresetMessage("How can I track my order?")}
                      >
                        How can I track my order?
                      </button>
                      <button 
                        className={styles.presetButton}
                        onClick={() => handlePresetMessage("I need help with a return")}
                      >
                        I need help with a return
                      </button>
                    </div>
                  </div>
                )}

                {/* Input Form */}
                <form className={styles.inputForm} onSubmit={handleSendMessage}>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message..."
                      className={styles.messageInput}
                      disabled={isTyping}
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim() || isTyping}
                      className={styles.sendButton}
                    >
                      {isTyping ? <Loader2 size={16} className={styles.spinner} /> : <Send size={16} />}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className={styles.voiceMode}>
                <HumeVoicePlayground />
              </div>
            )}
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>Settings</h2>
            <Settings size={16} />
          </div>

          <div className={styles.sidebarContent}>
            {/* Knowledge Base Section */}
            <div className={styles.settingsSection}>
              <div className={styles.sectionHeader}>
                <Brain size={16} />
                <span>Knowledge Base</span>
              </div>
              
              <div className={styles.settingItem}>
                <label className={styles.switchLabel}>
                  <input
                    type="checkbox"
                    checked={useKnowledgeBase}
                    onChange={(e) => setUseKnowledgeBase(e.target.checked)}
                    className={styles.switch}
                  />
                  <span className={styles.switchSlider}></span>
                  Use Knowledge Base
                </label>
              </div>

              {useKnowledgeBase && (
                <div className={styles.settingItem}>
                  <label className={styles.label}>Select Knowledge Base</label>
                  <select
                    value={selectedKnowledgeBase}
                    onChange={(e) => setSelectedKnowledgeBase(e.target.value)}
                    className={styles.select}
                  >
                    <option value="">Choose a knowledge base...</option>
                    {knowledgeBases.map((kb) => (
                      <option key={kb.id} value={kb.id}>
                        {kb.name} ({kb.documentCount} docs)
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Model Parameters Section */}
            <div className={styles.settingsSection}>
              <div className={styles.sectionHeader}>
                <Zap size={16} />
                <span>Model Parameters</span>
              </div>

              <div className={styles.settingItem}>
                <label className={styles.label}>Persona</label>
                <select
                  value={activePersona?.id || ''}
                  onChange={(e) => {
                    const p = personas.find((x) => x.id === e.target.value);
                    setActivePersona(p || null);
                    if (p?.model) setSelectedModel(p.model);
                  }}
                  className={styles.select}
                >
                  <option value="">Active persona</option>
                  {personas.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.settingItem}>
                <label className={styles.label}>AI Model</label>
                <select className={styles.select} value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                  {models.map(m => (<option key={m} value={m}>{m}</option>))}
                </select>
              </div>

              <div className={styles.settingItem}>
                <label className={styles.label}>
                  Temperature <span className={styles.value}>{temperature.toFixed(1)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderLabels}>
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
              </div>

              <div className={styles.settingItem}>
                <label className={styles.label}>
                  Max Tokens <span className={styles.value}>{maxTokens}</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="4000"
                  step="100"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className={styles.slider}
                />
              </div>

            <div className={styles.settingItem}>
              <label className={styles.label}>Context Window</label>
              <select
                value={contextWindow}
                onChange={(e) => setContextWindow(parseInt(e.target.value))}
                className={styles.select}
              >
                <option value={5}>Last 5 messages</option>
                <option value={10}>Last 10 messages</option>
                <option value={20}>Last 20 messages</option>
                <option value={100}>All messages</option>
              </select>
            </div>

            <div className={styles.settingItem}>
              <label className={styles.switchLabel}>
                <input type="checkbox" className={styles.switch} checked={enableWebSearch} onChange={(e) => setEnableWebSearch(e.target.checked)} />
                <span className={styles.switchSlider}></span>
                Enable Web Search
              </label>
            </div>
            </div>

            {/* Actions */}
            <div className={styles.sidebarActions}>
              <button className={styles.resetButton} onClick={resetSettings}>
                <RotateCw size={16} />
                Reset Defaults
              </button>
              <button className={styles.exportButton} onClick={exportChat}>
                <Download size={16} />
                Export Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
