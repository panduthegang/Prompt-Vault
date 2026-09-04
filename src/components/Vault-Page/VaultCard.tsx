import {
  Bookmark,
  FileCode,
  Globe,
  Star,
  Link2,
  ExternalLink,
  Download,
  Copy,
  Check,
  MoreHorizontal,
  Share2,
  Pencil,
  Trash2,
} from 'lucide-react';
import { VaultItem } from './vaultData';

export interface VaultCardProps {
  item: VaultItem;
  isCopied: boolean;
  isMenuOpen: boolean;
  onToggleMenu: (id: string) => void;
  onCloseMenu: () => void;
  onToggleStar: (id: string) => void;
  onCopyItem: (item: VaultItem) => void;
  onDownloadSkill: (item: VaultItem) => void;
  onTogglePublish: (id: string) => void;
  onOpenEditModal: (item: VaultItem) => void;
  onDeleteItem: (id: string, title: string) => void;
}

export default function VaultCard({
  item,
  isCopied,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  onToggleStar,
  onCopyItem,
  onDownloadSkill,
  onTogglePublish,
  onOpenEditModal,
  onDeleteItem,
}: VaultCardProps) {
  return (
    <div className="bg-vault-cream border-2 border-vault-dark rounded-[20px] sm:rounded-[22px] p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-shadow relative group">
      <div className="space-y-3">
        {/* Top Meta Header: Type Badge, Category & Star */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Type Badge */}
            {item.type === 'prompt' && (
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-vault-yellow border border-vault-dark/40 text-vault-dark px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Bookmark className="w-3 h-3" /> Prompt
              </span>
            )}
            {item.type === 'skill' && (
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-vault-green border border-vault-dark/40 text-vault-dark px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <FileCode className="w-3 h-3" /> {item.tool || 'Skill.md'}
              </span>
            )}
            {item.type === 'website' && (
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-vault-dark text-vault-cream border border-vault-dark px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Globe className="w-3 h-3 text-vault-green" /> Website
              </span>
            )}

            <span className="font-sans text-[11px] font-semibold text-vault-dark/60 bg-white/70 border border-vault-dark/15 px-2 py-0.2 rounded-full">
              {item.category}
            </span>

            {/* Live / Published Badge */}
            {item.isPublished && (
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider bg-vault-green text-vault-dark border border-vault-dark/40 px-2 py-0.2 rounded-full flex items-center gap-1 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-vault-dark animate-pulse" /> Live
              </span>
            )}
          </div>

          {/* Star Button */}
          <button
            type="button"
            onClick={() => onToggleStar(item.id)}
            className="p-1 rounded-lg hover:bg-vault-dark/5 transition-colors cursor-pointer"
            title={item.isStarred ? 'Remove from Starred' : 'Add to Starred'}
          >
            <Star
              className={`w-4 h-4 ${
                item.isStarred
                  ? 'text-amber-500 fill-amber-500'
                  : 'text-vault-dark/30 hover:text-vault-dark/70'
              }`}
            />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl text-vault-dark font-normal leading-snug">
          {item.title}
        </h3>

        {/* Body Content / Snippet or Website URL */}
        {item.type === 'website' && item.url ? (
          <div className="space-y-2">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-vault-dark/20 text-vault-dark font-mono text-xs font-semibold hover:border-vault-dark hover:bg-vault-yellow/30 transition-colors truncate max-w-full"
            >
              <Link2 className="w-3.5 h-3.5 text-vault-dark/70 shrink-0" />
              <span className="truncate">{item.url.replace(/^https?:\/\//, '')}</span>
              <ExternalLink className="w-3 h-3 text-vault-dark/50 shrink-0 ml-auto" />
            </a>
            <p className="font-sans text-xs text-vault-dark/70 line-clamp-2">
              {item.content}
            </p>
          </div>
        ) : (
          <div className="bg-vault-dark/[0.04] border border-vault-dark/15 rounded-xl p-3 font-mono text-xs text-vault-dark/80 line-clamp-3 leading-relaxed select-text whitespace-pre-wrap">
            {item.content}
          </div>
        )}
      </div>

      {/* Bottom Card Actions */}
      <div className="pt-3 border-t border-vault-dark/10 flex items-center justify-between gap-1.5 sm:gap-2">
        <span className="font-sans text-[10px] text-vault-dark/50 font-medium whitespace-nowrap shrink-0">
          {item.timestamp}
        </span>

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Primary Action: Download as .md Button (Skills only) */}
          {item.type === 'skill' && (
            <button
              type="button"
              onClick={() => onDownloadSkill(item)}
              className="p-1.5 px-2 sm:px-2.5 rounded-lg border border-vault-dark/20 hover:border-vault-dark hover:bg-vault-yellow/50 transition-colors text-vault-dark cursor-pointer flex items-center gap-1 sm:gap-1.5 whitespace-nowrap shrink-0"
              title="Download as .md file"
            >
              <Download className="w-3.5 h-3.5 text-vault-dark/70 shrink-0" />
              <span className="font-sans text-[11px] font-bold whitespace-nowrap">Download .md</span>
            </button>
          )}

          {/* Copy Button (Prompts & Skills) */}
          {item.type !== 'website' && (
            <button
              type="button"
              onClick={() => onCopyItem(item)}
              className="p-1.5 px-2 sm:px-2.5 rounded-lg border border-vault-dark/20 hover:border-vault-dark hover:bg-vault-yellow/50 transition-colors text-vault-dark cursor-pointer flex items-center gap-1 sm:gap-1.5 whitespace-nowrap shrink-0"
              title="Copy content to clipboard"
            >
              {isCopied ? (
                <Check className="w-3.5 h-3.5 text-vault-green stroke-[3] shrink-0" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-vault-dark/70 shrink-0" />
              )}
              <span className="font-sans text-[11px] font-bold whitespace-nowrap">
                {isCopied ? 'Copied' : 'Copy'}
              </span>
            </button>
          )}

          {/* Websites: Copy Link & Visit */}
          {item.type === 'website' && (
            <>
              <button
                type="button"
                onClick={() => onCopyItem(item)}
                className="p-1.5 px-2 rounded-lg border border-vault-dark/20 hover:border-vault-dark hover:bg-vault-yellow/50 transition-colors text-vault-dark cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0"
                title="Copy Link URL"
              >
                {isCopied ? (
                  <Check className="w-3.5 h-3.5 text-vault-green stroke-[3] shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-vault-dark/70 shrink-0" />
                )}
                <span className="font-sans text-[11px] font-bold whitespace-nowrap">
                  {isCopied ? 'Copied' : 'Copy Link'}
                </span>
              </button>

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 px-2 sm:px-2.5 rounded-lg border border-vault-dark/20 hover:border-vault-dark hover:bg-vault-yellow/50 transition-colors text-vault-dark cursor-pointer flex items-center gap-1 sm:gap-1.5 whitespace-nowrap shrink-0"
                  title="Open Website in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-vault-dark/70 shrink-0" />
                  <span className="font-sans text-[11px] font-bold whitespace-nowrap">Visit</span>
                </a>
              )}
            </>
          )}

          {/* 3-Dots Dropdown Menu (Publish, Edit, Delete) */}
          <div className="relative vault-card-menu-container shrink-0">
            <button
              type="button"
              onClick={() => onToggleMenu(item.id)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer flex items-center justify-center shrink-0 ${
                isMenuOpen
                  ? 'bg-vault-dark text-vault-cream border-vault-dark'
                  : 'border-vault-dark/20 hover:border-vault-dark hover:bg-vault-yellow/50 text-vault-dark/80 hover:text-vault-dark'
              }`}
              title="More actions"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>

            {/* Dropdown Menu Popover */}
            {isMenuOpen && (
              <div className="absolute right-0 bottom-full mb-1.5 w-44 bg-vault-cream border-2 border-vault-dark rounded-xl shadow-md z-30 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                {/* Publish / Unpublish Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    onTogglePublish(item.id);
                    onCloseMenu();
                  }}
                  className="w-full px-3 py-2 text-left font-sans text-xs font-semibold flex items-center justify-between hover:bg-vault-yellow/60 transition-colors text-vault-dark cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5 text-vault-dark/70" />
                    <span>{item.isPublished ? 'Unpublish' : 'Publish'}</span>
                  </span>
                  {item.isPublished && (
                    <span className="font-mono text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-vault-green text-vault-dark border border-vault-dark/30">
                      Live
                    </span>
                  )}
                </button>

                {/* Edit Item */}
                <button
                  type="button"
                  onClick={() => {
                    onOpenEditModal(item);
                    onCloseMenu();
                  }}
                  className="w-full px-3 py-2 text-left font-sans text-xs font-semibold flex items-center gap-2 hover:bg-vault-yellow/60 transition-colors text-vault-dark cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5 text-vault-dark/70" />
                  <span>Edit details</span>
                </button>

                <div className="h-px bg-vault-dark/10 my-0.5" />

                {/* Delete Item */}
                <button
                  type="button"
                  onClick={() => {
                    onDeleteItem(item.id, item.title);
                    onCloseMenu();
                  }}
                  className="w-full px-3 py-2 text-left font-sans text-xs font-semibold flex items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
