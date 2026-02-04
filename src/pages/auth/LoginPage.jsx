import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emireqLogo from '../../assets/emireq-logo.png';
import pinkBg from '../../assets/pink.png';
import pinkLogo from '../../assets/pink-logo.png';
import firstImage from '../../assets/1stimage.png';
import middleImage from '../../assets/middle.png';
import lastImage from '../../assets/last.png';
import './LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    setLoginError('');
    
    // Basic validation
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Simulate authentication
    // Check if credentials match demo account or registered user
    const storedUser = localStorage.getItem('registeredUser');
    let isValidLogin = false;
    
    // Check demo account
    if (username.toLowerCase() === 'demo' && password === 'password') {
      isValidLogin = true;
    }
    // Check registered user from localStorage
    else if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (username.toLowerCase() === userData.username?.toLowerCase() && password === userData.password) {
        isValidLogin = true;
      }
    }
    
    if (isValidLogin) {
      // Success - show modal
      localStorage.setItem('authToken', 'mock-token-12345');
      if (keepSignedIn) {
        localStorage.setItem('keepSignedIn', 'true');
      }
      setShowSuccessModal(true);
    } else {
      // Show error
      setLoginError('Invalid username or password. Please try again.');
    }
  };

  const handleContinueToDashboard = () => {
    setShowSuccessModal(false);
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      {/* Left Side - Form Section */}
      <div className="login-left">
        <div className="login-header">
          <img src={emireqLogo} alt="Emireq" className="login-logo" />
        </div>

        <div className="login-form-container">
          <h1 className="login-title">
            {loginError ? 'Sign in to your account' : 'Welcome'}
          </h1>
          <p className="login-subtitle">Log in to continue your funding journey.</p>

          {loginError && (
            <div className="login-error-banner">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6.66669V10M10 13.3334H10.0083M18.3333 10C18.3333 14.6024 14.6024 18.3334 10 18.3334C5.39763 18.3334 1.66667 14.6024 1.66667 10C1.66667 5.39765 5.39763 1.66669 10 1.66669C14.6024 1.66669 18.3333 5.39765 18.3333 10Z" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="login-form-group">
              <label htmlFor="username" className="login-label">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors({ ...errors, username: '' });
                  setLoginError('');
                }}
                className={`login-input ${errors.username ? 'login-input--error' : ''}`}
                placeholder="username"
              />
              {errors.username && (
                <span className="login-error">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5.33331V7.99998M8 10.6666H8.00667M14.6667 7.99998C14.6667 11.6819 11.6819 14.6666 8 14.6666C4.3181 14.6666 1.33333 11.6819 1.33333 7.99998C1.33333 4.31808 4.3181 1.33331 8 1.33331C11.6819 1.33331 14.6667 4.31808 14.6667 7.99998Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {errors.username}
                </span>
              )}
            </div>

            <div className="login-form-group">
              <label htmlFor="password" className="login-label">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: '' });
                  setLoginError('');
                }}
                className={`login-input ${errors.password ? 'login-input--error' : ''}`}
                placeholder="••••••••••••"
              />
              {errors.password && (
                <span className="login-error">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5.33331V7.99998M8 10.6666H8.00667M14.6667 7.99998C14.6667 11.6819 11.6819 14.6666 8 14.6666C4.3181 14.6666 1.33333 11.6819 1.33333 7.99998C1.33333 4.31808 4.3181 1.33331 8 1.33331C11.6819 1.33331 14.6667 4.31808 14.6667 7.99998Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {errors.password}
                </span>
              )}
            </div>

            <button type="submit" className="login-btn">
              Log In
            </button>

            <div className="login-footer-row">
              <label className="login-checkbox-label">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="login-checkbox"
                />
                <span className="login-checkbox-text">Keep me signed in</span>
              </label>
              <a href="/forgot-password" className="login-forgot-link">
                Forget Password
              </a>
            </div>
          </form>

          <div className="login-divider">
            <span>Or</span>
          </div>

          <p className="login-register-text">
            Don't have an account?{' '}
            <a href="/signup" className="login-register-link">
              Register
            </a>
          </p>

          <div className="login-social-text">
            Verify your business email with Google or Linkedin
          </div>

          <div className="login-social-buttons">
            <button type="button" className="login-social-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.13 18.63 6.71 16.7 5.84 14.1H2.18V16.94C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/>
                <path d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.91V7.07H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.93L5.84 14.09Z" fill="#FBBC05"/>
                <path d="M12 5.38C13.62 5.38 15.06 5.91 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 3.99 3.47 2.18 7.07L5.84 9.91C6.71 7.31 9.13 5.38 12 5.38Z" fill="#EA4335"/>
              </svg>
            </button>
            <button type="button" className="login-social-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166L20.447 20.452ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" fill="#0077B5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Visual Section */}
      <div className="login-right">
        <div className="login-right-container" style={{ backgroundImage: `url(${pinkBg})` }}>
          <div className="login-right-content">
            <img src={pinkLogo} alt="Emireq" className="login-right-logo" />
            
            <div className="login-cards-container">
              <div className="login-card login-card-1">
                <img src={firstImage} alt="Active investments" />
              </div>
              <div className="login-card login-card-2">
                <img src={middleImage} alt="Chart" />
              </div>
              <div className="login-card login-card-3">
                <img src={lastImage} alt="Total invested" />
              </div>
            </div>

            <div className="login-support-text">
              Experiencing issues?<br />
              Get assistance via <a href="mailto:support@emireq.com">support@emireq.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="login-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="login-modal-close"
              onClick={() => setShowSuccessModal(false)}
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="login-modal-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.3347 16.6671C37.0958 20.4026 36.5534 24.2862 34.7978 27.6701C33.0421 31.0541 30.1795 33.7339 26.6872 35.2627C23.1949 36.7914 19.2841 37.0768 15.6068 36.0711C11.9296 35.0654 8.70833 32.8295 6.48014 29.7362C4.25195 26.6429 3.15155 22.8792 3.36245 19.0728C3.57335 15.2664 5.08281 11.6473 7.6391 8.81909C10.1954 5.99089 13.644 4.12452 17.4098 3.53123C21.1756 2.93793 25.031 3.65357 28.333 5.5588" stroke="#00A63E" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 18.3337L20 23.3337L36.6667 6.66699" stroke="#00A63E" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h2 className="login-modal-title">Login Successful!</h2>
            <p className="login-modal-text">
              Welcome back! You're being redirected to your investor dashboard.
            </p>
            
            <button 
              className="login-modal-btn"
              onClick={handleContinueToDashboard}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
