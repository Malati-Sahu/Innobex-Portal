# InnohexIT Project Management Portal - React Version

This is a React.js conversion of the original vanilla JavaScript project management portal.

## Features

- **Login System**: Secure authentication with demo credentials
- **Dashboard**: Analytics widgets, charts, and recent activity
- **Projects Management**: View, add, and manage projects
- **Team Management**: Manage team members and their access levels
- **Client Management**: Handle client information and relationships
- **Task Management**: Assign and track tasks within projects
- **Work Updates**: Log daily work progress and updates
- **Settings**: Theme switching and password management

## Technology Stack

- **React 18** with Hooks
- **React Router** for navigation
- **Chart.js & React-Chartjs-2** for data visualization
- **CSS Variables** for theming (Light/Dark mode)
- **Local Storage** for data persistence

## Project Structure

```
src/
├── components/
│   ├── Login.jsx          # Login page component
│   ├── Dashboard.jsx      # Main dashboard with analytics
│   ├── Projects.jsx       # Projects management
│   ├── MyTasks.jsx        # User's assigned tasks
│   ├── MyWork.jsx         # Work update form
│   ├── Team.jsx           # Team member management
│   ├── Clients.jsx        # Client management
│   ├── Settings.jsx       # User settings and preferences
│   ├── Sidebar.jsx        # Navigation sidebar
│   └── Header.jsx         # Top header bar
├── App.jsx                # Main app component with routing
├── App.css                # Additional component styles
├── main.jsx               # React entry point
└── index.css              # Global styles (converted from style.css)
```

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Demo Credentials

- **Master Admin**: sahukunu293@gmail.com / Malati@1
- **Team Member**: admin@innohexIT.com / password123
- **View Access**: raj@innohexIT.com / password123
- **Client**: john@clientcompany.com / password123

## Key Improvements in React Version

1. **Component-Based Architecture**: Modular, reusable components
2. **State Management**: React hooks for local state management
3. **Routing**: Client-side routing with React Router
4. **Modern React Patterns**: Functional components with hooks
5. **Better Performance**: Virtual DOM and efficient re-rendering
6. **Type Safety**: Better development experience with modern tooling
7. **Maintainability**: Cleaner code structure and separation of concerns

## Features Implemented

### Authentication
- Login form with validation
- Session management
- Role-based access control

### Dashboard
- Real-time statistics
- Interactive charts (Pie chart for project status, Bar chart for team workload)
- Recent activity feed
- Project progress overview

### Projects Management
- Project listing with search and filtering
- Project cards with status indicators
- Add new project modal (UI ready, functionality can be extended)

### Team Management
- Team member listing
- Access level management
- Add new team member modal

### Client Management
- Client listing with contact information
- Company and project associations

### Task Management
- User's assigned tasks
- Task filtering by status
- Progress tracking

### Work Updates
- Daily work logging
- Progress reporting
- Notes and comments

### Settings
- Light/Dark theme toggle
- Password change functionality

## Data Structure

The app uses in-memory data structures (originally from localStorage) for:
- Users (team members and clients)
- Projects
- Tasks
- Clients
- Work updates

## Styling

- **CSS Variables**: Comprehensive design system with light/dark theme support
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional interface
- **Accessibility**: Proper focus states and ARIA labels

## Future Enhancements

1. **Backend Integration**: Connect to a real API
2. **Real-time Updates**: WebSocket integration for live updates
3. **Advanced Filtering**: More sophisticated search and filter options
4. **File Uploads**: Document management
5. **Notifications**: In-app notification system
6. **Advanced Analytics**: More detailed reporting
7. **User Roles**: More granular permission system

## Development Notes

- The original vanilla JavaScript logic has been converted to React hooks
- Chart.js integration maintained for data visualization
- All original styling preserved and enhanced
- Component state management handles all interactive features
- Modal dialogs converted to React components

This React version maintains all the functionality of the original while providing a more maintainable and scalable codebase.