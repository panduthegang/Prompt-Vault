import { useState, useMemo, useEffect } from 'react';
import { FolderTree } from 'lucide-react';
import { useDragControls } from 'framer-motion';
import Toast, { ToastContainer, ToastType } from '../../components/ui/Toast';
import {
  MasterCategory,
  MasterItemType,
  getStoredCategories,
  saveStoredCategories,
  AdminMastersHeader,
  AdminMastersStats,
  AdminMastersToolbar,
  AdminMastersCard,
  AdminMastersTable,
  AdminMasterModal,
  AdminMasterDeleteDialog,
  TYPE_CONFIG,
} from '../../components/Admin-Pages/Admin-Masters';

// Re-export types for consumer convenience
export type { MasterCategory, MasterItemType };

interface ActiveToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

export default function AdminMasters() {
  // Toast feedback state
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
  const [categories, setCategories] = useState<MasterCategory[]>(getStoredCategories);
  const [activeTypeFilter, setActiveTypeFilter] = useState<'all' | MasterItemType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Responsive: mobile bottom sheet vs desktop centered modal
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Drag controls for the mobile bottom sheet
  const modalDragControls = useDragControls();

  // Modal / Dialog states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<MasterCategory | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<MasterCategory | null>(null);

  // Lock background scrolling when modal or delete confirmation is open.
  // We compensate for the scrollbar width so the sticky sidebar doesn't jump.
  useEffect(() => {
    if (isModalOpen || !!deletingCategory) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isModalOpen, deletingCategory]);

  // Sync to localStorage
  useEffect(() => {
    saveStoredCategories(categories);
  }, [categories]);

  // Derived metrics
  const metrics = useMemo(() => {
    const total = categories.length;
    const promptCount = categories.filter((c) => c.itemType === 'prompt').length;
    const skillCount = categories.filter((c) => c.itemType === 'skill').length;
    const websiteCount = categories.filter((c) => c.itemType === 'website').length;
    return { total, promptCount, skillCount, websiteCount };
  }, [categories]);

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return categories.filter((item) => {
      if (activeTypeFilter !== 'all' && item.itemType !== activeTypeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [categories, activeTypeFilter, searchQuery]);

  // Open modal for creating
  const handleOpenCreateModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (cat: MasterCategory) => {
    setEditingCategory(cat);
    setIsModalOpen(true);
  };

  // Handle Save / Create from Modal
  const handleSaveCategory = (data: { name: string; itemType: MasterItemType; description: string }) => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...cat,
                name: data.name,
                itemType: data.itemType,
                description: data.description,
              }
            : cat
        )
      );
      showToast(`Category "${data.name}" updated successfully!`, 'success', 'Updated');
    } else {
      const newCategory: MasterCategory = {
        id: `cat-${Date.now()}`,
        name: data.name,
        itemType: data.itemType,
        description: data.description,
        itemCount: 0,
        createdAt: 'Just now',
      };
      setCategories((prev) => [newCategory, ...prev]);
      showToast(
        `Category "${newCategory.name}" added to ${TYPE_CONFIG[newCategory.itemType].label}!`,
        'success',
        'Created'
      );
    }
    setIsModalOpen(false);
  };

  // Confirm delete category
  const handleDeleteCategory = (id: string) => {
    const target = categories.find((c) => c.id === id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setDeletingCategory(null);
    if (target) {
      showToast(`Category "${target.name}" removed from masters.`, 'info', 'Deleted');
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

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col space-y-6 min-w-0 w-full pb-24 lg:pb-0">
        {/* 1. Header */}
        <AdminMastersHeader
          totalCategories={metrics.total}
          onOpenCreate={handleOpenCreateModal}
        />

        {/* 2. 4-Card Metrics Summary */}
        <AdminMastersStats
          metrics={metrics}
          activeFilter={activeTypeFilter}
          onSelectFilter={setActiveTypeFilter}
        />

        {/* 3. Filter Tabs & Toolbar */}
        <AdminMastersToolbar
          activeFilter={activeTypeFilter}
          onSelectFilter={setActiveTypeFilter}
          totalCount={metrics.total}
          promptCount={metrics.promptCount}
          skillCount={metrics.skillCount}
          websiteCount={metrics.websiteCount}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* 4. Categories Listing */}
        {filteredCategories.length === 0 ? (
          <div className="bg-vault-cream rounded-[26px] p-10 border-2 border-vault-dark/15 text-center space-y-3">
            <FolderTree className="w-10 h-10 text-vault-dark/30 mx-auto" />
            <h3 className="font-serif text-2xl text-vault-dark font-normal">No categories found</h3>
            <p className="font-sans text-xs text-vault-dark/60 max-w-sm mx-auto">
              No categories matched your search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveTypeFilter('all');
              }}
              className="px-4 py-2 rounded-full bg-vault-yellow border-2 border-vault-dark text-vault-dark font-sans text-xs font-bold hover:bg-vault-green transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {filteredCategories.map((category) => (
              <AdminMastersCard
                key={category.id}
                category={category}
                onEdit={handleOpenEditModal}
                onDelete={setDeletingCategory}
              />
            ))}
          </div>
        ) : (
          <AdminMastersTable
            categories={filteredCategories}
            onEdit={handleOpenEditModal}
            onDelete={setDeletingCategory}
          />
        )}
      </main>

      {/* 5. Create / Edit Modal & Bottom Sheet */}
      <AdminMasterModal
        isOpen={isModalOpen}
        editingCategory={editingCategory}
        defaultType={activeTypeFilter !== 'all' ? activeTypeFilter : 'prompt'}
        isMobile={isMobile}
        dragControls={modalDragControls}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
      />

      {/* 6. Delete Confirmation Dialog */}
      <AdminMasterDeleteDialog
        category={deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDeleteCategory}
      />
    </>
  );
}
