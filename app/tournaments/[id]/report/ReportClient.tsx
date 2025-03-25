'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ReportScoreForm, { MatchScore } from './ReportScoreForm';

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

type Tournament = {
  id: string;
  name: string;
  type: string;
  matches: Match[];
};

export default function ReportClient({ tournament }: { tournament: Tournament }) {
  const router = useRouter();
  
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [reportingScore, setReportingScore] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Handle selecting a match to report
  const handleSelectMatch = (match: Match) => {
    setSelectedMatch(match);
    setReportingScore(true);
  };
  
  // Handle submission of score
  const handleScoreSubmit = (score: MatchScore) => {
    // In a real app, this would make an API call
    console.log('Submitting score for match:', selectedMatch?.id, score);
    
    // Show success message
    setSuccessMessage(`Score reported successfully for ${selectedMatch?.player1} vs ${selectedMatch?.player2}`);
    setReportingScore(false);
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
      // Navigate back to tournament page
      router.push(`/tournaments/${tournament.id}`);
    }, 3000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Report Match Results</h1>
        <Link href={`/tournaments/${tournament.id}`} className="text-primary hover:text-primary-dark flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Tournament
        </Link>
      </div>
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {successMessage}
        </div>
      )}
      
      <div className="card">
        <h3 className="text-primary mb-4">Unplayed Matches</h3>
        {tournament.matches.length > 0 ? (
          <div className="space-y-4">
            {tournament.matches.map(match => (
              <div 
                key={match.id} 
                className="border rounded p-4 hover:border-primary cursor-pointer"
                onClick={() => handleSelectMatch(match)}
              >
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <span className="font-medium">
                    {match.round ? `${match.round}: ` : ''}
                    {match.player1} vs {match.player2}
                  </span>
                  <div className="text-sm text-gray-500">
                    {match.date} {match.time && `• ${match.time}`} {match.court && `• ${match.court}`}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Score not reported</span>
                  <button className="btn btn-primary btn-sm">Report Score</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No unplayed matches to report scores for.
          </div>
        )}
      </div>
      
      {reportingScore && selectedMatch && (
        <ReportScoreForm
          matchId={selectedMatch.id}
          player1={selectedMatch.player1}
          player2={selectedMatch.player2}
          tournamentType={tournament.type}
          onClose={() => setReportingScore(false)}
          onSubmit={handleScoreSubmit}
        />
      )}
    </div>
  );
} 