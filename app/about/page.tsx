export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-primary mb-6">About Tennis Tournament App</h1>
      
      <div className="card mb-8">
        <h2 className="text-primary mb-4">Our Mission</h2>
        <p className="mb-4">
          Tennis Tournament App aims to simplify the process of creating, managing, and participating in tennis tournaments 
          for clubs, communities, and organizations of all sizes. We believe in making tennis more accessible and enjoyable 
          through well-organized competitions that adapt to the needs of players and tournament organizers.
        </p>
        <p>
          Whether you're running a simple ladder tournament, a complex multi-phase event, or a round-robin competition, 
          our platform provides the flexibility and tools needed to create a seamless experience for all participants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-primary mb-3">Customizable Tournaments</h3>
          <p>
            Create tournaments with custom rules, formats, and structures that meet the specific needs of your 
            tennis community.
          </p>
        </div>
        <div className="card">
          <h3 className="text-primary mb-3">Interactive Brackets</h3>
          <p>
            Visualize tournament progress with interactive brackets and ladders that update in real-time as matches 
            are completed.
          </p>
        </div>
        <div className="card">
          <h3 className="text-primary mb-3">Player Statistics</h3>
          <p>
            Track player performance across tournaments with comprehensive statistics and historical data to measure 
            improvement.
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-primary mb-4">Contact Us</h2>
        <p className="mb-4">
          We're always looking to improve our platform and would love to hear your feedback or answer any questions 
          you might have.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h4 className="font-medium mb-2">Email</h4>
            <p>support@tennistournamentapp.com</p>
          </div>
          <div className="flex-1">
            <h4 className="font-medium mb-2">Phone</h4>
            <p>(555) 123-4567</p>
          </div>
          <div className="flex-1">
            <h4 className="font-medium mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-accent hover:text-primary">
                Twitter
              </a>
              <a href="#" className="text-accent hover:text-primary">
                Facebook
              </a>
              <a href="#" className="text-accent hover:text-primary">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 