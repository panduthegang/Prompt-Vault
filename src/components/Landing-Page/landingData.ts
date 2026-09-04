// ==========================================================================
// PROMPT VAULT — LANDING PAGE DATA ARCHITECTURE
// Centralized TypeScript models, constants, and datasets for Landing Page
// ==========================================================================

// --------------------------------------------------------------------------
// 1. HERO SECTION DATA
// --------------------------------------------------------------------------
export interface HeroReviewer {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface HeroData {
  rating: string;
  ratingText: string;
  reviewers: HeroReviewer[];
  headline: {
    line1: string;
    line2: string;
    italicLine: string;
  };
  subtitle: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  visualImage: string;
}

export const HERO_DATA: HeroData = {
  rating: '★★★★★',
  ratingText: 'Rated 4.9 / 5 by 4,900+ builders',
  reviewers: [
    {
      id: 'rev-1',
      name: 'Builder Avatar 1',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'rev-2',
      name: 'Builder Avatar 2',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'rev-3',
      name: 'Builder Avatar 3',
      avatarUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    },
  ],
  headline: {
    line1: 'YOU DESERVE TO',
    line2: 'SAVE WHAT',
    italicLine: 'INSPIRES YOU',
  },
  subtitle:
    'We know what it feels like to lose game-changing prompts — the messy notes, the lost bookmarks, the forgotten AI workflows. At Prompt Vault, our only job is to give you instant access to your best creative genius, safely and permanently.',
  primaryCtaText: 'Get Started Free',
  secondaryCtaText: 'See How It Works',
  visualImage: 'https://prompt-vault-by-harsh.vercel.app/Hero.png',
};


// --------------------------------------------------------------------------
// 2. STATS SECTION DATA
// --------------------------------------------------------------------------
export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export const STATS_DATA: StatItem[] = [
  {
    id: 'stat-prompts-saved',
    value: '12,000+',
    label: 'Prompts Saved',
  },
  {
    id: 'stat-user-satisfaction',
    value: '98%',
    label: 'User Satisfaction',
  },
  {
    id: 'stat-skills-shared',
    value: '500+',
    label: 'Skill Files Shared',
  },
  {
    id: 'stat-active-vaults',
    value: '3,200+',
    label: 'Active Vaults',
  },
];


// --------------------------------------------------------------------------
// 3. PROCESS ("HOW IT WORKS") DATA
// --------------------------------------------------------------------------
export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Save in One Click — No Friction',
    description:
      'Drop in a link, a prompt, or a skill.md file the moment you find it — no folders to set up first, no friction.',
  },
  {
    step: '02',
    title: 'Your Personalised Vault',
    description:
      'Organize by project, topic, or tool. Prompt Vault adapts to how you think, not the other way around.',
  },
  {
    step: '03',
    title: 'Instant Search — Always Fast',
    description:
      'Full-text search across every saved prompt and file means nothing you save ever gets lost in the scroll again.',
  },
  {
    step: '04',
    title: 'Reuse That Never Stops',
    description:
      'Copy, export, or share straight from your vault — into your editor, your team, or your next project.',
  },
];


// --------------------------------------------------------------------------
// 4. COMPARISON ("WHY PROMPT VAULT") DATA
// --------------------------------------------------------------------------
export const OLD_WAY_POINTS: string[] = [
  'Scattered across Notion pages, Apple Notes, Slack DMs, and browser bookmarks.',
  'Manual copy-pasting required; parameter variables ({{inputs}}) must be edited manually.',
  'No model-specific compatibility indicators (Claude 3.7, GPT-4o, DeepSeek, Cursor).',
  'Cannot parse, validate, or export structured skill.md or agent rules.',
  'Average 12–15 minutes wasted per day digging for past prompt gems.',
];

export const VAULT_WAY_POINTS: string[] = [
  'Unified, beautifully indexed repository with 1-click clipboard integration.',
  'Live variable replacement ({{variable}}) injects values directly into output prompts.',
  'Instant filtering by model compatibility, token cost, and use-case categories.',
  'Native skill.md preview, frontmatter linting, and local workspace sync.',
  'Lightning-fast fuzzy search retrieves any prompt or rule in under 10ms.',
];


// --------------------------------------------------------------------------
// 5. FAQ SECTION DATA
// --------------------------------------------------------------------------
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Does Prompt Vault work with all AI models and tools?',
    answer:
      'Yes, Prompt Vault is completely model-agnostic. Whether you craft system prompts for Claude 3.7 Sonnet, OpenAI o3/GPT-4o, Cursor IDE rules, Midjourney parameters, or AGY skill.md workflows, your templates are stored with full fidelity, markdown syntax, and variable placeholders.',
    category: 'Compatibility',
  },
  {
    id: 'faq-2',
    question: 'How long before I see real improvements in my AI workflow?',
    answer:
      'Immediately. From your very first day, you stop wasting 10–15 minutes digging through past chats, lost Slack messages, or chaotic notepad files. One-click search and fast copy-paste mean your best ideas are always at your fingertips.',
    category: 'Productivity',
  },
  {
    id: 'faq-3',
    question: 'Can I export my prompts and skill.md files locally?',
    answer:
      'Instantly. You can export individual prompts, raw markdown skill files, or your entire collection as JSON and Markdown bundles. You can also sync directly with your local workspace and .agents/skills directories.',
    category: 'Export & Sync',
  },
  {
    id: 'faq-4',
    question: 'Is my vault private, secure, and never trained on?',
    answer:
      '100% private and protected. We believe in complete honesty and data sovereignty. Your private prompts and proprietary workflows belong solely to you, are encrypted at rest and in transit, and are never used to train third-party AI models.',
    category: 'Privacy & Security',
  },
  {
    id: 'faq-5',
    question: 'What is the difference between Prompt Vault and standard note apps?',
    answer:
      'Standard notes lack prompt-specific features like variable replacement ({topic}, {role}), model tags, one-click copy with formatted parameters, skill frontmatter support, and instant developer workflow integration.',
    category: 'Comparison',
  },
  {
    id: 'faq-6',
    question: 'How much does Prompt Vault cost?',
    answer:
      'Prompt Vault is 100% free to start for individual creators and builders with unlimited local saving. For teams and power users requiring real-time cross-device cloud sync and collaborative vaults, Pro plans are just $9/month with zero hidden fees.',
    category: 'Pricing',
  },
];
