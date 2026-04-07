import React, { useState } from 'react';

function Login({ context }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (context.login(email, password)) {
      // Login successful, App component will handle the redirect
    } else {
      setError('Access Denied. Contact Admin.');
    }
  };

  return (
    <div id="loginPage" className="page active">
      <div className="login-container">
        <div className="login-panel left-panel">
          <div className="benefits-section">
            <h2>Welcome to InnohexIT</h2>
            <p className="tagline">Where Projects Meet Excellence</p>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">✓</span><span className="benefit-text">Real-time Progress Tracking</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span><span className="benefit-text">Team Collaboration</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span><span className="benefit-text">Client Transparency</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span><span className="benefit-text">Seamless Workflow</span>
              </div>
            </div>
          </div>
        </div>
        <div className="login-panel right-panel">
          <div className="login-form-container">
            <div className="login-logo">
              <span className="logo-part purple">INNO</span><span className="logo-part orange">HEX</span><span className="logo-part purple">IT</span>
            </div>
            <h1 className="login-title">Welcome Back!</h1>
            <p className="login-subtitle">Let's begin your day. Tell us who you are and let's create something amazing together.</p>
            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Your Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="error-message" id="loginEmailError"></span>
              </div>
              <div className="form-group">
                <label htmlFor="password">Your Secret Key</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="error-message" id="loginPasswordError"></span>
              </div>
              <div className="form-group remember">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <button type="submit" className="btn btn-primary login-button">
                <span className="button-icon">→</span>
                <span>Let's Go!</span>
              </button>
              <p className="form-message">Ready to manage greatness?</p>
              <div id="loginError" className="error-message">{error}</div>
            </form>
            <div className="login-footer">
              <a href="#" className="forgot-password">Lost your key? Recover it here</a>
              <div className="demo-credentials" style={{marginTop: '24px'}}>
                <p><strong>Demo Credentials:</strong></p>
                <p>Admin: admin@innohexIT.com / password123</p>
                <p>View: raj@innohexIT.com / password123</p>
                <p>Client: john@clientcompany.com / password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;