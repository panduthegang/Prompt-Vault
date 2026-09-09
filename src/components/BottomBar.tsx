import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import {
  LayoutDashboard,
  Bookmark,
  Users,
  Settings,
  MoreHorizontal,
  LogOut,
  X,
  Plus,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export interface BottomBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  promptCount: number;
  onOpenAddModal?: () => void;
}

export default function BottomBar({
  activeTab,
  onTabChange,
  promptCount,
  onOpenAddModal,
}: BottomBarProps) {
  const navigate = useNavigate();
  const { signOut, user, profile } = useAuth();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const dragControls = useDragControls();

  // Background scroll locking when mobile bottom sheet is open
  useEffect(() => {
    if (isBottomSheetOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [isBottomSheetOpen]);

  const userAvatar = (() => {
    try {
      const saved = localStorage.getItem('prompt_vault_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.avatar && !parsed.avatar.includes('unsplash')) return parsed.avatar;
      }
    } catch {}
    return '/avatars/avatar-1.svg';
  })();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vault', label: 'Vault', icon: Bookmark, count: promptCount },
    { id: 'community', label: 'Community', icon: Users, count: 4 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const mobileQuickItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vault', label: 'Vault', icon: Bookmark },
    { id: 'community', label: 'Community', icon: Users },
  ];

  const handleSelectTab = (id: string) => {
    onTabChange(id);
    setIsBottomSheetOpen(false);
  };

  const handleLogout = async () => {
    setIsBottomSheetOpen(false);
    await signOut();
    navigate('/');
  };

  return (
    <>
      {/* ====================================================================== */}
      {/* 1. FLOATING MOBILE BOTTOM BAR DOCK (Only visible on < lg viewports)    */}
      {/* ====================================================================== */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 24, stiffness: 280 }}
        className="lg:hidden fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-40 max-w-md mx-auto bg-vault-dark border-2 border-vault-dark rounded-2xl p-1.5 shadow-2xl flex items-center justify-between gap-1"
      >
        {activeTab === 'vault' ? (
          /* VAULT DEDICATED BOTTOM BAR: Dashboard | Vault | More | + Add to Vault */
          <>
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => handleSelectTab('dashboard')}
              className="h-11 flex flex-col items-center justify-center gap-0.5 px-2.5 rounded-xl transition-all cursor-pointer text-vault-cream/75 hover:text-vault-cream shrink-0"
            >
              <LayoutDashboard className="w-4.5 h-4.5 stroke-[2.2]" />
              <span className="font-sans text-[10px] font-semibold tracking-tight">
                Dashboard
              </span>
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => handleSelectTab('vault')}
              className="h-11 flex flex-col items-center justify-center gap-0.5 px-2.5 rounded-xl transition-all cursor-pointer bg-vault-yellow text-vault-dark font-bold shadow-xs shrink-0"
            >
              <Bookmark className="w-4.5 h-4.5 stroke-[2.2]" />
              <span className="font-sans text-[10px] font-semibold tracking-tight">
                Vault
              </span>
            </motion.button>

            {/* 3rd "More" Trigger Button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsBottomSheetOpen(true)}
              className={`h-11 flex flex-col items-center justify-center gap-0.5 px-2.5 rounded-xl transition-all cursor-pointer shrink-0 ${
                isBottomSheetOpen || ['skills', 'community', 'settings'].includes(activeTab)
                  ? 'bg-vault-yellow/20 text-vault-yellow font-bold'
                  : 'text-vault-cream/75 hover:text-vault-cream'
              }`}
            >
              <MoreHorizontal className="w-4.5 h-4.5 stroke-[2.2]" />
              <span className="font-sans text-[10px] font-semibold tracking-tight">
                More
              </span>
            </motion.button>

            {/* Wide + Add to Vault Action Button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={() => onOpenAddModal?.()}
              className="h-11 flex-1 px-3.5 rounded-xl bg-vault-green text-vault-dark border-2 border-vault-dark font-sans text-xs font-bold shadow-xs hover:brightness-105 transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap min-w-0 ml-1"
            >
              <Plus className="w-4 h-4 stroke-[2.8]" />
              <span className="truncate">Add to Vault</span>
            </motion.button>
          </>
        ) : (
          /* STANDARD BOTTOM BAR: Dashboard | Vault | Community | More */
          <>
            {mobileQuickItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-vault-yellow text-vault-dark font-bold shadow-xs'
                      : 'text-vault-cream/75 hover:text-vault-cream'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5 stroke-[2.2]" />
                  <span className="font-sans text-[10px] font-semibold tracking-tight">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}

            {/* 4th "More" Trigger Button for Draggable Bottom Sheet */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsBottomSheetOpen(true)}
              className={`flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-xl transition-all cursor-pointer ${
                isBottomSheetOpen || ['skills', 'settings'].includes(activeTab)
                  ? 'bg-vault-yellow/20 text-vault-yellow font-bold'
                  : 'text-vault-cream/75 hover:text-vault-cream'
              }`}
            >
              <MoreHorizontal className="w-4.5 h-4.5 stroke-[2.2]" />
              <span className="font-sans text-[10px] font-semibold tracking-tight">
                More
              </span>
            </motion.button>
          </>
        )}
      </motion.div>

      {/* ====================================================================== */}
      {/* 2. DRAGGABLE BOTTOM SHEET WITH STICKY TOP/BOTTOM & PHYSICS LOGIC       */}
      {/* ====================================================================== */}
      <AnimatePresence>
        {isBottomSheetOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            {/* Neutral Backdrop with Fade Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsBottomSheetOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Draggable Bottom Sheet Card */}
            <motion.div
              drag="y"
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.3 }}
              dragMomentum={false}
              onDragEnd={(_e, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setIsBottomSheetOpen(false);
                }
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              className="relative z-10 w-full max-w-lg mx-auto bg-vault-cream border-t-2 border-vault-dark rounded-t-[32px] p-4 sm:p-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] shadow-2xl flex flex-col max-h-[85dvh]"
            >
              {/* Sticky Grab Handle Indicator (Pill Thumb) */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="w-full pt-1 pb-2 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none -mt-1 shrink-0"
              >
                <div className="w-12 h-1.5 bg-vault-dark/25 hover:bg-vault-dark/40 rounded-full transition-colors" />
              </div>

              {/* Sticky Top Header */}
              <div
                onPointerDown={(e) => {
                  if ((e.target as HTMLElement).closest('button')) return;
                  dragControls.start(e);
                }}
                className="shrink-0 flex items-center justify-between pt-0.5 pb-2.5 border-b-2 border-vault-dark/15 touch-none cursor-grab active:cursor-grabbing select-none"
              >
                <div>
                  <h3 className="font-serif italic text-xl sm:text-2xl text-vault-dark font-normal">
                    Workspace Navigation
                  </h3>
                  <p className="font-sans text-[11px] sm:text-xs text-vault-dark/60">
                    Switch views, rules, and repository settings.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBottomSheetOpen(false)}
                  className="w-8 h-8 rounded-full border border-vault-dark/20 flex items-center justify-center hover:bg-vault-dark/10 transition-colors cursor-pointer shrink-0"
                  aria-label="Close bottom sheet"
                >
                  <X className="w-4 h-4 text-vault-dark" />
                </button>
              </div>

              {/* Scrollable Middle: Navigation Options List */}
              <div
                className="flex-1 overflow-y-auto overscroll-contain py-3 space-y-2 pr-1 [scrollbar-width:thin]"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map((nav) => {
                    const Icon = nav.icon;
                    const isActive = activeTab === nav.id;
                    return (
                      <motion.button
                        key={nav.id}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelectTab(nav.id)}
                        className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl font-sans text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-vault-dark text-vault-cream border-2 border-vault-dark shadow-xs font-bold'
                            : 'bg-white/70 text-vault-dark border-2 border-vault-dark/15 hover:bg-vault-yellow/40 hover:border-vault-dark'
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 ${
                              isActive
                                ? 'bg-vault-yellow text-vault-dark'
                                : 'bg-vault-dark/5 text-vault-dark'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                          </div>
                          <span className="truncate">{nav.label}</span>
                        </div>

                        {nav.count !== undefined && (
                          <span
                            className={`text-[10px] sm:text-xs px-2 py-0.2 rounded-full font-bold shrink-0 ${
                              isActive
                                ? 'bg-vault-yellow text-vault-dark'
                                : 'bg-vault-dark/10 text-vault-dark/70'
                            }`}
                          >
                            {nav.count}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Admin Navigation Options for Mobile Sheet - strictly visible to admin role */}
                {profile?.role === 'admin' && (
                  <div className="pt-2 border-t border-vault-dark/15 space-y-1.5">
                    <div className="flex items-center justify-between px-1 text-[10px] font-mono uppercase tracking-widest text-vault-dark/50 font-bold">
                      <span>Admin Controls</span>
                      <span className="text-vault-dark bg-vault-yellow px-1.5 py-0.2 rounded font-extrabold text-[9px]">ROOT</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          navigate('/admin');
                          setIsBottomSheetOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-2xl font-sans text-xs font-semibold border-2 transition-all cursor-pointer ${
                          activeTab === 'admin'
                            ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs font-bold'
                            : 'bg-white/70 text-vault-dark border-vault-dark/15 hover:bg-vault-yellow/40 hover:border-vault-dark'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                            activeTab === 'admin' ? 'bg-vault-yellow text-vault-dark' : 'bg-vault-dark/5 text-vault-dark'
                          }`}>
                            <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                          <span className="truncate">Overview</span>
                        </div>
                      </motion.button>

                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          navigate('/admin/users');
                          setIsBottomSheetOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-2xl font-sans text-xs font-semibold border-2 transition-all cursor-pointer ${
                          activeTab === 'admin-users'
                            ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs font-bold'
                            : 'bg-white/70 text-vault-dark border-vault-dark/15 hover:bg-vault-yellow/40 hover:border-vault-dark'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                            activeTab === 'admin-users' ? 'bg-vault-yellow text-vault-dark' : 'bg-vault-dark/5 text-vault-dark'
                          }`}>
                            <UserCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                          <span className="truncate">User Directory</span>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky Bottom: User Profile Card & Logout */}
              <div className="shrink-0 pt-3 border-t-2 border-vault-dark/15">
                <div className="flex items-center justify-between bg-white/70 p-3 rounded-2xl border-2 border-vault-dark/15">
                  <div
                    onClick={() => {
                      navigate('/settings');
                      setIsBottomSheetOpen(false);
                    }}
                    className="flex items-center gap-2.5 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
                    title="Account Settings"
                  >
                    <img
                      src={userAvatar}
                      alt="User Avatar"
                      className="w-9 h-9 rounded-full border-2 border-vault-dark object-cover shrink-0 bg-vault-cream"
                    />
                    <div className="min-w-0">
                      <span className="font-sans text-xs font-bold text-vault-dark block truncate">
                        {profile?.display_name || user?.user_metadata?.display_name || (profile?.role === 'admin' ? 'Admin' : 'Vault User')}
                      </span>
                      <span className="font-sans text-[10px] text-vault-dark/60 block truncate">
                        {profile?.email || user?.email || 'user@vault.ai'}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-700 border-2 border-red-500/30 text-xs font-bold cursor-pointer transition-colors shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
