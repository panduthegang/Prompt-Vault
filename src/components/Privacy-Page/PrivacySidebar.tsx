import { Heart, ArrowUpRight } from 'lucide-react';
import { PRIVACY_CLAUSES } from './privacyData';

export interface PrivacySidebarProps {
  openClauses: Record<string, boolean>;
  onSelectClause: (id: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export default function PrivacySidebar({
  openClauses,
  onSelectClause,
  onExpandAll,
  onCollapseAll,
}: PrivacySidebarProps) {
  return (
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
              onClick={onExpandAll}
              className="text-[11px] font-sans font-bold text-vault-dark/70 hover:text-vault-dark bg-vault-yellow px-2 py-0.5 rounded border border-vault-dark/30 transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={onCollapseAll}
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
                onClick={() => onSelectClause(clause.id)}
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
  );
}
