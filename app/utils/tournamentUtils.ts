export function getTournamentName(id: string): string {
  switch(id) {
    case '1': return 'Summer Classic';
    case '2': return 'Club Championship';
    case '3': return 'Ladder League';
    case '4': return 'Spring Invitational';
    case '5': return 'Junior Development Series';
    default: return 'Unknown Tournament';
  }
}

export function getTournamentDescription(id: string): string {
  switch(id) {
    case '1': return 'Annual summer tournament with ladder and elimination phases';
    case '2': return 'Official club championship with round-robin format';
    case '3': return 'Ongoing ladder tournament for club members';
    case '4': return 'Special invitation tournament for top ranked players';
    case '5': return 'Tournament series for junior players under 18';
    default: return 'Tournament details not available';
  }
}

export function getTournamentStartDate(id: string): string {
  switch(id) {
    case '1': return '2025-05-30';
    case '2': return '2025-06-15';
    case '3': return '2025-05-01';
    case '4': return '2025-05-18';
    case '5': return '2025-06-05';
    default: return 'Date not available';
  }
}

export function getTournamentEndDate(id: string): string {
  switch(id) {
    case '1': return '2025-06-09';
    case '2': return '2025-06-25';
    case '3': return '2025-07-31';
    case '4': return '2025-05-20';
    case '5': return '2025-06-07';
    default: return 'Date not available';
  }
}

export function getTournamentType(id: string): string {
  switch(id) {
    case '1': return 'custom';
    case '2': return 'roundRobin';
    case '3': return 'ladder';
    case '4': return 'singleElimination';
    case '5': return 'roundRobin';
    default: return 'unknown';
  }
}

export function getTournamentPlayers(id: string) {
  return [
    { id: '1', name: 'John Smith', rank: 1 },
    { id: '2', name: 'Emma Johnson', rank: 2 },
    { id: '3', name: 'Michael Brown', rank: 3 },
    { id: '4', name: 'Sarah Davis', rank: 4 },
    { id: '5', name: 'David Wilson', rank: 5 },
    { id: '6', name: 'Olivia Martinez', rank: 6 },
    { id: '7', name: 'James Taylor', rank: 7 },
    { id: '8', name: 'Sophia Anderson', rank: 8 },
  ];
}

export function getTournamentMatches(id: string) {
  const commonMatches = [
    { id: '1', player1: 'John Smith', player2: 'Emma Johnson', date: '2025-06-02', time: '10:00 AM', court: 'Court 1', score: '6-4, 7-5' },
    { id: '2', player1: 'Michael Brown', player2: 'Sarah Davis', date: '2025-06-02', time: '1:00 PM', court: 'Court 2', score: '3-6, 6-3, 6-2' },
    { id: '3', player1: 'David Wilson', player2: 'Olivia Martinez', date: '2025-06-03', time: '9:00 AM', court: 'Court 1', score: 'Not played' },
    { id: '4', player1: 'James Taylor', player2: 'Sophia Anderson', date: '2025-06-03', time: '11:30 AM', court: 'Court 3', score: 'Not played' },
  ];

  switch(id) {
    case '1': // Summer Classic
      return [
        ...commonMatches,
        { id: '5', player1: 'Robert Clark', player2: 'Elizabeth Lee', date: '2025-06-04', time: '10:00 AM', court: 'Court 1', score: 'Not played' },
        { id: '6', player1: 'William Walker', player2: 'Jennifer Lewis', date: '2025-06-05', time: '2:00 PM', court: 'Court 2', score: 'Not played' },
      ];
    case '2': // Club Championship
      return [
        ...commonMatches,
        { id: '5', player1: 'Christopher King', player2: 'Jessica Scott', date: '2025-06-16', time: '9:00 AM', court: 'Court 1', score: 'Not played' },
        { id: '6', player1: 'Matthew Carter', player2: 'Amanda Harris', date: '2025-06-17', time: '11:00 AM', court: 'Court 2', score: 'Not played' },
      ];
    case '3': // Ladder League
      return [
        ...commonMatches,
        { id: '5', player1: 'Joshua Ward', player2: 'Rebecca Ross', date: '2025-05-10', time: '2:00 PM', court: 'Court 2', score: '6-3, 6-4' },
        { id: '6', player1: 'Brandon Coleman', player2: 'Heather Barnes', date: '2025-05-17', time: '10:00 AM', court: 'Court 1', score: '7-5, 6-2' },
      ];
    default:
      return commonMatches;
  }
}

export function getTournamentFormats(id: string): string[] {
  switch(id) {
    case '1': return ['ladder', 'singleElimination']; // Summer Classic has ladder and elimination phases
    case '2': return ['roundRobin']; // Club Championship 
    case '3': return ['ladder']; // Ladder League
    case '4': return ['singleElimination']; // Spring Invitational
    case '5': return ['roundRobin']; // Junior Development Series
    default: return [];
  }
}

// Maps tournament type to display name
export function getTournamentTypeDisplay(type: string): string {
  switch(type) {
    case 'ladder': return 'Ladder';
    case 'roundRobin': return 'Round Robin';
    case 'singleElimination': return 'Single Elimination';
    case 'doubleElimination': return 'Double Elimination';
    case 'swiss': return 'Swiss System';
    case 'groupStage': return 'Group Stage';
    case 'custom': return 'Custom';
    default: return 'Unknown';
  }
} 