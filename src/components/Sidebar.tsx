import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Bookmark,
  Users,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  promptCount: number;
  onOpenAddModal?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  activeTab,
  onTabChange,
  promptCount,
  onOpenAddModal: _onOpenAddModal,
  isCollapsed: controlledIsCollapsed,
  onToggleCollapse: controlledOnToggleCollapse,
}: SidebarProps) {
  const navigate = useNavigate();
  const { signOut, user, profile } = useAuth();
  const [internalIsCollapsed, setInternalIsCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('prompt_vault_sidebar_collapsed');
      if (saved !== null) {
        return saved === 'true';
      }
    } catch {}
    return true; // Default to collapsed per design specs
  });

  const isCollapsed = controlledIsCollapsed !== undefined ? controlledIsCollapsed : internalIsCollapsed;


  // Derive avatar from AuthContext — always reflects the latest profile save
  const userAvatar = profile?.avatar_url || '/avatars/avatar-1.svg';


  const handleToggleCollapse = () => {
    if (controlledOnToggleCollapse) {
      controlledOnToggleCollapse();
    } else {
      setInternalIsCollapsed((prev) => {
        const next = !prev;
        try {
          localStorage.setItem('prompt_vault_sidebar_collapsed', String(next));
        } catch {}
        return next;
      });
    }
  };

  const isAdmin = profile?.role === 'admin';

  const navItems = [
    // Admin items render first for admin users
    ...(isAdmin ? [
      { id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck },
      { id: 'admin-users', label: 'User Directory', icon: UserCheck },
    ] : []),
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vault', label: 'Vault', icon: Bookmark, count: promptCount },
    { id: 'community', label: 'Community', icon: Users, count: 4 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleSelectTab = (tabId: string) => {
    if (tabId === 'settings') {
      navigate('/settings');
    } else if (tabId === 'dashboard') {
      navigate('/dashboard');
    } else if (tabId === 'vault' || tabId === 'prompts') {
      navigate('/vault');
      onTabChange?.('vault');
    } else if (tabId === 'community') {
      navigate('/community');
    } else if (tabId === 'admin') {
      navigate('/admin');
    } else if (tabId === 'admin-users') {
      navigate('/admin/users');
    } else {
      if (window.location.pathname !== '/dashboard') {
        navigate('/dashboard');
      }
      onTabChange?.(tabId);
    }
  };

  return (
    <aside
        className={`hidden lg:flex bg-vault-dark text-vault-cream rounded-[28px] p-4 sm:p-5 flex-col justify-between shrink-0 border-2 border-vault-dark shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:sticky lg:top-6 lg:h-[calc(100vh-48px)] z-40 ${isCollapsed ? 'w-[84px]' : 'w-[280px] xl:w-[300px]'
          }`}
      >
        <div className="space-y-6">
          {/* Top Header Row: Wordmark + Collapse Button */}
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
              <div
                onClick={() => navigate('/')}
                className="cursor-pointer group flex flex-col"
              >
                <span className="font-serif italic text-2xl text-vault-cream font-normal tracking-tight block leading-none hover:text-vault-yellow transition-colors">
                  Prompt Vault
                </span>
                <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-vault-cream/50">
                  Workspace v2.1
                </span>
              </div>
            )}

            {/* Collapse Toggle Button with Tooltip */}
            <div className="relative group/toggle flex items-center justify-center">
              <button
                type="button"
                onClick={handleToggleCollapse}
                className="w-8 h-8 rounded-full bg-vault-cream/10 hover:bg-vault-cream/20 text-vault-cream border border-vault-cream/20 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              >
                  {isCollapsed ? (
                    <PanelLeftOpen className="w-4 h-4 text-vault-green" />
                  ) : (
                    <PanelLeftClose className="w-4 h-4 text-vault-cream/80" />
                  )}
                </button>

                {isCollapsed && (
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-1 group-hover/toggle:opacity-100 group-hover/toggle:translate-x-0 transition-all duration-200 z-50 whitespace-nowrap">
                    <div className="bg-vault-cream text-vault-dark border-2 border-vault-dark px-3 py-1 rounded-xl shadow-lg font-sans text-xs font-bold">
                      Expand Sidebar
                    </div>
                  </div>
                )}
              </div>
            
          </div>

          {/* Navigation Icon Rail with Hover Tooltips */}
          <nav className="space-y-1.5 pt-2" aria-label="Sidebar Navigation">
            {navItems.map((nav) => {
              const Icon = nav.icon;
              const isActive = activeTab === nav.id;
              return (
                <div key={nav.id} className="relative group/tooltip flex items-center justify-center w-full">
                  <button
                    type="button"
                    onClick={() => handleSelectTab(nav.id)}
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-2.5' : 'justify-between px-3.5 py-2.5'
                      } rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${isActive
                        ? 'bg-vault-yellow text-vault-dark border-2 border-vault-dark shadow-xs font-bold'
                        : 'text-vault-cream/80 hover:bg-vault-cream/10 hover:text-vault-cream'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isActive
                            ? 'bg-vault-dark text-vault-yellow'
                            : 'bg-transparent text-vault-cream/70'
                          }`}
                      >
                        <Icon className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      {!isCollapsed && <span>{nav.label}</span>}
                    </div>
                    {!isCollapsed && nav.count !== undefined && (
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full ${isActive
                            ? 'bg-vault-dark text-vault-yellow font-bold'
                            : 'bg-vault-cream/15 text-vault-cream/70'
                          }`}
                      >
                        {nav.count}
                      </span>
                    )}
                  </button>

                  {/* Floating Tooltip when Collapsed */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-x-0 transition-all duration-200 z-50 flex items-center whitespace-nowrap">
                      <div className="bg-vault-cream text-vault-dark border-2 border-vault-dark px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 whitespace-nowrap">
                        <span className="font-sans text-xs font-bold tracking-tight whitespace-nowrap">
                          {nav.label}
                        </span>
                        {nav.count !== undefined && (
                          <span className="text-[10px] font-bold bg-vault-yellow text-vault-dark border border-vault-dark px-1.5 py-0.2 rounded-full shrink-0">
                            {nav.count}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>


        {/* Bottom User Profile & Logout */}
        <div className="pt-3 border-t border-vault-cream/15">
          {!isCollapsed ? (
            <div className="flex items-center justify-between gap-2">
              <div
                onClick={() => navigate('/settings')}
                className="flex items-center gap-2.5 min-w-0 cursor-pointer hover:opacity-85 transition-opacity"
                title="Account Settings"
              >
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full border-2 border-vault-green object-cover shrink-0 cursor-pointer bg-vault-cream"
                />
                <div className="min-w-0">
                  <span className="font-sans text-xs font-bold text-vault-cream block leading-snug truncate">
                    {profile?.display_name || user?.user_metadata?.display_name || (profile?.role === 'admin' ? 'Admin' : 'Vault User')}
                  </span>
                  <span className="font-sans text-[11px] text-vault-cream/60 block truncate">
                    {profile?.email || user?.email || 'user@vault.ai'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-8 h-8 rounded-xl bg-vault-cream/10 hover:bg-red-500/20 text-vault-cream/70 hover:text-red-300 border border-vault-cream/15 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="Log Out"
                aria-label="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2.5">
              <div className="relative group/user flex items-center justify-center">
                <img
                  onClick={() => navigate('/settings')}
                  src={userAvatar}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full border-2 border-vault-green object-cover shrink-0 cursor-pointer hover:ring-2 hover:ring-vault-yellow transition-all bg-vault-cream"
                />
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-1 group-hover/user:opacity-100 group-hover/user:translate-x-0 transition-all duration-200 z-50 whitespace-nowrap">
                  <div className="bg-vault-cream text-vault-dark border-2 border-vault-dark px-3 py-1.5 rounded-xl shadow-lg font-sans text-xs font-bold">
                    {profile?.display_name || user?.user_metadata?.display_name || (profile?.role === 'admin' ? 'Admin' : 'Vault User')} <span className="text-[10px] font-normal text-vault-dark/60 block">{profile?.email || user?.email || 'user@vault.ai'}</span>
                  </div>
                </div>
              </div>

              {/* Dedicated Collapsed Log Out Icon Button */}
              <div className="relative group/logout flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-9 h-9 rounded-xl bg-vault-cream/10 hover:bg-red-500/20 text-vault-cream/70 hover:text-red-300 border border-vault-cream/15 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-1 group-hover/logout:opacity-100 group-hover/logout:translate-x-0 transition-all duration-200 z-50 whitespace-nowrap">
                  <div className="bg-vault-cream text-vault-dark border-2 border-vault-dark px-3 py-1 rounded-xl shadow-lg font-sans text-xs font-bold">
                    Log Out
                  </div>
                </div>
              </div>
            </div>
          )}
         </div> 
      </aside>
  );
}
