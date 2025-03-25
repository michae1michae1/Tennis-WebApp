'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

type ScoreSet = {
  player1Score: string;
  player2Score: string;
  tiebreak?: string;
};

export type MatchScore = {
  sets: ScoreSet[];
  winner: 'player1' | 'player2';
  retired?: boolean;
  defaulted?: boolean;
};

type ReportScoreFormProps = {
  matchId: string;
  player1: string;
  player2: string;
  tournamentType: string;
  onClose: () => void;
  onSubmit: (score: MatchScore) => void;
};

export default function ReportScoreForm({
  matchId,
  player1,
  player2,
  tournamentType,
  onClose,
  onSubmit
}: ReportScoreFormProps) {
  // Determine format based on tournament type
  const isBestOfFive = false; // Default to best of 3 for now
  const maxSets = isBestOfFive ? 5 : 3;
  const formatLabel = isBestOfFive ? 'Best of 5 sets' : 'Best of 3 sets';

  // State for sets score
  const [sets, setSets] = useState<ScoreSet[]>([
    { player1Score: '', player2Score: '' },
    { player1Score: '', player2Score: '' },
    { player1Score: '', player2Score: '' }
  ]);
  
  // Retirement/Default options
  const [matchStatus, setMatchStatus] = useState<'completed' | 'retired' | 'defaulted'>('completed');
  
  // Calculate winner based on sets
  const calculateWinner = (): 'player1' | 'player2' | null => {
    const player1Sets = sets.filter(set => 
      set.player1Score !== '' && 
      set.player2Score !== '' && 
      parseInt(set.player1Score) > parseInt(set.player2Score)
    ).length;
    
    const player2Sets = sets.filter(set => 
      set.player1Score !== '' && 
      set.player2Score !== '' && 
      parseInt(set.player1Score) < parseInt(set.player2Score)
    ).length;
    
    const targetSets = isBestOfFive ? 3 : 2;
    
    if (player1Sets >= targetSets) return 'player1';
    if (player2Sets >= targetSets) return 'player2';
    
    return null;
  };
  
  // Calculate if third set is needed
  const isThirdSetNeeded = (): boolean => {
    // Always need 3rd set in best of 5
    if (isBestOfFive) return true;
    
    const player1Sets = sets.slice(0, 2).filter(set => 
      set.player1Score !== '' && 
      set.player2Score !== '' && 
      parseInt(set.player1Score) > parseInt(set.player2Score)
    ).length;
    
    const player2Sets = sets.slice(0, 2).filter(set => 
      set.player1Score !== '' && 
      set.player2Score !== '' && 
      parseInt(set.player1Score) < parseInt(set.player2Score)
    ).length;
    
    // If either player has won 2 sets already, third set is not needed
    return !(player1Sets === 2 || player2Sets === 2);
  };
  
  // Update the set score
  const updateSetScore = (index: number, player: 'player1' | 'player2', value: string) => {
    // Only allow numbers 0-7
    if (value !== '' && !/^[0-7]$/.test(value)) return;
    
    const newSets = [...sets];
    if (player === 'player1') {
      newSets[index].player1Score = value;
    } else {
      newSets[index].player2Score = value;
    }
    setSets(newSets);
  };
  
  // Update tiebreak score
  const updateTiebreak = (index: number, value: string) => {
    // Only allow numbers
    if (value !== '' && !/^\d+$/.test(value)) return;
    
    const newSets = [...sets];
    newSets[index].tiebreak = value;
    setSets(newSets);
  };
  
  // Check if set is valid for tiebreak
  const isTiebreakSet = (index: number): boolean => {
    return sets[index].player1Score === '7' && sets[index].player2Score === '6' || 
           sets[index].player1Score === '6' && sets[index].player2Score === '7';
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate the winner
    let winner = calculateWinner();
    
    // If match status is not completed, use the player who didn't retire/default as winner
    if (matchStatus === 'retired' || matchStatus === 'defaulted') {
      winner = matchStatus === 'retired' ? 'player2' : 'player1';
    }
    
    // Ensure a winner is selected
    if (!winner) {
      alert('Please complete the score to determine a winner');
      return;
    }
    
    // Filter out incomplete sets
    const completedSets = sets.filter(set => 
      set.player1Score !== '' && set.player2Score !== ''
    );
    
    const scoreData: MatchScore = {
      sets: completedSets,
      winner,
      retired: matchStatus === 'retired',
      defaulted: matchStatus === 'defaulted'
    };
    
    onSubmit(scoreData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-primary font-medium">Report Match Score</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <div className="bg-gray-50 p-3 rounded mb-2">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{player1}</span>
              <span>vs</span>
              <span className="font-medium">{player2}</span>
            </div>
            <div className="text-sm text-gray-500 text-center">
              Format: {formatLabel}
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2 items-center font-medium text-center">
              <div className="col-span-3">Set</div>
              <div className="col-span-1">-</div>
              <div className="col-span-3">Set</div>
            </div>
            
            {sets.map((set, index) => (
              <div key={index} className={`space-y-2 ${index === 2 && !isThirdSetNeeded() ? 'opacity-50' : ''}`}>
                <div className="grid grid-cols-7 gap-2 items-center">
                  <div className="col-span-3">
                    <input
                      type="text"
                      className="form-input w-full text-center text-lg"
                      value={set.player1Score}
                      onChange={(e) => updateSetScore(index, 'player1', e.target.value)}
                      placeholder="0-7"
                      disabled={index === 2 && !isThirdSetNeeded()}
                      maxLength={1}
                    />
                  </div>
                  <div className="col-span-1 text-center">-</div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      className="form-input w-full text-center text-lg"
                      value={set.player2Score}
                      onChange={(e) => updateSetScore(index, 'player2', e.target.value)}
                      placeholder="0-7"
                      disabled={index === 2 && !isThirdSetNeeded()}
                      maxLength={1}
                    />
                  </div>
                </div>
                
                {isTiebreakSet(index) && (
                  <div className="grid grid-cols-7 gap-2 items-center">
                    <div className="col-span-3 col-start-3 col-end-6">
                      <div className="text-sm text-gray-500 mb-1 text-center">Tiebreak score</div>
                      <input
                        type="text"
                        className="form-input w-full text-center"
                        value={set.tiebreak || ''}
                        onChange={(e) => updateTiebreak(index, e.target.value)}
                        placeholder="7-5"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-2 border-t">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Match Status
              </label>
              <div className="grid grid-cols-3 gap-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="match-status"
                    checked={matchStatus === 'completed'}
                    onChange={() => setMatchStatus('completed')}
                    className="mr-2"
                  />
                  <span>Completed</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="match-status" 
                    checked={matchStatus === 'retired'}
                    onChange={() => setMatchStatus('retired')}
                    className="mr-2"
                  />
                  <span>Retired</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="match-status"
                    checked={matchStatus === 'defaulted'}
                    onChange={() => setMatchStatus('defaulted')}
                    className="mr-2"
                  />
                  <span>Defaulted</span>
                </label>
              </div>
              {matchStatus === 'retired' && (
                <p className="text-sm text-gray-500 mt-1">
                  {player1} retired. {player2} is the winner.
                </p>
              )}
              {matchStatus === 'defaulted' && (
                <p className="text-sm text-gray-500 mt-1">
                  {player1} defaulted. {player2} is the winner.
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
            >
              Submit Score
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 