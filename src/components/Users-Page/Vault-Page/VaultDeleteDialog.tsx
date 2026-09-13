import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import type { VaultItem } from './vaultData';

interface VaultDeleteDialogProps {
  item: { id: string; title: string } | VaultItem | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const VaultDeleteDialog = ({
  item,
  onClose,
  onConfirm,
}: VaultDeleteDialogProps) => {
  return (
    <AnimatePresence>
      {item && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto overscroll-contain"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="bg-vault-cream border-2 border-vault-dark rounded-[24px] sm:rounded-[28px] max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl relative"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full border border-vault-dark/20 flex items-center justify-center hover:bg-vault-dark/10 transition-colors cursor-pointer text-vault-dark"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon & Warning Header */}
            <div className="flex items-start gap-4 pr-6">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border-2 border-vault-dark flex items-center justify-center text-red-600 shrink-0 shadow-xs">
                <Trash2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-red-600 block">
                  Confirm Removal
                </span>
                <h3 className="font-serif text-2xl text-vault-dark font-normal leading-tight mt-0.5">
                  Delete from Vault?
                </h3>
              </div>
            </div>

            {/* Body message with item title */}
            <div className="bg-white/80 border-2 border-vault-dark/15 rounded-xl p-3.5 space-y-1">
              <p className="font-sans text-xs text-vault-dark/70">
                Are you sure you want to permanently remove this entry?
              </p>
              <p className="font-sans text-xs sm:text-sm font-bold text-vault-dark line-clamp-2">
                "{item.title}"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border-2 border-vault-dark text-vault-dark font-sans text-xs sm:text-sm font-bold hover:bg-vault-yellow/40 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="px-5 py-2.5 rounded-full bg-red-600 text-white border-2 border-vault-dark font-sans text-xs sm:text-sm font-bold shadow-xs hover:bg-red-700 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4 stroke-[2.2]" />
                <span>Delete Entry</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
