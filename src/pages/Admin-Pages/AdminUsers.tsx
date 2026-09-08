import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import {
  Search,
  Users,
  Bookmark,
  Sparkles,
  Flame,
  LayoutGrid,
  List,
  ArrowUpDown,
  X,
  Mail,
  Check,
  Eye,
} from 'lucide-react';
import Toast, { ToastContainer, ToastType } from '../../components/ui/Toast';
import { copyToClipboard } from '../../utils/clipboard';

// ============================================================================
// 1. DATA MODELS & TYPES (Clean View-Only — No Tier, Status, or Roles)
// ============================================================================

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  handle: string;
  avatar: string;
  joinedDate: string;
  lastActive: string;
  promptsCount: number;
  clonesCount: number;
  upvotesCount: number;
  bio: string;
  specialty: string;
  isVerified?: boolean;
  recentPrompts?: { title: string; category: string; clones: number }[];
}

interface ActiveToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

// Master mock dataset of platform creators and authors
const INITIAL_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Harsh Rathod',
    email: 'harsh@vault.ai',
    handle: 'harshrathod',
    avatar: '/avatars/avatar-1.svg',
    joinedDate: 'Jan 14, 2026',
    lastActive: 'Just now',
    promptsCount: 48,
    clonesCount: 3840,
    upvotesCount: 520,
    bio: 'Founder & Design Systems lead. Curating production-ready AI rules and agent architectures.',
    specialty: 'Agent Architectures & UI Systems',
    isVerified: true,
    recentPrompts: [
      { title: 'Autonomous Refactoring Skill Rule', category: 'Agent Skills', clones: 1620 },
      { title: 'REST API Rate-Limiter with Upstash Redis', category: 'Backend', clones: 1240 },
      { title: 'Neo-Brutalist Tailwind Design System', category: 'Frontend', clones: 980 },
    ],
  },
  {
    id: 'usr-2',
    name: 'Alex Vance',
    email: 'alex@codeforge.io',
    handle: 'alexvance',
    avatar: '/avatars/avatar-2.svg',
    joinedDate: 'Feb 02, 2026',
    lastActive: '12m ago',
    promptsCount: 16,
    clonesCount: 3420,
    upvotesCount: 428,
    bio: 'Fullstack Next.js 15 & AI agents engineer. Creating Cursor & Windsurf prompt rulebooks.',
    specialty: 'Next.js 15 & Coding Agents',
    isVerified: true,
    recentPrompts: [
      { title: 'Autonomous Next.js 15 Agent Rulebook', category: 'Agent Skills', clones: 2150 },
      { title: 'React 18 Server Components Guard', category: 'Frontend', clones: 1270 },
    ],
  },
  {
    id: 'usr-3',
    name: 'Marcus Chen',
    email: 'marcus@dataflow.dev',
    handle: 'marcuschen',
    avatar: '/avatars/avatar-1.svg',
    joinedDate: 'Feb 10, 2026',
    lastActive: '1h ago',
    promptsCount: 14,
    clonesCount: 2890,
    upvotesCount: 312,
    bio: 'Distributed systems & PostgreSQL DBA. Crafting zero-deadlock database and SQL analyzers.',
    specialty: 'PostgreSQL & Database Optimization',
    isVerified: false,
    recentPrompts: [
      { title: 'PostgreSQL Distributed Lock & Deadlock Analyzer', category: 'Backend', clones: 2890 },
    ],
  },
  {
    id: 'usr-4',
    name: 'Sofia Reyes',
    email: 'sofia@designcraft.studio',
    handle: 'sofiareyes',
    avatar: '/avatars/avatar-2.svg',
    joinedDate: 'Feb 12, 2026',
    lastActive: '3h ago',
    promptsCount: 11,
    clonesCount: 2150,
    upvotesCount: 284,
    bio: 'Editorial brand designer & creative technologist. Specializes in Brutalism & Figma AI tokenization.',
    specialty: 'Neo-Brutalism & Design Tokens',
    isVerified: true,
    recentPrompts: [
      { title: 'Neo-Brutalist Tailwind Design System Tokenizer', category: 'Frontend', clones: 2150 },
    ],
  },
  {
    id: 'usr-5',
    name: 'Elena Rostova',
    email: 'elena@matrix.so',
    handle: 'elenarostova',
    avatar: '/avatars/avatar-3.svg',
    joinedDate: 'Feb 18, 2026',
    lastActive: '1d ago',
    promptsCount: 9,
    clonesCount: 1840,
    upvotesCount: 195,
    bio: 'Growth hacker and B2B copywriter. Synthesizing high-converting cold outbound sequences.',
    specialty: 'B2B Copywriting & Growth Prompting',
    isVerified: false,
    recentPrompts: [
      { title: 'High-Converting Cold Outreach Synthesizer', category: 'Marketing', clones: 1840 },
    ],
  },
  {
    id: 'usr-6',
    name: 'David K.',
    email: 'david@phantom.dev',
    handle: 'davidk',
    avatar: '/avatars/avatar-1.svg',
    joinedDate: 'Mar 01, 2026',
    lastActive: '4d ago',
    promptsCount: 5,
    clonesCount: 940,
    upvotesCount: 88,
    bio: 'Experimenting with LLM orchestration and automated resilient scraping pipelines.',
    specialty: 'Web Scraping & Data Pipelines',
    isVerified: false,
    recentPrompts: [
      { title: 'Web Scraper Resilience Template', category: 'Backend', clones: 940 },
    ],
  },
  {
    id: 'usr-7',
    name: 'Aisha Patel',
    email: 'aisha@zenithai.com',
    handle: 'aishapatel',
    avatar: '/avatars/avatar-4.svg',
    joinedDate: 'Mar 02, 2026',
    lastActive: '45m ago',
    promptsCount: 22,
    clonesCount: 1540,
    upvotesCount: 240,
    bio: 'AI Safety & prompt injection red-teamer. Protecting customer-facing agent boundaries.',
    specialty: 'Prompt Defense & AI Safety',
    isVerified: true,
    recentPrompts: [
      { title: 'Zero-Leak Prompt Defense Envelope', category: 'Agent Skills', clones: 920 },
      { title: 'Constitutional AI Evaluator Prompt', category: 'Agent Skills', clones: 620 },
    ],
  },
  {
    id: 'usr-8',
    name: 'Kaito Tanaka',
    email: 'kaito@tokyocore.jp',
    handle: 'kaitotanaka',
    avatar: '/avatars/avatar-5.svg',
    joinedDate: 'Mar 04, 2026',
    lastActive: '2h ago',
    promptsCount: 7,
    clonesCount: 890,
    upvotesCount: 112,
    bio: 'Mobile React Native & Flutter developer integrating local on-device small language models.',
    specialty: 'On-Device SLMs & Mobile AI',
    isVerified: false,
    recentPrompts: [
      { title: 'On-Device SLM Inference Wrapper', category: 'Frontend', clones: 890 },
    ],
  },
];

// ============================================================================
// 2. MAIN ADMIN USERS COMPONENT (Clean View-Only)
// ============================================================================

export default function AdminUsers() {
  const navigate = useNavigate();

  // Toast notification state
  const [activeToast, setActiveToast] = useState<ActiveToast | null>(null);

  const showToast = (message: string, type: ToastType = 'success', title?: string) => {
    setActiveToast({
      id: String(Date.now()),
      type,
      title,
      message,
    });
  };

  // State
  const [users] = useState<AdminUser[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'clones' | 'prompts' | 'upvotes' | 'recent' | 'name'>('clones');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Interactive Inspection Modal State
  const [inspectingUser, setInspectingUser] = useState<AdminUser | null>(null);
  const inspectDragControls = useDragControls();

  // Filtered and sorted users
  const filteredUsers = useMemo(() => {
    return users
      .filter((u) => {
        const query = searchQuery.toLowerCase();
        return (
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          u.handle.toLowerCase().includes(query) ||
          u.specialty.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'clones') return b.clonesCount - a.clonesCount;
        if (sortBy === 'prompts') return b.promptsCount - a.promptsCount;
        if (sortBy === 'upvotes') return b.upvotesCount - a.upvotesCount;
        if (sortBy === 'recent') return b.id.localeCompare(a.id);
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [users, searchQuery, sortBy]);

  // Executive summary metrics (Calculated from creator activity, no tiers/status)
  const metrics = useMemo(() => {
    const totalCreators = users.length;
    const totalPrompts = users.reduce((acc, u) => acc + u.promptsCount, 0);
    const totalClones = users.reduce((acc, u) => acc + u.clonesCount, 0);
    const totalUpvotes = users.reduce((acc, u) => acc + u.upvotesCount, 0);
    return { totalCreators, totalPrompts, totalClones, totalUpvotes };
  }, [users]);

  const handleCopyEmail = async (email: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const ok = await copyToClipboard(email);
    if (ok) {
      showToast(`Copied ${email} to clipboard!`, 'success', 'Copied');
    }
  };

  return (
    <>
      {/* Toast Feedback Notification Container */}
      <ToastContainer>
        {activeToast && (
          <Toast
            key={activeToast.id}
            type={activeToast.type}
            title={activeToast.title}
            message={activeToast.message}
            onClose={() => setActiveToast(null)}
          />
        )}
      </ToastContainer>

      {/* Main Workspace Content Area */}
      <main className="flex-1 flex flex-col space-y-6 min-w-0 w-full pb-24 lg:pb-0">
        {/* ==================================================================== */}
        {/* 1. HEADER (Exact matching DashboardHeader.tsx styling)                */}
        {/* ==================================================================== */}
        <header className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 relative">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal tracking-tight">
                Creator Directory
              </h1>
              <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-vault-yellow text-vault-dark border border-vault-dark">
                {users.length} Authors
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-vault-dark/70 font-medium pt-0.5">
              Browse registered authors, community template contributors, and prompt engineers.
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

        {/* ==================================================================== */}
        {/* 2. 4-CARD EXECUTIVE METRICS (Content-Focused — No Tier/Status)       */}
        {/* ==================================================================== */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {/* Card 1: Total Creators — YELLOW ACCENT SURFACE */}
          <div
            className="bg-vault-yellow rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5"
            title="Total Registered Creators"
          >
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                Total Creators
              </span>
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/60" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
                {metrics.totalCreators}
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-dark text-vault-green px-2 py-0.5 rounded-full self-start sm:self-auto">
                Platform Authors
              </span>
            </div>
          </div>

          {/* Card 2: Total Clones Won — DARK SURFACE */}
          <div className="bg-vault-dark rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-cream/60">
                Community Clones
              </span>
              <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-cream/40" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-cream font-normal">
                {metrics.totalClones.toLocaleString()}
              </span>
              <span className="font-sans text-[10px] sm:text-xs font-bold bg-vault-green text-vault-dark px-2 py-0.5 rounded-full self-start sm:self-auto">
                Copies Won
              </span>
            </div>
          </div>

          {/* Card 3: Authored Prompts — CREAM SURFACE */}
          <div className="bg-vault-cream rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/20 shadow-xs flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
                Authored Rules
              </span>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/50" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
                {metrics.totalPrompts}
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-yellow text-vault-dark border border-vault-dark/20 px-2 py-0.5 rounded-full self-start sm:self-auto">
                Published
              </span>
            </div>
          </div>

          {/* Card 4: Community Upvotes — CREAM SURFACE */}
          <div className="bg-vault-cream rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/20 shadow-xs flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
                Total Upvotes
              </span>
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
                {metrics.totalUpvotes.toLocaleString()}
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-green/20 text-vault-dark border border-vault-green px-2 py-0.5 rounded-full self-start sm:self-auto">
                Platform High
              </span>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 3. SEARCH, SORT & VIEW SWITCHER TOOLBAR                              */}
        {/* ==================================================================== */}
        <section className="bg-vault-cream rounded-[24px] p-4 sm:p-5 border-2 border-vault-dark/15 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <Search className="w-4 h-4 text-vault-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search creator by name, email, @handle, or specialty..."
                className="w-full pl-9 pr-9 py-2 rounded-full bg-white/70 border-2 border-vault-dark/15 text-xs sm:text-sm font-medium focus:outline-none focus:border-vault-dark transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-vault-dark/40 hover:text-vault-dark cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Controls Right: Sort Dropdown & View Mode Switcher */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border-2 border-vault-dark/15 text-xs font-semibold text-vault-dark">
                <ArrowUpDown className="w-3 h-3 text-vault-dark/60" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-0 font-sans text-xs font-bold text-vault-dark focus:outline-none cursor-pointer"
                >
                  <option value="clones">Sort: Most Clones</option>
                  <option value="prompts">Sort: Most Prompts</option>
                  <option value="upvotes">Sort: Most Upvotes</option>
                  <option value="recent">Sort: Newest Members</option>
                  <option value="name">Sort: Name (A-Z)</option>
                </select>
              </div>

              {/* View Switcher: Table vs Cards Grid */}
              <div className="flex items-center bg-white/70 rounded-full border-2 border-vault-dark/15 p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-vault-dark text-vault-cream shadow-xs'
                      : 'text-vault-dark/60 hover:text-vault-dark'
                  }`}
                  title="Table view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-vault-dark text-vault-cream shadow-xs'
                      : 'text-vault-dark/60 hover:text-vault-dark'
                  }`}
                  title="Grid cards view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 4. CREATOR DIRECTORY DISPLAY (Clean View-Only: Table or Grid)        */}
        {/* ==================================================================== */}
        {filteredUsers.length === 0 ? (
          /* Empty Search State */
          <div className="bg-vault-cream rounded-[26px] p-10 border-2 border-vault-dark/15 text-center space-y-3">
            <Users className="w-10 h-10 text-vault-dark/30 mx-auto" />
            <h3 className="font-serif text-2xl text-vault-dark font-normal">No creators match your search</h3>
            <p className="font-sans text-xs text-vault-dark/60 max-w-sm mx-auto">
              Try adjusting your search terms or clear your query.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-full bg-vault-yellow border-2 border-vault-dark text-vault-dark font-sans text-xs font-bold hover:bg-vault-green transition-colors cursor-pointer"
            >
              Clear Search Query
            </button>
          </div>
        ) : viewMode === 'table' ? (
          /* ================================================================== */
          /* VIEW-ONLY TABLE                                                    */
          /* ================================================================== */
          <section className="bg-vault-cream rounded-[26px] p-4 sm:p-6 border-2 border-vault-dark/15 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-vault-dark/10">
              <span className="font-sans text-xs font-bold text-vault-dark/60">
                Showing {filteredUsers.length} of {users.length} Creators
              </span>
              <span className="font-mono text-xs text-vault-dark/60">
                Ranked by {sortBy.toUpperCase()}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-vault-dark/15 font-sans text-[11px] font-bold uppercase tracking-wider text-vault-dark/50">
                    <th className="py-3 px-3 sm:px-4">Creator</th>
                    <th className="py-3 px-3 sm:px-4">Specialty</th>
                    <th className="py-3 px-3 sm:px-4 text-right">Prompts</th>
                    <th className="py-3 px-3 sm:px-4 text-right">Clones Won</th>
                    <th className="py-3 px-3 sm:px-4 text-right">Upvotes</th>
                    <th className="py-3 px-3 sm:px-4">Member Since</th>
                    <th className="py-3 px-3 sm:px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-vault-dark/10 font-sans text-xs">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      onClick={() => setInspectingUser(user)}
                      className="hover:bg-vault-dark/5 transition-colors cursor-pointer group"
                    >
                      {/* Creator Identity */}
                      <td className="py-3.5 px-3 sm:px-4 font-bold text-vault-dark max-w-xs">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full border-2 border-vault-dark/20 object-cover bg-vault-yellow/30 shrink-0 group-hover:scale-105 transition-transform"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-vault-dark truncate leading-snug group-hover:text-vault-dark font-sans text-xs sm:text-sm">
                                {user.name}
                              </span>
                              {user.isVerified && (
                                <span className="w-3.5 h-3.5 rounded-full bg-vault-green text-vault-dark flex items-center justify-center shrink-0" title="Verified Creator">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-vault-dark/50 font-mono truncate">
                              @{user.handle}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Technical Specialty */}
                      <td className="py-3.5 px-3 sm:px-4 text-vault-dark/70 font-medium">
                        <span className="px-2.5 py-1 rounded-full bg-white/70 border border-vault-dark/15 text-[11px]">
                          {user.specialty}
                        </span>
                      </td>

                      {/* Prompts Authored */}
                      <td className="py-3.5 px-3 sm:px-4 text-right font-mono font-bold text-vault-dark">
                        {user.promptsCount}
                      </td>

                      {/* Clones Won */}
                      <td className="py-3.5 px-3 sm:px-4 text-right font-mono font-bold text-vault-green">
                        {user.clonesCount.toLocaleString()}
                      </td>

                      {/* Upvotes */}
                      <td className="py-3.5 px-3 sm:px-4 text-right font-mono font-bold text-vault-dark/80">
                        {user.upvotesCount.toLocaleString()}
                      </td>

                      {/* Member Since */}
                      <td className="py-3.5 px-3 sm:px-4 text-vault-dark/60 font-mono text-[11px]">
                        {user.joinedDate}
                      </td>

                      {/* View-Only Inspect Action */}
                      <td className="py-3.5 px-3 sm:px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setInspectingUser(user)}
                            className="px-3 py-1 rounded-full font-sans text-xs font-semibold bg-white/80 hover:bg-vault-yellow border border-vault-dark/20 text-vault-dark transition-colors cursor-pointer inline-flex items-center gap-1"
                            title="Inspect creator profile"
                          >
                            <Eye className="w-3 h-3 text-vault-dark/70" />
                            <span>Inspect</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          /* ================================================================== */
          /* VIEW-ONLY CARDS GRID                                               */
          /* ================================================================== */
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setInspectingUser(user)}
                className="bg-vault-cream rounded-[24px] p-5 border-2 border-vault-dark flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#002D0F] transition-all duration-200 cursor-pointer relative"
              >
                {/* Top Row: Avatar & Identity */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-vault-dark object-cover bg-vault-yellow/40 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm sm:text-base text-vault-dark truncate font-sans">
                          {user.name}
                        </h4>
                        {user.isVerified && (
                          <span className="w-3.5 h-3.5 rounded-full bg-vault-green text-vault-dark flex items-center justify-center shrink-0" title="Verified Creator">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-vault-dark/50 block truncate">
                        @{user.handle}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-vault-dark/50 px-2 py-0.5 rounded-full bg-white/70 border border-vault-dark/15 shrink-0">
                    {user.joinedDate}
                  </span>
                </div>

                {/* Specialty Pill & Bio */}
                <div className="space-y-1.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-vault-yellow/40 border border-vault-dark/20 text-[10px] font-bold text-vault-dark">
                    {user.specialty}
                  </span>
                  <p className="font-sans text-xs text-vault-dark/70 line-clamp-2 leading-relaxed min-h-[36px]">
                    {user.bio}
                  </p>
                </div>

                {/* 3-Column Metrics Bar */}
                <div className="grid grid-cols-3 gap-2 bg-white/70 p-2.5 rounded-xl border border-vault-dark/15 text-center">
                  <div>
                    <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/50">
                      Prompts
                    </span>
                    <span className="font-mono text-sm font-bold text-vault-dark">
                      {user.promptsCount}
                    </span>
                  </div>

                  <div>
                    <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/50">
                      Clones
                    </span>
                    <span className="font-mono text-sm font-bold text-vault-green">
                      {user.clonesCount.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/50">
                      Upvotes
                    </span>
                    <span className="font-mono text-sm font-bold text-vault-dark">
                      {user.upvotesCount}
                    </span>
                  </div>
                </div>

                {/* Action Tray */}
                <div className="flex items-center justify-between pt-2 border-t border-vault-dark/10" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={(e) => handleCopyEmail(user.email, e)}
                    className="font-mono text-xs text-vault-dark/60 hover:text-vault-dark flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[130px]">{user.email}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInspectingUser(user)}
                    className="px-3 py-1 rounded-full font-sans text-xs font-semibold bg-vault-cream hover:bg-vault-yellow border border-vault-dark/20 text-vault-dark cursor-pointer transition-colors inline-flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3 text-vault-dark/70" />
                    <span>Inspect</span>
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      {/* ==================================================================== */}
      {/* 5. VIEW-ONLY INSPECT USER MODAL / MOBILE DRAGGABLE BOTTOM SHEET      */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {inspectingUser && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center overscroll-contain">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectingUser(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box / Bottom Sheet */}
            <motion.div
              initial={{ y: '100%', opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              drag="y"
              dragListener={false}
              dragControls={inspectDragControls}
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 500) {
                  setInspectingUser(null);
                }
              }}
              className="relative w-full md:max-w-2xl bg-vault-cream border-2 border-vault-dark rounded-t-[32px] md:rounded-[28px] shadow-2xl p-5 sm:p-6 z-10 max-h-[88dvh] md:max-h-[85vh] flex flex-col"
            >
              {/* Top Handle for mobile dragging */}
              <div
                onPointerDown={(e) => inspectDragControls.start(e)}
                className="md:hidden flex items-center justify-center pb-3 touch-none cursor-grab active:cursor-grabbing"
              >
                <div className="w-12 h-1.5 bg-vault-dark/30 rounded-full" />
              </div>

              {/* Sticky Header */}
              <div className="shrink-0 flex items-start justify-between gap-3 pb-4 border-b-2 border-vault-dark/15">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={inspectingUser.avatar}
                    alt={inspectingUser.name}
                    className="w-12 h-12 rounded-full border-2 border-vault-dark object-cover bg-vault-yellow/40 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif italic text-xl sm:text-2xl text-vault-dark font-normal truncate">
                        {inspectingUser.name}
                      </h2>
                      {inspectingUser.isVerified && (
                        <span className="w-4 h-4 rounded-full bg-vault-green text-vault-dark flex items-center justify-center shrink-0" title="Verified Creator">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-xs text-vault-dark/60 truncate">
                      @{inspectingUser.handle} · {inspectingUser.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setInspectingUser(null)}
                  className="w-8 h-8 rounded-full border border-vault-dark/20 flex items-center justify-center hover:bg-vault-dark/10 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4 text-vault-dark" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto overscroll-contain py-4 space-y-4 [scrollbar-width:thin]">
                {/* Meta details row: Specialty, Member Since, Last Active */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="bg-white/70 p-2.5 rounded-xl border border-vault-dark/15">
                    <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/50">
                      Technical Focus
                    </span>
                    <span className="font-sans text-xs font-bold text-vault-dark block mt-0.5">
                      {inspectingUser.specialty}
                    </span>
                  </div>

                  <div className="bg-white/70 p-2.5 rounded-xl border border-vault-dark/15">
                    <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/50">
                      Member Since
                    </span>
                    <span className="font-mono text-xs text-vault-dark/80 block mt-0.5">
                      {inspectingUser.joinedDate}
                    </span>
                  </div>

                  <div className="bg-white/70 p-2.5 rounded-xl border border-vault-dark/15">
                    <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/50">
                      Last Active
                    </span>
                    <span className="font-mono text-xs text-vault-dark/80 block mt-0.5">
                      {inspectingUser.lastActive}
                    </span>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-3 bg-vault-yellow/20 p-3.5 rounded-2xl border border-vault-dark/15 text-center">
                  <div>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/60 block">
                      Prompts Authored
                    </span>
                    <span className="font-serif text-2xl font-normal text-vault-dark">
                      {inspectingUser.promptsCount}
                    </span>
                  </div>

                  <div>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/60 block">
                      Community Clones
                    </span>
                    <span className="font-serif text-2xl font-normal text-vault-green">
                      {inspectingUser.clonesCount.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/60 block">
                      Upvotes Received
                    </span>
                    <span className="font-serif text-2xl font-normal text-vault-dark">
                      {inspectingUser.upvotesCount}
                    </span>
                  </div>
                </div>

                {/* Author Dossier & Bio */}
                <div className="space-y-1.5">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/60">
                    Author Dossier &amp; Bio
                  </span>
                  <div className="bg-white/70 p-3 rounded-xl border border-vault-dark/15 text-xs text-vault-dark leading-relaxed">
                    {inspectingUser.bio}
                  </div>
                </div>

                {/* Published Prompt Templates Preview */}
                {inspectingUser.recentPrompts && inspectingUser.recentPrompts.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/60">
                      Top Authored Rules &amp; Templates
                    </span>
                    <div className="space-y-1.5">
                      {inspectingUser.recentPrompts.map((p, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 border border-vault-dark/15 text-xs"
                        >
                          <div className="min-w-0 flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-vault-yellow/60 text-vault-dark">
                              {p.category}
                            </span>
                            <span className="font-medium text-vault-dark truncate">
                              {p.title}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-vault-green shrink-0 ml-2">
                            {p.clones.toLocaleString()} clones
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky Bottom Actions (View-Only: Copy Email & Close) */}
              <div className="shrink-0 pt-3 border-t-2 border-vault-dark/15 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => handleCopyEmail(inspectingUser.email, e)}
                  className="px-3.5 py-1.5 rounded-full bg-vault-cream border border-vault-dark/30 font-sans text-xs font-bold text-vault-dark hover:bg-vault-dark hover:text-vault-cream transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Copy Email ({inspectingUser.email})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInspectingUser(null)}
                  className="px-4 py-1.5 rounded-full bg-vault-yellow text-vault-dark border border-vault-dark font-sans text-xs font-bold hover:bg-vault-green transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
