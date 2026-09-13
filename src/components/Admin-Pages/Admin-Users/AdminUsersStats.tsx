import { Users, Bookmark, Sparkles, Flame } from 'lucide-react';
import { AdminUsersMetrics } from './adminUsersData';

interface AdminUsersStatsProps {
  metrics: AdminUsersMetrics;
}

export default function AdminUsersStats({ metrics }: AdminUsersStatsProps) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {/* Card 1: Total Creators — YELLOW ACCENT SURFACE */}
      <div
        className="bg-vault-yellow rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5"
        title="Total Registered Creators"
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/70">
            Total Creators
          </span>
          <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/60" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
            {metrics.totalCreators}
          </span>
          <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-dark text-vault-green px-2 py-0.5 rounded-full self-start sm:self-auto">
            Platform Authors
          </span>
        </div>
      </div>

      {/* Card 2: Total Clones Won — DARK SURFACE */}
      <div className="bg-vault-dark rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-cream/60">
            Community Clones
          </span>
          <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-cream/40" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-cream font-normal">
            {metrics.totalClones.toLocaleString()}
          </span>
          <span className="font-sans text-[10px] sm:text-xs font-bold bg-vault-green text-vault-dark px-2 py-0.5 rounded-full self-start sm:self-auto">
            Copies Won
          </span>
        </div>
      </div>

      {/* Card 3: Authored Prompts — CREAM SURFACE */}
      <div className="bg-vault-cream rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/20 shadow-xs flex flex-col justify-between space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
            Authored Rules
          </span>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/50" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
            {metrics.totalPrompts}
          </span>
          <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-yellow text-vault-dark border border-vault-dark/20 px-2 py-0.5 rounded-full self-start sm:self-auto">
            Published
          </span>
        </div>
      </div>

      {/* Card 4: Community Upvotes — CREAM SURFACE */}
      <div className="bg-vault-cream rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/20 shadow-xs flex flex-col justify-between space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
            Total Upvotes
          </span>
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
            {metrics.totalUpvotes.toLocaleString()}
          </span>
          <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-green/20 text-vault-dark border border-vault-green px-2 py-0.5 rounded-full self-start sm:self-auto">
            Platform High
          </span>
        </div>
      </div>
    </section>
  );
}
