import { Users, Bookmark, Sparkles, Flame } from 'lucide-react';
import { SelectOption } from '../../ui/Select';

// ============================================================================
// DATA MODELS & TYPES (Clean View-Only — No Tier, Status, or Roles)
// ============================================================================

export interface RecentPrompt {
  title: string;
  category: string;
  clones: number;
}

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
  recentPrompts?: RecentPrompt[];
}

export interface AdminUsersMetrics {
  totalCreators: number;
  totalPrompts: number;
  totalClones: number;
  totalUpvotes: number;
}

// Master mock dataset of platform creators and authors
export const INITIAL_USERS: AdminUser[] = [
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

// Rich sorting options utilizing CustomSelect component
export const SORT_OPTIONS: SelectOption[] = [
  {
    value: 'clones',
    label: 'Sort: Most Clones',
    badge: 'Popular',
    icon: Bookmark,
  },
  {
    value: 'prompts',
    label: 'Sort: Most Prompts',
    badge: 'Content',
    icon: Sparkles,
  },
  {
    value: 'upvotes',
    label: 'Sort: Most Upvotes',
    badge: 'Top Rated',
    icon: Flame,
  },
  {
    value: 'recent',
    label: 'Sort: Newest Members',
    badge: 'Recent',
    icon: Users,
  },
  {
    value: 'name',
    label: 'Sort: Name (A-Z)',
    badge: 'A-Z',
  },
];
