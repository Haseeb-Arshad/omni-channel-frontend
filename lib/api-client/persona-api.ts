/**
 * API client for AI Persona management
 */
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { Persona, PersonaInput } from '@/types/persona';

/**
 * Get all personas for the authenticated user
 * @returns Promise with array of Persona objects
 */
export async function getPersonas(): Promise<Persona[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/personas`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching personas:', error);
    throw error;
  }
}

/**
 * Get a specific persona by ID
 * @param id Persona ID
 * @returns Promise with Persona object
 */
export async function getPersonaById(id: string): Promise<Persona> {
  try {
    const response = await axios.get(`${API_BASE_URL}/personas/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching persona ${id}:`, error);
    throw error;
  }
}

/**
 * Get the active persona for the current user
 * @returns Promise with Persona object
 */
export async function getActivePersona(): Promise<Persona> {
  try {
    const response = await axios.get(`${API_BASE_URL}/personas/active`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching active persona:', error);
    throw error;
  }
}

/**
 * Create a new persona
 * @param personaData Persona data
 * @returns Promise with created Persona
 */
export async function createPersona(personaData: PersonaInput): Promise<Persona> {
  try {
    const response = await axios.post(`${API_BASE_URL}/personas`, personaData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating persona:', error);
    throw error;
  }
}

/**
 * Update an existing persona
 * @param id Persona ID
 * @param personaData Updated persona data
 * @returns Promise with updated Persona
 */
export async function updatePersona(id: string, personaData: Partial<PersonaInput>): Promise<Persona> {
  try {
    const response = await axios.put(`${API_BASE_URL}/personas/${id}`, personaData);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating persona ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a persona
 * @param id Persona ID
 * @returns Promise with success status
 */
export async function deletePersona(id: string): Promise<boolean> {
  try {
    const response = await axios.delete(`${API_BASE_URL}/personas/${id}`);
    return response.data.success;
  } catch (error) {
    console.error(`Error deleting persona ${id}:`, error);
    throw error;
  }
}

/**
 * Set a persona as active
 * @param id Persona ID to activate
 * @returns Promise with activated Persona
 */
export async function setActivePersona(id: string): Promise<Persona> {
  try {
    const response = await axios.post(`${API_BASE_URL}/personas/${id}/activate`);
    return response.data.data;
  } catch (error) {
    console.error(`Error activating persona ${id}:`, error);
    throw error;
  }
}
