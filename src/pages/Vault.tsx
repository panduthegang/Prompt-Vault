import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Toast, { ToastContainer, ToastType } from '../components/ui/Toast';
import CustomSelect, { SelectOption } from '../components/ui/Select';
import { copyToClipboard } from '../utils/clipboard';
export type VaultItemType = 'prompt' | 'skill' | 'website';

export interface VaultItem {
  id: string;
  type: VaultItemType;
  title: string;
  category: string;
  content: string;
  url?: string;
  tool?: string;
  timestamp: string;
  isStarred: boolean;
}

const STORAGE_KEY = 'prompt_vault_user_saved_items';

const INITIAL_VAULT_ITEMS: VaultItem[] = [
  // 1. Prompts
  {
    id: 'vault-p1',
    type: 'prompt',
    title: 'Autonomous Refactoring Skill Rule',
    category: 'Agent Skills',
    content:
      'Always inspect existing code structures and imports before writing new utilities. Preserve existing API signatures, prevent regressions, and run automated test verification before completion.',
    timestamp: 'Saved 2h ago',
    isStarred: true,
  },
  {
    id: 'vault-p2',
    type: 'prompt',
    title: 'React 18 + Tailwind v4 Design Architect',
    category: 'Frontend',
    content:
      'You are an elite UI/UX designer and frontend engineer. Generate sleek, high-contrast layouts using Neo-brutalist tokens, spring physics, dynamic responsive grids, and zero generic styling.',
    timestamp: 'Saved 1d ago',
    isStarred: true,
  },
  {
    id: 'vault-p3',
    type: 'prompt',
    title: 'PostgreSQL Query Performance Optimizer',
    category: 'Backend',
    content:
      'Analyze query execution plans (EXPLAIN ANALYZE). Suggest composite indexing strategies, CTE restructuring, and N+1 query avoidance for high-throughput tables.',
    timestamp: 'Saved 3d ago',
    isStarred: false,
  },

  // 2. Skills
  {
    id: 'vault-s1',
    type: 'skill',
    title: 'Cursor Rules: Next.js App Router Architecture',
    category: 'IDE Rules',
    tool: 'Cursor',
    content:
      '# Next.js 14 App Router Rules\n- Use Server Components by default; opt-in to Client Components only for stateful interactivity.\n- Co-locate route handlers inside /api subdirectories.\n- Enforce strict typing with Zod schemas on all server actions.',
    timestamp: 'Saved 4d ago',
    isStarred: true,
  },
  {
    id: 'vault-s2',
    type: 'skill',
    title: 'Claude 3.7 Reasoning & System Prompt Standards',
    category: 'Reasoning',
    tool: 'Claude',
    content:
      '# Claude 3.7 Reasoning Directives\n- Use structured thinking tags <thinking> before outputting final architectural decisions.\n- Break down multi-step calculations with clear verification benchmarks.\n- Keep explanations concise, practical, and devoid of repetitive filler.',
    timestamp: 'Saved 5d ago',
    isStarred: false,
  },
  {
    id: 'vault-s3',
    type: 'skill',
    title: 'Antigravity AGY Agent Customization Rule',
    category: 'Agent Skills',
    tool: 'Antigravity',
    content:
      '# AGY Customization Protocol\n- Discover skills from .agents/skills/<skill_name>/SKILL.md.\n- Always preserve comments and docstrings unrelated to current edits.\n- Link all code references with clickable Markdown file links.',
    timestamp: 'Saved 1w ago',
    isStarred: true,
  },

  // 3. Websites & Links
  {
    id: 'vault-w1',
    type: 'website',
    title: 'Anthropic Prompt Engineering Interactive Guide',
    category: 'AI Docs',
    url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
    content:
      'Official documentation on prompting Claude with chain-of-thought, XML tags, role-playing, and few-shot examples.',
    timestamp: 'Saved 2d ago',
    isStarred: true,
  },
  {
    id: 'vault-w2',
    type: 'website',
    title: 'Cursor Directory: Best Curated Cursor Rules',
    category: 'Tools',
    url: 'https://cursor.directory',
    content:
      'Community directory of production-tested .cursorrules files for Next.js, Python, Rust, React, and Svelte.',
    timestamp: 'Saved 6d ago',
    isStarred: true,
  },
  {
    id: 'vault-w3',
    type: 'website',
    title: 'Tailwind CSS v4 Modern Styling Documentation',
    category: 'Frontend',
    url: 'https://tailwindcss.com/docs',
    content:
      'Complete reference for Tailwind v4 CSS configuration, theme variables, container queries, and utility classes.',
    timestamp: 'Saved 1w ago',
    isStarred: false,
  },
  {
    id: 'vault-w4',
    type: 'website',
    title: 'Vite Next Generation Frontend Tooling',
    category: 'DevOps',
    url: 'https://vite.dev/guide/',
    content:
      'Fast development server with instant HMR and Rollup-powered production bundling configuration guide.',
    timestamp: 'Saved 2w ago',
    isStarred: false,
  },
];

function getStoredVaultItems(): VaultItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_VAULT_ITEMS));
    return INITIAL_VAULT_ITEMS;
  } catch {
    return INITIAL_VAULT_ITEMS;
  }
}

function saveStoredVaultItems(items: VaultItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save vault items to localStorage', err);
  }
}
import {
  Bookmark,
  FileCode,
  Globe,
  Star,
  Plus,
  Search,
  Copy,
  Check,
  ExternalLink,
  Pencil,
  Trash2,
  X,
  Filter,
  Sparkles,
  Terminal,
  Link2,
  Layers,
  CheckCircle2,
  Cpu,
  Compass,
  Code2,
  Server,
  BookOpen,
  Wrench,
  Brain,
  Megaphone,
  Database,
} from 'lucide-react';

interface ActiveToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

const CATEGORY_PRESETS = [
  'All',
  'Agent Skills',
  'Frontend',
  'Backend',
  'IDE Rules',
  'AI Docs',
  'Tools',
  'DevOps',
  'Reasoning',
];

const TOOL_OPTIONS: SelectOption[] = [
  {
    value: 'Cursor',
    label: 'Cursor (.cursorrules)',
    icon: Terminal,
    badge: 'IDE',
    description: 'System rules for Cursor AI editor',
  },
  {
    value: 'Claude',
    label: 'Claude 3.7 / Anthropic',
    icon: Sparkles,
    badge: 'LLM',
    description: 'System prompts & reasoning guidelines',
  },
  {
    value: 'Antigravity',
    label: 'Google Antigravity (AGY)',
    icon: Layers,
    badge: 'Agent',
    description: 'Autonomous multi-agent skills & protocols',
  },
  {
    value: 'Windsurf',
    label: 'Windsurf / Cascade',
    icon: Compass,
    badge: 'IDE',
    description: 'Cascade workflow rules & instructions',
  },
  {
    value: 'GitHub Copilot',
    label: 'GitHub Copilot',
    icon: Cpu,
    badge: 'Assistant',
    description: 'Inline code assistant instructions',
  },
  {
    value: 'General IDE',
    label: 'General IDE Instructions',
    icon: FileCode,
    badge: 'Config',
    description: 'Editor-agnostic development instructions',
  },
];

const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'Agent Skills', label: 'Agent Skills', icon: Layers, description: 'Autonomous agent protocols & workflows' },
  { value: 'Frontend', label: 'Frontend', icon: Code2, description: 'UI/UX, React, Tailwind & styling' },
  { value: 'Backend', label: 'Backend', icon: Server, description: 'APIs, database queries & microservices' },
  { value: 'IDE Rules', label: 'IDE Rules', icon: Terminal, description: 'Editor system prompts & config files' },
  { value: 'AI Docs', label: 'AI Docs', icon: BookOpen, description: 'Model guides, prompting docs & whitepapers' },
  { value: 'Tools', label: 'Tools', icon: Wrench, description: 'CLI utilities, linters & dev toolchains' },
  { value: 'DevOps', label: 'DevOps', icon: Database, description: 'CI/CD pipelines, Docker & cloud deployment' },
  { value: 'Reasoning', label: 'Reasoning', icon: Brain, description: 'Chain-of-thought & multi-step logic' },
  { value: 'Marketing', label: 'Marketing', icon: Megaphone, description: 'Copywriting, launch posts & positioning' },
];

export default function Vault() {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation & Layout State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(true);
  const [items, setItems] = useState<VaultItem[]>(getStoredVaultItems);
  const [activeTab, setActiveTab] = useState<'all' | 'prompt' | 'skill' | 'website' | 'starred'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Responsive Screen Detection (Mobile Bottom Sheet vs Desktop Modal)
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

  // Framer Motion drag controls for mobile bottom sheet (thumb-only drag, non-blocking scroll)
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

  // Check URL query parameters (e.g. /vault?type=skill or /vault?tab=prompts)
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

  // Sync to LocalStorage whenever items change
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

    // Format URL properly if website
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
      };
      updateItems([newItem, ...items]);
      showToast(`New ${formType.toUpperCase()} added to your Vault!`, 'success', 'Item Saved');
    }

    setIsModalOpen(false);
  };

  // Delete Item (Opens custom Neo-Brutalist confirmation dialog)
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

  // Reusable Form Body for both Desktop Modal and Mobile Bottom Sheet
  const renderModalForm = () => (
    <form onSubmit={handleSaveItem} className="space-y-4">
      {/* Type Switcher Segmented Control */}
      <div className="space-y-1.5">
        <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
          Item Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setFormType('prompt')}
            className={`py-2 px-3 rounded-xl border-2 font-sans text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              formType === 'prompt'
                ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                : 'bg-white/60 text-vault-dark border-vault-dark/20 hover:border-vault-dark'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Prompt</span>
          </button>

          <button
            type="button"
            onClick={() => setFormType('skill')}
            className={`py-2 px-3 rounded-xl border-2 font-sans text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              formType === 'skill'
                ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                : 'bg-white/60 text-vault-dark border-vault-dark/20 hover:border-vault-dark'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Skill Rule</span>
          </button>

          <button
            type="button"
            onClick={() => setFormType('website')}
            className={`py-2 px-3 rounded-xl border-2 font-sans text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              formType === 'website'
                ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                : 'bg-white/60 text-vault-dark border-vault-dark/20 hover:border-vault-dark'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Website Link</span>
          </button>
        </div>
      </div>

      {/* Title Field */}
      <div className="space-y-1.5">
        <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
          Title
        </label>
        <input
          type="text"
          required
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder={
            formType === 'prompt'
              ? 'e.g. Next.js 14 System Architect Prompt'
              : formType === 'skill'
              ? 'e.g. Cursor Next.js App Router Rules'
              : 'e.g. Anthropic Prompt Engineering Docs'
          }
          className="w-full bg-white text-vault-dark border-2 border-vault-dark rounded-xl px-4 py-2.5 font-sans text-xs sm:text-sm placeholder:text-vault-dark/40 focus:outline-none focus:ring-2 focus:ring-vault-green"
        />
      </div>

      {/* Website URL Field (Only for Websites) */}
      {formType === 'website' && (
        <div className="space-y-1.5">
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
            Website URL
          </label>
          <div className="relative">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-vault-dark/50" />
            <input
              type="text"
              required
              value={formUrl}
              onChange={(e) => setFormUrl(e.target.value)}
              placeholder="https://docs.anthropic.com/..."
              className="w-full bg-white text-vault-dark border-2 border-vault-dark rounded-xl pl-10 pr-4 py-2.5 font-mono text-xs sm:text-sm placeholder:text-vault-dark/40 focus:outline-none focus:ring-2 focus:ring-vault-green"
            />
          </div>
        </div>
      )}

      {/* Target Tool (Only for Skills) */}
      {formType === 'skill' && (
        <div className="space-y-1.5">
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
            Target Tool / Environment
          </label>
          <CustomSelect
            value={formTool}
            onChange={setFormTool}
            options={TOOL_OPTIONS}
            placeholder="Select Target Tool..."
          />
        </div>
      )}

      {/* Category Field */}
      <div className="space-y-1.5">
        <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
          Category
        </label>
        <CustomSelect
          value={formCategory}
          onChange={setFormCategory}
          options={CATEGORY_OPTIONS}
          placeholder="Select Category..."
        />
      </div>

      {/* Content / Prompt Text / Description */}
      <div className="space-y-1.5">
        <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
          {formType === 'website' ? 'Description & Notes' : 'Prompt / Rule Content'}
        </label>
        <textarea
          rows={formType === 'website' ? 3 : 4}
          required={formType !== 'website'}
          value={formContent}
          onChange={(e) => setFormContent(e.target.value)}
          placeholder={
            formType === 'prompt'
              ? 'Paste your master prompt or system instructions here...'
              : formType === 'skill'
              ? 'Paste your markdown rules (e.g. - Always enforce strict TypeScript...)'
              : 'Add notes, keywords, or summary of this website link...'
          }
          className="w-full bg-white text-vault-dark border-2 border-vault-dark rounded-xl p-3 font-mono text-xs sm:text-sm placeholder:text-vault-dark/40 focus:outline-none focus:ring-2 focus:ring-vault-green resize-none"
        />
      </div>

      {/* Modal Actions */}
      <div className="pt-3 pb-1 flex items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="px-6 py-2.5 rounded-full border-2 border-vault-dark text-vault-dark font-sans text-xs sm:text-sm font-bold hover:bg-vault-yellow/40 cursor-pointer transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-vault-green text-vault-dark border-2 border-vault-dark font-sans text-xs sm:text-sm font-bold shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          <span>{editingItemId ? 'Save Changes' : 'Save to Vault'}</span>
        </button>
      </div>
    </form>
  );

  return (
    <div className="w-full min-h-screen bg-vault-cream text-vault-dark flex flex-col lg:flex-row p-3 sm:p-4 md:p-6 gap-4 sm:gap-6 selection:bg-vault-green selection:text-vault-dark relative items-start">
      {/* Dynamic Toast Notifications (Anchored Top-Center, Hover-to-Pause) */}
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
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Vault Content */}
      <main className="flex-1 flex flex-col space-y-6 min-w-0 w-full pb-24 lg:pb-8">
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-vault-dark/15">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-serif italic text-3xl sm:text-4xl text-vault-dark font-normal tracking-tight">
                Vault Library
              </h1>
              <span className="font-mono text-xs font-bold bg-vault-yellow border border-vault-dark px-2.5 py-0.5 rounded-full shadow-2xs">
                {counts.all} Saved
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-vault-dark/70 font-medium">
              Your central repository for saved prompts, skill.md rules, and website documentation links.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleOpenAddModal()}
              className="flex items-center gap-2 px-5 py-2.5 bg-vault-green text-vault-dark font-sans text-xs sm:text-sm font-bold border-2 border-vault-dark rounded-full shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add to Vault</span>
            </button>
          </div>
        </header>

        {/* 5 Main Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 shrink-0 ${
              activeTab === 'all'
                ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                : 'bg-vault-cream text-vault-dark border-vault-dark/30 hover:border-vault-dark hover:bg-vault-yellow/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Items</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">
              {counts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prompt')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 shrink-0 ${
              activeTab === 'prompt'
                ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                : 'bg-vault-cream text-vault-dark border-vault-dark/30 hover:border-vault-dark hover:bg-vault-yellow/40'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${activeTab === 'prompt' ? 'text-vault-yellow' : ''}`} />
            <span>Prompts</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">
              {counts.prompt}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('skill')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 shrink-0 ${
              activeTab === 'skill'
                ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                : 'bg-vault-cream text-vault-dark border-vault-dark/30 hover:border-vault-dark hover:bg-vault-yellow/40'
            }`}
          >
            <FileCode className={`w-3.5 h-3.5 ${activeTab === 'skill' ? 'text-vault-green' : ''}`} />
            <span>Skill.md Rules</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">
              {counts.skill}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('website')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 shrink-0 ${
              activeTab === 'website'
                ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                : 'bg-vault-cream text-vault-dark border-vault-dark/30 hover:border-vault-dark hover:bg-vault-yellow/40'
            }`}
          >
            <Globe className={`w-3.5 h-3.5 ${activeTab === 'website' ? 'text-sky-300' : ''}`} />
            <span>Websites &amp; Links</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">
              {counts.website}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('starred')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 shrink-0 ${
              activeTab === 'starred'
                ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                : 'bg-vault-cream text-vault-dark border-vault-dark/30 hover:border-vault-dark hover:bg-vault-yellow/40'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${activeTab === 'starred' ? 'text-vault-yellow fill-vault-yellow' : ''}`} />
            <span>Starred</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">
              {counts.starred}
            </span>
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-vault-dark/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts, markdown skills, website URLs..."
              className="w-full bg-white/70 text-vault-dark placeholder:text-vault-dark/40 font-sans text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-full border-2 border-vault-dark/20 focus:outline-none focus:border-vault-dark transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-vault-dark/50 hover:text-vault-dark"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Categories Pill Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORY_PRESETS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full font-sans text-[11px] sm:text-xs font-bold transition-colors cursor-pointer border whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-vault-dark text-vault-cream border-vault-dark'
                    : 'bg-white/60 text-vault-dark/70 border-vault-dark/15 hover:border-vault-dark hover:bg-vault-cream'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

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
              <div
                key={item.id}
                className="bg-vault-cream border-2 border-vault-dark rounded-[22px] p-5 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-shadow relative group"
              >
                <div className="space-y-3">
                  {/* Top Meta Header: Type Badge, Category & Star */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {/* Type Badge */}
                      {item.type === 'prompt' && (
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-vault-yellow border border-vault-dark/40 text-vault-dark px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Bookmark className="w-3 h-3" /> Prompt
                        </span>
                      )}
                      {item.type === 'skill' && (
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-vault-green border border-vault-dark/40 text-vault-dark px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <FileCode className="w-3 h-3" /> {item.tool || 'Skill.md'}
                        </span>
                      )}
                      {item.type === 'website' && (
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-vault-dark text-vault-cream border border-vault-dark px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Globe className="w-3 h-3 text-vault-green" /> Website
                        </span>
                      )}

                      <span className="font-sans text-[11px] font-semibold text-vault-dark/60 bg-white/70 border border-vault-dark/15 px-2 py-0.2 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    {/* Star Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleStar(item.id)}
                      className="p-1 rounded-lg hover:bg-vault-dark/5 transition-colors cursor-pointer"
                      title={item.isStarred ? 'Remove from Starred' : 'Add to Starred'}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          item.isStarred
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-vault-dark/30 hover:text-vault-dark/70'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl text-vault-dark font-normal leading-snug">
                    {item.title}
                  </h3>

                  {/* Body Content / Snippet or Website URL */}
                  {item.type === 'website' && item.url ? (
                    <div className="space-y-2">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-vault-dark/20 text-vault-dark font-mono text-xs font-semibold hover:border-vault-dark hover:bg-vault-yellow/30 transition-colors truncate max-w-full"
                      >
                        <Link2 className="w-3.5 h-3.5 text-vault-dark/70 shrink-0" />
                        <span className="truncate">{item.url.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink className="w-3 h-3 text-vault-dark/50 shrink-0 ml-auto" />
                      </a>
                      <p className="font-sans text-xs text-vault-dark/70 line-clamp-2">
                        {item.content}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-vault-dark/[0.04] border border-vault-dark/15 rounded-xl p-3 font-mono text-xs text-vault-dark/80 line-clamp-3 leading-relaxed select-text whitespace-pre-wrap">
                      {item.content}
                    </div>
                  )}
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-3 border-t border-vault-dark/10 flex items-center justify-between gap-2">
                  <span className="font-sans text-[10px] text-vault-dark/50 font-medium">
                    {item.timestamp}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Copy Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyItem(item)}
                      className="p-1.5 rounded-lg border border-vault-dark/20 hover:border-vault-dark hover:bg-vault-yellow/50 transition-colors text-vault-dark cursor-pointer flex items-center gap-1"
                      title={item.type === 'website' ? 'Copy Link URL' : 'Copy Content'}
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-vault-green stroke-[3]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-vault-dark/70" />
                      )}
                      <span className="font-sans text-[11px] font-bold">
                        {copiedId === item.id ? 'Copied' : 'Copy'}
                      </span>
                    </button>

                    {/* Open Link Button (Websites only) */}
                    {item.type === 'website' && item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border border-vault-dark/20 hover:border-vault-dark hover:bg-vault-yellow/50 transition-colors text-vault-dark cursor-pointer flex items-center gap-1"
                        title="Open Website in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-vault-dark/70" />
                        <span className="font-sans text-[11px] font-bold">Visit</span>
                      </a>
                    )}

                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(item)}
                      className="p-1.5 rounded-lg border border-vault-dark/15 hover:border-vault-dark hover:bg-white transition-colors text-vault-dark/70 hover:text-vault-dark cursor-pointer"
                      title="Edit Item"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id, item.title)}
                      className="p-1.5 rounded-lg border border-vault-dark/15 hover:border-red-500 hover:bg-red-50 text-vault-dark/60 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* ADD / EDIT MODAL (Desktop Modal vs Mobile Bottom Sheet) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          isMobile ? (
            /* MOBILE INSTAGRAM / YOUTUBE STYLE DRAGGABLE BOTTOM SHEET */
            <div className="fixed inset-0 z-50 flex flex-col justify-end">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Draggable Bottom Sheet Modal */}
              <motion.div
                drag="y"
                dragListener={false}
                dragControls={dragControls}
                dragConstraints={{ top: 0 }}
                dragElastic={{ top: 0.05, bottom: 0.3 }}
                onDragEnd={(_e, info) => {
                  if (info.offset.y > 80 || info.velocity.y > 300) {
                    setIsModalOpen(false);
                  }
                }}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="relative z-10 w-full max-w-lg mx-auto bg-vault-cream border-t-2 border-vault-dark rounded-t-[32px] p-5 pb-[max(3.5rem,env(safe-area-inset-bottom))] shadow-2xl space-y-4 max-h-[90dvh] overflow-y-auto overscroll-contain"
              >
                {/* Draggable Grab Handle Indicator (Pill Thumb) */}
                <div
                  onPointerDown={(e) => dragControls.start(e)}
                  className="w-full pt-1 pb-3 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none -mt-1"
                >
                  <div className="w-12 h-1.5 bg-vault-dark/25 hover:bg-vault-dark/40 rounded-full" />
                </div>

                {/* Sheet Header */}
                <div className="flex items-center justify-between border-b-2 border-vault-dark/15 pb-3">
                  <div>
                    <h2 className="font-serif text-2xl text-vault-dark font-normal">
                      {editingItemId ? 'Edit Vault Item' : 'Add to Vault'}
                    </h2>
                    <p className="font-sans text-xs text-vault-dark/70">
                      Save master prompts, agent skill rules, or website bookmarks.
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

                {renderModalForm()}
              </motion.div>
            </div>
          ) : (
            /* DESKTOP CENTERED FLOATING MODAL */
            <div
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsModalOpen(false);
              }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto overscroll-contain"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 14 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="bg-vault-cream border-2 border-vault-dark rounded-[24px] sm:rounded-[28px] max-w-lg w-full p-5 sm:p-7 space-y-5 shadow-2xl relative my-8"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b-2 border-vault-dark/15 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl text-vault-dark font-normal">
                      {editingItemId ? 'Edit Vault Item' : 'Add to Vault'}
                    </h2>
                    <p className="font-sans text-xs text-vault-dark/70">
                      Save master prompts, agent skill rules, or website bookmarks.
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

                {renderModalForm()}
              </motion.div>
            </div>
          )
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* BESPOKE NEO-BRUTALIST DELETE CONFIRMATION DIALOG         */}
      {/* ======================================================== */}
      <AnimatePresence>
        {deleteConfirmItem && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setDeleteConfirmItem(null);
            }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto overscroll-contain"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="bg-vault-cream border-2 border-vault-dark rounded-[24px] sm:rounded-[28px] max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setDeleteConfirmItem(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-vault-dark/20 flex items-center justify-center hover:bg-vault-dark/10 transition-colors cursor-pointer text-vault-dark"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Icon & Warning Header */}
              <div className="flex items-start gap-4 pr-6">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border-2 border-vault-dark flex items-center justify-center text-red-600 shrink-0 shadow-xs">
                  <Trash2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-red-600 block">
                    Confirm Removal
                  </span>
                  <h3 className="font-serif text-2xl text-vault-dark font-normal leading-tight mt-0.5">
                    Delete from Vault?
                  </h3>
                </div>
              </div>

              {/* Body message with item title */}
              <div className="bg-white/80 border-2 border-vault-dark/15 rounded-xl p-3.5 space-y-1">
                <p className="font-sans text-xs text-vault-dark/70">
                  Are you sure you want to permanently remove this entry?
                </p>
                <p className="font-sans text-xs sm:text-sm font-bold text-vault-dark line-clamp-2">
                  "{deleteConfirmItem.title}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmItem(null)}
                  className="px-5 py-2.5 rounded-full border-2 border-vault-dark text-vault-dark font-sans text-xs sm:text-sm font-bold hover:bg-vault-yellow/40 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="px-5 py-2.5 rounded-full bg-red-600 text-white border-2 border-vault-dark font-sans text-xs sm:text-sm font-bold shadow-xs hover:bg-red-700 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4 stroke-[2.2]" />
                  <span>Delete Entry</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
