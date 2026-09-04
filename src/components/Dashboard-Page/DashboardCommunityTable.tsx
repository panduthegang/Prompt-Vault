import { Filter, Heart } from 'lucide-react';
import { CommunityItem } from './dashboardData';

export interface DashboardCommunityTableProps {
  items: CommunityItem[];
  onFilterClick?: () => void;
}

export default function DashboardCommunityTable({
  items,
  onFilterClick,
}: DashboardCommunityTableProps) {
  return (
    <section className="bg-vault-cream rounded-[26px] p-5 sm:p-6 border-2 border-vault-dark/15 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-vault-dark font-normal">
            Published Snapshots
          </h2>
          <p className="font-sans text-xs text-vault-dark/60 font-medium">
            Publicly shared prompt templates and community contributions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onFilterClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-vault-cream border border-vault-dark/20 text-vault-dark font-sans text-xs font-semibold cursor-pointer hover:bg-vault-yellow/40 transition-colors"
          >
            <Filter className="w-3.5 h-3.5 text-vault-dark/70" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-vault-dark/10 font-sans text-[11px] font-bold uppercase tracking-wider text-vault-dark/50">
              <th className="py-3 px-4">Prompt Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Published</th>
              <th className="py-3 px-4 text-right">Views</th>
              <th className="py-3 px-4 text-right">Likes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vault-dark/10 font-sans text-xs">
            {items.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-vault-dark/5 transition-colors"
              >
                <td className="py-3.5 px-4 font-bold text-vault-dark max-w-xs truncate">
                  {row.title}
                </td>
                <td className="py-3.5 px-4 text-vault-dark/70 font-medium">
                  {row.category}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${
                      row.status === 'Live'
                        ? 'bg-vault-green/20 text-vault-dark border-vault-green'
                        : 'bg-vault-yellow/50 text-vault-dark border-vault-dark/20'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        row.status === 'Live' ? 'bg-vault-green animate-pulse' : 'bg-vault-dark/50'
                      }`}
                    />
                    {row.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-vault-dark/60">
                  {row.publishedDate}
                </td>
                <td className="py-3.5 px-4 text-right font-medium text-vault-dark/80">
                  {row.views.toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-vault-dark">
                  <div className="flex items-center justify-end gap-1">
                    <Heart className="w-3.5 h-3.5 text-vault-dark fill-vault-dark/20" />
                    <span>{row.likes}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
