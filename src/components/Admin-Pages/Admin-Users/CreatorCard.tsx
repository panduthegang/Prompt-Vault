import React from 'react';
import { Check, Mail, Eye } from 'lucide-react';
import { AdminUser } from './adminUsersData';

interface CreatorCardProps {
  user: AdminUser;
  onInspect: () => void;
  onCopyEmail: (e: React.MouseEvent) => void;
}

export default function CreatorCard({
  user,
  onInspect,
  onCopyEmail,
}: CreatorCardProps) {
  return (
    <div
      onClick={onInspect}
      className="bg-vault-cream rounded-[24px] p-4 sm:p-5 border-2 border-vault-dark flex flex-col justify-between space-y-3.5 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#002D0F] transition-all duration-200 cursor-pointer relative"
    >
      {/* Top Row: Avatar, Name & Joined Date */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-vault-dark object-cover bg-vault-yellow/40 shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm sm:text-base text-vault-dark truncate font-sans">
                {user.name}
              </h4>
              {user.isVerified && (
                <span
                  className="w-3.5 h-3.5 rounded-full bg-vault-green text-vault-dark flex items-center justify-center shrink-0"
                  title="Verified Creator"
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              )}
            </div>
            <span className="font-mono text-xs text-vault-dark/50 block truncate">
              @{user.handle}
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold text-vault-dark/50 px-2 py-0.5 rounded-full bg-white/70 border border-vault-dark/15 shrink-0 whitespace-nowrap">
          {user.joinedDate}
        </span>
      </div>

      {/* Specialty Pill & Bio */}
      <div className="space-y-1.5">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-vault-yellow/50 border border-vault-dark/20 text-[10px] font-bold text-vault-dark">
          {user.specialty}
        </span>
        <p className="font-sans text-xs text-vault-dark/70 line-clamp-2 leading-relaxed min-h-[36px]">
          {user.bio}
        </p>
      </div>

      {/* 3-Column Metrics Bar */}
      <div className="grid grid-cols-3 gap-2 bg-white/70 p-2.5 rounded-xl border border-vault-dark/15 text-center">
        <div>
          <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/50">
            Prompts
          </span>
          <span className="font-mono text-sm font-bold text-vault-dark">
            {user.promptsCount}
          </span>
        </div>

        <div>
          <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/50">
            Clones
          </span>
          <span className="font-mono text-sm font-bold text-vault-green">
            {user.clonesCount.toLocaleString()}
          </span>
        </div>

        <div>
          <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/50">
            Upvotes
          </span>
          <span className="font-mono text-sm font-bold text-vault-dark">
            {user.upvotesCount}
          </span>
        </div>
      </div>

      {/* Action Tray */}
      <div
        className="flex items-center justify-between pt-2 border-t border-vault-dark/10 gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onCopyEmail}
          className="font-mono text-xs text-vault-dark/60 hover:text-vault-dark flex items-center gap-1.5 transition-colors cursor-pointer min-w-0"
          title="Copy email address"
        >
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{user.email}</span>
        </button>

        <button
          type="button"
          onClick={onInspect}
          className="px-3 py-1 rounded-full font-sans text-xs font-semibold bg-vault-cream hover:bg-vault-yellow border border-vault-dark/20 text-vault-dark cursor-pointer transition-colors inline-flex items-center gap-1 shrink-0 whitespace-nowrap"
        >
          <Eye className="w-3 h-3 text-vault-dark/70" />
          <span>Inspect</span>
        </button>
      </div>
    </div>
  );
}
