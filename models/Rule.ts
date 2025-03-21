export interface Rule {
  id: string;
  type: string; // e.g., "challengeRange", "matchFormat", "tiebreakRule"
  parameters: {
    [key: string]: any; // Configurable parameters for each rule
  };
} 