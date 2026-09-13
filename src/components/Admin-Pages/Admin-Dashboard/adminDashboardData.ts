// ==========================================
// TYPES & DATA FOR ADMIN DASHBOARD
// ==========================================

export interface AdminUserItem {
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

export interface TopPromptLeaderboardItem {
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

export interface WeeklyVelocityItem {
  day: string;
  creations: number;
  copies: number;
}

export interface CategoryShareItem {
  name: string;
  percentage: number;
  count: string;
  colorClass: string;
}

export const INITIAL_ADMIN_USERS: AdminUserItem[] = [
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

export const TOP_LEADERBOARD_PROMPTS: TopPromptLeaderboardItem[] = [
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
export const WEEKLY_VELOCITY: WeeklyVelocityItem[] = [
  { day: 'Mon', creations: 380, copies: 1640 },
  { day: 'Tue', creations: 490, copies: 2180 },
  { day: 'Wed', creations: 620, copies: 2940 },
  { day: 'Thu', creations: 580, copies: 2610 },
  { day: 'Fri', creations: 840, copies: 3790 },
  { day: 'Sat', creations: 910, copies: 4320 },
  { day: 'Sun', creations: 1050, copies: 4980 },
];

export const CATEGORY_SHARE_ITEMS: CategoryShareItem[] = [
  {
    name: 'Agent Skills & Rules',
    percentage: 42,
    count: '35.3k',
    colorClass: 'bg-vault-green',
  },
  {
    name: 'Frontend Architecture',
    percentage: 28,
    count: '23.5k',
    colorClass: 'bg-vault-yellow border border-vault-dark/20',
  },
  {
    name: 'Backend & APIs',
    percentage: 18,
    count: '15.1k',
    colorClass: 'bg-vault-dark',
  },
  {
    name: 'Marketing & Copy',
    percentage: 12,
    count: '10.3k',
    colorClass: 'bg-amber-400',
  },
];
