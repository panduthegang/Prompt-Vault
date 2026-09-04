import { Layers, Bookmark, FileCode, Globe, Star, Search, X } from 'lucide-react';
import { CATEGORY_PRESETS} from './vaultData';

export type VaultTabType = 'all' | 'prompt' | 'skill' | 'website' | 'starred';

export interface VaultFiltersProps {
  activeTab: VaultTabType;
  onTabChange: (tab: VaultTabType) => void;
  counts: {
    all: number;
    prompt: number;
    skill: number;
    website: number;
    starred: number;
  };
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function VaultFilters({
  activeTab,
  onTabChange,
  counts,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: VaultFiltersProps) {
  return (
    <div className="space-y-4">
      {/* 5 Main Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          type="button"
          onClick={() => onTabChange('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 shrink-0 ${
            activeTab === 'all'
              ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
              : 'bg-vault-cream text-vault-dark border-vault-dark/30 hover:border-vault-dark hover:bg-vault-yellow/40'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Items</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">
            {counts.all}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('prompt')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 shrink-0 ${
            activeTab === 'prompt'
              ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
              : 'bg-vault-cream text-vault-dark border-vault-dark/30 hover:border-vault-dark hover:bg-vault-yellow/40'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${activeTab === 'prompt' ? 'text-vault-yellow' : ''}`} />
          <span>Prompts</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">
            {counts.prompt}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('skill')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 shrink-0 ${
            activeTab === 'skill'
              ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
              : 'bg-vault-cream text-vault-dark border-vault-dark/30 hover:border-vault-dark hover:bg-vault-yellow/40'
          }`}
        >
          <FileCode className={`w-3.5 h-3.5 ${activeTab === 'skill' ? 'text-vault-green' : ''}`} />
          <span>Skill.md Rules</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">
            {counts.skill}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('website')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 shrink-0 ${
            activeTab === 'website'
              ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
              : 'bg-vault-cream text-vault-dark border-vault-dark/30 hover:border-vault-dark hover:bg-vault-yellow/40'
          }`}
        >
          <Globe className={`w-3.5 h-3.5 ${activeTab === 'website' ? 'text-sky-300' : ''}`} />
          <span>Websites &amp; Links</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">
            {counts.website}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('starred')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 shrink-0 ${
            activeTab === 'starred'
              ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
              : 'bg-vault-cream text-vault-dark border-vault-dark/30 hover:border-vault-dark hover:bg-vault-yellow/40'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${activeTab === 'starred' ? 'text-vault-yellow fill-vault-yellow' : ''}`} />
          <span>Starred</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">
            {counts.starred}
          </span>
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-vault-dark/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search prompts, markdown skills, website URLs..."
            className="w-full bg-white/70 text-vault-dark placeholder:text-vault-dark/40 font-sans text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-full border-2 border-vault-dark/20 focus:outline-none focus:border-vault-dark transition-colors shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-vault-dark/50 hover:text-vault-dark cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Pill Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORY_PRESETS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-full font-sans text-[11px] sm:text-xs font-bold transition-colors cursor-pointer border whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-vault-dark text-vault-cream border-vault-dark'
                  : 'bg-white/60 text-vault-dark/70 border-vault-dark/15 hover:border-vault-dark hover:bg-vault-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
