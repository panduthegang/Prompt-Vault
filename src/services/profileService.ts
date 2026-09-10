// ============================================================
// PROFILE SERVICE
// All calls that write to the `profiles` table or Supabase Auth.
// No avatar uploads — avatars are fixed presets from public/avatars/.
// ============================================================

import { supabase } from '../lib/supabase';

// ─── updateProfile ────────────────────────────────────────────────────────────
// Writes a partial set of profile fields to the `profiles` row for the given
// user ID. Throws an Error (with Supabase's message) on any failure so callers
// can catch it and show an error toast.

type ProfileUpdates = Partial<{
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
}>;

export async function updateProfile(
  userId: string,
  updates: ProfileUpdates
): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }
}

// ─── updatePassword ───────────────────────────────────────────────────────────
// Re-authenticates the user with their current password first, then calls
// supabase.auth.updateUser({ password }) so the "Current Password" field in
// the UI is actually verified server-side, not just a cosmetic client check.
//
// Requires the caller to pass the user's email (available from AuthContext).

export async function updatePassword(
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  // Step 1: Re-authenticate to verify the current password is correct.
  const { error: reAuthError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });

  if (reAuthError) {
    // Surface a user-friendly message for the most common failure.
    throw new Error(
      reAuthError.message.toLowerCase().includes('invalid')
        ? 'Current password is incorrect. Please try again.'
        : reAuthError.message
    );
  }

  // Step 2: Update to the new password.
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    throw new Error(updateError.message);
  }
}
