import { Link } from 'react-router-dom';
import { Lock, ArrowUpRight } from 'lucide-react';
import PromptCard from './PromptCard';
import { BLURRED_PROMPTS } from './promptsData';

export default function PromptsCurveLock() {
  return (
    <section className="w-full relative pt-3 sm:pt-4 pb-4 sm:pb-12 max-h-[290px] sm:max-h-[360px] lg:max-h-none overflow-hidden">
      {/* Blurred Cards Grid (1 card on mobile, 2 on tablet, 3 on desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8 pointer-events-none select-none opacity-40 filter blur-[2px]">
        {BLURRED_PROMPTS.map((prompt, pIdx) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            isLocked
            className={pIdx === 0 ? 'flex' : pIdx === 1 ? 'hidden md:flex' : 'hidden lg:flex'}
          />
        ))}
      </div>

      {/* Frosted Glassmorphic Fade Overlay directly covering the blurred cards */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vault-cream/70 to-vault-cream backdrop-blur-[5px] pointer-events-none z-10" />

      {/* Downward Curve SVG Line & Centered Expanding Button DIRECTLY ON TOP of the Blurred Cards */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4">
        {/* SVG Curve Container with Glowing Dual-Sided Energy Beams */}
        <div className="relative w-full flex items-center justify-center pointer-events-auto">
          <svg
            viewBox="0 0 1440 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-20 sm:h-28 md:h-36 overflow-visible"
          >
            <defs>
              {/* Neon Glow Filters */}
              <filter id="neonBeamGlow" x="-20%" y="-30%" width="140%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="ambientRailGlow" x="-20%" y="-30%" width="140%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Left Energy Beam Gradient (Fades from green to bright yellow core) */}
              <linearGradient id="beamLeftGradient" x1="0" y1="0" x2="720" y2="112.5" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1ECC62" stopOpacity="0.05" />
                <stop offset="40%" stopColor="#1ECC62" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#F1F78C" stopOpacity="1" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
              </linearGradient>

              {/* Right Energy Beam Gradient (Fades from green to bright yellow core) */}
              <linearGradient id="beamRightGradient" x1="1440" y1="0" x2="720" y2="112.5" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1ECC62" stopOpacity="0.05" />
                <stop offset="40%" stopColor="#1ECC62" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#F1F78C" stopOpacity="1" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
              </linearGradient>

              {/* Base Track Ambient Gradient */}
              <linearGradient id="railBaseGradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#002D0F" stopOpacity="0.2" />
                <stop offset="20%" stopColor="#1ECC62" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#1ECC62" stopOpacity="0.75" />
                <stop offset="80%" stopColor="#1ECC62" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#002D0F" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* 1. Underlying Dark Rail */}
            <path
              d="M -20 15 C 440 145, 1000 145, 1460 15"
              stroke="#002D0F"
              strokeWidth="2.5"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />

            {/* 2. Soft Ambient Neon Rail Glow */}
            <path
              d="M -20 15 C 440 145, 1000 145, 1460 15"
              stroke="url(#railBaseGradient)"
              strokeWidth="1.75"
              filter="url(#ambientRailGlow)"
              strokeLinecap="round"
            />

            {/* 3. Left Radiant Energy Beam (Flows from Left edge into Center) */}
            <path
              d="M -20 15 C 210 80, 465 112.5, 720 112.5"
              stroke="url(#beamLeftGradient)"
              strokeWidth="3.5"
              strokeDasharray="160 620"
              className="animate-beam-flow"
              filter="url(#neonBeamGlow)"
              strokeLinecap="round"
            />

            {/* 4. Right Radiant Energy Beam (Flows from Right edge into Center) */}
            <path
              d="M 1460 15 C 1230 80, 975 112.5, 720 112.5"
              stroke="url(#beamRightGradient)"
              strokeWidth="3.5"
              strokeDasharray="160 620"
              className="animate-beam-flow"
              filter="url(#neonBeamGlow)"
              strokeLinecap="round"
            />
          </svg>

          {/* Powered Lock Button (Reactor Core Aura & Electric Convergence) */}
          <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center">
            {/* Electric Reactor Core Glow Behind Button */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-r from-vault-green/45 via-vault-yellow/70 to-vault-green/45 blur-xl animate-power-reactor pointer-events-none" />

            {/* Concentric Energy Pulse Wave */}
            <div className="absolute -inset-1.5 sm:-inset-2 rounded-full border-2 border-vault-green/40 animate-ping opacity-30 pointer-events-none" />

            <Link
              id="prompts-curve-unlock-btn"
              to="/signup"
              className="group relative inline-flex items-stretch cursor-pointer select-none active:scale-[0.97] transition-transform duration-200"
            >
              {/* Front Green Pill with Charging Lock Badge */}
              <span className="relative z-10 inline-flex items-center justify-center gap-2.5 bg-vault-green text-vault-dark border-2 border-vault-dark rounded-full px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 font-sans font-semibold text-xs sm:text-sm lg:text-[14.5px] tracking-tight shadow-[0_0_20px_rgba(30,204,98,0.4),0_0_40px_rgba(241,247,140,0.2)] group-hover:brightness-[1.05] transition-all duration-300 whitespace-nowrap">
                {/* Glowing Lock Indicator */}
                <div className="relative flex items-center justify-center">
                  <span className="absolute -inset-1 rounded-full bg-vault-yellow/60 animate-ping opacity-40" />
                  <div className="w-5 h-5 rounded-full bg-vault-dark text-vault-green flex items-center justify-center relative z-10 shadow-xs">
                    <Lock className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </div>

                <span>Unlock 2,400+ Prompts</span>
              </span>

              {/* Back Dark Green Capsule (Zero padding, zero width, zero border when not hovered to eliminate blank white space) */}
              <span className="relative -ml-8 sm:-ml-9 z-0 inline-flex items-center justify-center bg-vault-darker text-vault-green border-0 border-vault-dark rounded-r-full p-0 w-0 max-w-0 opacity-0 -translate-x-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-2 group-hover:max-w-[68px] sm:group-hover:max-w-[74px] group-hover:w-auto group-hover:pl-7 sm:group-hover:pl-8 group-hover:pr-3.5 sm:group-hover:pr-4 group-hover:opacity-100 group-hover:translate-x-0 overflow-hidden pointer-events-none group-hover:pointer-events-auto">
                <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105" />
              </span>
            </Link>
          </div>
        </div>

        {/* Subtle Sign In Link Below Curve */}
        <div className="mt-4 sm:mt-7 text-center pointer-events-auto">
          <Link
            to="/signin"
            className="font-sans text-xs font-semibold text-vault-dark/80 hover:text-vault-dark hover:underline underline-offset-4 transition-colors"
          >
            Already a member? Sign in to your vault ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
