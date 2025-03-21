import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-primary text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Tennis Tournament App
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/tournaments" className="hover:text-secondary transition-colors">
            Tournaments
          </Link>
          <Link href="/players" className="hover:text-secondary transition-colors">
            Players
          </Link>
          <Link href="/about" className="hover:text-secondary transition-colors">
            About
          </Link>
          <Link href="/login" className="bg-white text-primary px-4 py-1 rounded hover:bg-secondary hover:text-text transition-colors">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
} 