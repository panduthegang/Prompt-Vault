import { Plus } from 'lucide-react';

export interface VaultHeaderProps {
  savedCount: number;
  onOpenAddModal: () => void;
}

export default function VaultHeader({ savedCount, onOpenAddModal }: VaultHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-vault-dark/15">
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="font-serif italic text-3xl sm:text-4xl text-vault-dark font-normal tracking-tight">
            Vault Library
          </h1>
          <span className="font-mono text-xs font-bold bg-vault-yellow border border-vault-dark px-2.5 py-0.5 rounded-full shadow-2xs">
            {savedCount} Saved
          </span>
        </div>
        <p className="font-sans text-xs sm:text-sm text-vault-dark/70 font-medium">
          Your central repository for saved prompts, skill.md rules, and website documentation links.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-vault-green text-vault-dark font-sans text-xs sm:text-sm font-bold border-2 border-vault-dark rounded-full shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add to Vault</span>
        </button>
      </div>
    </header>
  );
}
