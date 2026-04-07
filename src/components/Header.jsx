import React from 'react';

function Header() {
  return (
    <header className="header-bar">
      <div className="hamburger-menu" id="hamburgerMenu">☰</div>
      <h1 className="page-title-header" id="pageTitle">Dashboard</h1>
      <div className="header-user">
        <span id="headerUserName">User Name</span>
      </div>
    </header>
  );
}

export default Header;