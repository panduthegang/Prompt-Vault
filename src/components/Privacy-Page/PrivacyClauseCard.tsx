import { Eye, CheckCircle2 } from 'lucide-react';
import { PrivacyClause } from './privacyData';

export interface PrivacyClauseCardProps {
  clause: PrivacyClause;
  isOpen: boolean;
  onToggle: () => void;
}

export default function PrivacyClauseCard({ clause, isOpen, onToggle }: PrivacyClauseCardProps) {
  return (
    <article
      id={clause.id}
      className={`w-full bg-vault-cream border-2 border-vault-dark rounded-[22px] transition-all duration-300 overflow-hidden ${
        isOpen ? 'shadow-md ring-2 ring-vault-dark/10' : 'hover:border-vault-dark/80 hover:bg-vault-cream/95'
      }`}
    >
      {/* Interactive Clause Header */}
      <button
        type="button"
        onClick={onToggle}
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
}
