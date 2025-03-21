import { Rule } from './Rule';

export interface Phase {
  id: string;
  tournamentId: string;
  name: string;
  order: number;
  type: 'ladder' | 'roundRobin' | 'singleElimination' | 'doubleElimination' | 'custom';
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'active' | 'completed';
  rules: Rule[];
  createdAt: Date;
  updatedAt: Date;
} 