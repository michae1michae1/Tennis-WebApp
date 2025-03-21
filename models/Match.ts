import { Set } from './Set';

export interface Match {
  id: string;
  tournamentId: string;
  phaseId: string;
  roundNumber?: number;
  players: [string, string] | [string, string, string, string]; // player IDs, 2 for singles, 4 for doubles
  scheduledDate?: Date;
  completedDate?: Date;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scores: Set[];
  winnerId?: string;
  verifiedBy?: string; // admin/organizer who verified match
  createdAt: Date;
  updatedAt: Date;
} 