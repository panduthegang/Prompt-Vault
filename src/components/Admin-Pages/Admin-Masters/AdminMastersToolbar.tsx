import { FolderTree, Bookmark, FileCode, Globe, Search, X, LayoutGrid, List } from 'lucide-react';
import { MasterItemType } from './adminMastersData';

interface AdminMastersToolbarProps {
  activeFilter: 'all' | MasterItemType;
  onSelectFilter: (type: 'all' | MasterItemType) => void;
  totalCount: number;
  promptCount: number;
  skillCount: number;
  websiteCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
}

export default function AdminMastersToolbar({
  activeFilter,
  onSelectFilter,
  totalCount,
  promptCount,
  skillCount,
  websiteCount,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: AdminMastersToolbarProps) {
  return (
    <section className="space-y-3.5">
      {/* Segmented Type Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        <button
          type="button"
          onClick={() => onSelectFilter('all')}
          className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeFilter === 'all'
              ? 'bg-vault-dark text-vault-cream border-2 border-vault-dark shadow-2xs'
              : 'bg-white/80 hover:bg-white text-vault-dark/70 border border-vault-dark/15'
          }`}
        >
          <FolderTree className="w-3.5 h-3.5" />
          <span>All ({totalCount})</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectFilter('prompt')}
          className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeFilter === 'prompt'
              ? 'bg-vault-dark text-vault-cream border-2 border-vault-dark shadow-2xs'
              : 'bg-white/80 hover:bg-white text-vault-dark/70 border border-vault-dark/15'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Prompts ({promptCount})</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectFilter('skill')}
          className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeFilter === 'skill'
              ? 'bg-vault-dark text-vault-cream border-2 border-vault-dark shadow-2xs'
              : 'bg-white/80 hover:bg-white text-vault-dark/70 border border-vault-dark/15'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Skill Rules ({skillCount})</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectFilter('website')}
          className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeFilter === 'website'
              ? 'bg-vault-dark text-vault-cream border-2 border-vault-dark shadow-2xs'
              : 'bg-white/80 hover:bg-white text-vault-dark/70 border border-vault-dark/15'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Websites ({websiteCount})</span>
        </button>
      </div>

      {/* Search & View Switcher */}
      <div className="bg-vault-cream rounded-[24px] p-4 sm:p-5 border-2 border-vault-dark/15 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 text-vault-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search categories by name or description..."
            className="w-full pl-9 pr-9 py-2 rounded-xl bg-white border-2 border-vault-dark text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-vault-green transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-vault-dark/40 hover:text-vault-dark cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Switcher: Grid vs List */}
        <div className="flex items-center bg-white rounded-xl border border-vault-dark/20 p-1 h-[38px] shrink-0 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`px-2.5 h-full rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
              viewMode === 'grid'
                ? 'bg-vault-dark text-vault-cream shadow-xs'
                : 'text-vault-dark/60 hover:text-vault-dark'
            }`}
            title="Card Grid"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('table')}
            className={`px-2.5 h-full rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
              viewMode === 'table'
                ? 'bg-vault-dark text-vault-cream shadow-xs'
                : 'text-vault-dark/60 hover:text-vault-dark'
            }`}
            title="Data Table"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
