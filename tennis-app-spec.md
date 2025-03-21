# Tennis Tournament App - Full Technical Specification

## 1. Project Overview

### 1.1 Purpose
A web application for tennis communities to create, manage, and participate in custom tennis tournaments, including ladder systems, round-robins, and elimination brackets. The application will support custom tournament rules and workflows.

### 1.2 Target Users
- Tennis club administrators
- Tournament organizers/coaches 
- Tennis players
- Tennis enthusiasts

### 1.3 Key Features
- Custom tournament creation
- Drag-and-drop tournament builder
- Ladder system with configurable challenge rules
- Match scheduling and reporting
- Player ranking and statistics
- Phase transitions (ladder to knockout)
- Real-time tournament updates

## 2. Technical Architecture

### 2.1 Frontend Stack
- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**:
  - React Query (API data)
  - Zustand (UI state)
- **UI Component Generation**: 21st Dev Magic MCP
- **Component Libraries**:
  - react-beautiful-dnd (drag-and-drop)
  - react-bracket-tree (tournament visualization)
  - Framer Motion (animations)
- **Authentication**: NextAuth.js

### 2.2 Backend Stack
- **Framework**: Node.js with Express
- **Language**: TypeScript
- **API**: RESTful with OpenAPI specification
- **Authentication**: JWT
- **Real-time**: Socket.IO

### 2.3 Database
- **Primary Database**: PostgreSQL
  - Tournament data
  - Player profiles
  - Match records
- **Caching Layer**: Redis
  - Real-time tournament updates
  - Leaderboard caching

### 2.4 Deployment & Infrastructure
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Railway or Render
- **CI/CD**: GitHub Actions
- **Container**: Docker
- **Monitoring**: Sentry

### 2.5 21st Dev Magic MCP Integration
The 21st Dev Magic MCP will be used to generate high-quality React components based on natural language descriptions. Key integration points:

- Configure Magic MCP with API key in development environment
- Generate core UI components through prompt commands (e.g., `/ui create a tournament bracket`)
- Customize and extend generated components for specific tennis tournament needs
- Implement a consistent design system across all Magic-generated components

## 3. Data Models

### 3.1 User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'player' | 'admin' | 'organizer';
  password: string; // hashed
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 3.2 Player
```typescript
interface Player {
  id: string;
  userId: string;
  name: string;
  skill: number; // rating/skill level
  statistics: {
    wins: number;
    losses: number;
    matchesPlayed: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### 3.3 Tournament
```typescript
interface Tournament {
  id: string;
  name: string;
  description: string;
  organizerId: string;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'active' | 'completed';
  type: 'ladder' | 'singleElimination' | 'doubleElimination' | 'roundRobin' | 'custom';
  phases: Phase[];
  players: Player[];
  rules: Rule[];
  createdAt: Date;
  updatedAt: Date;
}
```

### 3.4 Phase
```typescript
interface Phase {
  id: string;
  tournamentId: string;
  name: string;
  order: number;
  type: 'ladder' | 'roundRobin' | 'singleElimination' | 'doubleElimination' | 'custom';
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'active' | 'completed';
  rules: Rule[];
  createdAt: Date;
  updatedAt: Date;
}
```

### 3.5 Match
```typescript
interface Match {
  id: string;
  tournamentId: string;
  phaseId: string;
  roundNumber?: number;
  players: [string, string] | [string, string, string, string]; // player IDs, 2 for singles, 4 for doubles
  scheduledDate?: Date;
  completedDate?: Date;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scores: Set[];
  winnerId?: string;
  verifiedBy?: string; // admin/organizer who verified match
  createdAt: Date;
  updatedAt: Date;
}
```

### 3.6 Set
```typescript
interface Set {
  player1Score: number;
  player2Score: number;
  tiebreak?: boolean;
  tiebreakScore?: [number, number];
}
```

### 3.7 Rule
```typescript
interface Rule {
  id: string;
  type: string; // e.g., "challengeRange", "matchFormat", "tiebreakRule"
  parameters: {
    [key: string]: any; // Configurable parameters for each rule
  };
}
```

### 3.8 Standing
```typescript
interface Standing {
  phaseId: string;
  playerId: string;
  rank: number;
  points: number;
  wins: number;
  losses: number;
  matchesPlayed: number;
  updatedAt: Date;
}
```

## 4. API Endpoints

### 4.1 Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### 4.2 Users
- `GET /api/users` - List users
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### 4.3 Players
- `GET /api/players` - List players
- `GET /api/players/:id` - Get player details
- `POST /api/players` - Create player
- `PUT /api/players/:id` - Update player
- `DELETE /api/players/:id` - Delete player

### 4.4 Tournaments
- `GET /api/tournaments` - List tournaments
- `GET /api/tournaments/:id` - Get tournament details
- `POST /api/tournaments` - Create tournament
- `PUT /api/tournaments/:id` - Update tournament
- `DELETE /api/tournaments/:id` - Delete tournament
- `GET /api/tournaments/:id/players` - Get players in tournament
- `POST /api/tournaments/:id/players` - Add player to tournament
- `DELETE /api/tournaments/:id/players/:playerId` - Remove player from tournament

### 4.5 Phases
- `GET /api/tournaments/:id/phases` - List phases in tournament
- `GET /api/phases/:id` - Get phase details
- `POST /api/tournaments/:id/phases` - Create phase
- `PUT /api/phases/:id` - Update phase
- `DELETE /api/phases/:id` - Delete phase
- `POST /api/phases/:id/transition` - Transition to next phase

### 4.6 Matches
- `GET /api/tournaments/:id/matches` - List matches in tournament
- `GET /api/phases/:id/matches` - List matches in phase
- `GET /api/matches/:id` - Get match details
- `POST /api/matches` - Create match
- `PUT /api/matches/:id` - Update match
- `POST /api/matches/:id/score` - Submit match score
- `PUT /api/matches/:id/verify` - Verify match result
- `POST /api/matches/:id/schedule` - Schedule match

### 4.7 Standings
- `GET /api/phases/:id/standings` - Get standings for phase
- `GET /api/tournaments/:id/standings` - Get standings for tournament

### 4.8 Rules
- `GET /api/rules` - List available rule types
- `GET /api/tournaments/:id/rules` - Get rules for tournament
- `POST /api/tournaments/:id/rules` - Add rule to tournament
- `PUT /api/tournaments/:id/rules/:ruleId` - Update tournament rule
- `DELETE /api/tournaments/:id/rules/:ruleId` - Remove rule from tournament

## 5. Feature Specifications

### 5.1 Tournament Creation

#### 5.1.1 Tournament Builder
- Drag-and-drop interface for creating tournament structure
- Predefined templates (ladder, round-robin, elimination)
- Custom tournament workflows
- Rule configuration panel
- Phase management

#### 5.1.2 Tournament Templates
- Ladder
- Single Elimination
- Double Elimination
- Round Robin
- Swiss Format
- Custom (combine multiple formats)

#### 5.1.3 Rule Engine
- Challenge rules (who can challenge whom)
- Match format rules (sets, games)
- Tiebreak rules
- Scoring rules
- Advancement rules
- Time constraint rules

### 5.2 Ladder System

#### 5.2.1 Challenge System
- Challenge requests
- Challenge acceptance/rejection
- Challenge constraints (e.g., can challenge up to 3 ranks above)
- Challenge history

#### 5.2.2 Ranking Management
- Initial player seeding
- Rank updates based on match results
- New player placement
- Rank protection rules

#### 5.2.3 Ladder Visualization
- Current standings
- Challenge history
- Player movement over time

### 5.3 Match Management

#### 5.3.1 Match Scheduling
- Self-scheduling between players
- Admin scheduling
- Availability management
- Court reservation integration (optional)

#### 5.3.2 Score Reporting
- Mobile-friendly score entry
- Score verification
- Match dispute resolution
- Match history tracking

#### 5.3.3 Match Visualization
- Match cards
- Live score updates
- Match statistics

### 5.4 Player Management

#### 5.4.1 Player Profiles
- Basic info
- Match history
- Statistics
- Ranking history

#### 5.4.2 Player Registration
- Tournament registration
- Waitlist management
- Player grouping (e.g., by skill level)

### 5.5 Admin Controls

#### 5.5.1 Tournament Management
- Tournament creation/editing
- Player management
- Phase transitions
- Rule modifications

#### 5.5.2 Match Verification
- Score verification
- Match dispute resolution
- Manual match adjustments

#### 5.5.3 Communication
- Announcements
- Match reminders
- Results notifications

### 5.6 Phase Transitions

#### 5.6.1 Ladder to Knockout
- Qualification criteria
- Seeding based on ladder rankings
- Bracket generation
- Transition timing

#### 5.6.2 Round-Robin to Elimination
- Group stage to elimination stage
- Tiebreaker rules
- Cross-group matchups

## 6. User Interface Components

### 6.1 Key UI Components to Generate with 21st Dev Magic MCP

#### 6.1.1 Tournament Builder
```
/ui create a tournament builder interface with a sidebar of tournament formats (ladder, round-robin, single elimination) that can be dragged into a main canvas to create custom tournament flows
```

#### 6.1.2 Ladder Display
```
/ui create a responsive ladder ranking display that shows player rankings with profile pictures, win/loss records, and buttons to challenge players within range
```

#### 6.1.3 Match Card
```
/ui create a match card component that displays player names, match time, court location, with expandable sections for score entry and match details
```

#### 6.1.4 Tournament Bracket
```
/ui create an interactive tournament bracket that supports single and double elimination formats with hover states to show match details
```

#### 6.1.5 Score Entry Form
```
/ui create a mobile-friendly tennis score entry form with set-by-set scoring, tiebreak options, and match completion confirmation
```

#### 6.1.6 Player Profile Card
```
/ui create a player profile card showing player photo, name, ranking, win/loss record, and recent match history
```

#### 6.1.7 Admin Dashboard
```
/ui create an admin dashboard with sections for tournament management, player management, and match verification, with a sidebar for navigation
```

#### 6.1.8 Rule Configuration Panel
```
/ui create a rule configuration panel with different categories of rules (match format, challenge system, scoring) that can be toggled and customized
```

### 6.2 UI Design Guidelines

#### 6.2.1 Color Scheme
- Primary: #2D6A4F (Tennis Green)
- Secondary: #E9C46A (Tennis Ball Yellow)
- Accent: #1A759F (Court Blue)
- Background: #F8F9FA (Light Gray)
- Text: #343A40 (Dark Gray)

#### 6.2.2 Typography
- Headings: Inter (Sans-serif)
- Body: Inter (Sans-serif)
- Monospace: Fira Code (for any code elements)

#### 6.2.3 Component Style Guide
- Rounded corners (8px border radius)
- Subtle shadows for elevation
- Consistent padding (16px/24px)
- Responsive design (mobile-first)
- Accessible contrast ratios

## 7. Implementation of Ladder System Rules

### 7.1 Rule Configuration for Sample Ladder

```typescript
const ladderRules = [
  {
    type: "challengeRange",
    parameters: { 
      maxRanksAbove: 3,
      enforceRankRestrictions: true
    }
  },
  {
    type: "matchFormat",
    parameters: { 
      format: "bestOf3",
      tiebreakOption: {
        standard: "7pointTiebreak",
        finalSet: "10pointTiebreak",
        allowPlayerChoice: true
      }
    }
  },
  {
    type: "matchApproval",
    parameters: {
      requireAdminApproval: true,
      adminId: "coach-alex-id"
    }
  },
  {
    type: "scoreReporting",
    parameters: {
      reportDeadline: "immediately",
      verificationRequired: false
    }
  },
  {
    type: "playerEntry",
    parameters: { 
      newPlayerPosition: "bottom"
    }
  },
  {
    type: "phaseTransition",
    parameters: {
      nextPhase: "singleElimination",
      transitionDate: "2025-05-20", 
      organizer: "coach-alex-id"
    }
  }
]
```

### 7.2 Match Format Implementation

```typescript
const matchFormatHandler = (rule, match) => {
  // Enforce best of 3 sets format
  if (rule.parameters.format === "bestOf3") {
    // Validation logic for best of 3 sets
    const setsPlayed = match.scores.length;
    const player1Wins = match.scores.filter(set => set.player1Score > set.player2Score).length;
    const player2Wins = match.scores.filter(set => set.player2Score > set.player1Score).length;
    
    // Match is complete when a player wins 2 sets
    const isComplete = player1Wins === 2 || player2Wins === 2;
    
    // Final set tiebreak option
    if (setsPlayed === 2 && player1Wins === 1 && player2Wins === 1) {
      if (rule.parameters.tiebreakOption.allowPlayerChoice) {
        // Allow players to choose tiebreak format
        return { isValid: true, requiresChoice: true };
      } else {
        // Enforce predetermined tiebreak format
        return { isValid: true, tiebreakFormat: rule.parameters.tiebreakOption.finalSet };
      }
    }
    
    return { isValid: true, isComplete };
  }
  
  return { isValid: false, error: "Unsupported match format" };
};
```

## 8. Development Roadmap

### 8.1 Phase 1: Foundation (Weeks 1-4)
- Project setup and repository structure
- Core technology integration
- Authentication system
- Basic user management
- Database schema implementation
- API scaffolding

### 8.2 Phase 2: Core Features (Weeks 5-8)
- Tournament creation interface
- Rule engine implementation
- Ladder system core functionality
- Match creation and scheduling
- Basic score reporting
- Player profile management

### 8.3 Phase 3: UI Enhancement (Weeks 9-12)
- 21st Dev Magic MCP component generation
- UI polish and responsive design
- Tournament visualization (brackets, ladders)
- Match cards and score entry forms
- Admin interface

### 8.4 Phase 4: Advanced Features (Weeks 13-16)
- Phase transition implementation
- Advanced rule configurations
- Real-time updates
- Notifications system
- Statistics and reporting

### 8.5 Phase 5: Testing & Launch (Weeks 17-20)
- Comprehensive testing
- Performance optimization
- Security auditing
- Documentation
- Deployment

## 9. Testing Strategy

### 9.1 Unit Testing
- Jest for JavaScript/TypeScript testing
- Test coverage targets (>80%)
- Component tests with React Testing Library

### 9.2 Integration Testing
- API endpoint testing
- Database integration tests
- Authentication flow testing

### 9.3 End-to-End Testing
- Cypress for E2E testing
- Critical user journeys
- Cross-browser compatibility

### 9.4 Performance Testing
- Load testing with k6
- Database performance optimization
- Client-side performance metrics

### 9.5 User Testing
- Beta testing with select tennis community
- Feedback collection and iteration
- Usability testing

## 10. Deployment & DevOps

### 10.1 Environment Setup
- Development
- Staging
- Production

### 10.2 CI/CD Pipeline
- GitHub Actions for automated builds
- Automated testing
- Deployment automation

### 10.3 Infrastructure
- Docker containerization
- Database migrations
- Monitoring and logging (Sentry)

### 10.4 Hosting
- Vercel for frontend
- Railway or Render for backend
- PostgreSQL managed service
- Redis Cloud

## 11. Security Considerations

### 11.1 Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Secure password storage

### 11.2 Data Protection
- HTTPS/TLS encryption
- API rate limiting
- Input validation

### 11.3 Vulnerability Prevention
- Regular dependency updates
- Security scanning
- XSS and CSRF protection

## 12. Future Expansion

### 12.1 Potential Features
- Mobile app development
- Integration with external tennis platforms
- Advanced analytics
- Tournament entry fee management
- Social features (comments, follows)

### 12.2 Scalability Plans
- Multi-tenant architecture
- Regional deployment options
- Performance optimization for large tournaments

## 13. Appendices

### 13.1 Glossary
- **Ladder**: A ranking system where players can challenge others to move up
- **Round Robin**: A tournament format where each participant plays against all others
- **Single Elimination**: A knockout tournament where losers are eliminated
- **Double Elimination**: A tournament format requiring two losses to be eliminated
- **Phase**: A distinct period in a tournament with specific rules and format
- **Rule Engine**: System that processes and validates tournament rules

### 13.2 Reference Links
- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [21st Dev Magic MCP Documentation](https://21st.dev/magic)
- [Express.js Documentation](https://expressjs.com/)

---

This specification document serves as a comprehensive guide for developing the Tennis Tournament App. It outlines the technical architecture, features, development roadmap, and implementation details required for successful project execution.
