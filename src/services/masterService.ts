// ============================================================
// MASTER CATEGORIES SERVICE
// All Supabase database operations for the `master_categories` table.
// Provides real database persistence, soft deletion (active = 0),
// and audit tracking (created_by, updated_by).
// ============================================================

import { supabase } from '../lib/supabase';
import {
  MasterCategory,
  MasterCategoryRow,
  MasterItemType,
} from '../types/master';

/**
 * Format timestamp into a human-readable date string (e.g. "Mar 14, 2026").
 */
function formatCreatedAt(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Fetch all active master categories (is_active = true) ordered by creation date descending.
 */
export async function getMasterCategories(): Promise<MasterCategory[]> {
  const { data, error } = await supabase
    .from('master_categories')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as MasterCategoryRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    itemType: row.category_type,
    description: row.description || '',
    itemCount: 0,
    createdAt: formatCreatedAt(row.created_at),
    updatedAt: row.updated_at ? formatCreatedAt(row.updated_at) : null,
    isActive: row.is_active,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
  }));
}

/**
 * Create a new master category record in the database.
 */
export async function createMasterCategory(payload: {
  name: string;
  itemType: MasterItemType;
  description: string;
  userId?: string;
}): Promise<MasterCategory> {
  const { data, error } = await supabase
    .from('master_categories')
    .insert({
      name: payload.name.trim(),
      category_type: payload.itemType,
      description: payload.description.trim() || null,
      is_active: true,
      created_by: payload.userId || null,
      // Note: updated_at and updated_by remain null on creation; only populated when edited
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const row = data as MasterCategoryRow;
  return {
    id: row.id,
    name: row.name,
    itemType: row.category_type,
    description: row.description || '',
    itemCount: 0,
    createdAt: formatCreatedAt(row.created_at),
    updatedAt: row.updated_at ? formatCreatedAt(row.updated_at) : null,
    isActive: row.is_active,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
  };
}

/**
 * Update an existing master category's name, type, and description.
 * Records updated_at and updated_by.
 */
export async function updateMasterCategory(
  id: string,
  payload: {
    name: string;
    itemType: MasterItemType;
    description: string;
    userId?: string;
  }
): Promise<void> {
  const { error } = await supabase
    .from('master_categories')
    .update({
      name: payload.name.trim(),
      category_type: payload.itemType,
      description: payload.description.trim() || null,
      updated_at: new Date().toISOString(),
      updated_by: payload.userId || null,
    })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Soft delete a master category by setting is_active = false and recording updated_by.
 * Data remains safely preserved in PostgreSQL for auditing.
 */
export async function deleteMasterCategory(
  id: string,
  userId?: string
): Promise<void> {
  const { error } = await supabase
    .from('master_categories')
    .update({
      is_active: false,
      updated_at: new Date().toISOString(),
      updated_by: userId || null,
    })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}
