import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, DragControls } from 'framer-motion';
import { Bookmark, FileCode, Globe, Check, X } from 'lucide-react';
import { MasterCategory, MasterItemType } from './adminMastersData';

interface AdminMasterModalSheetProps {
  isOpen: boolean;
  editingCategory: MasterCategory | null;
  defaultType?: MasterItemType;
  isMobile: boolean;
  dragControls: DragControls;
  onClose: () => void;
  onSave: (data: { name: string; itemType: MasterItemType; description: string }) => void;
}

const TYPE_BUTTONS: { type: MasterItemType; label: string; icon: React.ElementType }[] = [
  { type: 'prompt', label: 'Prompt', icon: Bookmark },
  { type: 'skill', label: 'Skill Rule', icon: FileCode },
  { type: 'website', label: 'Website', icon: Globe },
];

export default function AdminMasterModalSheet({
  isOpen,
  editingCategory,
  defaultType = 'prompt',
  isMobile,
  dragControls,
  onClose,
  onSave,
}: AdminMasterModalSheetProps) {
  const [formType, setFormType] = useState<MasterItemType>(defaultType);
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');

  // Populate or reset fields when modal opens / editing target changes
  useEffect(() => {
    if (editingCategory) {
      setFormType(editingCategory.itemType);
      setFormName(editingCategory.name);
      setFormDescription(editingCategory.description);
    } else {
      setFormType(defaultType);
      setFormName('');
      setFormDescription('');
    }
  }, [editingCategory, defaultType, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;
    onSave({
      name: formName.trim(),
      itemType: formType,
      description: formDescription.trim(),
    });
  };

  // ─── Shared inner form (rendered in both mobile & desktop) ───────────────────
  const formBody = (
    <form
      id="admin-master-form"
      onSubmit={handleSubmit}
      className="flex-1 overflow-y-auto overscroll-contain py-4 space-y-4 pr-1 [scrollbar-width:thin]"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* 1. Target Scope */}
      <div className="space-y-2">
        <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/60">
          Category Scope
        </label>
        <div className="grid grid-cols-3 gap-2">
          {TYPE_BUTTONS.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormType(type)}
              className={`py-2.5 px-2 rounded-xl font-sans text-xs font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                formType === type
                  ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                  : 'bg-white hover:bg-vault-yellow/30 text-vault-dark border-vault-dark/20'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Category Name */}
      <div className="space-y-2">
        <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/60">
          Category Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder="e.g. Agent Skills, Security Rules..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-vault-dark text-sm font-medium focus:outline-none focus:ring-2 focus:ring-vault-green transition-all"
        />
      </div>

      {/* 3. Description */}
      <div className="space-y-2">
        <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/60">
          Description{' '}
          <span className="text-vault-dark/40 font-normal lowercase">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          placeholder="Brief description of what belongs in this category..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-vault-dark text-xs font-medium focus:outline-none focus:ring-2 focus:ring-vault-green resize-none transition-all"
        />
      </div>
    </form>
  );

  // ─── Shared footer actions ──────────────────────────────────────────────────
  const formFooter = (
    <div className="shrink-0 pt-3.5 border-t-2 border-vault-dark/15 flex items-center justify-end gap-2.5 bg-vault-cream">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 rounded-full font-sans text-xs font-semibold bg-white border border-vault-dark/30 text-vault-dark hover:bg-vault-dark/5 transition-colors cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="submit"
        form="admin-master-form"
        className="px-5 py-2 rounded-full font-sans text-xs font-bold bg-vault-green hover:brightness-105 text-vault-dark border-2 border-vault-dark shadow-xs transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
      >
        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>{editingCategory ? 'Save Changes' : 'Create Category'}</span>
      </button>
    </div>
  );

  // ─── Shared header ─────────────────────────────────────────────────────────
  const header = (isDraggable?: boolean) => (
    <div
      onPointerDown={
        isDraggable
          ? (e) => {
              if ((e.target as HTMLElement).closest('button')) return;
              dragControls.start(e);
            }
          : undefined
      }
      className={`shrink-0 flex items-start justify-between gap-3 pb-3.5 border-b-2 border-vault-dark/15 ${
        isDraggable ? 'touch-none cursor-grab active:cursor-grabbing select-none' : ''
      }`}
    >
      <div className="space-y-0.5">
        <h2 className="font-serif italic text-2xl text-vault-dark font-normal tracking-tight">
          {editingCategory ? 'Edit Category' : 'New Category'}
        </h2>
        <p className="font-sans text-xs text-vault-dark/60 font-medium">
          {editingCategory
            ? 'Update the category details below.'
            : 'Define a master category for vault items.'}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-8 h-8 rounded-full border border-vault-dark/20 flex items-center justify-center hover:bg-vault-dark/10 transition-colors cursor-pointer shrink-0"
        aria-label="Close"
      >
        <X className="w-4 h-4 text-vault-dark" />
      </button>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        isMobile ? (
          /* ── MOBILE: Draggable Instagram-style Bottom Sheet ─────────────── */
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

            {/* Draggable Sheet */}
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
              className="relative z-10 w-full bg-vault-cream border-t-2 border-vault-dark rounded-t-[32px] p-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] shadow-2xl flex flex-col max-h-[92dvh]"
            >
              {/* Pill Handle */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="w-full pt-1 pb-3 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none -mt-1 shrink-0"
              >
                <div className="w-12 h-1.5 bg-vault-dark/25 hover:bg-vault-dark/40 rounded-full transition-colors" />
              </div>

              {header(true)}
              {formBody}
              {formFooter}
            </motion.div>
          </div>
        ) : (
          /* ── DESKTOP: Centered Floating Modal ──────────────────────────── */
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
              className="bg-vault-cream border-2 border-vault-dark rounded-[28px] max-w-md w-full p-5 sm:p-7 shadow-2xl relative my-8 flex flex-col max-h-[85vh]"
            >
              {header()}
              {formBody}
              {formFooter}
            </motion.div>
          </div>
        )
      )}
    </AnimatePresence>
  );
}
