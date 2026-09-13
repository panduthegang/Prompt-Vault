import React from 'react';
import { motion, AnimatePresence, DragControls } from 'framer-motion';
import {
  X,
  Heart,
  Copy,
  Bookmark,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { CommunityItem } from './communityData';

interface CommunityModalSheetProps {
  inspectItem: CommunityItem | null;
  isMobile: boolean;
  dragControls: DragControls;
  onClose: () => void;
  isLiked: boolean;
  onToggleLike: (e: React.MouseEvent, item: CommunityItem) => void;
  onCopyContent: (e: React.MouseEvent, item: CommunityItem) => void;
  onSaveToVault: (e: React.MouseEvent, item: CommunityItem) => void;
  isSavedInVault: boolean;
  onDownloadSkill: (e: React.MouseEvent, item: CommunityItem) => void;
}

export default function CommunityModalSheet({
  inspectItem,
  isMobile,
  dragControls,
  onClose,
  isLiked,
  onToggleLike,
  onCopyContent,
  onSaveToVault,
  isSavedInVault,
  onDownloadSkill,
}: CommunityModalSheetProps) {
  return (
    <AnimatePresence>
      {inspectItem && (
        isMobile ? (
          /* MOBILE INSTAGRAM / YOUTUBE STYLE DRAGGABLE BOTTOM SHEET */
          <div className="fixed inset-0 z-50 flex flex-col justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Draggable Bottom Sheet Modal */}
            <motion.div
              drag="y"
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.3 }}
              dragMomentum={false}
              onDragEnd={(_e, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  onClose();
                }
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              className="relative z-10 w-full max-w-lg mx-auto bg-vault-cream border-t-2 border-vault-dark rounded-t-[32px] p-5 pb-[max(3rem,env(safe-area-inset-bottom))] shadow-2xl flex flex-col max-h-[88dvh]"
            >
              {/* Draggable Grab Handle Indicator (Pill Thumb) */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="w-full pt-1 pb-3 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none -mt-1 shrink-0"
              >
                <div className="w-12 h-1.5 bg-vault-dark/25 hover:bg-vault-dark/40 rounded-full transition-colors" />
              </div>

              {/* 1. Fixed Modal Header */}
              <div
                onPointerDown={(e) => {
                  if ((e.target as HTMLElement).closest('button')) return;
                  dragControls.start(e);
                }}
                className="shrink-0 flex items-start justify-between gap-3 pb-3 border-b-2 border-vault-dark/15 touch-none cursor-grab active:cursor-grabbing select-none"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        inspectItem.type === 'skill'
                          ? 'bg-vault-green text-vault-dark border-vault-dark'
                          : inspectItem.type === 'website'
                          ? 'bg-sky-200 text-vault-dark border-vault-dark'
                          : 'bg-vault-yellow text-vault-dark border-vault-dark'
                      }`}
                    >
                      {inspectItem.type}
                    </span>
                    <span className="font-sans text-xs font-semibold text-vault-dark/60">
                      {inspectItem.category}
                    </span>
                  </div>
                  <h2 className="font-serif italic text-2xl text-vault-dark font-normal tracking-tight">
                    {inspectItem.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-vault-dark/20 flex items-center justify-center hover:bg-vault-dark/10 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4 text-vault-dark" />
                </button>
              </div>

              {/* 2. Inner Scrollable Body */}
              <div
                className="flex-1 overflow-y-auto overscroll-contain py-4 space-y-4 pr-1 [scrollbar-width:thin]"
                style={{ contain: 'content', WebkitOverflowScrolling: 'touch' }}
              >
                {/* Author & Metrics Card */}
                <div className="flex items-center justify-between p-3.5 bg-vault-dark/5 rounded-2xl border border-vault-dark/15">
                  <div className="flex items-center gap-3">
                    <img
                      src={inspectItem.author.avatar}
                      alt={inspectItem.author.name}
                      className="w-10 h-10 rounded-full border border-vault-dark bg-vault-yellow/40 object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans text-sm font-bold text-vault-dark">
                          {inspectItem.author.name}
                        </span>
                        {inspectItem.author.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-vault-green fill-vault-dark stroke-vault-cream" />
                        )}
                      </div>
                      <span className="font-sans text-xs text-vault-dark/60">
                        {inspectItem.author.handle} • Published {inspectItem.publishedAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 font-sans text-xs font-semibold text-vault-dark/70">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500" /> {inspectItem.metrics.likes}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-vault-dark/80 leading-relaxed">
                  {inspectItem.description}
                </p>

                {/* Full Content / Code Box with Inner Scroll */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-sans text-xs font-bold text-vault-dark/70">
                    <span>Prompt / Skill Rule Code</span>
                    {inspectItem.tool && (
                      <span className="bg-vault-yellow px-2 py-0.5 rounded border border-vault-dark font-mono text-[10px]">
                        Target: {inspectItem.tool}
                      </span>
                    )}
                  </div>
                  <div
                    className="bg-vault-dark text-vault-cream rounded-2xl p-4 font-mono text-xs border-2 border-vault-dark relative overflow-hidden"
                    style={{ contain: 'paint' }}
                  >
                    <pre className="whitespace-pre-wrap break-words leading-relaxed font-mono max-h-56 overflow-y-auto pr-2">
                      {inspectItem.content}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 3. Fixed Modal Footer */}
              <div className="shrink-0 pt-3 border-t-2 border-vault-dark/15 flex items-center gap-1.5 w-full bg-vault-cream">
                <button
                  type="button"
                  onClick={(e) => onToggleLike(e, inspectItem)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border-2 font-sans text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                    isLiked
                      ? 'bg-rose-100 text-rose-700 border-rose-400 shadow-2xs'
                      : 'bg-vault-cream text-vault-dark border-vault-dark hover:bg-vault-yellow'
                  }`}
                  title={isLiked ? 'Unlike' : 'Like'}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isLiked ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                  <span>{isLiked ? 'Liked' : 'Like'}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => onCopyContent(e, inspectItem)}
                  className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border-2 border-vault-dark bg-vault-cream text-vault-dark hover:bg-vault-dark hover:text-vault-cream font-sans text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Copy className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Copy</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => onSaveToVault(e, inspectItem)}
                  className={`flex-1 min-w-0 flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border-2 border-vault-dark font-sans text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    isSavedInVault
                      ? 'bg-vault-yellow text-vault-dark shadow-2xs'
                      : 'bg-vault-green text-vault-dark hover:bg-[#19b657]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    {isSavedInVault ? 'Saved' : 'Clone'}
                  </span>
                </button>

                {inspectItem.type === 'skill' && (
                  <button
                    type="button"
                    onClick={(e) => onDownloadSkill(e, inspectItem)}
                    className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl border-2 border-vault-dark bg-vault-yellow text-vault-dark hover:bg-[#e7ee7b] font-sans text-xs font-bold transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                    title="Download .md file"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span>.md</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          /* DESKTOP CENTERED FLOATING MODAL */
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto overscroll-contain"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 14 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
              className="bg-vault-cream border-2 border-vault-dark rounded-[24px] sm:rounded-[28px] max-w-2xl w-full p-5 sm:p-7 space-y-4 shadow-2xl relative my-8 flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="shrink-0 flex items-start justify-between gap-3 pb-3 border-b-2 border-vault-dark/15">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        inspectItem.type === 'skill'
                          ? 'bg-vault-green text-vault-dark border-vault-dark'
                          : inspectItem.type === 'website'
                          ? 'bg-sky-200 text-vault-dark border-vault-dark'
                          : 'bg-vault-yellow text-vault-dark border-vault-dark'
                      }`}
                    >
                      {inspectItem.type}
                    </span>
                    <span className="font-sans text-xs font-semibold text-vault-dark/60">
                      {inspectItem.category}
                    </span>
                  </div>
                  <h2 className="font-serif italic text-3xl text-vault-dark font-normal tracking-tight">
                    {inspectItem.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-vault-dark/20 flex items-center justify-center hover:bg-vault-dark/10 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4 text-vault-dark" />
                </button>
              </div>

              {/* Inner Scroll Body */}
              <div className="flex-1 overflow-y-auto overscroll-contain py-3 space-y-4 pr-2">
                <div className="flex items-center justify-between p-3.5 bg-vault-dark/5 rounded-2xl border border-vault-dark/15">
                  <div className="flex items-center gap-3">
                    <img
                      src={inspectItem.author.avatar}
                      alt={inspectItem.author.name}
                      className="w-10 h-10 rounded-full border border-vault-dark bg-vault-yellow/40 object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans text-sm font-bold text-vault-dark">
                          {inspectItem.author.name}
                        </span>
                        {inspectItem.author.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-vault-green fill-vault-dark stroke-vault-cream" />
                        )}
                      </div>
                      <span className="font-sans text-xs text-vault-dark/60">
                        {inspectItem.author.handle} • Published {inspectItem.publishedAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 font-sans text-xs font-semibold text-vault-dark/70">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500" /> {inspectItem.metrics.likes}
                    </span>
                  </div>
                </div>

                <p className="font-sans text-sm text-vault-dark/80 leading-relaxed">
                  {inspectItem.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between font-sans text-xs font-bold text-vault-dark/70">
                    <span>Prompt / Skill Rule Code</span>
                    {inspectItem.tool && (
                      <span className="bg-vault-yellow px-2 py-0.5 rounded border border-vault-dark font-mono text-[10px]">
                        Target: {inspectItem.tool}
                      </span>
                    )}
                  </div>
                  <div className="bg-vault-dark text-vault-cream rounded-2xl p-5 font-mono text-xs sm:text-sm border-2 border-vault-dark relative overflow-hidden">
                    <pre className="whitespace-pre-wrap break-words leading-relaxed font-mono max-h-64 overflow-y-auto pr-2">
                      {inspectItem.content}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="shrink-0 pt-3 border-t-2 border-vault-dark/15 flex items-center justify-between gap-2 bg-vault-cream">
                <button
                  type="button"
                  onClick={(e) => onToggleLike(e, inspectItem)}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 font-sans text-sm font-bold transition-all cursor-pointer ${
                    isLiked
                      ? 'bg-rose-100 text-rose-700 border-rose-400 shadow-2xs'
                      : 'bg-vault-cream text-vault-dark border-vault-dark hover:bg-vault-yellow'
                  }`}
                  title={isLiked ? 'Unlike' : 'Like'}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isLiked ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                  <span>{isLiked ? 'Liked' : 'Like'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => onCopyContent(e, inspectItem)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-vault-dark bg-vault-cream text-vault-dark hover:bg-vault-dark hover:text-vault-cream font-sans text-sm font-bold transition-colors cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => onSaveToVault(e, inspectItem)}
                    className={`flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border-2 border-vault-dark font-sans text-sm font-bold transition-colors cursor-pointer ${
                      isSavedInVault
                        ? 'bg-vault-yellow text-vault-dark shadow-2xs'
                        : 'bg-vault-green text-vault-dark hover:bg-[#19b657]'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>
                      {isSavedInVault ? 'Saved in Vault' : 'Clone to Vault'}
                    </span>
                  </button>

                  {inspectItem.type === 'skill' && (
                    <button
                      type="button"
                      onClick={(e) => onDownloadSkill(e, inspectItem)}
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-vault-dark bg-vault-yellow text-vault-dark hover:bg-[#e7ee7b] font-sans text-sm font-bold transition-colors cursor-pointer"
                      title="Download .md file"
                    >
                      <Download className="w-4 h-4" />
                      <span>.md</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )
      )}
    </AnimatePresence>
  );
}
