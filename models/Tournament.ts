import { Phase } from './Phase';
import { Player } from './Player';
import { Rule } from './Rule';

export interface Tournament {
  id: string;
  name: string;
  description: string;
  organizerId: string;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'active' | 'completed';
  type: 'ladder' | 'singleElimination' | 'doubleElimination' | 'roundRobin' | 'custom';
  phases: Phase[];
  players: Player[];
  rules: Rule[];
  createdAt: Date;
  updatedAt: Date;
} 