import Link from 'next/link';

export default function TournamentsPage() {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-primary">Tournaments</h1>
        <Link href="/tournaments/create" className="btn btn-primary">
          Create New Tournament
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTournaments.map((tournament) => (
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
        ))}
      </div>
    </div>
  );
} 