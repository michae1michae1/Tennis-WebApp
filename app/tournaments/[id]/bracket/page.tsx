// Add this function to define which tournament IDs should be pre-rendered
export async function generateStaticParams() {
  // Return all tournament IDs that should be pre-generated
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

import { getTournamentType } from '@/app/utils/tournamentUtils';
import BracketClient from './BracketClient';

export default function TournamentBracketPage({ params }: { params: { id: string } }) {
  const tournamentId = params.id;
  const tournamentType = getTournamentType(tournamentId);
  
  return (
    <div className="container mx-auto py-8">
      <BracketClient tournamentId={tournamentId} tournamentType={tournamentType} />
    </div>
  );
} 