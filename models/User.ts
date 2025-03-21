export interface User {
  id: string;
  email: string;
  name: string;
  role: 'player' | 'admin' | 'organizer';
  password: string; // hashed
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
} 