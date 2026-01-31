import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import UploadCSV from './Components/UploadCSV';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  // Check for existing authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem('immunologyAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    
    const demo = localStorage.getItem('demoMode');
    if (demo === 'true') {
      setDemoMode(true);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (email, password) => {
    // In a real app, this would be an API call
    console.log('Login attempt with:', email);
    setIsAuthenticated(true);
    localStorage.setItem('immunologyAuth', 'true');
  };

  const handleSignup = (userData) => {
    // In a real app, this would be an API call
    console.log('Signup attempt with:', userData);
    setIsAuthenticated(true);
    localStorage.setItem('immunologyAuth', 'true');
  };

  const handleGoogleAuth = () => {
    console.log('Google authentication initiated');
    setIsAuthenticated(true);
    localStorage.setItem('immunologyAuth', 'true');
  };

  const handleDemoMode = () => {
    setDemoMode(true);
    setIsAuthenticated(true);
    localStorage.setItem('demoMode', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setDemoMode(false);
    localStorage.removeItem('immunologyAuth');
    localStorage.removeItem('demoMode');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          demoMode={demoMode}
          onLogout={handleLogout}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login 
                    onLogin={handleLogin}
                    onGoogleAuth={handleGoogleAuth}
                    onDemoMode={handleDemoMode}
                  />
                )
              } 
            />
            <Route 
              path="/signup" 
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Signup 
                    onSignup={handleSignup}
                    onGoogleAuth={handleGoogleAuth}
                    onDemoMode={handleDemoMode}
                  />
                )
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? (
                  <Dashboard demoMode={demoMode} />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/upload" 
              element={
                isAuthenticated ? (
                  <UploadCSV />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;