import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Eye,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Database,
  Award,
  CreditCard,
  ChevronRight,
  Heart
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface TermsClause {
  id: string;
  number: string;
  title: string;
  category: 'Platform Purpose' | 'Ownership' | 'Community Rules' | 'Future Updates';
  tldr: string;
  paragraphs: string[];
  bullets?: string[];
}

const TERMS_CLAUSES: TermsClause[] = [
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

const TERMS_METRICS = [
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

export default function Terms() {
  const [openClauses, setOpenClauses] = useState<Record<string, boolean>>({
    'platform-purpose': true,
    'you-own-everything': true,
    'common-sense-rules': false,
    'future-updates-supabase': false,
  });

  const toggleClause = (id: string) => {
    setOpenClauses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    TERMS_CLAUSES.forEach((c) => {
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
              <span className="text-vault-dark">Legal &amp; Terms</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-vault-dark bg-vault-yellow px-2 py-0.5 rounded-md border border-vault-dark font-bold">
                Terms &amp; Conditions
              </span>
            </div>

            {/* Document Switcher Tabs */}
            <div className="inline-flex items-center p-1 bg-vault-cream border-2 border-vault-dark rounded-full shadow-xs">
              <Link
                to="/privacy"
                className="px-3.5 sm:px-4 py-1 rounded-full text-vault-dark hover:bg-vault-yellow/70 text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <span>Privacy Policy</span>
              </Link>
              <Link
                to="/terms"
                className="px-3.5 sm:px-4 py-1 rounded-full bg-vault-dark text-vault-cream text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-vault-green" />
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
                  <FileText className="w-4 h-4 text-vault-dark fill-vault-green" />
                  <span>SIMPLE &amp; FAIR TERMS</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] leading-[0.92] tracking-tight text-vault-dark font-normal uppercase">
                  <span className="block">CLEAR RULES FOR BUILDERS.</span>
                  <span className="block italic text-vault-darker">NO COMPLICATED TRAPS.</span>
                </h1>

                <p className="font-sans text-sm sm:text-base md:text-lg text-vault-dark/80 max-w-2xl leading-relaxed pt-2">
                  Prompt Vault is a space built to bookmark your favorite AI prompts, websites, and underrated tools. Our terms are short, transparent, and focused on respecting what you curate.
                </p>
              </div>

              {/* Right Column: Key Meta Badge Card */}
              <div className="lg:col-span-4 bg-vault-yellow border-2 border-vault-dark rounded-2xl p-5 sm:p-6 space-y-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-vault-dark/20 pb-3">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                    Agreement Overview
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold bg-vault-green text-vault-dark border border-vault-dark px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    CLEAR &amp; CONCISE
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm font-sans text-vault-dark">
                  <div className="flex items-center justify-between">
                    <span className="text-vault-dark/70">Platform:</span>
                    <span className="font-semibold">Prompt Vault</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-vault-dark/70">Target Audience:</span>
                    <span className="font-semibold">Creators &amp; Builders</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-vault-dark/70">Ownership:</span>
                    <span className="font-semibold">100% User Retained</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-vault-dark/70">Builder:</span>
                    <span className="font-semibold">Harsh Rathod</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars Matrix */}
        <section className="w-full bg-vault-yellow border-b-2 border-vault-dark py-10 sm:py-12 px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {TERMS_METRICS.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-vault-cream border-2 border-vault-dark rounded-2xl p-5 flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-vault-yellow border-2 border-vault-dark flex items-center justify-center text-vault-dark">
                      <card.icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="font-serif text-2xl sm:text-3xl text-vault-green font-bold tracking-tight">
                      {card.value}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-bold text-vault-dark uppercase tracking-tight">
                      {card.title}
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
                    {TERMS_CLAUSES.map((clause) => {
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
                      Building in public for creators and developers. Have ideas or feature requests?
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
                {TERMS_CLAUSES.map((clause) => {
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

                      {/* Always-visible Summary Banner */}
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
              Prompt Vault Community
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-vault-dark font-normal uppercase leading-[0.95]">
              CRAFTED FOR BUILDERS WHO <span className="italic">CREATE DAILY.</span>
            </h3>
            <p className="font-sans text-xs sm:text-sm md:text-base text-vault-dark/80 max-w-2xl mx-auto leading-relaxed">
              Join creators organizing their favorite AI prompts and bookmarking underrated web tools in one unified vault.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/signup"
                className="group relative inline-flex items-stretch cursor-pointer select-none active:scale-[0.97] transition-transform duration-200"
              >
                <span className="relative z-10 inline-flex items-center justify-center bg-vault-green text-vault-dark border border-vault-dark rounded-full px-6 py-2.5 font-sans font-bold text-xs sm:text-sm tracking-tight shadow-xs group-hover:brightness-[1.03] transition-all duration-300">
                  Open Prompt Vault
                </span>
                <span className="relative -ml-6 z-0 inline-flex items-center justify-center bg-vault-darker text-vault-green border border-vault-dark rounded-r-full pl-7 pr-3.5 max-w-0 opacity-0 -translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[68px] group-hover:opacity-100 group-hover:translate-x-0 overflow-hidden">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105" />
                </span>
              </Link>

              <Link
                to="/privacy"
                className="inline-flex items-center justify-center bg-transparent border-2 border-vault-dark text-vault-dark font-sans font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full hover:bg-vault-dark hover:text-vault-cream active:scale-[0.97] transition-all duration-300"
              >
                <span>Read Privacy Policy</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}
