import { useMemo, useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomBar from './BottomBar';
import { getStoredVaultItems } from './Vault-Page/vaultData';

export default function WorkspaceLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [promptCount, setPromptCount] = useState<number>(() => {
    try {
      return getStoredVaultItems().length;
    } catch {
      return 6;
    }
  });

  // Keep prompt count synchronized across vault operations and routes
  useEffect(() => {
    const updateCount = () => {
      try {
        setPromptCount(getStoredVaultItems().length);
      } catch {}
    };

    window.addEventListener('storage', updateCount);
    // Refresh count on route change
    updateCount();
    return () => window.removeEventListener('storage', updateCount);
  }, [location.pathname]);

  // Automatically derive active tab from URL path
  const activeTab = useMemo(() => {
    if (location.pathname.startsWith('/vault')) return 'vault';
    if (location.pathname.startsWith('/community')) return 'community';
    if (location.pathname.startsWith('/settings')) return 'settings';
    if (location.pathname.startsWith('/admin')) return 'admin';
    return 'dashboard';
  }, [location.pathname]);

  const handleTabChange = (tab: string) => {
    if (tab === 'dashboard') navigate('/dashboard');
    else if (tab === 'vault') navigate('/vault');
    else if (tab === 'community') navigate('/community');
    else if (tab === 'settings') navigate('/settings');
    else if (tab === 'admin') navigate('/admin');
  };

  return (
    <div className="w-full min-h-screen bg-vault-cream text-vault-dark flex flex-col lg:flex-row p-3 sm:p-4 md:p-6 gap-4 sm:gap-6 selection:bg-vault-green selection:text-vault-dark relative items-start">
      {/* Desktop Sticky Sidebar (stays persistently mounted without re-rendering) */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        promptCount={promptCount}
        onOpenAddModal={() => navigate('/vault?add=true')}
      />

      {/* Mobile Floating Bottom Dock & Draggable Bottom Sheet */}
      <BottomBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        promptCount={promptCount}
        onOpenAddModal={() => navigate('/vault?add=true')}
      />

      {/* Dynamic Page Workspace Content */}
      <Outlet />
    </div>
  );
}
