import { User, Shield } from 'lucide-react';

export interface SettingsHeaderProps {
  username: string;
  activeTab: 'profile' | 'security';
  onTabChange: (tab: 'profile' | 'security') => void;
}

export default function SettingsHeader({
  username,
  activeTab,
  onTabChange,
}: SettingsHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-vault-dark/15">
        <div className="space-y-1">
          <h1 className="font-serif italic text-3xl sm:text-4xl text-vault-dark font-normal tracking-tight">
            Settings
          </h1>
          <p className="font-sans text-xs sm:text-sm text-vault-dark/70 font-medium">
            Manage your personal user account and security credentials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-vault-yellow border-2 border-vault-dark px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-vault-green animate-pulse" />
            <span className="font-mono text-xs font-bold text-vault-dark">@{username}</span>
          </div>
        </div>
      </header>

      {/* 2 Clean Tabs: Profile and Security */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onTabChange('profile')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 ${
            activeTab === 'profile'
              ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
              : 'bg-vault-cream text-vault-dark border-vault-dark/30 hover:border-vault-dark hover:bg-vault-yellow/40'
          }`}
        >
          <User className={`w-4 h-4 ${activeTab === 'profile' ? 'text-vault-green' : 'text-vault-dark/70'}`} />
          <span>Profile</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('security')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 ${
            activeTab === 'security'
              ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
              : 'bg-vault-cream text-vault-dark border-vault-dark/30 hover:border-vault-dark hover:bg-vault-yellow/40'
          }`}
        >
          <Shield className={`w-4 h-4 ${activeTab === 'security' ? 'text-vault-green' : 'text-vault-dark/70'}`} />
          <span>Security &amp; Password</span>
        </button>
      </div>
    </div>
  );
}
