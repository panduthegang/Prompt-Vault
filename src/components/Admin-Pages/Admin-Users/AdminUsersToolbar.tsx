import { Search, X, List, LayoutGrid } from 'lucide-react';
import CustomSelect from '../../ui/Select';
import { SORT_OPTIONS } from './adminUsersData';

interface AdminUsersToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'table' | 'grid';
  onViewModeChange: (mode: 'table' | 'grid') => void;
}

export default function AdminUsersToolbar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: AdminUsersToolbarProps) {
  return (
    <section className="bg-vault-cream rounded-[24px] p-4 sm:p-5 border-2 border-vault-dark/15 shadow-xs relative z-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 text-vault-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search creator by name, email, @handle, or specialty..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white border-2 border-vault-dark text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-vault-green transition-all"
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

        {/* Controls Right: Bespoke CustomSelect Sort Dropdown & Desktop View Switcher */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="w-full sm:w-60 shrink-0">
            <CustomSelect
              value={sortBy}
              onChange={(val) => onSortChange(val)}
              options={SORT_OPTIONS}
              placeholder="Sort creators..."
            />
          </div>

          {/* View Switcher: ONLY visible on desktop/tablet (>= md) since small screens only use Cards */}
          <div className="hidden md:flex items-center bg-white rounded-xl border-2 border-vault-dark p-0.5 shrink-0 h-[44px]">
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              className={`px-3 h-full rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
                viewMode === 'table'
                  ? 'bg-vault-dark text-vault-cream shadow-xs'
                  : 'text-vault-dark/60 hover:text-vault-dark'
              }`}
              title="Table view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`px-3 h-full rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
                viewMode === 'grid'
                  ? 'bg-vault-dark text-vault-cream shadow-xs'
                  : 'text-vault-dark/60 hover:text-vault-dark'
              }`}
              title="Grid cards view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
