import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Toast, { ToastContainer, ToastType } from '../components/ui/Toast';
import {
  UserProfile,
  PresetAvatar,
  DEFAULT_PROFILE,
} from '../components/Settings-Page/settingsData';
import SettingsHeader from '../components/Settings-Page/SettingsHeader';
import SettingsProfileSection from '../components/Settings-Page/SettingsProfileSection';
import SettingsSecuritySection from '../components/Settings-Page/SettingsSecuritySection';

// Re-export types for backward compatibility
export type { UserProfile, PresetAvatar };

interface ActiveToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

export default function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [activeToast, setActiveToast] = useState<ActiveToast | null>(null);

  // Profile State (initialized from localStorage or default)
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('prompt_vault_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        const avatar =
          parsed.avatar && !parsed.avatar.includes('unsplash')
            ? parsed.avatar
            : DEFAULT_PROFILE.avatar;
        return {
          name: parsed.name || DEFAULT_PROFILE.name,
          username: parsed.username || DEFAULT_PROFILE.username,
          email: parsed.email || DEFAULT_PROFILE.email,
          bio: parsed.bio || DEFAULT_PROFILE.bio,
          avatar: avatar,
        };
      }
      return DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Edit Mode State
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<UserProfile>(profile);

  // Password Updating State
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const showToast = (message: string, type: ToastType = 'success', title?: string) => {
    setActiveToast({
      id: Date.now().toString(),
      type,
      title,
      message,
    });
  };

  const handleStartEditing = () => {
    setEditForm(profile);
    setIsEditingProfile(true);
  };

  const handleCancelEditing = () => {
    setEditForm(profile);
    setIsEditingProfile(false);
    showToast('Profile edits were discarded', 'info', 'Cancelled');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.username.trim()) {
      showToast('Username cannot be empty', 'error', 'Validation Error');
      return;
    }
    if (!editForm.name.trim()) {
      showToast('Full name cannot be empty', 'error', 'Validation Error');
      return;
    }

    const updated = {
      ...editForm,
      username: editForm.username.toLowerCase().replace(/[^a-z0-9_]/g, ''),
    };

    setProfile(updated);
    try {
      localStorage.setItem('prompt_vault_user_profile', JSON.stringify(updated));
    } catch {}

    setIsEditingProfile(false);
    showToast('Your profile information has been saved successfully!', 'success', 'Profile Updated');
  };

  const handlePasswordSubmit = (currentPass: string, newPass: string, confirmPass: string) => {
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

    setIsUpdatingPassword(true);
    setTimeout(() => {
      setIsUpdatingPassword(false);
      showToast('Your master password has been changed securely!', 'success', 'Password Changed');
    }, 800);
  };

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
        activeTab="settings"
        onTabChange={(tab) => {
          if (tab === 'dashboard') {
            navigate('/dashboard');
          } else if (tab === 'vault' || tab === 'prompts') {
            navigate('/vault');
          } else {
            navigate('/dashboard');
          }
        }}
        promptCount={18}
        onOpenAddModal={() => navigate('/vault?add=true')}
      />

      {/* Main Settings Content */}
      <main className="flex-1 flex flex-col space-y-6 min-w-0 w-full pb-24 lg:pb-8">
        {/* Header & Section Tabs */}
        <SettingsHeader
          username={profile.username}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab 1: Profile View & Edit */}
        {activeTab === 'profile' && (
          <SettingsProfileSection
            profile={profile}
            isEditing={isEditingProfile}
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
            isUpdating={isUpdatingPassword}
            onPasswordSubmit={handlePasswordSubmit}
          />
        )}
      </main>
    </div>
  );
}
