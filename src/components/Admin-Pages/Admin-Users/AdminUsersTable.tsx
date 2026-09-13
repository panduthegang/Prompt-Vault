import { Check, Eye } from 'lucide-react';
import { AdminUser, SORT_OPTIONS } from './adminUsersData';

interface AdminUsersTableProps {
  users: AdminUser[];
  totalUsersCount: number;
  sortBy: string;
  onInspectUser: (user: AdminUser) => void;
}

export default function AdminUsersTable({
  users,
  totalUsersCount,
  sortBy,
  onInspectUser,
}: AdminUsersTableProps) {
  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.value === sortBy)?.label.toUpperCase() || 'CUSTOM';

  return (
    <section className="bg-vault-cream rounded-[26px] p-6 border-2 border-vault-dark/15 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-vault-dark/10">
        <span className="font-sans text-xs font-bold text-vault-dark/60">
          Showing {users.length} of {totalUsersCount} Creators
        </span>
        <span className="font-mono text-xs text-vault-dark/60">
          Ranked by {currentSortLabel}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-vault-dark/15 font-sans text-[11px] font-bold uppercase tracking-wider text-vault-dark/50">
              <th className="py-3 px-4">Creator</th>
              <th className="py-3 px-4">Specialty</th>
              <th className="py-3 px-4 text-right">Prompts</th>
              <th className="py-3 px-4 text-right">Clones Won</th>
              <th className="py-3 px-4 text-right">Upvotes</th>
              <th className="py-3 px-4">Member Since</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vault-dark/10 font-sans text-xs">
            {users.map((user) => (
              <tr
                key={user.id}
                onClick={() => onInspectUser(user)}
                className="hover:bg-vault-dark/5 transition-colors cursor-pointer group"
              >
                {/* Creator Identity */}
                <td className="py-3.5 px-4 font-bold text-vault-dark max-w-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-vault-dark/20 object-cover bg-vault-yellow/30 shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-vault-dark truncate leading-snug font-sans text-sm">
                          {user.name}
                        </span>
                        {user.isVerified && (
                          <span
                            className="w-3.5 h-3.5 rounded-full bg-vault-green text-vault-dark flex items-center justify-center shrink-0"
                            title="Verified Creator"
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-vault-dark/50 font-mono truncate">
                        @{user.handle}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Technical Specialty */}
                <td className="py-3.5 px-4 text-vault-dark/70 font-medium">
                  <span className="px-2.5 py-1 rounded-full bg-white/70 border border-vault-dark/15 text-[11px] whitespace-nowrap">
                    {user.specialty}
                  </span>
                </td>

                {/* Prompts Authored */}
                <td className="py-3.5 px-4 text-right font-mono font-bold text-vault-dark">
                  {user.promptsCount}
                </td>

                {/* Clones Won */}
                <td className="py-3.5 px-4 text-right font-mono font-bold text-vault-green">
                  {user.clonesCount.toLocaleString()}
                </td>

                {/* Upvotes */}
                <td className="py-3.5 px-4 text-right font-mono font-bold text-vault-dark/80">
                  {user.upvotesCount.toLocaleString()}
                </td>

                {/* Member Since */}
                <td className="py-3.5 px-4 text-vault-dark/60 font-mono text-[11px] whitespace-nowrap">
                  {user.joinedDate}
                </td>

                {/* View-Only Inspect Action */}
                <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => onInspectUser(user)}
                    className="px-3 py-1 rounded-full font-sans text-xs font-semibold bg-white/80 hover:bg-vault-yellow border border-vault-dark/20 text-vault-dark transition-colors cursor-pointer inline-flex items-center gap-1"
                    title="Inspect creator profile"
                  >
                    <Eye className="w-3 h-3 text-vault-dark/70" />
                    <span>Inspect</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
