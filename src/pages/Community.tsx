import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import {
  Search,
  Heart,
  Copy,
  Check,
  Download,
  ExternalLink,
  Bookmark,
  X,
  Star,
  Layers,
  Terminal,
  Globe,
  Code2,
  Eye,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import Toast, { ToastContainer, ToastType } from '../components/ui/Toast';
import { copyToClipboard } from '../utils/clipboard';
import {
  VaultItem,
  VaultItemType,
  getStoredVaultItems,
  saveStoredVaultItems,
} from '../components/Vault-Page/vaultData';

// Community Item Model
export interface CommunityItem {
  id: string;
  type: VaultItemType;
  title: string;
  description: string;
  category: string;
  content: string;
  url?: string;
  tool?: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    isVerified?: boolean;
  };
  metrics: {
    likes: number;
    views: number;
  };
  publishedAt: string;
  isSelf?: boolean;
}

interface ActiveToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

export type CommunityTab = 'all' | 'prompt' | 'skill' | 'website' | 'my-shares';

// Mock Master Dataset (24 curated production templates for pagination demonstration)
const MASTER_COMMUNITY_ITEMS: CommunityItem[] = [
  {
    id: 'comm-1',
    type: 'prompt',
    title: 'DeepSeek R1 + Claude 3.7 Hybrid Chain-of-Thought',
    description:
      'A structured reasoning protocol that instructs the LLM to write hidden self-correcting logic before outputting concise production code.',
    category: 'Agent Skills',
    tool: 'Claude',
    content: `You are an elite reasoning engine and principal software architect.
Before producing any code or technical solution:
1. <thought_process>: Write out your hidden step-by-step hypothesis, edge cases, and failure modes.
2. Critique your own initial solution for race conditions, re-renders, and memory overhead.
3. Validate against standard engineering invariants.
4. Output the final, pristine implementation with minimal explanation and zero hallucinated dependencies.`,
    author: {
      name: 'Harsh Rathod',
      handle: '@harshrathod',
      avatar: '/avatars/avatar-1.svg',
      isVerified: true,
    },
    metrics: { likes: 642, views: 4210 },
    publishedAt: '2h ago',
  },
  {
    id: 'comm-2',
    type: 'skill',
    title: 'Next.js 15 & React 19 Strict .cursorrules',
    description:
      'Production-tested cursorrules enforcing Server Components, Server Actions validation, and zero client-side bundle leakage.',
    category: 'Frontend',
    tool: 'Cursor',
    content: `# Next.js 15 & React 19 Architectural Rules
- ALWAYS default to React Server Components (RSC).
- Use 'use client' strictly at leaf nodes handling user events or browser APIs.
- Validate all Server Action payloads with Zod or Valibot before invoking database layers.
- Prefer Tailwind CSS v4 design tokens and CSS variables over inline arbitrary styles.
- Enforce strict TypeScript: NO 'any', always define return types for asynchronous functions.
- Optimize images using Next/Image with explicit aspect ratios and AVIF priority loading.`,
    author: {
      name: 'Elena Rostova',
      handle: '@elena_ux',
      avatar: '/avatars/avatar-2.svg',
      isVerified: true,
    },
    metrics: { likes: 890, views: 6540 },
    publishedAt: '5h ago',
  },
  {
    id: 'comm-3',
    type: 'skill',
    title: 'Google Antigravity Autonomous Refactoring Skill',
    description:
      'Autonomous agent protocol for discovering, safely refactoring, and verifying legacy code modules without introducing regression bugs.',
    category: 'Agent Skills',
    tool: 'Antigravity',
    content: `---
name: autonomous-refactor
description: Comprehensive refactoring workflow ensuring zero regressions and high cohesion
---

# Instructions
1. Discover existing callers and AST signatures using rip-grep.
2. Build unit tests capturing baseline behavior before touching target files.
3. Apply modular separation of concerns without changing external API interfaces.
4. Run project build and automated test suites to verify integrity.
5. Generate a walkthrough markdown summary highlighting performance and clarity gains.`,
    author: {
      name: 'Kenji Sato',
      handle: '@kenji_code',
      avatar: '/avatars/avatar-3.svg',
      isVerified: true,
    },
    metrics: { likes: 415, views: 2980 },
    publishedAt: '1d ago',
  },
  {
    id: 'comm-4',
    type: 'prompt',
    title: 'Senior Systems Architect PRD-to-RFC Generator',
    description:
      'Transforms vague product requirements into rigorous Technical RFC specifications complete with data schemas and trade-off matrices.',
    category: 'System Prompts',
    tool: 'Claude',
    content: `Given a product requirements document or feature brief, produce an RFC with:
- Context & Executive Summary: Problem statement and business motivation.
- System Architecture Diagram (Mermaid syntax) showing data flow and network boundaries.
- Database Schema (PostgreSQL DDL or Prisma syntax) with indexed foreign keys.
- API Endpoints & Request/Response JSON contracts with HTTP status codes.
- Alternatives Considered & Technical Trade-offs (Latency vs Consistency vs Cost).
- Rollout & Disaster Recovery Plan (Feature flags and backward compatibility).`,
    author: {
      name: 'Sarah Jenkins',
      handle: '@sarah_fullstack',
      avatar: '/avatars/avatar-4.svg',
      isVerified: false,
    },
    metrics: { likes: 320, views: 2150 },
    publishedAt: '2d ago',
  },
  {
    id: 'comm-5',
    type: 'website',
    title: 'Cursor Directory — Curated .cursorrules for 50+ Frameworks',
    description:
      'An open-source directory of community-tested system prompt rules for Rust, Python, Svelte, Flutter, and Tailwind.',
    category: 'AI Docs',
    tool: 'Cursor',
    url: 'https://cursorrules.org',
    content:
      'Comprehensive open-source repository of verified .cursorrules. Easily find and copy tailored IDE instructions for specific tech stacks.',
    author: {
      name: 'Marcus Vance',
      handle: '@marcus_agent',
      avatar: '/avatars/avatar-5.svg',
      isVerified: true,
    },
    metrics: { likes: 510, views: 3450 },
    publishedAt: '3d ago',
  },
  {
    id: 'comm-6',
    type: 'skill',
    title: 'Python FastAPI & Async SQLAlchemy 2.0 Template',
    description:
      'Windsurf & Claude system rule set for writing async Python APIs with strict Pydantic v2 schemas and connection pooling.',
    category: 'Backend',
    tool: 'Windsurf',
    content: `# FastAPI & Async SQLAlchemy 2.0 Guidelines
- Use async/await throughout all route handlers and database repositories.
- Use Annotated dependencies with Depends() for cleaner dependency injection.
- Structure schemas with Pydantic v2 (ConfigDict, model_validator).
- Prevent N+1 queries by using selectinload() or joinedload() on ORM relationships.
- Use Alembic migrations exclusively for schema changes. Never run sync DDL in runtime.`,
    author: {
      name: 'Alex Chen',
      handle: '@chen_dev',
      avatar: '/avatars/avatar-1.svg',
      isVerified: false,
    },
    metrics: { likes: 478, views: 3820 },
    publishedAt: '4d ago',
  },
  {
    id: 'comm-7',
    type: 'prompt',
    title: 'Editorial Neo-Brutalist CSS & Design Token Stylist',
    description:
      'Prompts the LLM to design high-fashion editorial interfaces using 2px borders, warm cream backdrops, and spring physics.',
    category: 'Design',
    tool: 'Claude',
    content: `You are an elite design technologist specializing in Editorial Neo-Brutalism.
Design Guidelines:
- High contrast 2px solid outlines (border-vault-dark #002D0F).
- Primary colors: Warm Vault Cream (#F8F9E9), Vault Yellow (#F1F78C), Vault Green (#1ECC62).
- Typography: Instrument Serif for grand editorial headers; Manrope for clean UI and metadata.
- Motion: Cubic-bezier spring transitions (cubic-bezier(0.16, 1, 0.3, 1)).
- Avoid generic corporate styles, plain shadows, and boring flat buttons. Everything must feel crafted and intentional.`,
    author: {
      name: 'Maya Patel',
      handle: '@maya_design',
      avatar: '/avatars/avatar-2.svg',
      isVerified: true,
    },
    metrics: { likes: 580, views: 4100 },
    publishedAt: '5d ago',
  },
  {
    id: 'comm-8',
    type: 'prompt',
    title: 'Docker Scratch Multi-Stage Build Optimizer for Go & Rust',
    description:
      'Generates minimal, secure <15MB production container definitions with non-root security contexts and multi-stage caching.',
    category: 'DevOps',
    tool: 'General IDE',
    content: `# Multi-Stage Dockerfile Blueprint
# Stage 1: Build & test with dependencies
FROM golang:1.23-alpine AS builder
WORKDIR /app
RUN apk --no-cache add ca-certificates git
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /app/server .

# Stage 2: Pristine zero-vulnerability runtime container
FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /app/server /server
USER 10001:10001
EXPOSE 8080
ENTRYPOINT ["/server"]`,
    author: {
      name: 'David Kim',
      handle: '@david_ops',
      avatar: '/avatars/avatar-3.svg',
      isVerified: false,
    },
    metrics: { likes: 215, views: 1670 },
    publishedAt: '1w ago',
  },
  {
    id: 'comm-9',
    type: 'skill',
    title: 'Windsurf Cascade Agent Testing & Linting Protocol',
    description:
      'Enforces test-driven development and strict ESLint boundary checking before any task completion in Windsurf.',
    category: 'DevOps',
    tool: 'Windsurf',
    content: `# Cascade TDD and Linting Protocol
1. Prior to editing files, run existing test suites to establish green baseline.
2. For each new utility, write a failing unit test asserting expected edge cases.
3. Write the minimal code satisfying the test assertion.
4. Execute linter checks; zero lint warnings permitted.`,
    author: {
      name: 'Tanya Morales',
      handle: '@tanya_qa',
      avatar: '/avatars/avatar-4.svg',
      isVerified: true,
    },
    metrics: { likes: 360, views: 2430 },
    publishedAt: '1w ago',
  },
  {
    id: 'comm-10',
    type: 'prompt',
    title: 'SQL Database Indexing & Query Plan Explainer',
    description:
      'Analyzes slow Postgres and MySQL queries, breaks down EXPLAIN ANALYZE output, and recommends compound indexes.',
    category: 'Backend',
    tool: 'Claude',
    content: `You are an expert DBA. Given a slow SQL query and schema:
1. Parse table scans, nested loops, and memory sorts.
2. Suggest optimal B-Tree or GIN indexes with column ordering rationale.
3. Rewrite joins to eliminate Cartesian products.`,
    author: {
      name: 'Leo Zhang',
      handle: '@leo_data',
      avatar: '/avatars/avatar-5.svg',
      isVerified: true,
    },
    metrics: { likes: 490, views: 3120 },
    publishedAt: '2w ago',
  },
  {
    id: 'comm-11',
    type: 'website',
    title: 'Awesome Agentic Skills Repository (GitHub)',
    description:
      'Curated community catalog of high-impact skill.md files, MCP plugins, and prompt templates for autonomous AI assistants.',
    category: 'Agent Skills',
    tool: 'Antigravity',
    url: 'https://github.com/agentic-skills',
    content:
      'A collection of production-grade skill.md configurations for Antigravity, Cursor, and Claude Code.',
    author: {
      name: 'Harsh Rathod',
      handle: '@harshrathod',
      avatar: '/avatars/avatar-1.svg',
      isVerified: true,
    },
    metrics: { likes: 720, views: 5100 },
    publishedAt: '2w ago',
  },
  {
    id: 'comm-12',
    type: 'prompt',
    title: 'Tailwind CSS v4 Container Queries & Grid Master',
    description:
      'Guides LLMs to build responsive, component-driven layouts using @container queries and zero fixed media query breakpoints.',
    category: 'Frontend',
    tool: 'Cursor',
    content: `Use modern container queries:
- Add @container on parent containers.
- Use @sm:, @md:, @lg: on children to adapt fluidly to local width.
- Eliminate horizontal overflow using min-w-0 and shrink-0.`,
    author: {
      name: 'Elena Rostova',
      handle: '@elena_ux',
      avatar: '/avatars/avatar-2.svg',
      isVerified: true,
    },
    metrics: { likes: 530, views: 3740 },
    publishedAt: '3w ago',
  },
];

// Page size for paginated fetching
const BATCH_SIZE = 6;

// =========================================================================
// SKELETON LOADING CARD COMPONENT (Modern Neo-Brutalist Shimmer)
// =========================================================================
function CommunitySkeletonCard() {
  return (
    <div className="bg-vault-cream border-2 border-vault-dark rounded-[24px] sm:rounded-[26px] p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs relative overflow-hidden animate-pulse">
      <div className="space-y-3.5">
        {/* Author row skeleton */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-vault-dark/15 border border-vault-dark/20" />
            <div className="space-y-1.5">
              <div className="w-24 h-3 rounded-md bg-vault-dark/15" />
              <div className="w-16 h-2.5 rounded-md bg-vault-dark/10" />
            </div>
          </div>
          <div className="w-14 h-5 rounded-md bg-vault-dark/15" />
        </div>

        {/* Title & Description skeleton */}
        <div className="space-y-2 pt-1">
          <div className="w-3/4 h-5 rounded-md bg-vault-dark/20" />
          <div className="w-full h-3 rounded-md bg-vault-dark/10" />
          <div className="w-5/6 h-3 rounded-md bg-vault-dark/10" />
        </div>

        {/* Terminal code box skeleton */}
        <div className="bg-vault-dark/90 rounded-xl p-3 h-28 space-y-2 border border-vault-dark/30">
          <div className="flex items-center justify-between pb-2 border-b border-vault-cream/10">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-vault-cream/20" />
              <div className="w-2 h-2 rounded-full bg-vault-cream/20" />
              <div className="w-2 h-2 rounded-full bg-vault-cream/20" />
              <div className="w-16 h-2 rounded bg-vault-cream/20 ml-1.5" />
            </div>
          </div>
          <div className="w-full h-2.5 rounded bg-vault-cream/15" />
          <div className="w-4/5 h-2.5 rounded bg-vault-cream/15" />
          <div className="w-2/3 h-2.5 rounded bg-vault-cream/10" />
        </div>

        {/* Meta pills skeleton */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <div className="w-16 h-5 rounded-md bg-vault-dark/10" />
          <div className="w-20 h-5 rounded-md bg-vault-dark/10" />
        </div>
      </div>

      {/* Footer tray skeleton */}
      <div className="pt-3 border-t border-vault-dark/15 flex items-center justify-between gap-1.5">
        <div className="w-12 h-7 rounded-xl bg-vault-dark/10" />
        <div className="flex items-center gap-1.5">
          <div className="w-16 h-7 rounded-xl bg-vault-dark/15" />
          <div className="w-16 h-7 rounded-xl bg-vault-dark/15" />
        </div>
      </div>
    </div>
  );
}

export default function Community() {
  const navigate = useNavigate();

  // Liked items tracking
  const [likedIds, setLikedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('prompt_vault_liked_community_items');
      if (saved) return new Set(JSON.parse(saved));
    } catch { }
    return new Set(['comm-1', 'comm-2']);
  });

  // User's own saved items in local Vault
  const [vaultItems, setVaultItems] = useState<VaultItem[]>(getStoredVaultItems);

  // Filter & Search State
  const [activeTab, setActiveTab] = useState<CommunityTab>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // =========================================================================
  // PAGINATION, ASYNC BATCHING & SKELETON LOADING ENGINE
  // =========================================================================
  const [items, setItems] = useState<CommunityItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Intersection sentinel for infinite scrolling
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Responsive device state for mobile bottom sheet vs desktop modal
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

  // Interactive feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inspectItem, setInspectItem] = useState<CommunityItem | null>(null);
  const [activeToast, setActiveToast] = useState<ActiveToast | null>(null);

  const showToast = (message: string, type: ToastType = 'success', title?: string) => {
    setActiveToast({
      id: Date.now().toString(),
      type,
      title,
      message,
    });
  };

  const inspectDragControls = useDragControls();

  // Background scroll locking when modal / bottom sheet is open (prevents dragging conflicts)
  useEffect(() => {
    if (inspectItem) {
      const originalOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [inspectItem]);

  // Load User Published items dynamically from personal Vault
  const userPublishedItems = useMemo(() => {
    return vaultItems
      .filter((item) => item.isPublished)
      .map((item) => ({
        id: `vault-pub-${item.id}`,
        type: item.type,
        title: item.title,
        description: item.category ? `${item.category} contribution from your personal Vault.` : 'Shared from Vault',
        category: item.category || 'General',
        content: item.content,
        url: item.url,
        tool: item.tool,
        author: {
          name: 'You',
          handle: '@you',
          avatar: '/avatars/avatar-1.svg',
          isVerified: true,
        },
        metrics: { likes: 12, views: 95 },
        publishedAt: item.timestamp || 'Recently',
        isSelf: true,
      }));
  }, [vaultItems]);

  // Combined master pool for simulation
  const fullDataset = useMemo(() => {
    const combined = [...userPublishedItems, ...MASTER_COMMUNITY_ITEMS];
    const seen = new Set<string>();
    return combined.filter((i) => {
      if (seen.has(i.id) || seen.has(i.title)) return false;
      seen.add(i.id);
      seen.add(i.title);
      return true;
    });
  }, [userPublishedItems]);

  // Core filter calculation on the full dataset
  const filteredDataset = useMemo(() => {
    return fullDataset.filter((item) => {
      if (activeTab === 'prompt' && item.type !== 'prompt') return false;
      if (activeTab === 'skill' && item.type !== 'skill') return false;
      if (activeTab === 'website' && item.type !== 'website') return false;
      if (activeTab === 'my-shares' && !item.isSelf) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchContent = item.content.toLowerCase().includes(q);
        const matchAuthor = item.author.name.toLowerCase().includes(q) || item.author.handle.toLowerCase().includes(q);
        const matchTool = item.tool ? item.tool.toLowerCase().includes(q) : false;
        return matchTitle || matchDesc || matchContent || matchAuthor || matchTool;
      }
      return true;
    });
  }, [fullDataset, activeTab, searchQuery]);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: fullDataset.length,
      prompt: fullDataset.filter((i) => i.type === 'prompt').length,
      skill: fullDataset.filter((i) => i.type === 'skill').length,
      website: fullDataset.filter((i) => i.type === 'website').length,
      'my-shares': fullDataset.filter((i) => i.isSelf).length,
    };
  }, [fullDataset]);

  // =========================================================================
  // SIMULATED / API BATCH FETCH HANDLER
  // Replace this simulation with:
  // const res = await fetch(`/api/prompts?page=${targetPage}&limit=${BATCH_SIZE}&tab=${activeTab}`);
  // =========================================================================
  const fetchBatch = useCallback(
    async (targetPage: number, isInitial: boolean) => {
      if (isInitial) {
        setIsLoadingInitial(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);

      try {
        // Simulated network latency to showcase modern skeleton loader
        await new Promise((resolve) => setTimeout(resolve, isInitial ? 350 : 500));

        const start = 0;
        const end = targetPage * BATCH_SIZE;
        const sliced = filteredDataset.slice(start, end);

        setItems(sliced);
        setHasMore(end < filteredDataset.length);
        setPage(targetPage);
      } catch (err: any) {
        setError(err?.message || 'Failed to retrieve community prompts. Please try again.');
      } finally {
        setIsLoadingInitial(false);
        setIsLoadingMore(false);
      }
    },
    [filteredDataset]
  );

  // Initial Fetch & Filter Reset
  useEffect(() => {
    fetchBatch(1, true);
  }, [activeTab, searchQuery, fetchBatch]);

  // Infinite Scroll Trigger via IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isLoadingInitial && !isLoadingMore) {
          fetchBatch(page + 1, false);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoadingInitial, isLoadingMore, page, fetchBatch]);

  // Like Toggle
  const handleToggleLike = (e: React.MouseEvent, item: CommunityItem) => {
    e.stopPropagation();
    const newLikes = new Set(likedIds);
    const isCurrentlyLiked = newLikes.has(item.id);

    if (isCurrentlyLiked) {
      newLikes.delete(item.id);
      showToast(`Removed like for "${item.title}"`, 'info', 'Unliked');
    } else {
      newLikes.add(item.id);
      showToast(`Liked "${item.title}"!`, 'success', 'Liked');
    }

    setLikedIds(newLikes);
    try {
      localStorage.setItem('prompt_vault_liked_community_items', JSON.stringify(Array.from(newLikes)));
    } catch { }

    setItems((prev) =>
      prev.map((i) => {
        if (i.id === item.id) {
          return {
            ...i,
            metrics: {
              ...i.metrics,
              likes: isCurrentlyLiked ? Math.max(0, i.metrics.likes - 1) : i.metrics.likes + 1,
            },
          };
        }
        return i;
      })
    );
  };

  // Copy Content to Clipboard
  const handleCopyContent = async (e: React.MouseEvent, item: CommunityItem) => {
    e.stopPropagation();
    const textToCopy = item.type === 'website' && item.url ? item.url : item.content;
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopiedId(item.id);
      showToast(
        item.type === 'website' ? 'Website URL copied to clipboard!' : 'Prompt template copied to clipboard!',
        'success',
        'Copied'
      );
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  // Clone / Save to Personal Vault
  const handleSaveToVault = (e: React.MouseEvent, item: CommunityItem) => {
    e.stopPropagation();
    const currentVault = getStoredVaultItems();
    const alreadySaved = currentVault.some(
      (v) => v.title.toLowerCase().trim() === item.title.toLowerCase().trim()
    );

    if (alreadySaved) {
      showToast(`"${item.title}" is already in your Vault Library!`, 'info', 'Already Saved');
      return;
    }

    const newVaultItem: VaultItem = {
      id: `vault-cloned-${Date.now()}`,
      type: item.type,
      title: item.title,
      category: item.category,
      content: item.content,
      url: item.url,
      tool: item.tool,
      timestamp: 'Just now',
      isStarred: false,
      isPublished: false,
    };

    const updated = [newVaultItem, ...currentVault];
    saveStoredVaultItems(updated);
    setVaultItems(updated);
    showToast(`"${item.title}" cloned to your Vault!`, 'success', 'Saved to Vault');
  };

  // Download Skill as .md
  const handleDownloadSkill = (e: React.MouseEvent, item: CommunityItem) => {
    e.stopPropagation();
    try {
      const blob = new Blob([item.content], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const slug = item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      link.href = url;
      link.download = `${slug || 'skill'}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast(`Downloaded "${item.title}.md"`, 'success', 'Skill Exported');
    } catch {
      showToast('Failed to generate markdown download', 'error', 'Export Error');
    }
  };

  const isItemSavedInVault = (itemTitle: string) => {
    return vaultItems.some((v) => v.title.toLowerCase().trim() === itemTitle.toLowerCase().trim());
  };

  return (
    <div className="w-full min-h-screen bg-vault-cream text-vault-dark flex flex-col lg:flex-row p-3 sm:p-4 md:p-6 gap-4 sm:gap-6 selection:bg-vault-green selection:text-vault-dark relative items-start">
      {/* Toast Feedback */}
      <ToastContainer>
        {activeToast && (
          <Toast
            key={activeToast.id}
            type={activeToast.type}
            title={activeToast.title}
            message={activeToast.message}
            duration={2000}
            onClose={() => setActiveToast(null)}
          />
        )}
      </ToastContainer>

      {/* Desktop Sidebar & Mobile Bottom Navigation */}
      <Sidebar
        activeTab="community"
        onTabChange={(tab) => {
          if (tab === 'dashboard') navigate('/dashboard');
          else if (tab === 'vault') navigate('/vault');
          else if (tab === 'settings') navigate('/settings');
        }}
        promptCount={vaultItems.length}
        onOpenAddModal={() => navigate('/vault?add=true')}
      />

      {/* Main Community Workspace Area */}
      <main className="flex-1 flex flex-col space-y-6 min-w-0 w-full pb-28 lg:pb-8">
        {/* ================================================================= */}
        {/* 1. TOP HEADER - VAULT YELLOW CONTAINER (COMPACT ON MOBILE)        */}
        {/* ================================================================= */}
        <header className="bg-vault-yellow border-2 border-vault-dark rounded-[20px] sm:rounded-[28px] p-3.5 sm:p-6 md:p-8 relative overflow-hidden shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 relative z-10">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-vault-cream border border-vault-dark font-sans text-[10px] sm:text-xs font-bold text-vault-dark uppercase tracking-wider shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-vault-green animate-ping" />
                  <span className="w-1.5 h-1.5 rounded-full bg-vault-green -ml-3" />
                  Live Registry
                </span>
                <span className="font-sans text-[10px] sm:text-xs font-bold bg-vault-dark text-vault-yellow border border-vault-dark px-2 py-0.5 rounded-full shadow-2xs">
                  {fullDataset.length} Templates
                </span>
              </div>

              <h1 className="font-serif italic text-2xl sm:text-3xl md:text-5xl font-normal tracking-tight text-vault-dark leading-none">
                Community Vault
              </h1>
            </div>
          </div>

          <p className="hidden sm:block font-sans text-xs sm:text-sm text-vault-dark/80 leading-relaxed font-medium mt-2 max-w-2xl">
            Explore, clone, and test production-tested prompts, agent <code className="font-mono bg-vault-dark/10 px-1 py-0.5 rounded text-vault-dark font-bold text-xs">skill.md</code> rules, and developer workflows built by global AI engineers.
          </p>
        </header>

        {/* ================================================================= */}
        {/* 2. FILTER TABS & SEARCH BAR                                       */}
        {/* ================================================================= */}
        <section className="space-y-4" aria-label="Community Filters and Search">
          {/* Main Filter Tabs Bar */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-vault-dark/5 rounded-2xl border border-vault-dark/15 shrink-0">
              {(
                [
                  { id: 'all', label: 'All Items', icon: Layers, count: tabCounts.all },
                  { id: 'prompt', label: 'Prompts', icon: Terminal, count: tabCounts.prompt },
                  { id: 'skill', label: 'Skill Rules', icon: Code2, count: tabCounts.skill },
                  { id: 'website', label: 'Workflows & Links', icon: Globe, count: tabCounts.website },
                  { id: 'my-shares', label: 'My Published 🌟', icon: Star, count: tabCounts['my-shares'] },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${isActive
                        ? 'bg-vault-dark text-vault-cream shadow-sm font-bold'
                        : 'text-vault-dark/70 hover:text-vault-dark hover:bg-vault-cream/80'
                      }`}
                  >
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-vault-yellow' : 'text-vault-dark/60'}`} />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-vault-yellow text-vault-dark font-bold' : 'bg-vault-dark/10 text-vault-dark/60'
                        }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Input Row */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-vault-dark/50 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts, skill rules, authors, or tools..."
              className="w-full pl-11 pr-10 py-2.5 sm:py-3 bg-vault-cream border-2 border-vault-dark rounded-xl sm:rounded-2xl font-sans text-xs sm:text-sm placeholder:text-vault-dark/45 focus:outline-none focus:ring-2 focus:ring-vault-green/40 shadow-xs text-vault-dark font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-vault-dark/50 hover:text-vault-dark p-1 cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. ERROR STATE / BLANK STATE / CARDS GRID WITH SKELETON LOADERS   */}
        {/* ================================================================= */}
        {error ? (
          /* Error State Card with Retry Action */
          <div className="bg-vault-cream border-2 border-red-500 rounded-[24px] sm:rounded-[28px] p-8 sm:p-12 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center mx-auto text-red-600">
              <AlertCircle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="font-serif italic text-2xl font-normal text-vault-dark">
                Failed to Load Community Prompts
              </h3>
              <p className="font-sans text-xs sm:text-sm text-vault-dark/70 leading-relaxed">
                {error}
              </p>
            </div>
            <button
              type="button"
              onClick={() => fetchBatch(1, true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-vault-dark text-vault-cream font-sans text-xs sm:text-sm font-bold border-2 border-vault-dark cursor-pointer hover:bg-vault-dark/90 transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Request</span>
            </button>
          </div>
        ) : isLoadingInitial ? (
          /* Initial Loading: 6 Modern Skeleton Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <CommunitySkeletonCard key={`skel-init-${idx}`} />
            ))}
          </div>
        ) : items.length === 0 ? (
          /* Blank Search / Filter State */
          <div className="bg-vault-cream border-2 border-vault-dark/20 border-dashed rounded-[28px] p-8 sm:p-14 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-vault-yellow/50 border-2 border-vault-dark flex items-center justify-center mx-auto shadow-xs">
              <Search className="w-6 h-6 text-vault-dark" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif italic text-2xl font-normal text-vault-dark">
                No Community Templates Found
              </h3>
              <p className="font-sans text-xs sm:text-sm text-vault-dark/60 max-w-md mx-auto">
                We couldn't find any contributions matching your search. Try adjusting your query or resetting filters.
              </p>
            </div>
            <div className="flex items-center justify-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="px-4 py-2 rounded-xl bg-vault-dark text-vault-cream font-sans text-xs font-bold border-2 border-vault-dark cursor-pointer hover:bg-vault-dark/90 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          /* Data Loaded Grid + Append Skeleton Cards during Scroll Fetch */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-5">
              {items.map((item) => {
                const isLiked = likedIds.has(item.id);
                const isSavedInVault = isItemSavedInVault(item.title);
                const isSkill = item.type === 'skill';
                const isWebsite = item.type === 'website';

                return (
                  <article
                    key={item.id}
                    onClick={() => setInspectItem(item)}
                    className="group bg-vault-cream border-2 border-vault-dark rounded-[24px] sm:rounded-[26px] p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#002D0F] transition-all duration-200 cursor-pointer relative overflow-hidden"
                  >
                    <div className="space-y-3.5">
                      {/* Author Metadata + Item Type Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.author.avatar}
                            alt={item.author.name}
                            className="w-8 h-8 rounded-full border border-vault-dark bg-vault-yellow/40 shrink-0 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/avatars/avatar-1.svg';
                            }}
                          />
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1 min-w-0">
                              <span className="font-sans text-xs font-bold text-vault-dark truncate">
                                {item.author.name}
                              </span>
                              {item.author.isVerified && (
                                <CheckCircle2 className="w-3 h-3 text-vault-green shrink-0 fill-vault-dark stroke-vault-cream" />
                              )}
                              {item.isSelf && (
                                <span className="text-[10px] bg-vault-dark text-vault-yellow font-mono px-1 rounded font-bold">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="font-sans text-[11px] text-vault-dark/55 truncate">
                              {item.author.handle} • {item.publishedAt}
                            </span>
                          </div>
                        </div>

                        {/* Item Type Badge */}
                        <span
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shrink-0 ${isSkill
                              ? 'bg-vault-green text-vault-dark border-vault-dark'
                              : isWebsite
                                ? 'bg-sky-200 text-vault-dark border-vault-dark'
                                : 'bg-vault-yellow text-vault-dark border-vault-dark'
                            }`}
                        >
                          {isSkill ? 'skill.md' : isWebsite ? 'link' : 'prompt'}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1.5">
                        <h2 className="font-serif italic text-xl sm:text-2xl text-vault-dark font-normal tracking-tight line-clamp-1 group-hover:text-vault-dark transition-colors">
                          {item.title}
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-vault-dark/70 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Terminal Preview Code Box */}
                      <div className="bg-vault-dark text-vault-cream rounded-xl p-3 font-mono text-xs border border-vault-dark/40 relative overflow-hidden group/code">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-vault-cream/10 text-[10px] text-vault-cream/60">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-400/80" />
                            <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                            <span className="w-2 h-2 rounded-full bg-green-400/80" />
                            <span className="ml-1 font-bold text-vault-cream/80">
                              {item.tool || 'snippet'}.{isSkill ? 'md' : 'prompt'}
                            </span>
                          </div>
                          <span className="text-vault-cream/40 flex items-center gap-1">
                            <Eye className="w-3 h-3" /> Preview
                          </span>
                        </div>
                        <pre className="line-clamp-3 whitespace-pre-wrap break-words text-vault-cream/85 font-mono text-[11px] leading-relaxed">
                          {item.content}
                        </pre>
                      </div>

                      {/* Tool & Category Meta Pills */}
                      <div className="flex items-center flex-wrap gap-1.5 pt-0.5">
                        {item.tool && (
                          <span className="font-sans text-[11px] font-semibold bg-vault-yellow/50 text-vault-dark border border-vault-dark/30 px-2 py-0.5 rounded-md">
                            {item.tool}
                          </span>
                        )}
                        <span className="font-sans text-[11px] font-semibold bg-vault-dark/5 text-vault-dark/75 border border-vault-dark/15 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Tray: Like, Copy, Clone to Vault */}
                    <div className="pt-3 border-t border-vault-dark/15 flex items-center justify-between gap-1.5 w-full">
                      {/* Left: Like button with counter */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleLike(e, item)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border font-sans text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${isLiked
                            ? 'bg-rose-100 text-rose-700 border-rose-400 shadow-2xs'
                            : 'bg-vault-cream text-vault-dark/70 border-vault-dark/20 hover:border-vault-dark hover:text-vault-dark'
                          }`}
                        title={isLiked ? 'Unlike' : 'Like'}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-transform active:scale-125 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-vault-dark/60'
                            }`}
                        />
                        <span>{item.metrics.likes}</span>
                      </button>

                      {/* Right Action Buttons */}
                      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                        {/* Copy Action */}
                        <button
                          type="button"
                          onClick={(e) => handleCopyContent(e, item)}
                          className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border-2 font-sans text-xs font-bold transition-colors cursor-pointer shrink-0 whitespace-nowrap ${copiedId === item.id
                              ? 'bg-vault-green text-vault-dark border-vault-dark'
                              : 'bg-vault-cream text-vault-dark border-vault-dark hover:bg-vault-dark hover:text-vault-cream'
                            }`}
                          title="Copy prompt"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        {/* Clone / Save to Personal Vault */}
                        <button
                          type="button"
                          onClick={(e) => handleSaveToVault(e, item)}
                          className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border-2 font-sans text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${isSavedInVault
                              ? 'bg-vault-yellow text-vault-dark border-vault-dark shadow-2xs'
                              : 'bg-vault-green text-vault-dark border-vault-dark hover:bg-[#19b657]'
                            }`}
                          title={isSavedInVault ? 'Saved in Vault' : 'Save to Vault'}
                        >
                          {isSavedInVault ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>Saved</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>Clone</span>
                            </>
                          )}
                        </button>

                        {/* Download .md for Skills */}
                        {isSkill && (
                          <button
                            type="button"
                            onClick={(e) => handleDownloadSkill(e, item)}
                            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border-2 border-vault-dark bg-vault-cream text-vault-dark hover:bg-vault-yellow font-sans text-xs font-bold transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                            title="Download .md file"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>.md</span>
                          </button>
                        )}

                        {/* Visit for Websites */}
                        {isWebsite && item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border-2 border-vault-dark bg-vault-cream text-vault-dark hover:bg-vault-yellow font-sans text-xs font-bold transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                            title="Visit external website"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Visit</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}

              {/* Scroll Fetching Skeletons (rendered while loading next page) */}
              {isLoadingMore && (
                <>
                  <CommunitySkeletonCard />
                  <CommunitySkeletonCard />
                  <CommunitySkeletonCard />
                </>
              )}
            </div>

            {/* Infinite Scroll Intersection Sentinel & Editorial End Milestone */}
            <div ref={sentinelRef} className="w-full flex items-center justify-center py-6 sm:py-8">
              {!hasMore && items.length > 0 && (
                <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center space-y-2 text-center px-4">
                  <div className="flex items-center gap-3 w-full">
                    <div className="h-[2px] bg-vault-dark/15 flex-1" />
                    <span className="font-serif italic text-lg sm:text-xl text-vault-dark tracking-tight select-none">
                      End of the Vault
                    </span>
                    <div className="h-[2px] bg-vault-dark/15 flex-1" />
                  </div>
                  <p className="font-sans text-xs text-vault-dark/55 font-medium">
                    You've explored all {items.length} curated community templates
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* =================================================================== */}
      {/* 4. DETAIL / INSPECTION MODAL WITH CLEAN INNER SCROLL                */}
      {/* =================================================================== */}
      <AnimatePresence>
        {inspectItem && (
          isMobile ? (
            /* MOBILE INSTAGRAM / YOUTUBE STYLE DRAGGABLE BOTTOM SHEET (VAULT CONSISTENCY) */
            <div className="fixed inset-0 z-50 flex flex-col justify-end">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setInspectItem(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Draggable Bottom Sheet Modal */}
              <motion.div
                drag="y"
                dragListener={false}
                dragControls={inspectDragControls}
                dragConstraints={{ top: 0 }}
                dragElastic={{ top: 0.05, bottom: 0.3 }}
                dragMomentum={false}
                onDragEnd={(_e, info) => {
                  if (info.offset.y > 80 || info.velocity.y > 300) {
                    setInspectItem(null);
                  }
                }}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                className="relative z-10 w-full max-w-lg mx-auto bg-vault-cream border-t-2 border-vault-dark rounded-t-[32px] p-5 pb-[max(3rem,env(safe-area-inset-bottom))] shadow-2xl flex flex-col max-h-[88dvh]"
              >
                {/* Draggable Grab Handle Indicator (Pill Thumb) */}
                <div
                  onPointerDown={(e) => inspectDragControls.start(e)}
                  className="w-full pt-1 pb-3 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none -mt-1 shrink-0"
                >
                  <div className="w-12 h-1.5 bg-vault-dark/25 hover:bg-vault-dark/40 rounded-full transition-colors" />
                </div>

                {/* 1. FIXED MODAL HEADER */}
                <div
                  onPointerDown={(e) => {
                    if ((e.target as HTMLElement).closest('button')) return;
                    inspectDragControls.start(e);
                  }}
                  className="shrink-0 flex items-start justify-between gap-3 pb-3 border-b-2 border-vault-dark/15 touch-none cursor-grab active:cursor-grabbing select-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${inspectItem.type === 'skill'
                            ? 'bg-vault-green text-vault-dark border-vault-dark'
                            : inspectItem.type === 'website'
                              ? 'bg-sky-200 text-vault-dark border-vault-dark'
                              : 'bg-vault-yellow text-vault-dark border-vault-dark'
                          }`}
                      >
                        {inspectItem.type}
                      </span>
                      <span className="font-sans text-xs font-semibold text-vault-dark/60">
                        {inspectItem.category}
                      </span>
                    </div>
                    <h2 className="font-serif italic text-2xl text-vault-dark font-normal tracking-tight">
                      {inspectItem.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInspectItem(null)}
                    className="w-8 h-8 rounded-full border border-vault-dark/20 flex items-center justify-center hover:bg-vault-dark/10 transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4 text-vault-dark" />
                  </button>
                </div>

                {/* 2. INNER SCROLLABLE BODY */}
                <div
                  className="flex-1 overflow-y-auto overscroll-contain py-4 space-y-4 pr-1 [scrollbar-width:thin]"
                  style={{ contain: 'content', WebkitOverflowScrolling: 'touch' }}
                >
                  {/* Author & Metrics Card */}
                  <div className="flex items-center justify-between p-3.5 bg-vault-dark/5 rounded-2xl border border-vault-dark/15">
                    <div className="flex items-center gap-3">
                      <img
                        src={inspectItem.author.avatar}
                        alt={inspectItem.author.name}
                        className="w-10 h-10 rounded-full border border-vault-dark bg-vault-yellow/40 object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-sans text-sm font-bold text-vault-dark">
                            {inspectItem.author.name}
                          </span>
                          {inspectItem.author.isVerified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-vault-green fill-vault-dark stroke-vault-cream" />
                          )}
                        </div>
                        <span className="font-sans text-xs text-vault-dark/60">
                          {inspectItem.author.handle} • Published {inspectItem.publishedAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 font-sans text-xs font-semibold text-vault-dark/70">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-rose-500" /> {inspectItem.metrics.likes}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-vault-dark/80 leading-relaxed">
                    {inspectItem.description}
                  </p>

                  {/* Full Content / Code Box with Inner Scroll */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-sans text-xs font-bold text-vault-dark/70">
                      <span>Prompt / Skill Rule Code</span>
                      {inspectItem.tool && (
                        <span className="bg-vault-yellow px-2 py-0.5 rounded border border-vault-dark font-mono text-[10px]">
                          Target: {inspectItem.tool}
                        </span>
                      )}
                    </div>
                    <div
                      className="bg-vault-dark text-vault-cream rounded-2xl p-4 font-mono text-xs border-2 border-vault-dark relative overflow-hidden"
                      style={{ contain: 'paint' }}
                    >
                      <pre className="whitespace-pre-wrap break-words leading-relaxed font-mono max-h-56 overflow-y-auto pr-2">
                        {inspectItem.content}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* 3. FIXED MODAL FOOTER */}
                <div className="shrink-0 pt-3 border-t-2 border-vault-dark/15 flex items-center gap-1.5 w-full bg-vault-cream">
                  <button
                    type="button"
                    onClick={(e) => handleToggleLike(e, inspectItem)}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border-2 font-sans text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${likedIds.has(inspectItem.id)
                        ? 'bg-rose-100 text-rose-700 border-rose-400 shadow-2xs'
                        : 'bg-vault-cream text-vault-dark border-vault-dark hover:bg-vault-yellow'
                      }`}
                    title={likedIds.has(inspectItem.id) ? 'Unlike' : 'Like'}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${likedIds.has(inspectItem.id) ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                    />
                    <span>{likedIds.has(inspectItem.id) ? 'Liked' : 'Like'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleCopyContent(e, inspectItem)}
                    className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border-2 border-vault-dark bg-vault-cream text-vault-dark hover:bg-vault-dark hover:text-vault-cream font-sans text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Copy className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Copy</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleSaveToVault(e, inspectItem)}
                    className={`flex-1 min-w-0 flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border-2 border-vault-dark font-sans text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${isItemSavedInVault(inspectItem.title)
                        ? 'bg-vault-yellow text-vault-dark shadow-2xs'
                        : 'bg-vault-green text-vault-dark hover:bg-[#19b657]'
                      }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">
                      {isItemSavedInVault(inspectItem.title) ? 'Saved' : 'Clone'}
                    </span>
                  </button>

                  {inspectItem.type === 'skill' && (
                    <button
                      type="button"
                      onClick={(e) => handleDownloadSkill(e, inspectItem)}
                      className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl border-2 border-vault-dark bg-vault-yellow text-vault-dark hover:bg-[#e7ee7b] font-sans text-xs font-bold transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                      title="Download .md file"
                    >
                      <Download className="w-3.5 h-3.5 shrink-0" />
                      <span>.md</span>
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          ) : (
            /* DESKTOP CENTERED FLOATING MODAL */
            <div
              onClick={(e) => {
                if (e.target === e.currentTarget) setInspectItem(null);
              }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto overscroll-contain"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 14 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                className="bg-vault-cream border-2 border-vault-dark rounded-[24px] sm:rounded-[28px] max-w-2xl w-full p-5 sm:p-7 space-y-4 shadow-2xl relative my-8 flex flex-col max-h-[85vh]"
              >
                {/* Header */}
                <div className="shrink-0 flex items-start justify-between gap-3 pb-3 border-b-2 border-vault-dark/15">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${inspectItem.type === 'skill'
                            ? 'bg-vault-green text-vault-dark border-vault-dark'
                            : inspectItem.type === 'website'
                              ? 'bg-sky-200 text-vault-dark border-vault-dark'
                              : 'bg-vault-yellow text-vault-dark border-vault-dark'
                          }`}
                      >
                        {inspectItem.type}
                      </span>
                      <span className="font-sans text-xs font-semibold text-vault-dark/60">
                        {inspectItem.category}
                      </span>
                    </div>
                    <h2 className="font-serif italic text-3xl text-vault-dark font-normal tracking-tight">
                      {inspectItem.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInspectItem(null)}
                    className="w-8 h-8 rounded-full border border-vault-dark/20 flex items-center justify-center hover:bg-vault-dark/10 transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4 text-vault-dark" />
                  </button>
                </div>

                {/* Inner Scroll Body */}
                <div className="flex-1 overflow-y-auto overscroll-contain py-3 space-y-4 pr-2">
                  <div className="flex items-center justify-between p-3.5 bg-vault-dark/5 rounded-2xl border border-vault-dark/15">
                    <div className="flex items-center gap-3">
                      <img
                        src={inspectItem.author.avatar}
                        alt={inspectItem.author.name}
                        className="w-10 h-10 rounded-full border border-vault-dark bg-vault-yellow/40 object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-sans text-sm font-bold text-vault-dark">
                            {inspectItem.author.name}
                          </span>
                          {inspectItem.author.isVerified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-vault-green fill-vault-dark stroke-vault-cream" />
                          )}
                        </div>
                        <span className="font-sans text-xs text-vault-dark/60">
                          {inspectItem.author.handle} • Published {inspectItem.publishedAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 font-sans text-xs font-semibold text-vault-dark/70">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-rose-500" /> {inspectItem.metrics.likes}
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-vault-dark/80 leading-relaxed">
                    {inspectItem.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-sans text-xs font-bold text-vault-dark/70">
                      <span>Prompt / Skill Rule Code</span>
                      {inspectItem.tool && (
                        <span className="bg-vault-yellow px-2 py-0.5 rounded border border-vault-dark font-mono text-[10px]">
                          Target: {inspectItem.tool}
                        </span>
                      )}
                    </div>
                    <div className="bg-vault-dark text-vault-cream rounded-2xl p-5 font-mono text-xs sm:text-sm border-2 border-vault-dark relative overflow-hidden">
                      <pre className="whitespace-pre-wrap break-words leading-relaxed font-mono max-h-64 overflow-y-auto pr-2">
                        {inspectItem.content}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="shrink-0 pt-3 border-t-2 border-vault-dark/15 flex items-center justify-between gap-2 bg-vault-cream">
                  <button
                    type="button"
                    onClick={(e) => handleToggleLike(e, inspectItem)}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 font-sans text-sm font-bold transition-all cursor-pointer ${likedIds.has(inspectItem.id)
                        ? 'bg-rose-100 text-rose-700 border-rose-400 shadow-2xs'
                        : 'bg-vault-cream text-vault-dark border-vault-dark hover:bg-vault-yellow'
                      }`}
                    title={likedIds.has(inspectItem.id) ? 'Unlike' : 'Like'}
                  >
                    <Heart
                      className={`w-4 h-4 ${likedIds.has(inspectItem.id) ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                    />
                    <span>{likedIds.has(inspectItem.id) ? 'Liked' : 'Like'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleCopyContent(e, inspectItem)}
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-vault-dark bg-vault-cream text-vault-dark hover:bg-vault-dark hover:text-vault-cream font-sans text-sm font-bold transition-colors cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleSaveToVault(e, inspectItem)}
                      className={`flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border-2 border-vault-dark font-sans text-sm font-bold transition-colors cursor-pointer ${isItemSavedInVault(inspectItem.title)
                          ? 'bg-vault-yellow text-vault-dark shadow-2xs'
                          : 'bg-vault-green text-vault-dark hover:bg-[#19b657]'
                        }`}
                    >
                      <Bookmark className="w-4 h-4" />
                      <span>
                        {isItemSavedInVault(inspectItem.title) ? 'Saved in Vault' : 'Clone to Vault'}
                      </span>
                    </button>

                    {inspectItem.type === 'skill' && (
                      <button
                        type="button"
                        onClick={(e) => handleDownloadSkill(e, inspectItem)}
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-vault-dark bg-vault-yellow text-vault-dark hover:bg-[#e7ee7b] font-sans text-sm font-bold transition-colors cursor-pointer"
                        title="Download .md file"
                      >
                        <Download className="w-4 h-4" />
                        <span>.md</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
