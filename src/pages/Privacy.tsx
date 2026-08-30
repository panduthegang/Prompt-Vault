import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Eye,
  ArrowUpRight,
  Sparkles,
  Database,
  Trash2,
  CheckCircle2,
  ChevronRight,
  Heart
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface PrivacyClause {
  id: string;
  number: string;
  title: string;
  category: 'Data Storage' | 'Your Privacy' | 'Future Sync' | 'Ownership';
  tldr: string;
  paragraphs: string[];
  bullets?: string[];
}

const PRIVACY_CLAUSES: PrivacyClause[] = [
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

const GUARANTEE_CARDS = [
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

export default function Privacy() {
  const [openClauses, setOpenClauses] = useState<Record<string, boolean>>({
    'what-we-collect': true,
    'how-data-stored': true,
    'no-selling-no-scraping': false,
    'export-delete': false,
  });

  const toggleClause = (id: string) => {
    setOpenClauses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    PRIVACY_CLAUSES.forEach((c) => {
      allOpen[c.id] = true;
    });
    setOpenClauses(allOpen);
  };

  const collapseAll = () => {
    setOpenClauses({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen bg-vault-cream flex flex-col selection:bg-vault-green selection:text-vault-dark"
    >
      <Navbar />

      <main className="flex-1 w-full">
        {/* Top Sticky Sub-Header / Segmented Switcher */}
        <div className="w-full bg-vault-yellow/40 border-b-2 border-vault-dark py-3 px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-sans font-semibold">
            {/* Breadcrumb path */}
            <div className="flex items-center gap-2 text-vault-dark/70">
              <Link to="/" className="hover:text-vault-dark transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-vault-dark">Legal &amp; Privacy</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-vault-dark bg-vault-yellow px-2 py-0.5 rounded-md border border-vault-dark font-bold">
                Privacy Policy
              </span>
            </div>

            {/* Document Switcher Tabs */}
            <div className="inline-flex items-center p-1 bg-vault-cream border-2 border-vault-dark rounded-full shadow-xs">
              <Link
                to="/privacy"
                className="px-3.5 sm:px-4 py-1 rounded-full bg-vault-dark text-vault-cream text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-vault-green" />
                <span>Privacy Policy</span>
              </Link>
              <Link
                to="/terms"
                className="px-3.5 sm:px-4 py-1 rounded-full text-vault-dark hover:bg-vault-yellow/70 text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <span>Terms &amp; Conditions</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="w-full bg-vault-cream border-b-2 border-vault-dark px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              {/* Left Column: Headline */}
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vault-yellow border-2 border-vault-dark text-vault-dark font-sans text-xs font-bold tracking-wider uppercase shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-vault-dark fill-vault-green" />
                  <span>HONEST &amp; SHORT PRIVACY</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] leading-[0.92] tracking-tight text-vault-dark font-normal uppercase">
                  <span className="block">SAVE WHAT INSPIRES YOU.</span>
                  <span className="block italic text-vault-darker">NO TRACKING. NO NONSENSE.</span>
                </h1>

                <p className="font-sans text-sm sm:text-base md:text-lg text-vault-dark/80 max-w-2xl leading-relaxed pt-2">
                  Prompt Vault was built by a creator for creators — to easily save, organize, and find the prompts and underrated tools we discover daily. Here is our simple privacy policy with zero legalese.
                </p>
              </div>

              {/* Right Column: Key Meta Badge Card */}
              <div className="lg:col-span-4 bg-vault-yellow border-2 border-vault-dark rounded-2xl p-5 sm:p-6 space-y-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-vault-dark/20 pb-3">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                    Quick Summary
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold bg-vault-green text-vault-dark border border-vault-dark px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    SIMPLE &amp; CLEAR
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm font-sans text-vault-dark">
                  <div className="flex items-center justify-between">
                    <span className="text-vault-dark/70">Project:</span>
                    <span className="font-semibold">Prompt Vault</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-vault-dark/70">Created By:</span>
                    <span className="font-semibold">Harsh Rathod</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-vault-dark/70">Database:</span>
                    <span className="font-semibold">Supabase (Upcoming)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-vault-dark/70">Data Policy:</span>
                    <span className="font-semibold">100% User Owned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Guarantees Matrix */}
        <section className="w-full bg-vault-yellow border-b-2 border-vault-dark py-10 sm:py-12 px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {GUARANTEE_CARDS.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-vault-cream border-2 border-vault-dark rounded-2xl p-5 flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-vault-yellow border-2 border-vault-dark flex items-center justify-center text-vault-dark">
                      <card.icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="font-serif text-2xl sm:text-3xl text-vault-green font-bold tracking-tight">
                      {card.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-bold text-vault-dark uppercase tracking-tight">
                      {card.label}
                    </h3>
                    <p className="font-sans text-xs text-vault-dark/75 leading-relaxed pt-1">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content: Clean 2-Column Layout */}
        <section className="w-full bg-vault-cream px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Sticky Table of Contents & Creator Card */}
              <div className="hidden lg:flex lg:col-span-4 flex-col space-y-6 sticky top-8">
                {/* Table of Contents */}
                <div className="bg-vault-cream border-2 border-vault-dark rounded-2xl p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-vault-dark/15 pb-3">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-vault-dark">
                      Quick Index
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={expandAll}
                        className="text-[11px] font-sans font-bold text-vault-dark/70 hover:text-vault-dark bg-vault-yellow px-2 py-0.5 rounded border border-vault-dark/30 transition-colors cursor-pointer"
                      >
                        Expand All
                      </button>
                      <button
                        type="button"
                        onClick={collapseAll}
                        className="text-[11px] font-sans font-bold text-vault-dark/70 hover:text-vault-dark bg-vault-cream hover:bg-vault-yellow/50 px-2 py-0.5 rounded border border-vault-dark/30 transition-colors cursor-pointer"
                      >
                        Collapse
                      </button>
                    </div>
                  </div>

                  <nav className="space-y-1.5">
                    {PRIVACY_CLAUSES.map((clause) => {
                      const isOpen = openClauses[clause.id];
                      return (
                        <button
                          key={clause.id}
                          type="button"
                          onClick={() => {
                            setOpenClauses((prev) => ({ ...prev, [clause.id]: true }));
                            const el = document.getElementById(clause.id);
                            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-sans font-semibold flex items-center justify-between transition-all cursor-pointer border ${
                            isOpen
                              ? 'bg-vault-yellow border-vault-dark text-vault-dark shadow-xs'
                              : 'bg-transparent border-transparent text-vault-dark/70 hover:bg-vault-yellow/40 hover:text-vault-dark'
                          }`}
                        >
                          <span className="truncate pr-2">
                            <span className="font-serif font-normal mr-1.5 text-sm">{clause.number}.</span>
                            {clause.title}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-vault-dark/60 bg-vault-cream px-1.5 py-0.5 rounded border border-vault-dark/20 shrink-0">
                            {clause.category}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Creator Card */}
                <div className="bg-vault-dark text-vault-cream border-2 border-vault-dark rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="w-9 h-9 rounded-full bg-vault-yellow text-vault-dark flex items-center justify-center font-bold">
                    <Heart className="w-5 h-5 fill-vault-dark" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-serif text-xl sm:text-2xl text-vault-cream font-normal uppercase leading-tight">
                      BUILT BY HARSH
                    </h4>
                    <p className="font-sans text-xs text-vault-cream/75 leading-relaxed">
                      Have questions, suggestions, or want to say hi? Connect directly with the creator.
                    </p>
                  </div>

                  <a
                    href="https://harshrathod-portfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex w-full items-stretch cursor-pointer select-none active:scale-[0.97] transition-transform duration-200"
                  >
                    <span className="relative z-10 flex-1 inline-flex items-center justify-center bg-vault-green text-vault-dark border border-vault-dark rounded-full px-4 py-2 font-sans font-bold text-xs tracking-tight shadow-xs group-hover:brightness-[1.03] transition-all duration-300">
                      Harsh Rathod Portfolio
                    </span>
                    <span className="relative -ml-4 z-0 inline-flex items-center justify-center bg-vault-darker text-vault-green border border-vault-dark rounded-r-full pl-5 pr-3 max-w-0 opacity-0 -translate-x-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[54px] group-hover:opacity-100 group-hover:translate-x-0 overflow-hidden">
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </div>
              </div>

              {/* Right Column: Stacked Interactive Clauses */}
              <div className="lg:col-span-8 space-y-5">
                {PRIVACY_CLAUSES.map((clause) => {
                  const isOpen = openClauses[clause.id];
                  return (
                    <article
                      key={clause.id}
                      id={clause.id}
                      className={`w-full bg-vault-cream border-2 border-vault-dark rounded-[22px] transition-all duration-300 overflow-hidden ${
                        isOpen ? 'shadow-md ring-2 ring-vault-dark/10' : 'hover:border-vault-dark/80 hover:bg-vault-cream/95'
                      }`}
                    >
                      {/* Interactive Clause Header */}
                      <button
                        type="button"
                        onClick={() => toggleClause(clause.id)}
                        aria-expanded={isOpen}
                        className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none group"
                      >
                        <div className="space-y-1.5 flex-1 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-lg sm:text-xl font-bold text-vault-green bg-vault-dark px-2 py-0.5 rounded-md">
                              {clause.number}
                            </span>
                            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-vault-dark/60 bg-vault-yellow px-2 py-0.5 rounded border border-vault-dark/20">
                              {clause.category}
                            </span>
                          </div>
                          <h2 className="font-serif text-xl sm:text-2xl md:text-[26px] text-vault-dark font-normal leading-snug tracking-tight group-hover:text-vault-darker transition-colors pt-1">
                            {clause.title}
                          </h2>
                        </div>

                        {/* Eye Icon Circle Indicator */}
                        <div
                          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full shrink-0 flex items-center justify-center border-2 border-vault-dark transition-all duration-300 mt-1 ${
                            isOpen
                              ? 'bg-vault-green text-vault-dark shadow-xs scale-105'
                              : 'bg-vault-dark text-vault-green group-hover:scale-105'
                          }`}
                          aria-hidden="true"
                        >
                          {isOpen ? (
                            <Eye className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2] transition-transform duration-300" />
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-vault-green transition-transform duration-300"
                            >
                              <path d="M3 11c3 3.8 6 5.5 9 5.5s6-1.7 9-5.5" />
                              <path d="M6 14.5l-1.5 2" />
                              <path d="M12 16.5v2.5" />
                              <path d="M18 14.5l1.5 2" />
                            </svg>
                          )}
                        </div>
                      </button>

                      {/* Always-visible Plain English Summary Banner */}
                      <div className="px-5 sm:px-6 pb-4">
                        <div className="bg-vault-yellow border-2 border-vault-dark rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm font-sans text-vault-dark leading-relaxed flex items-start gap-3">
                          <span className="bg-vault-dark text-vault-green font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shrink-0 mt-0.5">
                            SUMMARY
                          </span>
                          <span className="font-medium">{clause.tldr}</span>
                        </div>
                      </div>

                      {/* Expandable Content Drawer */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-vault-dark/15 mt-2 space-y-3">
                            {clause.paragraphs.map((p, pIdx) => (
                              <p
                                key={pIdx}
                                className="font-sans text-xs sm:text-sm text-vault-dark/80 leading-relaxed"
                              >
                                {p}
                              </p>
                            ))}
                            {clause.bullets && (
                              <ul className="space-y-1.5 pt-1 pl-2">
                                {clause.bullets.map((b, bIdx) => (
                                  <li
                                    key={bIdx}
                                    className="font-sans text-xs sm:text-sm text-vault-dark/85 flex items-start gap-2"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-vault-green shrink-0 mt-0.5" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Callout Section */}
        <section className="w-full bg-vault-yellow border-t-2 border-vault-dark px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-vault-dark/70 block">
              Prompt Vault Philosophy
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-vault-dark font-normal uppercase leading-[0.95]">
              BUILT FOR CREATORS WHO REFUSE TO <span className="italic">LOSE INSPIRATION.</span>
            </h3>
            <p className="font-sans text-xs sm:text-sm md:text-base text-vault-dark/80 max-w-2xl mx-auto leading-relaxed">
              Never dig through lost chat logs or messy notepad files again. Save your favorite prompts and tools in one clean, beautiful home.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/signup"
                className="group relative inline-flex items-stretch cursor-pointer select-none active:scale-[0.97] transition-transform duration-200"
              >
                <span className="relative z-10 inline-flex items-center justify-center bg-vault-green text-vault-dark border border-vault-dark rounded-full px-6 py-2.5 font-sans font-bold text-xs sm:text-sm tracking-tight shadow-xs group-hover:brightness-[1.03] transition-all duration-300">
                  Start Saving Prompts
                </span>
                <span className="relative -ml-6 z-0 inline-flex items-center justify-center bg-vault-darker text-vault-green border border-vault-dark rounded-r-full pl-7 pr-3.5 max-w-0 opacity-0 -translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[68px] group-hover:opacity-100 group-hover:translate-x-0 overflow-hidden">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105" />
                </span>
              </Link>

              <Link
                to="/terms"
                className="inline-flex items-center justify-center bg-transparent border-2 border-vault-dark text-vault-dark font-sans font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full hover:bg-vault-dark hover:text-vault-cream active:scale-[0.97] transition-all duration-300"
              >
                <span>Read Terms &amp; Conditions</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}
