'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format, parseISO, isEqual } from 'date-fns';
import { ChevronLeft } from 'lucide-react';

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
  // Set default selected day to the first day of the tournament
  const [selectedDay, setSelectedDay] = useState(parseISO(tournament.startDate));
  
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
    return tournament.matches.filter(match => {
      const matchDate = parseISO(match.date);
      return isEqual(
        new Date(matchDate.getFullYear(), matchDate.getMonth(), matchDate.getDate()),
        new Date(day.getFullYear(), day.getMonth(), day.getDate())
      );
    }).length;
  });
  
  // Filter matches for the selected day
  const matchesForSelectedDay = tournament.matches.filter(match => {
    const matchDate = parseISO(match.date);
    return isEqual(
      new Date(matchDate.getFullYear(), matchDate.getMonth(), matchDate.getDate()),
      new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate())
    );
  });

  return (
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
          <h3 className="text-primary mb-4">
            Matches for {format(selectedDay, 'EEEE, MMMM d, yyyy')}
            {matchesForSelectedDay.length > 0 && (
              <span className="ml-2 text-sm text-gray-500">
                ({matchesForSelectedDay.length} {matchesForSelectedDay.length === 1 ? 'match' : 'matches'})
              </span>
            )}
          </h3>
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
                      <button className="btn btn-secondary btn-sm">Report Score</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No matches scheduled for this day.
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 