import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface AdminMastersHeaderProps {
  totalCategories: number;
  onOpenCreate: () => void;
}

export default function AdminMastersHeader({
  totalCategories,
  onOpenCreate,
}: AdminMastersHeaderProps) {
  const navigate = useNavigate();
  const { profile, user } = useAuth();

  // Derive dynamic profile avatar & display name directly from Supabase DB via AuthContext
  const userAvatar = profile?.avatar_url || '/avatars/avatar-1.svg';
  const displayName = profile?.display_name || user?.user_metadata?.display_name || 'Admin';

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal tracking-tight">
            Category Masters
          </h1>
          <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-vault-yellow text-vault-dark border border-vault-dark shadow-2xs">
            {totalCategories} Categories
          </span>
        </div>
        <p className="font-sans text-xs sm:text-sm text-vault-dark/70 font-medium pt-1">
          Configure master categories for Prompts, Skill rules, and Website bookmarks.
        </p>
      </div>

      {/* Right Actions: + Add Category & Profile Avatar */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onOpenCreate}
          className="px-4 py-2.5 rounded-full font-sans text-xs sm:text-sm font-bold bg-vault-green hover:brightness-105 text-vault-dark border-2 border-vault-dark shadow-xs transition-all active:scale-[0.98] cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Category</span>
        </button>

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
