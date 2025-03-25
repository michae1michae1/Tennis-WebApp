import Link from 'next/link';
import { format, parseISO, isEqual } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import TournamentScheduleClient from './TournamentScheduleClient';

// Add this function to define which tournament IDs should be pre-rendered
export async function generateStaticParams() {
  // Return all tournament IDs that should be pre-generated
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

// Tournament Schedule Page
export default function TournamentSchedulePage({ params }: { params: { id: string } }) {
  const tournamentId = params.id;
  
  // Get tournament data
  const tournament = {
    id: tournamentId,
    name: getTournamentName(tournamentId),
    description: getTournamentDescription(tournamentId),
    startDate: getTournamentStartDate(tournamentId),
    endDate: getTournamentEndDate(tournamentId),
    type: getTournamentType(tournamentId),
    status: 'draft',
    organizer: {
      name: 'Tennis Club Admin',
      email: 'admin@tennisclub.com'
    },
    matches: getTournamentMatches(tournamentId)
  };
  
  // Helper functions to get tournament data based on ID
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

  function getTournamentDescription(id: string): string {
    switch(id) {
      case '1': return 'Annual summer tournament with ladder and elimination phases';
      case '2': return 'Official club championship with round-robin format';
      case '3': return 'Ongoing ladder tournament for club members';
      case '4': return 'Special invitation tournament for top ranked players';
      case '5': return 'Tournament series for junior players under 18';
      default: return 'Tournament details not available';
    }
  }

  function getTournamentStartDate(id: string): string {
    switch(id) {
      case '1': return '2025-05-30';
      case '2': return '2025-06-15';
      case '3': return '2025-05-01';
      case '4': return '2025-05-18';
      case '5': return '2025-06-05';
      default: return '2025-01-01';
    }
  }

  function getTournamentEndDate(id: string): string {
    switch(id) {
      case '1': return '2025-06-09';
      case '2': return '2025-06-25';
      case '3': return '2025-07-31';
      case '4': return '2025-05-20';
      case '5': return '2025-06-07';
      default: return '2025-01-02';
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

  function getTournamentMatches(id: string): any[] {
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
      case '2': // Club Championship
        return [
          ...commonMatches,
          { id: '5', player1: 'Christopher King', player2: 'Jessica Scott', date: '2025-06-16', time: '9:00 AM', court: 'Court 1', score: 'Not played' },
          { id: '6', player1: 'Matthew Carter', player2: 'Amanda Harris', date: '2025-06-17', time: '11:00 AM', court: 'Court 2', score: 'Not played' },
          { id: '7', player1: 'Andrew Phillips', player2: 'Stephanie Thomas', date: '2025-06-18', time: '1:00 PM', court: 'Court 3', score: 'Not played' },
          { id: '8', player1: 'Kevin Rivera', player2: 'Emily Flores', date: '2025-06-20', time: '10:00 AM', court: 'Court 1', score: 'Not played' },
          { id: '9', player1: 'Ryan Cooper', player2: 'Nicole Reed', date: '2025-06-22', time: '3:00 PM', court: 'Court 2', score: 'Not played' },
          { id: '10', player1: 'TBD', player2: 'TBD', date: '2025-06-25', time: '5:00 PM', court: 'Court 1', score: 'Not played', round: 'Final' }
        ];
      case '3': // Ladder League
        return [
          ...commonMatches,
          { id: '5', player1: 'Joshua Ward', player2: 'Rebecca Ross', date: '2025-05-10', time: '2:00 PM', court: 'Court 2', score: '6-3, 6-4' },
          { id: '6', player1: 'Brandon Coleman', player2: 'Heather Barnes', date: '2025-05-17', time: '10:00 AM', court: 'Court 1', score: '7-5, 6-2' },
          { id: '7', player1: 'Peter Hughes', player2: 'Megan Powell', date: '2025-05-24', time: '1:00 PM', court: 'Court 3', score: '6-7, 6-3, 6-4' },
          { id: '8', player1: 'Samuel Henderson', player2: 'Rachel Butler', date: '2025-06-07', time: '4:00 PM', court: 'Court 1', score: 'Not played' },
          { id: '9', player1: 'Gregory Brooks', player2: 'Katherine Kelly', date: '2025-06-14', time: '11:00 AM', court: 'Court 2', score: 'Not played' },
          { id: '10', player1: 'Timothy Russell', player2: 'Christine Diaz', date: '2025-06-21', time: '9:00 AM', court: 'Court 1', score: 'Not played' }
        ];
      case '4': // Spring Invitational
        return [
          { id: '1', player1: 'Jeremy Cox', player2: 'Hannah Foster', date: '2025-05-18', time: '10:00 AM', court: 'Court 1', score: '6-2, 6-1' },
          { id: '2', player1: 'Edward Simmons', player2: 'Angela Bell', date: '2025-05-18', time: '1:00 PM', court: 'Court 2', score: '6-4, 7-6' },
          { id: '3', player1: 'Aaron Gray', player2: 'Melissa Murphy', date: '2025-05-19', time: '9:00 AM', court: 'Court 1', score: '3-6, 6-4, 6-3' },
          { id: '4', player1: 'Kyle Price', player2: 'Laura Howard', date: '2025-05-19', time: '11:30 AM', court: 'Court 3', score: '6-0, 6-2' },
          { id: '5', player1: 'Jeremy Cox', player2: 'Aaron Gray', date: '2025-05-20', time: '10:00 AM', court: 'Court 1', score: 'Not played', round: 'Final' }
        ];
      case '5': // Junior Development Series
        return [
          { id: '1', player1: 'Jacob Baker (U14)', player2: 'Tyler Bennett (U14)', date: '2025-06-05', time: '9:00 AM', court: 'Court 1', score: 'Not played' },
          { id: '2', player1: 'Zoe Parker (U14)', player2: 'Chloe Nguyen (U14)', date: '2025-06-05', time: '11:00 AM', court: 'Court 2', score: 'Not played' },
          { id: '3', player1: 'Ethan Nelson (U16)', player2: 'Noah Gomez (U16)', date: '2025-06-06', time: '9:00 AM', court: 'Court 1', score: 'Not played' },
          { id: '4', player1: 'Ava Morgan (U16)', player2: 'Madison Edwards (U16)', date: '2025-06-06', time: '11:00 AM', court: 'Court 3', score: 'Not played' },
          { id: '5', player1: 'TBD (U14)', player2: 'TBD (U14)', date: '2025-06-07', time: '10:00 AM', court: 'Court 1', score: 'Not played', round: 'Final (U14)' },
          { id: '6', player1: 'TBD (U16)', player2: 'TBD (U16)', date: '2025-06-07', time: '1:00 PM', court: 'Court 1', score: 'Not played', round: 'Final (U16)' }
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
        <h1 className="text-primary mb-2">{tournament.name} - Schedule</h1>
        <p className="text-gray-600 mb-4">
          {tournament.startDate} to {tournament.endDate}
        </p>
      </div>

      <TournamentScheduleClient tournament={tournament} />
    </div>
  );
} 