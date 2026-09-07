import React from 'react';
import {
  Heart,
  Copy,
  Bookmark,
  Check,
  CheckCircle2,
  Download,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { CommunityItem } from './communityData';

interface CommunityCardProps {
  item: CommunityItem;
  isLiked: boolean;
  isSavedInVault: boolean;
  isCopied: boolean;
  onInspect: (item: CommunityItem) => void;
  onToggleLike: (e: React.MouseEvent, item: CommunityItem) => void;
  onCopyContent: (e: React.MouseEvent, item: CommunityItem) => void;
  onSaveToVault: (e: React.MouseEvent, item: CommunityItem) => void;
  onDownloadSkill: (e: React.MouseEvent, item: CommunityItem) => void;
}

export default function CommunityCard({
  item,
  isLiked,
  isSavedInVault,
  isCopied,
  onInspect,
  onToggleLike,
  onCopyContent,
  onSaveToVault,
  onDownloadSkill,
}: CommunityCardProps) {
  const isSkill = item.type === 'skill';
  const isWebsite = item.type === 'website';

  return (
    <article
      onClick={() => onInspect(item)}
      className="group bg-vault-cream border-2 border-vault-dark rounded-[24px] sm:rounded-[26px] p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#002D0F] transition-all duration-200 cursor-pointer relative overflow-hidden"
    >
      <div className="space-y-3.5">
        {/* Author Metadata + Item Type Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={item.author.avatar}
              alt={item.author.name}
              className="w-8 h-8 rounded-full border border-vault-dark bg-vault-yellow/40 shrink-0 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/avatars/avatar-1.svg';
              }}
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1 min-w-0">
                <span className="font-sans text-xs font-bold text-vault-dark truncate">
                  {item.author.name}
                </span>
                {item.author.isVerified && (
                  <CheckCircle2 className="w-3 h-3 text-vault-green shrink-0 fill-vault-dark stroke-vault-cream" />
                )}
                {item.isSelf && (
                  <span className="text-[10px] bg-vault-dark text-vault-yellow font-mono px-1 rounded font-bold">
                    You
                  </span>
                )}
              </div>
              <span className="font-sans text-[11px] text-vault-dark/55 truncate">
                {item.author.handle} • {item.publishedAt}
              </span>
            </div>
          </div>

          {/* Item Type Badge */}
          <span
            className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shrink-0 ${
              isSkill
                ? 'bg-vault-green text-vault-dark border-vault-dark'
                : isWebsite
                ? 'bg-sky-200 text-vault-dark border-vault-dark'
                : 'bg-vault-yellow text-vault-dark border-vault-dark'
            }`}
          >
            {isSkill ? 'skill.md' : isWebsite ? 'link' : 'prompt'}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h2 className="font-serif  text-xl sm:text-2xl text-vault-dark font-normal tracking-tight line-clamp-1 group-hover:text-vault-dark transition-colors">
            {item.title}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-vault-dark/70 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Terminal Preview Code Box */}
        <div className="bg-vault-dark text-vault-cream rounded-xl p-3 font-mono text-xs border border-vault-dark/40 relative overflow-hidden group/code">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-vault-cream/10 text-[10px] text-vault-cream/60">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
              <span className="w-2 h-2 rounded-full bg-green-400/80" />
              <span className="ml-1 font-bold text-vault-cream/80">
                {item.tool || 'snippet'}.{isSkill ? 'md' : 'prompt'}
              </span>
            </div>
            <span className="text-vault-cream/40 flex items-center gap-1">
              <Eye className="w-3 h-3" /> Preview
            </span>
          </div>
          <pre className="line-clamp-3 whitespace-pre-wrap break-words text-vault-cream/85 font-mono text-[11px] leading-relaxed">
            {item.content}
          </pre>
        </div>

        {/* Tool & Category Meta Pills */}
        <div className="flex items-center flex-wrap gap-1.5 pt-0.5">
          {item.tool && (
            <span className="font-sans text-[11px] font-semibold bg-vault-yellow/50 text-vault-dark border border-vault-dark/30 px-2 py-0.5 rounded-md">
              {item.tool}
            </span>
          )}
          <span className="font-sans text-[11px] font-semibold bg-vault-dark/5 text-vault-dark/75 border border-vault-dark/15 px-2 py-0.5 rounded-md">
            {item.category}
          </span>
        </div>
      </div>

      {/* Bottom Action Tray: Like, Copy, Clone to Vault */}
      <div className="pt-3 border-t border-vault-dark/15 flex items-center justify-between gap-1.5 w-full">
        {/* Left: Like button with counter */}
        <button
          type="button"
          onClick={(e) => onToggleLike(e, item)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border font-sans text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            isLiked
              ? 'bg-rose-100 text-rose-700 border-rose-400 shadow-2xs'
              : 'bg-vault-cream text-vault-dark/70 border-vault-dark/20 hover:border-vault-dark hover:text-vault-dark'
          }`}
          title={isLiked ? 'Unlike' : 'Like'}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
              isLiked ? 'fill-rose-500 text-rose-500' : 'text-vault-dark/60'
            }`}
          />
          <span>{item.metrics.likes}</span>
        </button>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Copy Action */}
          <button
            type="button"
            onClick={(e) => onCopyContent(e, item)}
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border-2 font-sans text-xs font-bold transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
              isCopied
                ? 'bg-vault-green text-vault-dark border-vault-dark'
                : 'bg-vault-cream text-vault-dark border-vault-dark hover:bg-vault-dark hover:text-vault-cream'
            }`}
            title="Copy prompt"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Clone / Save to Personal Vault */}
          <button
            type="button"
            onClick={(e) => onSaveToVault(e, item)}
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border-2 font-sans text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              isSavedInVault
                ? 'bg-vault-yellow text-vault-dark border-vault-dark shadow-2xs'
                : 'bg-vault-green text-vault-dark border-vault-dark hover:bg-[#19b657]'
            }`}
            title={isSavedInVault ? 'Saved in Vault' : 'Save to Vault'}
          >
            {isSavedInVault ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Clone</span>
              </>
            )}
          </button>

          {/* Download .md for Skills */}
          {isSkill && (
            <button
              type="button"
              onClick={(e) => onDownloadSkill(e, item)}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border-2 border-vault-dark bg-vault-cream text-vault-dark hover:bg-vault-yellow font-sans text-xs font-bold transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              title="Download .md file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.md</span>
            </button>
          )}

          {/* Visit for Websites */}
          {isWebsite && item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border-2 border-vault-dark bg-vault-cream text-vault-dark hover:bg-vault-yellow font-sans text-xs font-bold transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              title="Visit external website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Visit</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
