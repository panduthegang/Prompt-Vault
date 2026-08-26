import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface HeroProps {
  className?: string;
}

export default function Hero({ className = '' }: HeroProps) {
  return (
    <section className={`w-full flex-1 min-h-0 flex flex-col border-b-2 border-vault-dark ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full flex-1 min-h-0">
        {/* Left Column: Solid Yellow Panel with Right Border */}
        <div className="bg-vault-yellow px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 py-4 sm:py-6 lg:py-6 xl:py-8 flex flex-col justify-between space-y-4 lg:space-y-0 lg:border-r-2 border-vault-dark overflow-hidden">
          {/* Top Rating & Avatar Group */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5 overflow-hidden">
              <img
                className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-vault-yellow object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Builder Avatar 1"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <img
                className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-vault-yellow object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Builder Avatar 2"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <img
                className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-vault-yellow object-cover"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                alt="Builder Avatar 3"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center text-vault-dark text-[10px] sm:text-[11px] font-bold tracking-widest" aria-hidden="true">
                ★★★★★
              </div>
              <span className="font-sans text-[11px] sm:text-xs lg:text-[13px] text-vault-dark/85 font-medium leading-tight">
                Rated 4.9 / 5 by 4,900+ builders
              </span>
            </div>
          </div>

          {/* Center Headline & Subtitle */}
          <div className="space-y-2.5 sm:space-y-3.5 my-auto py-2">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[36px] xl:text-[48px] 2xl:text-[58px] leading-[0.92] tracking-tight text-vault-dark font-normal uppercase">
              <span className="block">YOU DESERVE TO</span>
              <span className="block">SAVE WHAT</span>
              <span className="block">INSPIRES YOU</span>
            </h1>

            <p className="font-sans text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-base text-vault-dark/80 max-w-lg leading-relaxed font-normal">
              We know what it feels like to lose game-changing prompts — the messy notes, the lost bookmarks, the forgotten AI workflows. At Prompt Vault, our only job is to give you instant access to your best creative genius, safely and permanently.
            </p>
          </div>

          {/* Bottom Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {/* Two-tone Green & Darker Green Expanding Pill Button */}
            <a
              id="hero-primary-cta"
              href="#get-started"
              className="group relative inline-flex items-stretch cursor-pointer select-none active:scale-[0.97] transition-transform duration-200"
            >
              {/* Front Green Pill */}
              <span className="relative z-10 inline-flex items-center justify-center bg-vault-green text-vault-dark border border-vault-dark rounded-full px-5 sm:px-6 py-2 sm:py-2.5 font-sans font-semibold text-xs sm:text-sm lg:text-[14px] tracking-tight shadow-xs group-hover:brightness-[1.03] transition-all duration-300">
                Get Started Free
              </span>

              {/* Back Dark Green Capsule - Slides out to the right with spring ease */}
              <span className="relative -ml-4 z-0 inline-flex items-center justify-center bg-vault-darker text-vault-green border border-vault-dark rounded-r-full pl-5 pr-3.5 max-w-0 opacity-0 -translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[64px] group-hover:opacity-100 group-hover:translate-x-0 overflow-hidden">
                <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105" />
              </span>
            </a>

            {/* Outlined Pill Button */}
            <a
              id="hero-secondary-cta"
              href="#how-it-works"
              className="inline-flex items-center justify-center bg-transparent border-2 border-vault-dark text-vault-dark font-sans font-semibold text-xs sm:text-sm lg:text-[13.5px] px-5 sm:px-6 py-2 rounded-full hover:bg-vault-dark hover:text-vault-cream active:scale-[0.97] transition-all duration-300"
            >
              <span>See How It Works</span>
            </a>
          </div>
        </div>

        {/* Right Column: Visual Photo Panel */}
        <div className="relative w-full h-full min-h-[260px] lg:min-h-0 bg-[#E8EFE8] flex items-center justify-center overflow-hidden border-t-2 lg:border-t-0 border-vault-dark">
          <img
            src="/Hero.png"
            alt="Prompt Vault Hero Visual"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
