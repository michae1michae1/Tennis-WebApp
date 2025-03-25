'use client';

import React from 'react';

interface DoubleEliminationBracketProps {
  tournamentId: string;
}

export default function DoubleEliminationBracket({ tournamentId }: DoubleEliminationBracketProps) {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Double Elimination Bracket
      </h2>
      <p className="text-gray-600">
        This tournament structure is coming soon.
      </p>
    </div>
  );
} 