"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Persona } from "@/types/persona"
import * as PersonaAPI from "@/lib/api-client/persona-api"
import { toast } from "sonner"

interface PersonaContextType {
  personas: Persona[]
  activePersona: Persona | null
  isLoading: boolean
  error: string | null
  fetchPersonas: () => Promise<void>
  fetchActivePersona: () => Promise<void>
  createPersona: (personaData: any) => Promise<Persona>
  updatePersona: (id: string, personaData: any) => Promise<Persona>
  deletePersona: (id: string) => Promise<boolean>
  setActivePersona: (id: string) => Promise<Persona>
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined)

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [personas, setPersonas] = useState<Persona[]>([])
  const [activePersona, setActivePersonaState] = useState<Persona | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPersonas = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await PersonaAPI.getPersonas()
      setPersonas(data)
      return data
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to fetch personas"
      setError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchActivePersona = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await PersonaAPI.getActivePersona()
      setActivePersonaState(data)
      return data
    } catch (err: any) {
      // If no active persona, don't show error toast
      if (err.response?.status !== 404) {
        const errorMsg = err.response?.data?.message || "Failed to fetch active persona"
        setError(errorMsg)
        toast.error(errorMsg)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const createPersona = async (personaData: any) => {
    setIsLoading(true)
    setError(null)
    try {
      const newPersona = await PersonaAPI.createPersona(personaData)
      setPersonas(prev => [...prev, newPersona])
      toast.success("Persona created successfully")
      return newPersona
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to create persona"
      setError(errorMsg)
      toast.error(errorMsg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const updatePersona = async (id: string, personaData: any) => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedPersona = await PersonaAPI.updatePersona(id, personaData)
      setPersonas(prev => prev.map(p => p.id === id ? updatedPersona : p))
      
      // If this was the active persona, update it
      if (activePersona?.id === id) {
        setActivePersonaState(updatedPersona)
      }
      
      toast.success("Persona updated successfully")
      return updatedPersona
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to update persona"
      setError(errorMsg)
      toast.error(errorMsg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const deletePersona = async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const success = await PersonaAPI.deletePersona(id)
      
      if (success) {
        setPersonas(prev => prev.filter(p => p.id !== id))
        
        // If this was the active persona, clear it
        if (activePersona?.id === id) {
          setActivePersonaState(null)
        }
        
        toast.success("Persona deleted successfully")
      }
      
      return success
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to delete persona"
      setError(errorMsg)
      toast.error(errorMsg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const setActivePersona = async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const activatedPersona = await PersonaAPI.setActivePersona(id)
      
      // Update the active persona
      setActivePersonaState(activatedPersona)
      
      // Update the is_active flags in the personas list
      setPersonas(prev => 
        prev.map(p => ({
          ...p,
          is_active: p.id === id
        }))
      )
      
      toast.success(`${activatedPersona.name} set as active persona`)
      return activatedPersona
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to set active persona"
      setError(errorMsg)
      toast.error(errorMsg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Load personas on initial mount
  useEffect(() => {
    fetchPersonas()
    fetchActivePersona()
  }, [])

  const value = {
    personas,
    activePersona,
    isLoading,
    error,
    fetchPersonas,
    fetchActivePersona,
    createPersona,
    updatePersona,
    deletePersona,
    setActivePersona
  }

  return (
    <PersonaContext.Provider value={value}>
      {children}
    </PersonaContext.Provider>
  )
}

export function usePersona() {
  const context = useContext(PersonaContext)
  if (context === undefined) {
    throw new Error("usePersona must be used within a PersonaProvider")
  }
  return context
}
