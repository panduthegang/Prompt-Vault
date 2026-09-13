import { Search, Filter } from 'lucide-react';
import { AdminUserItem } from './adminDashboardData';

interface AdminDashboardCreatorsTableProps {
  users: AdminUserItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterClick: () => void;
  onToggleStatus: (id: string) => void;
}

export default function AdminDashboardCreatorsTable({
  users,
  searchQuery,
  onSearchChange,
  onFilterClick,
  onToggleStatus,
}: AdminDashboardCreatorsTableProps) {
  return (
    <section className="bg-vault-cream rounded-[26px] p-5 sm:p-6 border-2 border-vault-dark/15 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-vault-dark/10">
        <div>
          <h2 className="font-serif text-2xl text-vault-dark font-normal">
            Platform Creators
          </h2>
          <p className="font-sans text-xs text-vault-dark/60 font-medium">
            Registered authors, membership tiers, and platform permissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-48 sm:w-64">
            <Search className="w-3.5 h-3.5 text-vault-dark/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search creator..."
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-vault-cream border border-vault-dark/20 text-xs font-medium focus:outline-none focus:border-vault-dark"
            />
          </div>

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
              <th className="py-3 px-4">Creator</th>
              <th className="py-3 px-4">Tier</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Joined</th>
              <th className="py-3 px-4 text-right">Prompts</th>
              <th className="py-3 px-4 text-right">Clones Won</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vault-dark/10 font-sans text-xs">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-vault-dark/5 transition-colors">
                <td className="py-3.5 px-4 font-bold text-vault-dark max-w-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full border border-vault-dark/20 object-cover bg-vault-yellow/30"
                    />
                    <div>
                      <div className="font-bold text-vault-dark leading-snug">{user.name}</div>
                      <div className="text-[11px] text-vault-dark/50 font-mono">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[10px] font-extrabold border ${
                      user.tier === 'Enterprise'
                        ? 'bg-vault-dark text-vault-cream border-vault-dark'
                        : user.tier === 'Pro'
                        ? 'bg-vault-green/20 text-vault-dark border-vault-green'
                        : 'bg-vault-dark/5 text-vault-dark/70 border-vault-dark/15'
                    }`}
                  >
                    {user.tier}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${
                      user.status === 'Active'
                        ? 'bg-vault-green/20 text-vault-dark border-vault-green'
                        : 'bg-rose-100 text-rose-800 border-rose-300'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        user.status === 'Active' ? 'bg-vault-green' : 'bg-rose-600'
                      }`}
                    />
                    {user.status}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-vault-dark/60 font-mono">
                  {user.joinedDate}
                </td>

                <td className="py-3.5 px-4 text-right font-mono font-bold text-vault-dark">
                  {user.promptsCount}
                </td>

                <td className="py-3.5 px-4 text-right font-mono font-bold text-vault-green">
                  {user.clonesCount}
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => onToggleStatus(user.id)}
                    className={`px-3 py-1 rounded-full font-sans text-xs font-semibold border transition-colors cursor-pointer ${
                      user.status === 'Active'
                        ? 'border-vault-dark/20 text-vault-dark/80 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300'
                        : 'border-vault-dark text-vault-dark hover:bg-vault-yellow'
                    }`}
                  >
                    {user.status === 'Active' ? 'Suspend' : 'Activate'}
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
