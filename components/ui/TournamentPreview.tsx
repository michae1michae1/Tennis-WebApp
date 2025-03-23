'use client';

import React from 'react';

interface TournamentOption {
  id: string;
  label: string;
  icon: string;
  type?: 'regular' | 'indicator';
  category?: string;
  structureId?: string; // Unique ID for structure elements
}

interface TournamentPreviewProps {
  options: TournamentOption[];
  name: string;
  structureIndicators?: Record<string, TournamentOption[]>;
  activeStructureId?: string | null;
}

export default function TournamentPreview({ 
  options, 
  name, 
  structureIndicators = {}, 
  activeStructureId = null 
}: TournamentPreviewProps) {
  // Separate regular options and indicators
  const regularOptions = options.filter(opt => opt.type !== 'indicator');
  const indicators = options.filter(opt => opt.type === 'indicator');
  
  // Get structures in the options
  const structures = regularOptions.filter(opt => opt.category === 'structure');
  
  // Get indicators for currently active structure
  const activeStructure = structures.find(s => s.structureId === activeStructureId);
  const activeStructureIndicators = activeStructure && activeStructure.structureId 
    ? structureIndicators[activeStructure.structureId] || []
    : [];
  
  // Combine global indicators with active structure indicators
  const allIndicators = [...indicators, ...activeStructureIndicators];
  
  // Get format indicator if present
  const formatIndicator = allIndicators.find(ind => ind.category === 'format');
  
  // Get scoring indicators
  const scoringIndicators = allIndicators.filter(ind => ind.category === 'scoring');
  
  // Get scheduling indicators
  const schedulingIndicators = allIndicators.filter(ind => ind.category === 'scheduling');
  
  // Get additional feature indicators
  const additionalIndicators = allIndicators.filter(ind => ind.category === 'additional');
  
  // Determine tournament type from options 
  // Prioritize active structure if present, otherwise show preview based on all structures
  let previewType = 'default';
  
  if (activeStructure) {
    if (activeStructure.id === 'ladder') previewType = 'ladder';
    else if (activeStructure.id === 'roundRobin') previewType = 'roundRobin';
    else if (activeStructure.id === 'doubleElimination') previewType = 'doubleElimination';
    else if (activeStructure.id === 'elimination' || activeStructure.id === 'groupStage') previewType = 'elimination';
  } else {
    const hasElimination = structures.some(opt => opt.id === 'elimination');
    const hasDoubleElimination = structures.some(opt => opt.id === 'doubleElimination');
    const hasRoundRobin = structures.some(opt => opt.id === 'roundRobin');
    const hasGroupStage = structures.some(opt => opt.id === 'groupStage');
    const isLadder = structures.some(opt => opt.id === 'ladder');
    
    if (isLadder) previewType = 'ladder';
    else if (hasRoundRobin) previewType = 'roundRobin';
    else if (hasDoubleElimination) previewType = 'doubleElimination';
    else if (hasElimination || hasGroupStage) previewType = 'elimination';
  }
  
  // Render appropriate preview based on tournament type
  const renderPreview = () => {
    switch (previewType) {
      case 'ladder':
        return <LadderPreview format={formatIndicator} />;
      case 'roundRobin':
        return <RoundRobinPreview format={formatIndicator} />;
      case 'doubleElimination':
        return <DoubleEliminationPreview format={formatIndicator} />;
      case 'elimination':
        return <EliminationPreview format={formatIndicator} />;
      default:
        return <DefaultPreview />;
    }
  };

  // Render function for indicator tags
  const renderIndicatorTag = (indicator: TournamentOption) => {
    // Different background colors based on category
    let className = "ml-2 text-sm px-2 py-0.5 rounded-full ";
    
    switch (indicator.category) {
      case 'format':
        className += "bg-primary/10 text-primary";
        break;
      case 'scoring':
        className += "bg-green-100 text-green-700";
        break;
      case 'scheduling':
        className += "bg-blue-100 text-blue-700";
        break;
      case 'additional':
        className += "bg-purple-100 text-purple-700";
        break;
      default:
        className += "bg-gray-100 text-gray-700";
    }
    
    return (
      <span key={indicator.id} className={className}>
        {indicator.icon} {indicator.label}
      </span>
    );
  };

  return (
    <div className="mt-4 bg-white rounded shadow-md p-4">
      <h3 className="text-primary font-medium mb-3 flex items-center">
        <span>Tournament Structure Preview</span>
        {activeStructure ? (
          <span className="ml-2 px-2 py-0.5 bg-primary text-white rounded-md text-xs flex items-center">
            {activeStructure.label}
            <span className="ml-1 bg-white text-primary text-[10px] px-1 rounded">Active</span>
          </span>
        ) : structures.length > 0 ? (
          <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-md text-xs">
            Global View
          </span>
        ) : null}
        {formatIndicator && renderIndicatorTag(formatIndicator)}
      </h3>
      
      {/* Scoring indicators */}
      {scoringIndicators.length > 0 && (
        <div className="mb-2">
          <h4 className="text-sm text-gray-600 mb-1">Scoring:</h4>
          <div className="flex flex-wrap gap-1">
            {scoringIndicators.map(renderIndicatorTag)}
          </div>
        </div>
      )}
      
      {/* Scheduling indicators */}
      {schedulingIndicators.length > 0 && (
        <div className="mb-2">
          <h4 className="text-sm text-gray-600 mb-1">Scheduling:</h4>
          <div className="flex flex-wrap gap-1">
            {schedulingIndicators.map(renderIndicatorTag)}
          </div>
        </div>
      )}
      
      {/* Additional feature indicators */}
      {additionalIndicators.length > 0 && (
        <div className="mb-2">
          <h4 className="text-sm text-gray-600 mb-1">Additional Features:</h4>
          <div className="flex flex-wrap gap-1">
            {additionalIndicators.map(renderIndicatorTag)}
          </div>
        </div>
      )}
      
      <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
        {renderPreview()}
      </div>
    </div>
  );
}

// Updated preview components to accept format indicator
interface PreviewComponentProps {
  format?: TournamentOption;
}

// Simple visual representations of tournament types
function EliminationPreview({ format }: PreviewComponentProps) {
  const isSingles = !format || format.id === 'singles';
  
  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex justify-center items-center space-x-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-10 border border-primary rounded flex items-center justify-center text-sm mb-2">
            {isSingles ? 'Player 1' : 'Team 1'}
          </div>
          <div className="w-24 h-10 border border-primary rounded flex items-center justify-center text-sm mb-2">
            {isSingles ? 'Player 2' : 'Team 2'}
          </div>
        </div>
        <div className="flex flex-col items-center ml-4">
          <div className="w-5 h-0.5 bg-primary"></div>
          <div className="w-0.5 h-4 bg-primary"></div>
          <div className="w-24 h-10 border border-primary rounded flex items-center justify-center text-sm mb-2">Semi-Final</div>
          <div className="w-0.5 h-4 bg-primary"></div>
          <div className="w-5 h-0.5 bg-primary"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-10 border border-primary rounded flex items-center justify-center text-sm mb-2">
            {isSingles ? 'Player 3' : 'Team 3'}
          </div>
          <div className="w-24 h-10 border border-primary rounded flex items-center justify-center text-sm mb-2">
            {isSingles ? 'Player 4' : 'Team 4'}
          </div>
        </div>
      </div>
      <div className="w-0.5 h-4 bg-primary"></div>
      <div className="w-32 h-12 border-2 border-primary rounded-lg flex items-center justify-center font-medium text-primary">
        Final
      </div>
    </div>
  );
}

function DoubleEliminationPreview({ format }: PreviewComponentProps) {
  const isSingles = !format || format.id === 'singles';
  
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

function RoundRobinPreview({ format }: PreviewComponentProps) {
  const isSingles = !format || format.id === 'singles';
  const label = isSingles ? 'Player' : 'Team';
  
  return (
    <div className="flex flex-col items-center py-2">
      <table className="border-collapse w-full max-w-md">
        <thead>
          <tr>
            <th className="border border-gray-300 p-1 text-xs">{label}s</th>
            <th className="border border-gray-300 p-1 text-xs">{label} 1</th>
            <th className="border border-gray-300 p-1 text-xs">{label} 2</th>
            <th className="border border-gray-300 p-1 text-xs">{label} 3</th>
            <th className="border border-gray-300 p-1 text-xs">{label} 4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-1 text-xs font-medium">{label} 1</td>
            <td className="border border-gray-300 p-1 text-xs bg-gray-200"></td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-1 text-xs font-medium">{label} 2</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs bg-gray-200"></td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-1 text-xs font-medium">{label} 3</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
            <td className="border border-gray-300 p-1 text-xs bg-gray-200"></td>
            <td className="border border-gray-300 p-1 text-xs">Match</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-1 text-xs font-medium">{label} 4</td>
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

function LadderPreview({ format }: PreviewComponentProps) {
  const isSingles = !format || format.id === 'singles';
  const label = isSingles ? 'Player' : 'Team';
  
  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex flex-col space-y-1 w-full max-w-xs">
        <div className="bg-primary text-white p-2 rounded-t text-center font-medium">Ladder Rankings</div>
        <div className="border border-gray-300 p-2 flex justify-between">
          <span className="font-bold">1.</span>
          <span>{label} 1</span>
          <span>Rating: 1800</span>
        </div>
        <div className="border border-gray-300 p-2 flex justify-between">
          <span className="font-bold">2.</span>
          <span>{label} 2</span>
          <span>Rating: 1750</span>
        </div>
        <div className="border border-gray-300 p-2 flex justify-between">
          <span className="font-bold">3.</span>
          <span>{label} 3</span>
          <span>Rating: 1700</span>
        </div>
        <div className="border border-gray-300 p-2 flex justify-between">
          <span className="font-bold">4.</span>
          <span>{label} 4</span>
          <span>Rating: 1650</span>
        </div>
        <div className="border border-t-0 border-gray-300 p-2 flex items-center justify-center text-sm text-gray-500">
          <span>{label}s can challenge others above them</span>
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