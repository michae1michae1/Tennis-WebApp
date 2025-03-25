import { getTournamentFormats, getTournamentTypeDisplay } from '../utils/tournamentUtils';

interface TournamentCardProps {
  id: string;
  title: string;
  location: string;
  date: string;
  type: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  entryFee?: string;
  onClick?: () => void;
}

export default function TournamentCard({
  id,
  title,
  location,
  date,
  type,
  status,
  entryFee,
  onClick
}: TournamentCardProps) {
  const statusColors = {
    'upcoming': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-green-100 text-green-800',
    'completed': 'bg-gray-100 text-gray-800'
  };

  // For custom type, get all formats that make up the custom tournament
  const isCustomType = type === 'custom';
  const formats = isCustomType ? getTournamentFormats(id) : [];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">{date}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {isCustomType ? (
            <>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Custom Format
              </span>
              {formats.map((format, index) => (
                <span key={index} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {getTournamentTypeDisplay(format)}
                </span>
              ))}
            </>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {getTournamentTypeDisplay(type)}
            </span>
          )}
          
          {entryFee && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {entryFee}
            </span>
          )}
        </div>
      </div>
    </div>
  );
} 