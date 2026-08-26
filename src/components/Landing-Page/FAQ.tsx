import React, { useState } from 'react';
import { ArrowUpRight, Eye } from 'lucide-react';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FAQProps {
  className?: string;
}

const FAQ_ITEMS: FAQItem[] = [
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

export default function FAQ({ className = '' }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faqs"
      className={`w-full bg-vault-yellow text-vault-dark py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t-2 border-vault-dark ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Headline & Action CTAs (Centered on mobile, left-aligned & sticky on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:sticky lg:top-24 items-center text-center lg:items-start lg:text-left">
            <div className="space-y-4 flex flex-col items-center lg:items-start">
              {/* Eyebrow Tag */}
              <span className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest text-vault-dark/70 block">
                Take the First Step
              </span>

              {/* Grand Editorial Headline */}
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[60px] xl:text-[68px] leading-[0.92] tracking-tight text-vault-dark font-normal uppercase text-center lg:text-left">
                <span className="block">WE BELIEVE IN</span>
                <span className="block italic">COMPLETE HONESTY</span>
              </h2>

              {/* Subtitle */}
              <p className="font-sans text-xs sm:text-sm md:text-base text-vault-dark/80 max-w-md leading-relaxed pt-1 text-center lg:text-left">
                If you have a question we have not answered here, explore our vault or reach out to our team — we will always give you a straight answer.
              </p>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              {/* Primary Expanding Two-tone Button */}
              <a
                id="faq-primary-cta"
                href="#get-started"
                className="group relative inline-flex items-stretch cursor-pointer select-none active:scale-[0.97] transition-transform duration-200"
              >
                <span className="relative z-10 inline-flex items-center justify-center bg-vault-green text-vault-dark border border-vault-dark rounded-full px-5 sm:px-6 py-2 sm:py-2.5 font-sans font-semibold text-xs sm:text-sm lg:text-[14px] tracking-tight shadow-xs group-hover:brightness-[1.03] transition-all duration-300">
                  Get Started Free
                </span>
                <span className="relative -ml-4 z-0 inline-flex items-center justify-center bg-vault-darker text-vault-green border border-vault-dark rounded-r-full pl-5 pr-3.5 max-w-0 opacity-0 -translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[64px] group-hover:opacity-100 group-hover:translate-x-0 overflow-hidden">
                  <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105" />
                </span>
              </a>

              {/* Secondary Outlined Pill Button */}
              <a
                id="faq-secondary-cta"
                href="#how-it-works"
                className="inline-flex items-center justify-center bg-transparent border-2 border-vault-dark text-vault-dark font-sans font-semibold text-xs sm:text-sm lg:text-[13.5px] px-5 sm:px-6 py-2 rounded-full hover:bg-vault-dark hover:text-vault-cream active:scale-[0.97] transition-all duration-300"
              >
                <span>See How It Works</span>
              </a>
            </div>
          </div>

          {/* Right Column: Stacked Accordion Cards with Eye Indicator */}
          <div className="lg:col-span-7 flex flex-col space-y-3 sm:space-y-3.5">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className={`w-full bg-vault-cream border-2 border-vault-dark rounded-[20px] sm:rounded-[24px] transition-all duration-300 overflow-hidden ${
                    isOpen ? 'shadow-md ring-2 ring-vault-dark/10' : 'hover:border-vault-dark/80 hover:bg-vault-cream/95'
                  }`}
                >
                  {/* Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-answer`}
                    className="w-full text-left p-5 sm:p-6 sm:py-5 flex items-center justify-between gap-4 cursor-pointer select-none group"
                  >
                    <span className="font-serif text-lg sm:text-xl md:text-[22px] lg:text-[23px] text-vault-dark font-normal leading-snug tracking-tight group-hover:text-vault-darker transition-colors">
                      {item.question}
                    </span>

                    {/* Eye Icon Circle Indicator */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0 flex items-center justify-center border-2 border-vault-dark transition-all duration-300 ${
                        isOpen
                          ? 'bg-vault-green text-vault-dark shadow-xs scale-105'
                          : 'bg-vault-dark text-vault-green group-hover:scale-105'
                      }`}
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        /* Open Eye */
                        <Eye className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2] transition-transform duration-300" />
                      ) : (
                        /* Sleek Closed Eyelids with Lashes */
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-vault-green transition-transform duration-300"
                        >
                          <path d="M3 11c3 3.8 6 5.5 9 5.5s6-1.7 9-5.5" />
                          <path d="M6 14.5l-1.5 2" />
                          <path d="M12 16.5v2.5" />
                          <path d="M18 14.5l1.5 2" />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* Expandable Answer Drawer */}
                  <div
                    id={`${item.id}-answer`}
                    role="region"
                    aria-labelledby={item.id}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1">
                        <p className="font-sans text-xs sm:text-sm md:text-[14.5px] text-vault-dark/80 leading-relaxed max-w-2xl border-t border-vault-dark/15 pt-3">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
