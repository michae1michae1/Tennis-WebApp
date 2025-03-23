'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FlowchartConnector from '@/components/ui/FlowchartConnector';
import TournamentPreview from '@/components/ui/TournamentPreview';

// Patching react-beautiful-dnd for React 18
interface StrictModeDroppableProps {
  children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactElement;
  droppableId: string;
  [key: string]: any;
}

const StrictModeDroppable = ({ children, ...props }: StrictModeDroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  
  useEffect(() => {
    // This is needed for react-beautiful-dnd to work in React 18 strict mode
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  
  if (!enabled) {
    return null;
  }
  
  return <Droppable {...props}>{children}</Droppable>;
};

// Define types
interface TournamentOption {
  id: string;
  label: string;
  icon: string;
  type?: 'regular' | 'indicator'; // Added type field to distinguish indicators from regular options
  category?: string; // Added category field to track the source category
  structureId?: string; // Unique ID for structure elements
}

interface OptionCategory {
  id: string;
  title: string;
  options: TournamentOption[];
  isIndicator?: boolean; // Whether this category contains indicators
}

// Tournament option categories
const optionCategories: OptionCategory[] = [
  {
    id: 'format',
    title: 'Format Indicators',
    isIndicator: true, // Mark as indicator category
    options: [
      { id: 'singles', label: 'Singles', icon: '👤', type: 'indicator', category: 'format' },
      { id: 'doubles', label: 'Doubles', icon: '👥', type: 'indicator', category: 'format' },
      { id: 'mixed', label: 'Mixed Doubles', icon: '👫', type: 'indicator', category: 'format' }
    ]
  },
  {
    id: 'structure',
    title: 'Tournament Structure',
    options: [
      { id: 'elimination', label: 'Single Elimination', icon: '🏆', type: 'regular', category: 'structure' },
      { id: 'doubleElimination', label: 'Double Elimination', icon: '🔄', type: 'regular', category: 'structure' },
      { id: 'roundRobin', label: 'Round Robin', icon: '🔁', type: 'regular', category: 'structure' },
      { id: 'swiss', label: 'Swiss System', icon: '🇨🇭', type: 'regular', category: 'structure' },
      { id: 'ladder', label: 'Ladder Tournament', icon: '🪜', type: 'regular', category: 'structure' },
      { id: 'groupStage', label: 'Group Stage + Knockout', icon: '👥➡️🏆', type: 'regular', category: 'structure' }
    ]
  },
  {
    id: 'scoring',
    title: 'Scoring Rules',
    isIndicator: true, // Mark as indicator category
    options: [
      { id: 'bestOf3', label: 'Best of 3 Sets', icon: '3️⃣', type: 'indicator', category: 'scoring' },
      { id: 'bestOf5', label: 'Best of 5 Sets', icon: '5️⃣', type: 'indicator', category: 'scoring' },
      { id: 'proSets', label: 'Pro Sets (8 or 10 games)', icon: '🎮', type: 'indicator', category: 'scoring' },
      { id: 'fastFour', label: 'Fast4 Format', icon: '⏱️', type: 'indicator', category: 'scoring' },
      { id: 'tiebreak', label: 'Tiebreak Deciding Set', icon: '🔄', type: 'indicator', category: 'scoring' },
      { id: 'noAd', label: 'No-Ad Scoring', icon: '⏭️', type: 'indicator', category: 'scoring' }
    ]
  },
  {
    id: 'scheduling',
    title: 'Scheduling Options',
    isIndicator: true, // Mark as indicator category
    options: [
      { id: 'fixedSchedule', label: 'Fixed Schedule', icon: '📅', type: 'indicator', category: 'scheduling' },
      { id: 'playerArranged', label: 'Player-Arranged Matches', icon: '🤝', type: 'indicator', category: 'scheduling' },
      { id: 'weekendTournament', label: 'Weekend Tournament', icon: '🌞', type: 'indicator', category: 'scheduling' },
      { id: 'multiWeek', label: 'Multi-Week Tournament', icon: '📆', type: 'indicator', category: 'scheduling' }
    ]
  },
  {
    id: 'additional',
    title: 'Additional Features',
    isIndicator: true, // Mark as indicator category
    options: [
      { id: 'seeding', label: 'Player Seeding', icon: '🌱', type: 'indicator', category: 'additional' },
      { id: 'consolation', label: 'Consolation Bracket', icon: '🥈', type: 'indicator', category: 'additional' },
      { id: 'umpires', label: 'Umpired Matches', icon: '👨‍⚖️', type: 'indicator', category: 'additional' },
      { id: 'courtAssignment', label: 'Automatic Court Assignment', icon: '🎾', type: 'indicator', category: 'additional' },
      { id: 'weatherPolicy', label: 'Weather Policy', icon: '☔', type: 'indicator', category: 'additional' },
      { id: 'ageGroups', label: 'Age Group Divisions', icon: '👶👨👵', type: 'indicator', category: 'additional' }
    ]
  }
];

export default function CreateTournamentPage() {
  const router = useRouter();
  const [tournamentName, setTournamentName] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<TournamentOption[]>([]);
  const [flowchartElements, setFlowchartElements] = useState<TournamentOption[]>([]);
  const [selectedIndicators, setSelectedIndicators] = useState<TournamentOption[]>([]);
  const [activeStructureId, setActiveStructureId] = useState<string | null>(null);
  // Track indicators for each structure element by structure element id
  const [structureIndicators, setStructureIndicators] = useState<Record<string, TournamentOption[]>>({});
  const [showHelper, setShowHelper] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Patch react-beautiful-dnd for React 18
  useEffect(() => {
    // This is to fix the issue with react-beautiful-dnd in React 18
    const originalGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = (elt: Element) => {
      const style = originalGetComputedStyle(elt);
      if (elt instanceof HTMLElement && elt.style.transform && style.transform === 'none') {
        // Force return the transform that was set directly on the element
        Object.defineProperty(style, 'transform', {
          value: elt.style.transform,
          enumerable: true,
          configurable: true,
        });
      }
      return style;
    };
    
    return () => {
      window.getComputedStyle = originalGetComputedStyle;
    };
  }, []);

  // Hide helper after 10 seconds or when user adds first element
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelper(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (flowchartElements.length > 0) {
      setShowHelper(false);
    }
  }, [flowchartElements]);

  // Add option to flowchart when clicked, handle indicators differently
  const handleOptionClick = (option: TournamentOption) => {
    if (option.type === 'indicator') {
      // For indicators, we need to know if there's an active structure
      if (activeStructureId) {
        // Add to the active structure's indicators
        toggleStructureIndicator(activeStructureId, option);
      } else {
        // If no active structure, add to global indicators (backwards compatibility)
        if (selectedIndicators.some(i => i.id === option.id)) {
          // If already selected, remove it
          setSelectedIndicators(selectedIndicators.filter(i => i.id !== option.id));
        } else {
          // Add to selected indicators
          // For format indicators, we want to ensure only one is active at a time
          if (option.category === 'format') {
            setSelectedIndicators([
              ...selectedIndicators.filter(i => i.category !== 'format'), 
              option
            ]);
          } else {
            setSelectedIndicators([...selectedIndicators, option]);
          }
        }
      }
    } else if (option.category === 'structure') {
      // For structure options, create a unique ID and add to flowchart
      const structureId = generateStructureId();
      const structureWithId = {
        ...option,
        structureId // Add a unique ID to track this structure element
      };
      setFlowchartElements([...flowchartElements, structureWithId]);
      
      // Set this as the active structure
      setActiveStructureId(structureId);
    } else {
      // Regular options go to the flowchart
      setFlowchartElements([...flowchartElements, option]);
    }
  };

  // Handle drag end for flowchart elements (rearranging)
  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false);
    setActiveItem(null);
    
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    
    // reorder the items
    const items = Array.from(flowchartElements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setFlowchartElements(items);
  };

  // Add a new handler for drag start
  const handleDragStart = () => {
    setIsDragging(true);
  };

  // Generate flowchart based on selections
  const generateTemplate = () => {
    if (flowchartElements.length === 0) {
      alert('Please add at least one tournament element to create a template');
      return;
    }
    
    // Here we would process the selected options and generate a flowchart template
    // For the MVP, we'll just organize the elements in a logical order
    // Note: We don't include indicators in the flowchart directly, as they're attached to elements
    
    // Filter only regular options
    const regularOptions = flowchartElements.filter(el => el.type === 'regular');
    
    const structureOptions = regularOptions.filter(el => 
      el.category === 'structure'
    );
    
    const additionalOptions = regularOptions.filter(el => 
      el.category === 'additional'
    );
    
    // Combine all in a logical order
    const organizedElements = [
      ...structureOptions,
      ...additionalOptions
    ];
    
    setFlowchartElements(organizedElements);
  };

  const saveTournament = () => {
    if (!tournamentName) {
      alert('Please enter a tournament name');
      return;
    }
    
    if (flowchartElements.length === 0) {
      alert('Please add at least one tournament element');
      return;
    }
    
    // Organize global indicators by category (for backwards compatibility)
    const formatIndicators = selectedIndicators.filter(i => i.category === 'format');
    const scoringIndicators = selectedIndicators.filter(i => i.category === 'scoring');
    const schedulingIndicators = selectedIndicators.filter(i => i.category === 'scheduling');
    const additionalIndicators = selectedIndicators.filter(i => i.category === 'additional');
    
    // Extract structure elements and their specific indicators
    const structures = flowchartElements
      .filter(el => el.category === 'structure')
      .map(structure => ({
        ...structure,
        indicators: structureIndicators[structure.structureId || ''] || []
      }));
    
    // Here we would save the tournament configuration
    // For now, we'll just log it and navigate back
    console.log('Tournament saved:', {
      name: tournamentName,
      elements: flowchartElements,
      // Global indicators (for backward compatibility)
      indicators: {
        format: formatIndicators,
        scoring: scoringIndicators,
        scheduling: schedulingIndicators,
        additional: additionalIndicators
      },
      // Structure-specific indicators
      structures
    });
    
    alert('Tournament created successfully!');
    router.push('/tournaments');
  };

  // Determine if an option has indicators attached
  const getAttachedIndicators = (option: TournamentOption) => {
    // For structure options, attach format, scoring, scheduling, and additional indicators
    if (option.category === 'structure') {
      return selectedIndicators.filter(i => 
        i.category === 'format' || 
        i.category === 'scoring' || 
        i.category === 'scheduling' ||
        i.category === 'additional'
      );
    }
    return [];
  };

  // Generate a unique ID for a structure element
  const generateStructureId = () => {
    return `structure_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };

  // Get indicators for a specific structure
  const getStructureIndicators = (structureId: string) => {
    return structureIndicators[structureId] || [];
  };

  // Add or remove indicator for a specific structure
  const toggleStructureIndicator = (structureId: string, indicator: TournamentOption) => {
    const currentIndicators = structureIndicators[structureId] || [];
    const hasIndicator = currentIndicators.some(i => i.id === indicator.id && i.category === indicator.category);
    
    let newIndicators;
    if (hasIndicator) {
      // Remove indicator
      newIndicators = currentIndicators.filter(i => !(i.id === indicator.id && i.category === indicator.category));
    } else {
      // For format indicators, we want to ensure only one is active at a time for a structure
      if (indicator.category === 'format') {
        newIndicators = [
          ...currentIndicators.filter(i => i.category !== 'format'),
          indicator
        ];
      } else {
        // Add indicator
        newIndicators = [...currentIndicators, indicator];
      }
    }
    
    setStructureIndicators({
      ...structureIndicators,
      [structureId]: newIndicators
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-primary mb-6">Create New Tournament</h1>
      
      {showHelper && (
        <div className="card bg-blue-50 border border-blue-200 mb-6 relative">
          <button 
            className="absolute top-2 right-2 text-blue-400 hover:text-blue-600"
            onClick={() => setShowHelper(false)}
          >
            ×
          </button>
          <h3 className="text-blue-800 mb-2">How to Create Your Tournament</h3>
          <ol className="text-blue-700 pl-5 list-decimal">
            <li className="mb-1">Enter a name for your tournament</li>
            <li className="mb-1">Click options from the left panel to add them to your tournament flow</li>
            <li className="mb-1">Rearrange elements in the flow by dragging them to new positions</li>
            <li className="mb-1">Remove elements by clicking the × button</li>
            <li className="mb-1">Click "Generate Template" to organize options by category</li>
            <li className="mb-1">Save your tournament when you're ready</li>
          </ol>
        </div>
      )}
      
      <div className="card mb-6">
        <div className="mb-4">
          <label htmlFor="tournamentName" className="block text-sm font-medium text-gray-700 mb-1">
            Tournament Name
          </label>
          <input
            type="text"
            id="tournamentName"
            className="form-input w-full"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
            placeholder="Enter tournament name"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-primary mb-4">Tournament Options</h2>
            <p className="text-sm text-gray-600 mb-4">
              Click options to add them to your tournament flow
            </p>
            
            {/* Show legend if we have an active structure */}
            {activeStructureId && (
              <div className="flex items-center gap-2 mb-4 text-xs p-2 bg-gray-50 rounded-md">
                <div className="font-medium">Indicator Legend:</div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-primary rounded-full mr-1"></span>
                  Active Structure
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-secondary rounded-full mr-1"></span>
                  Global
                </div>
              </div>
            )}
            
            {/* Render indicator categories first */}
            {optionCategories
              .filter(category => category.isIndicator)
              .map((category) => (
                <div key={category.id} className="mb-6">
                  <h3 className="text-accent font-medium mb-2 flex items-center justify-between">
                    <span>{category.title}</span>
                    {activeStructureId && (
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                        {structureIndicators[activeStructureId]?.filter(i => i.category === category.id).length || 0} selected
                      </span>
                    )}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.options.map((option) => {
                      // Check if this indicator is selected globally or for the active structure
                      const isSelectedGlobally = selectedIndicators.some(i => i.id === option.id);
                      const isSelectedForActiveStructure = activeStructureId && 
                        structureIndicators[activeStructureId]?.some(i => i.id === option.id);
                      
                      // Determine the appropriate styling class
                      let buttonClass = 'rounded-full px-3 py-1 text-sm flex items-center transition-all duration-200 ';
                      
                      if (isSelectedForActiveStructure) {
                        // Selected for active structure - primary color
                        buttonClass += 'bg-primary text-white font-medium shadow-md';
                      } else if (isSelectedGlobally) {
                        // Selected globally - secondary color
                        buttonClass += 'bg-secondary text-white font-medium';
                      } else {
                        // Not selected
                        buttonClass += 'bg-gray-100 hover:bg-gray-200 text-gray-800';
                      }
                      
                      return (
                        <button
                          key={`${category.id}-${option.id}`}
                          onClick={() => handleOptionClick(option)}
                          className={buttonClass}
                        >
                          <span className="mr-1">{option.icon}</span>
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            
            {/* Render regular option categories */}
            {optionCategories
              .filter(category => !category.isIndicator)
              .map((category) => (
                <div key={category.id} className="mb-6">
                  <h3 className="text-accent font-medium mb-2">{category.title}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {category.options.map((option) => (
                      <button
                        key={`${category.id}-${option.id}`}
                        onClick={() => handleOptionClick(option)}
                        className="bg-white border border-gray-200 rounded p-2 flex items-center shadow-sm hover:shadow hover:border-primary transition-all duration-200 text-left"
                      >
                        <span className="mr-2">{option.icon}</span>
                        <span className="text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="card h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-primary">Tournament Flow</h2>
              <button 
                onClick={generateTemplate} 
                className="btn btn-secondary text-sm"
              >
                Generate Template
              </button>
            </div>
            
            {flowchartElements.some(el => el.category === 'structure') && (
              <div className="bg-blue-50 p-3 rounded-md mb-4 text-sm text-blue-700 border border-blue-200">
                <p className="mb-1 font-medium">Multiple Tournament Structures</p>
                <p>Click on a tournament structure to select it and apply specific tags. Each structure can have its own set of format, scoring, scheduling, and additional feature indicators.</p>
              </div>
            )}
            
            <DragDropContext 
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
            >
              <StrictModeDroppable droppableId="flowchart">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-grow p-4 border-2 border-dashed rounded-lg ${
                      snapshot.isDraggingOver ? 'bg-green-50 border-primary' : 'border-gray-300'
                    } ${flowchartElements.length === 0 ? 'flex items-center justify-center' : ''}`}
                    style={{ minHeight: '400px' }}
                  >
                    {flowchartElements.length === 0 ? (
                      <p className="text-gray-400">
                        Click options from the left panel to add them here
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {flowchartElements.map((element, index) => {
                          const isStructure = element.category === 'structure';
                          const structureId = isStructure ? element.structureId : null;
                          const isActiveStructure = isStructure && structureId === activeStructureId;
                          
                          // Get indicators based on whether this is a structure or not
                          const attachedIndicators = isStructure && structureId
                            ? getStructureIndicators(structureId)
                            : getAttachedIndicators(element);
                          
                          return (
                            <Draggable
                              key={`element-${element.id}-${index}`}
                              draggableId={`element-${element.id}-${index}`}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`bg-white border ${
                                    snapshot.isDragging ? 'border-secondary shadow-xl' : 
                                    isActiveStructure ? 'border-primary-500 border-2' : 'border-primary'
                                  } rounded p-3 flex flex-col shadow-md`}
                                  onClick={() => {
                                    if (isStructure && structureId) {
                                      setActiveStructureId(activeStructureId === structureId ? null : structureId);
                                    }
                                  }}
                                >
                                  <div className="flex items-center">
                                    <div className="mr-3 cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded">
                                      <span className="text-xl">{element.icon}</span>
                                    </div>
                                    <span className="font-medium">{element.label}</span>
                                    {isStructure && (
                                      <div className="ml-2 flex items-center gap-1">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                          isActiveStructure 
                                            ? 'bg-primary text-white' 
                                            : 'bg-gray-100 text-gray-700'
                                        }`}>
                                          {isActiveStructure ? 'Active' : 'Click to activate'}
                                        </span>
                                        {isActiveStructure && structureId && structureIndicators[structureId]?.length > 0 && (
                                          <button
                                            className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded hover:bg-red-200"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              const newStructureIndicators = {...structureIndicators};
                                              newStructureIndicators[structureId] = [];
                                              setStructureIndicators(newStructureIndicators);
                                            }}
                                            title="Clear all indicators for this structure"
                                          >
                                            Clear
                                          </button>
                                        )}
                                      </div>
                                    )}
                                    <button
                                      className="ml-auto text-gray-400 hover:text-red-500"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const newElements = [...flowchartElements];
                                        newElements.splice(index, 1);
                                        setFlowchartElements(newElements);
                                        
                                        // If this was a structure, clean up
                                        if (isStructure && structureId) {
                                          // If this was the active structure, clear active
                                          if (activeStructureId === structureId) {
                                            setActiveStructureId(null);
                                          }
                                          
                                          // Remove structure indicators
                                          const newStructureIndicators = {...structureIndicators};
                                          delete newStructureIndicators[structureId];
                                          setStructureIndicators(newStructureIndicators);
                                        }
                                      }}
                                    >
                                      ×
                                    </button>
                                  </div>
                                  
                                  {/* Render attached indicators if any */}
                                  {attachedIndicators.length > 0 && (
                                    <div className="mt-2 ml-8">
                                      {/* Format indicators */}
                                      {attachedIndicators.filter(i => i.category === 'format').length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-1">
                                          {attachedIndicators
                                            .filter(i => i.category === 'format')
                                            .map((indicator) => (
                                              <span 
                                                key={indicator.id} 
                                                className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                                              >
                                                <span className="mr-1">{indicator.icon}</span>
                                                {indicator.label}
                                              </span>
                                            ))}
                                        </div>
                                      )}
                                      
                                      {/* Scoring indicators */}
                                      {attachedIndicators.filter(i => i.category === 'scoring').length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-1">
                                          {attachedIndicators
                                            .filter(i => i.category === 'scoring')
                                            .map((indicator) => (
                                              <span 
                                                key={indicator.id} 
                                                className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                                              >
                                                <span className="mr-1">{indicator.icon}</span>
                                                {indicator.label}
                                              </span>
                                            ))}
                                        </div>
                                      )}
                                      
                                      {/* Scheduling indicators */}
                                      {attachedIndicators.filter(i => i.category === 'scheduling').length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-1">
                                          {attachedIndicators
                                            .filter(i => i.category === 'scheduling')
                                            .map((indicator) => (
                                              <span 
                                                key={indicator.id} 
                                                className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700"
                                              >
                                                <span className="mr-1">{indicator.icon}</span>
                                                {indicator.label}
                                              </span>
                                            ))}
                                        </div>
                                      )}
                                      
                                      {/* Additional feature indicators */}
                                      {attachedIndicators.filter(i => i.category === 'additional').length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                          {attachedIndicators
                                            .filter(i => i.category === 'additional')
                                            .map((indicator) => (
                                              <span 
                                                key={indicator.id} 
                                                className="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700"
                                              >
                                                <span className="mr-1">{indicator.icon}</span>
                                                {indicator.label}
                                              </span>
                                            ))}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </div>
                )}
              </StrictModeDroppable>
            </DragDropContext>
            
            {flowchartElements.length > 0 && (
              <div className="mt-4">
                <TournamentPreview 
                  options={[...flowchartElements, ...selectedIndicators]} 
                  name={tournamentName || "New Tournament"} 
                  structureIndicators={structureIndicators}
                  activeStructureId={activeStructureId}
                />
              </div>
            )}
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => router.push('/tournaments')}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={saveTournament}
                className="btn btn-primary"
              >
                Save Tournament
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 