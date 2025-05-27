/**
 * AI Persona type definitions
 */

/**
 * Persona interface representing an AI personality profile
 */
export interface Persona {
  id: string;
  user_id: number;
  name: string;
  description: string;
  system_prompt: string;
  tone: string;
  model: string;
  temperature: number;
  response_style: string;
  knowledge_depth: string;
  interaction_style: string;
  avatar: string;
  primary_color: string;
  accent_color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Input for creating or updating a persona
 */
export interface PersonaInput {
  name: string;
  description: string;
  system_prompt: string;
  tone: string;
  model: string;
  temperature?: number;
  response_style?: string;
  knowledge_depth?: string;
  interaction_style?: string;
  avatar?: string;
  primary_color?: string;
  accent_color?: string;
}

/**
 * Persona tone options
 */
export const TONE_OPTIONS = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "technical", label: "Technical" },
  { value: "persuasive", label: "Persuasive" },
  { value: "empathetic", label: "Empathetic" },
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
];

/**
 * AI model options
 */
export const MODEL_OPTIONS = [
  { value: "gpt-4", label: "GPT-4 (Most Capable)" },
  { value: "gpt-3.5", label: "GPT-3.5 (Faster)" },
  { value: "claude-2", label: "Claude 2" },
  { value: "palm", label: "PaLM 2" },
];

/**
 * Response style options
 */
export const RESPONSE_STYLE_OPTIONS = [
  { value: "concise", label: "Concise" },
  { value: "detailed", label: "Detailed" },
  { value: "balanced", label: "Balanced" },
];

/**
 * Knowledge depth options
 */
export const KNOWLEDGE_DEPTH_OPTIONS = [
  { value: "basic", label: "Basic" },
  { value: "comprehensive", label: "Comprehensive" },
  { value: "expert", label: "Expert" },
];

/**
 * Interaction style options
 */
export const INTERACTION_STYLE_OPTIONS = [
  { value: "reactive", label: "Reactive" },
  { value: "conversational", label: "Conversational" },
  { value: "proactive", label: "Proactive" },
];

/**
 * Avatar options
 */
export const AVATAR_OPTIONS = [
  { value: "default", label: "Default AI", icon: "bot" },
  { value: "support", label: "Support Agent", icon: "helpCircle" },
  { value: "technical", label: "Technical Specialist", icon: "code" },
  { value: "sales", label: "Sales Representative", icon: "tag" },
  { value: "creative", label: "Creative Assistant", icon: "paintbrush" },
  { value: "analytical", label: "Analytical Expert", icon: "barChart" },
];
