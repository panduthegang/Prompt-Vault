import { Bell } from 'lucide-react';

export interface DashboardHeaderProps {
  userName?: string;
  userAvatar: string;
  onNotificationClick: () => void;
  onAvatarClick: () => void;
}

export default function DashboardHeader({
  userName = 'Harsh',
  userAvatar,
  onNotificationClick,
  onAvatarClick,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="font-serif italic text-3xl sm:text-4xl text-vault-dark font-normal tracking-tight">
          Welcome back, {userName}
        </h1>
        <p className="font-sans text-xs sm:text-sm text-vault-dark/70 font-medium pt-0.5">
          Organize, refine, and deploy your master AI prompts &amp; skill.md rules.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          type="button"
          onClick={onNotificationClick}
          className="relative w-10 h-10 rounded-full bg-vault-cream border-2 border-vault-dark/15 flex items-center justify-center text-vault-dark hover:bg-vault-yellow/40 transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-vault-green border border-vault-cream animate-pulse" />
        </button>

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
