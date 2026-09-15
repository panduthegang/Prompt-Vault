import { useState, useMemo, useEffect } from 'react';
import { FolderTree } from 'lucide-react';
import { useDragControls } from 'framer-motion';
import Toast, { ToastContainer, ToastType } from '../../components/ui/Toast';
import { useAuth } from '../../context/AuthContext';
import {
  MasterCategory,
  MasterItemType,
  TYPE_CONFIG,
} from '../../types/master';
import {
  getMasterCategories,
  createMasterCategory,
  updateMasterCategory,
  deleteMasterCategory,
} from '../../services/masterService';
import {
  AdminMastersHeader,
  AdminMastersStats,
  AdminMastersToolbar,
  AdminMastersCard,
  AdminMastersTable,
  AdminMasterModal,
  AdminMasterDeleteDialog,
  AdminMastersSkeletonCard,
  AdminMastersStatsSkeleton,
} from '../../components/Admin-Pages/Admin-Masters';

// Re-export types for consumer convenience
export type { MasterCategory, MasterItemType };

interface ActiveToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface CategoryErrorCopy {
  title: string;
  message: string;
}

function mapCategoryError(
  rawError: unknown,
  categoryName?: string,
  itemType?: MasterItemType
): CategoryErrorCopy {
  const raw = (
    rawError instanceof Error
      ? rawError.message
      : typeof rawError === 'string'
      ? rawError
      : (rawError as any)?.message || ''
  ).toLowerCase();

  // 1. Unique constraint violation on category name per scope
  if (
    raw.includes('idx_master_categories_unique_active') ||
    raw.includes('duplicate key') ||
    raw.includes('unique constraint') ||
    raw.includes('already exists')
  ) {
    const scopeLabel = itemType ? TYPE_CONFIG[itemType]?.label : 'this scope';
    return {
      title: 'Category Already Exists',
      message: categoryName
        ? `A category named "${categoryName}" already exists in ${scopeLabel}. Please choose a different name.`
        : `A category with this name already exists in ${scopeLabel}. Please choose a different name.`,
    };
  }

  // 2. Row Level Security / Permission Denied
  if (
    raw.includes('row-level security') ||
    raw.includes('permission denied') ||
    raw.includes('violates row-level security policy') ||
    raw.includes('unauthorized')
  ) {
    return {
      title: 'Admin Access Required',
      message: 'Only authenticated administrators have permission to modify master categories.',
    };
  }

  // 3. Network dropouts / Supabase connection errors
  if (
    raw.includes('failed to fetch') ||
    raw.includes('network') ||
    raw.includes('abort') ||
    raw.includes('load failed')
  ) {
    return {
      title: 'Connection Error',
      message: 'Unable to reach the database. Please check your internet connection and try again.',
    };
  }

  // 4. Fallback default
  return {
    title: 'Operation Failed',
    message: rawError instanceof Error ? rawError.message : 'An unexpected error occurred. Please try again.',
  };
}

export default function AdminMasters() {
  const { user } = useAuth();

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
  const [categories, setCategories] = useState<MasterCategory[]>([]);
  const [activeTypeFilter, setActiveTypeFilter] = useState<'all' | MasterItemType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch real categories from Supabase database via masterService
  const loadCategories = async (showShimmer = false) => {
    if (showShimmer) setIsLoading(true);
    try {
      const data = await getMasterCategories();
      setCategories(data);
    } catch (err: unknown) {
      const errCopy = mapCategoryError(err);
      showToast(errCopy.message, 'error', errCopy.title);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load on mount
  useEffect(() => {
    loadCategories(true);
  }, []);

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

  // Handle Save / Create from Modal (Persisted directly to Supabase DB)
  const handleSaveCategory = async (data: { name: string; itemType: MasterItemType; description: string }) => {
    try {
      if (editingCategory) {
        await updateMasterCategory(editingCategory.id, {
          name: data.name,
          itemType: data.itemType,
          description: data.description,
          userId: user?.id,
        });
        showToast(`Category "${data.name}" updated successfully!`, 'success', 'Updated');
      } else {
        await createMasterCategory({
          name: data.name,
          itemType: data.itemType,
          description: data.description,
          userId: user?.id,
        });
        showToast(
          `Category "${data.name}" added to ${TYPE_CONFIG[data.itemType].label}!`,
          'success',
          'Created'
        );
      }
      setIsModalOpen(false);
      await loadCategories(false);
    } catch (err: unknown) {
      const errCopy = mapCategoryError(err, data.name, data.itemType);
      showToast(errCopy.message, 'error', errCopy.title);
    }
  };

  // Confirm soft delete category (is_active = false in Supabase DB)
  const handleDeleteCategory = async (id: string) => {
    const target = categories.find((c) => c.id === id);
    try {
      await deleteMasterCategory(id, user?.id);
      setDeletingCategory(null);
      if (target) {
        showToast(`Category "${target.name}" removed from masters.`, 'info', 'Deleted');
      }
      await loadCategories(false);
    } catch (err: unknown) {
      const errCopy = mapCategoryError(err, target?.name, target?.itemType);
      showToast(errCopy.message, 'error', errCopy.title);
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
        {/* 1. Header with dynamic avatar from AuthContext DB */}
        <AdminMastersHeader
          totalCategories={metrics.total}
          onOpenCreate={handleOpenCreateModal}
        />

        {/* 2. 4-Card Metrics Summary */}
        {isLoading ? (
          <AdminMastersStatsSkeleton />
        ) : (
          <AdminMastersStats
            metrics={metrics}
            activeFilter={activeTypeFilter}
            onSelectFilter={setActiveTypeFilter}
          />
        )}

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
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <AdminMastersSkeletonCard key={`admin-skel-${idx}`} />
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
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
        ) : viewMode === 'grid' || isMobile ? (
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
