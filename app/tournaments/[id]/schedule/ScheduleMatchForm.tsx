'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { X } from 'lucide-react';

type ScheduleMatchFormProps = {
  date: Date;
  player1?: string;
  player2?: string;
  onClose: () => void;
  onSchedule: (matchData: ScheduleMatchData) => void;
};

export type ScheduleMatchData = {
  player1: string;
  player2: string;
  date: string;
  time: string;
  court: string;
};

export default function ScheduleMatchForm({ date, player1 = '', player2 = '', onClose, onSchedule }: ScheduleMatchFormProps) {
  const formattedDate = format(date, 'yyyy-MM-dd');
  const [formData, setFormData] = useState<ScheduleMatchData>({
    player1,
    player2,
    date: formattedDate,
    time: '10:00',
    court: 'Court 1',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-primary font-medium">Schedule Match</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="player1" className="block text-sm font-medium text-gray-700 mb-1">
                Player 1
              </label>
              <input
                type="text"
                id="player1"
                name="player1"
                value={formData.player1}
                onChange={handleChange}
                className="form-input w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="player2" className="block text-sm font-medium text-gray-700 mb-1">
                Player 2
              </label>
              <input
                type="text"
                id="player2"
                name="player2"
                value={formData.player2}
                onChange={handleChange}
                className="form-input w-full"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-input w-full"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="court" className="block text-sm font-medium text-gray-700 mb-1">
                Court
              </label>
              <select
                id="court"
                name="court"
                value={formData.court}
                onChange={handleChange}
                className="form-select w-full"
                required
              >
                <option value="Court 1">Court 1</option>
                <option value="Court 2">Court 2</option>
                <option value="Court 3">Court 3</option>
                <option value="Court 4">Court 4</option>
              </select>
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
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 