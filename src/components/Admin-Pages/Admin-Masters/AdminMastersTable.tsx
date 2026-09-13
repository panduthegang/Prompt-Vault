import { Edit3, Trash2 } from 'lucide-react';
import { MasterCategory, TYPE_CONFIG } from './adminMastersData';

interface AdminMastersTableProps {
  categories: MasterCategory[];
  onEdit: (cat: MasterCategory) => void;
  onDelete: (cat: MasterCategory) => void;
}

export default function AdminMastersTable({
  categories,
  onEdit,
  onDelete,
}: AdminMastersTableProps) {
  return (
    <section className="bg-vault-cream rounded-[26px] p-5 sm:p-6 border-2 border-vault-dark/15 shadow-xs space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-vault-dark/15 font-sans text-[11px] font-bold uppercase tracking-wider text-vault-dark/50">
              <th className="py-3 px-4">Category Name</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-right">Items Linked</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vault-dark/10 font-sans text-xs">
            {categories.map((category) => {
              const typeCfg = TYPE_CONFIG[category.itemType];
              const TypeIcon = typeCfg.icon;

              return (
                <tr key={category.id} className="hover:bg-vault-dark/5 transition-colors">
                  <td className="py-3 px-4 font-bold text-vault-dark text-sm">
                    {category.name}
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider bg-vault-yellow/50 text-vault-dark border border-vault-dark/20 inline-flex items-center gap-1">
                      <TypeIcon className="w-3 h-3" />
                      <span>{typeCfg.singular}</span>
                    </span>
                  </td>

                  <td className="py-3 px-4 text-vault-dark/70 max-w-md truncate">
                    {category.description || '—'}
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-bold text-vault-dark">
                    {category.itemCount}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onEdit(category)}
                        className="px-2.5 py-1 rounded-full font-sans text-xs font-semibold bg-white hover:bg-vault-yellow border border-vault-dark/20 text-vault-dark transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(category)}
                        className="p-1 rounded-full hover:bg-rose-100 text-vault-dark/50 hover:text-rose-700 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
