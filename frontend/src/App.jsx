import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './HomePage';
import CodeReview from './CodeReview';
import Navbar from './Navbar';
import AuthModal from './AuthModal';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLoginSuccess = (email) => {
    setUser(email);
    localStorage.setItem('user', email);
    toast.success('Login Successful 🎉');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Logged out');
  };

  return (
    <Router>
      <Navbar
        user={user}
        onLoginClick={() => setAuthModalOpen(true)}
        onLogoutClick={handleLogout}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/review" element={<CodeReview />} />
      </Routes>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
      />
    </Router>
  );
}

export default App;
