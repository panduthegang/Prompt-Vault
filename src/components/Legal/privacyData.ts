import { LucideIcon, Sparkles, Database, Lock, Trash2 } from 'lucide-react';

export interface PrivacyClause {
  id: string;
  number: string;
  title: string;
  category: 'Data Storage' | 'Your Privacy' | 'Future Sync' | 'Ownership';
  tldr: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuaranteeCard {
  icon: LucideIcon;
  number: string;
  label: string;
  desc: string;
}

export const PRIVACY_CLAUSES: PrivacyClause[] = [
  {
    id: 'what-we-collect',
    number: '01',
    title: 'What Information Gets Saved',
    category: 'Data Storage',
    tldr: 'Only what you choose to add: your saved AI prompts, prompt tags, bookmark URLs, and notes. Nothing else.',
    paragraphs: [
      'Prompt Vault was created out of a personal need: going through hundreds of AI prompts, websites, and underrated tools every day and needing a single, fast place to save and organize them.',
      'We only store the actual content you input — prompt text, titles, category tags, website URLs, and custom skill snippets. We do not track your browsing history or spy on other tabs.',
    ],
    bullets: [
      'Your prompt titles, descriptions, and tag labels',
      'Saved tool bookmarks and website links',
      'Your basic account info (when logging in with email)',
    ],
  },
  {
    id: 'how-data-stored',
    number: '02',
    title: 'How It Is Stored & Future Supabase Sync',
    category: 'Future Sync',
    tldr: 'Currently stored in your local browser. In future updates, cloud sync will use secure Supabase databases with encrypted connections.',
    paragraphs: [
      'Right now, your preferences and local collections live right inside your browser session for instant speed.',
      'For multi-device sync and cloud backup, we are integrating Supabase — a modern, secure database platform with row-level security and encrypted transmission. Your records will be tied securely to your personal account only.',
    ],
    bullets: [
      'Fast client-side caching for instant lookup',
      'Future cloud database powered by Supabase with Row-Level Security',
      'Encrypted connections over HTTPS / TLS',
    ],
  },
  {
    id: 'no-selling-no-scraping',
    number: '03',
    title: 'Zero Selling & No AI Training On Your Prompts',
    category: 'Your Privacy',
    tldr: 'We never sell your curated prompt collection, tool links, or email to third-party brokers or advertisers.',
    paragraphs: [
      'Your vault is your personal collection. We have zero interest in selling user data, displaying spammy banner ads, or feeding your private prompt templates to AI models.',
      'What you save in Prompt Vault stays strictly yours.',
    ],
    bullets: [
      'No data brokerage or selling of email lists',
      'No third-party advertising cookies',
      'Your prompts remain private to your account',
    ],
  },
  {
    id: 'export-delete',
    number: '04',
    title: 'Export Anytime & Instant Deletion',
    category: 'Ownership',
    tldr: 'You can export your saved prompts and tool bookmarks anytime, or delete your account with one click.',
    paragraphs: [
      'You are never locked in. You can export your saved prompts and bookmarks to open formats whenever you want.',
      'If you ever want to leave, you can wipe your saved items or delete your account with no questions asked.',
    ],
    bullets: [
      'Export prompt collections to Markdown or JSON',
      'Instant local cache wipe option',
      'Complete account removal with zero leftover baggage',
    ],
  },
];

export const GUARANTEE_CARDS: GuaranteeCard[] = [
  {
    icon: Sparkles,
    number: '100%',
    label: 'Yours To Keep',
    desc: 'You own every prompt, tool bookmark, and note you save in the vault.',
  },
  {
    icon: Database,
    number: 'SUPABASE',
    label: 'Future Cloud Sync',
    desc: 'Secure cloud auth and database storage powered by Supabase for easy sync.',
  },
  {
    icon: Lock,
    number: '0% SPAM',
    label: 'No Selling Data',
    desc: 'No ad trackers, no selling your email, and no feeding prompts to third parties.',
  },
  {
    icon: Trash2,
    number: '1-CLICK',
    label: 'Easy Export & Wipe',
    desc: 'Export your bookmarks anytime or clear your data whenever you wish.',
  },
];
