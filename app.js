// Data Storage (In-Memory)
let users = JSON.parse(localStorage.getItem('users')) || [];

// Master Admin (Hardcoded)
const MASTER_ADMIN = {
  email: "sahukunu293@gmail.com",
  password: "Malati@1",
  name: "Master Admin",
  role: "Super Admin",
  accessLevel: "full"
};
// let users = JSON.parse(localStorage.getItem('users')) || [];

let projects = [
  { id: 1, name: 'E-commerce Website', description: 'Full-featured online shopping platform with payment integration', clientId: 5, clientName: 'TechCorp', assignedTeamMembers: [1, 2], status: 'In Progress', progress: 65, startDate: '2025-09-15', deadline: '2025-11-22', createdDate: '2025-09-15', lastUpdated: '2025-11-08' },
  { id: 2, name: 'Mobile App Development', description: 'Cross-platform mobile application for retail management', clientId: 7, clientName: 'RetailMart', assignedTeamMembers: [3, 4], status: 'In Progress', progress: 40, startDate: '2025-10-01', deadline: '2025-12-08', createdDate: '2025-10-01', lastUpdated: '2025-11-07' },
  { id: 3, name: 'CRM System', description: 'Customer relationship management system with analytics', clientId: 8, clientName: 'FinanceHub', assignedTeamMembers: [1, 4], status: 'Completed', progress: 100, startDate: '2025-07-01', deadline: '2025-10-15', createdDate: '2025-07-01', lastUpdated: '2025-10-20' },
  { id: 4, name: 'IoT Dashboard', description: 'Real-time monitoring dashboard for smart home devices', clientId: 6, clientName: 'SmartHome Inc', assignedTeamMembers: [2], status: 'Not Started', progress: 5, startDate: '2025-11-01', deadline: '2026-02-08', createdDate: '2025-11-01', lastUpdated: '2025-11-05' },
  { id: 5, name: 'Data Analytics Platform', description: 'Business intelligence and data visualization platform', clientId: 9, clientName: 'DataViz Ltd', assignedTeamMembers: [1, 2, 3, 4], status: 'In Progress', progress: 30, startDate: '2025-10-15', deadline: '2025-12-20', createdDate: '2025-10-15', lastUpdated: '2025-11-08' }
];

let clients = [
  { id: 5, name: 'John Doe', company: 'TechCorp', email: 'john@clientcompany.com', phone: '+91-9876543210', projects: [1], status: 'Active', joinDate: '2024-04-01', lastLogin: '2025-11-08' },
  { id: 6, name: 'Sarah Wilson', company: 'SmartHome Inc', email: 'sarah@techcorp.com', phone: '+91-9876543211', projects: [4], status: 'Active', joinDate: '2024-05-15', lastLogin: '2025-11-07' },
  { id: 7, name: 'Jane Smith', company: 'RetailMart', email: 'jane@retailmart.com', phone: '+91-9876543212', projects: [2], status: 'Active', joinDate: '2024-06-10', lastLogin: '2025-11-05' },
  { id: 8, name: 'Mike Johnson', company: 'FinanceHub', email: 'mike@financehub.com', phone: '+91-9876543213', projects: [3], status: 'Active', joinDate: '2024-03-20', lastLogin: '2025-10-25' },
  { id: 9, name: 'Robert Brown', company: 'DataViz Ltd', email: 'robert@dataviz.com', phone: '+91-9876543214', projects: [5], status: 'Active', joinDate: '2024-07-05', lastLogin: '2025-11-06' }
];

let tasks = [
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

let workUpdates = [
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

// Session Management
let currentUser = null;
let projectStatusChart = null;
let teamWorkloadChart = null;
let currentProjectTab = 'overview';
let currentTaskFilter = 'all';

// Theme Initialize
let themeMode = 'light';
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  themeMode = 'dark';
}

function setTheme(mode) {
  document.body.classList.toggle('dark-theme', mode === 'dark');
  document.getElementById('themeStatus') && (document.getElementById('themeStatus').textContent = mode === 'dark' ? 'Dark Mode' : 'Light Mode');
  document.getElementById('themeToggle') && document.getElementById('themeToggle').classList.toggle('active', mode === 'dark');
  themeMode = mode;
}

// Listen for manual toggle
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    setTheme(themeMode === 'dark' ? 'light' : 'dark');
  });
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setTheme(themeMode === 'dark' ? 'light' : 'dark');
    }
  });
}


setTheme(themeMode);

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setTheme(themeMode);
  initThemeToggle();
});

function initializeApp() {
  // Login Form
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  // document.getElementById('registerForm').addEventListener('submit', handleRegister);

  // Theme toggle
  initThemeToggle();
  setTheme(themeMode);
  
  // Change password form
  if(document.getElementById('changePasswordForm')){
    document.getElementById('changePasswordForm').addEventListener('submit', handleChangePassword);
  }
  
  // Logout
  document.getElementById('sidebarLogoutBtn').addEventListener('click', handleLogout);
  
  // Sidebar Navigation
  document.querySelectorAll('.sidebar-menu-item').forEach(item => {
    item.addEventListener('click', handleNavigation);
  });
  
  // Hamburger menu
  document.getElementById('hamburgerMenu').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('open');
  });
  
  // Close sidebar on mobile when clicking outside
  document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburgerMenu');
    if (window.innerWidth <= 768 && sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
  
  // Work Update Form
  document.getElementById('workUpdateForm').addEventListener('submit', handleWorkUpdate);
  document.getElementById('workProgress').addEventListener('input', function() {
    document.getElementById('workProgressValue').textContent = this.value + '%';
  });
  
  // Set today's date as default
  document.getElementById('workDate').valueAsDate = new Date();
  
  // Modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').classList.remove('active');
    });
  });
  
  // Click outside modal to close
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
    }
  });
  
  // Add Project Button
  document.getElementById('addProjectBtn').addEventListener('click', showAddProjectModal);
  document.getElementById('addProjectForm').addEventListener('submit', handleAddProject);
  
  // Add Team Member Button
  document.getElementById('addTeamMemberBtn').addEventListener('click', showAddTeamMemberModal);
  document.getElementById('addTeamMemberForm').addEventListener('submit', handleAddTeamMember);
  
  // Add Client Button
  document.getElementById('addClientBtn').addEventListener('click', showAddClientModal);
  document.getElementById('addClientForm').addEventListener('submit', handleAddClient);
  
  // Search and Filter
  document.getElementById('projectSearch').addEventListener('input', filterProjects);
  document.getElementById('projectStatusFilter').addEventListener('change', filterProjects);
  document.getElementById('teamSearch').addEventListener('input', filterTeam);
  document.getElementById('teamAccessFilter').addEventListener('change', filterTeam);
  document.getElementById('clientSearch').addEventListener('input', filterClients);
  
  // Task Form
  document.getElementById('taskForm').addEventListener('submit', handleTaskSubmit);
  document.getElementById('taskProgress').addEventListener('input', function() {
    document.getElementById('taskProgressValue').textContent = this.value + '%';
  });
  
  // Task Filter Tabs
  document.querySelectorAll('.task-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.task-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      currentTaskFilter = this.dataset.filter;
      loadMyTasks();
    });
  });
  
  // Project Modal Tabs
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-tab')) {
      document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      currentProjectTab = e.target.dataset.tab;
      const projectId = parseInt(document.getElementById('projectModal').dataset.projectId);
      if (projectId) {
        showProjectDetails(projectId);
      }
    }
  });
}

// Login Handler
let loginLoading = false;
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Master admin login
  if (email === MASTER_ADMIN.email && password === MASTER_ADMIN.password) {
    currentUser = MASTER_ADMIN;

    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('mainApp').classList.add('active');

    setupUserInterface();
    loadDashboard();
    return;
  }

  // Other users login (only if approved by admin)
  let users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(u =>
    u.email.toLowerCase() === email.toLowerCase() &&
    u.password === password
  );

  if (user) {
    currentUser = user;

    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('mainApp').classList.add('active');

    setupUserInterface();
    loadDashboard();
  } else {
    document.getElementById('loginError').textContent = 'Access Denied. Contact Admin.';
  }
}

// function handleRegister(e) {
//   e.preventDefault();

//   const name = document.getElementById('registerName').value.trim();
//   const email = document.getElementById('registerEmail').value.trim();
//   const password = document.getElementById('registerPassword').value;

//   if (!name || !email || !password) {
//     alert("Please fill all fields");
//     return;
//   }

//   let users = JSON.parse(localStorage.getItem('users')) || [];

//   // Check if user already exists
//   const userExists = users.find(u => u.email === email);
//   if (userExists) {
//     alert("User already registered. Please login.");
//     return;
//   }

//   const newUser = {
//     id: users.length + 1,
//     name: name,
//     email: email,
//     password: password,
//     accessLevel: 'view',
//     role: 'User',
//     assignedProjects: [],
//     createdDate: new Date().toISOString().split('T')[0],
//     lastLogin: ''
//   };

//   users.push(newUser);
//   localStorage.setItem('users', JSON.stringify(users));

//   alert("Registration successful! Please login.");
//   document.getElementById('registerForm').reset();
// }


// Shake animation for error feedback
function shakeElement(element) {
  element.style.animation = 'shake 0.4s';
  element.addEventListener('animationend', function reset(e) {
    element.style.animation = '';
    element.removeEventListener('animationend', reset);
  });
}

// Shake animation keyframe
const shakeStyle = document.createElement('style');
shakeStyle.innerHTML = "@keyframes shake {0% {transform: translateX(0);} 20% {transform: translateX(-10px);} 40% {transform: translateX(8px);} 60% {transform: translateX(-6px);} 80% {transform: translateX(4px);} 100% {transform: translateX(0);}}";
document.head.appendChild(shakeStyle);

// Change Password Handler
function handleChangePassword(e) {
  e.preventDefault();
  let changed = false;
  const oldPwd = document.getElementById('oldPassword').value;
  const newPwd = document.getElementById('newPassword').value;
  const confirmPwd = document.getElementById('confirmPassword').value;

  document.getElementById('oldPasswordError').textContent = '';
  document.getElementById('passwordMatchError').textContent = '';
  document.getElementById('passwordChangeMsg').textContent = '';

  if (!oldPwd || currentUser.password !== oldPwd) {
    document.getElementById('oldPasswordError').textContent = 'Current password incorrect.';
    return;
  }
  if (!newPwd || newPwd.length < 6) {
    document.getElementById('passwordMatchError').textContent = 'New password must be at least 6 characters.';
    return;
  }
  if (newPwd !== confirmPwd) {
    document.getElementById('passwordMatchError').textContent = 'Passwords do not match.';
    return;
  }
  currentUser.password = newPwd;
  document.getElementById('passwordChangeMsg').textContent = 'Password changed successfully!';
  changed = true;
  setTimeout(() => {
    document.getElementById('passwordChangeMsg').textContent = '';
    document.getElementById('changePasswordForm').reset();
  }, 2000);
}

// Logout Handler
function handleLogout(e) {
  e.preventDefault();
  currentUser = null;
  
  document.getElementById('mainApp').classList.remove('active');
  document.getElementById('loginPage').classList.add('active');
  
  document.getElementById('loginForm').reset();
  document.getElementById('loginError').textContent = '';
}

// Setup User Interface based on access level
function setupUserInterface() {
  document.getElementById('sidebarUserName').textContent = currentUser.name;
  document.getElementById('sidebarUserRole').textContent = currentUser.role;
  document.getElementById('headerUserName').textContent = currentUser.name;
  
  const menuItems = document.querySelectorAll('.sidebar-menu-item');
  
  if (currentUser.accessLevel === 'client') {
    // For clients: only show Dashboard and Projects (renamed to My Projects)
    menuItems.forEach(item => {
      const page = item.dataset.page;
      if (page === 'dashboard' || page === 'projects') {
        item.style.display = 'block';
        if (page === 'projects') {
          item.querySelector('a').innerHTML = '📋 My Projects';
        }
      } else {
        item.style.display = 'none';
      }
    });
  } else {
    // For team members: show all except hide Clients for View access
    menuItems.forEach(item => {
      const page = item.dataset.page;
      item.style.display = 'block';
      if (page === 'projects') {
        item.querySelector('a').innerHTML = '📋 Projects';
      }
      if (page === 'clients' && currentUser.accessLevel === 'view') {
        item.style.display = 'none';
      }
    });
  }
  
  // Show add buttons for Full and View access (View can now create projects)
  if (currentUser.accessLevel === 'client') {
    document.getElementById('addProjectBtn').style.display = 'none';
    document.getElementById('addTeamMemberBtn').style.display = 'none';
    document.getElementById('addClientBtn').style.display = 'none';
  } else if (currentUser.accessLevel === 'view') {
    document.getElementById('addProjectBtn').style.display = 'block';
    document.getElementById('addTeamMemberBtn').style.display = 'none';
    document.getElementById('addClientBtn').style.display = 'none';
  } else {
    document.getElementById('addProjectBtn').style.display = 'block';
    document.getElementById('addTeamMemberBtn').style.display = 'block';
    document.getElementById('addClientBtn').style.display = 'block';
  }
}

// Navigation Handler
function handleNavigation(e) {
  e.preventDefault();
  
  const page = this.dataset.page;
  
  // Update active menu item
  document.querySelectorAll('.sidebar-menu-item').forEach(item => {
    item.classList.remove('active');
  });
  this.classList.add('active');
  
  // Hide all content pages
  document.querySelectorAll('.content-page').forEach(p => {
    p.classList.remove('active');
  });
  
  // Show selected page
  switch(page) {
    case 'dashboard':
      loadDashboard();
      document.getElementById('dashboardPage').classList.add('active');
  document.getElementById('pageTitle').textContent = 'Dashboard';
      break;
    case 'projects':
      loadProjects();
      document.getElementById('projectsPage').classList.add('active');
      break;
    case 'team':
      loadTeam();
      document.getElementById('teamPage').classList.add('active');
      break;
    case 'clients':
      loadClients();
      document.getElementById('clientsPage').classList.add('active');
      break;
    case 'mytasks':
      loadMyTasks();
      document.getElementById('mytasksPage').classList.add('active');
      document.getElementById('pageTitle').textContent = 'My Tasks';
      break;
    case 'mywork':
      loadMyWorkPage();
      document.getElementById('myworkPage').classList.add('active');
      document.getElementById('pageTitle').textContent = 'My Work';
      break;
    case 'settings':
      document.getElementById('settingsPage').classList.add('active');
      document.getElementById('pageTitle').textContent = 'Settings';
      initThemeToggle();
      break;
  }
  
  // Update page title
  const pageTitles = {
    dashboard: 'Dashboard',
    projects: currentUser.accessLevel === 'client' ? 'My Projects' : 'Projects',
    mytasks: 'My Tasks',
    mywork: 'My Work',
    team: 'Team Members',
    clients: 'Clients',
    settings: 'Settings'
  };
  document.getElementById('pageTitle').textContent = pageTitles[page] || 'Dashboard';
  
  // Close sidebar on mobile after navigation
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

// Load Dashboard
function loadDashboard() {
  let visibleProjects = projects;
  
  // Filter projects for client users
  if (currentUser.accessLevel === 'client') {
    visibleProjects = projects.filter(p => currentUser.assignedProjects.includes(p.id));
  }
  
  // Analytics - Client can now see all dashboard stats
  const totalProjects = visibleProjects.length;
  const completedProjects = visibleProjects.filter(p => p.status === 'Completed').length;
  const inProgressProjects = visibleProjects.filter(p => p.status === 'In Progress').length;
  
  // For clients, show active clients as 1 (themselves), for team show all clients
  const activeClients = currentUser.accessLevel === 'client' ? 1 : clients.filter(c => c.status === 'Active').length;
  const activeMembers = currentUser.accessLevel === 'client' ? 0 : users.filter(u => u.accessLevel !== 'client').length;
  
  document.getElementById('totalProjects').textContent = totalProjects;
  document.getElementById('completedProjects').textContent = completedProjects;
  
  // Update the active members or clients card based on user role
  if (currentUser.accessLevel === 'client') {
    document.getElementById('activeMembers').textContent = activeClients;
    document.querySelector('#activeMembers').parentElement.querySelector('p').textContent = 'Active Clients';
  } else {
    document.getElementById('activeMembers').textContent = activeMembers;
    document.querySelector('#activeMembers').parentElement.querySelector('p').textContent = 'Active Team Members';
  }
  
  document.getElementById('totalClients').textContent = activeClients;
  
  // Recent Activity
  loadRecentActivity();
  
  // Project Progress Overview
  loadProjectProgress();
  
  // Charts
  loadCharts();
  
  // Re-initialize theme toggle on dashboard load
  initThemeToggle();
}

function loadRecentActivity() {
  const activityList = document.getElementById('recentActivityList');
  let recentUpdates = [...workUpdates].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);
  
  // Filter for client users
  if (currentUser.accessLevel === 'client') {
    recentUpdates = recentUpdates.filter(u => currentUser.assignedProjects.includes(u.projectId));
  }
  
  activityList.innerHTML = recentUpdates.map(update => {
    const project = projects.find(p => p.id === update.projectId);
    return `
      <div class="activity-item">
        <p><strong>${update.userName}</strong> updated <strong>${project ? project.name : 'Project'}</strong></p>
        <p>${update.description}</p>
        <p class="activity-time">${formatDate(update.date)} - ${update.hoursWorked}h worked</p>
      </div>
    `;
  }).join('');
}

function loadProjectProgress() {
  const progressList = document.getElementById('projectProgressList');
  let visibleProjects = [...projects];
  
  // Filter for client users
  if (currentUser.accessLevel === 'client') {
    visibleProjects = visibleProjects.filter(p => currentUser.assignedProjects.includes(p.id));
  }
  
  visibleProjects = visibleProjects.filter(p => p.status !== 'Completed').slice(0, 5);
  
  progressList.innerHTML = visibleProjects.map(project => `
    <div class="progress-item">
      <h4>${project.name}</h4>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${project.progress}%"></div>
      </div>
      <p class="progress-text">${project.progress}% Complete - ${project.status}</p>
    </div>
  `).join('');
}

function loadCharts() {
  let visibleProjects = projects;
  
  if (currentUser.accessLevel === 'client') {
    visibleProjects = projects.filter(p => currentUser.assignedProjects.includes(p.id));
  }
  
  // Project Status Chart
  const statusCounts = {
    'Not Started': visibleProjects.filter(p => p.status === 'Not Started').length,
    'In Progress': visibleProjects.filter(p => p.status === 'In Progress').length,
    'Completed': visibleProjects.filter(p => p.status === 'Completed').length,
    'On Hold': visibleProjects.filter(p => p.status === 'On Hold').length
  };
  
  const ctx1 = document.getElementById('projectStatusChart').getContext('2d');
  if (projectStatusChart) {
    projectStatusChart.destroy();
  }
  projectStatusChart = new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: Object.keys(statusCounts),
      datasets: [{
        data: Object.values(statusCounts),
        backgroundColor: ['#e0e0e0', '#6B5BFF', '#28a745', '#FFB366']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
  
  // Team Workload Chart (skip for client users)
  if (currentUser.accessLevel !== 'client') {
    const teamMembers = users.filter(u => u.accessLevel !== 'client');
    const workloadData = teamMembers.map(member => {
      return projects.filter(p => p.assignedTeamMembers.includes(member.id)).length;
    });
    
    const ctx2 = document.getElementById('teamWorkloadChart').getContext('2d');
    if (teamWorkloadChart) {
      teamWorkloadChart.destroy();
    }
    teamWorkloadChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: teamMembers.map(m => m.name.split(' ')[0]),
        datasets: [{
          label: 'Projects Assigned',
          data: workloadData,
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
}

// Load Projects
function loadProjects() {
  filterProjects();
}

function filterProjects() {
  const searchTerm = document.getElementById('projectSearch').value.toLowerCase();
  const statusFilter = document.getElementById('projectStatusFilter').value;
  
  let filteredProjects = projects;
  
  // Filter for client users
  if (currentUser.accessLevel === 'client') {
    filteredProjects = filteredProjects.filter(p => currentUser.assignedProjects.includes(p.id));
  }
  
  if (searchTerm) {
    filteredProjects = filteredProjects.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.clientName.toLowerCase().includes(searchTerm)
    );
  }
  
  if (statusFilter) {
    filteredProjects = filteredProjects.filter(p => p.status === statusFilter);
  }
  
  displayProjects(filteredProjects);
}

function displayProjects(projectList) {
  const projectsContainer = document.getElementById('projectsList');
  
  if (projectList.length === 0) {
    projectsContainer.innerHTML = '<p>No projects found.</p>';
    return;
  }
  
  projectsContainer.innerHTML = projectList.map(project => {
    const teamMembers = users.filter(u => project.assignedTeamMembers.includes(u.id));
    const isReadOnly = currentUser.accessLevel !== 'full';
    
    return `
      <div class="project-card" data-project-id="${project.id}">
        <div class="project-header">
          <div>
            <h3 class="project-title">${project.name}</h3>
            <p class="project-client">${project.clientName}</p>
          </div>
          <span class="project-status status-${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span>
        </div>
        
        <div class="project-team">
          <p class="project-team-label">Team Members:</p>
          <div class="team-avatars">
            ${teamMembers.map(member => `
              <div class="team-avatar" title="${member.name}">${getInitials(member.name)}</div>
            `).join('')}
          </div>
        </div>
        
        <div class="project-progress">
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${project.progress}%"></div>
          </div>
          <p class="progress-text">${project.progress}% Complete</p>
        </div>
        
        <div class="project-footer">
          <span>Deadline: ${formatDate(project.deadline)}</span>
          ${!isReadOnly ? `
            <div class="project-actions">
              <button class="btn-icon" onclick="editProject(${project.id})" title="Edit">✏️</button>
              <button class="btn-icon" onclick="deleteProject(${project.id})" title="Delete">🗑️</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
  
  // Add click handlers for project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e.target.classList.contains('btn-icon')) {
        const projectId = parseInt(this.dataset.projectId);
        showProjectDetails(projectId);
      }
    });
  });
}

function showProjectDetails(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;
  
  const teamMembers = users.filter(u => project.assignedTeamMembers.includes(u.id));
  const projectUpdates = workUpdates.filter(u => u.projectId === projectId);
  const projectTasks = tasks.filter(t => t.projectId === projectId);
  
  let modalContent = '';
  
  // Store project ID for tab switching
  document.getElementById('projectModal').dataset.projectId = projectId;
  
  if (currentProjectTab === 'overview') {
    modalContent = `
      <div class="project-detail">
        <p><strong>Description:</strong> ${project.description}</p>
        <p><strong>Client:</strong> ${project.clientName}</p>
        <p><strong>Status:</strong> <span class="project-status status-${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span></p>
        <p><strong>Progress:</strong> ${project.progress}%</p>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${project.progress}%"></div>
        </div>
        <p><strong>Start Date:</strong> ${formatDate(project.startDate)}</p>
        <p><strong>Deadline:</strong> ${formatDate(project.deadline)}</p>
      </div>
    `;
  } else if (currentProjectTab === 'tasks') {
    const canAddTask = currentUser.accessLevel !== 'client' && 
                       (currentUser.accessLevel === 'full' || project.assignedTeamMembers.includes(currentUser.id));
    
    modalContent = `
      <div class="tasks-section">
        ${canAddTask ? '<button class="btn btn-primary btn-sm" onclick="showAddTaskModal(' + projectId + ')">➕ Add Task</button>' : ''}
        <table class="tasks-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            ${projectTasks.length > 0 ? projectTasks.map(task => `
              <tr>
                <td><a href="#" class="task-name-link" onclick="showTaskDetail(${task.id}); return false;">${task.name}</a></td>
                <td>${task.assignedToName}</td>
                <td><span class="task-status-badge status-${task.status.toLowerCase().replace(' ', '-')}">${task.status}</span></td>
                <td><span class="task-priority priority-${task.priority.toLowerCase()}">${task.priority}</span></td>
                <td>${formatDate(task.deadline)}</td>
                <td>${task.progress}%</td>
              </tr>
            `).join('') : '<tr><td colspan="6" style="text-align: center;">No tasks yet</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
  } else if (currentProjectTab === 'team') {
    modalContent = `
      <div class="team-list">
        ${teamMembers.map(member => `
          <div class="activity-item">
            <p><strong>${member.name}</strong> - ${member.role}</p>
            <p>Email: ${member.email}</p>
            <p class="activity-time">Access Level: ${member.accessLevel.toUpperCase()}</p>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentProjectTab === 'activity') {
    modalContent = `
      <div class="work-updates-list">
        ${projectUpdates.length > 0 ? projectUpdates.slice(0, 10).map(update => `
          <div class="activity-item">
            <p><strong>${update.userName}</strong> - ${formatDate(update.date)}</p>
            <p>${update.description}</p>
            <p class="activity-time">${update.hoursWorked}h worked - ${update.status}</p>
          </div>
        `).join('') : '<p>No activity yet.</p>'}
      </div>
    `;
  }
  
  document.getElementById('modalProjectName').textContent = project.name;
  document.getElementById('modalProjectContent').innerHTML = modalContent;
  document.getElementById('projectModal').classList.add('active');
}

// Load Team
function loadTeam() {
  filterTeam();
}

function filterTeam() {
  const searchTerm = document.getElementById('teamSearch').value.toLowerCase();
  const accessFilter = document.getElementById('teamAccessFilter').value;
  
  let filteredTeam = users.filter(u => u.accessLevel !== 'client');
  
  if (searchTerm) {
    filteredTeam = filteredTeam.filter(u => 
      u.name.toLowerCase().includes(searchTerm) || 
      u.role.toLowerCase().includes(searchTerm)
    );
  }
  
  if (accessFilter) {
    filteredTeam = filteredTeam.filter(u => u.accessLevel === accessFilter);
  }
  
  displayTeam(filteredTeam);
}

function displayTeam(teamList) {
  const teamContainer = document.getElementById('teamList');
  
  if (teamList.length === 0) {
    teamContainer.innerHTML = '<p>No team members found.</p>';
    return;
  }
  
  teamContainer.innerHTML = teamList.map(member => {
    const projectCount = projects.filter(p => p.assignedTeamMembers.includes(member.id)).length;
    const memberUpdates = workUpdates.filter(u => u.userId === member.id);
    const totalHours = memberUpdates.reduce((sum, u) => sum + u.hoursWorked, 0);
    
    return `
      <div class="team-card" data-member-id="${member.id}">
        <div class="team-card-header">
          <div class="team-avatar-large">${getInitials(member.name)}</div>
          <div class="team-info">
            <h3>${member.name}</h3>
            <p class="team-role">${member.role}</p>
            <span class="team-access access-${member.accessLevel}">${member.accessLevel.toUpperCase()} ACCESS</span>
          </div>
        </div>
        
        <div class="team-stats">
          <div class="team-stat">
            <div class="team-stat-value">${projectCount}</div>
            <div class="team-stat-label">Projects</div>
          </div>
          <div class="team-stat">
            <div class="team-stat-value">${totalHours}</div>
            <div class="team-stat-label">Hours Logged</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Add click handlers for team cards
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', function() {
      const memberId = parseInt(this.dataset.memberId);
      showMemberDetails(memberId);
    });
  });
}

function showMemberDetails(memberId) {
  const member = users.find(u => u.id === memberId);
  if (!member) return;
  
  const memberProjects = projects.filter(p => p.assignedTeamMembers.includes(memberId));
  const memberUpdates = workUpdates.filter(u => u.userId === memberId);
  
  const modalContent = `
    <div class="member-detail">
      <div class="team-card-header">
        <div class="team-avatar-large">${getInitials(member.name)}</div>
        <div class="team-info">
          <h3>${member.name}</h3>
          <p class="team-role">${member.role}</p>
          <span class="team-access access-${member.accessLevel}">${member.accessLevel.toUpperCase()} ACCESS</span>
        </div>
      </div>
      
      <h3 class="mt-2">Assigned Projects</h3>
      <div class="member-projects">
        ${memberProjects.length > 0 ? memberProjects.map(project => `
          <div class="progress-item">
            <h4>${project.name} (${project.clientName})</h4>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: ${project.progress}%"></div>
            </div>
            <p class="progress-text">${project.progress}% Complete - ${project.status}</p>
          </div>
        `).join('') : '<p>No projects assigned.</p>'}
      </div>
      
      <h3 class="mt-2">Recent Work Updates</h3>
      <div class="work-updates-list">
        ${memberUpdates.length > 0 ? memberUpdates.slice(0, 5).map(update => `
          <div class="activity-item">
            <p><strong>${projects.find(p => p.id === update.projectId)?.name}</strong> - ${formatDate(update.date)}</p>
            <p>${update.description}</p>
            <p class="activity-time">${update.hoursWorked}h worked - ${update.progress}% progress</p>
          </div>
        `).join('') : '<p>No updates yet.</p>'}
      </div>
    </div>
  `;
  
  document.getElementById('modalMemberName').textContent = member.name + "'s Work Progress";
  document.getElementById('modalMemberContent').innerHTML = modalContent;
  document.getElementById('teamMemberModal').classList.add('active');
}

// Load Clients
function loadClients() {
  filterClients();
}

function filterClients() {
  const searchTerm = document.getElementById('clientSearch').value.toLowerCase();
  
  let filteredClients = clients;
  
  if (searchTerm) {
    filteredClients = filteredClients.filter(c => 
      c.name.toLowerCase().includes(searchTerm) || 
      c.company.toLowerCase().includes(searchTerm)
    );
  }
  
  displayClients(filteredClients);
}

function displayClients(clientList) {
  const clientsContainer = document.getElementById('clientsList');
  
  if (clientList.length === 0) {
    clientsContainer.innerHTML = '<p>No clients found.</p>';
    return;
  }
  
  clientsContainer.innerHTML = clientList.map(client => {
    const clientProjects = projects.filter(p => client.projects.includes(p.id));
    const activeProjects = clientProjects.filter(p => p.status === 'In Progress').length;
    const completedProjects = clientProjects.filter(p => p.status === 'Completed').length;
    
    return `
      <div class="client-card">
        <div class="client-header">
          <div>
            <h3 class="client-name">${client.name}</h3>
            <p class="client-company">${client.company}</p>
          </div>
          <span class="project-status status-${client.status.toLowerCase()}">${client.status}</span>
        </div>
        
        <div class="client-contact">
          <p>📧 ${client.email}</p>
          <p>📱 ${client.phone}</p>
        </div>
        
        <div class="team-stats">
          <div class="team-stat">
            <div class="team-stat-value">${activeProjects}</div>
            <div class="team-stat-label">Active Projects</div>
          </div>
          <div class="team-stat">
            <div class="team-stat-value">${completedProjects}</div>
            <div class="team-stat-label">Completed</div>
          </div>
        </div>
        
        <div class="project-footer">
          <span>Joined: ${formatDate(client.joinDate)}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Load My Work Page
function loadMyWorkPage() {
  const workProject = document.getElementById('workProject');
  let userProjects = projects;
  
  // Filter projects for current user
  if (currentUser.accessLevel !== 'client') {
    userProjects = projects.filter(p => p.assignedTeamMembers.includes(currentUser.id));
  } else {
    userProjects = projects.filter(p => currentUser.assignedProjects.includes(p.id));
  }
  
  workProject.innerHTML = '<option value="">Select a project</option>' + 
    userProjects.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
}

// Work Update Handler
function handleWorkUpdate(e) {
  e.preventDefault();
  
  if (currentUser.accessLevel === 'client') {
    alert('Clients cannot submit work updates.');
    return;
  }
  
  const projectId = parseInt(document.getElementById('workProject').value);
  const date = document.getElementById('workDate').value;
  const description = document.getElementById('workDescription').value;
  const hoursWorked = parseFloat(document.getElementById('workHours').value);
  const status = document.getElementById('workStatus').value;
  const progress = parseInt(document.getElementById('workProgress').value);
  const notes = document.getElementById('workNotes').value;
  
  const newUpdate = {
    id: workUpdates.length + 1,
    projectId: projectId,
    userId: currentUser.id,
    userName: currentUser.name,
    date: date,
    description: description,
    hoursWorked: hoursWorked,
    status: status,
    progress: progress,
    notes: notes,
    timestamp: new Date().toISOString()
  };
  
  workUpdates.unshift(newUpdate);
  
  // Update project progress
  const project = projects.find(p => p.id === projectId);
  if (project) {
    project.progress = progress;
    project.status = status;
    project.lastUpdated = date;
  }
  
  document.getElementById('workUpdateForm').reset();
  document.getElementById('workDate').valueAsDate = new Date();
  document.getElementById('workProgress').value = 0;
  document.getElementById('workProgressValue').textContent = '0%';
  
  document.getElementById('workUpdateSuccess').textContent = 'Work update submitted successfully!';
  setTimeout(() => {
    document.getElementById('workUpdateSuccess').textContent = '';
  }, 3000);
}

// Add Project Modal
function showAddProjectModal() {
  const clientSelect = document.getElementById('newProjectClient');
  const teamSelect = document.getElementById('newProjectTeam');
  
  clientSelect.innerHTML = '<option value="">Select a client</option>' + 
    clients.map(c => `<option value="${c.id}">${c.name} (${c.company})</option>`).join('');
  
  const teamMembers = users.filter(u => u.accessLevel !== 'client');
  teamSelect.innerHTML = teamMembers.map(m => 
    `<option value="${m.id}">${m.name} (${m.role})</option>`
  ).join('');
  
  document.getElementById('addProjectModal').classList.add('active');
}

function handleAddProject(e) {
  e.preventDefault();
  
  const name = document.getElementById('newProjectName').value;
  const description = document.getElementById('newProjectDescription').value;
  const clientId = parseInt(document.getElementById('newProjectClient').value);
  const teamSelect = document.getElementById('newProjectTeam');
  const teamMembers = Array.from(teamSelect.selectedOptions).map(o => parseInt(o.value));
  const startDate = document.getElementById('newProjectStart').value;
  const deadline = document.getElementById('newProjectDeadline').value;
  
  const client = clients.find(c => c.id === clientId);
  
  const newProject = {
    id: projects.length + 1,
    name: name,
    description: description,
    clientId: clientId,
    clientName: client ? client.company : 'Unknown',
    assignedTeamMembers: teamMembers,
    status: 'Not Started',
    progress: 0,
    startDate: startDate,
    deadline: deadline,
    createdDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0]
  };
  
  projects.push(newProject);
  
  // Update client projects
  if (client) {
    client.projects.push(newProject.id);
  }
  
  document.getElementById('addProjectModal').classList.remove('active');
  document.getElementById('addProjectForm').reset();
  loadProjects();
}

// Add Team Member Modal
function showAddTeamMemberModal() {
  document.getElementById('addTeamMemberModal').classList.add('active');
}

function handleAddTeamMember(e) {
  e.preventDefault();
  
  const name = document.getElementById('newMemberName').value;
  const email = document.getElementById('newMemberEmail').value;
  const password = document.getElementById('newMemberPassword').value;
  const role = document.getElementById('newMemberRole').value;
  const accessLevel = document.getElementById('newMemberAccess').value;
  
  const newMember = {
    id: users.length + 1,
    name: name,
    email: email,
    password: password,
    accessLevel: accessLevel,
    role: role,
    assignedProjects: [],
    createdDate: new Date().toISOString().split('T')[0],
    lastLogin: null
  };
  
  users.push(newMember);
  
  document.getElementById('addTeamMemberModal').classList.remove('active');
  document.getElementById('addTeamMemberForm').reset();
  loadTeam();
}

// Add Client Modal
function showAddClientModal() {
  document.getElementById('addClientModal').classList.add('active');
}

function handleAddClient(e) {
  e.preventDefault();
  
  const name = document.getElementById('newClientName').value;
  const company = document.getElementById('newClientCompany').value;
  const email = document.getElementById('newClientEmail').value;
  const phone = document.getElementById('newClientPhone').value;
  const password = document.getElementById('newClientPassword').value;
  
  const newClient = {
    id: clients.length + 10,
    name: name,
    company: company,
    email: email,
    phone: phone,
    projects: [],
    status: 'Active',
    joinDate: new Date().toISOString().split('T')[0],
    lastLogin: null
  };
  
  clients.push(newClient);
  
  // Also add as user with client access
  const newUser = {
    id: users.length + 1,
    name: name,
    email: email,
    password: password,
    accessLevel: 'client',
    role: 'Client',
    company: company,
    assignedProjects: [],
    createdDate: new Date().toISOString().split('T')[0],
    lastLogin: null
  };
  
  users.push(newUser);
  
  document.getElementById('addClientModal').classList.remove('active');
  document.getElementById('addClientForm').reset();
  loadClients();
}

// Edit and Delete Functions (for Full access only)
function editProject(projectId) {
  if (currentUser.accessLevel !== 'full') {
    alert('You do not have permission to edit projects.');
    return;
  }
  
  alert('Edit project functionality would be implemented here.');
}

function deleteProject(projectId) {
  if (currentUser.accessLevel !== 'full') {
    alert('You do not have permission to delete projects.');
    return;
  }
  
  if (confirm('Are you sure you want to delete this project?')) {
    const index = projects.findIndex(p => p.id === projectId);
    if (index > -1) {
      projects.splice(index, 1);
      loadProjects();
    }
  }
}

// Utility Functions
function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Task Management Functions
function loadMyTasks() {
  let userTasks = tasks.filter(t => t.assignedTo === currentUser.id);
  
  if (currentTaskFilter !== 'all') {
    userTasks = userTasks.filter(t => t.status === currentTaskFilter);
  }
  
  const tasksList = document.getElementById('myTasksList');
  
  if (userTasks.length === 0) {
    tasksList.innerHTML = '<div class="card"><p>No tasks found.</p></div>';
    return;
  }
  
  tasksList.innerHTML = userTasks.map(task => {
    const project = projects.find(p => p.id === task.projectId);
    const deadlineStatus = getDeadlineStatus(task.deadline);
    
    return `
      <div class="my-task-card">
        <div class="my-task-header">
          <div>
            <h3 class="my-task-title">${task.name}</h3>
            <p class="my-task-project">${project ? project.name : 'Unknown Project'}</p>
          </div>
          <span class="task-priority priority-${task.priority.toLowerCase()}">${task.priority}</span>
        </div>
        <div class="my-task-body">
          <p>${task.description}</p>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${task.progress}%"></div>
          </div>
          <p class="progress-text">${task.progress}% Complete</p>
        </div>
        <div class="my-task-footer">
          <span class="deadline-indicator deadline-${deadlineStatus.class}">${deadlineStatus.icon} ${deadlineStatus.text}</span>
          <div class="task-quick-actions">
            <select class="form-control" style="width: auto; padding: 5px 10px; font-size: 12px;" onchange="quickUpdateTaskStatus(${task.id}, this.value)">
              <option value="Not Started" ${task.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
              <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="On Hold" ${task.status === 'On Hold' ? 'selected' : ''}>On Hold</option>
              <option value="Blocked" ${task.status === 'Blocked' ? 'selected' : ''}>Blocked</option>
              <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
            </select>
            <button class="btn btn-secondary btn-sm" onclick="showTaskDetail(${task.id})">View Details</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function getDeadlineStatus(deadline) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  const daysUntil = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  
  if (daysUntil < 0) {
    return { class: 'overdue', icon: '🔴', text: `Overdue by ${Math.abs(daysUntil)} day(s)` };
  } else if (daysUntil === 0) {
    return { class: 'soon', icon: '🟡', text: 'Due today' };
  } else if (daysUntil <= 2) {
    return { class: 'soon', icon: '🟡', text: `Due in ${daysUntil} day(s)` };
  } else {
    return { class: 'normal', icon: '🟢', text: `Due in ${daysUntil} day(s)` };
  }
}

function showAddTaskModal(projectId) {
  document.getElementById('taskModalTitle').textContent = 'Add Task';
  document.getElementById('taskForm').reset();
  document.getElementById('taskProjectId').value = projectId;
  document.getElementById('taskId').value = '';
  document.getElementById('taskProgress').value = 0;
  document.getElementById('taskProgressValue').textContent = '0%';
  
  // Populate assigned to dropdown
  const project = projects.find(p => p.id === projectId);
  const teamMembers = users.filter(u => project.assignedTeamMembers.includes(u.id));
  document.getElementById('taskAssignedTo').innerHTML = teamMembers.map(m => 
    `<option value="${m.id}">${m.name}</option>`
  ).join('');
  
  document.getElementById('taskModal').classList.add('active');
}

function handleTaskSubmit(e) {
  e.preventDefault();
  
  const taskId = document.getElementById('taskId').value;
  const projectId = parseInt(document.getElementById('taskProjectId').value);
  const name = document.getElementById('taskName').value;
  const description = document.getElementById('taskDescription').value;
  const assignedTo = parseInt(document.getElementById('taskAssignedTo').value);
  const priority = document.getElementById('taskPriority').value;
  const status = document.getElementById('taskStatus').value;
  const deadline = document.getElementById('taskDeadline').value;
  const progress = parseInt(document.getElementById('taskProgress').value);
  
  const assignedUser = users.find(u => u.id === assignedTo);
  
  if (taskId) {
    // Update existing task
    const task = tasks.find(t => t.id === parseInt(taskId));
    if (task) {
      task.name = name;
      task.description = description;
      task.assignedTo = assignedTo;
      task.assignedToName = assignedUser.name;
      task.priority = priority;
      task.status = status;
      task.deadline = deadline;
      task.progress = progress;
      task.lastUpdated = new Date().toISOString();
    }
  } else {
    // Create new task
    const newTask = {
      id: tasks.length + 1,
      projectId: projectId,
      name: name,
      description: description,
      assignedTo: assignedTo,
      assignedToName: assignedUser.name,
      status: status,
      priority: priority,
      progress: progress,
      startDate: new Date().toISOString().split('T')[0],
      deadline: deadline,
      createdBy: currentUser.id,
      createdDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      comments: []
    };
    tasks.push(newTask);
  }
  
  document.getElementById('taskModal').classList.remove('active');
  showProjectDetails(projectId);
}

function showTaskDetail(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;
  
  const project = projects.find(p => p.id === task.projectId);
  const canEdit = currentUser.accessLevel === 'full' || task.assignedTo === currentUser.id;
  
  const modalContent = `
    <div class="project-detail">
      <p><strong>Project:</strong> ${project ? project.name : 'Unknown'}</p>
      <p><strong>Description:</strong> ${task.description || 'No description'}</p>
      <p><strong>Assigned To:</strong> ${task.assignedToName}</p>
      <p><strong>Status:</strong> <span class="task-status-badge status-${task.status.toLowerCase().replace(' ', '-')}">${task.status}</span></p>
      <p><strong>Priority:</strong> <span class="task-priority priority-${task.priority.toLowerCase()}">${task.priority}</span></p>
      <p><strong>Progress:</strong> ${task.progress}%</p>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${task.progress}%"></div>
      </div>
      <p><strong>Start Date:</strong> ${formatDate(task.startDate)}</p>
      <p><strong>Deadline:</strong> ${formatDate(task.deadline)}</p>
      
      ${canEdit ? `<button class="btn btn-primary btn-sm mt-1" onclick="editTask(${taskId})">Edit Task</button>` : ''}
      
      <h3 class="mt-2">Comments</h3>
      <div class="task-comments">
        ${task.comments.length > 0 ? task.comments.map(comment => `
          <div class="task-comment">
            <div>
              <span class="comment-author">${comment.userName}</span>
              <span class="comment-time"> - ${formatDate(comment.timestamp)}</span>
            </div>
            <p class="comment-text">${comment.text}</p>
          </div>
        `).join('') : '<p>No comments yet.</p>'}
      </div>
    </div>
  `;
  
  document.getElementById('taskDetailName').textContent = task.name;
  document.getElementById('taskDetailContent').innerHTML = modalContent;
  document.getElementById('taskDetailModal').classList.add('active');
}

function editTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;
  
  document.getElementById('taskDetailModal').classList.remove('active');
  
  document.getElementById('taskModalTitle').textContent = 'Edit Task';
  document.getElementById('taskId').value = task.id;
  document.getElementById('taskProjectId').value = task.projectId;
  document.getElementById('taskName').value = task.name;
  document.getElementById('taskDescription').value = task.description;
  document.getElementById('taskPriority').value = task.priority;
  document.getElementById('taskStatus').value = task.status;
  document.getElementById('taskDeadline').value = task.deadline;
  document.getElementById('taskProgress').value = task.progress;
  document.getElementById('taskProgressValue').textContent = task.progress + '%';
  
  // Populate assigned to dropdown
  const project = projects.find(p => p.id === task.projectId);
  const teamMembers = users.filter(u => project.assignedTeamMembers.includes(u.id));
  document.getElementById('taskAssignedTo').innerHTML = teamMembers.map(m => 
    `<option value="${m.id}" ${m.id === task.assignedTo ? 'selected' : ''}>${m.name}</option>`
  ).join('');
  
  document.getElementById('taskModal').classList.add('active');
}

function quickUpdateTaskStatus(taskId, newStatus) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.status = newStatus;
    task.lastUpdated = new Date().toISOString();
    if (newStatus === 'Completed') {
      task.progress = 100;
    }
    loadMyTasks();
  }
}