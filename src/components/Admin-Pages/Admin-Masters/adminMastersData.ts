import React from 'react';
import { Bookmark, FileCode, Globe } from 'lucide-react';

// ============================================================================
// TYPES & DATA FOR ADMIN CATEGORY MASTERS
// ============================================================================

export type MasterItemType = 'prompt' | 'skill' | 'website';

export interface MasterCategory {
  id: string;
  name: string;
  itemType: MasterItemType;
  description: string;
  itemCount: number;
  createdAt: string;
}

export const INITIAL_MASTER_CATEGORIES: MasterCategory[] = [
  // Prompt Categories
  {
    id: 'cat-p1',
    name: 'Agent Skills',
    itemType: 'prompt',
    description: 'Autonomous agent instructions, self-healing loops, and agentic workflows.',
    itemCount: 42,
    createdAt: 'Jan 14, 2026',
  },
  {
    id: 'cat-p2',
    name: 'Frontend & Architecture',
    itemType: 'prompt',
    description: 'React 19, Next.js App Router, Tailwind v4 design systems, and responsive components.',
    itemCount: 28,
    createdAt: 'Jan 16, 2026',
  },
  {
    id: 'cat-p3',
    name: 'Backend & Databases',
    itemType: 'prompt',
    description: 'RESTful APIs, PostgreSQL distributed locks, microservices, and database tuning.',
    itemCount: 19,
    createdAt: 'Jan 18, 2026',
  },
  {
    id: 'cat-p4',
    name: 'Marketing & Copy',
    itemType: 'prompt',
    description: 'Cold outbound emails, product launch threads, landing page copy, and SEO hooks.',
    itemCount: 14,
    createdAt: 'Feb 02, 2026',
  },

  // Skill Rule Categories
  {
    id: 'cat-s1',
    name: 'IDE Rules & Context',
    itemType: 'skill',
    description: '.cursorrules, windsurfrules, and editor-specific prompt envelopes.',
    itemCount: 35,
    createdAt: 'Feb 05, 2026',
  },
  {
    id: 'cat-s2',
    name: 'Reasoning & Directives',
    itemType: 'skill',
    description: 'Chain-of-thought directives, Claude thinking benchmarks, and verification rules.',
    itemCount: 16,
    createdAt: 'Feb 10, 2026',
  },
  {
    id: 'cat-s3',
    name: 'Security & Auth Directives',
    itemType: 'skill',
    description: 'Prompt injection defenses, API secret masking, and RBAC security invariants.',
    itemCount: 11,
    createdAt: 'Feb 15, 2026',
  },

  // Website Categories
  {
    id: 'cat-w1',
    name: 'AI Docs & Specifications',
    itemType: 'website',
    description: 'Official vendor documentation, model release papers, and API manuals.',
    itemCount: 22,
    createdAt: 'Feb 20, 2026',
  },
  {
    id: 'cat-w2',
    name: 'Developer Toolchains',
    itemType: 'website',
    description: 'Online REPLs, tokenizers, benchmarking suites, and CLI package directories.',
    itemCount: 18,
    createdAt: 'Feb 24, 2026',
  },
  {
    id: 'cat-w3',
    name: 'Design Systems & Inspiration',
    itemType: 'website',
    description: 'Curated design archives, typography showcases, and brutalist component galleries.',
    itemCount: 15,
    createdAt: 'Mar 01, 2026',
  },
];

export const STORAGE_KEY = 'prompt_vault_admin_master_categories';

export function getStoredCategories(): MasterCategory[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Error loading master categories', err);
  }
  return INITIAL_MASTER_CATEGORIES;
}

export function saveStoredCategories(categories: MasterCategory[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch (err) {
    console.error('Error saving master categories', err);
  }
}

export const TYPE_CONFIG: Record<
  MasterItemType,
  { label: string; singular: string; icon: React.ComponentType<{ className?: string }> }
> = {
  prompt: { label: 'Prompts', singular: 'Prompt', icon: Bookmark },
  skill: { label: 'Skill Rules', singular: 'Skill Rule', icon: FileCode },
  website: { label: 'Websites', singular: 'Website Bookmark', icon: Globe },
};
