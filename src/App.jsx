import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import MyTasks from './components/MyTasks';
import MyWork from './components/MyWork';
import Team from './components/Team';
import Clients from './components/Clients';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css';

// Initial data
const initialProjects = [
  { id: 1, name: 'E-commerce Website', description: 'Full-featured online shopping platform with payment integration', clientId: 5, clientName: 'TechCorp', assignedTeamMembers: [1, 2], status: 'In Progress', progress: 65, startDate: '2025-09-15', deadline: '2025-11-22', createdDate: '2025-09-15', lastUpdated: '2025-11-08' },
  { id: 2, name: 'Mobile App Development', description: 'Cross-platform mobile application for retail management', clientId: 7, clientName: 'RetailMart', assignedTeamMembers: [3, 4], status: 'In Progress', progress: 40, startDate: '2025-10-01', deadline: '2025-12-08', createdDate: '2025-10-01', lastUpdated: '2025-11-07' },
  { id: 3, name: 'CRM System', description: 'Customer relationship management system with analytics', clientId: 8, clientName: 'FinanceHub', assignedTeamMembers: [1, 4], status: 'Completed', progress: 100, startDate: '2025-07-01', deadline: '2025-10-15', createdDate: '2025-07-01', lastUpdated: '2025-10-20' },
  { id: 4, name: 'IoT Dashboard', description: 'Real-time monitoring dashboard for smart home devices', clientId: 6, clientName: 'SmartHome Inc', assignedTeamMembers: [2], status: 'Not Started', progress: 5, startDate: '2025-11-01', deadline: '2026-02-08', createdDate: '2025-11-01', lastUpdated: '2025-11-05' },
  { id: 5, name: 'Data Analytics Platform', description: 'Business intelligence and data visualization platform', clientId: 9, clientName: 'DataViz Ltd', assignedTeamMembers: [1, 2, 3, 4], status: 'In Progress', progress: 30, startDate: '2025-10-15', deadline: '2025-12-20', createdDate: '2025-10-15', lastUpdated: '2025-11-08' }
];

const initialClients = [
  { id: 5, name: 'John Doe', company: 'TechCorp', email: 'john@clientcompany.com', phone: '+91-9876543210', projects: [1], status: 'Active', joinDate: '2024-04-01', lastLogin: '2025-11-08' },
  { id: 6, name: 'Sarah Wilson', company: 'SmartHome Inc', email: 'sarah@techcorp.com', phone: '+91-9876543211', projects: [4], status: 'Active', joinDate: '2024-05-15', lastLogin: '2025-11-07' },
  { id: 7, name: 'Jane Smith', company: 'RetailMart', email: 'jane@retailmart.com', phone: '+91-9876543212', projects: [2], status: 'Active', joinDate: '2024-06-10', lastLogin: '2025-11-05' },
  { id: 8, name: 'Mike Johnson', company: 'FinanceHub', email: 'mike@financehub.com', phone: '+91-9876543213', projects: [3], status: 'Active', joinDate: '2024-03-20', lastLogin: '2025-10-25' },
  { id: 9, name: 'Robert Brown', company: 'DataViz Ltd', email: 'robert@dataviz.com', phone: '+91-9876543214', projects: [5], status: 'Active', joinDate: '2024-07-05', lastLogin: '2025-11-06' }
];

const initialTasks = [
  { id: 1, projectId: 1, name: 'Payment gateway integration', description: 'Integrate Stripe/Razorpay payment gateway and test with multiple payment methods', assignedTo: 1, assignedToName: 'Shakti Mahato', status: 'In Progress', priority: 'High', progress: 75, startDate: '2025-11-01', deadline: '2025-11-12', createdBy: 1, createdDate: '2025-11-01T10:30:00', lastUpdated: '2025-11-08T14:20:00', comments: [{ userId: 1, userName: 'Shakti Mahato', text: 'Testing with sandbox credentials', timestamp: '2025-11-08T14:20:00' }] },
  { id: 2, projectId: 1, name: 'Mobile responsiveness', description: 'Ensure website is fully responsive on all mobile devices', assignedTo: 2, assignedToName: 'Priya Kumar', status: 'In Progress', priority: 'High', progress: 60, startDate: '2025-11-05', deadline: '2025-11-15', createdBy: 1, createdDate: '2025-11-05T09:00:00', lastUpdated: '2025-11-08T11:45:00', comments: [{ userId: 2, userName: 'Priya Kumar', text: 'Fixed tablet view layouts', timestamp: '2025-11-08T11:45:00' }] },
  { id: 3, projectId: 1, name: 'Homepage design', description: 'Create homepage UI mockup and get client approval', assignedTo: 2, assignedToName: 'Priya Kumar', status: 'Completed', priority: 'High', progress: 100, startDate: '2025-10-20', deadline: '2025-11-01', createdBy: 1, createdDate: '2025-10-20T14:00:00', lastUpdated: '2025-11-01T16:30:00', comments: [{ userId: 1, userName: 'Shakti Mahato', text: 'Client approved the design', timestamp: '2025-11-01T16:30:00' }] },
  { id: 4, projectId: 2, name: 'API development', description: 'Develop REST APIs for inventory management', assignedTo: 4, assignedToName: 'Anita Desai', status: 'Blocked', priority: 'Critical', progress: 30, startDate: '2025-10-25', deadline: '2025-11-10', createdBy: 4, createdDate: '2025-10-25T10:00:00', lastUpdated: '2025-11-07T15:00:00', comments: [{ userId: 4, userName: 'Anita Desai', text: 'Waiting for database schema approval from client', timestamp: '2025-11-07T15:00:00' }] },
  { id: 5, projectId: 2, name: 'User testing session', description: 'Conduct user testing and document feedback', assignedTo: 3, assignedToName: 'Raj Singh', status: 'Completed', priority: 'Medium', progress: 100, startDate: '2025-11-05', deadline: '2025-11-07', createdBy: 4, createdDate: '2025-11-05T11:00:00', lastUpdated: '2025-11-07T17:00:00', comments: [{ userId: 3, userName: 'Raj Singh', text: 'Completed testing with 5 users, documented all feedback', timestamp: '2025-11-07T17:00:00' }] },
  { id: 6, projectId: 5, name: 'Data visualization charts', description: 'Implement charts and graphs using Chart.js library', assignedTo: 1, assignedToName: 'Shakti Mahato', status: 'In Progress', priority: 'High', progress: 70, startDate: '2025-10-20', deadline: '2025-11-20', createdBy: 1, createdDate: '2025-10-20T09:30:00', lastUpdated: '2025-11-08T16:00:00', comments: [{ userId: 1, userName: 'Shakti Mahato', text: 'Implemented bar, pie, and line charts. Need to add export functionality', timestamp: '2025-11-08T16:00:00' }] },
  { id: 7, projectId: 5, name: 'Authentication system', description: 'Create user authentication and role management', assignedTo: 2, assignedToName: 'Priya Kumar', status: 'Completed', priority: 'Critical', progress: 100, startDate: '2025-10-01', deadline: '2025-10-25', createdBy: 1, createdDate: '2025-10-01T08:00:00', lastUpdated: '2025-10-25T14:00:00', comments: [{ userId: 2, userName: 'Priya Kumar', text: 'Tested with different user roles, JWT tokens working correctly', timestamp: '2025-10-25T14:00:00' }] },
  { id: 8, projectId: 5, name: 'Real-time data processing', description: 'Build pipeline for real-time data processing and analytics', assignedTo: 4, assignedToName: 'Anita Desai', status: 'In Progress', priority: 'Critical', progress: 45, startDate: '2025-10-15', deadline: '2025-11-30', createdBy: 1, createdDate: '2025-10-15T10:30:00', lastUpdated: '2025-11-08T13:20:00', comments: [{ userId: 4, userName: 'Anita Desai', text: 'Testing with sample datasets, need optimization', timestamp: '2025-11-08T13:20:00' }, { userId: 3, userName: 'Raj Singh', text: 'Performance metrics look good so far', timestamp: '2025-11-08T14:00:00' }] },
  { id: 9, projectId: 5, name: 'Dashboard UI design', description: 'Design analytics dashboard user interface', assignedTo: 3, assignedToName: 'Raj Singh', status: 'In Progress', priority: 'High', progress: 55, startDate: '2025-10-25', deadline: '2025-11-25', createdBy: 1, createdDate: '2025-10-25T11:00:00', lastUpdated: '2025-11-08T10:15:00', comments: [] },
  { id: 10, projectId: 4, name: 'IoT device integration', description: 'Connect and integrate IoT devices with dashboard', assignedTo: 2, assignedToName: 'Priya Kumar', status: 'Not Started', priority: 'Critical', progress: 0, startDate: '2025-11-15', deadline: '2026-01-15', createdBy: 2, createdDate: '2025-11-05T09:00:00', lastUpdated: '2025-11-05T09:00:00', comments: [] },
  { id: 11, projectId: 4, name: 'Real-time monitoring UI', description: 'Build real-time dashboard UI with live updates', assignedTo: 2, assignedToName: 'Priya Kumar', status: 'Not Started', priority: 'High', progress: 5, startDate: '2025-11-01', deadline: '2026-02-01', createdBy: 2, createdDate: '2025-11-01T08:30:00', lastUpdated: '2025-11-05T09:00:00', comments: [] },
  { id: 12, projectId: 3, name: 'Bug fixes and optimization', description: 'Final bug fixing and performance optimization', assignedTo: 4, assignedToName: 'Anita Desai', status: 'Completed', priority: 'High', progress: 100, startDate: '2025-10-10', deadline: '2025-10-18', createdBy: 1, createdDate: '2025-10-10T10:00:00', lastUpdated: '2025-10-18T15:00:00', comments: [{ userId: 4, userName: 'Anita Desai', text: 'All reported bugs fixed, 40% performance improvement achieved', timestamp: '2025-10-18T15:00:00' }] }
];

const initialUsers = [
  { id: 1, name: 'Shakti Mahato', email: 'shakti@innohex.com', password: 'password123', role: 'Developer', accessLevel: 'full' },
  { id: 2, name: 'Priya Kumar', email: 'priya@innohex.com', password: 'password123', role: 'Designer', accessLevel: 'view' },
  { id: 3, name: 'Raj Singh', email: 'raj@innohex.com', password: 'password123', role: 'QA Engineer', accessLevel: 'view' },
  { id: 4, name: 'Anita Desai', email: 'anita@innohex.com', password: 'password123', role: 'Backend Engineer', accessLevel: 'full' }
];

const initialWorkUpdates = [
  { id: 1, projectId: 1, userId: 1, userName: 'Shakti Mahato', date: '2025-11-08', description: 'Completed payment gateway integration and tested with multiple payment methods', hoursWorked: 6, status: 'In Progress', progress: 65, notes: 'Need to add refund functionality next', timestamp: '2025-11-08T14:30:00' },
  { id: 2, projectId: 1, userId: 2, userName: 'Priya Kumar', date: '2025-11-08', description: 'Designed and implemented product catalog UI with filtering and search', hoursWorked: 5, status: 'In Progress', progress: 60, notes: 'Working on mobile responsiveness', timestamp: '2025-11-08T11:20:00' },
  { id: 3, projectId: 2, userId: 4, userName: 'Anita Desai', date: '2025-11-07', description: 'Set up backend API endpoints for inventory management', hoursWorked: 7, status: 'In Progress', progress: 40, notes: 'Database optimization needed', timestamp: '2025-11-07T16:45:00' },
  { id: 4, projectId: 2, userId: 3, userName: 'Raj Singh', date: '2025-11-07', description: 'Conducted user testing session and documented feedback', hoursWorked: 4, status: 'In Progress', progress: 35, notes: 'Several UI improvements suggested', timestamp: '2025-11-07T10:15:00' },
  { id: 5, projectId: 5, userId: 1, userName: 'Shakti Mahato', date: '2025-11-08', description: 'Implemented data visualization charts using Chart.js library', hoursWorked: 8, status: 'In Progress', progress: 30, notes: 'Need to add export functionality', timestamp: '2025-11-08T17:00:00' },
  { id: 6, projectId: 5, userId: 2, userName: 'Priya Kumar', date: '2025-11-06', description: 'Created user authentication and role management system', hoursWorked: 6, status: 'Completed', progress: 100, notes: 'Tested with different user roles', timestamp: '2025-11-06T15:30:00' },
  { id: 7, projectId: 4, userId: 2, userName: 'Priya Kumar', date: '2025-11-05', description: 'Initial project setup and requirements gathering', hoursWorked: 3, status: 'Not Started', progress: 5, notes: 'Waiting for IoT device specifications', timestamp: '2025-11-05T12:00:00' },
  { id: 8, projectId: 3, userId: 1, userName: 'Shakti Mahato', date: '2025-10-18', description: 'Final deployment and client training completed', hoursWorked: 5, status: 'Completed', progress: 100, notes: 'Project successfully delivered', timestamp: '2025-10-18T18:00:00' },
  { id: 9, projectId: 3, userId: 4, userName: 'Anita Desai', date: '2025-10-15', description: 'Fixed all reported bugs and optimized database queries', hoursWorked: 6, status: 'Completed', progress: 100, notes: 'Performance improved by 40%', timestamp: '2025-10-15T14:20:00' },
  { id: 10, projectId: 5, userId: 3, userName: 'Raj Singh', date: '2025-11-08', description: 'Reviewed analytics requirements with client and updated documentation', hoursWorked: 4, status: 'In Progress', progress: 25, notes: 'Client requested additional dashboard features', timestamp: '2025-11-08T10:30:00' },
  { id: 11, projectId: 5, userId: 4, userName: 'Anita Desai', date: '2025-11-07', description: 'Developed data processing pipeline for real-time analytics', hoursWorked: 7, status: 'In Progress', progress: 30, notes: 'Testing with sample datasets', timestamp: '2025-11-07T16:00:00' },
  { id: 12, projectId: 1, userId: 2, userName: 'Priya Kumar', date: '2025-11-07', description: 'Integrated shopping cart functionality with local storage', hoursWorked: 5, status: 'In Progress', progress: 62, notes: 'Cart persists across sessions', timestamp: '2025-11-07T13:45:00' }
];

const MASTER_ADMIN = {
  email: "sahukunu293@gmail.com",
  password: "Malati@1",
  name: "Master Admin",
  role: "Super Admin",
  accessLevel: "full"
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [projects, setProjects] = useState(initialProjects);
  const [clients, setClients] = useState(initialClients);
  const [tasks, setTasks] = useState(initialTasks);
  const [workUpdates, setWorkUpdates] = useState(initialWorkUpdates);
  const [users, setUsers] = useState(initialUsers);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Load data from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    if (savedUsers && savedUsers.length > 0) {
      setUsers(savedUsers);
    }

    // Load clients from localStorage
    const savedClients = JSON.parse(localStorage.getItem('clients'));
    if (savedClients && savedClients.length > 0) {
      setClients(savedClients);
    }

    // Load projects from localStorage
    const savedProjects = JSON.parse(localStorage.getItem('projects'));
    if (savedProjects && savedProjects.length > 0) {
      setProjects(savedProjects);
    }

    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks && savedTasks.length > 0) {
      setTasks(savedTasks);
    }

    // Load work updates from localStorage
    const savedWorkUpdates = JSON.parse(localStorage.getItem('workUpdates'));
    if (savedWorkUpdates && savedWorkUpdates.length > 0) {
      setWorkUpdates(savedWorkUpdates);
    }

    // Set theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
  }, []);

  const login = (email, password) => {
    // Master admin login
    if (email === MASTER_ADMIN.email && password === MASTER_ADMIN.password) {
      setCurrentUser(MASTER_ADMIN);
      return true;
    }

    // Other users login
    const user = users.find(u =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
    );

    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
  };

  const updateProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem('projects', JSON.stringify(newProjects));
  };

  const updateClients = (newClients) => {
    setClients(newClients);
    localStorage.setItem('clients', JSON.stringify(newClients));
  };

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const updateWorkUpdates = (newWorkUpdates) => {
    setWorkUpdates(newWorkUpdates);
    localStorage.setItem('workUpdates', JSON.stringify(newWorkUpdates));
  };

  const updateUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  const contextValue = {
    currentUser,
    projects,
    clients,
    tasks,
    workUpdates,
    users,
    theme,
    login,
    logout,
    toggleTheme,
    updateProjects,
    updateClients,
    updateTasks,
    updateWorkUpdates,
    updateUsers
  };

  return (
    <Router>
      <div className="App">
        {!currentUser ? (
          <Login context={contextValue} />
        ) : (
          <div>
            <Sidebar />

            {/* Top Header */}
            <div className="header-bar">
              <Header />
            </div>

            {/* Main Content */}
            <div className="main-container">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard context={contextValue} />} />
                <Route path="/projects" element={<Projects context={contextValue} />} />
                <Route path="/mytasks" element={<MyTasks context={contextValue} />} />
                <Route path="/mywork" element={<MyWork context={contextValue} />} />
                <Route path="/team" element={<Team context={contextValue} />} />
                <Route path="/clients" element={<Clients context={contextValue} />} />
                <Route path="/settings" element={<Settings context={contextValue} />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;