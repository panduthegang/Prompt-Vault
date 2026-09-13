import React from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Check, X, Mail } from 'lucide-react';
import { AdminUser } from './adminUsersData';

interface AdminUserInspectModalProps {
  user: AdminUser | null;
  onClose: () => void;
  onCopyEmail: (email: string, e?: React.MouseEvent) => void;
}

export default function AdminUserInspectModal({
  user,
  onClose,
  onCopyEmail,
}: AdminUserInspectModalProps) {
  const inspectDragControls = useDragControls();

  return (
    <AnimatePresence>
      {user && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center overscroll-contain">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Box / Bottom Sheet */}
          <motion.div
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            drag="y"
            dragListener={false}
            dragControls={inspectDragControls}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 500) {
                onClose();
              }
            }}
            className="relative w-full md:max-w-2xl bg-vault-cream border-2 border-vault-dark rounded-t-[32px] md:rounded-[28px] shadow-2xl p-5 sm:p-6 z-10 max-h-[88dvh] md:max-h-[85vh] flex flex-col"
          >
            {/* Top Handle for mobile dragging */}
            <div
              onPointerDown={(e) => inspectDragControls.start(e)}
              className="md:hidden flex items-center justify-center pb-3 touch-none cursor-grab active:cursor-grabbing"
            >
              <div className="w-12 h-1.5 bg-vault-dark/30 rounded-full" />
            </div>

            {/* Sticky Header */}
            <div className="shrink-0 flex items-start justify-between gap-3 pb-4 border-b-2 border-vault-dark/15">
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-vault-dark object-cover bg-vault-yellow/40 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif italic text-xl sm:text-2xl text-vault-dark font-normal truncate">
                      {user.name}
                    </h2>
                    {user.isVerified && (
                      <span
                        className="w-4 h-4 rounded-full bg-vault-green text-vault-dark flex items-center justify-center shrink-0"
                        title="Verified Creator"
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-vault-dark/60 truncate">
                    @{user.handle} · {user.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-vault-dark/20 flex items-center justify-center hover:bg-vault-dark/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 text-vault-dark" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain py-4 space-y-4 [scrollbar-width:thin]">
              {/* Meta details row: Specialty, Member Since, Last Active */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="bg-white/70 p-2.5 rounded-xl border border-vault-dark/15">
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/50">
                    Technical Focus
                  </span>
                  <span className="font-sans text-xs font-bold text-vault-dark block mt-0.5">
                    {user.specialty}
                  </span>
                </div>

                <div className="bg-white/70 p-2.5 rounded-xl border border-vault-dark/15">
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/50">
                    Member Since
                  </span>
                  <span className="font-mono text-xs text-vault-dark/80 block mt-0.5">
                    {user.joinedDate}
                  </span>
                </div>

                <div className="bg-white/70 p-2.5 rounded-xl border border-vault-dark/15">
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/50">
                    Last Active
                  </span>
                  <span className="font-mono text-xs text-vault-dark/80 block mt-0.5">
                    {user.lastActive}
                  </span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-3 bg-vault-yellow/20 p-3.5 rounded-2xl border border-vault-dark/15 text-center">
                <div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/60 block">
                    Prompts Authored
                  </span>
                  <span className="font-serif text-2xl font-normal text-vault-dark">
                    {user.promptsCount}
                  </span>
                </div>

                <div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/60 block">
                    Community Clones
                  </span>
                  <span className="font-serif text-2xl font-normal text-vault-green">
                    {user.clonesCount.toLocaleString()}
                  </span>
                </div>

                <div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-vault-dark/60 block">
                    Upvotes Received
                  </span>
                  <span className="font-serif text-2xl font-normal text-vault-dark">
                    {user.upvotesCount}
                  </span>
                </div>
              </div>

              {/* Author Dossier & Bio */}
              <div className="space-y-1.5">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/60">
                  Author Dossier &amp; Bio
                </span>
                <div className="bg-white/70 p-3 rounded-xl border border-vault-dark/15 text-xs text-vault-dark leading-relaxed">
                  {user.bio}
                </div>
              </div>

              {/* Published Prompt Templates Preview */}
              {user.recentPrompts && user.recentPrompts.length > 0 && (
                <div className="space-y-2">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/60">
                    Top Authored Rules &amp; Templates
                  </span>
                  <div className="space-y-1.5">
                    {user.recentPrompts.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 border border-vault-dark/15 text-xs"
                      >
                        <div className="min-w-0 flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-vault-yellow/60 text-vault-dark">
                            {p.category}
                          </span>
                          <span className="font-medium text-vault-dark truncate">
                            {p.title}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-vault-green shrink-0 ml-2">
                          {p.clones.toLocaleString()} clones
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Bottom Actions (View-Only: Copy Email & Close) */}
            <div className="shrink-0 pt-3 border-t-2 border-vault-dark/15 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={(e) => onCopyEmail(user.email, e)}
                className="px-3.5 py-1.5 rounded-full bg-vault-cream border border-vault-dark/30 font-sans text-xs font-bold text-vault-dark hover:bg-vault-dark hover:text-vault-cream transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Copy Email ({user.email})</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-full bg-vault-yellow text-vault-dark border border-vault-dark font-sans text-xs font-bold hover:bg-vault-green transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
