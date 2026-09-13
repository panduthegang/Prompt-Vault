import { useNavigate } from 'react-router-dom';

export default function AdminDashboardHeader() {
  const navigate = useNavigate();

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
        {/* Account Settings Avatar */}
        <div
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="Account Settings"
        >
          <img
            src="/avatars/avatar-1.svg"
            alt="Admin Avatar"
            className="w-10 h-10 rounded-full border-2 border-vault-dark object-cover group-hover:ring-2 group-hover:ring-vault-green group-hover:scale-105 transition-all shadow-xs bg-vault-cream"
          />
        </div>
      </div>
    </header>
  );
}
