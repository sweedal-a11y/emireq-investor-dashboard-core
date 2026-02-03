import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/profile/ProfilePage";
import Portfolio from "./pages/Portfolio";
import TokenPage from "./pages/token/TokenPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import DocumentsPage from "./pages/documents/DocumentsPage";
import DueDiligencePage from "./pages/diligence/DueDiligencePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ReviewPage from "./pages/auth/ReviewPage";
import LogoutModal from "./components/modals/LogoutModal";
import "./App.css";

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    // Clear auth state
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    // Navigate to login page
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  // Don't show sidebar on login page or signup page
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  const isRegisterPage = location.pathname === '/register';
  const isReviewPage = location.pathname === '/review';
  const isAuthPage = isLoginPage || isSignupPage || isRegisterPage || isReviewPage;

  return (
    <div className={`em-app ${isDarkMode ? 'em-app--dark' : ''}`}>
      {!isAuthPage && (
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onLogoutClick={handleLogoutClick}
        />
      )}

      <main className={`em-main ${sidebarCollapsed ? 'em-main--expanded' : ''} ${isAuthPage ? 'em-main--full' : ''}`}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/" element={<Dashboard isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/diligence" element={<DueDiligencePage isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/profile" element={<ProfilePage toggleTheme={toggleTheme} />} />
          <Route path="/portfolio" element={<Portfolio toggleTheme={toggleTheme} />} />
          <Route path="/documents" element={<DocumentsPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/dashboard/token" element={<TokenPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
        </Routes>
      </main>

      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
