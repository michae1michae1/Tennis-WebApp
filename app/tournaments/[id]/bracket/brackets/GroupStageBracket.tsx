'use client';

import React from 'react';

interface GroupStageBracketProps {
  tournamentId: string;
}

export default function GroupStageBracket({ tournamentId }: GroupStageBracketProps) {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Group Stage + Knockout
      </h2>
      <p className="text-gray-600">
        This tournament structure is coming soon.
      </p>
    </div>
  );
} 