import React, { useState, useMemo } from 'react';
import { Users } from 'lucide-react';
import Toast, { ToastContainer, ToastType } from '../../components/ui/Toast';
import { copyToClipboard } from '../../utils/clipboard';
import {
  AdminUser,
  INITIAL_USERS,
  AdminUsersHeader,
  AdminUsersStats,
  AdminUsersToolbar,
  CreatorCard,
  AdminUsersTable,
  AdminUserInspectModal,
} from '../../components/Admin-Pages/Admin-Users';

// Re-export type for backward-compatibility
export type { AdminUser };

interface ActiveToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

export default function AdminUsers() {
  // Toast notification state
  const [activeToast, setActiveToast] = useState<ActiveToast | null>(null);

  const showToast = (message: string, type: ToastType = 'success', title?: string) => {
    setActiveToast({
      id: String(Date.now()),
      type,
      title,
      message,
    });
  };

  // State
  const [users] = useState<AdminUser[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('clones');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Interactive Inspection Modal State
  const [inspectingUser, setInspectingUser] = useState<AdminUser | null>(null);

  // Filtered and sorted users
  const filteredUsers = useMemo(() => {
    return users
      .filter((u) => {
        const query = searchQuery.toLowerCase();
        return (
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          u.handle.toLowerCase().includes(query) ||
          u.specialty.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'clones') return b.clonesCount - a.clonesCount;
        if (sortBy === 'prompts') return b.promptsCount - a.promptsCount;
        if (sortBy === 'upvotes') return b.upvotesCount - a.upvotesCount;
        if (sortBy === 'recent') return b.id.localeCompare(a.id);
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [users, searchQuery, sortBy]);

  // Executive summary metrics (Calculated from creator activity)
  const metrics = useMemo(() => {
    const totalCreators = users.length;
    const totalPrompts = users.reduce((acc, u) => acc + u.promptsCount, 0);
    const totalClones = users.reduce((acc, u) => acc + u.clonesCount, 0);
    const totalUpvotes = users.reduce((acc, u) => acc + u.upvotesCount, 0);
    return { totalCreators, totalPrompts, totalClones, totalUpvotes };
  }, [users]);

  const handleCopyEmail = async (email: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const ok = await copyToClipboard(email);
    if (ok) {
      showToast(`Copied ${email} to clipboard!`, 'success', 'Copied');
    }
  };

  return (
    <>
      {/* Toast Feedback Notification Container */}
      <ToastContainer>
        {activeToast && (
          <Toast
            key={activeToast.id}
            type={activeToast.type}
            title={activeToast.title}
            message={activeToast.message}
            onClose={() => setActiveToast(null)}
          />
        )}
      </ToastContainer>

      {/* Main Workspace Content Area */}
      <main className="flex-1 flex flex-col space-y-6 min-w-0 w-full pb-24 lg:pb-0">
        {/* 1. Header */}
        <AdminUsersHeader totalAuthors={users.length} />

        {/* 2. 4-Card Executive Metrics */}
        <AdminUsersStats metrics={metrics} />

        {/* 3. Search, Bespoke Sort Dropdown & View Switcher Toolbar */}
        <AdminUsersToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* 4. Creator Directory Display */}
        {filteredUsers.length === 0 ? (
          /* Empty Search State */
          <div className="bg-vault-cream rounded-[26px] p-10 border-2 border-vault-dark/15 text-center space-y-3">
            <Users className="w-10 h-10 text-vault-dark/30 mx-auto" />
            <h3 className="font-serif text-2xl text-vault-dark font-normal">
              No creators match your search
            </h3>
            <p className="font-sans text-xs text-vault-dark/60 max-w-sm mx-auto">
              Try adjusting your search query or clear your terms.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-full bg-vault-yellow border-2 border-vault-dark text-vault-dark font-sans text-xs font-bold hover:bg-vault-green transition-colors cursor-pointer"
            >
              Clear Search Query
            </button>
          </div>
        ) : (
          <>
            {/* 4A. Mobile View: Cards Grid */}
            <div className="md:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredUsers.map((user) => (
                  <CreatorCard
                    key={user.id}
                    user={user}
                    onInspect={() => setInspectingUser(user)}
                    onCopyEmail={(e) => handleCopyEmail(user.email, e)}
                  />
                ))}
              </div>
            </div>

            {/* 4B. Desktop/Tablet View: Table or Cards Grid */}
            <div className="hidden md:block">
              {viewMode === 'table' ? (
                <AdminUsersTable
                  users={filteredUsers}
                  totalUsersCount={users.length}
                  sortBy={sortBy}
                  onInspectUser={(user) => setInspectingUser(user)}
                />
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredUsers.map((user) => (
                    <CreatorCard
                      key={user.id}
                      user={user}
                      onInspect={() => setInspectingUser(user)}
                      onCopyEmail={(e) => handleCopyEmail(user.email, e)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* 5. View-Only Inspect User Modal / Bottom Sheet */}
      <AdminUserInspectModal
        user={inspectingUser}
        onClose={() => setInspectingUser(null)}
        onCopyEmail={handleCopyEmail}
      />
    </>
  );
}
