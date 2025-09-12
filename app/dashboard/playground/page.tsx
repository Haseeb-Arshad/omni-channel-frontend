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
  
  // UI state
  const [testMode, setTestMode] = useState<'chat' | 'voice'>('chat');
  
  // Sample data
  const knowledgeBases: KnowledgeBase[] = [
    { id: "kb1", name: "Product Documentation", documentCount: 24 },
    { id: "kb2", name: "FAQ Database", documentCount: 156 },
    { id: "kb3", name: "Support Articles", documentCount: 89 }
  ];
  
  const activePersona = { 
    id: "1", 
    model: "gpt-4", 
    name: "Support Assistant",
    description: "Helpful customer support agent"
  };

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
  const handleSendMessage = (e: React.FormEvent) => {
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
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! Let me check our knowledge base for the most accurate information.",
        "That's a great question. Based on our documentation, here's what I can tell you...",
        "I understand your concern. Let me provide you with a detailed explanation.",
        "Thanks for reaching out! I can definitely assist you with this request."
      ];
      
      const aiMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
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
            <div className={styles.personaIcon}>
              <Bot size={16} />
            </div>
            <div>
              <div className={styles.personaName}>{activePersona.name}</div>
              <div className={styles.personaModel}>{activePersona.model}</div>
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
                <label className={styles.label}>AI Model</label>
                <input
                  type="text"
                  value={`${activePersona.model.toUpperCase()} - ${activePersona.description}`}
                  readOnly
                  className={styles.inputReadonly}
                />
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
