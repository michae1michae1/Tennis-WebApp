export interface Player {
  id: string;
  userId: string;
  name: string;
  skill: number; // rating/skill level
  statistics: {
    wins: number;
    losses: number;
    matchesPlayed: number;
  };
  createdAt: Date;
  updatedAt: Date;
} 