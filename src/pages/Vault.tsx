import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDragControls } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Toast, { ToastContainer, ToastType } from '../components/ui/Toast';
import { copyToClipboard } from '../utils/clipboard';
import { Plus, Search } from 'lucide-react';

// Modular Vault Components & Data Store
import {
  VaultItem,
  VaultItemType,
  getStoredVaultItems,
  saveStoredVaultItems,
} from '../components/Vault-Page/vaultData';
import VaultHeader from '../components/Vault-Page/VaultHeader';
import VaultFilters, { VaultTabType } from '../components/Vault-Page/VaultFilters';
import VaultCard from '../components/Vault-Page/VaultCard';
import VaultModalSheet from '../components/Vault-Page/VaultModalSheet';
import { VaultDeleteDialog } from '../components/Vault-Page/VaultDeleteDialog';

export type { VaultItem, VaultItemType };

interface ActiveToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

export default function Vault() {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation & Data State
  const [items, setItems] = useState<VaultItem[]>(getStoredVaultItems);
  const [activeTab, setActiveTab] = useState<VaultTabType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Close card action menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.vault-card-menu-container')) {
        setOpenMenuId(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenuId(null);
    };

    if (openMenuId) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [openMenuId]);

  // Responsive device state
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Framer Motion drag controls for mobile bottom sheet (thumb-only drag)
  const dragControls = useDragControls();

  // Toast Notification State
  const [activeToast, setActiveToast] = useState<ActiveToast | null>(null);

  const showToast = (message: string, type: ToastType = 'success', title?: string) => {
    setActiveToast({
      id: Date.now().toString(),
      type,
      title,
      message,
    });
  };

  // URL query parameter synchronization
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab') || params.get('type');
    if (tabParam === 'prompt' || tabParam === 'prompts') {
      setActiveTab('prompt');
    } else if (tabParam === 'skill' || tabParam === 'skills') {
      setActiveTab('skill');
    } else if (tabParam === 'website' || tabParam === 'links' || tabParam === 'folders') {
      setActiveTab('website');
    } else if (tabParam === 'starred') {
      setActiveTab('starred');
    }

    if (params.get('add') === 'true' || params.get('action') === 'add') {
      setIsModalOpen(true);
    }
  }, [location.search]);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Delete Confirmation State
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<{ id: string; title: string } | null>(null);

  // Lock background scrolling when modal or delete confirmation is open
  useEffect(() => {
    if (isModalOpen || !!deleteConfirmItem) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [isModalOpen, deleteConfirmItem]);

  // Form Fields
  const [formType, setFormType] = useState<VaultItemType>('prompt');
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Agent Skills');
  const [formContent, setFormContent] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formTool, setFormTool] = useState('Cursor');
  const [formIsPublished, setFormIsPublished] = useState(false);

  // Sync to LocalStorage
  const updateItems = (newItems: VaultItem[]) => {
    setItems(newItems);
    saveStoredVaultItems(newItems);
  };

  // Open Modal in Create Mode
  const handleOpenAddModal = (defaultType?: VaultItemType) => {
    setEditingItemId(null);
    setFormType(defaultType || (activeTab === 'all' || activeTab === 'starred' ? 'prompt' : activeTab));
    setFormTitle('');
    setFormCategory('Agent Skills');
    setFormContent('');
    setFormUrl('');
    setFormTool('Cursor');
    setFormIsPublished(false);
    setIsModalOpen(true);
  };

  // Open Modal in Edit Mode
  const handleOpenEditModal = (item: VaultItem) => {
    setEditingItemId(item.id);
    setFormType(item.type);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormContent(item.content);
    setFormUrl(item.url || '');
    setFormTool(item.tool || 'Cursor');
    setFormIsPublished(!!item.isPublished);
    setIsModalOpen(true);
  };

  // Save (Create or Update)
  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      showToast('Please enter a title for this item', 'error', 'Missing Title');
      return;
    }

    if (formType === 'website') {
      if (!formUrl.trim()) {
        showToast('Please enter a valid website URL', 'error', 'Missing URL');
        return;
      }
    } else {
      if (!formContent.trim()) {
        showToast('Please enter the prompt or rule content', 'error', 'Missing Content');
        return;
      }
    }

    let formattedUrl = formUrl.trim();
    if (formattedUrl && !formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    if (editingItemId) {
      // UPDATE EXISTING
      const updated = items.map((item) => {
        if (item.id === editingItemId) {
          return {
            ...item,
            type: formType,
            title: formTitle.trim(),
            category: formCategory.trim(),
            content: formContent.trim(),
            url: formType === 'website' ? formattedUrl : undefined,
            tool: formType === 'skill' ? formTool.trim() : undefined,
            isPublished: formIsPublished,
          };
        }
        return item;
      });
      updateItems(updated);
      showToast(`"${formTitle.trim()}" updated successfully!`, 'success', 'Item Updated');
    } else {
      // CREATE NEW ITEM
      const newItem: VaultItem = {
        id: `vault-${Date.now()}`,
        type: formType,
        title: formTitle.trim(),
        category: formCategory.trim(),
        content: formContent.trim(),
        url: formType === 'website' ? formattedUrl : undefined,
        tool: formType === 'skill' ? formTool.trim() : undefined,
        timestamp: 'Just now',
        isStarred: false,
        isPublished: formIsPublished,
      };
      updateItems([newItem, ...items]);
      showToast(`New ${formType.toUpperCase()} added to your Vault!`, 'success', 'Item Saved');
    }

    setIsModalOpen(false);
  };

  // Delete Item
  const handleDeleteItem = (id: string, title: string) => {
    setDeleteConfirmItem({ id, title });
  };

  const confirmDelete = () => {
    if (!deleteConfirmItem) return;
    const { id, title } = deleteConfirmItem;
    const updated = items.filter((item) => item.id !== id);
    updateItems(updated);
    showToast(`Removed "${title}" from Vault`, 'info', 'Deleted');
    setDeleteConfirmItem(null);
  };

  // Toggle Star
  const handleToggleStar = (id: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, isStarred: !item.isStarred } : item
    );
    updateItems(updated);
  };

  // Download Skill as .md File
  const handleDownloadSkill = (item: VaultItem) => {
    try {
      const blob = new Blob([item.content], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const cleanName =
        item.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || 'skill';
      link.download = `${cleanName}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast(`Downloaded "${cleanName}.md" successfully!`, 'success', 'Downloaded');
    } catch (err) {
      console.error('Failed to download skill markdown file', err);
      showToast('Could not download markdown file', 'error', 'Download Failed');
    }
  };

  // Toggle Publish Status for any Item Type
  const handleTogglePublish = (id: string) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        return { ...item, isPublished: !item.isPublished };
      }
      return item;
    });
    updateItems(updated);

    const target = updated.find((i) => i.id === id);
    if (target?.isPublished) {
      showToast(`"${target.title}" published to Community!`, 'success', 'Published');
    } else {
      showToast(`"${target?.title}" unpublished from Community`, 'info', 'Unpublished');
    }
  };

  // Copy Item Text/URL
  const handleCopyItem = async (item: VaultItem) => {
    const textToCopy = item.type === 'website' && item.url ? item.url : item.content;
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopiedId(item.id);
      showToast(
        item.type === 'website' ? 'Website URL copied to clipboard!' : 'Prompt content copied to clipboard!',
        'success',
        'Copied'
      );
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Compute counts
  const counts = useMemo(() => {
    return {
      all: items.length,
      prompt: items.filter((i) => i.type === 'prompt').length,
      skill: items.filter((i) => i.type === 'skill').length,
      website: items.filter((i) => i.type === 'website').length,
      starred: items.filter((i) => i.isStarred).length,
    };
  }, [items]);

  // Filtered list
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Tab filter
      if (activeTab === 'starred' && !item.isStarred) return false;
      if (activeTab !== 'all' && activeTab !== 'starred' && item.type !== activeTab) return false;

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchContent = item.content.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        const matchUrl = item.url ? item.url.toLowerCase().includes(q) : false;
        const matchTool = item.tool ? item.tool.toLowerCase().includes(q) : false;
        return matchTitle || matchContent || matchCategory || matchUrl || matchTool;
      }

      return true;
    });
  }, [items, activeTab, selectedCategory, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-vault-cream text-vault-dark flex flex-col lg:flex-row p-3 sm:p-4 md:p-6 gap-4 sm:gap-6 selection:bg-vault-green selection:text-vault-dark relative items-start">
      {/* Dynamic Toast Notifications */}
      <ToastContainer>
        {activeToast && (
          <Toast
            key={activeToast.id}
            type={activeToast.type}
            title={activeToast.title}
            message={activeToast.message}
            duration={3500}
            onClose={() => setActiveToast(null)}
          />
        )}
      </ToastContainer>

      {/* Dark Sidebar */}
      <Sidebar
        activeTab="vault"
        onTabChange={(tab) => {
          if (tab === 'dashboard') navigate('/dashboard');
          else if (tab === 'settings') navigate('/settings');
          else if (tab === 'vault') setActiveTab('all');
        }}
        promptCount={counts.all}
        onOpenAddModal={() => handleOpenAddModal()}
      />

      {/* Main Vault Content */}
      <main className="flex-1 flex flex-col space-y-6 min-w-0 w-full pb-24 lg:pb-8">
        {/* Top Header */}
        <VaultHeader
          savedCount={counts.all}
          onOpenAddModal={() => handleOpenAddModal()}
        />

        {/* 5 Main Filter Tabs, Search & Categories */}
        <VaultFilters
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-vault-cream border-2 border-vault-dark/20 border-dashed rounded-[24px] p-8 sm:p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-vault-yellow/40 border-2 border-vault-dark/30 flex items-center justify-center mx-auto">
              <Search className="w-5 h-5 text-vault-dark/60" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-vault-dark font-normal">
              No vault items found
            </h3>
            <p className="font-sans text-xs sm:text-sm text-vault-dark/60 max-w-sm mx-auto">
              Try adjusting your search query or filters, or add a new prompt, skill rule, or website link.
            </p>
            <button
              type="button"
              onClick={() => handleOpenAddModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-vault-green text-vault-dark border-2 border-vault-dark rounded-full font-sans text-xs font-bold shadow-xs hover:brightness-105 cursor-pointer mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Item</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {filteredItems.map((item) => (
              <VaultCard
                key={item.id}
                item={item}
                isCopied={copiedId === item.id}
                isMenuOpen={openMenuId === item.id}
                onToggleMenu={(id) => setOpenMenuId(openMenuId === id ? null : id)}
                onCloseMenu={() => setOpenMenuId(null)}
                onToggleStar={handleToggleStar}
                onCopyItem={handleCopyItem}
                onDownloadSkill={handleDownloadSkill}
                onTogglePublish={handleTogglePublish}
                onOpenEditModal={handleOpenEditModal}
                onDeleteItem={handleDeleteItem}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add / Edit Modal & Mobile Bottom Sheet */}
      <VaultModalSheet
        isOpen={isModalOpen}
        isMobile={isMobile}
        editingItemId={editingItemId}
        dragControls={dragControls}
        onClose={() => setIsModalOpen(false)}
        formType={formType}
        setFormType={setFormType}
        formTitle={formTitle}
        setFormTitle={setFormTitle}
        formCategory={formCategory}
        setFormCategory={setFormCategory}
        formContent={formContent}
        setFormContent={setFormContent}
        formUrl={formUrl}
        setFormUrl={setFormUrl}
        formTool={formTool}
        setFormTool={setFormTool}
        formIsPublished={formIsPublished}
        setFormIsPublished={setFormIsPublished}
        onSaveItem={handleSaveItem}
      />

      {/* Custom Neo-Brutalist Delete Confirmation Modal */}
      <VaultDeleteDialog
        item={deleteConfirmItem}
        onClose={() => setDeleteConfirmItem(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
