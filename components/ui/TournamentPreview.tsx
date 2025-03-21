'use client';

import React from 'react';

interface TournamentOption {
  id: string;
  label: string;
  icon: string;
}

interface TournamentPreviewProps {
  options: TournamentOption[];
  name: string;
}

export default function TournamentPreview({ options, name }: TournamentPreviewProps) {
  // Determine tournament type from options
  const hasElimination = options.some(opt => opt.id === 'elimination');
  const hasDoubleElimination = options.some(opt => opt.id === 'doubleElimination');
  const hasRoundRobin = options.some(opt => opt.id === 'roundRobin');
  const hasGroupStage = options.some(opt => opt.id === 'groupStage');
  const isLadder = options.some(opt => opt.id === 'ladder');
  
  // Render appropriate preview based on tournament type
  const renderPreview = () => {
    if (isLadder) {
      return <LadderPreview />;
    } else if (hasRoundRobin) {
      return <RoundRobinPreview />;
    } else if (hasDoubleElimination) {
      return <DoubleEliminationPreview />;
    } else if (hasElimination || hasGroupStage) {
      return <EliminationPreview />;
    } else {
      return <DefaultPreview />;
    }
  };

  return (
    <div className="mt-4 bg-white rounded shadow-md p-4">
      <h3 className="text-primary font-medium mb-3">
        Tournament Structure Preview
      </h3>
      <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
        {renderPreview()}
      </div>
    </div>
  );
}

// Simple visual representations of tournament types
function EliminationPreview() {
  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex justify-center items-center space-x-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-10 border border-primary rounded flex items-center justify-center text-sm mb-2">Player 1</div>
          <div className="w-24 h-10 border border-primary rounded flex items-center justify-center text-sm mb-2">Player 2</div>
        </div>
        <div className="flex flex-col items-center ml-4">
          <div className="w-5 h-0.5 bg-primary"></div>
          <div className="w-0.5 h-4 bg-primary"></div>
          <div className="w-24 h-10 border border-primary rounded flex items-center justify-center text-sm mb-2">Semi-Final</div>
          <div className="w-0.5 h-4 bg-primary"></div>
          <div className="w-5 h-0.5 bg-primary"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-10 border border-primary rounded flex items-center justify-center text-sm mb-2">Player 3</div>
          <div className="w-24 h-10 border border-primary rounded flex items-center justify-center text-sm mb-2">Player 4</div>
        </div>
      </div>
      <div className="w-0.5 h-4 bg-primary"></div>
      <div className="w-32 h-12 border-2 border-primary rounded-lg flex items-center justify-center font-medium text-primary">
        Final
      </div>
    </div>
  );
}

function DoubleEliminationPreview() {
  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex justify-between w-full mb-4">
        <div className="bg-green-100 border border-green-500 p-2 rounded text-sm w-1/3">
          Winners Bracket
        </div>
        <div className="bg-yellow-100 border border-yellow-500 p-2 rounded text-sm w-1/3">
          Losers Bracket
        </div>
      </div>
      <div className="flex flex-row space-x-10">
        <div className="flex flex-col space-y-2">
          <div className="w-24 h-8 border border-green-600 rounded flex items-center justify-center text-xs">Match 1</div>
          <div className="w-24 h-8 border border-green-600 rounded flex items-center justify-center text-xs">Match 2</div>
        </div>
        <div className="flex flex-col">
          <div className="w-24 h-8 border border-green-600 rounded flex items-center justify-center text-xs">Winners Final</div>
          <div className="h-8"></div>
          <div className="w-24 h-8 border border-yellow-600 rounded flex items-center justify-center text-xs">Losers Final</div>
        </div>
      </div>
      <div className="mt-4 w-32 h-10 border-2 border-primary rounded-lg flex items-center justify-center font-medium">
        Grand Final
      </div>
    </div>
  );
}

function RoundRobinPreview() {
  return (
    <div className="flex flex-col items-center py-2">
      <table className="border-collapse w-full max-w-md">
        <thead>
          <tr>
            <th className="border border-gray-300 p-1 text-xs">Players</th>
            <th className="border border-gray-300 p-1 text-xs">Player 1</th>
            <th className="border border-gray-300 p-1 text-xs">Player 2</th>
            <th className="border border-gray-300 p-1 text-xs">Player 3</th>
            <th className="border border-gray-300 p-1 text-xs">Player 4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-1 text-xs font-medium">Player 1</td>
            <td className="border border-gray-300 p-1 text-xs bg-gray-200"></td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-1 text-xs font-medium">Player 2</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs bg-gray-200"></td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-1 text-xs font-medium">Player 3</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs bg-gray-200"></td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-1 text-xs font-medium">Player 4</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs bg-gray-200"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function LadderPreview() {
  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex flex-col space-y-1 w-full max-w-xs">
        <div className="bg-primary text-white p-2 rounded-t text-center font-medium">Ladder Rankings</div>
        <div className="border border-gray-300 p-2 flex justify-between">
          <span className="font-bold">1.</span>
          <span>Player 1</span>
          <span>Rating: 1800</span>
        </div>
        <div className="border border-gray-300 p-2 flex justify-between">
          <span className="font-bold">2.</span>
          <span>Player 2</span>
          <span>Rating: 1750</span>
        </div>
        <div className="border border-gray-300 p-2 flex justify-between">
          <span className="font-bold">3.</span>
          <span>Player 3</span>
          <span>Rating: 1700</span>
        </div>
        <div className="border border-gray-300 p-2 flex justify-between">
          <span className="font-bold">4.</span>
          <span>Player 4</span>
          <span>Rating: 1650</span>
        </div>
        <div className="border border-t-0 border-gray-300 p-2 flex items-center justify-center text-sm text-gray-500">
          <span>Players can challenge others above them</span>
        </div>
      </div>
    </div>
  );
}

function DefaultPreview() {
  return (
    <div className="py-6 flex items-center justify-center text-gray-500">
      Select tournament options to see a preview
    </div>
  );
} 