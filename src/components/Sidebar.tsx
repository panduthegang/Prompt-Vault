import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Bookmark,
  Folder,
  FileCode,
  Users,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  MoreHorizontal,
  X,
} from 'lucide-react';

export interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  promptCount: number;
  onOpenAddModal: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  activeTab,
  onTabChange,
  promptCount,
  onOpenAddModal,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'prompts', label: 'Saved Prompts', icon: Bookmark, count: promptCount },
    { id: 'folders', label: 'Collections', icon: Folder, count: 12 },
    { id: 'skills', label: 'Skill.md Rules', icon: FileCode, count: 48 },
    { id: 'community', label: 'Community', icon: Users, count: 4 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // First 3 items for mobile quick bottom bar
  const mobileQuickItems = navItems.slice(0, 3);

  const handleSelectTab = (tabId: string) => {
    onTabChange(tabId);
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      {/* ========================================== */}
      {/* 1. DESKTOP SIDEBAR (Visible only on lg+)  */}
      {/* ========================================== */}
      <aside
        className={`hidden lg:flex bg-vault-dark text-vault-cream rounded-[28px] p-4 sm:p-5 flex-col justify-between shrink-0 border-2 border-vault-dark shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:sticky lg:top-6 lg:h-[calc(100vh-48px)] ${isCollapsed ? 'w-[84px]' : 'w-[280px] xl:w-[300px]'
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
            {onToggleCollapse && (
              <div className="relative group/toggle flex items-center justify-center">
                <button
                  type="button"
                  onClick={onToggleCollapse}
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
            )}
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
                    onClick={() => onTabChange(nav.id)}
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
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-x-0 transition-all duration-200 z-50 flex items-center">
                      <div className="bg-vault-cream text-vault-dark border-2 border-vault-dark px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 whitespace-nowrap">
                        <span className="font-sans text-xs font-bold tracking-tight">
                          {nav.label}
                        </span>
                        {nav.count !== undefined && (
                          <span className="text-[10px] font-bold bg-vault-yellow text-vault-dark border border-vault-dark px-1.5 py-0.2 rounded-full">
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

        {/* Bottom User Profile with Tooltip */}
        <div
          className={`pt-5 border-t border-vault-cream/15 flex items-center ${isCollapsed ? 'justify-center relative group/user' : 'gap-3'
            }`}
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-vault-green object-cover shrink-0 cursor-pointer"
          />
          {!isCollapsed ? (
            <div>
              <span className="font-sans text-xs font-bold text-vault-cream block leading-snug">
                Harsh Rathod
              </span>
              <span className="font-sans text-[11px] text-vault-cream/60 block">
                harsh@vault.ai
              </span>
            </div>
          ) : (
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-1 group-hover/user:opacity-100 group-hover/user:translate-x-0 transition-all duration-200 z-50 whitespace-nowrap">
              <div className="bg-vault-cream text-vault-dark border-2 border-vault-dark px-3 py-1.5 rounded-xl shadow-lg font-sans text-xs font-bold">
                Harsh Rathod <span className="text-[10px] font-normal text-vault-dark/60 block">harsh@vault.ai</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. MOBILE FLOATING BOTTOM BAR (Floating dock on < lg)      */}
      {/* ========================================================= */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-40 max-w-md mx-auto bg-vault-dark border-2 border-vault-dark rounded-2xl p-1.5 shadow-2xl flex items-center justify-around">
        {mobileQuickItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-xl transition-all cursor-pointer ${isActive
                  ? 'bg-vault-yellow text-vault-dark font-bold shadow-xs'
                  : 'text-vault-cream/75 hover:text-vault-cream'
                }`}
            >
              <Icon className="w-4.5 h-4.5 stroke-[2.2]" />
              <span className="font-sans text-[10px] font-semibold tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* 4th "More" Trigger Button for Draggable Bottom Sheet */}
        <button
          type="button"
          onClick={() => setIsBottomSheetOpen(true)}
          className={`flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-xl transition-all cursor-pointer ${isBottomSheetOpen || ['skills', 'community', 'settings'].includes(activeTab)
              ? 'bg-vault-yellow/20 text-vault-yellow font-bold'
              : 'text-vault-cream/75 hover:text-vault-cream'
            }`}
        >
          <MoreHorizontal className="w-4.5 h-4.5 stroke-[2.2]" />
          <span className="font-sans text-[10px] font-semibold tracking-tight">
            More
          </span>
        </button>
      </div>

      {/* ====================================================================== */}
      {/* 3. INSTAGRAM / YOUTUBE STYLE DRAGGABLE BOTTOM SHEET (Framer Motion)     */}
      {/* ====================================================================== */}
      <AnimatePresence>
        {isBottomSheetOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsBottomSheetOpen(false)}
              className="fixed inset-0 bg-vault-dark/60 backdrop-blur-xs"
            />

            {/* Draggable Bottom Sheet Modal */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.3 }}
              onDragEnd={(_e, info) => {
                // Drag down threshold like mobile native sheets
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setIsBottomSheetOpen(false);
                }
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative z-10 w-full max-w-lg mx-auto bg-vault-cream border-t-2 border-vault-dark rounded-t-[32px] p-4 sm:p-5 pb-[max(2rem,env(safe-area-inset-bottom))] shadow-2xl space-y-3.5 max-h-[85dvh] overflow-y-auto overscroll-contain"
            >
              {/* Draggable Grab Handle Indicator (Pill) */}
              <div className="w-12 h-1.5 bg-vault-dark/25 hover:bg-vault-dark/40 rounded-full mx-auto cursor-grab active:cursor-grabbing" />

              {/* Sheet Header */}
              <div className="flex items-center justify-between pt-0.5 pb-2 border-b border-vault-dark/10">
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
                  className="w-8 h-8 rounded-full bg-vault-dark/5 hover:bg-vault-dark/10 flex items-center justify-center text-vault-dark cursor-pointer"
                  aria-label="Close bottom sheet"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* All Navigation Options List — Responsive 2-Column Grid */}
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                {navItems.map((nav) => {
                  const Icon = nav.icon;
                  const isActive = activeTab === nav.id;
                  return (
                    <button
                      key={nav.id}
                      type="button"
                      onClick={() => handleSelectTab(nav.id)}
                      className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl font-sans text-xs sm:text-sm font-semibold transition-all cursor-pointer ${isActive
                          ? 'bg-vault-dark text-vault-cream border-2 border-vault-dark shadow-xs font-bold'
                          : 'bg-white/70 text-vault-dark border border-vault-dark/10 hover:bg-vault-yellow/40'
                        }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 ${isActive
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
                          className={`text-[10px] sm:text-xs px-2 py-0.2 rounded-full font-bold shrink-0 ${isActive
                              ? 'bg-vault-yellow text-vault-dark'
                              : 'bg-vault-dark/10 text-vault-dark/70'
                            }`}
                        >
                          {nav.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Sheet User Profile Card */}
              <div className="pt-2.5 border-t border-vault-dark/10 flex items-center justify-between bg-white/60 p-3 rounded-2xl border border-vault-dark/10">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full border-2 border-vault-dark object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="font-sans text-xs font-bold text-vault-dark block truncate">
                      Harsh Rathod
                    </span>
                    <span className="font-sans text-[10px] text-vault-dark/60 block truncate">
                      harsh@vault.ai • Pro Tier
                    </span>
                  </div>
                </div>

                <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-vault-dark/50 bg-vault-cream px-2 py-0.5 rounded-md border border-vault-dark/10 shrink-0">
                  v2.1
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
