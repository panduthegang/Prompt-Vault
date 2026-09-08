import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Layers,
  ShieldCheck,
  Search,
  Filter,
  Zap,
  Copy,
  Check,
  Flame,
  Bookmark,
  Users,
} from 'lucide-react';
import Toast, { ToastContainer, ToastType } from '../../components/ui/Toast';
import { copyToClipboard } from '../../utils/clipboard';

interface ActiveToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tier: 'Pro' | 'Free' | 'Enterprise';
  status: 'Active' | 'Suspended';
  joinedDate: string;
  promptsCount: number;
  clonesCount: number;
}

interface TopPromptLeaderboardItem {
  id: string;
  rank: number;
  title: string;
  category: string;
  author: string;
  authorAvatar: string;
  clones: number;
  likes: number;
  promptText: string;
}

const INITIAL_ADMIN_USERS: AdminUserItem[] = [
  {
    id: 'usr-1',
    name: 'Harsh Rathod',
    email: 'harsh@vault.ai',
    avatar: '/avatars/avatar-1.svg',
    tier: 'Enterprise',
    status: 'Active',
    joinedDate: 'Jan 14, 2026',
    promptsCount: 48,
    clonesCount: 3840,
  },
  {
    id: 'usr-2',
    name: 'Alex Vance',
    email: 'alex@codeforge.io',
    avatar: '/avatars/avatar-2.svg',
    tier: 'Pro',
    status: 'Active',
    joinedDate: 'Feb 02, 2026',
    promptsCount: 16,
    clonesCount: 3420,
  },
  {
    id: 'usr-3',
    name: 'Marcus Chen',
    email: 'marcus@dataflow.dev',
    avatar: '/avatars/avatar-1.svg',
    tier: 'Pro',
    status: 'Active',
    joinedDate: 'Feb 10, 2026',
    promptsCount: 14,
    clonesCount: 2890,
  },
  {
    id: 'usr-4',
    name: 'Sofia Reyes',
    email: 'sofia@designcraft.studio',
    avatar: '/avatars/avatar-2.svg',
    tier: 'Pro',
    status: 'Active',
    joinedDate: 'Feb 12, 2026',
    promptsCount: 11,
    clonesCount: 2150,
  },
  {
    id: 'usr-5',
    name: 'Elena Rostova',
    email: 'elena@matrix.so',
    avatar: '/avatars/avatar-3.svg',
    tier: 'Free',
    status: 'Active',
    joinedDate: 'Feb 18, 2026',
    promptsCount: 9,
    clonesCount: 1840,
  },
  {
    id: 'usr-6',
    name: 'David K.',
    email: 'david@phantom.dev',
    avatar: '/avatars/avatar-1.svg',
    tier: 'Free',
    status: 'Suspended',
    joinedDate: 'Mar 01, 2026',
    promptsCount: 2,
    clonesCount: 14,
  },
];

const TOP_LEADERBOARD_PROMPTS: TopPromptLeaderboardItem[] = [
  {
    id: 'top-1',
    rank: 1,
    title: 'Autonomous Next.js 15 Agent Rulebook',
    category: 'Agent Skills',
    author: 'Alex Vance',
    authorAvatar: '/avatars/avatar-2.svg',
    clones: 3420,
    likes: 428,
    promptText:
      'You are a Next.js 15 App Router specialist. Strictly follow React Server Components paradigms. Never leak server keys in client boundaries.',
  },
  {
    id: 'top-2',
    rank: 2,
    title: 'PostgreSQL Distributed Lock & Deadlock Analyzer',
    category: 'Backend',
    author: 'Marcus Chen',
    authorAvatar: '/avatars/avatar-1.svg',
    clones: 2890,
    likes: 312,
    promptText:
      'Analyze pg_locks and pg_stat_activity queries. Output precise SQL advisory lock commands to prevent concurrent transaction bottlenecks.',
  },
  {
    id: 'top-3',
    rank: 3,
    title: 'Neo-Brutalist Tailwind Design System Tokenizer',
    category: 'Frontend',
    author: 'Sofia Reyes',
    authorAvatar: '/avatars/avatar-2.svg',
    clones: 2150,
    likes: 284,
    promptText:
      'Generate unified CSS custom variables with 2px solid dark borders (#002D0F), retro drop shadows, high contrast palettes, and Instrument Serif rules.',
  },
  {
    id: 'top-4',
    rank: 4,
    title: 'High-Converting Cold Outreach Synthesizer',
    category: 'Marketing',
    author: 'Elena Rostova',
    authorAvatar: '/avatars/avatar-3.svg',
    clones: 1840,
    likes: 195,
    promptText:
      'Generate personalized cold email sequences using company 10-K disclosures. Extract prospect pain points and match with product feature matrix.',
  },
  {
    id: 'top-5',
    rank: 5,
    title: 'REST API Rate-Limiter with Upstash Redis',
    category: 'Backend',
    author: 'Harsh Rathod',
    authorAvatar: '/avatars/avatar-1.svg',
    clones: 1620,
    likes: 160,
    promptText:
      'Implement a sliding window counter algorithm with Upstash Redis and Next.js middleware. Return custom 429 response payloads with Retry-After headers.',
  },
];

// Logical weekly velocity tracking data
const WEEKLY_VELOCITY = [
  { day: 'Mon', creations: 380, copies: 1640 },
  { day: 'Tue', creations: 490, copies: 2180 },
  { day: 'Wed', creations: 620, copies: 2940 },
  { day: 'Thu', creations: 580, copies: 2610 },
  { day: 'Fri', creations: 840, copies: 3790 },
  { day: 'Sat', creations: 910, copies: 4320 },
  { day: 'Sun', creations: 1050, copies: 4980 },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Toast notification state using proper Toast component
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
  const [users, setUsers] = useState<AdminUserItem[]>(INITIAL_ADMIN_USERS);
  const [userSearch, setUserSearch] = useState('');
  const [copiedLeaderboardId, setCopiedLeaderboardId] = useState<string | null>(null);

  // Graph filters
  const [graphMetric, setGraphMetric] = useState<'both' | 'copies' | 'creations'>('both');
  const [graphTimeframe, setGraphTimeframe] = useState<'7d' | '30d'>('7d');
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const hoveredItem = useMemo(() => {
    return WEEKLY_VELOCITY.find((d) => d.day === hoveredDay) || null;
  }, [hoveredDay]);

  const handleCopyPrompt = async (id: string, text: string, title: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedLeaderboardId(id);
      showToast(`Copied "${title}" template to clipboard!`, 'success', 'Copied');
      setTimeout(() => setCopiedLeaderboardId(null), 2000);
    }
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const next = u.status === 'Active' ? 'Suspended' : 'Active';
          showToast(
            `User ${u.name} marked as ${next}`,
            next === 'Active' ? 'success' : 'warning',
            'User Status'
          );
          return { ...u, status: next };
        }
        return u;
      })
    );
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.tier.toLowerCase().includes(userSearch.toLowerCase())
    );
  }, [users, userSearch]);

  const totalCopiesWeek = WEEKLY_VELOCITY.reduce((sum, d) => sum + d.copies, 0);
  const totalCreationsWeek = WEEKLY_VELOCITY.reduce((sum, d) => sum + d.creations, 0);

  return (
    <>
      {/* Official Toast Notification Container */}
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
        {/* 1. Header (Exact matching DashboardHeader.tsx styling) */}
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

        {/* 2. Key Metrics Summary Cards (Exact 4-Card Formula from DashboardStats.tsx) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {/* Card 1: Total Creators — YELLOW ACCENT SURFACE */}
          <div
            className="bg-vault-yellow rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3"
            title="Total Platform Creators"
          >
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                Total Creators
              </span>
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/50" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
                14,892
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-dark text-vault-green px-2 py-0.5 rounded-full self-start sm:self-auto">
                +14% this wk
              </span>
            </div>
          </div>

          {/* Card 2: Community Copies & Clones — DARK SURFACE */}
          <div className="bg-vault-dark rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-cream/60">
                Community Clones
              </span>
              <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-cream/40" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-cream font-normal">
                128.4k
              </span>
              <span className="font-sans text-[10px] sm:text-xs font-bold bg-vault-green text-vault-dark px-2 py-0.5 rounded-full self-start sm:self-auto">
                +28% this wk
              </span>
            </div>
          </div>

          {/* Card 3: Vault Registry Distribution — CREAM SURFACE WITH PROGRESS BAR */}
          <div className="bg-vault-cream rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/15 shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
                Vault Registry
              </span>
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/40" />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal block">
                84,210
              </span>
              <div className="w-full h-1.5 sm:h-2 bg-vault-dark/10 rounded-full overflow-hidden flex">
                <div className="h-full bg-vault-green w-[55%]" title="Agent Skills 55%" />
                <div className="h-full bg-vault-yellow w-[30%]" title="Frontend & Architecture 30%" />
                <div className="h-full bg-vault-dark w-[15%]" title="Marketing 15%" />
              </div>
            </div>
          </div>

          {/* Card 4: Cluster Health — CREAM SURFACE */}
          <div className="bg-vault-cream rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/15 shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
                Cluster Health
              </span>
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/40" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
                99.98%
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-yellow text-vault-dark border border-vault-dark px-2 py-0.5 rounded-full self-start sm:self-auto">
                Healthy &rarr;
              </span>
            </div>
          </div>
        </section>

        {/* 3. LOGICAL PLATFORM VELOCITY & ENGAGEMENT GRAPH SECTION */}
        <section className="bg-vault-cream rounded-[26px] p-5 sm:p-6 border-2 border-vault-dark/15 shadow-xs space-y-6">
          {/* Header with Title & Interactive Metric Selectors */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-vault-dark/10">
            <div>
              <h2 className="font-serif text-2xl text-vault-dark font-normal">
                Platform Velocity &amp; Clones
              </h2>
              <p className="font-sans text-xs text-vault-dark/55 font-medium pt-0.5">
                Daily prompt creations vs. community clipboard copies &amp; forks.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Metric filter pills */}
              <div className="flex items-center gap-1.5 p-1 bg-vault-dark/5 rounded-full border border-vault-dark/10">
                <button
                  type="button"
                  onClick={() => setGraphMetric('both')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${graphMetric === 'both'
                      ? 'bg-vault-dark text-vault-cream shadow-xs'
                      : 'text-vault-dark/70 hover:text-vault-dark'
                    }`}
                >
                  Both
                </button>
                <button
                  type="button"
                  onClick={() => setGraphMetric('copies')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${graphMetric === 'copies'
                      ? 'bg-vault-dark text-vault-cream shadow-xs'
                      : 'text-vault-dark/70 hover:text-vault-dark'
                    }`}
                >
                  Copies Only
                </button>
                <button
                  type="button"
                  onClick={() => setGraphMetric('creations')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${graphMetric === 'creations'
                      ? 'bg-vault-dark text-vault-cream shadow-xs'
                      : 'text-vault-dark/70 hover:text-vault-dark'
                    }`}
                >
                  Creations
                </button>
              </div>

              {/* Timeframe pill */}
              <div className="flex items-center gap-1 p-1 bg-vault-dark/5 rounded-full border border-vault-dark/10">
                {(['7d', '30d'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setGraphTimeframe(t)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${graphTimeframe === t
                        ? 'bg-vault-yellow text-vault-dark border border-vault-dark shadow-2xs'
                        : 'text-vault-dark/70 hover:text-vault-dark'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Graph Grid: Left Bar Chart + Right Category Velocity Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns: Visual Daily Bar Chart */}
            <div className="lg:col-span-2 bg-white/70 rounded-[22px] p-5 border-2 border-vault-dark/15 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between min-h-[36px]">
                <div className="flex items-center gap-4 text-xs font-bold font-sans">
                  {(graphMetric === 'both' || graphMetric === 'creations') && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-xs bg-vault-dark border border-vault-dark" />
                      <span>Vault Creations ({totalCreationsWeek.toLocaleString()})</span>
                    </div>
                  )}
                  {(graphMetric === 'both' || graphMetric === 'copies') && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-xs bg-vault-green border border-vault-dark" />
                      <span>Community Clones ({totalCopiesWeek.toLocaleString()})</span>
                    </div>
                  )}
                </div>

                {/* Stable Right Header Badge (Fixed height to prevent container layout reflow) */}
                <div className="h-8 flex items-center justify-end">
                  {hoveredItem ? (
                    <div className="flex items-center gap-2 font-mono text-xs font-bold bg-vault-yellow/50 border border-vault-dark/25 px-3 py-1 rounded-full shadow-2xs transition-all">
                      <span className="text-vault-dark font-extrabold">{hoveredItem.day}:</span>
                      {(graphMetric === 'both' || graphMetric === 'creations') && (
                        <span className="text-vault-dark">
                          {hoveredItem.creations.toLocaleString()} created
                        </span>
                      )}
                      {graphMetric === 'both' && <span className="text-vault-dark/30">·</span>}
                      {(graphMetric === 'both' || graphMetric === 'copies') && (
                        <span className="text-emerald-800 font-extrabold">
                          {hoveredItem.copies.toLocaleString()} copies
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="font-mono text-xs text-vault-dark/45 font-medium hidden sm:inline">
                      Hover day to inspect values
                    </span>
                  )}
                </div>
              </div>

              {/* Interactive Bar Chart Visualization with Container-level onMouseLeave to prevent boundary flicker */}
              <div
                onMouseLeave={() => setHoveredDay(null)}
                className="h-52 flex items-end justify-between gap-2 sm:gap-4 px-2 pt-6 pb-2 relative"
              >
                {WEEKLY_VELOCITY.map((item) => {
                  const maxCopies = 5500;
                  const creationHeight = (item.creations / maxCopies) * 100;
                  const copyHeight = (item.copies / maxCopies) * 100;
                  const isHovered = hoveredDay === item.day;

                  return (
                    <div
                      key={item.day}
                      onMouseEnter={() => setHoveredDay(item.day)}
                      className="flex-1 flex flex-col items-center gap-2 group h-full justify-end cursor-pointer relative"
                    >
                      {/* Floating exact value indicator directly above the hovered day bars */}
                      {isHovered && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-vault-dark text-vault-cream border border-vault-dark font-mono text-[10px] font-bold py-0.5 px-2 rounded-md shadow-md whitespace-nowrap z-20 flex items-center gap-1.5 pointer-events-none transition-opacity duration-150">
                          {(graphMetric === 'both' || graphMetric === 'creations') && (
                            <span className="text-vault-cream">{item.creations.toLocaleString()}</span>
                          )}
                          {graphMetric === 'both' && <span className="text-vault-cream/40">/</span>}
                          {(graphMetric === 'both' || graphMetric === 'copies') && (
                            <span className="text-vault-green">{item.copies.toLocaleString()}</span>
                          )}
                        </div>
                      )}

                      {/* Bar Group Container (Zero geometric transform to prevent border jitter) */}
                      <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-full">
                        {/* Creations Bar */}
                        {(graphMetric === 'both' || graphMetric === 'creations') && (
                          <div
                            style={{ height: `${creationHeight}%` }}
                            className={`w-full max-w-[16px] sm:max-w-[20px] bg-vault-dark rounded-t-sm transition-opacity duration-150 ${isHovered ? 'opacity-100 ring-2 ring-vault-dark/20' : 'opacity-80'
                              }`}
                            title={`${item.day}: ${item.creations} creations`}
                          />
                        )}

                        {/* Clones / Copies Bar */}
                        {(graphMetric === 'both' || graphMetric === 'copies') && (
                          <div
                            style={{ height: `${copyHeight}%` }}
                            className={`w-full max-w-[16px] sm:max-w-[20px] bg-vault-green border border-vault-dark rounded-t-sm transition-all duration-150 ${isHovered
                                ? 'brightness-110 shadow-xs ring-2 ring-vault-green/40'
                                : 'brightness-100'
                              }`}
                            title={`${item.day}: ${item.copies} clipboard clones`}
                          />
                        )}
                      </div>

                      {/* Day Label */}
                      <span
                        className={`font-mono text-xs font-bold transition-colors duration-150 ${isHovered ? 'text-vault-dark' : 'text-vault-dark/60'
                          }`}
                      >
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Meta Summary */}
              <div className="pt-3 border-t border-vault-dark/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-vault-dark/70 font-sans">
                <span>Peak clipboard copy velocity: Weekends (4,980 clones/day)</span>
                <span className="font-bold text-vault-dark">Net Fork Ratio: 4.8 clones per creation</span>
              </div>
            </div>

            {/* Right Column: Category Distribution & Live Insight */}
            <div className="bg-white/70 rounded-[22px] p-5 border-2 border-vault-dark/15 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-vault-dark/10">
                  <h3 className="font-serif text-xl text-vault-dark font-normal">
                    Category Share
                  </h3>
                  <span className="font-mono text-[11px] font-bold text-vault-dark/50">84.2k Total</span>
                </div>

                {/* Progress bars matching Prompt Vault design tokens */}
                <div className="space-y-3.5 pt-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Agent Skills &amp; Rules</span>
                      <span className="font-mono text-vault-dark">42% (35.3k)</span>
                    </div>
                    <div className="w-full h-2.5 bg-vault-dark/10 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-vault-green rounded-full" style={{ width: '42%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Frontend Architecture</span>
                      <span className="font-mono text-vault-dark">28% (23.5k)</span>
                    </div>
                    <div className="w-full h-2.5 bg-vault-dark/10 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-vault-yellow rounded-full border border-vault-dark/20" style={{ width: '28%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Backend &amp; APIs</span>
                      <span className="font-mono text-vault-dark">18% (15.1k)</span>
                    </div>
                    <div className="w-full h-2.5 bg-vault-dark/10 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-vault-dark rounded-full" style={{ width: '18%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Marketing &amp; Copy</span>
                      <span className="font-mono text-vault-dark">12% (10.3k)</span>
                    </div>
                    <div className="w-full h-2.5 bg-vault-dark/10 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: '12%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Logical Insight Callout Box */}
              <div className="bg-vault-yellow/25 p-3 rounded-xl border border-vault-dark/15 text-xs text-vault-dark font-medium flex items-start gap-2">
                <Flame className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Insight:</strong> Agent Skills (<code>skill.md</code> rules) drove <strong>64%</strong> of all community clones this week.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TOP COMMUNITY TEMPLATES LEADERBOARD (Real Data That Prompt Vault Collects) */}
        <section className="bg-vault-cream rounded-[26px] p-5 sm:p-6 border-2 border-vault-dark/15 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-vault-dark/10">
            <div>
              <h2 className="font-serif text-2xl text-vault-dark font-normal">
                Top Cloned Community Templates
              </h2>
              <p className="font-sans text-xs text-vault-dark/60 font-medium">
                The most copied and saved prompt templates across the platform this week.
              </p>
            </div>

            <span className="font-mono text-xs font-bold text-vault-dark/60 bg-vault-dark/5 px-3 py-1 rounded-full border border-vault-dark/10 self-start sm:self-auto">
              Real-time Leaderboard
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-vault-dark/10 font-sans text-[11px] font-bold uppercase tracking-wider text-vault-dark/50">
                  <th className="py-3 px-4">Rank &amp; Template</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4 text-right">Copies Won</th>
                  <th className="py-3 px-4 text-right">Upvotes</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vault-dark/10 font-sans text-xs">
                {TOP_LEADERBOARD_PROMPTS.map((item) => (
                  <tr key={item.id} className="hover:bg-vault-dark/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-vault-dark max-w-sm">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-extrabold shrink-0 border ${item.rank === 1
                              ? 'bg-vault-yellow text-vault-dark border-vault-dark'
                              : item.rank === 2
                                ? 'bg-vault-cream text-vault-dark border-vault-dark/30'
                                : 'bg-vault-dark/5 text-vault-dark/70 border-vault-dark/10'
                            }`}
                        >
                          {item.rank}
                        </span>
                        <div className="min-w-0">
                          <div className="truncate font-serif text-base text-vault-dark font-normal">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-vault-dark/60 font-sans truncate line-clamp-1">
                            {item.promptText}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider bg-vault-yellow/40 text-vault-dark border border-vault-dark/15">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.authorAvatar}
                          alt={item.author}
                          className="w-5 h-5 rounded-full border border-vault-dark/20 object-cover"
                        />
                        <span className="font-semibold text-vault-dark">{item.author}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-vault-green text-sm">
                      {item.clones.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-vault-dark/80">
                      {item.likes.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleCopyPrompt(item.id, item.promptText, item.title)}
                        className={`px-3 py-1 rounded-full font-sans text-xs font-semibold border transition-all cursor-pointer inline-flex items-center gap-1 ${copiedLeaderboardId === item.id
                            ? 'bg-vault-green text-vault-dark border-vault-dark font-bold'
                            : 'bg-vault-cream hover:bg-vault-yellow/40 text-vault-dark border-vault-dark/20'
                          }`}
                      >
                        {copiedLeaderboardId === item.id ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Creator Directory Table (Matching DashboardCommunityTable.tsx) */}
        <section className="bg-vault-cream rounded-[26px] p-5 sm:p-6 border-2 border-vault-dark/15 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-vault-dark/10">
            <div>
              <h2 className="font-serif text-2xl text-vault-dark font-normal">
                Platform Creators
              </h2>
              <p className="font-sans text-xs text-vault-dark/60 font-medium">
                Registered authors, membership tiers, and platform permissions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-48 sm:w-64">
                <Search className="w-3.5 h-3.5 text-vault-dark/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search creator..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-full bg-vault-cream border border-vault-dark/20 text-xs font-medium focus:outline-none focus:border-vault-dark"
                />
              </div>

              <button
                type="button"
                onClick={() => showToast('Creator filter options applied.', 'info', 'Filters')}
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
                  <th className="py-3 px-4">Creator</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Joined</th>
                  <th className="py-3 px-4 text-right">Prompts</th>
                  <th className="py-3 px-4 text-right">Clones Won</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vault-dark/10 font-sans text-xs">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-vault-dark/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-vault-dark max-w-xs">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-7 h-7 rounded-full border border-vault-dark/20 object-cover bg-vault-yellow/30"
                        />
                        <div>
                          <div className="font-bold text-vault-dark leading-snug">{user.name}</div>
                          <div className="text-[11px] text-vault-dark/50 font-mono">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[10px] font-extrabold border ${user.tier === 'Enterprise'
                            ? 'bg-vault-dark text-vault-cream border-vault-dark'
                            : user.tier === 'Pro'
                              ? 'bg-vault-green/20 text-vault-dark border-vault-green'
                              : 'bg-vault-dark/5 text-vault-dark/70 border-vault-dark/15'
                          }`}
                      >
                        {user.tier}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${user.status === 'Active'
                            ? 'bg-vault-green/20 text-vault-dark border-vault-green'
                            : 'bg-rose-100 text-rose-800 border-rose-300'
                          }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-vault-green' : 'bg-rose-600'
                            }`}
                        />
                        {user.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-vault-dark/60 font-mono">
                      {user.joinedDate}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-vault-dark">
                      {user.promptsCount}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-vault-green">
                      {user.clonesCount}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleToggleUserStatus(user.id)}
                        className={`px-3 py-1 rounded-full font-sans text-xs font-semibold border transition-colors cursor-pointer ${user.status === 'Active'
                            ? 'border-vault-dark/20 text-vault-dark/80 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300'
                            : 'border-vault-dark text-vault-dark hover:bg-vault-yellow'
                          }`}
                      >
                        {user.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
