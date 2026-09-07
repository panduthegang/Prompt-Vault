export interface CommunityHeaderProps {
  totalTemplates: number;
}

export default function CommunityHeader({ totalTemplates }: CommunityHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-vault-dark/15">
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="font-serif italic text-3xl sm:text-4xl text-vault-dark font-normal tracking-tight">
            Community Vault
          </h1>
          <span className="font-mono text-xs font-bold bg-vault-yellow border border-vault-dark px-2.5 py-0.5 rounded-full shadow-2xs">
            {totalTemplates} Templates
          </span>
        </div>
        <p className="font-sans text-xs sm:text-sm text-vault-dark/70 font-medium">
          Explore, clone, and test production prompts, agent skill.md rules, and developer workflows.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-vault-cream border-2 border-vault-dark px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vault-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-vault-green" />
          </span>
          <span className="font-mono text-xs font-bold text-vault-dark uppercase tracking-wider">
            Live Registry
          </span>
        </div>
      </div>
    </header>
  );
}
