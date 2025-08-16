"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic,
  MicOff,
  X,
  Settings,
  Volume2,
  Loader2,
  AlertCircle,
  RefreshCw,
  Zap,
  MessageSquare
} from 'lucide-react'

type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error'

interface TranscriptionData {
  text: string
  confidence: number
  isFinal: boolean
  timestamp: number
}

interface VoiceError {
  type: 'permission' | 'network' | 'recognition' | 'timeout' | 'unknown'
  message: string
  recoverable: boolean
}

interface VoiceInterfaceProps {
  onVoiceCommand?: (command: string) => void
  onStateChange?: (state: VoiceState) => void
}

const VoiceActivationButton = ({ onClick, isActive, state }: {
  onClick: () => void
  isActive: boolean
  state: VoiceState
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }}
    >
      {/* Pulsing Background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
        animate={
          state === 'listening'
            ? {
              scale: [1, 1.2, 1],
              opacity: [0.8, 0.4, 0.8]
            }
            : state === 'processing'
              ? {
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.3, 0.6]
              }
              : {
                scale: 1,
                opacity: 0.9
              }
        }
        transition={{
          duration: state === 'listening' ? 1.5 : state === 'processing' ? 0.8 : 0.3,
          repeat: (state === 'listening' || state === 'processing') ? Infinity : 0,
          ease: "easeInOut"
        }}
      />

      {/* Outer Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/30"
        animate={
          state === 'listening'
            ? {
              scale: [1, 1.4, 1],
              opacity: [0.6, 0, 0.6]
            }
            : {}
        }
        transition={{
          duration: 2,
          repeat: state === 'listening' ? Infinity : 0,
          ease: "easeOut"
        }}
      />

      {/* Button Content */}
      <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {state === 'processing' ? (
            <motion.div
              key="processing"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            </motion.div>
          ) : state === 'error' ? (
            <motion.div
              key="error"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle className="h-6 w-6 text-white" />
            </motion.div>
          ) : isActive ? (
            <motion.div
              key="active"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MicOff className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="inactive"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Mic className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Breathing Animation for Idle State */}
      {state === 'idle' && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  )
}

const AudioVisualization = ({ isActive, audioData }: {
  isActive: boolean
  audioData?: number[]
}) => {
  const bars = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="flex items-center justify-center space-x-1 h-32">
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="w-1 bg-gradient-to-t from-blue-500 to-purple-600 rounded-full"
          animate={
            isActive
              ? {
                height: [
                  Math.random() * 20 + 10,
                  Math.random() * 60 + 20,
                  Math.random() * 40 + 15,
                  Math.random() * 80 + 30
                ]
              }
              : { height: 4 }
          }
          transition={{
            duration: 0.5,
            repeat: isActive ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: bar * 0.05
          }}
        />
      ))}
    </div>
  )
}

const VoiceStateIndicator = ({ state }: { state: VoiceState }) => {
  const getStateConfig = () => {
    switch (state) {
      case 'listening':
        return {
          icon: Mic,
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          label: 'Listening...',
          description: 'Speak clearly into your microphone'
        }
      case 'processing':
        return {
          icon: Zap,
          color: 'text-purple-500',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          label: 'Processing...',
          description: 'Analyzing your voice command'
        }
      case 'speaking':
        return {
          icon: MessageSquare,
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          label: 'Speaking...',
          description: 'AI is responding to your request'
        }
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          label: 'Error occurred',
          description: 'Something went wrong with voice recognition'
        }
      default:
        return {
          icon: Mic,
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          label: 'Ready',
          description: 'Click to start voice interaction'
        }
    }
  }

  const config = getStateConfig()
  const Icon = config.icon

  return (
    <motion.div
      className={`flex items-center space-x-3 p-4 rounded-xl border ${config.bgColor} ${config.borderColor}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`p-2 rounded-lg ${config.bgColor}`}
        animate={
          state === 'listening' || state === 'processing'
            ? { scale: [1, 1.1, 1] }
            : { scale: 1 }
        }
        transition={{
          duration: 1,
          repeat: (state === 'listening' || state === 'processing') ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        <Icon className={`h-5 w-5 ${config.color}`} />
      </motion.div>
      <div className="flex-1">
        <p className={`font-medium ${config.color}`}>{config.label}</p>
        <p className="text-sm text-gray-600">{config.description}</p>
      </div>
    </motion.div>
  )
}

const TranscriptionDisplay = ({ 
  transcriptionData, 
  isListening 
}: { 
  transcriptionData: TranscriptionData[]
  isListening: boolean 
}) => {
  const latestTranscription = transcriptionData[transcriptionData.length - 1]

  return (
    <motion.div
      className="bg-gray-50 rounded-xl p-4 min-h-[120px] border border-gray-200"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700 flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>Live Transcription</span>
        </h3>
        {isListening && (
          <motion.div
            className="flex items-center space-x-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-xs text-red-500 font-medium">LIVE</span>
          </motion.div>
        )}
      </div>

      <div className="space-y-2 max-h-32 overflow-y-auto">
        {transcriptionData.length === 0 ? (
          <p className="text-gray-500 text-sm italic">
            {isListening ? "Start speaking..." : "No transcription yet"}
          </p>
        ) : (
          transcriptionData.map((data, index) => (
            <motion.div
              key={index}
              className={`p-2 rounded-lg ${
                data.isFinal 
                  ? 'bg-white border border-gray-200' 
                  : 'bg-gray-100 border border-dashed border-gray-300'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className={`text-sm ${data.isFinal ? 'text-gray-900' : 'text-gray-600'}`}>
                {data.text}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">
                  {data.isFinal ? 'Final' : 'Interim'}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      data.confidence > 0.8 ? 'bg-green-500' : 
                      data.confidence > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-xs text-gray-500">
                      {Math.round(data.confidence * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {latestTranscription && !latestTranscription.isFinal && (
        <motion.div
          className="mt-2 flex items-center space-x-2 text-xs text-gray-500"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <span>Still listening...</span>
        </motion.div>
      )}
    </motion.div>
  )
}

const ErrorDisplay = ({ 
  error, 
  onRetry, 
  onDismiss 
}: { 
  error: VoiceError
  onRetry: () => void
  onDismiss: () => void 
}) => {
  const getErrorIcon = () => {
    switch (error.type) {
      case 'permission':
        return Mic
      case 'network':
        return AlertCircle
      case 'timeout':
        return Loader2
      default:
        return AlertCircle
    }
  }

  const Icon = getErrorIcon()

  return (
    <motion.div
      className="bg-red-50 border border-red-200 rounded-xl p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-red-100 rounded-lg">
          <Icon className="h-5 w-5 text-red-500" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-red-900 mb-1">Voice Error</h4>
          <p className="text-sm text-red-700 mb-3">{error.message}</p>
          
          <div className="flex items-center space-x-2">
            {error.recoverable && (
              <motion.button
                onClick={onRetry}
                className="flex items-center space-x-2 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="h-3 w-3" />
                <span>Try Again</span>
              </motion.button>
            )}
            <motion.button
              onClick={onDismiss}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dismiss
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const VoiceOverlay = ({
  isOpen,
  onClose,
  state,
  transcriptionData,
  error,
  onRetry,
  onErrorDismiss
}: {
  isOpen: boolean
  onClose: () => void
  state: VoiceState
  transcriptionData: TranscriptionData[]
  error: VoiceError | null
  onRetry: () => void
  onErrorDismiss: () => void
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl border border-white/20"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Voice Assistant</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Voice State Indicator */}
            <div className="mb-6">
              <VoiceStateIndicator state={state} />
            </div>

            {/* Audio Visualization */}
            <div className="mb-6">
              <AudioVisualization
                isActive={state === 'listening' || state === 'processing'}
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6">
                <ErrorDisplay
                  error={error}
                  onRetry={onRetry}
                  onDismiss={onErrorDismiss}
                />
              </div>
            )}

            {/* Transcription Display */}
            <div className="mb-6">
              <TranscriptionDisplay
                transcriptionData={transcriptionData}
                isListening={state === 'listening'}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <motion.button
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Volume2 className="h-4 w-4" />
                <span className="text-sm font-medium">Audio On</span>
              </motion.button>

              <motion.button
                onClick={onClose}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function VoiceInterface({ onVoiceCommand, onStateChange }: VoiceInterfaceProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState<VoiceState>('idle')
  const [transcriptionData, setTranscriptionData] = useState<TranscriptionData[]>([])
  const [error, setError] = useState<VoiceError | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const createError = useCallback((type: VoiceError['type'], message: string, recoverable: boolean = true): VoiceError => {
    return { type, message, recoverable }
  }, [])

  const addTranscription = useCallback((text: string, confidence: number, isFinal: boolean) => {
    const newTranscription: TranscriptionData = {
      text,
      confidence,
      isFinal,
      timestamp: Date.now()
    }

    setTranscriptionData(prev => {
      if (isFinal) {
        // Replace any interim results with the final result
        const withoutInterim = prev.filter(t => t.isFinal)
        return [...withoutInterim, newTranscription]
      } else {
        // Replace the last interim result or add new one
        const withoutLastInterim = prev.filter((t, i) => i !== prev.length - 1 || t.isFinal)
        return [...withoutLastInterim, newTranscription]
      }
    })
  }, [])

  const initializeSpeechRecognition = useCallback(() => {
    if (typeof window === 'undefined') return false

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError(createError('recognition', 'Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.', false))
      return false
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    recognitionRef.current = new SpeechRecognition()

    if (!recognitionRef.current) {
      setError(createError('recognition', 'Failed to initialize speech recognition.', true))
      return false
    }

    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = 'en-US'
    recognitionRef.current.maxAlternatives = 1

    recognitionRef.current.onstart = () => {
      setState('listening')
      onStateChange?.('listening')
      setError(null)
      
      // Set a timeout for listening
      timeoutRef.current = setTimeout(() => {
        if (recognitionRef.current && state === 'listening') {
          recognitionRef.current.stop()
          setError(createError('timeout', 'Listening timeout. Please try again.', true))
        }
      }, 30000) // 30 second timeout
    }

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = ''
      let interimTranscript = ''
      let maxConfidence = 0

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const transcript = result[0].transcript
        const confidence = result[0].confidence || 0.5

        if (result.isFinal) {
          finalTranscript += transcript
          maxConfidence = Math.max(maxConfidence, confidence)
        } else {
          interimTranscript += transcript
          maxConfidence = Math.max(maxConfidence, confidence)
        }
      }

      // Add transcription data
      if (finalTranscript) {
        addTranscription(finalTranscript.trim(), maxConfidence, true)
        
        // Clear timeout since we got a result
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }

        setState('processing')
        onStateChange?.('processing')
        onVoiceCommand?.(finalTranscript.trim())

        // Simulate AI processing and response
        setTimeout(() => {
          setState('speaking')
          onStateChange?.('speaking')
          
          // Simulate speaking duration
          setTimeout(() => {
            setState('idle')
            onStateChange?.('idle')
            setIsOpen(false)
          }, 2000)
        }, 1000)
      } else if (interimTranscript) {
        addTranscription(interimTranscript.trim(), maxConfidence, false)
      }
    }

    recognitionRef.current.onerror = (event: any) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      let errorType: VoiceError['type'] = 'unknown'
      let errorMessage = 'An unknown error occurred.'
      let recoverable = true

      switch (event.error) {
        case 'not-allowed':
        case 'permission-denied':
          errorType = 'permission'
          errorMessage = 'Microphone access denied. Please allow microphone permissions and try again.'
          recoverable = true
          break
        case 'no-speech':
          errorType = 'timeout'
          errorMessage = 'No speech detected. Please try speaking again.'
          recoverable = true
          break
        case 'audio-capture':
          errorType = 'permission'
          errorMessage = 'Microphone not found or not working. Please check your microphone.'
          recoverable = true
          break
        case 'network':
          errorType = 'network'
          errorMessage = 'Network error occurred. Please check your internet connection.'
          recoverable = true
          break
        case 'aborted':
          // User cancelled, don't show error
          setState('idle')
          onStateChange?.('idle')
          return
        default:
          errorMessage = `Speech recognition error: ${event.error}`
      }

      setError(createError(errorType, errorMessage, recoverable))
      setState('error')
      onStateChange?.('error')
    }

    recognitionRef.current.onend = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      if (state === 'listening') {
        setState('idle')
        onStateChange?.('idle')
      }
    }

    return true
  }, [addTranscription, createError, onStateChange, onVoiceCommand, state])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !isOpen && event.target === document.body) {
        event.preventDefault()
        handleVoiceToggle()
      } else if (event.code === 'Escape' && isOpen) {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen])

  const handleVoiceToggle = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true)
      setTranscriptionData([])
      setError(null)

      if (!recognitionRef.current) {
        if (!initializeSpeechRecognition()) {
          return
        }
      }

      try {
        recognitionRef.current?.start()
      } catch (err) {
        setError(createError('recognition', 'Failed to start voice recognition. Please try again.', true))
        setState('error')
        onStateChange?.('error')
      }
    } else {
      handleClose()
    }
  }, [isOpen, initializeSpeechRecognition, createError, onStateChange])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setState('idle')
    onStateChange?.('idle')
    setError(null)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (err) {
        // Ignore errors when stopping
      }
    }
  }, [onStateChange])

  const handleRetry = useCallback(() => {
    setError(null)
    setState('idle')
    onStateChange?.('idle')
    
    // Reinitialize and restart
    setTimeout(() => {
      handleVoiceToggle()
    }, 100)
  }, [handleVoiceToggle, onStateChange])

  const handleErrorDismiss = useCallback(() => {
    setError(null)
    if (state === 'error') {
      setState('idle')
      onStateChange?.('idle')
    }
  }, [state, onStateChange])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (err) {
          // Ignore cleanup errors
        }
      }
    }
  }, [])

  return (
    <>
      <VoiceActivationButton
        onClick={handleVoiceToggle}
        isActive={isOpen}
        state={state}
      />

      <VoiceOverlay
        isOpen={isOpen}
        onClose={handleClose}
        state={state}
        transcriptionData={transcriptionData}
        error={error}
        onRetry={handleRetry}
        onErrorDismiss={handleErrorDismiss}
      />
    </>
  )
}

// Type declarations for Speech Recognition API
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  maxAlternatives: number
  start(): void
  stop(): void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message?: string
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}