import { TrendingUp, MoreHorizontal, Layers, FileCode } from 'lucide-react';

export interface DashboardStatsProps {
  promptCount: number;
  publishedCount?: number;
  collectionsCount?: number;
  skillCount?: number;
  onOpenPrompts: () => void;
  onOpenCollections: () => void;
  onOpenSkills: () => void;
}

export default function DashboardStats({
  promptCount,
  publishedCount = 24,
  collectionsCount = 12,
  skillCount = 48,
  onOpenPrompts,
  onOpenCollections,
  onOpenSkills,
}: DashboardStatsProps) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {/* Card 1: Total Prompts — YELLOW ACCENT SURFACE */}
      <div
        onClick={onOpenPrompts}
        className="bg-vault-yellow rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3 cursor-pointer hover:scale-[1.01] transition-transform"
        title="Open Prompts Library"
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/70">
            Total Prompts
          </span>
          <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/50" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
            {promptCount}
          </span>
          <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-dark text-vault-green px-2 py-0.5 rounded-full self-start sm:self-auto">
            +12 this wk
          </span>
        </div>
      </div>

      {/* Card 2: Published Snapshots — DARK SURFACE */}
      <div className="bg-vault-dark rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-cream/60">
            Published
          </span>
          <MoreHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-cream/40" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-cream font-normal">
            {publishedCount}
          </span>
          <span className="font-sans text-[10px] sm:text-xs font-bold bg-vault-green text-vault-dark px-2 py-0.5 rounded-full self-start sm:self-auto">
            +3
          </span>
        </div>
      </div>

      {/* Card 3: Collections / Links — CREAM SURFACE */}
      <div
        onClick={onOpenCollections}
        className="bg-vault-cream rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/15 shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3 cursor-pointer hover:scale-[1.01] transition-transform"
        title="Open Websites &amp; Collections"
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
            Collections &amp; Links
          </span>
          <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/40" />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal block">
            {collectionsCount}
          </span>
          <div className="w-full h-1.5 sm:h-2 bg-vault-dark/10 rounded-full overflow-hidden flex">
            <div className="h-full bg-vault-green w-[55%]" />
            <div className="h-full bg-vault-yellow w-[30%]" />
            <div className="h-full bg-vault-dark w-[15%]" />
          </div>
        </div>
      </div>

      {/* Card 4: Skill.md Files — CREAM SURFACE */}
      <div
        onClick={onOpenSkills}
        className="bg-vault-cream rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/15 shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3 cursor-pointer hover:scale-[1.01] transition-transform"
        title="Open Skill.md Rules"
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
            Skill.md Files
          </span>
          <FileCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/40" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
            {skillCount}
          </span>
          <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-yellow text-vault-dark border border-vault-dark px-2 py-0.5 rounded-full self-start sm:self-auto">
            Open &rarr;
          </span>
        </div>
      </div>
    </section>
  );
}
