import React from 'react';

export default function VaultSkeletonCard() {
  return (
    <div className="bg-vault-cream border-2 border-vault-dark rounded-[20px] sm:rounded-[22px] p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-xs relative overflow-hidden animate-pulse">
      <div className="space-y-3">
        {/* Top Meta Header: Type Badge, Category & Star */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Type badge placeholder */}
            <div className="w-20 h-5 rounded-full bg-vault-dark/15 border border-vault-dark/20" />
            {/* Category badge placeholder */}
            <div className="w-16 h-4.5 rounded-full bg-vault-dark/10 border border-vault-dark/15" />
          </div>

          {/* Star button placeholder */}
          <div className="w-5 h-5 rounded-lg bg-vault-dark/15" />
        </div>

        {/* Title placeholder */}
        <div className="w-3/4 h-5 sm:h-6 rounded-md bg-vault-dark/20" />

        {/* Body Content / Snippet box placeholder */}
        <div className="bg-vault-dark/[0.04] border border-vault-dark/15 rounded-xl p-3 h-20 space-y-2 flex flex-col justify-center">
          <div className="w-full h-2.5 rounded bg-vault-dark/15" />
          <div className="w-5/6 h-2.5 rounded bg-vault-dark/15" />
          <div className="w-2/3 h-2 rounded bg-vault-dark/10" />
        </div>
      </div>

      {/* Bottom Card Action Tray */}
      <div className="pt-3 border-t border-vault-dark/10 flex items-center justify-between gap-2">
        {/* Timestamp placeholder */}
        <div className="w-16 h-3 rounded bg-vault-dark/15" />

        {/* Right action button placeholders */}
        <div className="flex items-center gap-1.5">
          <div className="w-16 h-7 rounded-lg bg-vault-dark/15 border border-vault-dark/20" />
          <div className="w-7 h-7 rounded-lg bg-vault-dark/15 border border-vault-dark/20" />
        </div>
      </div>
    </div>
  );
}
