'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Calendar, Grid } from 'lucide-react';

export default function TournamentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  
  // This is mock data that would typically come from an API
  const mockTournaments = [
    {
      id: '1',
      name: 'Summer Classic',
      description: 'Annual summer tournament with ladder and elimination phases',
      startDate: '2025-06-01',
      endDate: '2025-06-15',
      type: 'custom',
      status: 'draft'
    },
    {
      id: '2',
      name: 'Club Championship',
      description: 'Official club championship with round-robin format',
      startDate: '2025-07-10',
      endDate: '2025-07-25',
      type: 'roundRobin',
      status: 'draft'
    },
    {
      id: '3',
      name: 'Ladder League',
      description: 'Ongoing ladder tournament for club members',
      startDate: '2025-05-01',
      endDate: '2025-08-31',
      type: 'ladder',
      status: 'draft'
    }
  ];

  // Filter tournaments based on search query
  const filteredTournaments = mockTournaments.filter(tournament => 
    tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tournament.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tournament.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-primary">Tournaments</h1>
        <Link href="/tournaments/create" className="btn btn-primary">
          Create New Tournament
        </Link>
      </div>

      {/* Search and view toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tournaments..."
            className="form-input pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex rounded-md shadow-sm bg-gray-100 p-1">
          <button
            className={`px-4 py-2 rounded-md flex items-center ${
              viewMode === 'list' 
                ? 'bg-white shadow-sm text-primary' 
                : 'text-gray-500 hover:text-primary'
            }`}
            onClick={() => setViewMode('list')}
          >
            <Grid className="h-4 w-4 mr-2" /> List
          </button>
          <button
            className={`px-4 py-2 rounded-md flex items-center ${
              viewMode === 'calendar' 
                ? 'bg-white shadow-sm text-primary' 
                : 'text-gray-500 hover:text-primary'
            }`}
            onClick={() => setViewMode('calendar')}
          >
            <Calendar className="h-4 w-4 mr-2" /> Calendar
          </button>
        </div>
      </div>

      {/* List view */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.length > 0 ? (
            filteredTournaments.map((tournament) => (
              <div key={tournament.id} className="card">
                <h3 className="text-primary mb-2">{tournament.name}</h3>
                <p className="text-gray-600 mb-4">{tournament.description}</p>
                <div className="flex justify-between text-sm mb-4">
                  <span>{tournament.startDate} - {tournament.endDate}</span>
                  <span className="px-2 py-1 bg-secondary/20 rounded-full">
                    {tournament.type}
                  </span>
                </div>
                <div className="flex justify-end mt-4">
                  <Link href={`/tournaments/${tournament.id}`} className="btn btn-outline mr-2">
                    View Details
                  </Link>
                  <button className="btn btn-secondary">Join</button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No tournaments found matching your search.</p>
            </div>
          )}
        </div>
      )}

      {/* Calendar view - placeholder */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
            <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View</h3>
            <p className="text-gray-500">
              Calendar implementation coming soon. Your calendar code will be placed here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 