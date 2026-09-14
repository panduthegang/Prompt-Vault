import { FolderTree, Bookmark, FileCode, Globe } from 'lucide-react';
import { MasterItemType } from '../../../types/master';

interface AdminMastersStatsProps {
  metrics: {
    total: number;
    promptCount: number;
    skillCount: number;
    websiteCount: number;
  };
  activeFilter: 'all' | MasterItemType;
  onSelectFilter: (type: 'all' | MasterItemType) => void;
}

export default function AdminMastersStats({
  metrics,
  activeFilter,
  onSelectFilter,
}: AdminMastersStatsProps) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {/* Card 1: All Categories */}
      <div
        onClick={() => onSelectFilter('all')}
        className={`rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5 cursor-pointer transition-all ${
          activeFilter === 'all'
            ? 'bg-vault-yellow ring-2 ring-vault-dark/40 -translate-y-0.5'
            : 'bg-vault-yellow/80 hover:bg-vault-yellow'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/70">
            All Categories
          </span>
          <FolderTree className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/60" />
        </div>
        <div className="flex items-baseline justify-between gap-1">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
            {metrics.total}
          </span>
          <span className="font-mono text-[10px] font-bold bg-vault-dark text-vault-cream px-2 py-0.5 rounded-full">
            Total
          </span>
        </div>
      </div>

      {/* Card 2: Prompt Categories */}
      <div
        onClick={() => onSelectFilter('prompt')}
        className={`rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5 cursor-pointer transition-all ${
          activeFilter === 'prompt'
            ? 'bg-vault-dark text-vault-cream ring-2 ring-vault-green -translate-y-0.5'
            : 'bg-vault-dark/95 text-vault-cream hover:bg-vault-dark'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-cream/60">
            Prompt Categories
          </span>
          <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-cream/40" />
        </div>
        <div className="flex items-baseline justify-between gap-1">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-cream font-normal">
            {metrics.promptCount}
          </span>
          <span className="font-sans text-[10px] sm:text-xs font-bold bg-vault-green text-vault-dark px-2 py-0.5 rounded-full">
            Prompts
          </span>
        </div>
      </div>

      {/* Card 3: Skill Rule Categories */}
      <div
        onClick={() => onSelectFilter('skill')}
        className={`rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/20 shadow-xs flex flex-col justify-between space-y-2.5 cursor-pointer transition-all ${
          activeFilter === 'skill'
            ? 'bg-vault-cream ring-2 ring-vault-dark -translate-y-0.5'
            : 'bg-vault-cream hover:border-vault-dark/40'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
            Skill Rule Categories
          </span>
          <FileCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/50" />
        </div>
        <div className="flex items-baseline justify-between gap-1">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
            {metrics.skillCount}
          </span>
          <span className="font-mono text-[10px] font-bold bg-vault-yellow text-vault-dark border border-vault-dark/20 px-2 py-0.5 rounded-full">
            .md Rules
          </span>
        </div>
      </div>

      {/* Card 4: Website Categories */}
      <div
        onClick={() => onSelectFilter('website')}
        className={`rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/20 shadow-xs flex flex-col justify-between space-y-2.5 cursor-pointer transition-all ${
          activeFilter === 'website'
            ? 'bg-vault-cream ring-2 ring-vault-dark -translate-y-0.5'
            : 'bg-vault-cream hover:border-vault-dark/40'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
            Website Categories
          </span>
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/50" />
        </div>
        <div className="flex items-baseline justify-between gap-1">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
            {metrics.websiteCount}
          </span>
          <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-green/20 text-vault-dark border border-vault-green px-2 py-0.5 rounded-full">
            Links
          </span>
        </div>
      </div>
    </section>
  );
}
