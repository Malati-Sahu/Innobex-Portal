import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ context }) {
  const location = useLocation();
  const userName = context?.currentUser?.name || 'User Name';
  const userRole = context?.currentUser?.role || 'Role';

  const menuItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/projects', icon: '📋', label: 'Projects' },
    { path: '/mytasks', icon: '✅', label: 'My Tasks' },
    { path: '/mywork', icon: '📝', label: 'My Work' },
    { path: '/team', icon: '👥', label: 'Team' },
    { path: '/clients', icon: '🏢', label: 'Clients' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-logo">
        <h2>InnohexIT</h2>
      </div>
      <ul className="sidebar-menu" id="sidebarMenu">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`sidebar-menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <Link to={item.path} className="sidebar-link">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="sidebar-user">
        <div className="sidebar-user-info">
          <strong id="sidebarUserName">User Name</strong>
          <div id="sidebarUserRole" style={{fontSize: '12px', opacity: '0.8'}}>Role</div>
        </div>
        <button className="logout-btn" id="sidebarLogoutBtn" onClick={context?.logout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;