import React, { useState } from 'react';
import Toast, { ToastContainer, ToastType } from '../components/ui/Toast';
import { useAuth } from '../context/AuthContext';
import { updateProfile, updatePassword } from '../services/profileService';
import { DEFAULT_AVATAR_SRC } from '../lib/avatars';
import SettingsHeader from '../components/Settings-Page/SettingsHeader';
import SettingsProfileSection from '../components/Settings-Page/SettingsProfileSection';
import SettingsSecuritySection from '../components/Settings-Page/SettingsSecuritySection';

// ─── Local edit-form shape (in-progress draft before saving) ─────────────────
// Fields match the DB column names exactly — no translation layer needed.
export interface EditProfileForm {
  display_name: string;
  username: string;
  bio: string;
  avatar_url: string;
}

interface ActiveToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

export default function Settings() {
  const { profile, refreshProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [activeToast, setActiveToast] = useState<ActiveToast | null>(null);

  // ─── Tab switching — always exits edit mode ───────────────────────────────────
  const handleTabChange = (tab: 'profile' | 'security') => {
    setActiveTab(tab);
    setIsEditingProfile(false); // discard any in-progress edit draft on tab switch
  };

  // Edit mode —  draft state, initialized from profile when entering edit mode
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState<EditProfileForm>({
    display_name: '',
    username: '',
    bio: '',
    avatar_url: DEFAULT_AVATAR_SRC,
  });

  // Loading states
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  // Incrementing this key remounts <SettingsSecuritySection>, resetting all its
  // local form fields (currentPassword, newPassword, confirmPassword) to ''.
  const [securityFormKey, setSecurityFormKey] = useState(0);

  // ─── Toast helper ────────────────────────────────────────────────────────────
  const showToast = (message: string, type: ToastType = 'success', title?: string) => {
    setActiveToast({ id: Date.now().toString(), type, title, message });
  };

  // ─── Profile edit handlers ───────────────────────────────────────────────────
  const handleStartEditing = () => {
    // Seed the draft form from live profile data
    setEditForm({
      display_name: profile?.display_name ?? '',
      username: profile?.username ?? '',
      bio: profile?.bio ?? '',
      avatar_url: profile?.avatar_url ?? DEFAULT_AVATAR_SRC,
    });
    setIsEditingProfile(true);
  };

  const handleCancelEditing = () => {
    setIsEditingProfile(false);
    showToast('Profile edits were discarded', 'info', 'Cancelled');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editForm.display_name.trim()) {
      showToast('Full name cannot be empty', 'error', 'Validation Error');
      return;
    }
    if (!editForm.username.trim()) {
      showToast('Username cannot be empty', 'error', 'Validation Error');
      return;
    }
    if (!profile?.id) {
      showToast('Session expired — please sign in again', 'error', 'Auth Error');
      return;
    }

    const sanitizedUsername = editForm.username.toLowerCase().replace(/[^a-z0-9_]/g, '');

    setIsSavingProfile(true);
    try {
      await updateProfile(profile.id, {
        display_name: editForm.display_name.trim(),
        username: sanitizedUsername,
        bio: editForm.bio.trim(),
        avatar_url: editForm.avatar_url,
      });
      await refreshProfile();
      setIsEditingProfile(false);
      showToast('Your profile information has been saved successfully!', 'success', 'Profile Updated');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save profile';
      showToast(msg, 'error', 'Save Failed');
    } finally {
      setIsSavingProfile(false);
    }
  };

  // ─── Password handler ────────────────────────────────────────────────────────
  const handlePasswordSubmit = async (
    currentPass: string,
    newPass: string,
    confirmPass: string
  ) => {
    if (!currentPass) {
      showToast('Please enter your current password to continue', 'error', 'Authentication Required');
      return;
    }
    if (newPass.length < 8) {
      showToast('New password must contain at least 8 characters', 'warning', 'Password Too Short');
      return;
    }
    if (newPass !== confirmPass) {
      showToast('New passwords do not match. Please verify and retype.', 'error', 'Mismatch');
      return;
    }
    if (!profile?.email) {
      showToast('Session expired — please sign in again', 'error', 'Auth Error');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await updatePassword(profile.email, currentPass, newPass);
      setSecurityFormKey((k) => k + 1); // remounts the form → clears all password inputs
      showToast('Your master password has been changed securely!', 'success', 'Password Changed');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update password';
      showToast(msg, 'error', 'Update Failed');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // ─── Derived display values (safe fallbacks for nullable DB fields) ───────────
  const displayUsername = profile?.username ?? profile?.display_name ?? 'user';

  return (
    <>
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

      {/* Main Settings Content */}
      <main className="flex-1 flex flex-col space-y-6 min-w-0 w-full pb-24 lg:pb-8">
        {/* Header & Section Tabs */}
        <SettingsHeader
          username={displayUsername}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Tab 1: Profile View & Edit */}
        {activeTab === 'profile' && (
          <SettingsProfileSection
            profile={profile}
            isEditing={isEditingProfile}
            isSaving={isSavingProfile}
            editForm={editForm}
            onStartEditing={handleStartEditing}
            onCancelEditing={handleCancelEditing}
            onFormChange={setEditForm}
            onSaveProfile={handleSaveProfile}
          />
        )}

        {/* Tab 2: Security & Password Reset */}
        {activeTab === 'security' && (
          <SettingsSecuritySection
            key={securityFormKey}
            isUpdating={isUpdatingPassword}
            onPasswordSubmit={handlePasswordSubmit}
          />
        )}
      </main>
    </>
  );
}
