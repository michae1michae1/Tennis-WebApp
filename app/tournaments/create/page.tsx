'use client';

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useRouter } from 'next/navigation';
import FlowchartConnector from '@/components/ui/FlowchartConnector';
import TournamentPreview from '@/components/ui/TournamentPreview';

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

  // Handle drag end for options
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    // If moving within the flowchart
    if (source.droppableId === 'flowchart' && destination.droppableId === 'flowchart') {
      const newOrder = Array.from(flowchartElements);
      const [movedItem] = newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, movedItem);
      setFlowchartElements(newOrder);
      return;
    }
    
    // If adding from options to flowchart
    if (destination.droppableId === 'flowchart') {
      // Find the option being dragged
      const category = optionCategories.find(cat => 
        cat.id === source.droppableId.replace('options-', '')
      );
      
      if (category) {
        const option = category.options[source.index];
        if (!flowchartElements.some(el => el.id === option.id)) {
          setFlowchartElements([...flowchartElements, option]);
        }
      }
    }
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
              Drag options to the flowchart area to build your tournament
            </p>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              {optionCategories.map((category) => (
                <div key={category.id} className="mb-6">
                  <h3 className="text-accent font-medium mb-2">{category.title}</h3>
                  <Droppable droppableId={`options-${category.id}`} isDropDisabled={true}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="grid grid-cols-2 gap-2"
                      >
                        {category.options.map((option, index) => (
                          <Draggable
                            key={option.id}
                            draggableId={option.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white border border-gray-200 rounded p-2 flex items-center shadow-sm hover:shadow cursor-pointer"
                              >
                                <span className="mr-2">{option.icon}</span>
                                <span className="text-sm">{option.label}</span>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </DragDropContext>
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
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="flowchart">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-grow p-4 border-2 border-dashed rounded-lg ${
                      snapshot.isDraggingOver ? 'bg-gray-50 border-primary' : 'border-gray-300'
                    } ${flowchartElements.length === 0 ? 'flex items-center justify-center' : ''}`}
                    style={{ minHeight: '400px' }}
                  >
                    {flowchartElements.length === 0 ? (
                      <p className="text-gray-400">
                        Drag tournament elements here to create your flow
                      </p>
                    ) : (
                      <div className="relative flex flex-col">
                        {flowchartElements.map((element, index) => (
                          <React.Fragment key={`flow-${element.id}-${index}`}>
                            <Draggable draggableId={element.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="bg-white border border-primary rounded p-3 flex items-center shadow-md relative z-10"
                                >
                                  <span className="mr-3 text-xl">{element.icon}</span>
                                  <span className="font-medium">{element.label}</span>
                                  <button
                                    className="ml-auto text-gray-400 hover:text-red-500"
                                    onClick={() => {
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
                            {index < flowchartElements.length - 1 && (
                              <div className="py-2 flex justify-center">
                                <div className="w-0.5 h-6 bg-primary"></div>
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
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