'use client';

import { User } from '../context/AuthContext';

// Interface for a tournament registration
export interface Registration {
  id: string;
  tournamentId: string;
  userId: string;
  userName: string;
  userEmail: string;
  registrationDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// Register a user for a tournament
export function registerForTournament(tournamentId: string, user: User): boolean {
  if (!user) return false;
  
  try {
    // Get existing registrations from localStorage
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    
    // Check if user is already registered for this tournament
    const existingRegistration = registrations.find(
      (reg: Registration) => reg.tournamentId === tournamentId && reg.userId === user.id
    );
    
    if (existingRegistration) {
      return false;
    }
    
    // Create new registration
    const newRegistration: Registration = {
      id: Math.random().toString(36).substring(2, 15),
      tournamentId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      registrationDate: new Date().toISOString(),
      status: 'confirmed',
    };
    
    // Add to localStorage
    registrations.push(newRegistration);
    localStorage.setItem('registrations', JSON.stringify(registrations));
    
    return true;
  } catch (error) {
    console.error('Error registering for tournament:', error);
    return false;
  }
}

// Check if a user is registered for a tournament
export function isUserRegistered(tournamentId: string, userId: string | undefined): boolean {
  if (!userId) return false;
  
  try {
    // Get registrations from localStorage
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    
    // Check if user is registered and registration is confirmed
    return registrations.some(
      (reg: Registration) => 
        reg.tournamentId === tournamentId && 
        reg.userId === userId && 
        reg.status === 'confirmed'
    );
  } catch (error) {
    console.error('Error checking registration status:', error);
    return false;
  }
}

// Cancel a user's registration for a tournament
export function cancelRegistration(tournamentId: string, userId: string | undefined): boolean {
  if (!userId) return false;
  
  try {
    // Get registrations from localStorage
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    
    // Find the registration to remove
    const index = registrations.findIndex(
      (reg: Registration) => reg.tournamentId === tournamentId && reg.userId === userId
    );
    
    if (index === -1) {
      return false;
    }
    
    // Remove the registration instead of just marking it as cancelled
    registrations.splice(index, 1);
    localStorage.setItem('registrations', JSON.stringify(registrations));
    
    return true;
  } catch (error) {
    console.error('Error cancelling registration:', error);
    return false;
  }
} 