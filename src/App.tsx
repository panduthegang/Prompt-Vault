import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/ui/LoadingScreen';
import LandingPage from './pages/Static-Pages/LandingPage';
import NotFound from './pages/Static-Pages/NotFound';
import Privacy from './pages/Static-Pages/Privacy';
import Terms from './pages/Static-Pages/Terms';
import Prompts from './pages/Static-Pages/Prompts';
import Signin from './pages/Auth-Pages/Signin';
import Signup from './pages/Auth-Pages/Signup';
import WorkspaceLayout from './components/WorkspaceLayout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Vault from './pages/Vault';
import Community from './pages/Community';
import AdminDashboard from './pages/Admin-Pages/AdminDashboard';
import AdminUsers from './pages/Admin-Pages/AdminUsers';

function AppRoutes() {
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        {/* Public & Marketing Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/prompts" element={<Prompts />} />
        <Route path="/library" element={<Navigate to="/prompts" replace />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Persistent Workspace Layout (Sidebar + BottomBar) */}
        <Route element={<WorkspaceLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/saved" element={<Navigate to="/vault" replace />} />
          <Route path="/community" element={<Community />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

// Duration of the initial intro loading animation in milliseconds
const LOADING_SCREEN_DURATION_MS = 3500;

export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('prompt_vault_seen_intro');
    } catch {
      return false;
    }
  });

  return (
    <BrowserRouter>
      {isLoading && (
        <LoadingScreen
          duration={LOADING_SCREEN_DURATION_MS}
          onComplete={() => {
            try {
              sessionStorage.setItem('prompt_vault_seen_intro', 'true');
            } catch {}
            setIsLoading(false);
          }}
        />
      )}
      <AppRoutes />
    </BrowserRouter>
  );
}