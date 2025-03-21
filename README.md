# Tennis Tournament App

A web application for tennis communities to create, manage, and participate in custom tennis tournaments, including ladder systems, round-robins, and elimination brackets.

## Features

- Custom tournament creation
- Drag-and-drop tournament builder
- Ladder system with configurable challenge rules
- Match scheduling and reporting
- Player ranking and statistics
- Phase transitions (ladder to knockout)
- Real-time tournament updates

## Tech Stack

### Frontend
- Next.js 14 (React)
- TypeScript
- Tailwind CSS
- React Query
- Zustand
- 21st Dev Magic MCP

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL
- Redis

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploying to GitHub Pages

This project is configured for static deployment to GitHub Pages:

1. Fork or clone this repository
2. Configure your GitHub repository for Pages:
   - Go to Settings > Pages
   - Set Source to "GitHub Actions"
3. Push to the main branch to trigger automatic deployment
4. Alternatively, manually deploy with:
   ```bash
   npm run build
   ```
   The static output will be in the `out` directory.

## Project Structure

- `app/`: Next.js app router pages and API routes
- `components/`: Reusable React components
- `lib/`: Utility functions and shared code
- `models/`: TypeScript interfaces and types
- `styles/`: Global stylesheets

## Development Roadmap

### Phase 1: Foundation (Weeks 1-4)
- Project setup and repository structure
- Core technology integration
- Authentication system
- Basic user management

### Phase 2: Core Features (Weeks 5-8)
- Tournament creation interface
- Rule engine implementation
- Ladder system core functionality

### Phase 3: UI Enhancement (Weeks 9-12)
- 21st Dev Magic MCP component generation
- UI polish and responsive design
- Tournament visualization

### Phase 4: Advanced Features (Weeks 13-16)
- Phase transition implementation
- Advanced rule configurations
- Real-time updates

### Phase 5: Testing & Launch (Weeks 17-20)
- Comprehensive testing
- Performance optimization
- Security auditing
- Documentation
- Deployment

## License

MIT 