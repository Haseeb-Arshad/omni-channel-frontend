"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  X, 
  Settings, 
  Volume2, 
  VolumeX,
  Loader2,
  AlertCircle
} from 'lucide-react'

type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error'

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

const VoiceOverlay = ({ 
  isOpen, 
  onClose, 
  state, 
  transcription 
}: {
  isOpen: boolean
  onClose: () => void
  state: VoiceState
  transcription: string
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
            className="relative z-10 bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/20"
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
            
            {/* Audio Visualization */}
            <div className="mb-6">
              <AudioVisualization 
                isActive={state === 'listening' || state === 'processing'} 
              />
            </div>
            
            {/* Status */}
            <div className="text-center mb-6">
              <motion.p 
                className="text-lg font-medium text-gray-900 mb-2"
                key={state}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {state === 'idle' && 'Ready to listen'}
                {state === 'listening' && 'Listening for your command...'}
                {state === 'processing' && 'Processing your request...'}
                {state === 'speaking' && 'Speaking response...'}
                {state === 'error' && 'Something went wrong'}
              </motion.p>
              
              {state === 'idle' && (
                <p className="text-sm text-gray-600">
                  Click the microphone or press Space to start
                </p>
              )}
            </div>
            
            {/* Transcription */}
            {transcription && (
              <motion.div
                className="bg-gray-50 rounded-xl p-4 mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-sm font-medium text-gray-700 mb-2">You said:</h3>
                <p className="text-gray-900">{transcription}</p>
              </motion.div>
            )}
            
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
  const [transcription, setTranscription] = useState('')
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    // Initialize speech recognition if available
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'en-US'
        
        recognitionRef.current.onstart = () => {
          setState('listening')
          onStateChange?.('listening')
        }
        
        recognitionRef.current.onresult = (event) => {
          let finalTranscript = ''
          let interimTranscript = ''
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }
          
          setTranscription(finalTranscript || interimTranscript)
          
          if (finalTranscript) {
            setState('processing')
            onStateChange?.('processing')
            onVoiceCommand?.(finalTranscript)
            
            // Simulate processing time
            setTimeout(() => {
              setState('idle')
              onStateChange?.('idle')
              setIsOpen(false)
            }, 2000)
          }
        }
        
        recognitionRef.current.onerror = (event) => {
          setState('error')
          onStateChange?.('error')
          setTimeout(() => {
            setState('idle')
            onStateChange?.('idle')
          }, 2000)
        }
        
        recognitionRef.current.onend = () => {
          if (state === 'listening') {
            setState('idle')
            onStateChange?.('idle')
          }
        }
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onVoiceCommand, onStateChange, state])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !isOpen) {
        event.preventDefault()
        handleVoiceToggle()
      } else if (event.code === 'Escape' && isOpen) {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen])

  const handleVoiceToggle = () => {
    if (!isOpen) {
      setIsOpen(true)
      setTranscription('')
      
      if (recognitionRef.current) {
        recognitionRef.current.start()
      }
    } else {
      handleClose()
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setState('idle')
    onStateChange?.('idle')
    
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

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
        transcription={transcription}
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