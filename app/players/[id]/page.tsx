import Image from 'next/image';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/outline';

type Player = {
  id: string;
  name: string;
  profileImage: string;
  skill: number;
  wins: number;
  losses: number;
  rank: number;
  tournaments: number;
  bio?: string;
  location?: string;
  joinedDate?: string;
  playStyle?: string;
  favoriteShot?: string;
  racquet?: string;
  coach?: string;
  upcomingMatches?: Array<{
    id: string;
    opponent: string;
    date: string;
    time: string;
    location: string;
  }>;
  recentMatches?: Array<{
    id: string;
    opponent: string;
    result: 'win' | 'loss';
    score: string;
    date: string;
  }>;
};

// This function is required when using static site generation with dynamic routes
export async function generateStaticParams() {
  // In a real app, this would fetch from an API
  // For now, we'll hardcode the player IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}

export default function PlayerProfile({ params }: { params: { id: string } }) {
  // Mock data for different players
  const mockPlayers: Record<string, Player> = {
    '1': {
      id: '1',
      name: 'John Smith',
      profileImage: '/images/avatars/avatar1.svg',
      skill: 4.5,
      wins: 24,
      losses: 8,
      rank: 1,
      tournaments: 12,
      bio: 'Professional tennis player with 10 years of experience. Known for powerful serves and aggressive baseline play.',
      location: 'New York, NY',
      joinedDate: 'January 2022',
      playStyle: 'Aggressive Baseliner',
      favoriteShot: 'Forehand',
      racquet: 'Wilson Pro Staff 97',
      coach: 'Michael Johnson',
      upcomingMatches: [
        {
          id: '1',
          opponent: 'Emma Johnson',
          date: '2023-06-15',
          time: '14:00',
          location: 'Central Tennis Club'
        },
        {
          id: '2',
          opponent: 'David Wilson',
          date: '2023-06-22',
          time: '16:00',
          location: 'East Side Courts'
        }
      ],
      recentMatches: [
        {
          id: '1',
          opponent: 'Michael Brown',
          result: 'win',
          score: '6-4, 7-5',
          date: '2023-06-01'
        },
        {
          id: '2',
          opponent: 'Sarah Davis',
          result: 'win',
          score: '6-3, 6-2',
          date: '2023-05-25'
        },
        {
          id: '3',
          opponent: 'Olivia Martinez',
          result: 'loss',
          score: '4-6, 6-7',
          date: '2023-05-18'
        }
      ]
    },
    '2': {
      id: '2',
      name: 'Emma Johnson',
      profileImage: '/images/avatars/avatar2.svg',
      skill: 4.3,
      wins: 22,
      losses: 10,
      rank: 2,
      tournaments: 9,
      bio: 'Former college champion with a tactical approach to the game. Known for consistency and mental toughness.',
      location: 'Boston, MA',
      joinedDate: 'February 2022',
      playStyle: 'Counter Puncher',
      favoriteShot: 'Backhand',
      racquet: 'Babolat Pure Drive',
      coach: 'Jessica Williams',
      upcomingMatches: [
        {
          id: '1',
          opponent: 'John Smith',
          date: '2023-06-15',
          time: '14:00',
          location: 'Central Tennis Club'
        }
      ],
      recentMatches: [
        {
          id: '1',
          opponent: 'David Wilson',
          result: 'win',
          score: '6-2, 6-4',
          date: '2023-05-30'
        },
        {
          id: '2',
          opponent: 'Olivia Martinez',
          result: 'win',
          score: '7-5, 6-3',
          date: '2023-05-22'
        }
      ]
    },
    '3': {
      id: '3',
      name: 'Michael Brown',
      profileImage: '/images/avatars/avatar3.svg',
      skill: 4.1,
      wins: 20,
      losses: 12,
      rank: 3,
      tournaments: 8,
      bio: 'Powerful player with a dominant serve. Looking to improve consistency in longer rallies.',
      location: 'Chicago, IL',
      joinedDate: 'March 2022',
      playStyle: 'Serve and Volley',
      favoriteShot: 'Serve',
      racquet: 'Head Speed Pro',
      coach: 'Robert Taylor',
      recentMatches: [
        {
          id: '1',
          opponent: 'John Smith',
          result: 'loss',
          score: '4-6, 5-7',
          date: '2023-06-01'
        }
      ]
    },
    '4': {
      id: '4',
      name: 'Sarah Davis',
      profileImage: '/images/avatars/avatar4.svg',
      skill: 3.9,
      wins: 18,
      losses: 14,
      rank: 4,
      tournaments: 10,
      bio: 'Technical player with excellent footwork. Specializes in clay court tactics.',
      location: 'Miami, FL',
      joinedDate: 'April 2022',
      playStyle: 'All-Court Player',
      favoriteShot: 'Drop Shot',
      racquet: 'Yonex Ezone 98',
      coach: 'Maria Garcia'
    },
    '5': {
      id: '5',
      name: 'David Wilson',
      profileImage: '/images/avatars/avatar5.svg',
      skill: 3.8,
      wins: 16,
      losses: 16,
      rank: 5,
      tournaments: 6,
      bio: 'Rising talent with a powerful forehand. Working on improving consistency.',
      location: 'Los Angeles, CA',
      joinedDate: 'January 2023',
      playStyle: 'Aggressive Baseliner',
      favoriteShot: 'Inside-Out Forehand',
      racquet: 'Wilson Blade v8'
    },
    '6': {
      id: '6',
      name: 'Olivia Martinez',
      profileImage: './images/avatars/avatar6.svg',
      skill: 3.7,
      wins: 15,
      losses: 17,
      rank: 6,
      tournaments: 7,
      bio: 'Former junior champion making a comeback after injury. Known for creative shot selection.',
      location: 'Denver, CO',
      joinedDate: 'May 2022',
      playStyle: 'Counter Puncher',
      favoriteShot: 'Slice Backhand',
      racquet: 'Tecnifibre TFight 300'
    }
  };

  // Get player data based on ID or default to player 1 if not found
  const playerData = mockPlayers[params.id] || mockPlayers['1'];

  const winPercentage = Math.round((playerData.wins / (playerData.wins + playerData.losses)) * 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/players" className="text-accent hover:text-primary flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Players
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Player header */}
        <div className="bg-gradient-to-r from-primary to-accent text-white p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
              {playerData.profileImage ? (
                <img
                  src={`${process.env.NODE_ENV === 'production' ? '/Tennis-WebApp' : ''}${playerData.profileImage}`}
                  alt={`${playerData.name}'s profile`}
                  className="h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon className="h-16 w-16 text-gray-500" />
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{playerData.name}</h1>
              <div className="flex flex-col md:flex-row gap-2 md:gap-6 mt-2 text-white/80">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Rank #{playerData.rank}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Skill Level: {playerData.skill.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Win Rate: {winPercentage}%</span>
                </div>
                {playerData.location && (
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{playerData.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Player details */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Player Info */}
          <div className="col-span-1">
            <h2 className="text-xl font-semibold mb-4">Player Info</h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              {playerData.bio && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                  <p className="mt-1">{playerData.bio}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-4">
                {playerData.playStyle && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Play Style</h3>
                    <p className="mt-1">{playerData.playStyle}</p>
                  </div>
                )}
                
                {playerData.favoriteShot && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Favorite Shot</h3>
                    <p className="mt-1">{playerData.favoriteShot}</p>
                  </div>
                )}
                
                {playerData.racquet && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Racquet</h3>
                    <p className="mt-1">{playerData.racquet}</p>
                  </div>
                )}
                
                {playerData.coach && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Coach</h3>
                    <p className="mt-1">{playerData.coach}</p>
                  </div>
                )}
                
                {playerData.joinedDate && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                    <p className="mt-1">{playerData.joinedDate}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Middle column - Statistics */}
          <div className="col-span-1">
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <p className="text-gray-500 text-sm">Wins</p>
                  <p className="text-3xl font-bold text-green-600">{playerData.wins}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <p className="text-gray-500 text-sm">Losses</p>
                  <p className="text-3xl font-bold text-red-600">{playerData.losses}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <p className="text-gray-500 text-sm">Total Matches</p>
                  <p className="text-3xl font-bold text-primary">{playerData.wins + playerData.losses}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <p className="text-gray-500 text-sm">Win Rate</p>
                  <p className="text-3xl font-bold text-accent">{winPercentage}%</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center col-span-2">
                  <p className="text-gray-500 text-sm">Tournaments Played</p>
                  <p className="text-3xl font-bold text-primary">{playerData.tournaments}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Win/Loss Ratio</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${winPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>{playerData.wins} W</span>
                  <span>{playerData.losses} L</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Matches */}
          <div className="col-span-1">
            <h2 className="text-xl font-semibold mb-4">Matches</h2>
            <div className="space-y-6">
              {/* Recent Matches */}
              {playerData.recentMatches && playerData.recentMatches.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Recent Results</h3>
                  <div className="space-y-3">
                    {playerData.recentMatches.map(match => (
                      <div key={match.id} className="bg-gray-50 rounded-lg p-3 flex items-center">
                        <div className={`flex-shrink-0 h-10 w-2 rounded-full ${match.result === 'win' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div className="ml-3 flex-grow">
                          <div className="flex justify-between">
                            <p className="font-medium">vs {match.opponent}</p>
                            <p className="text-sm text-gray-500">{match.date}</p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {match.result === 'win' ? 'Won' : 'Lost'} {match.score}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Matches */}
              {playerData.upcomingMatches && playerData.upcomingMatches.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Upcoming Matches</h3>
                  <div className="space-y-3">
                    {playerData.upcomingMatches.map(match => (
                      <div key={match.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium">vs {match.opponent}</p>
                          <p className="text-sm text-gray-500">{match.date}</p>
                        </div>
                        <div className="flex text-sm text-gray-600 gap-2">
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{match.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{match.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 