import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../../assets/background-login.png';
import emireqLogo from '../../assets/emireq-logo.png';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
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
    
    // Mock login - store token and navigate
    localStorage.setItem('authToken', 'mock-token-12345');
    navigate('/');
  };

  return (
    <div className="login-page">
      {/* Left Side - Background */}
      <div className="login-left" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className="login-left-header">
          <img src={emireqLogo} alt="Emireq" className="login-logo" />
          <div className="login-language">
            <span>English(UK)</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="login-left-content">
          <div className="login-trust-badge">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_68_12726)">
                <path d="M8.28086 12.9167C8.20647 12.6283 8.05615 12.3651 7.84555 12.1545C7.63494 11.9439 7.37176 11.7935 7.08336 11.7192L1.97086 10.4008C1.88364 10.3761 1.80687 10.3235 1.75221 10.2512C1.69754 10.1788 1.66797 10.0907 1.66797 9.99998C1.66797 9.90931 1.69754 9.82112 1.75221 9.74878C1.80687 9.67644 1.88364 9.62391 1.97086 9.59915L7.08336 8.27998C7.37166 8.20566 7.63477 8.05546 7.84537 7.84502C8.05596 7.63457 8.20634 7.37156 8.28086 7.08332L9.5992 1.97082C9.6237 1.88325 9.67618 1.8061 9.74863 1.75115C9.82108 1.69619 9.90951 1.66644 10.0004 1.66644C10.0914 1.66644 10.1798 1.69619 10.2523 1.75115C10.3247 1.8061 10.3772 1.88325 10.4017 1.97082L11.7192 7.08332C11.7936 7.37171 11.9439 7.6349 12.1545 7.8455C12.3651 8.0561 12.6283 8.20642 12.9167 8.28082L18.0292 9.59832C18.1171 9.62257 18.1946 9.67499 18.2499 9.74755C18.3052 9.8201 18.3351 9.90878 18.3351 9.99998C18.3351 10.0912 18.3052 10.1799 18.2499 10.2524C18.1946 10.325 18.1171 10.3774 18.0292 10.4017L12.9167 11.7192C12.6283 11.7935 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4009 18.0292C10.3764 18.1167 10.3239 18.1939 10.2514 18.2488C10.179 18.3038 10.0905 18.3335 9.99961 18.3335C9.90868 18.3335 9.82025 18.3038 9.7478 18.2488C9.67535 18.1939 9.62287 18.1167 9.59836 18.0292L8.28086 12.9167Z" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.666 2.5V5.83333" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.3333 4.16669H15" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.33398 14.1667V15.8334" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.16667 15H2.5" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_68_12726">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span>Trusted by 50,000+ users worldwide</span>
          </div>
          <h1 className="login-left-title">Get Access to Your Investor Profile and Unlock Exclusive Deals.</h1>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-right">
        <div className="login-form-container">
          <div className="login-form-header">
            <img src={emireqLogo} alt="Emireq" className="login-form-logo" />
          </div>

          <div className="login-form-content">
            <h2 className="login-form-title">Welcome back</h2>
            <p className="login-form-subtitle">
              Access your Investor dashboard and funding journey
            </p>

            <form onSubmit={handleLogin} className="login-form">
              <div className="login-form-group">
                <label htmlFor="email" className="login-form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: '' });
                  }}
                  className={`login-form-input ${errors.email ? 'login-form-input--error' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span className="login-form-error">{errors.email}</span>
                )}
              </div>

              <div className="login-form-group">
                <label htmlFor="password" className="login-form-label">
                  Password
                </label>
                <div className="login-password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({ ...errors, password: '' });
                    }}
                    className={`login-form-input ${errors.password ? 'login-form-input--error' : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 10C2.5 10 5 4.16669 10 4.16669C15 4.16669 17.5 10 17.5 10C17.5 10 15 15.8334 10 15.8334C5 15.8334 2.5 10 2.5 10Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.95 14.95C13.5255 16.0358 11.7908 16.6374 10 16.6667C5 16.6667 2.5 10.8334 2.5 10.8334C3.35545 9.06946 4.52357 7.48213 5.93333 6.14999L14.95 14.95Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.25 3.53332C8.82239 3.39907 9.41016 3.33195 10 3.33332C15 3.33332 17.5 9.16666 17.5 9.16666C17.0618 10.0582 16.5269 10.8986 15.9067 11.6717L8.25 3.53332Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.5 2.5L17.5 17.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="login-form-error">{errors.password}</span>
                )}
              </div>

              <button type="submit" className="login-submit-btn">
                Log In
              </button>
            </form>

            <p className="login-signup-text">
              Don't have an account?{' '}
              <a href="/signup" className="login-signup-link">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
