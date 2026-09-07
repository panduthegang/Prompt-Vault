import React from 'react';
import { AlertCircle, RotateCcw, Search } from 'lucide-react';

interface CommunityErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function CommunityErrorState({ error, onRetry }: CommunityErrorStateProps) {
  return (
    <div className="bg-vault-cream border-2 border-red-500 rounded-[24px] sm:rounded-[28px] p-8 sm:p-12 text-center space-y-4 shadow-sm">
      <div className="w-14 h-14 rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center mx-auto text-red-600">
        <AlertCircle className="w-6 h-6 stroke-[2.5]" />
      </div>
      <div className="space-y-1 max-w-md mx-auto">
        <h3 className="font-serif italic text-2xl font-normal text-vault-dark">
          Failed to Load Community Prompts
        </h3>
        <p className="font-sans text-xs sm:text-sm text-vault-dark/70 leading-relaxed">
          {error}
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-vault-dark text-vault-cream font-sans text-xs sm:text-sm font-bold border-2 border-vault-dark cursor-pointer hover:bg-vault-dark/90 transition-colors shadow-xs"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Retry Request</span>
      </button>
    </div>
  );
}

interface CommunityEmptyStateProps {
  onReset: () => void;
}

export function CommunityEmptyState({ onReset }: CommunityEmptyStateProps) {
  return (
    <div className="bg-vault-cream border-2 border-vault-dark/20 border-dashed rounded-[28px] p-8 sm:p-14 text-center space-y-4">
      <div className="w-14 h-14 rounded-full bg-vault-yellow/50 border-2 border-vault-dark flex items-center justify-center mx-auto shadow-xs">
        <Search className="w-6 h-6 text-vault-dark" />
      </div>
      <div className="space-y-1">
        <h3 className="font-serif italic text-2xl font-normal text-vault-dark">
          No Community Templates Found
        </h3>
        <p className="font-sans text-xs sm:text-sm text-vault-dark/60 max-w-md mx-auto">
          We couldn't find any contributions matching your search. Try adjusting your query or resetting filters.
        </p>
      </div>
      <div className="flex items-center justify-center pt-2">
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 rounded-xl bg-vault-dark text-vault-cream font-sans text-xs font-bold border-2 border-vault-dark cursor-pointer hover:bg-vault-dark/90 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

interface CommunityEndOfVaultProps {
  totalCount: number;
}

export function CommunityEndOfVault({ totalCount }: CommunityEndOfVaultProps) {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center space-y-2 text-center px-4">
      <div className="flex items-center gap-3 w-full">
        <div className="h-[2px] bg-vault-dark/15 flex-1" />
        <span className="font-serif italic text-lg sm:text-xl text-vault-dark tracking-tight select-none">
          End of the Vault
        </span>
        <div className="h-[2px] bg-vault-dark/15 flex-1" />
      </div>
      <p className="font-sans text-xs text-vault-dark/55 font-medium">
        You've explored all {totalCount} curated community templates
      </p>
    </div>
  );
}
