import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { copyToClipboard } from '../utils/clipboard';
import { Sparkles } from 'lucide-react';
import {
  PromptItem,
  CommunityItem,
  INITIAL_PROMPTS,
  COMMUNITY_PROMPTS,
} from '../components/Dashboard-Page/dashboardData';
import DashboardHeader from '../components/Dashboard-Page/DashboardHeader';
import DashboardStats from '../components/Dashboard-Page/DashboardStats';
import DashboardPrompts from '../components/Dashboard-Page/DashboardPrompts';
import DashboardCommunityTable from '../components/Dashboard-Page/DashboardCommunityTable';
import { useAuth } from '../context/AuthContext';

// Re-export types for backward compatibility
export type { PromptItem, CommunityItem };

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [prompts, setPrompts] = useState<PromptItem[]>(INITIAL_PROMPTS);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyPrompt = async (id: string, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      showToast('Prompt copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleToggleStar = (id: string) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isStarred: !p.isStarred } : p))
    );
  };

  // Filtered prompts based on selected category tag
  const filteredPrompts = prompts.filter((p) => {
    return selectedTag === 'All' || p.category === selectedTag;
  });

  // Derive avatar from AuthContext — always reflects the latest profile save
  const userAvatar = profile?.avatar_url || '/avatars/avatar-1.svg';


  // Resolve display name: profile DB → auth metadata → fallback
  const displayName = profile?.display_name || user?.user_metadata?.display_name || 'Vault User';

  return (
    <>
      {/* Toast Notification Floating Pill */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-vault-dark text-vault-cream border-2 border-vault-green px-5 py-3 rounded-full shadow-lg flex items-center gap-3 animate-bounce">
          <Sparkles className="w-4 h-4 text-vault-green fill-vault-green" />
          <span className="font-sans text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col space-y-6 min-w-0 w-full pb-24 lg:pb-0">
        {/* 1. Header */}
        <DashboardHeader
          userName={displayName}
          userAvatar={userAvatar}
          onAvatarClick={() => navigate('/settings')}
        />

        {/* 2. Key Metrics Summary Cards */}
        <DashboardStats
          promptCount={prompts.length}
          publishedCount={24}
          collectionsCount={12}
          skillCount={48}
          onOpenPrompts={() => navigate('/vault?tab=prompts')}
          onOpenCollections={() => navigate('/vault?tab=links')}
          onOpenSkills={() => navigate('/vault?tab=skills')}
        />

        {/* 3. Saved Prompts Gallery with Interactive Filters */}
        <DashboardPrompts
          prompts={filteredPrompts}
          selectedCategory={selectedTag}
          onSelectCategory={setSelectedTag}
          copiedId={copiedId}
          onCopyPrompt={handleCopyPrompt}
          onToggleStar={handleToggleStar}
        />

        {/* 4. Community Published Snapshots Table */}
        <DashboardCommunityTable
          items={COMMUNITY_PROMPTS}
          onFilterClick={() => showToast('Filter options coming soon')}
        />
      </main>
    </>
  );
}
