'use client';

import React from 'react';

interface SwissBracketProps {
  tournamentId: string;
}

export default function SwissBracket({ tournamentId }: SwissBracketProps) {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Swiss System Tournament
      </h2>
      <p className="text-gray-600">
        This tournament structure is coming soon.
      </p>
    </div>
  );
} 