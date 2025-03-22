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
}

interface OptionCategory {
  id: string;
  title: string;
  options: TournamentOption[];
}

// Tournament option categories
const optionCategories: OptionCategory[] = [
  {
    id: 'format',
    title: 'Tournament Format',
    options: [
      { id: 'singles', label: 'Singles', icon: '👤' },
      { id: 'doubles', label: 'Doubles', icon: '👥' },
      { id: 'mixed', label: 'Mixed Doubles', icon: '👫' }
    ]
  },
  {
    id: 'structure',
    title: 'Tournament Structure',
    options: [
      { id: 'elimination', label: 'Single Elimination', icon: '🏆' },
      { id: 'doubleElimination', label: 'Double Elimination', icon: '🔄' },
      { id: 'roundRobin', label: 'Round Robin', icon: '🔁' },
      { id: 'swiss', label: 'Swiss System', icon: '🇨🇭' },
      { id: 'ladder', label: 'Ladder Tournament', icon: '🪜' },
      { id: 'groupStage', label: 'Group Stage + Knockout', icon: '👥➡️🏆' }
    ]
  },
  {
    id: 'scoring',
    title: 'Scoring Rules',
    options: [
      { id: 'bestOf3', label: 'Best of 3 Sets', icon: '3️⃣' },
      { id: 'bestOf5', label: 'Best of 5 Sets', icon: '5️⃣' },
      { id: 'proSets', label: 'Pro Sets (8 or 10 games)', icon: '🎮' },
      { id: 'fastFour', label: 'Fast4 Format', icon: '⏱️' },
      { id: 'tiebreak', label: 'Tiebreak Deciding Set', icon: '🔄' },
      { id: 'noAd', label: 'No-Ad Scoring', icon: '⏭️' }
    ]
  },
  {
    id: 'scheduling',
    title: 'Scheduling Options',
    options: [
      { id: 'fixedSchedule', label: 'Fixed Schedule', icon: '📅' },
      { id: 'playerArranged', label: 'Player-Arranged Matches', icon: '🤝' },
      { id: 'weekendTournament', label: 'Weekend Tournament', icon: '🌞' },
      { id: 'multiWeek', label: 'Multi-Week Tournament', icon: '📆' }
    ]
  },
  {
    id: 'additional',
    title: 'Additional Features',
    options: [
      { id: 'seeding', label: 'Player Seeding', icon: '🌱' },
      { id: 'consolation', label: 'Consolation Bracket', icon: '🥈' },
      { id: 'umpires', label: 'Umpired Matches', icon: '👨‍⚖️' },
      { id: 'courtAssignment', label: 'Automatic Court Assignment', icon: '🎾' },
      { id: 'weatherPolicy', label: 'Weather Policy', icon: '☔' },
      { id: 'ageGroups', label: 'Age Group Divisions', icon: '👶👨👵' }
    ]
  }
];

export default function CreateTournamentPage() {
  const router = useRouter();
  const [tournamentName, setTournamentName] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<TournamentOption[]>([]);
  const [flowchartElements, setFlowchartElements] = useState<TournamentOption[]>([]);
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

  // Add option to flowchart when clicked
  const handleOptionClick = (option: TournamentOption) => {
    // Add to the end of the flowchart
    setFlowchartElements([...flowchartElements, option]);
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
    
    const formatOptions = flowchartElements.filter(el => 
      optionCategories.find(cat => cat.id === 'format')?.options.some(opt => opt.id === el.id)
    );
    
    const structureOptions = flowchartElements.filter(el => 
      optionCategories.find(cat => cat.id === 'structure')?.options.some(opt => opt.id === el.id)
    );
    
    const scoringOptions = flowchartElements.filter(el => 
      optionCategories.find(cat => cat.id === 'scoring')?.options.some(opt => opt.id === el.id)
    );
    
    const schedulingOptions = flowchartElements.filter(el => 
      optionCategories.find(cat => cat.id === 'scheduling')?.options.some(opt => opt.id === el.id)
    );
    
    const additionalOptions = flowchartElements.filter(el => 
      optionCategories.find(cat => cat.id === 'additional')?.options.some(opt => opt.id === el.id)
    );
    
    // Combine all in a logical order
    const organizedElements = [
      ...formatOptions,
      ...structureOptions,
      ...scoringOptions,
      ...schedulingOptions,
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
    
    // Here we would save the tournament configuration
    // For now, we'll just log it and navigate back
    console.log('Tournament saved:', {
      name: tournamentName,
      elements: flowchartElements
    });
    
    alert('Tournament created successfully!');
    router.push('/tournaments');
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
            
            {optionCategories.map((category) => (
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
                        {flowchartElements.map((element, index) => (
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
                                  snapshot.isDragging ? 'border-secondary shadow-xl' : 'border-primary'
                                } rounded p-3 flex items-center shadow-md`}
                              >
                                <div className="mr-3 cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded">
                                  <span className="text-xl">{element.icon}</span>
                                </div>
                                <span className="font-medium">{element.label}</span>
                                <button
                                  className="ml-auto text-gray-400 hover:text-red-500"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newElements = [...flowchartElements];
                                    newElements.splice(index, 1);
                                    setFlowchartElements(newElements);
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
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
                  options={flowchartElements} 
                  name={tournamentName || "New Tournament"} 
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