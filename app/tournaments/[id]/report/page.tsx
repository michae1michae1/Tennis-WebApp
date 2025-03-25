import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ReportClient from './ReportClient';

// For static site generation
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

// Match type definition
type Match = {
  id: string;
  player1: string;
  player2: string;
  date: string;
  time?: string;
  court?: string;
  score: string;
  round?: string;
};

export default function ReportScorePage({ params }: { params: { id: string } }) {
  const tournamentId = params.id;
  
  // In a real app, this would be fetched from an API
  const tournament = {
    id: tournamentId,
    name: getTournamentName(tournamentId),
    type: getTournamentType(tournamentId),
    matches: getTournamentMatches(tournamentId).filter(match => match.score === 'Not played')
  };
  
  // Helper functions to get tournament data
  function getTournamentName(id: string): string {
    switch(id) {
      case '1': return 'Summer Classic';
      case '2': return 'Club Championship';
      case '3': return 'Ladder League';
      case '4': return 'Spring Invitational';
      case '5': return 'Junior Development Series';
      default: return 'Unknown Tournament';
    }
  }
  
  function getTournamentType(id: string): string {
    switch(id) {
      case '1': return 'custom';
      case '2': return 'roundRobin';
      case '3': return 'ladder';
      case '4': return 'singleElimination';
      case '5': return 'roundRobin';
      default: return 'unknown';
    }
  }
  
  function getTournamentMatches(id: string): Match[] {
    // Basic matches for all tournaments
    const commonMatches = [
      { id: '1', player1: 'John Smith', player2: 'Emma Johnson', date: '2025-06-02', time: '10:00 AM', court: 'Court 1', score: '6-4, 7-5' },
      { id: '2', player1: 'Michael Brown', player2: 'Sarah Davis', date: '2025-06-02', time: '1:00 PM', court: 'Court 2', score: '3-6, 6-3, 6-2' },
      { id: '3', player1: 'David Wilson', player2: 'Olivia Martinez', date: '2025-06-03', time: '9:00 AM', court: 'Court 1', score: 'Not played' },
      { id: '4', player1: 'James Taylor', player2: 'Sophia Anderson', date: '2025-06-03', time: '11:30 AM', court: 'Court 3', score: 'Not played' },
    ];
    
    // Add tournament-specific matches based on ID
    switch(id) {
      case '1': // Summer Classic
        return [
          ...commonMatches,
          { id: '5', player1: 'Robert Clark', player2: 'Elizabeth Lee', date: '2025-06-04', time: '10:00 AM', court: 'Court 1', score: 'Not played' },
          { id: '6', player1: 'William Walker', player2: 'Jennifer Lewis', date: '2025-06-05', time: '2:00 PM', court: 'Court 2', score: 'Not played' },
          { id: '7', player1: 'Thomas Moore', player2: 'Patricia Young', date: '2025-06-06', time: '3:30 PM', court: 'Court 1', score: 'Not played' },
          { id: '8', player1: 'Daniel Garcia', player2: 'Linda Rodriguez', date: '2025-06-07', time: '10:00 AM', court: 'Court 3', score: 'Not played' },
          { id: '9', player1: 'TBD', player2: 'TBD', date: '2025-06-08', time: '1:00 PM', court: 'Court 1', score: 'Not played', round: 'Semi-final' },
          { id: '10', player1: 'TBD', player2: 'TBD', date: '2025-06-09', time: '3:00 PM', court: 'Court 1', score: 'Not played', round: 'Final' }
        ];
      default:
        return commonMatches;
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href={`/tournaments/${tournamentId}`} className="flex items-center text-primary mb-4">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to {tournament.name}
        </Link>
        <h1 className="text-primary mb-2">Report Scores - {tournament.name}</h1>
        <p className="text-gray-600">Select a match to report its score</p>
      </div>
      
      <ReportClient tournament={tournament} />
    </div>
  );
} 