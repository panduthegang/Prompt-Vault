import { Edit3, Trash2 } from 'lucide-react';
import { MasterCategory, TYPE_CONFIG } from '../../../types/master';

interface AdminMastersCardProps {
  category: MasterCategory;
  onEdit: (cat: MasterCategory) => void;
  onDelete: (cat: MasterCategory) => void;
}

export default function AdminMastersCard({
  category,
  onEdit,
  onDelete,
}: AdminMastersCardProps) {
  const typeCfg = TYPE_CONFIG[category.itemType];
  const TypeIcon = typeCfg.icon;

  return (
    <div className="bg-vault-cream rounded-[24px] p-4 sm:p-5 border-2 border-vault-dark flex flex-col justify-between space-y-3 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#002D0F] transition-all duration-200 relative group">
      {/* Top Row: Category Name + Type Badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-base text-vault-dark font-sans truncate">
            {category.name}
          </h3>
          <span className="font-mono text-[11px] text-vault-dark/50 block pt-0.5">
            Added {category.createdAt}
          </span>
        </div>

        {/* Scope Pill Badge */}
        <span className="px-2.5 py-0.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider bg-vault-yellow/50 text-vault-dark border border-vault-dark/20 shrink-0 inline-flex items-center gap-1">
          <TypeIcon className="w-3 h-3" />
          <span>{typeCfg.singular}</span>
        </span>
      </div>

      {/* Description */}
      <p className="font-sans text-xs text-vault-dark/70 line-clamp-2 leading-relaxed min-h-[32px]">
        {category.description || 'No description provided.'}
      </p>

      {/* Bottom Meta & Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-vault-dark/10 gap-2">
        <span className="font-mono text-xs font-bold text-vault-dark/70">
          {category.itemCount} items linked
        </span>

        {/* Actions: Edit & Delete */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(category)}
            className="px-2.5 py-1 rounded-full font-sans text-xs font-bold bg-white hover:bg-vault-yellow text-vault-dark border border-vault-dark/20 transition-colors cursor-pointer inline-flex items-center gap-1"
            title="Edit category"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>

          <button
            type="button"
            onClick={() => onDelete(category)}
            className="p-1 rounded-full hover:bg-rose-100 text-vault-dark/50 hover:text-rose-700 transition-colors cursor-pointer"
            title="Delete category"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
