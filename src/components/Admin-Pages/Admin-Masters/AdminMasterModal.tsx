import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Bookmark, FileCode, Globe, Check, X } from 'lucide-react';
import { MasterCategory, MasterItemType } from './adminMastersData';

interface AdminMasterModalProps {
  isOpen: boolean;
  editingCategory: MasterCategory | null;
  defaultType?: MasterItemType;
  onClose: () => void;
  onSave: (data: { name: string; itemType: MasterItemType; description: string }) => void;
}

export default function AdminMasterModal({
  isOpen,
  editingCategory,
  defaultType = 'prompt',
  onClose,
  onSave,
}: AdminMasterModalProps) {
  const modalDragControls = useDragControls();

  const [formType, setFormType] = useState<MasterItemType>(defaultType);
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');

  // Reset or populate fields when modal opens / category changes
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center overscroll-contain">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Box / Mobile Draggable Sheet */}
          <motion.div
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            drag="y"
            dragListener={false}
            dragControls={modalDragControls}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 500) {
                onClose();
              }
            }}
            className="relative w-full md:max-w-md bg-vault-cream border-2 border-vault-dark rounded-t-[32px] md:rounded-[28px] shadow-2xl p-5 sm:p-6 z-10 flex flex-col"
          >
            {/* Mobile grab handle */}
            <div
              onPointerDown={(e) => modalDragControls.start(e)}
              className="md:hidden flex items-center justify-center pb-3 touch-none cursor-grab active:cursor-grabbing"
            >
              <div className="w-12 h-1.5 bg-vault-dark/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b-2 border-vault-dark/15">
              <div>
                <h2 className="font-serif italic text-xl sm:text-2xl text-vault-dark font-normal">
                  {editingCategory ? 'Edit Category' : 'Create Category'}
                </h2>
                <p className="font-sans text-xs text-vault-dark/60 font-medium">
                  Add categories for user selection in the vault.
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

            {/* Form Body */}
            <form id="category-master-form" onSubmit={handleSubmit} className="py-4 space-y-4">
              {/* 1. Target Item Type Selection */}
              <div className="space-y-1.5">
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                  Category Scope / Target Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormType('prompt')}
                    className={`py-2 px-2.5 rounded-xl font-sans text-xs font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      formType === 'prompt'
                        ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                        : 'bg-white hover:bg-vault-yellow/30 text-vault-dark border-vault-dark/20'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 shrink-0" />
                    <span>Prompt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormType('skill')}
                    className={`py-2 px-2.5 rounded-xl font-sans text-xs font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      formType === 'skill'
                        ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                        : 'bg-white hover:bg-vault-yellow/30 text-vault-dark border-vault-dark/20'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5 shrink-0" />
                    <span>Skill Rule</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormType('website')}
                    className={`py-2 px-2.5 rounded-xl font-sans text-xs font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      formType === 'website'
                        ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                        : 'bg-white hover:bg-vault-yellow/30 text-vault-dark border-vault-dark/20'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span>Website</span>
                  </button>
                </div>
              </div>

              {/* 2. Category Name */}
              <div className="space-y-1.5">
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Agent Skills, Security Rules..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-vault-dark text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-vault-green"
                />
              </div>

              {/* 3. Description */}
              <div className="space-y-1.5">
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                  Description <span className="text-vault-dark/40 font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Brief description of what belongs in this category..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-vault-dark text-xs font-medium focus:outline-none focus:ring-2 focus:ring-vault-green resize-none"
                />
              </div>
            </form>

            {/* Bottom Actions */}
            <div className="pt-3.5 border-t-2 border-vault-dark/15 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full font-sans text-xs font-semibold bg-white border border-vault-dark/30 text-vault-dark hover:bg-vault-dark/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="category-master-form"
                className="px-5 py-2 rounded-full font-sans text-xs font-bold bg-vault-green hover:brightness-105 text-vault-dark border-2 border-vault-dark shadow-xs transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{editingCategory ? 'Save Changes' : 'Create Category'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
