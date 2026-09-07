import React from 'react';

interface CommunityHeaderProps {
  totalTemplates: number;
}

export default function CommunityHeader({ totalTemplates }: CommunityHeaderProps) {
  return (
    <header className="bg-vault-yellow border-2 border-vault-dark rounded-[20px] sm:rounded-[28px] p-3.5 sm:p-6 md:p-8 relative overflow-hidden shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 relative z-10">
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-vault-cream border border-vault-dark font-sans text-[10px] sm:text-xs font-bold text-vault-dark uppercase tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-vault-green animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-vault-green -ml-3" />
              Live Registry
            </span>
            <span className="font-sans text-[10px] sm:text-xs font-bold bg-vault-dark text-vault-yellow border border-vault-dark px-2 py-0.5 rounded-full shadow-2xs">
              {totalTemplates} Templates
            </span>
          </div>

          <h1 className="font-serif italic text-2xl sm:text-3xl md:text-5xl font-normal tracking-tight text-vault-dark leading-none">
            Community Vault
          </h1>
        </div>
      </div>

      <p className="hidden sm:block font-sans text-xs sm:text-sm text-vault-dark/80 leading-relaxed font-medium mt-2 max-w-2xl">
        Explore, clone, and test production-tested prompts, agent <code className="font-mono bg-vault-dark/10 px-1 py-0.5 rounded text-vault-dark font-bold text-xs">skill.md</code> rules, and developer workflows built by global AI engineers.
      </p>
    </header>
  );
}
