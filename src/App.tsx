import React from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <div className="w-full min-h-screen bg-vault-cream flex flex-col overflow-x-hidden selection:bg-vault-green selection:text-vault-dark">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <LandingPage />
      </main>
    </div>
  );
}