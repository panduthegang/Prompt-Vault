import { useState, useMemo } from 'react';
import Toast, { ToastContainer, ToastType } from '../../components/ui/Toast';
import { copyToClipboard } from '../../utils/clipboard';
import {
  INITIAL_ADMIN_USERS,
  AdminUserItem,
  AdminDashboardHeader,
  AdminDashboardStats,
  AdminDashboardVelocity,
  AdminDashboardLeaderboard,
  AdminDashboardCreatorsTable,
} from '../../components/Admin-Pages/Admin-Dashboard';

interface ActiveToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

export default function AdminDashboard() {
  // Toast notification state using proper Toast component
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
  const [users, setUsers] = useState<AdminUserItem[]>(INITIAL_ADMIN_USERS);
  const [userSearch, setUserSearch] = useState('');
  const [copiedLeaderboardId, setCopiedLeaderboardId] = useState<string | null>(null);

  const handleCopyPrompt = async (id: string, text: string, title: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedLeaderboardId(id);
      showToast(`Copied "${title}" template to clipboard!`, 'success', 'Copied');
      setTimeout(() => setCopiedLeaderboardId(null), 2000);
    }
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const next = u.status === 'Active' ? 'Suspended' : 'Active';
          showToast(
            `User ${u.name} marked as ${next}`,
            next === 'Active' ? 'success' : 'warning',
            'User Status'
          );
          return { ...u, status: next };
        }
        return u;
      })
    );
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.tier.toLowerCase().includes(userSearch.toLowerCase())
    );
  }, [users, userSearch]);

  return (
    <>
      {/* Official Toast Notification Container */}
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
        <AdminDashboardHeader />

        {/* 2. Key Metrics Summary Cards */}
        <AdminDashboardStats />

        {/* 3. Platform Velocity & Engagement Graph Section */}
        <AdminDashboardVelocity />

        {/* 4. Top Community Templates Leaderboard */}
        <AdminDashboardLeaderboard
          copiedLeaderboardId={copiedLeaderboardId}
          onCopyPrompt={handleCopyPrompt}
        />

        {/* 5. Creator Directory Table */}
        <AdminDashboardCreatorsTable
          users={filteredUsers}
          searchQuery={userSearch}
          onSearchChange={setUserSearch}
          onFilterClick={() => showToast('Creator filter options applied.', 'info', 'Filters')}
          onToggleStatus={handleToggleUserStatus}
        />
      </main>
    </>
  );
}
