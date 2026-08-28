import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'signin' | 'signup'>('landing');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#signup') {
        setCurrentPage('signup');
      } else if (hash === '#signin' || hash === '#get-started' || hash === '#auth') {
        setCurrentPage('signin');
      } else {
        setCurrentPage('landing');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'signin') {
    return (
      <Signin
        onBackToHome={() => {
          window.location.hash = '';
          setCurrentPage('landing');
        }}
        onSwitchToSignup={() => {
          window.location.hash = '#signup';
          setCurrentPage('signup');
        }}
      />
    );
  }

  if (currentPage === 'signup') {
    return (
      <Signup
        onBackToHome={() => {
          window.location.hash = '';
          setCurrentPage('landing');
        }}
        onSwitchToSignin={() => {
          window.location.hash = '#signin';
          setCurrentPage('signin');
        }}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-vault-cream flex flex-col overflow-x-hidden selection:bg-vault-green selection:text-vault-dark">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <LandingPage />
      </main>
    </div>
  );
}