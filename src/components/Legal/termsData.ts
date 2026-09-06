import { LucideIcon, Award, Sparkles, Database, CreditCard } from 'lucide-react';

export interface TermsClause {
  id: string;
  number: string;
  title: string;
  category: 'Platform Purpose' | 'Ownership' | 'Community Rules' | 'Future Updates';
  tldr: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface TermsMetric {
  icon: LucideIcon;
  value: string;
  title: string;
  desc: string;
}

export const TERMS_CLAUSES: TermsClause[] = [
  {
    id: 'platform-purpose',
    number: '01',
    title: 'What Prompt Vault Is Built For',
    category: 'Platform Purpose',
    tldr: 'A fast, distraction-free vault where you can bookmark and organize daily AI prompts, underrated tools, website discoveries, and custom skills.',
    paragraphs: [
      'Every day we come across dozens of incredible prompts, niche AI utilities, and underrated web tools — but bookmark bars and chaotic notepad files make finding them later impossible.',
      'Prompt Vault was created to solve this exact problem: providing a single, unified, beautiful repository to store, search, and access your best inspiration in seconds.',
    ],
    bullets: [
      'Organize AI prompts with variable tags and system instructions',
      'Bookmark underrated tools and websites you discover daily',
      'Instant search and one-click copy workflows',
    ],
  },
  {
    id: 'you-own-everything',
    number: '02',
    title: 'You Own 100% of What You Save',
    category: 'Ownership',
    tldr: 'You retain complete ownership over every prompt, note, tag, and tool bookmark you add. We claim zero rights over your creations.',
    paragraphs: [
      'Whatever you save into Prompt Vault remains entirely yours. We do not claim any copyright, intellectual property, or royalties over your prompt recipes, agent workflows, or notes.',
      'You are free to export, modify, share, or delete your saved collection whenever you want.',
    ],
    bullets: [
      'Full ownership of all prompt templates and custom skills',
      'Zero vendor lock-in — export your library anytime',
      'Your private notes and bookmarks stay private to you',
    ],
  },
  {
    id: 'common-sense-rules',
    number: '03',
    title: 'Common Sense & Fair Usage',
    category: 'Community Rules',
    tldr: 'Use the platform constructively. Do not attempt to spam, scrape maliciously, or attack our servers.',
    paragraphs: [
      'We keep our terms straightforward: treat the platform and other users with respect.',
      'Please do not abuse the service by running automated DDoS scripts, trying to breach server security, or uploading malicious exploit payloads.',
    ],
    bullets: [
      'No malicious automated attacks or server overload attempts',
      'No abusive or unlawful content distribution',
      'Keep your account credentials secure',
    ],
  },
  {
    id: 'future-updates-supabase',
    number: '04',
    title: 'Continuous Improvements & Supabase Sync',
    category: 'Future Updates',
    tldr: 'We are actively developing new features — including multi-device Supabase cloud sync, browser extensions, and enhanced export formats.',
    paragraphs: [
      'Prompt Vault is continuously improving based on community feedback. In upcoming releases, cloud database sync powered by Supabase will allow seamless syncing across all your phones, laptops, and browsers.',
      'We strive to maintain maximum reliability and speed as new features roll out.',
    ],
    bullets: [
      'Future Supabase integration for reliable cross-device sync',
      'Upcoming browser extension for 1-click tool bookmarking',
      'Community feature requests prioritized directly by the builder',
    ],
  },
];

export const TERMS_METRICS: TermsMetric[] = [
  {
    icon: Award,
    value: '100%',
    title: 'Content Ownership',
    desc: 'You own every prompt, note, and tool bookmark you save.',
  },
  {
    icon: Sparkles,
    value: 'FREE',
    title: 'Built For Creators',
    desc: 'Made to solve the daily struggle of losing great prompts and tools.',
  },
  {
    icon: Database,
    value: 'SUPABASE',
    title: 'Upcoming Cloud Sync',
    desc: 'Fast, secure database synchronization coming in future updates.',
  },
  {
    icon: CreditCard,
    value: '$0 TRAPS',
    title: 'Zero Hidden Catches',
    desc: 'Transparent, simple rules with no misleading fine print.',
  },
];
