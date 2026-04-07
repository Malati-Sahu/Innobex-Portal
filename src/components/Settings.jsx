import React, { useState } from 'react';

function Settings({ context }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    // In a real app, you'd verify the old password and update it
    setSuccessMessage('Password changed successfully!');
    setPasswordError('');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div id="settingsPage" className="content-page active">
      <div className="container">
        <h1 className="page-title">Settings</h1>
        <div className="card settings-section">
          <h3>Preferences</h3>
          <div className="theme-toggle-container">
            <span>Color Theme:</span>
            <div
              id="themeToggle"
              className={`toggle-switch ${context.theme === 'dark' ? 'active' : ''}`}
              tabIndex="0"
              role="button"
              aria-label="Toggle dark/light mode"
              onClick={context.toggleTheme}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  context.toggleTheme();
                }
              }}
            >
              <div className="toggle-slider"></div>
            </div>
            <span id="themeStatus">{context.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
        </div>
        <div className="card settings-section">
          <h3>Change Password</h3>
          <form id="changePasswordForm" className="change-password-form" onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label htmlFor="oldPassword">Current Password</label>
              <input
                type="password"
                id="oldPassword"
                className="form-control"
                placeholder="Enter current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <span className="error-message" id="oldPasswordError"></span>
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="error-message" id="passwordMatchError">{passwordError}</span>
            </div>
            <button type="submit" className="btn btn-primary login-button">Change Password</button>
            {successMessage && (
              <div id="passwordChangeMsg" className="success-message">{successMessage}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;