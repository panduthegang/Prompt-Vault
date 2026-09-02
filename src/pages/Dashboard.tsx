import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { copyToClipboard } from '../utils/clipboard';
import {
  Sparkles,
  Bell,
  Copy,
  Check,
  Star,
  FileCode,
  Heart,
  MoreHorizontal,
  Filter,
  X,
  TrendingUp,
  Layers,
} from 'lucide-react';

// ==========================================
// TYPES & MOCK DATA
// ==========================================
export interface PromptItem {
  id: string;
  title: string;
  category: string;
  snippet: string;
  fullPrompt: string;
  timestamp: string;
  isStarred: boolean;
  isFeatured?: boolean;
}

export interface CommunityItem {
  id: string;
  title: string;
  category: string;
  status: 'Live' | 'Draft';
  publishedDate: string;
  views: number;
  likes: number;
}

const INITIAL_PROMPTS: PromptItem[] = [
  {
    id: '1',
    title: 'Autonomous Refactoring Skill Rule',
    category: 'Agent Skills',
    snippet:
      'Always inspect existing code structures and imports before writing new utilities. Preserve existing API signatures and run automated test suites.',
    fullPrompt:
      'Always inspect existing code structures and imports before writing new utilities. Preserve existing API signatures and run automated test suites.',
    timestamp: 'Saved 2h ago',
    isStarred: true,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'React 18 + Tailwind v4 Design Architect',
    category: 'Frontend',
    snippet:
      'You are a world-class UI designer and frontend engineer. Generate sleek, high-contrast layouts using custom HSL tokens, spring physics, and zero generic styling.',
    fullPrompt:
      'You are a world-class UI designer and frontend engineer. Generate sleek, high-contrast layouts using custom HSL tokens, spring physics, and zero generic styling.',
    timestamp: 'Saved 1d ago',
    isStarred: true,
  },
  {
    id: '3',
    title: 'PostgreSQL Query Performance Optimizer',
    category: 'Backend',
    snippet:
      'Analyze query execution plans (EXPLAIN ANALYZE). Suggest indexing strategies, CTE optimization, and N+1 query avoidance for high-throughput tables.',
    fullPrompt:
      'Analyze query execution plans (EXPLAIN ANALYZE). Suggest indexing strategies, CTE optimization, and N+1 query avoidance for high-throughput tables.',
    timestamp: 'Saved 3d ago',
    isStarred: false,
  },
  {
    id: '4',
    title: 'SEO & Meta Tag Generator for Next.js 14',
    category: 'Marketing',
    snippet:
      'Generate OpenGraph images, Twitter card metadata, dynamic JSON-LD structured schema, and keyword-optimized title tags for server components.',
    fullPrompt:
      'Generate OpenGraph images, Twitter card metadata, dynamic JSON-LD structured schema, and keyword-optimized title tags for server components.',
    timestamp: 'Saved 5d ago',
    isStarred: false,
  },
  {
    id: '5',
    title: 'Strict TypeScript Zod Schema Builder',
    category: 'Agent Skills',
    snippet:
      'Infer type definitions directly from validated runtime schema. Enforce non-nullable constraints and custom transformation logic for API payloads.',
    fullPrompt:
      'Infer type definitions directly from validated runtime schema. Enforce non-nullable constraints and custom transformation logic for API payloads.',
    timestamp: 'Saved 1w ago',
    isStarred: true,
  },
  {
    id: '6',
    title: 'Editorial Neo-Brutalist Color Palette System',
    category: 'Design Systems',
    snippet:
      'Define strict theme variables with cream `#F8F9E9`, forest green `#002D0F`, and vibrant green `#1ECC62`. Apply 2px solid dark borders across all containers.',
    fullPrompt:
      'Define strict theme variables with cream `#F8F9E9`, forest green `#002D0F`, and vibrant green `#1ECC62`. Apply 2px solid dark borders across all containers.',
    timestamp: 'Saved 2w ago',
    isStarred: false,
  },
];

const COMMUNITY_PROMPTS: CommunityItem[] = [
  {
    id: 'c1',
    title: 'Master Prompt — Signin ⇄ Signup Morphing Transition',
    category: 'Agent Skills',
    status: 'Live',
    publishedDate: 'Aug 24, 2026',
    views: 1420,
    likes: 384,
  },
  {
    id: 'c2',
    title: 'Next.js Server Actions Form Handler & Validation',
    category: 'Frontend',
    status: 'Live',
    publishedDate: 'Aug 19, 2026',
    views: 890,
    likes: 215,
  },
  {
    id: 'c3',
    title: 'Docker Multi-Stage Build for Fast Rust Binaries',
    category: 'DevOps',
    status: 'Draft',
    publishedDate: 'Aug 12, 2026',
    views: 0,
    likes: 0,
  },
  {
    id: 'c4',
    title: 'Anthropic Claude 3.5 Sonnet System Prompt Rules',
    category: 'Agent Skills',
    status: 'Live',
    publishedDate: 'Aug 04, 2026',
    views: 3100,
    likes: 892,
  },
];

// ==========================================
// MAIN DASHBOARD PAGE COMPONENT
// ==========================================
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(true);
  const [prompts, setPrompts] = useState<PromptItem[]>(INITIAL_PROMPTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for Quick Add
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Agent Skills');
  const [newSnippet, setNewSnippet] = useState('');

  // Toast Notification
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

  const handleAddPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSnippet.trim()) return;

    const newPrompt: PromptItem = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      snippet: newSnippet,
      fullPrompt: newSnippet,
      timestamp: 'Saved just now',
      isStarred: false,
    };

    setPrompts([newPrompt, ...prompts]);
    setNewTitle('');
    setNewSnippet('');
    setIsAddModalOpen(false);
    showToast('New prompt added to your Vault!');
  };

  // Filtered prompts
  const filteredPrompts = prompts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || p.category === selectedTag;
    return matchesSearch && matchesTag;
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

      {/* DARK SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        promptCount={prompts.length}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col space-y-6 min-w-0 w-full pb-24 lg:pb-0">
        {/* TOP HEADER ROW */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif italic text-3xl sm:text-4xl text-vault-dark font-normal tracking-tight">
              Welcome back, Harsh
            </h1>
            <p className="font-sans text-xs sm:text-sm text-vault-dark/70 font-medium pt-0.5">
              Organize, refine, and deploy your master AI prompts & skill.md rules.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => showToast('No unread notifications')}
              className="relative w-10 h-10 rounded-full bg-vault-cream border-2 border-vault-dark/15 flex items-center justify-center text-vault-dark hover:bg-vault-yellow/40 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-vault-green border border-vault-cream animate-pulse" />
            </button>

            {/* Account / User Avatar */}
            <div
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2.5 cursor-pointer group"
              title="Account Settings"
            >
              <img
                src={userAvatar}
                alt="Harsh Rathod Avatar"
                className="w-10 h-10 rounded-full border-2 border-vault-dark object-cover group-hover:ring-2 group-hover:ring-vault-green group-hover:scale-105 transition-all shadow-xs bg-vault-cream"
              />
            </div>
          </div>
        </header>

        {/* STAT CARDS ROW — 2 Columns on Mobile, 4 Columns on Desktop */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {/* Card 1: Total Prompts — YELLOW ACCENT SURFACE */}
          <div className="bg-vault-yellow rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                Total Prompts
              </span>
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/50" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
                {prompts.length}
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-dark text-vault-green px-2 py-0.5 rounded-full self-start sm:self-auto">
                +12 this wk
              </span>
            </div>
          </div>

          {/* Card 2: Published Snapshots — DARK SURFACE */}
          <div className="bg-vault-dark rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-cream/60">
                Published
              </span>
              <MoreHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-cream/40" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-cream font-normal">
                24
              </span>
              <span className="font-sans text-[10px] sm:text-xs font-bold bg-vault-green text-vault-dark px-2 py-0.5 rounded-full self-start sm:self-auto">
                +3
              </span>
            </div>
          </div>

          {/* Card 3: Collections — CREAM SURFACE */}
          <div className="bg-vault-cream rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/15 shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
                Collections
              </span>
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/40" />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal block">
                12
              </span>
              <div className="w-full h-1.5 sm:h-2 bg-vault-dark/10 rounded-full overflow-hidden flex">
                <div className="h-full bg-vault-green w-[55%]" />
                <div className="h-full bg-vault-yellow w-[30%]" />
                <div className="h-full bg-vault-dark w-[15%]" />
              </div>
            </div>
          </div>

          {/* Card 4: Skill.md Files — CREAM SURFACE */}
          <div className="bg-vault-cream rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/15 shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
                Skill.md Files
              </span>
              <FileCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/40" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
                48
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-yellow text-vault-dark border border-vault-dark px-2 py-0.5 rounded-full self-start sm:self-auto">
                2d ago
              </span>
            </div>
          </div>
        </section>

        {/* SAVED PROMPTS PANEL */}
        <section className="bg-vault-cream rounded-[26px] p-5 sm:p-6 border-2 border-vault-dark/15 shadow-xs space-y-5">
          {/* Header with Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-vault-dark/10">
            <div>
              <h2 className="font-serif text-2xl text-vault-dark font-normal">
                Your Vault Prompts
              </h2>
              <p className="font-sans text-xs text-vault-dark/55 font-medium pt-0.5">
                Click copy to grab any prompt to clipboard instantly.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {['All', 'Agent Skills', 'Frontend', 'Backend', 'Marketing', 'Design Systems'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-semibold transition-all cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-vault-dark text-vault-cream shadow-xs'
                      : 'bg-vault-dark/5 text-vault-dark/70 hover:bg-vault-yellow/50 hover:text-vault-dark border border-vault-dark/10'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Cards Grid (3 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPrompts.map((p) => (
              <div
                key={p.id}
                className={`rounded-[22px] p-5 flex flex-col justify-between space-y-4 transition-all duration-200 ${
                  p.isFeatured
                    ? 'bg-vault-dark text-vault-cream border-2 border-vault-dark shadow-sm'
                    : 'bg-vault-cream text-vault-dark border-2 border-vault-dark/15 hover:border-vault-dark/40 hover:shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  {/* Category Tag & Star */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-sans text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        p.isFeatured
                          ? 'bg-vault-yellow text-vault-dark border-vault-dark'
                          : 'bg-vault-yellow/40 text-vault-dark border-vault-dark/15'
                      }`}
                    >
                      {p.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleStar(p.id)}
                      className="cursor-pointer"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          p.isStarred
                            ? p.isFeatured
                              ? 'text-vault-yellow fill-vault-yellow'
                              : 'text-vault-dark fill-vault-dark'
                            : p.isFeatured
                            ? 'text-vault-cream/40'
                            : 'text-vault-dark/25'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-sans font-bold text-base truncate ${
                      p.isFeatured ? 'text-vault-cream' : 'text-vault-dark'
                    }`}
                  >
                    {p.title}
                  </h3>

                  {/* Snippet */}
                  <p
                    className={`font-sans text-xs leading-relaxed line-clamp-4 ${
                      p.isFeatured ? 'text-vault-cream/70' : 'text-vault-dark/65'
                    }`}
                  >
                    {p.snippet}
                  </p>
                </div>

                {/* Footer: Copy & Time */}
                <div className={`flex items-center justify-between pt-3 border-t ${
                  p.isFeatured ? 'border-vault-cream/15' : 'border-vault-dark/10'
                }`}>
                  <span
                    className={`font-sans text-[11px] ${
                      p.isFeatured ? 'text-vault-cream/50' : 'text-vault-dark/45'
                    }`}
                  >
                    {p.timestamp}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopyPrompt(p.id, p.fullPrompt)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer ${
                      p.isFeatured
                        ? 'bg-vault-green text-vault-dark hover:brightness-105'
                        : 'bg-vault-dark text-vault-cream hover:bg-vault-darker'
                    }`}
                  >
                    {copiedId === p.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COMMUNITY PUBLISHED SNAPSHOTS TABLE */}
        <section className="bg-vault-cream rounded-[26px] p-5 sm:p-6 border-2 border-vault-dark/15 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-2xl text-vault-dark font-normal">
                Published Snapshots
              </h2>
              <p className="font-sans text-xs text-vault-dark/60 font-medium">
                Publicly shared prompt templates and community contributions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-vault-cream border border-vault-dark/20 text-vault-dark font-sans text-xs font-semibold cursor-pointer hover:bg-vault-yellow/40 transition-colors"
              >
                <Filter className="w-3.5 h-3.5 text-vault-dark/70" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-vault-dark/10 font-sans text-[11px] font-bold uppercase tracking-wider text-vault-dark/50">
                  <th className="py-3 px-4">Prompt Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Published</th>
                  <th className="py-3 px-4 text-right">Views</th>
                  <th className="py-3 px-4 text-right">Likes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vault-dark/10 font-sans text-xs">
                {COMMUNITY_PROMPTS.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-vault-dark/5 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-bold text-vault-dark max-w-xs truncate">
                      {row.title}
                    </td>
                    <td className="py-3.5 px-4 text-vault-dark/70 font-medium">
                      {row.category}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${
                          row.status === 'Live'
                            ? 'bg-vault-green/20 text-vault-dark border-vault-green'
                            : 'bg-vault-yellow/50 text-vault-dark border-vault-dark/20'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            row.status === 'Live' ? 'bg-vault-green animate-pulse' : 'bg-vault-dark/50'
                          }`}
                        />
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-vault-dark/60">
                      {row.publishedDate}
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-vault-dark/80">
                      {row.views.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-vault-dark">
                      <div className="flex items-center justify-end gap-1">
                        <Heart className="w-3.5 h-3.5 text-vault-dark fill-vault-dark/20" />
                        <span>{row.likes}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* QUICK ADD PROMPT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-vault-cream border-2 border-vault-dark rounded-[28px] p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 p-1 text-vault-dark/60 hover:text-vault-dark cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-vault-dark/60 block">
                New Entry
              </span>
              <h2 className="font-serif text-3xl text-vault-dark font-normal">
                Save Prompt to Vault
              </h2>
            </div>

            <form onSubmit={handleAddPrompt} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Next.js Server Component System Rules"
                  className="w-full bg-vault-cream text-vault-dark border-2 border-vault-dark rounded-xl px-4 py-2.5 font-sans text-xs sm:text-sm placeholder:text-vault-dark/40 focus:outline-none focus:ring-2 focus:ring-vault-green"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-vault-cream text-vault-dark border-2 border-vault-dark rounded-xl px-4 py-2.5 font-sans text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-vault-green"
                >
                  <option value="Agent Skills">Agent Skills</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design Systems">Design Systems</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark">
                  Prompt Text / Rule Instructions
                </label>
                <textarea
                  required
                  rows={4}
                  value={newSnippet}
                  onChange={(e) => setNewSnippet(e.target.value)}
                  placeholder="Paste your master prompt or skill.md rules here..."
                  className="w-full bg-vault-cream text-vault-dark border-2 border-vault-dark rounded-xl p-4 font-sans text-xs sm:text-sm placeholder:text-vault-dark/40 focus:outline-none focus:ring-2 focus:ring-vault-green resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border-2 border-vault-dark text-vault-dark font-sans text-xs font-bold hover:bg-vault-yellow/40 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-vault-green text-vault-dark border-2 border-vault-dark font-sans text-xs font-bold shadow-xs hover:brightness-105 cursor-pointer"
                >
                  Save Prompt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
