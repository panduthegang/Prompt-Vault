import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
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

// Re-export types for backward compatibility
export type { PromptItem, CommunityItem };

export default function Dashboard() {
  const navigate = useNavigate();
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

  return (
    <div className="w-full min-h-screen bg-vault-cream text-vault-dark flex flex-col lg:flex-row p-3 sm:p-4 md:p-6 gap-4 sm:gap-6 selection:bg-vault-green selection:text-vault-dark relative items-start">
      {/* Toast Notification Floating Pill */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-vault-dark text-vault-cream border-2 border-vault-green px-5 py-3 rounded-full shadow-lg flex items-center gap-3 animate-bounce">
          <Sparkles className="w-4 h-4 text-vault-green fill-vault-green" />
          <span className="font-sans text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Dark Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        promptCount={prompts.length}
        onOpenAddModal={() => navigate('/vault?add=true')}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col space-y-6 min-w-0 w-full pb-24 lg:pb-0">
        {/* 1. Header */}
        <DashboardHeader
          userName="Harsh"
          userAvatar={userAvatar}
          onNotificationClick={() => showToast('No unread notifications')}
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
    </div>
  );
}
