import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Heart,
  Bookmark,
  Sparkles,
  Zap,
  CheckCheck,
  ArrowUpRight,
  Trash2,
} from 'lucide-react';
import {
  NotificationItem,
  INITIAL_NOTIFICATIONS,
} from './dashboardData';

export interface DashboardHeaderProps {
  userName?: string;
  userAvatar: string;
  onNotificationClick?: () => void;
  onAvatarClick: () => void;
}

export default function DashboardHeader({
  userName = 'Harsh',
  userAvatar,
  onNotificationClick,
  onAvatarClick,
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Persistent notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('prompt_vault_notifications');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_NOTIFICATIONS;
  });

  const saveNotifications = (items: NotificationItem[]) => {
    setNotifications(items);
    try {
      localStorage.setItem('prompt_vault_notifications', JSON.stringify(items));
    } catch {}
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Close on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    onNotificationClick?.();
  };

  const handleMarkAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    saveNotifications(updated);
  };

  const handleItemClick = (item: NotificationItem) => {
    const updated = notifications.map((n) =>
      n.id === item.id ? { ...n, isRead: true } : n
    );
    saveNotifications(updated);
    setIsOpen(false);
    if (item.targetLink) {
      navigate(item.targetLink);
    }
  };

  const handleClearAll = () => {
    saveNotifications([]);
  };

  return (
    <header className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 relative">
      <div className="min-w-0 flex-1">
        <h1 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal tracking-tight">
          Welcome back, {userName}
        </h1>
        <p className="font-sans text-xs sm:text-sm text-vault-dark/70 font-medium pt-0.5">
          Organize, refine, and deploy your master AI prompts &amp; skill.md rules.
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0 pt-0.5 sm:pt-0">
        {/* Notification Bell Container with Floating Popover */}
        <div ref={containerRef} className="relative">
          <motion.button
            type="button"
            whileTap={{ scale: 0.93 }}
            onClick={handleToggle}
            className={`relative w-10 h-10 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
              isOpen
                ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-md'
                : 'bg-vault-cream border-vault-dark/20 text-vault-dark hover:border-vault-dark hover:bg-vault-yellow/40'
            }`}
            aria-label="Notifications"
            aria-expanded={isOpen}
          >
            <Bell className={`w-4 h-4 transition-transform ${isOpen ? 'scale-110' : ''}`} />

            {/* Unread badge count indicator */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-vault-yellow text-vault-dark border border-vault-dark font-mono text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-2xs">
                {unreadCount}
              </span>
            )}
          </motion.button>

          {/* Interactive Neo-Brutalist Notification Popover */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Mobile Backdrop to prevent off-screen taps */}
                <div
                  className="fixed inset-0 z-40 sm:hidden bg-black/25 backdrop-blur-xs"
                  onClick={() => setIsOpen(false)}
                />

                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                  className="fixed inset-x-3 sm:inset-x-auto top-24 sm:top-full sm:right-0 sm:mt-3 w-auto sm:w-96 max-w-sm sm:max-w-none mx-auto sm:mx-0 bg-vault-cream border-2 border-vault-dark rounded-[24px] shadow-2xl z-50 overflow-hidden flex flex-col"
                >
                {/* 1. Header */}
                <div className="p-3.5 sm:p-4 border-b-2 border-vault-dark/15 flex items-center justify-between bg-vault-cream">
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif italic text-xl text-vault-dark font-normal">
                      Notifications
                    </h2>
                    {unreadCount > 0 ? (
                      <span className="font-mono text-[10px] font-bold uppercase bg-vault-yellow border border-vault-dark px-2 py-0.5 rounded-full shadow-2xs">
                        {unreadCount} New
                      </span>
                    ) : (
                      <span className="font-sans text-[10px] font-semibold text-vault-dark/60 bg-vault-dark/5 px-2 py-0.5 rounded-full">
                        All Caught Up
                      </span>
                    )}
                  </div>

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllAsRead}
                      className="flex items-center gap-1 font-sans text-xs font-bold text-vault-dark/70 hover:text-vault-dark transition-colors cursor-pointer"
                      title="Mark all as read"
                    >
                      <CheckCheck className="w-3.5 h-3.5 text-vault-green" />
                      <span>Mark all read</span>
                    </button>
                  )}
                </div>

                {/* 2. Notifications List */}
                <div className="max-h-[340px] overflow-y-auto overscroll-contain divide-y divide-vault-dark/10 [scrollbar-width:thin]">
                  {notifications.length === 0 ? (
                    <div className="py-10 px-4 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-vault-yellow/40 border-2 border-vault-dark/30 flex items-center justify-center mx-auto text-vault-dark/60">
                        <Bell className="w-4 h-4" />
                      </div>
                      <p className="font-sans text-xs font-bold text-vault-dark">
                        No notifications yet
                      </p>
                      <p className="font-sans text-[11px] text-vault-dark/60 max-w-xs mx-auto">
                        Activity on your published prompts and vault clones will show up here.
                      </p>
                    </div>
                  ) : (
                    notifications.map((item) => {
                      const isUnread = !item.isRead;
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleItemClick(item)}
                          className={`p-3.5 sm:p-4 flex items-start gap-3 transition-colors cursor-pointer group ${
                            isUnread
                              ? 'bg-vault-yellow/15 hover:bg-vault-yellow/25'
                              : 'bg-vault-cream hover:bg-vault-dark/5'
                          }`}
                        >
                          {/* Type Icon Badge */}
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${
                              item.type === 'like'
                                ? 'bg-rose-100 text-rose-600 border-rose-300'
                                : item.type === 'clone'
                                ? 'bg-vault-green/20 text-vault-dark border-vault-dark/20'
                                : item.type === 'trend'
                                ? 'bg-vault-yellow text-vault-dark border-vault-dark/30'
                                : 'bg-vault-dark/5 text-vault-dark border-vault-dark/15'
                            }`}
                          >
                            {item.type === 'like' && <Heart className="w-4 h-4 fill-rose-500" />}
                            {item.type === 'clone' && <Bookmark className="w-4 h-4 fill-vault-dark" />}
                            {item.type === 'trend' && <Sparkles className="w-4 h-4 text-vault-dark" />}
                            {item.type === 'system' && <Zap className="w-4 h-4 text-vault-dark" />}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 space-y-0.5">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-sans text-xs font-bold text-vault-dark truncate">
                                {item.title}
                              </span>
                              <span className="font-sans text-[10px] text-vault-dark/50 whitespace-nowrap shrink-0">
                                {item.timestamp}
                              </span>
                            </div>

                            <p className="font-sans text-xs text-vault-dark/75 leading-relaxed line-clamp-2">
                              {item.description}
                            </p>
                          </div>

                          {/* Unread beacon dot */}
                          {isUnread && (
                            <span className="w-2 h-2 rounded-full bg-vault-green border border-vault-dark shrink-0 mt-1.5" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* 3. Footer Actions */}
                <div className="p-2.5 sm:p-3 border-t-2 border-vault-dark/15 bg-white/60 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/community');
                    }}
                    className="flex items-center gap-1 font-sans text-xs font-bold text-vault-dark hover:text-vault-dark/70 transition-colors cursor-pointer px-2 py-1"
                  >
                    <span>Community Activity</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {notifications.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="flex items-center gap-1 font-sans text-[11px] font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-red-50"
                      title="Clear all notifications"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear all</span>
                    </button>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        </div>

        {/* Account / User Avatar */}
        <div
          onClick={onAvatarClick}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="Account Settings"
        >
          <img
            src={userAvatar}
            alt={`${userName} Avatar`}
            className="w-10 h-10 rounded-full border-2 border-vault-dark object-cover group-hover:ring-2 group-hover:ring-vault-green group-hover:scale-105 transition-all shadow-xs bg-vault-cream"
          />
        </div>
      </div>
    </header>
  );
}
