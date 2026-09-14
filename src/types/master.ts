import React from 'react';
import { Bookmark, FileCode, Globe } from 'lucide-react';

// ============================================================================
// MASTER CATEGORIES — TYPES & CONFIGURATION
// ============================================================================

export type MasterItemType = 'prompt' | 'skill' | 'website';

/**
 * Raw row shape from the Supabase `public.master_categories` table.
 */
export interface MasterCategoryRow {
  id: string;
  name: string;
  description: string | null;
  category_type: MasterItemType;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}

/**
 * Clean frontend domain model used by UI components.
 */
export interface MasterCategory {
  id: string;
  name: string;
  itemType: MasterItemType;
  description: string;
  itemCount: number;
  createdAt: string;
  updatedAt?: string | null;
  isActive: boolean;
  createdBy?: string | null;
  updatedBy?: string | null;
}

export const TYPE_CONFIG: Record<
  MasterItemType,
  { label: string; singular: string; icon: React.ComponentType<{ className?: string }> }
> = {
  prompt: { label: 'Prompts', singular: 'Prompt', icon: Bookmark },
  skill: { label: 'Skill Rules', singular: 'Skill Rule', icon: FileCode },
  website: { label: 'Websites', singular: 'Website Bookmark', icon: Globe },
};
