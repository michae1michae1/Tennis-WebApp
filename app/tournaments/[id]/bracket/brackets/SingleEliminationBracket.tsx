'use client';

import React from 'react';
import { getTournamentPlayers, getTournamentMatches } from '@/app/utils/tournamentUtils';

interface SingleEliminationBracketProps {
  tournamentId: string;
}

export default function SingleEliminationBracket({ tournamentId }: SingleEliminationBracketProps) {
  const players = getTournamentPlayers(tournamentId);
  const matches = getTournamentMatches(tournamentId);

  // Organize matches into rounds
  const rounds = [
    // Quarter-finals
    [
      { id: '1', player1: players[0].name, player2: players[7].name, score: '6-4, 7-5' },
      { id: '2', player1: players[3].name, player2: players[4].name, score: '3-6, 6-3, 6-2' },
      { id: '3', player1: players[2].name, player2: players[5].name, score: 'Not played' },
      { id: '4', player1: players[1].name, player2: players[6].name, score: 'Not played' },
    ],
    // Semi-finals
    [
      { id: '5', player1: 'Winner QF1', player2: 'Winner QF2', score: 'Not played' },
      { id: '6', player1: 'Winner QF3', player2: 'Winner QF4', score: 'Not played' },
    ],
    // Final
    [
      { id: '7', player1: 'Winner SF1', player2: 'Winner SF2', score: 'Not played' },
    ],
  ];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] p-4">
        <div className="flex justify-between items-stretch h-[600px]">
          {rounds.map((round, roundIndex) => (
            <div
              key={roundIndex}
              className="flex-1 flex flex-col justify-around px-4"
            >
              <h3 className="text-center text-sm font-medium text-gray-600 mb-4">
                {roundIndex === 0 ? 'Quarter Finals' :
                 roundIndex === 1 ? 'Semi Finals' :
                 'Final'}
              </h3>
              <div className="space-y-8">
                {round.map((match) => (
                  <div
                    key={match.id}
                    className="relative"
                  >
                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{match.player1}</span>
                          <span className="text-sm text-gray-600">
                            {match.score !== 'Not played' ? match.score.split(',')[0] : '-'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{match.player2}</span>
                          <span className="text-sm text-gray-600">
                            {match.score !== 'Not played' ? match.score.split(',')[1] : '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Connector lines */}
                    {roundIndex < rounds.length - 1 && (
                      <div className="absolute top-1/2 right-0 w-4 h-px bg-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 