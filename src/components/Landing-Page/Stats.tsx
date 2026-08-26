import React from 'react';

export interface StatsProps {
  className?: string;
}

interface StatItem {
  id: string;
  value: string;
  label: string;
}

const statsData: StatItem[] = [
  {
    id: 'stat-prompts-saved',
    value: '12,000+',
    label: 'Prompts Saved',
  },
  {
    id: 'stat-user-satisfaction',
    value: '98%',
    label: 'User Satisfaction',
  },
  {
    id: 'stat-skills-shared',
    value: '500+',
    label: 'Skill Files Shared',
  },
  {
    id: 'stat-active-vaults',
    value: '3,200+',
    label: 'Active Vaults',
  },
];

export default function Stats({ className = '' }: StatsProps) {
  return (
    <section className={`w-full bg-vault-cream shrink-0 ${className}`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 w-full">
        {statsData.map((stat, idx) => (
          <div
            key={stat.id}
            id={stat.id}
            className={`py-3 sm:py-4 lg:py-4 xl:py-5 px-3 sm:px-4 flex flex-col items-center justify-center text-center group transition-colors duration-150 hover:bg-vault-yellow/20 ${
              idx < 2 ? 'border-b-2 lg:border-b-0 border-vault-dark' : ''
            } ${idx % 2 === 0 ? 'border-r-2 border-vault-dark' : ''} ${
              idx === 1 ? 'lg:border-r-2 lg:border-vault-dark' : ''
            } ${idx === 2 ? 'lg:border-r-2 lg:border-vault-dark' : ''}`}
          >
            <span className="font-serif text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-vault-dark font-normal tracking-tight leading-none group-hover:scale-[1.02] transition-transform">
              {stat.value}
            </span>
            <span className="font-sans text-[11px] sm:text-xs lg:text-xs xl:text-sm font-medium text-vault-dark/80 mt-1 sm:mt-1.5">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
