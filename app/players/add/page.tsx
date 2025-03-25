'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock data for registered users - in production this would come from your auth system
const mockRegisteredUsers = [
  { id: 'user1', email: 'john@example.com', name: 'John Smith' },
  { id: 'user2', email: 'emma@example.com', name: 'Emma Johnson' },
];

export default function AddPlayerPage() {
  const router = useRouter();
  const [playerType, setPlayerType] = useState<'registered' | 'unregistered'>('registered');
  const [selectedUser, setSelectedUser] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skill: '3.0',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In production, this would be an API call
    const playerData = playerType === 'registered' 
      ? mockRegisteredUsers.find(user => user.id === selectedUser)
      : formData;

    console.log('Adding player:', playerData);
    
    // Mock successful addition
    router.push('/players');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8 text-primary">Add New Player</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Player Type</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="playerType"
                value="registered"
                checked={playerType === 'registered'}
                onChange={(e) => setPlayerType('registered')}
              />
              <span className="ml-2">Registered User</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="playerType"
                value="unregistered"
                checked={playerType === 'unregistered'}
                onChange={(e) => setPlayerType('unregistered')}
              />
              <span className="ml-2">Unregistered Player</span>
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {playerType === 'registered' ? (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select User
              </label>
              <select
                className="form-select block w-full"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                required
              >
                <option value="">Select a user</option>
                {mockRegisteredUsers.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="form-input block w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  className="form-input block w-full"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </>
          )}
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Skill Level
            </label>
            <select
              className="form-select block w-full"
              value={formData.skill}
              onChange={(e) => setFormData({...formData, skill: e.target.value})}
              required
            >
              {[...Array(9)].map((_, i) => {
                const value = (i + 1) / 2;
                return (
                  <option key={value} value={value.toFixed(1)}>
                    {value.toFixed(1)}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Player
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 