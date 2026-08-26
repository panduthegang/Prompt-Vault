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
        <div className="bg-vault-yellow px-4 sm:px-6 md:px-8 lg:px-8 xl:px-12 py-6 sm:py-8 lg:py-10 xl:py-12 flex flex-col justify-between items-center text-center space-y-6 lg:space-y-0 lg:border-r-2 border-vault-dark overflow-hidden">
          {/* Top Rating & Avatar Group */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-2.5 overflow-hidden">
              <img
                className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-vault-yellow object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Builder Avatar 1"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <img
                className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-vault-yellow object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Builder Avatar 2"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <img
                className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-vault-yellow object-cover"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                alt="Builder Avatar 3"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center text-vault-dark text-[11px] sm:text-xs font-bold tracking-widest" aria-hidden="true">
                ★★★★★
              </div>
              <span className="font-sans text-xs sm:text-[13px] lg:text-sm text-vault-dark/85 font-medium leading-tight">
                Rated 4.9 / 5 by 4,900+ builders
              </span>
            </div>
          </div>

          {/* Center Headline & Subtitle */}
          <div className="space-y-3.5 sm:space-y-4 my-auto py-2 sm:py-3 w-full max-w-2xl xl:max-w-3xl mx-auto flex flex-col items-center">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[72px] 2xl:text-[84px] leading-[0.93] tracking-tight text-vault-dark font-normal uppercase text-center w-full">
              <span className="block">YOU DESERVE TO</span>
              <span className="block">SAVE WHAT</span>
              <span className="block italic">INSPIRES YOU</span>
            </h1>

            <p className="font-sans text-xs sm:text-sm md:text-[15px] xl:text-[16.5px] 2xl:text-[18px] text-vault-dark/85 max-w-xl xl:max-w-2xl leading-relaxed font-normal pt-1 sm:pt-2 text-center">
              We know what it feels like to lose game-changing prompts — the messy notes, the lost bookmarks, the forgotten AI workflows. At Prompt Vault, our only job is to give you instant access to your best creative genius, safely and permanently.
            </p>
          </div>

          {/* Bottom Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {/* Two-tone Green & Darker Green Expanding Pill Button */}
            <a
              id="hero-primary-cta"
              href="#get-started"
              className="group relative inline-flex items-stretch cursor-pointer select-none active:scale-[0.97] transition-transform duration-200"
            >
              {/* Front Green Pill */}
              <span className="relative z-10 inline-flex items-center justify-center bg-vault-green text-vault-dark border border-vault-dark rounded-full px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 font-sans font-semibold text-xs sm:text-sm lg:text-[15px] tracking-tight shadow-xs group-hover:brightness-[1.03] transition-all duration-300">
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
              className="inline-flex items-center justify-center bg-transparent border-2 border-vault-dark text-vault-dark font-sans font-semibold text-xs sm:text-sm lg:text-[14.5px] px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-full hover:bg-vault-dark hover:text-vault-cream active:scale-[0.97] transition-all duration-300"
            >
              <span>See How It Works</span>
            </a>
          </div>
        </div>

        {/* Right Column: Visual Photo Panel */}
        <div className="relative w-full h-full min-h-[260px] lg:min-h-0 bg-[#E8EFE8] flex items-center justify-center overflow-hidden border-t-2 lg:border-t-0 border-vault-dark">
          <img
            src="https://prompt-vault-by-harsh.vercel.app/Hero.png"
            alt="Prompt Vault Hero Visual"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
