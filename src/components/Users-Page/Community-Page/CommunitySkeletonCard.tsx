import React from 'react';

export default function CommunitySkeletonCard() {
  return (
    <div className="bg-vault-cream border-2 border-vault-dark rounded-[24px] sm:rounded-[26px] p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs relative overflow-hidden animate-pulse">
      <div className="space-y-3.5">
        {/* Author row skeleton */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-vault-dark/15 border border-vault-dark/20" />
            <div className="space-y-1.5">
              <div className="w-24 h-3 rounded-md bg-vault-dark/15" />
              <div className="w-16 h-2.5 rounded-md bg-vault-dark/10" />
            </div>
          </div>
          <div className="w-14 h-5 rounded-md bg-vault-dark/15" />
        </div>

        {/* Title & Description skeleton */}
        <div className="space-y-2 pt-1">
          <div className="w-3/4 h-5 rounded-md bg-vault-dark/20" />
          <div className="w-full h-3 rounded-md bg-vault-dark/10" />
          <div className="w-5/6 h-3 rounded-md bg-vault-dark/10" />
        </div>

        {/* Terminal code box skeleton */}
        <div className="bg-vault-dark/90 rounded-xl p-3 h-28 space-y-2 border border-vault-dark/30">
          <div className="flex items-center justify-between pb-2 border-b border-vault-cream/10">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-vault-cream/20" />
              <div className="w-2 h-2 rounded-full bg-vault-cream/20" />
              <div className="w-2 h-2 rounded-full bg-vault-cream/20" />
              <div className="w-16 h-2 rounded bg-vault-cream/20 ml-1.5" />
            </div>
          </div>
          <div className="w-full h-2.5 rounded bg-vault-cream/15" />
          <div className="w-4/5 h-2.5 rounded bg-vault-cream/15" />
          <div className="w-2/3 h-2.5 rounded bg-vault-cream/10" />
        </div>

        {/* Meta pills skeleton */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <div className="w-16 h-5 rounded-md bg-vault-dark/10" />
          <div className="w-20 h-5 rounded-md bg-vault-dark/10" />
        </div>
      </div>

      {/* Footer tray skeleton */}
      <div className="pt-3 border-t border-vault-dark/15 flex items-center justify-between gap-1.5">
        <div className="w-12 h-7 rounded-xl bg-vault-dark/10" />
        <div className="flex items-center gap-1.5">
          <div className="w-16 h-7 rounded-xl bg-vault-dark/15" />
          <div className="w-16 h-7 rounded-xl bg-vault-dark/15" />
        </div>
      </div>
    </div>
  );
}
