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

import Link from 'next/link';
import { getTournamentType, getTournamentFormats, getTournamentTypeDisplay } from '@/app/utils/tournamentUtils';
import RegistrationButton from '@/app/components/RegistrationButton';
import { Calendar, Trophy, FileText, ChevronLeft } from 'lucide-react';

export default function TournamentDetail({ params }: { params: { id: string } }) {
  // This would be fetched from an API in a real app
  const tournament = {
    id: params.id,
    name: getTournamentName(params.id),
    description: getTournamentDescription(params.id),
    startDate: getTournamentStartDate(params.id),
    endDate: getTournamentEndDate(params.id),
    type: getTournamentType(params.id),
    status: 'draft',
    organizer: {
      name: 'Tennis Club Admin',
      email: 'admin@tennisclub.com'
    },
    players: [
      { id: '1', name: 'John Smith', rank: 1 },
      { id: '2', name: 'Emma Johnson', rank: 2 },
      { id: '3', name: 'Michael Brown', rank: 3 },
      { id: '4', name: 'Sarah Davis', rank: 4 },
      { id: '5', name: 'David Wilson', rank: 5 },
      { id: '6', name: 'Olivia Martinez', rank: 6 },
      { id: '7', name: 'James Taylor', rank: 7 },
      { id: '8', name: 'Sophia Anderson', rank: 8 },
    ],
    matches: [
      { id: '1', player1: 'John Smith', player2: 'Emma Johnson', date: '2025-06-02', score: '6-4, 7-5' },
      { id: '2', player1: 'Michael Brown', player2: 'Sarah Davis', date: '2025-06-02', score: '3-6, 6-3, 6-2' },
      { id: '3', player1: 'David Wilson', player2: 'Olivia Martinez', date: '2025-06-03', score: 'Not played' },
      { id: '4', player1: 'James Taylor', player2: 'Sophia Anderson', date: '2025-06-03', score: 'Not played' },
    ]
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
      default: return 'Date not available';
    }
  }

  function getTournamentEndDate(id: string): string {
    switch(id) {
      case '1': return '2025-06-09';
      case '2': return '2025-06-25';
      case '3': return '2025-07-31';
      case '4': return '2025-05-20';
      case '5': return '2025-06-07';
      default: return 'Date not available';
    }
  }

  const tournamentType = getTournamentType(params.id);
  const isCustomType = tournamentType === 'custom';
  const formats = isCustomType ? getTournamentFormats(params.id) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <Link href="/tournaments" className="text-primary hover:text-primary-dark flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Tournaments
            </Link>
            <h1 className="text-primary">{tournament.name}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {isCustomType ? (
              <>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Custom Format
                </span>
                {formats.map((format, index) => (
                  <span key={index} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {getTournamentTypeDisplay(format)}
                  </span>
                ))}
              </>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {getTournamentTypeDisplay(tournamentType)}
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {tournament.status}
            </span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{tournament.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Dates:</span> {tournament.startDate} - {tournament.endDate}
          </div>
          <div>
            <span className="font-medium">Organizer:</span> {tournament.organizer.name}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left sidebar */}
        <div className="lg:col-span-1">
          <div className="card mb-6">
            <h3 className="text-primary mb-4 text-center">Tournament Options</h3>
            <div className="space-y-2">
              <RegistrationButton tournamentId={params.id} />
              <Link href={`/tournaments/${params.id}/bracket`} className="btn btn-outline w-full text-center flex justify-center items-center gap-2">
                <Trophy size={18} />
                View {isCustomType 
                  ? (formats.includes('ladder') ? 'Ladder & Bracket' : 'Bracket')
                  : tournamentType === 'ladder' ? 'Ladder' : 
                    tournamentType === 'roundRobin' ? 'Round Robin' :
                    tournamentType === 'singleElimination' ? 'Bracket' :
                    tournamentType === 'doubleElimination' ? 'Double Elimination' :
                    tournamentType === 'swiss' ? 'Swiss System' :
                    tournamentType === 'groupStage' ? 'Group Stage' : 'Bracket'}
              </Link>
              <Link href={`/tournaments/${params.id}/schedule`} className="btn btn-outline w-full text-center flex justify-center items-center gap-2">
                <Calendar size={18} />
                View Schedule
              </Link>
              <Link href={`/tournaments/${params.id}/report`} className="btn btn-outline w-full text-center flex justify-center items-center gap-2">
                <FileText size={18} />
                Report Match
              </Link>
            </div>
          </div>

          <div className="card">
            <h3 className="text-primary mb-4">Players</h3>
            <div className="space-y-2">
              {tournament.players.map(player => (
                <div key={player.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <span>{player.name}</span>
                  <span className="text-sm bg-primary/10 px-2 py-1 rounded">Rank: {player.rank}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h3 className="text-primary mb-4">Upcoming Matches</h3>
            <div className="space-y-4">
              {tournament.matches.map(match => (
                <div key={match.id} className="border rounded p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{match.player1} vs {match.player2}</span>
                    <span className="text-sm text-gray-500">{match.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={match.score === 'Not played' ? 'text-gray-400' : 'text-gray-800'}>
                      {match.score}
                    </span>
                    {match.score === 'Not played' && (
                      <Link 
                        href={`/tournaments/${params.id}/schedule?player1=${encodeURIComponent(match.player1)}&player2=${encodeURIComponent(match.player2)}`} 
                        className="btn btn-secondary btn-sm"
                      >
                        Schedule
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-primary mb-4">Tournament Rules</h3>
            <div className="space-y-2">
              <div className="p-2 border-b">
                <span className="font-medium">Format:</span> Best of 3 sets
              </div>
              <div className="p-2 border-b">
                <span className="font-medium">Tiebreak:</span> Standard 7-point tiebreak at 6-6
              </div>
              <div className="p-2 border-b">
                <span className="font-medium">Scoring:</span> Standard scoring
              </div>
              <div className="p-2">
                <span className="font-medium">Match Time:</span> 90 minute maximum
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 