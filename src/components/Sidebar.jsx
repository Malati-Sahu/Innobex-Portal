import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

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
            <Link to={item.path}>
              <span>{item.icon}</span> {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="sidebar-user">
        <div className="sidebar-user-info">
          <strong id="sidebarUserName">User Name</strong>
          <div id="sidebarUserRole" style={{fontSize: '12px', opacity: '0.8'}}>Role</div>
        </div>
        <button className="sidebar-logout" id="sidebarLogoutBtn">Logout</button>
      </div>
    </aside>
  );
}

export default Sidebar;