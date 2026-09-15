import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function AdminDashboardHeader() {
  const navigate = useNavigate();
  const { profile, user } = useAuth();

  // Derive dynamic profile avatar & display name from AuthContext
  const userAvatar = profile?.avatar_url || '/avatars/avatar-1.svg';
  const displayName = profile?.display_name || user?.user_metadata?.display_name || 'Admin';

  return (
    <header className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 relative">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h1 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal tracking-tight">
            Admin Oversight
          </h1>
        </div>
        <p className="font-sans text-xs sm:text-sm text-vault-dark/70 font-medium pt-0.5">
          Platform velocity, community clipboard clones, and creator permissions.
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0 pt-0.5 sm:pt-0">
        {/* Profile Avatar */}
        <div
          onClick={() => navigate('/settings')}
          className="cursor-pointer group"
          title="Account Settings"
        >
          <img
            src={userAvatar}
            alt={`${displayName} Avatar`}
            className="w-10 h-10 rounded-full border-2 border-vault-dark object-cover group-hover:ring-2 group-hover:ring-vault-green group-hover:scale-105 transition-all shadow-xs bg-vault-cream"
          />
        </div>
      </div>
    </header>
  );
}
