export default function TournamentDetail({ params }: { params: { id: string } }) {
  // This would be fetched from an API in a real app
  const tournament = {
    id: params.id,
    name: params.id === '1' ? 'Summer Classic' : params.id === '2' ? 'Club Championship' : 'Ladder League',
    description: 'Annual summer tournament with ladder and elimination phases',
    startDate: '2025-06-01',
    endDate: '2025-06-15',
    type: 'custom',
    status: 'draft',
    organizer: {
      name: 'Tennis Club Admin',
      email: 'admin@tennisclub.com'
    },
    players: [
      { id: '1', name: 'John Smith', rank: 1 },
      { id: '2', name: 'Emma Johnson', rank: 2 },
      { id: '3', name: 'Michael Brown', rank: 3 },
      { id: '4', name: 'Sarah Davis', rank: 4 },
      { id: '5', name: 'David Wilson', rank: 5 },
      { id: '6', name: 'Olivia Martinez', rank: 6 },
      { id: '7', name: 'James Taylor', rank: 7 },
      { id: '8', name: 'Sophia Anderson', rank: 8 },
    ],
    matches: [
      { id: '1', player1: 'John Smith', player2: 'Emma Johnson', date: '2025-06-02', score: '6-4, 7-5' },
      { id: '2', player1: 'Michael Brown', player2: 'Sarah Davis', date: '2025-06-02', score: '3-6, 6-3, 6-2' },
      { id: '3', player1: 'David Wilson', player2: 'Olivia Martinez', date: '2025-06-03', score: 'Not played' },
      { id: '4', player1: 'James Taylor', player2: 'Sophia Anderson', date: '2025-06-03', score: 'Not played' },
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-primary">{tournament.name}</h1>
          <span className="px-3 py-1 bg-secondary/20 rounded-full text-sm">
            {tournament.type}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{tournament.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Dates:</span> {tournament.startDate} - {tournament.endDate}
          </div>
          <div>
            <span className="font-medium">Status:</span> {tournament.status}
          </div>
          <div>
            <span className="font-medium">Organizer:</span> {tournament.organizer.name}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left sidebar */}
        <div className="lg:col-span-1">
          <div className="card mb-6">
            <h3 className="text-primary mb-4">Tournament Options</h3>
            <div className="space-y-2">
              <button className="btn btn-primary w-full">Register</button>
              <button className="btn btn-outline w-full">View Bracket</button>
              <button className="btn btn-outline w-full">View Schedule</button>
              <button className="btn btn-outline w-full">Report Match</button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-primary mb-4">Players</h3>
            <div className="space-y-2">
              {tournament.players.map(player => (
                <div key={player.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <span>{player.name}</span>
                  <span className="text-sm bg-primary/10 px-2 py-1 rounded">Rank: {player.rank}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h3 className="text-primary mb-4">Upcoming Matches</h3>
            <div className="space-y-4">
              {tournament.matches.map(match => (
                <div key={match.id} className="border rounded p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{match.player1} vs {match.player2}</span>
                    <span className="text-sm text-gray-500">{match.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={match.score === 'Not played' ? 'text-gray-400' : 'text-gray-800'}>
                      {match.score}
                    </span>
                    {match.score === 'Not played' && (
                      <button className="btn btn-secondary btn-sm">Schedule</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-primary mb-4">Tournament Rules</h3>
            <div className="space-y-2">
              <div className="p-2 border-b">
                <span className="font-medium">Format:</span> Best of 3 sets
              </div>
              <div className="p-2 border-b">
                <span className="font-medium">Tiebreak:</span> Standard 7-point tiebreak at 6-6
              </div>
              <div className="p-2 border-b">
                <span className="font-medium">Scoring:</span> Standard scoring
              </div>
              <div className="p-2">
                <span className="font-medium">Match Time:</span> 90 minute maximum
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 