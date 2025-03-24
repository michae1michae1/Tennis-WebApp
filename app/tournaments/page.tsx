'use client';

import Link from 'next/link';
import { useState, useMemo, useRef } from 'react';
import { Search, Calendar, Grid } from 'lucide-react';
import { FullScreenCalendar } from '@/components/ui/fullscreen-calendar';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function TournamentsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const calendarSearchRef = useRef<HTMLInputElement>(null);
  
  // Mock data with 2025 dates
  const mockTournaments = [
    {
      id: '1',
      name: 'Summer Classic',
      description: 'Annual summer tournament with ladder and elimination phases',
      startDate: '2025-05-30',
      endDate: '2025-06-09',
      type: 'custom',
      status: 'draft'
    },
    {
      id: '2',
      name: 'Club Championship',
      description: 'Official club championship with round-robin format',
      startDate: '2025-06-15',
      endDate: '2025-06-25',
      type: 'roundRobin',
      status: 'draft'
    },
    {
      id: '3',
      name: 'Ladder League',
      description: 'Ongoing ladder tournament for club members',
      startDate: '2025-05-01',
      endDate: '2025-07-31',
      type: 'ladder',
      status: 'draft'
    },
    {
      id: '4',
      name: 'Spring Invitational',
      description: 'Special invitation tournament for top ranked players',
      startDate: '2025-05-18',
      endDate: '2025-05-20',
      type: 'singleElimination',
      status: 'draft'
    },
    {
      id: '5',
      name: 'Junior Development Series',
      description: 'Tournament series for junior players under 18',
      startDate: '2025-06-05',
      endDate: '2025-06-07',
      type: 'roundRobin',
      status: 'draft'
    }
  ];

  // Filter tournaments based on search query
  const filteredTournaments = mockTournaments.filter(tournament => 
    tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tournament.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tournament.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Transform tournaments data for calendar view
  const calendarData = useMemo(() => {
    // Group tournaments by date
    const eventsByDate = new Map();
    
    filteredTournaments.forEach(tournament => {
      // Create an event for tournament start
      const startDate = new Date(tournament.startDate);
      const startDateKey = startDate.toISOString().split('T')[0];
      
      if (!eventsByDate.has(startDateKey)) {
        eventsByDate.set(startDateKey, {
          day: startDate,
          events: []
        });
      }
      
      eventsByDate.get(startDateKey).events.push({
        id: parseInt(tournament.id),
        name: tournament.name,
        time: `${format(startDate, 'MMM d')} - Start`,
        datetime: tournament.startDate
      });
      
      // Create an event for tournament end
      const endDate = new Date(tournament.endDate);
      const endDateKey = endDate.toISOString().split('T')[0];
      
      if (!eventsByDate.has(endDateKey)) {
        eventsByDate.set(endDateKey, {
          day: endDate,
          events: []
        });
      }
      
      eventsByDate.get(endDateKey).events.push({
        id: parseInt(tournament.id) + 1000, // Add 1000 to avoid ID conflicts
        name: tournament.name,
        time: `${format(endDate, 'MMM d')} - Final`,
        datetime: tournament.endDate
      });

      // For multi-day tournaments, add middle dates as well for better visualization
      if (endDate.getTime() - startDate.getTime() > 24 * 60 * 60 * 1000) {
        // If it's a multi-day tournament spanning more than 14 days, add a middle event
        if (endDate.getTime() - startDate.getTime() > 14 * 24 * 60 * 60 * 1000) {
          const middleDate = new Date(startDate.getTime() + (endDate.getTime() - startDate.getTime()) / 2);
          const middleDateKey = middleDate.toISOString().split('T')[0];
          
          if (!eventsByDate.has(middleDateKey)) {
            eventsByDate.set(middleDateKey, {
              day: middleDate,
              events: []
            });
          }
          
          eventsByDate.get(middleDateKey).events.push({
            id: parseInt(tournament.id) + 500, // Add 500 to avoid ID conflicts
            name: tournament.name,
            time: 'Ongoing',
            datetime: middleDate.toISOString()
          });
        }
      }
    });
    
    return Array.from(eventsByDate.values());
  }, [filteredTournaments]);

  // Handle event click navigation
  const handleEventClick = (event: any) => {
    // The tournament ID is the event ID (with adjustments for start/end/middle events)
    const tournamentId = event.id > 1000 ? event.id - 1000 : event.id > 500 ? event.id - 500 : event.id;
    router.push(`/tournaments/${tournamentId}`);
  };

  // Handle search in calendar view
  const handleCalendarSearch = (query: string) => {
    // Updates the searchQuery state to maintain consistency between views
    setSearchQuery(query);
  };

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (viewMode === 'calendar' && calendarSearchRef.current) {
      // Focus the calendar search input when in calendar view
      calendarSearchRef.current.focus();
    }
  };

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
        <form 
          className="relative w-full md:w-96"
          onSubmit={handleSearchSubmit}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tournaments..."
            className="form-input pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ref={viewMode === 'list' ? null : calendarSearchRef}
          />
        </form>
        
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
                  <span>{format(new Date(tournament.startDate), 'MMM d, yyyy')} - {format(new Date(tournament.endDate), 'MMM d, yyyy')}</span>
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

      {/* Calendar view */}
      {viewMode === 'calendar' && (
        <div>
          {calendarData.length > 0 ? (
            <div className="min-h-[36rem]">
              <FullScreenCalendar 
                data={calendarData} 
                onEventClick={handleEventClick}
                onSearch={handleCalendarSearch}
              />
            </div>
          ) : (
            <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg m-6">
              <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Tournaments</h3>
              <p className="text-gray-500">
                No tournaments found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 