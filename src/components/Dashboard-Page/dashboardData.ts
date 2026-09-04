// ==========================================
// TYPES & INITIAL DATA FOR DASHBOARD
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

export const DASHBOARD_CATEGORY_TAGS = [
  'All',
  'Agent Skills',
  'Frontend',
  'Backend',
  'Marketing',
  'Design Systems',
] as const;

export const INITIAL_PROMPTS: PromptItem[] = [
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

export const COMMUNITY_PROMPTS: CommunityItem[] = [
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
