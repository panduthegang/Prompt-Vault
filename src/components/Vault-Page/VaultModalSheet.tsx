import React from 'react';
import { motion, AnimatePresence, DragControls } from 'framer-motion';
import {
  X,
  Bookmark,
  FileCode,
  Globe,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import CustomSelect from '../ui/Select';
import { VaultItemType, TOOL_OPTIONS, CATEGORY_OPTIONS } from './vaultData';

export interface VaultModalSheetProps {
  isOpen: boolean;
  isMobile: boolean;
  editingItemId: string | null;
  dragControls: DragControls;
  onClose: () => void;
  formType: VaultItemType;
  setFormType: (type: VaultItemType) => void;
  formTitle: string;
  setFormTitle: (title: string) => void;
  formCategory: string;
  setFormCategory: (category: string) => void;
  formContent: string;
  setFormContent: (content: string) => void;
  formUrl: string;
  setFormUrl: (url: string) => void;
  formTool: string;
  setFormTool: (tool: string) => void;
  formIsPublished: boolean;
  setFormIsPublished: (published: boolean) => void;
  onSaveItem: (e: React.FormEvent) => void;
}

export default function VaultModalSheet({
  isOpen,
  isMobile,
  editingItemId,
  dragControls,
  onClose,
  formType,
  setFormType,
  formTitle,
  setFormTitle,
  formCategory,
  setFormCategory,
  formContent,
  setFormContent,
  formUrl,
  setFormUrl,
  formTool,
  setFormTool,
  formIsPublished,
  setFormIsPublished,
  onSaveItem,
}: VaultModalSheetProps) {
  const renderForm = () => (
    <form onSubmit={onSaveItem} className="space-y-4">
      {/* Type Switcher Segmented Control */}
      <div className="space-y-1.5">
        <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
          Item Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setFormType('prompt')}
            className={`py-2 px-3 rounded-xl border-2 font-sans text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              formType === 'prompt'
                ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                : 'bg-white/60 text-vault-dark border-vault-dark/20 hover:border-vault-dark'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Prompt</span>
          </button>

          <button
            type="button"
            onClick={() => setFormType('skill')}
            className={`py-2 px-3 rounded-xl border-2 font-sans text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              formType === 'skill'
                ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                : 'bg-white/60 text-vault-dark border-vault-dark/20 hover:border-vault-dark'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Skill Rule</span>
          </button>

          <button
            type="button"
            onClick={() => setFormType('website')}
            className={`py-2 px-3 rounded-xl border-2 font-sans text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              formType === 'website'
                ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                : 'bg-white/60 text-vault-dark border-vault-dark/20 hover:border-vault-dark'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Website Link</span>
          </button>
        </div>
      </div>

      {/* Title Field */}
      <div className="space-y-1.5">
        <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
          Title
        </label>
        <input
          type="text"
          required
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder={
            formType === 'prompt'
              ? 'e.g. Next.js 14 System Architect Prompt'
              : formType === 'skill'
              ? 'e.g. Cursor Next.js App Router Rules'
              : 'e.g. Anthropic Prompt Engineering Docs'
          }
          className="w-full bg-white text-vault-dark border-2 border-vault-dark rounded-xl px-4 py-2.5 font-sans text-xs sm:text-sm placeholder:text-vault-dark/40 focus:outline-none focus:ring-2 focus:ring-vault-green"
        />
      </div>

      {/* Website URL Field (Only for Websites) */}
      {formType === 'website' && (
        <div className="space-y-1.5">
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
            Website URL
          </label>
          <div className="relative">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-vault-dark/50" />
            <input
              type="text"
              required
              value={formUrl}
              onChange={(e) => setFormUrl(e.target.value)}
              placeholder="https://docs.anthropic.com/..."
              className="w-full bg-white text-vault-dark border-2 border-vault-dark rounded-xl pl-10 pr-4 py-2.5 font-mono text-xs sm:text-sm placeholder:text-vault-dark/40 focus:outline-none focus:ring-2 focus:ring-vault-green"
            />
          </div>
        </div>
      )}

      {/* Target Tool (Only for Skills) */}
      {formType === 'skill' && (
        <div className="space-y-1.5">
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
            Target Tool / Environment
          </label>
          <CustomSelect
            value={formTool}
            onChange={setFormTool}
            options={TOOL_OPTIONS}
            placeholder="Select Target Tool..."
          />
        </div>
      )}

      {/* Category Field */}
      <div className="space-y-1.5">
        <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
          Category
        </label>
        <CustomSelect
          value={formCategory}
          onChange={setFormCategory}
          options={CATEGORY_OPTIONS}
          placeholder="Select Category..."
        />
      </div>

      {/* Content / Prompt Text / Description */}
      <div className="space-y-1.5">
        <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
          {formType === 'website' ? 'Description & Notes' : 'Prompt / Rule Content'}
        </label>
        <textarea
          rows={formType === 'website' ? 3 : 4}
          required={formType !== 'website'}
          value={formContent}
          onChange={(e) => setFormContent(e.target.value)}
          placeholder={
            formType === 'prompt'
              ? 'Paste your master prompt or system instructions here...'
              : formType === 'skill'
              ? 'Paste your markdown rules (e.g. - Always enforce strict TypeScript...)'
              : 'Add notes, keywords, or summary of this website link...'
          }
          className="w-full bg-white text-vault-dark border-2 border-vault-dark rounded-xl p-3 font-mono text-xs sm:text-sm placeholder:text-vault-dark/40 focus:outline-none focus:ring-2 focus:ring-vault-green resize-none"
        />
      </div>

      {/* Publish to Community Option */}
      <div className="flex items-center justify-between p-3 bg-white/70 border-2 border-vault-dark/20 rounded-xl gap-3">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg bg-vault-green/20 border border-vault-dark/20 flex items-center justify-center text-vault-dark shrink-0">
            <Share2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="font-sans text-xs font-bold text-vault-dark block truncate">
              Publish to Community
            </span>
            <span className="font-sans text-[11px] text-vault-dark/60 block leading-tight">
              Make this item visible to the Prompt Vault community
            </span>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={formIsPublished}
          onClick={() => setFormIsPublished(!formIsPublished)}
          className={`w-11 h-6 rounded-full border-2 border-vault-dark transition-colors relative cursor-pointer shrink-0 focus:outline-none ${
            formIsPublished ? 'bg-vault-green' : 'bg-vault-cream'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-vault-dark transition-transform duration-200 ease-in-out shrink-0 ${
              formIsPublished ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Modal Actions */}
      <div className="pt-3 pb-1 flex items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 rounded-full border-2 border-vault-dark text-vault-dark font-sans text-xs sm:text-sm font-bold hover:bg-vault-yellow/40 cursor-pointer transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-vault-green text-vault-dark border-2 border-vault-dark font-sans text-xs sm:text-sm font-bold shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          <span>{editingItemId ? 'Save Changes' : 'Save to Vault'}</span>
        </button>
      </div>
    </form>
  );

  return (
    <AnimatePresence>
      {isOpen && (
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
              onDragEnd={(_e, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  onClose();
                }
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative z-10 w-full max-w-lg mx-auto bg-vault-cream border-t-2 border-vault-dark rounded-t-[32px] p-5 pb-[max(3.5rem,env(safe-area-inset-bottom))] shadow-2xl space-y-4 max-h-[90dvh] overflow-y-auto overscroll-contain"
            >
              {/* Draggable Grab Handle Indicator (Pill Thumb) */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="w-full pt-1 pb-3 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none -mt-1"
              >
                <div className="w-12 h-1.5 bg-vault-dark/25 hover:bg-vault-dark/40 rounded-full" />
              </div>

              {/* Sheet Header */}
              <div className="flex items-center justify-between border-b-2 border-vault-dark/15 pb-3">
                <div>
                  <h2 className="font-serif text-2xl text-vault-dark font-normal">
                    {editingItemId ? 'Edit Vault Item' : 'Add to Vault'}
                  </h2>
                  <p className="font-sans text-xs text-vault-dark/70">
                    Save master prompts, agent skill rules, or website bookmarks.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-vault-dark/20 flex items-center justify-center hover:bg-vault-dark/10 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4 text-vault-dark" />
                </button>
              </div>

              {renderForm()}
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
              className="bg-vault-cream border-2 border-vault-dark rounded-[24px] sm:rounded-[28px] max-w-lg w-full p-5 sm:p-7 space-y-5 shadow-2xl relative my-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b-2 border-vault-dark/15 pb-4">
                <div>
                  <h2 className="font-serif text-2xl text-vault-dark font-normal">
                    {editingItemId ? 'Edit Vault Item' : 'Add to Vault'}
                  </h2>
                  <p className="font-sans text-xs text-vault-dark/70">
                    Save master prompts, agent skill rules, or website bookmarks.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-vault-dark/20 flex items-center justify-center hover:bg-vault-dark/10 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4 text-vault-dark" />
                </button>
              </div>

              {renderForm()}
            </motion.div>
          </div>
        )
      )}
    </AnimatePresence>
  );
}
