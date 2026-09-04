import {
  Terminal,
  Sparkles,
  Layers,
  Compass,
  Cpu,
  FileCode,
  Code2,
  Server,
  BookOpen,
  Wrench,
  Brain,
  Megaphone,
  Database,
} from 'lucide-react';
import { SelectOption } from '../ui/Select';

export type VaultItemType = 'prompt' | 'skill' | 'website';

export interface VaultItem {
  id: string;
  type: VaultItemType;
  title: string;
  category: string;
  content: string;
  url?: string;
  tool?: string;
  timestamp: string;
  isStarred: boolean;
  isPublished?: boolean;
}

export const STORAGE_KEY = 'prompt_vault_user_saved_items';

export const INITIAL_VAULT_ITEMS: VaultItem[] = [
  // 1. Prompts
  {
    id: 'vault-p1',
    type: 'prompt',
    title: 'Autonomous Refactoring Skill Rule',
    category: 'Agent Skills',
    content:
      'Always inspect existing code structures and imports before writing new utilities. Preserve existing API signatures, prevent regressions, and run automated test verification before completion.',
    timestamp: 'Saved 2h ago',
    isStarred: true,
    isPublished: true,
  },
  {
    id: 'vault-p2',
    type: 'prompt',
    title: 'React 18 + Tailwind v4 Design Architect',
    category: 'Frontend',
    content:
      'You are an elite UI/UX designer and frontend engineer. Generate sleek, high-contrast layouts using Neo-brutalist tokens, spring physics, dynamic responsive grids, and zero generic styling.',
    timestamp: 'Saved 1d ago',
    isStarred: true,
  },
  {
    id: 'vault-p3',
    type: 'prompt',
    title: 'PostgreSQL Query Performance Optimizer',
    category: 'Backend',
    content:
      'Analyze query execution plans (EXPLAIN ANALYZE). Suggest composite indexing strategies, CTE restructuring, and N+1 query avoidance for high-throughput tables.',
    timestamp: 'Saved 3d ago',
    isStarred: false,
  },

  // 2. Skills
  {
    id: 'vault-s1',
    type: 'skill',
    title: 'Cursor Rules: Next.js App Router Architecture',
    category: 'IDE Rules',
    tool: 'Cursor',
    content:
      '# Next.js 14 App Router Rules\n- Use Server Components by default; opt-in to Client Components only for stateful interactivity.\n- Co-locate route handlers inside /api subdirectories.\n- Enforce strict typing with Zod schemas on all server actions.',
    timestamp: 'Saved 4d ago',
    isStarred: true,
    isPublished: true,
  },
  {
    id: 'vault-s2',
    type: 'skill',
    title: 'Claude 3.7 Reasoning & System Prompt Standards',
    category: 'Reasoning',
    tool: 'Claude',
    content:
      '# Claude 3.7 Reasoning Directives\n- Use structured thinking tags <thinking> before outputting final architectural decisions.\n- Break down multi-step calculations with clear verification benchmarks.\n- Keep explanations concise, practical, and devoid of repetitive filler.',
    timestamp: 'Saved 5d ago',
    isStarred: false,
  },
  {
    id: 'vault-s3',
    type: 'skill',
    title: 'Antigravity AGY Agent Customization Rule',
    category: 'Agent Skills',
    tool: 'Antigravity',
    content:
      '# AGY Customization Protocol\n- Discover skills from .agents/skills/<skill_name>/SKILL.md.\n- Always preserve comments and docstrings unrelated to current edits.\n- Link all code references with clickable Markdown file links.',
    timestamp: 'Saved 1w ago',
    isStarred: true,
  },

  // 3. Websites & Links
  {
    id: 'vault-w1',
    type: 'website',
    title: 'Anthropic Prompt Engineering Interactive Guide',
    category: 'AI Docs',
    url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
    content:
      'Official documentation on prompting Claude with chain-of-thought, XML tags, role-playing, and few-shot examples.',
    timestamp: 'Saved 2d ago',
    isStarred: true,
    isPublished: true,
  },
  {
    id: 'vault-w2',
    type: 'website',
    title: 'Cursor Directory: Best Curated Cursor Rules',
    category: 'Tools',
    url: 'https://cursor.directory',
    content:
      'Community directory of production-tested .cursorrules files for Next.js, Python, Rust, React, and Svelte.',
    timestamp: 'Saved 6d ago',
    isStarred: true,
  },
  {
    id: 'vault-w3',
    type: 'website',
    title: 'Tailwind CSS v4 Modern Styling Documentation',
    category: 'Frontend',
    url: 'https://tailwindcss.com/docs',
    content:
      'Complete reference for Tailwind v4 CSS configuration, theme variables, container queries, and utility classes.',
    timestamp: 'Saved 1w ago',
    isStarred: false,
  },
  {
    id: 'vault-w4',
    type: 'website',
    title: 'Vite Next Generation Frontend Tooling',
    category: 'DevOps',
    url: 'https://vite.dev/guide/',
    content:
      'Fast development server with instant HMR and Rollup-powered production bundling configuration guide.',
    timestamp: 'Saved 2w ago',
    isStarred: false,
  },
];

export function getStoredVaultItems(): VaultItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_VAULT_ITEMS));
    return INITIAL_VAULT_ITEMS;
  } catch {
    return INITIAL_VAULT_ITEMS;
  }
}

export function saveStoredVaultItems(items: VaultItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save vault items to localStorage', err);
  }
}

export const CATEGORY_PRESETS = [
  'All',
  'Agent Skills',
  'Frontend',
  'Backend',
  'IDE Rules',
  'AI Docs',
  'Tools',
  'DevOps',
  'Reasoning',
] as const;

export const TOOL_OPTIONS: SelectOption[] = [
  {
    value: 'Cursor',
    label: 'Cursor (.cursorrules)',
    icon: Terminal,
    badge: 'IDE',
    description: 'System rules for Cursor AI editor',
  },
  {
    value: 'Claude',
    label: 'Claude 3.7 / Anthropic',
    icon: Sparkles,
    badge: 'LLM',
    description: 'System prompts & reasoning guidelines',
  },
  {
    value: 'Antigravity',
    label: 'Google Antigravity (AGY)',
    icon: Layers,
    badge: 'Agent',
    description: 'Autonomous multi-agent skills & protocols',
  },
  {
    value: 'Windsurf',
    label: 'Windsurf / Cascade',
    icon: Compass,
    badge: 'IDE',
    description: 'Cascade workflow rules & instructions',
  },
  {
    value: 'GitHub Copilot',
    label: 'GitHub Copilot',
    icon: Cpu,
    badge: 'Assistant',
    description: 'Inline code assistant instructions',
  },
  {
    value: 'General IDE',
    label: 'General IDE Instructions',
    icon: FileCode,
    badge: 'Config',
    description: 'Editor-agnostic development instructions',
  },
];

export const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'Agent Skills', label: 'Agent Skills', icon: Layers, description: 'Autonomous agent protocols & workflows' },
  { value: 'Frontend', label: 'Frontend', icon: Code2, description: 'UI/UX, React, Tailwind & styling' },
  { value: 'Backend', label: 'Backend', icon: Server, description: 'APIs, database queries & microservices' },
  { value: 'IDE Rules', label: 'IDE Rules', icon: Terminal, description: 'Editor system prompts & config files' },
  { value: 'AI Docs', label: 'AI Docs', icon: BookOpen, description: 'Model guides, prompting docs & whitepapers' },
  { value: 'Tools', label: 'Tools', icon: Wrench, description: 'CLI utilities, linters & dev toolchains' },
  { value: 'DevOps', label: 'DevOps', icon: Database, description: 'CI/CD pipelines, Docker & cloud deployment' },
  { value: 'Reasoning', label: 'Reasoning', icon: Brain, description: 'Chain-of-thought & multi-step logic' },
  { value: 'Marketing', label: 'Marketing', icon: Megaphone, description: 'Copywriting, launch posts & positioning' },
];
