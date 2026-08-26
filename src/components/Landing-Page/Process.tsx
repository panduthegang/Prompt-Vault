import React from 'react';
import { ArrowUpRight, FolderLock, Sparkles } from 'lucide-react';

export interface ProcessProps {
  className?: string;
}

export default function Process({ className = '' }: ProcessProps) {
  return (
    <section
      id="how-it-works"
      className={`w-full bg-vault-yellow text-vault-dark py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t-2 border-vault-dark ${className}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
          <span className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest text-vault-dark/70">
            Our Process
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-vault-dark tracking-tight leading-[0.94] uppercase">
            <span className="block font-normal">SIMPLE, CLEAR, AND</span>
            <span className="block italic font-normal">ALWAYS AT HAND</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-vault-dark/80 max-w-xl leading-relaxed pt-1">
            We believe you should know exactly what to expect at every stage. No complex setups, no lost prompts — just a straightforward path to saving your best ideas.
          </p>
        </div>

        {/* 3-Column Grid Container */}
        <div className="w-full border-2 border-vault-dark rounded-[24px] sm:rounded-[32px] overflow-hidden bg-vault-cream grid grid-cols-1 lg:grid-cols-12 shadow-sm">
          {/* Left Panel (~35% width) - Vault Green Visual Folder Graphic */}
          <div className="lg:col-span-4 bg-vault-green border-b-2 lg:border-b-0 lg:border-r-2 border-vault-dark p-8 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden min-h-[260px] lg:min-h-full">
            {/* Background Decorative Rings */}
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full border-2 border-vault-dark/15 pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full border-2 border-vault-dark/15 pointer-events-none" />

            {/* Central Graphic Element */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-vault-cream border-2 border-vault-dark flex items-center justify-center shadow-md rotate-[-4deg] hover:rotate-0 transition-transform duration-300 group">
                <FolderLock className="w-12 h-12 text-vault-dark stroke-[1.8] group-hover:scale-105 transition-transform" />
              </div>

              <div className="mt-6 flex items-center gap-2 bg-vault-dark text-vault-cream px-4 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wide shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-vault-yellow fill-vault-yellow" />
                <span>Instant Workflow</span>
              </div>
            </div>
          </div>

          {/* Right Area (~65% width) - 2x2 Step Grid without images */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 bg-vault-cream">
            {/* Card 01 - Top Left */}
            <div className="border-b-2 sm:border-r-2 border-vault-dark p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4 hover:bg-vault-yellow/20 transition-colors duration-150">
              <span className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-vault-green font-normal leading-none select-none">
                01
              </span>
              <div className="space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl text-vault-dark font-normal tracking-tight">
                  Save in One Click — No Friction
                </h3>
                <p className="font-sans text-xs sm:text-sm text-vault-dark/80 leading-relaxed">
                  Drop in a link, a prompt, or a skill.md file the moment you find it — no folders to set up first, no friction.
                </p>
              </div>
            </div>

            {/* Card 03 - Top Right */}
            <div className="border-b-2 border-vault-dark p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4 hover:bg-vault-yellow/20 transition-colors duration-150">
              <span className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-vault-green font-normal leading-none select-none">
                03
              </span>
              <div className="space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl text-vault-dark font-normal tracking-tight">
                  Instant Search — Always Fast
                </h3>
                <p className="font-sans text-xs sm:text-sm text-vault-dark/80 leading-relaxed">
                  Full-text search across every saved prompt and file means nothing you save ever gets lost in the scroll again.
                </p>
              </div>
            </div>

            {/* Card 02 - Bottom Left */}
            <div className="border-b-2 sm:border-b-0 sm:border-r-2 border-vault-dark p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4 hover:bg-vault-yellow/20 transition-colors duration-150">
              <span className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-vault-green font-normal leading-none select-none">
                02
              </span>
              <div className="space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl text-vault-dark font-normal tracking-tight">
                  Your Personalised Vault
                </h3>
                <p className="font-sans text-xs sm:text-sm text-vault-dark/80 leading-relaxed">
                  Organize by project, topic, or tool. Prompt Vault adapts to how you think, not the other way around.
                </p>
              </div>
            </div>

            {/* Card 04 - Bottom Right */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4 hover:bg-vault-yellow/20 transition-colors duration-150">
              <span className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-vault-green font-normal leading-none select-none">
                04
              </span>
              <div className="space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl text-vault-dark font-normal tracking-tight">
                  Reuse That Never Stops
                </h3>
                <p className="font-sans text-xs sm:text-sm text-vault-dark/80 leading-relaxed">
                  Copy, export, or share straight from your vault — into your editor, your team, or your next project.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Primary Expanding Two-tone Pill Button */}
          <a
            id="process-primary-cta"
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

          {/* Secondary Outline Pill Button */}
          <a
            id="process-secondary-cta"
            href="#how-it-works"
            className="inline-flex items-center justify-center bg-transparent border-2 border-vault-dark text-vault-dark font-sans font-semibold text-xs sm:text-sm lg:text-[13.5px] px-5 sm:px-6 py-2 rounded-full hover:bg-vault-dark hover:text-vault-cream active:scale-[0.97] transition-all duration-300"
          >
            <span>See How It Works</span>
          </a>
        </div>
      </div>
    </section>
  );
}
