import React from 'react';

/**
 * Skeleton loader for the 4-card stats metrics summary in Admin Masters
 */
export function AdminMastersStatsSkeleton() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {/* 1. All Categories Skeleton */}
      <div className="rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5 bg-vault-yellow/80 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="w-20 sm:w-24 h-3 rounded bg-vault-dark/20" />
          <div className="w-4 h-4 rounded bg-vault-dark/20" />
        </div>
        <div className="flex items-baseline justify-between gap-1 min-h-[36px]">
          <div className="w-12 sm:w-16 h-8 sm:h-9 rounded-md bg-vault-dark/25" />
          <div className="w-10 h-4 rounded-full bg-vault-dark/20" />
        </div>
      </div>

      {/* 2. Prompt Categories Skeleton */}
      <div className="rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5 bg-vault-dark/95 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="w-24 sm:w-28 h-3 rounded bg-vault-cream/20" />
          <div className="w-4 h-4 rounded bg-vault-cream/20" />
        </div>
        <div className="flex items-baseline justify-between gap-1 min-h-[36px]">
          <div className="w-12 sm:w-16 h-8 sm:h-9 rounded-md bg-vault-cream/25" />
          <div className="w-14 h-4 rounded-full bg-vault-green/30" />
        </div>
      </div>

      {/* 3. Skill Rule Categories Skeleton */}
      <div className="rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/20 shadow-xs flex flex-col justify-between space-y-2.5 bg-vault-cream animate-pulse">
        <div className="flex items-center justify-between">
          <div className="w-24 sm:w-28 h-3 rounded bg-vault-dark/15" />
          <div className="w-4 h-4 rounded bg-vault-dark/15" />
        </div>
        <div className="flex items-baseline justify-between gap-1 min-h-[36px]">
          <div className="w-12 sm:w-16 h-8 sm:h-9 rounded-md bg-vault-dark/20" />
          <div className="w-14 h-4 rounded-full bg-vault-dark/15" />
        </div>
      </div>

      {/* 4. Website Categories Skeleton */}
      <div className="rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/20 shadow-xs flex flex-col justify-between space-y-2.5 bg-vault-cream animate-pulse">
        <div className="flex items-center justify-between">
          <div className="w-24 sm:w-28 h-3 rounded bg-vault-dark/15" />
          <div className="w-4 h-4 rounded bg-vault-dark/15" />
        </div>
        <div className="flex items-baseline justify-between gap-1 min-h-[36px]">
          <div className="w-12 sm:w-16 h-8 sm:h-9 rounded-md bg-vault-dark/20" />
          <div className="w-10 h-4 rounded-full bg-vault-dark/15" />
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton loader for a category card in Admin Masters
 */
export default function AdminMastersSkeletonCard() {
  return (
    <div className="bg-vault-cream rounded-[24px] p-4 sm:p-5 border-2 border-vault-dark flex flex-col justify-between space-y-3 relative overflow-hidden animate-pulse shadow-xs">
      {/* Top Row: Category Name + Scope Pill Badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1 space-y-1.5">
          {/* Name placeholder */}
          <div className="w-32 sm:w-40 h-5 rounded-md bg-vault-dark/20" />
          {/* Added date placeholder */}
          <div className="w-20 h-3 rounded bg-vault-dark/15" />
        </div>

        {/* Scope Pill Badge placeholder */}
        <div className="w-16 h-5 rounded-full bg-vault-dark/15 border border-vault-dark/20 shrink-0" />
      </div>

      {/* Description lines */}
      <div className="min-h-[32px] space-y-1.5 pt-1">
        <div className="w-full h-3 rounded bg-vault-dark/15" />
        <div className="w-3/4 h-3 rounded bg-vault-dark/10" />
      </div>

      {/* Bottom Meta & Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-vault-dark/10 gap-2">
        {/* Linked items placeholder */}
        <div className="w-24 h-3.5 rounded bg-vault-dark/15" />

        {/* Action button placeholders */}
        <div className="flex items-center gap-1.5">
          <div className="w-14 h-6 rounded-full bg-vault-dark/15 border border-vault-dark/20" />
          <div className="w-6 h-6 rounded-full bg-vault-dark/15" />
        </div>
      </div>
    </div>
  );
}
