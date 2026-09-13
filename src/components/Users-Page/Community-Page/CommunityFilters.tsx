import React from 'react';
import { Search, X, Layers, Terminal, Code2, Globe, Star } from 'lucide-react';
import { CommunityTab } from './communityData';

interface TabCounts {
  all: number;
  prompt: number;
  skill: number;
  website: number;
  'my-shares': number;
}

interface CommunityFiltersProps {
  activeTab: CommunityTab;
  onTabChange: (tab: CommunityTab) => void;
  tabCounts: TabCounts;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function CommunityFilters({
  activeTab,
  onTabChange,
  tabCounts,
  searchQuery,
  onSearchChange,
}: CommunityFiltersProps) {
  const tabs = [
    { id: 'all', label: 'All Items', icon: Layers, count: tabCounts.all },
    { id: 'prompt', label: 'Prompts', icon: Terminal, count: tabCounts.prompt },
    { id: 'skill', label: 'Skill Rules', icon: Code2, count: tabCounts.skill },
    { id: 'website', label: 'Workflows & Links', icon: Globe, count: tabCounts.website },
    { id: 'my-shares', label: 'My Published 🌟', icon: Star, count: tabCounts['my-shares'] },
  ] as const;

  return (
    <section className="space-y-4" aria-label="Community Filters and Search">
      {/* Main Filter Tabs Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-vault-dark/5 rounded-2xl border border-vault-dark/15 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id as CommunityTab)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-vault-dark text-vault-cream shadow-sm font-bold'
                    : 'text-vault-dark/70 hover:text-vault-dark hover:bg-vault-cream/80'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                    isActive ? 'text-vault-yellow' : 'text-vault-dark/60'
                  }`}
                />
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive
                      ? 'bg-vault-yellow text-vault-dark font-bold'
                      : 'bg-vault-dark/10 text-vault-dark/60'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Input Row */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-vault-dark/50 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search prompts, skill rules, authors, or tools..."
          className="w-full pl-11 pr-10 py-2.5 sm:py-3 bg-vault-cream border-2 border-vault-dark rounded-xl sm:rounded-2xl font-sans text-xs sm:text-sm placeholder:text-vault-dark/45 focus:outline-none focus:ring-2 focus:ring-vault-green/40 shadow-xs text-vault-dark font-medium"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-vault-dark/50 hover:text-vault-dark p-1 cursor-pointer"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
}
