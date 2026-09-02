import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/ui/LoadingScreen';
import LandingPage from './pages/static-pages/LandingPage';
import NotFound from './pages/static-pages/NotFound';
import Privacy from './pages/static-pages/Privacy';
import Terms from './pages/static-pages/Terms';
import Prompts from './pages/static-pages/Prompts';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function AppRoutes() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/prompts" element={<Prompts />} />
        <Route path="/library" element={<Navigate to="/prompts" replace />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

// Duration of the initial intro loading animation in milliseconds
const LOADING_SCREEN_DURATION_MS = 3500;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      {isLoading && (
        <LoadingScreen
          duration={LOADING_SCREEN_DURATION_MS}
          onComplete={() => setIsLoading(false)}
        />
      )}
      <AppRoutes />
    </BrowserRouter>
  );
}