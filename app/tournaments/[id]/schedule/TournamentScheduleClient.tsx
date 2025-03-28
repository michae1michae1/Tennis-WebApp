'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format, parseISO, isEqual } from 'date-fns';
import { ChevronLeft, Plus } from 'lucide-react';
import ScheduleMatchForm, { ScheduleMatchData } from './ScheduleMatchForm';
import ReportScoreForm, { MatchScore } from '../report/ReportScoreForm';
import { useSearchParams } from 'next/navigation';

type Match = {
  id: string;
  player1: string;
  player2: string;
  date: string;
  time: string;
  court: string;
  score: string;
  round?: string;
};

type Tournament = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  matches: Match[];
};

export default function TournamentScheduleClient({ tournament }: { tournament: Tournament }) {
  const searchParams = useSearchParams();
  
  // Set default selected day to the first day of the tournament
  const [selectedDay, setSelectedDay] = useState(parseISO(tournament.startDate));
  
  // Local state for matches (to support adding new matches)
  const [localMatches, setLocalMatches] = useState<Match[]>(tournament.matches);
  
  // State for scheduling form
  const [isScheduling, setIsScheduling] = useState(false);
  const [schedulingPreset, setSchedulingPreset] = useState<{ player1?: string; player2?: string }>({});
  
  // State for score reporting
  const [reportingScore, setReportingScore] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Handle URL params for scheduling
  useEffect(() => {
    const player1 = searchParams.get('player1');
    const player2 = searchParams.get('player2');
    
    if (player1 && player2) {
      setSchedulingPreset({ player1, player2 });
      setIsScheduling(true);
    }
  }, [searchParams]);
  
  // Generate days between start and end date for the calendar
  const start = parseISO(tournament.startDate);
  const end = parseISO(tournament.endDate);
  const calendarDays = [];
  
  let currentDay = new Date(start);
  while (currentDay <= end) {
    calendarDays.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }
  
  // Count matches for each day
  const matchCountByDay = calendarDays.map(day => {
    return localMatches.filter(match => {
      const matchDate = parseISO(match.date);
      return isEqual(
        new Date(matchDate.getFullYear(), matchDate.getMonth(), matchDate.getDate()),
        new Date(day.getFullYear(), day.getMonth(), day.getDate())
      );
    }).length;
  });
  
  // Filter matches for the selected day
  const matchesForSelectedDay = localMatches.filter(match => {
    const matchDate = parseISO(match.date);
    return isEqual(
      new Date(matchDate.getFullYear(), matchDate.getMonth(), matchDate.getDate()),
      new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate())
    );
  });
  
  // Handle scheduling a new match
  const handleScheduleMatch = (matchData: ScheduleMatchData) => {
    // In a real app, this would make an API call
    
    // Create a new match 
    const newMatch: Match = {
      id: `new-${Date.now()}`, // Generate temporary ID
      player1: matchData.player1,
      player2: matchData.player2,
      date: matchData.date,
      time: matchData.time,
      court: matchData.court,
      score: 'Not played'
    };
    
    // Add to local matches
    setLocalMatches(prev => [...prev, newMatch]);
    
    // If the date is different from selected day, switch to that day
    const matchDate = parseISO(matchData.date);
    if (!isEqual(
      new Date(matchDate.getFullYear(), matchDate.getMonth(), matchDate.getDate()),
      new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate())
    )) {
      setSelectedDay(matchDate);
    }
  };

  // Open scheduling form for the selected day
  const openScheduleForm = () => {
    setSchedulingPreset({});
    setIsScheduling(true);
  };

  // Handle reporting a score
  const handleReportScore = (match: Match) => {
    setSelectedMatch(match);
    setReportingScore(true);
  };
  
  // Handle submission of score
  const handleScoreSubmit = (score: MatchScore) => {
    if (!selectedMatch) return;
    
    // In a real app, this would make an API call
    // Format the score for display
    let scoreString = score.sets.map(set => {
      let setScore = `${set.player1Score}-${set.player2Score}`;
      if (set.tiebreak) {
        setScore += ` (${set.tiebreak})`;
      }
      return setScore;
    }).join(', ');
    
    // Add retired/defaulted info if applicable
    if (score.retired) {
      scoreString += ' (retired)';
    } else if (score.defaulted) {
      scoreString += ' (defaulted)';
    }
    
    // Update the match in local state
    const updatedMatches = localMatches.map(m => {
      if (m.id === selectedMatch.id) {
        return {
          ...m,
          score: scoreString
        };
      }
      return m;
    });
    
    setLocalMatches(updatedMatches);
    setReportingScore(false);
    
    // Show success message
    setSuccessMessage(`Score reported successfully for ${selectedMatch.player1} vs ${selectedMatch.player2}`);
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Tournament Schedule</h1>
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
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-primary mb-4">Tournament Days</h3>
            <div className="space-y-2">
              {calendarDays.map((day, index) => {
                const matchCount = matchCountByDay[index];
                const isSelected = isEqual(
                  new Date(day.getFullYear(), day.getMonth(), day.getDate()),
                  new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate())
                );
                
                return (
                  <button
                    key={index}
                    className={`w-full p-3 rounded text-left hover:bg-gray-50 transition-colors relative
                      ${isSelected ? 'bg-primary text-white hover:bg-primary' : ''}`}
                    onClick={() => setSelectedDay(day)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{format(day, 'EEEE')}</div>
                        <div>{format(day, 'MMM d, yyyy')}</div>
                      </div>
                      {matchCount > 0 && (
                        <div className={`flex items-center justify-center rounded-full w-7 h-7 text-sm 
                          ${isSelected ? 'bg-white text-primary' : 'bg-primary/10 text-primary'}`}>
                          {matchCount}
                        </div>
                      )}
                    </div>
                    {/* Visual indicator line for days with matches */}
                    {matchCount === 0 && (
                      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l 
                        ${isSelected ? 'bg-white/50' : 'bg-gray-200'}`}></div>
                    )}
                    {matchCount > 0 && !isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l bg-primary"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main content - matches for selected day */}
        <div className="lg:col-span-3">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-primary">
                Matches for {format(selectedDay, 'EEEE, MMMM d, yyyy')}
                {matchesForSelectedDay.length > 0 && (
                  <span className="ml-2 text-sm text-gray-500">
                    ({matchesForSelectedDay.length} {matchesForSelectedDay.length === 1 ? 'match' : 'matches'})
                  </span>
                )}
              </h3>
              <button 
                onClick={openScheduleForm}
                className="btn btn-primary btn-sm flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" /> Schedule Match
              </button>
            </div>
            {matchesForSelectedDay.length > 0 ? (
              <div className="space-y-4">
                {matchesForSelectedDay.map(match => (
                  <div key={match.id} className="border rounded p-4">
                    <div className="flex flex-col md:flex-row md:justify-between mb-2">
                      <span className="font-medium">
                        {match.round ? `${match.round}: ` : ''}
                        {match.player1} vs {match.player2}
                      </span>
                      <div className="text-sm text-gray-500">
                        {match.time} • {match.court}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={match.score === 'Not played' ? 'text-gray-400' : 'text-gray-800'}>
                        {match.score}
                      </span>
                      {match.score === 'Not played' && (
                        <button 
                          onClick={() => handleReportScore(match)} 
                          className="btn btn-secondary btn-sm"
                        >
                          Report Score
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No matches scheduled for this day. 
                <button 
                  onClick={openScheduleForm}
                  className="text-primary hover:underline ml-1"
                >
                  Schedule one now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Scheduling Form Modal */}
      {isScheduling && (
        <ScheduleMatchForm
          date={selectedDay}
          player1={schedulingPreset.player1}
          player2={schedulingPreset.player2}
          onClose={() => setIsScheduling(false)}
          onSchedule={handleScheduleMatch}
        />
      )}

      {/* Score Reporting Modal */}
      {reportingScore && selectedMatch && (
        <ReportScoreForm
          matchId={selectedMatch.id}
          player1={selectedMatch.player1}
          player2={selectedMatch.player2}
          tournamentType={tournament.id} // Using tournament ID as type, replace with actual type if available
          onClose={() => setReportingScore(false)}
          onSubmit={handleScoreSubmit}
        />
      )}
    </div>
  );
} 