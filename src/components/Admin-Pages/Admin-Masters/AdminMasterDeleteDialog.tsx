import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { MasterCategory } from '../../../types/master';

interface AdminMasterDeleteDialogProps {
  category: MasterCategory | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export default function AdminMasterDeleteDialog({
  category,
  onClose,
  onConfirm,
}: AdminMasterDeleteDialogProps) {
  return (
    <AnimatePresence>
      {category && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overscroll-contain">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            className="relative w-full max-w-sm bg-vault-cream border-2 border-vault-dark rounded-[24px] shadow-2xl p-5 sm:p-6 z-10 space-y-4 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 border-2 border-rose-300 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif text-xl text-vault-dark font-normal">
                Delete Category?
              </h3>
              <p className="font-sans text-xs text-vault-dark/70 pt-1">
                Are you sure you want to delete <strong>"{category.name}"</strong>?
                {category.itemCount > 0 && (
                  <span className="block text-rose-700 font-semibold pt-1">
                    Warning: {category.itemCount} items currently use this category.
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full font-sans text-xs font-semibold bg-white border border-vault-dark/30 text-vault-dark hover:bg-vault-dark/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => onConfirm(category.id)}
                className="px-4 py-2 rounded-full font-sans text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white border-2 border-vault-dark shadow-xs transition-colors cursor-pointer"
              >
                Delete Category
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
