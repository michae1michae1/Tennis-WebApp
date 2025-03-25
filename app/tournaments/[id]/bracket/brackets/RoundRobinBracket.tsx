'use client';

import React from 'react';
import { getTournamentPlayers, getTournamentMatches } from '@/app/utils/tournamentUtils';

interface RoundRobinBracketProps {
  tournamentId: string;
}

export default function RoundRobinBracket({ tournamentId }: RoundRobinBracketProps) {
  const players = getTournamentPlayers(tournamentId);
  const matches = getTournamentMatches(tournamentId);

  // Calculate standings
  const standings = players.map(player => {
    const playerMatches = matches.filter(
      match => match.player1 === player.name || match.player2 === player.name
    );
    
    const wins = playerMatches.filter(match => {
      if (match.score === 'Not played') return false;
      const isPlayer1 = match.player1 === player.name;
      const score = match.score.split(',')[0].trim();
      return isPlayer1 ? score.startsWith('6') : score.startsWith('3');
    }).length;

    const losses = playerMatches.filter(match => {
      if (match.score === 'Not played') return false;
      const isPlayer1 = match.player1 === player.name;
      const score = match.score.split(',')[0].trim();
      return isPlayer1 ? score.startsWith('3') : score.startsWith('6');
    }).length;

    return {
      ...player,
      matches: playerMatches.length,
      wins,
      losses,
      points: wins * 2
    };
  }).sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-8">
      {/* Standings Table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Standings</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Matches
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wins
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Losses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {standings.map((player, index) => (
                <tr key={player.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{player.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.matches}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    {player.wins}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                    {player.losses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary font-medium">
                    {player.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Matches */}
      <div>
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