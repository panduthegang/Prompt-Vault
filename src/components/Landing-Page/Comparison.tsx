import React from 'react';
import { X, Check, ArrowUpRight, Zap, ShieldCheck, Clock, Layers } from 'lucide-react';

export interface ComparisonProps {
  className?: string;
}

const OLD_WAY_POINTS = [
  'Scattered across Notion pages, Apple Notes, Slack DMs, and browser bookmarks.',
  'Manual copy-pasting required; parameter variables ({{inputs}}) must be edited manually.',
  'No model-specific compatibility indicators (Claude 3.7, GPT-4o, DeepSeek, Cursor).',
  'Cannot parse, validate, or export structured skill.md or agent rules.',
  'Average 12–15 minutes wasted per day digging for past prompt gems.',
];

const VAULT_WAY_POINTS = [
  'Unified, beautifully indexed repository with 1-click clipboard integration.',
  'Live variable replacement ({{variable}}) injects values directly into output prompts.',
  'Instant filtering by model compatibility, token cost, and use-case categories.',
  'Native skill.md preview, frontmatter linting, and local workspace sync.',
  'Lightning-fast fuzzy search retrieves any prompt or rule in under 10ms.',
];

export default function Comparison({ className = '' }: ComparisonProps) {
  return (
    <section
      id="comparison"
      className={`w-full bg-vault-cream text-vault-dark py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t-2 border-vault-dark ${className}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          <span className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest text-vault-dark/70">
            Why Prompt Vault
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-vault-dark tracking-tight leading-[0.94] uppercase">
            <span className="block font-normal">CHAOS IN NOTION</span>
            <span className="block italic font-normal">VERSUS ORDER IN THE VAULT</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-vault-dark/80 max-w-2xl leading-relaxed pt-1">
            Standard note apps were never engineered for AI prompts, system prompts, or agent skill files. Here is what changes the day you step into the Vault.
          </p>
        </div>

        {/* 2-Column Neo-Brutalist Comparison Box */}
        <div className="w-full border-2 border-vault-dark rounded-[24px] sm:rounded-[36px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-sm">
          {/* Left Column: The Old Way (Scattered Notes) */}
          <div className="bg-vault-yellow/30 border-b-2 lg:border-b-0 lg:border-r-2 border-vault-dark p-6 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <span className="px-3.5 py-1 rounded-full bg-vault-dark/10 border border-vault-dark/20 text-xs font-sans font-bold uppercase tracking-wider text-vault-dark">
                  The Old Way
                </span>
                <span className="text-xs font-sans text-vault-dark/60 font-semibold">
                  Scattered & Fragile
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-vault-dark font-normal tracking-tight">
                Notion Dumps, Slack Threads & Forgotten Tabs
              </h3>

              <ul className="space-y-4 pt-2">
                {OLD_WAY_POINTS.map((point, index) => (
                  <li key={index} className="flex items-start gap-3.5 text-xs sm:text-sm text-vault-dark/80 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-vault-dark/10 border border-vault-dark/30 flex items-center justify-center shrink-0 mt-0.5 text-vault-dark">
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-vault-dark/5 border border-vault-dark/15 text-xs font-sans text-vault-dark/70 flex items-center gap-3">
              <Clock className="w-4 h-4 text-vault-dark/60 shrink-0" />
              <span>Result: Cognitive friction, lost inspiration, and constant re-prompting.</span>
            </div>
          </div>

          {/* Right Column: The Prompt Vault Standard */}
          <div className="bg-vault-dark text-vault-cream p-6 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-vault-green/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <span className="px-3.5 py-1 rounded-full bg-vault-green text-vault-dark border border-vault-green text-xs font-sans font-bold uppercase tracking-wider">
                  The Vault Standard
                </span>
                <span className="text-xs font-sans text-vault-green font-semibold">
                  Engineered for AI
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-vault-cream font-normal tracking-tight">
                Instant Clipboard, Parameter Injections & skill.md Native
              </h3>

              <ul className="space-y-4 pt-2">
                {VAULT_WAY_POINTS.map((point, index) => (
                  <li key={index} className="flex items-start gap-3.5 text-xs sm:text-sm text-vault-cream/90 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-vault-green text-vault-dark border border-vault-green flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 p-4 rounded-2xl bg-vault-green/10 border border-vault-green/30 text-xs font-sans text-vault-cream/90 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-vault-green shrink-0 fill-vault-green" />
                <span className="font-semibold text-vault-green">Saved Per Engineer:</span>
                <span>~4.2 hours / week</span>
              </div>
              <ShieldCheck className="w-4 h-4 text-vault-green shrink-0" />
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Primary Expanding Two-tone Pill Button */}
          <a
            id="comparison-primary-cta"
            href="#get-started"
            className="group relative inline-flex items-stretch cursor-pointer select-none active:scale-[0.97] transition-transform duration-200"
          >
            <span className="relative z-10 inline-flex items-center justify-center bg-vault-green text-vault-dark border border-vault-dark rounded-full px-5 sm:px-6 py-2 sm:py-2.5 font-sans font-semibold text-xs sm:text-sm lg:text-[14px] tracking-tight shadow-xs group-hover:brightness-[1.03] transition-all duration-300">
              Switch to Prompt Vault Free
            </span>
            <span className="relative -ml-6 z-0 inline-flex items-center justify-center bg-vault-darker text-vault-green border border-vault-dark rounded-r-full pl-7 pr-3.5 max-w-0 opacity-0 -translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[68px] group-hover:opacity-100 group-hover:translate-x-0 overflow-hidden">
              <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105" />
            </span>
          </a>

          {/* Secondary Outline Pill Button */}
          <a
            id="comparison-secondary-cta"
            href="#faqs"
            className="inline-flex items-center justify-center bg-transparent border-2 border-vault-dark text-vault-dark font-sans font-semibold text-xs sm:text-sm lg:text-[13.5px] px-5 sm:px-6 py-2 rounded-full hover:bg-vault-dark hover:text-vault-cream active:scale-[0.97] transition-all duration-300"
          >
            <span>Have Questions? See FAQs</span>
          </a>
        </div>
      </div>
    </section>
  );
}
