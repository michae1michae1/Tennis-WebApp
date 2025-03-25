'use client';

import React, { useState } from 'react';
import { getTournamentFormats, getTournamentTypeDisplay } from '@/app/utils/tournamentUtils';
import LadderBracket from './LadderBracket';
import SingleEliminationBracket from './SingleEliminationBracket';
import RoundRobinBracket from './RoundRobinBracket';
import DoubleEliminationBracket from './DoubleEliminationBracket';
import SwissBracket from './SwissBracket';
import GroupStageBracket from './GroupStageBracket';

interface CustomBracketProps {
  tournamentId: string;
}

export default function CustomBracket({ tournamentId }: CustomBracketProps) {
  const formats = getTournamentFormats(tournamentId);
  const [activeFormat, setActiveFormat] = useState(formats[0] || '');

  const renderBracket = () => {
    switch (activeFormat) {
      case 'ladder':
        return <LadderBracket tournamentId={tournamentId} />;
      case 'singleElimination':
        return <SingleEliminationBracket tournamentId={tournamentId} />;
      case 'doubleElimination':
        return <DoubleEliminationBracket tournamentId={tournamentId} />;
      case 'roundRobin':
        return <RoundRobinBracket tournamentId={tournamentId} />;
      case 'swiss':
        return <SwissBracket tournamentId={tournamentId} />;
      case 'groupStage':
        return <GroupStageBracket tournamentId={tournamentId} />;
      default:
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold text-gray-700">
              Select a tournament format above
            </h2>
          </div>
        );
    }
  };

  if (formats.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          No tournament formats available
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Format selector tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {formats.map((format) => (
            <button
              key={format}
              onClick={() => setActiveFormat(format)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeFormat === format
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {getTournamentTypeDisplay(format)}
            </button>
          ))}
        </nav>
      </div>

      {/* Selected format bracket */}
      {renderBracket()}
    </div>
  );
} 