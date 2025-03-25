export default function Footer() {
  return (
    <footer className="bg-primary text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Tennis Tournament App. All rights reserved.</p>
      </div>
    </footer>
  );
} 