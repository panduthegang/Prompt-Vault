import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import {
  FolderTree,
  Plus,
  Search,
  Bookmark,
  FileCode,
  Globe,
  Check,
  X,
  Edit3,
  Trash2,
  LayoutGrid,
  List,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import Toast, { ToastContainer, ToastType } from '../../components/ui/Toast';

// ============================================================================
// 1. DATA MODELS & TYPES
// ============================================================================

export type MasterItemType = 'prompt' | 'skill' | 'website';

export interface MasterCategory {
  id: string;
  name: string;
  itemType: MasterItemType;
  description: string;
  itemCount: number;
  createdAt: string;
}

interface ActiveToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

const INITIAL_MASTER_CATEGORIES: MasterCategory[] = [
  // Prompt Categories
  {
    id: 'cat-p1',
    name: 'Agent Skills',
    itemType: 'prompt',
    description: 'Autonomous agent instructions, self-healing loops, and agentic workflows.',
    itemCount: 42,
    createdAt: 'Jan 14, 2026',
  },
  {
    id: 'cat-p2',
    name: 'Frontend & Architecture',
    itemType: 'prompt',
    description: 'React 19, Next.js App Router, Tailwind v4 design systems, and responsive components.',
    itemCount: 28,
    createdAt: 'Jan 16, 2026',
  },
  {
    id: 'cat-p3',
    name: 'Backend & Databases',
    itemType: 'prompt',
    description: 'RESTful APIs, PostgreSQL distributed locks, microservices, and database tuning.',
    itemCount: 19,
    createdAt: 'Jan 18, 2026',
  },
  {
    id: 'cat-p4',
    name: 'Marketing & Copy',
    itemType: 'prompt',
    description: 'Cold outbound emails, product launch threads, landing page copy, and SEO hooks.',
    itemCount: 14,
    createdAt: 'Feb 02, 2026',
  },

  // Skill Rule Categories
  {
    id: 'cat-s1',
    name: 'IDE Rules & Context',
    itemType: 'skill',
    description: '.cursorrules, windsurfrules, and editor-specific prompt envelopes.',
    itemCount: 35,
    createdAt: 'Feb 05, 2026',
  },
  {
    id: 'cat-s2',
    name: 'Reasoning & Directives',
    itemType: 'skill',
    description: 'Chain-of-thought directives, Claude thinking benchmarks, and verification rules.',
    itemCount: 16,
    createdAt: 'Feb 10, 2026',
  },
  {
    id: 'cat-s3',
    name: 'Security & Auth Directives',
    itemType: 'skill',
    description: 'Prompt injection defenses, API secret masking, and RBAC security invariants.',
    itemCount: 11,
    createdAt: 'Feb 15, 2026',
  },

  // Website Categories
  {
    id: 'cat-w1',
    name: 'AI Docs & Specifications',
    itemType: 'website',
    description: 'Official vendor documentation, model release papers, and API manuals.',
    itemCount: 22,
    createdAt: 'Feb 20, 2026',
  },
  {
    id: 'cat-w2',
    name: 'Developer Toolchains',
    itemType: 'website',
    description: 'Online REPLs, tokenizers, benchmarking suites, and CLI package directories.',
    itemCount: 18,
    createdAt: 'Feb 24, 2026',
  },
  {
    id: 'cat-w3',
    name: 'Design Systems & Inspiration',
    itemType: 'website',
    description: 'Curated design archives, typography showcases, and brutalist component galleries.',
    itemCount: 15,
    createdAt: 'Mar 01, 2026',
  },
];

const STORAGE_KEY = 'prompt_vault_admin_master_categories';

function getStoredCategories(): MasterCategory[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Error loading master categories', err);
  }
  return INITIAL_MASTER_CATEGORIES;
}

function saveStoredCategories(categories: MasterCategory[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch (err) {
    console.error('Error saving master categories', err);
  }
}

// Scope type label helper
const TYPE_CONFIG: Record<MasterItemType, { label: string; singular: string; icon: React.ComponentType<{ className?: string }> }> = {
  prompt: { label: 'Prompts', singular: 'Prompt', icon: Bookmark },
  skill: { label: 'Skill Rules', singular: 'Skill Rule', icon: FileCode },
  website: { label: 'Websites', singular: 'Website Bookmark', icon: Globe },
};

// ============================================================================
// 2. MAIN ADMIN MASTERS PAGE
// ============================================================================

export default function AdminMasters() {
  const navigate = useNavigate();

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

  // Modal / Drawer state for Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<MasterCategory | null>(null);
  const modalDragControls = useDragControls();

  // Delete Confirmation state
  const [deletingCategory, setDeletingCategory] = useState<MasterCategory | null>(null);

  // Form draft state (Clean: only Type, Name, Description)
  const [formType, setFormType] = useState<MasterItemType>('prompt');
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');

  // Lock background scrolling when modal or delete confirmation is open
  useEffect(() => {
    if (isModalOpen || !!deletingCategory) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
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
      // Type filter
      if (activeTypeFilter !== 'all' && item.itemType !== activeTypeFilter) return false;
      // Search query
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
  const handleOpenCreateModal = (defaultType?: MasterItemType) => {
    setEditingCategory(null);
    setFormType(defaultType || (activeTypeFilter !== 'all' ? activeTypeFilter : 'prompt'));
    setFormName('');
    setFormDescription('');
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (cat: MasterCategory) => {
    setEditingCategory(cat);
    setFormType(cat.itemType);
    setFormName(cat.name);
    setFormDescription(cat.description);
    setIsModalOpen(true);
  };

  // Handle Form Submit
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast('Category name is required.', 'error', 'Validation Error');
      return;
    }

    if (editingCategory) {
      // Update existing
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...cat,
                name: formName.trim(),
                itemType: formType,
                description: formDescription.trim(),
              }
            : cat
        )
      );
      showToast(`Category "${formName.trim()}" updated successfully!`, 'success', 'Updated');
    } else {
      // Create new
      const newCategory: MasterCategory = {
        id: `cat-${Date.now()}`,
        name: formName.trim(),
        itemType: formType,
        description: formDescription.trim(),
        itemCount: 0,
        createdAt: 'Just now',
      };
      setCategories((prev) => [newCategory, ...prev]);
      showToast(`Category "${newCategory.name}" added to ${TYPE_CONFIG[newCategory.itemType].label}!`, 'success', 'Created');
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
      {/* Toast Notification Container */}
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

      {/* Main Content Workspace */}
      <main className="flex-1 flex flex-col space-y-6 min-w-0 w-full pb-24 lg:pb-0">
        {/* ==================================================================== */}
        {/* 1. HEADER                                                            */}
        {/* ==================================================================== */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal tracking-tight">
                Category Masters
              </h1>
              <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-vault-yellow text-vault-dark border border-vault-dark shadow-2xs">
                {metrics.total} Categories
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-vault-dark/70 font-medium pt-1">
              Configure master categories for Prompts, Skill rules, and Website bookmarks.
            </p>
          </div>

          {/* Right Actions: + Add Category & Profile */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenCreateModal()}
              className="px-4 py-2.5 rounded-full font-sans text-xs sm:text-sm font-bold bg-vault-green hover:brightness-105 text-vault-dark border-2 border-vault-dark shadow-xs transition-all active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Category</span>
            </button>

            {/* Profile Avatar */}
            <div
              onClick={() => navigate('/settings')}
              className="cursor-pointer group"
              title="Account Settings"
            >
              <img
                src="/avatars/avatar-1.svg"
                alt="Admin Avatar"
                className="w-10 h-10 rounded-full border-2 border-vault-dark object-cover group-hover:ring-2 group-hover:ring-vault-green group-hover:scale-105 transition-all shadow-xs bg-vault-cream"
              />
            </div>
          </div>
        </header>

        {/* ==================================================================== */}
        {/* 2. 4-CARD METRICS SUMMARY                                            */}
        {/* ==================================================================== */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {/* Card 1: All Categories */}
          <div
            onClick={() => setActiveTypeFilter('all')}
            className={`rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5 cursor-pointer transition-all ${
              activeTypeFilter === 'all'
                ? 'bg-vault-yellow ring-2 ring-vault-dark/40 -translate-y-0.5'
                : 'bg-vault-yellow/80 hover:bg-vault-yellow'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                All Categories
              </span>
              <FolderTree className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/60" />
            </div>
            <div className="flex items-baseline justify-between gap-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
                {metrics.total}
              </span>
              <span className="font-mono text-[10px] font-bold bg-vault-dark text-vault-cream px-2 py-0.5 rounded-full">
                Total
              </span>
            </div>
          </div>

          {/* Card 2: Prompt Categories */}
          <div
            onClick={() => setActiveTypeFilter('prompt')}
            className={`rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark shadow-xs flex flex-col justify-between space-y-2.5 cursor-pointer transition-all ${
              activeTypeFilter === 'prompt'
                ? 'bg-vault-dark text-vault-cream ring-2 ring-vault-green -translate-y-0.5'
                : 'bg-vault-dark/95 text-vault-cream hover:bg-vault-dark'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-cream/60">
                Prompt Categories
              </span>
              <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-cream/40" />
            </div>
            <div className="flex items-baseline justify-between gap-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-cream font-normal">
                {metrics.promptCount}
              </span>
              <span className="font-sans text-[10px] sm:text-xs font-bold bg-vault-green text-vault-dark px-2 py-0.5 rounded-full">
                Prompts
              </span>
            </div>
          </div>

          {/* Card 3: Skill Rule Categories */}
          <div
            onClick={() => setActiveTypeFilter('skill')}
            className={`rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/20 shadow-xs flex flex-col justify-between space-y-2.5 cursor-pointer transition-all ${
              activeTypeFilter === 'skill'
                ? 'bg-vault-cream ring-2 ring-vault-dark -translate-y-0.5'
                : 'bg-vault-cream hover:border-vault-dark/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
                Skill Rule Categories
              </span>
              <FileCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/50" />
            </div>
            <div className="flex items-baseline justify-between gap-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
                {metrics.skillCount}
              </span>
              <span className="font-mono text-[10px] font-bold bg-vault-yellow text-vault-dark border border-vault-dark/20 px-2 py-0.5 rounded-full">
                .md Rules
              </span>
            </div>
          </div>

          {/* Card 4: Website Categories */}
          <div
            onClick={() => setActiveTypeFilter('website')}
            className={`rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 border-2 border-vault-dark/20 shadow-xs flex flex-col justify-between space-y-2.5 cursor-pointer transition-all ${
              activeTypeFilter === 'website'
                ? 'bg-vault-cream ring-2 ring-vault-dark -translate-y-0.5'
                : 'bg-vault-cream hover:border-vault-dark/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-dark/60">
                Website Categories
              </span>
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vault-dark/50" />
            </div>
            <div className="flex items-baseline justify-between gap-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-vault-dark font-normal">
                {metrics.websiteCount}
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold bg-vault-green/20 text-vault-dark border border-vault-green px-2 py-0.5 rounded-full">
                Links
              </span>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 3. TYPE FILTER TABS & TOOLBAR                                        */}
        {/* ==================================================================== */}
        <section className="space-y-3.5">
          {/* Segmented Type Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            <button
              type="button"
              onClick={() => setActiveTypeFilter('all')}
              className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTypeFilter === 'all'
                  ? 'bg-vault-dark text-vault-cream border-2 border-vault-dark shadow-2xs'
                  : 'bg-white/80 hover:bg-white text-vault-dark/70 border border-vault-dark/15'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              <span>All ({categories.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTypeFilter('prompt')}
              className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTypeFilter === 'prompt'
                  ? 'bg-vault-dark text-vault-cream border-2 border-vault-dark shadow-2xs'
                  : 'bg-white/80 hover:bg-white text-vault-dark/70 border border-vault-dark/15'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Prompts ({metrics.promptCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTypeFilter('skill')}
              className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTypeFilter === 'skill'
                  ? 'bg-vault-dark text-vault-cream border-2 border-vault-dark shadow-2xs'
                  : 'bg-white/80 hover:bg-white text-vault-dark/70 border border-vault-dark/15'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Skill Rules ({metrics.skillCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTypeFilter('website')}
              className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTypeFilter === 'website'
                  ? 'bg-vault-dark text-vault-cream border-2 border-vault-dark shadow-2xs'
                  : 'bg-white/80 hover:bg-white text-vault-dark/70 border border-vault-dark/15'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Websites ({metrics.websiteCount})</span>
            </button>
          </div>

          {/* Search & View Switcher */}
          <div className="bg-vault-cream rounded-[24px] p-4 sm:p-5 border-2 border-vault-dark/15 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <Search className="w-4 h-4 text-vault-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories by name or description..."
                className="w-full pl-9 pr-9 py-2 rounded-xl bg-white border-2 border-vault-dark text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-vault-green transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-vault-dark/40 hover:text-vault-dark cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Switcher: Grid vs List */}
            <div className="flex items-center bg-white rounded-xl border border-vault-dark/20 p-1 h-[38px] shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-2.5 h-full rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
                  viewMode === 'grid'
                    ? 'bg-vault-dark text-vault-cream shadow-xs'
                    : 'text-vault-dark/60 hover:text-vault-dark'
                }`}
                title="Card Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`px-2.5 h-full rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
                  viewMode === 'table'
                    ? 'bg-vault-dark text-vault-cream shadow-xs'
                    : 'text-vault-dark/60 hover:text-vault-dark'
                }`}
                title="Data Table"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 4. CATEGORIES LISTING                                                */}
        {/* ==================================================================== */}
        {filteredCategories.length === 0 ? (
          /* Empty search state */
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
          /* CLEAN CARDS GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {filteredCategories.map((category) => {
              const typeCfg = TYPE_CONFIG[category.itemType];
              const TypeIcon = typeCfg.icon;

              return (
                <div
                  key={category.id}
                  className="bg-vault-cream rounded-[24px] p-4 sm:p-5 border-2 border-vault-dark flex flex-col justify-between space-y-3 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#002D0F] transition-all duration-200 relative group"
                >
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
                        onClick={() => handleOpenEditModal(category)}
                        className="px-2.5 py-1 rounded-full font-sans text-xs font-bold bg-white hover:bg-vault-yellow text-vault-dark border border-vault-dark/20 transition-colors cursor-pointer inline-flex items-center gap-1"
                        title="Edit category"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeletingCategory(category)}
                        className="p-1 rounded-full hover:bg-rose-100 text-vault-dark/50 hover:text-rose-700 transition-colors cursor-pointer"
                        title="Delete category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* CLEAN TABLE VIEW */
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
                  {filteredCategories.map((category) => {
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
                              onClick={() => handleOpenEditModal(category)}
                              className="px-2.5 py-1 rounded-full font-sans text-xs font-semibold bg-white hover:bg-vault-yellow border border-vault-dark/20 text-vault-dark transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingCategory(category)}
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
        )}
      </main>

      {/* ==================================================================== */}
      {/* 5. CREATE / EDIT CATEGORY MODAL (Clean, short, no clutter)           */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center overscroll-contain">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box / Bottom Sheet */}
            <motion.div
              initial={{ y: '100%', opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              drag="y"
              dragListener={false}
              dragControls={modalDragControls}
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 500) {
                  setIsModalOpen(false);
                }
              }}
              className="relative w-full md:max-w-md bg-vault-cream border-2 border-vault-dark rounded-t-[32px] md:rounded-[28px] shadow-2xl p-5 sm:p-6 z-10 flex flex-col"
            >
              {/* Mobile grab handle */}
              <div
                onPointerDown={(e) => modalDragControls.start(e)}
                className="md:hidden flex items-center justify-center pb-3 touch-none cursor-grab active:cursor-grabbing"
              >
                <div className="w-12 h-1.5 bg-vault-dark/30 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b-2 border-vault-dark/15">
                <div>
                  <h2 className="font-serif italic text-xl sm:text-2xl text-vault-dark font-normal">
                    {editingCategory ? 'Edit Category' : 'Create Category'}
                  </h2>
                  <p className="font-sans text-xs text-vault-dark/60 font-medium">
                    Add categories for user selection in the vault.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full border border-vault-dark/20 flex items-center justify-center hover:bg-vault-dark/10 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4 text-vault-dark" />
                </button>
              </div>

              {/* Form Body */}
              <form
                id="category-master-form"
                onSubmit={handleSaveCategory}
                className="py-4 space-y-4"
              >
                {/* 1. Target Item Type Selection */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                    Category Scope / Target Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormType('prompt')}
                      className={`py-2 px-2.5 rounded-xl font-sans text-xs font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        formType === 'prompt'
                          ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                          : 'bg-white hover:bg-vault-yellow/30 text-vault-dark border-vault-dark/20'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5 shrink-0" />
                      <span>Prompt</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormType('skill')}
                      className={`py-2 px-2.5 rounded-xl font-sans text-xs font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        formType === 'skill'
                          ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                          : 'bg-white hover:bg-vault-yellow/30 text-vault-dark border-vault-dark/20'
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5 shrink-0" />
                      <span>Skill Rule</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormType('website')}
                      className={`py-2 px-2.5 rounded-xl font-sans text-xs font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        formType === 'website'
                          ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                          : 'bg-white hover:bg-vault-yellow/30 text-vault-dark border-vault-dark/20'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5 shrink-0" />
                      <span>Website</span>
                    </button>
                  </div>
                </div>

                {/* 2. Category Name */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Agent Skills, Security Rules..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-vault-dark text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-vault-green"
                  />
                </div>

                {/* 3. Description */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                    Description <span className="text-vault-dark/40 font-normal lowercase">(optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Brief description of what belongs in this category..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-vault-dark text-xs font-medium focus:outline-none focus:ring-2 focus:ring-vault-green resize-none"
                  />
                </div>
              </form>

              {/* Bottom Actions */}
              <div className="pt-3.5 border-t-2 border-vault-dark/15 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full font-sans text-xs font-semibold bg-white border border-vault-dark/30 text-vault-dark hover:bg-vault-dark/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  form="category-master-form"
                  className="px-5 py-2 rounded-full font-sans text-xs font-bold bg-vault-green hover:brightness-105 text-vault-dark border-2 border-vault-dark shadow-xs transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{editingCategory ? 'Save Changes' : 'Create Category'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* 6. DELETE CONFIRMATION MODAL                                         */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {deletingCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overscroll-contain">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeletingCategory(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 320 }}
              className="relative w-full max-w-sm bg-vault-cream border-2 border-vault-dark rounded-[24px] shadow-2xl p-5 sm:p-6 z-10 space-y-4 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 border-2 border-rose-300 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-serif text-xl text-vault-dark font-normal">
                  Delete Category?
                </h3>
                <p className="font-sans text-xs text-vault-dark/70 pt-1">
                  Are you sure you want to delete <strong>"{deletingCategory.name}"</strong>?
                  {deletingCategory.itemCount > 0 && (
                    <span className="block text-rose-700 font-semibold pt-1">
                      Warning: {deletingCategory.itemCount} items currently use this category.
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingCategory(null)}
                  className="px-4 py-2 rounded-full font-sans text-xs font-semibold bg-white border border-vault-dark/30 text-vault-dark hover:bg-vault-dark/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteCategory(deletingCategory.id)}
                  className="px-4 py-2 rounded-full font-sans text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white border-2 border-vault-dark shadow-xs transition-colors cursor-pointer"
                >
                  Delete Category
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
