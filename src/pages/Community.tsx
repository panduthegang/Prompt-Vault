import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDragControls } from 'framer-motion';

import Toast, { ToastContainer, ToastType } from '../components/ui/Toast';
import { copyToClipboard } from '../utils/clipboard';
import {
  VaultItem,
  getStoredVaultItems,
  saveStoredVaultItems,
} from '../components/Vault-Page/vaultData';

// Modular Community Components & Data
import {
  CommunityItem,
  CommunityTab,
  MASTER_COMMUNITY_ITEMS,
  BATCH_SIZE,
} from '../components/Community-Page/communityData';
import CommunityHeader from '../components/Community-Page/CommunityHeader';
import CommunityFilters from '../components/Community-Page/CommunityFilters';
import CommunityCard from '../components/Community-Page/CommunityCard';
import CommunitySkeletonCard from '../components/Community-Page/CommunitySkeletonCard';
import CommunityModalSheet from '../components/Community-Page/CommunityModalSheet';
import {
  CommunityErrorState,
  CommunityEmptyState,
  CommunityEndOfVault,
} from '../components/Community-Page/CommunityStates';

export type { CommunityItem, CommunityTab };

interface ActiveToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

export default function Community() {
  const navigate = useNavigate();

  // Liked items tracking
  const [likedIds, setLikedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('prompt_vault_liked_community_items');
      if (saved) return new Set(JSON.parse(saved));
    } catch {}
    return new Set(['comm-1', 'comm-2']);
  });

  // User's own saved items in local Vault
  const [vaultItems, setVaultItems] = useState<VaultItem[]>(getStoredVaultItems);

  // Filter & Search State
  const [activeTab, setActiveTab] = useState<CommunityTab>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Pagination, Async Batching & Skeleton Loading State
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

  // Simulated / API Batch Fetch Handler
  const fetchBatch = useCallback(
    async (targetPage: number, isInitial: boolean) => {
      if (isInitial) {
        setIsLoadingInitial(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, isInitial ? 400 : 650));

        const startIndex = 0;
        const endIndex = targetPage * BATCH_SIZE;
        const sliced = filteredDataset.slice(startIndex, endIndex);

        setItems(sliced);
        setHasMore(endIndex < filteredDataset.length);
        setPage(targetPage);
      } catch {
        setError('Network communication failed while fetching prompt registry. Please try again.');
      } finally {
        setIsLoadingInitial(false);
        setIsLoadingMore(false);
      }
    },
    [filteredDataset]
  );

  // Re-fetch initial batch whenever filters or search query changes
  useEffect(() => {
    setPage(1);
    fetchBatch(1, true);
  }, [activeTab, searchQuery, fullDataset.length]);

  // Infinite scroll observer setup
  useEffect(() => {
    if (isLoadingInitial || isLoadingMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isLoadingInitial) {
          fetchBatch(page + 1, false);
        }
      },
      { rootMargin: '200px' }
    );

    const target = sentinelRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, isLoadingInitial, isLoadingMore, page, fetchBatch]);

  // Like Toggle Handler
  const handleToggleLike = (e: React.MouseEvent, item: CommunityItem) => {
    e.stopPropagation();
    setLikedIds((prev) => {
      const next = new Set(prev);
      const isNowLiked = !next.has(item.id);
      if (isNowLiked) {
        next.add(item.id);
        item.metrics.likes += 1;
        showToast('Liked prompt! Added to your community favorites.', 'success', 'Liked');
      } else {
        next.delete(item.id);
        item.metrics.likes = Math.max(0, item.metrics.likes - 1);
      }
      try {
        localStorage.setItem('prompt_vault_liked_community_items', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  // Fast Toast Copy Handler
  const handleCopyContent = async (e: React.MouseEvent, item: CommunityItem) => {
    e.stopPropagation();
    const success = await copyToClipboard(item.content);
    if (success) {
      setCopiedId(item.id);
      showToast(`"${item.title}" copied to clipboard!`, 'success', 'Copied');
      setTimeout(() => setCopiedId(null), 1500);
    } else {
      showToast('Failed to copy to clipboard', 'error', 'Copy Failed');
    }
  };

  // Clone item to Personal Vault
  const handleSaveToVault = (e: React.MouseEvent, item: CommunityItem) => {
    e.stopPropagation();
    const currentVault = getStoredVaultItems();
    const exists = currentVault.some(
      (v) => v.title.toLowerCase().trim() === item.title.toLowerCase().trim()
    );

    if (exists) {
      showToast(`"${item.title}" is already stored in your Vault.`, 'info', 'Already Saved');
      return;
    }

    const newVaultItem: VaultItem = {
      id: Date.now().toString(),
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
    <>
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

      {/* Main Community Workspace Area */}
      <main className="flex-1 flex flex-col space-y-6 min-w-0 w-full pb-28 lg:pb-8">
        {/* 1. Top Header */}
        <CommunityHeader totalTemplates={fullDataset.length} />

        {/* 2. Filter Tabs & Search Bar */}
        <CommunityFilters
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabCounts={tabCounts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 3. Cards Grid / Skeleton Loaders / Error / Blank States */}
        {error ? (
          <CommunityErrorState error={error} onRetry={() => fetchBatch(1, true)} />
        ) : isLoadingInitial ? (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <CommunitySkeletonCard key={`skel-init-${idx}`} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <CommunityEmptyState
            onReset={() => {
              setSearchQuery('');
              setActiveTab('all');
            }}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-5">
              {items.map((item) => (
                <CommunityCard
                  key={item.id}
                  item={item}
                  isLiked={likedIds.has(item.id)}
                  isSavedInVault={isItemSavedInVault(item.title)}
                  isCopied={copiedId === item.id}
                  onInspect={setInspectItem}
                  onToggleLike={handleToggleLike}
                  onCopyContent={handleCopyContent}
                  onSaveToVault={handleSaveToVault}
                  onDownloadSkill={handleDownloadSkill}
                />
              ))}

              {/* Scroll Fetching Skeletons */}
              {isLoadingMore &&
                Array.from({ length: 3 }).map((_, idx) => (
                  <CommunitySkeletonCard key={`skel-more-${idx}`} />
                ))}
            </div>

            {/* Infinite Scroll Intersection Sentinel & End of Vault Milestone */}
            <div ref={sentinelRef} className="w-full flex items-center justify-center py-6 sm:py-8">
              {!hasMore && items.length > 0 && (
                <CommunityEndOfVault totalCount={items.length} />
              )}
            </div>
          </>
        )}
      </main>

      {/* 4. Detail / Inspection Modal & Mobile Bottom Sheet */}
      <CommunityModalSheet
        inspectItem={inspectItem}
        isMobile={isMobile}
        dragControls={inspectDragControls}
        onClose={() => setInspectItem(null)}
        isLiked={inspectItem ? likedIds.has(inspectItem.id) : false}
        onToggleLike={handleToggleLike}
        onCopyContent={handleCopyContent}
        onSaveToVault={handleSaveToVault}
        isSavedInVault={inspectItem ? isItemSavedInVault(inspectItem.title) : false}
        onDownloadSkill={handleDownloadSkill}
      />
    </>
  );
}
