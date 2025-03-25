'use client';

import React from 'react';
import SingleEliminationBracket from './brackets/SingleEliminationBracket';
import DoubleEliminationBracket from './brackets/DoubleEliminationBracket';
import RoundRobinBracket from './brackets/RoundRobinBracket';
import LadderBracket from './brackets/LadderBracket';
import SwissBracket from './brackets/SwissBracket';
import GroupStageBracket from './brackets/GroupStageBracket';
import CustomBracket from './brackets/CustomBracket';
import Link from 'next/link';
import { getTournamentTypeDisplay } from '@/app/utils/tournamentUtils';

interface BracketClientProps {
  tournamentId: string;
  tournamentType: string;
}

export default function BracketClient({ tournamentId, tournamentType }: BracketClientProps) {
  const renderBracket = () => {
    switch (tournamentType) {
      case 'singleElimination':
        return <SingleEliminationBracket tournamentId={tournamentId} />;
      case 'doubleElimination':
        return <DoubleEliminationBracket tournamentId={tournamentId} />;
      case 'roundRobin':
        return <RoundRobinBracket tournamentId={tournamentId} />;
      case 'ladder':
        return <LadderBracket tournamentId={tournamentId} />;
      case 'swiss':
        return <SwissBracket tournamentId={tournamentId} />;
      case 'groupStage':
        return <GroupStageBracket tournamentId={tournamentId} />;
      case 'custom':
        return <CustomBracket tournamentId={tournamentId} />;
      default:
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold text-gray-700">
              Tournament structure not supported
            </h2>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Tournament Structure</h1>
          <p className="text-gray-600 mt-1">
            {tournamentType === 'custom' 
              ? 'This tournament uses multiple formats' 
              : `${getTournamentTypeDisplay(tournamentType)} format`}
          </p>
        </div>
        <Link href={`/tournaments/${tournamentId}`} className="text-primary hover:text-primary-dark flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Tournament
        </Link>
      </div>
      {renderBracket()}
    </div>
  );
} 