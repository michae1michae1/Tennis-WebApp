'use client';

import React from 'react';
import { getTournamentPlayers, getTournamentMatches } from '@/app/utils/tournamentUtils';

interface LadderBracketProps {
  tournamentId: string;
}

export default function LadderBracket({ tournamentId }: LadderBracketProps) {
  const players = getTournamentPlayers(tournamentId);
  const matches = getTournamentMatches(tournamentId);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {players.map((player, index) => (
          <div
            key={player.id}
            className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-primary">#{player.rank}</span>
              <span className="text-gray-800">{player.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {matches.map((match) => {
                if (match.player1 === player.name || match.player2 === player.name) {
                  const isWinner =
                    (match.score !== 'Not played' &&
                      ((match.player1 === player.name && match.score.split(',')[0].trim().startsWith('6')) ||
                        (match.player2 === player.name && match.score.split(',')[0].trim().startsWith('3'))));
                  return (
                    <span
                      key={match.id}
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                        match.score === 'Not played'
                          ? 'bg-gray-100 text-gray-500'
                          : isWinner
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {match.score === 'Not played' ? '-' : isWinner ? 'W' : 'L'}
                    </span>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Matches</h3>
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="text-gray-800">{match.player1}</span>
                <span className="text-sm text-gray-500">vs</span>
                <span className="text-gray-800">{match.player2}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{match.date}</span>
                <span className="font-medium text-primary">{match.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 