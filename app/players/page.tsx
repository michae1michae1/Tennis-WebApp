export default function PlayersPage() {
  // This is mock data that would typically come from an API
  const mockPlayers = [
    {
      id: '1',
      name: 'John Smith',
      profileImage: '/images/avatars/avatar1.png',
      skill: 4.5,
      wins: 24,
      losses: 8,
      rank: 1
    },
    {
      id: '2',
      name: 'Emma Johnson',
      profileImage: '/images/avatars/avatar2.png',
      skill: 4.3,
      wins: 22,
      losses: 10,
      rank: 2
    },
    {
      id: '3',
      name: 'Michael Brown',
      profileImage: '/images/avatars/avatar3.png',
      skill: 4.1,
      wins: 20,
      losses: 12,
      rank: 3
    },
    {
      id: '4',
      name: 'Sarah Davis',
      profileImage: '/images/avatars/avatar4.png',
      skill: 3.9,
      wins: 18,
      losses: 14,
      rank: 4
    },
    {
      id: '5',
      name: 'David Wilson',
      profileImage: '/images/avatars/avatar5.png',
      skill: 3.8,
      wins: 16,
      losses: 16,
      rank: 5
    },
    {
      id: '6',
      name: 'Olivia Martinez',
      profileImage: '/images/avatars/avatar6.png',
      skill: 3.7,
      wins: 15,
      losses: 17,
      rank: 6
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-primary">Players</h1>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search players..."
              className="form-input pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button className="btn btn-primary">Add Player</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Player</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Skill Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Record</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Win %</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockPlayers.map((player) => {
              const winPercentage = Math.round((player.wins / (player.wins + player.losses)) * 100);
              
              return (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{player.rank}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        {player.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{player.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{player.skill.toFixed(1)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{player.wins}W - {player.losses}L</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{winPercentage}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-accent hover:text-primary">View Profile</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 