import { TrendingUp, Layers, Bookmark, Zap } from 'lucide-react';

export default function AdminDashboardStats() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {/* Card 1: Total Creators — YELLOW ACCENT SURFACE */}
      <div
        className="bg-vault-yellow rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3"
        title="Total Platform Creators"
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/70">
            Total Creators
          </span>
          <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/50" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
            14,892
          </span>
          <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-dark text-vault-green px-2 py-0.5 rounded-full self-start sm:self-auto">
            +14% this wk
          </span>
        </div>
      </div>

      {/* Card 2: Community Copies & Clones — DARK SURFACE */}
      <div className="bg-vault-dark rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-cream/60">
            Community Clones
          </span>
          <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-cream/40" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-cream font-normal">
            128.4k
          </span>
          <span className="font-sans text-[10px] sm:text-xs font-bold bg-vault-green text-vault-dark px-2 py-0.5 rounded-full self-start sm:self-auto">
            +28% this wk
          </span>
        </div>
      </div>

      {/* Card 3: Vault Registry Distribution — CREAM SURFACE WITH PROGRESS BAR */}
      <div className="bg-vault-cream rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/15 shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
            Vault Registry
          </span>
          <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/40" />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal block">
            84,210
          </span>
          <div className="w-full h-1.5 sm:h-2 bg-vault-dark/10 rounded-full overflow-hidden flex">
            <div className="h-full bg-vault-green w-[55%]" title="Agent Skills 55%" />
            <div className="h-full bg-vault-yellow w-[30%]" title="Frontend & Architecture 30%" />
            <div className="h-full bg-vault-dark w-[15%]" title="Marketing 15%" />
          </div>
        </div>
      </div>

      {/* Card 4: Cluster Health — CREAM SURFACE */}
      <div className="bg-vault-cream rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/15 shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
            Cluster Health
          </span>
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/40" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
            99.98%
          </span>
          <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-yellow text-vault-dark border border-vault-dark px-2 py-0.5 rounded-full self-start sm:self-auto">
            Healthy &rarr;
          </span>
        </div>
      </div>
    </section>
  );
}
