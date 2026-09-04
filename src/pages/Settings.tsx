import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Toast, { ToastContainer, ToastType } from '../components/ui/Toast';
import {
  User,
  Shield,
  Pencil,
  Check,
  X,
  Eye,
  EyeOff,
  Lock,
  RefreshCw,
} from 'lucide-react';

interface UserProfile {
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
}

interface ActiveToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Harsh Rathod',
  username: 'harshrathod',
  email: 'harsh@vault.ai',
  bio: 'Principal AI Engineer & Prompt Architect building next-gen agent workflows.',
  avatar: '/avatars/avatar-1.svg',
};

const PRESET_AVATARS = [
  { id: 'avatar-1', src: '/avatars/avatar-1.svg', label: 'Boy Developer (Cap & Headphones)' },
  { id: 'avatar-2', src: '/avatars/avatar-2.svg', label: 'Girl Designer (Glasses & Hoops)' },
  { id: 'avatar-3', src: '/avatars/avatar-3.svg', label: 'Boy Creator (Wavy Hair & Turtleneck)' },
  { id: 'avatar-4', src: '/avatars/avatar-4.svg', label: 'Girl Engineer (Cyber Headset & Bangs)' },
  { id: 'avatar-5', src: '/avatars/avatar-5.svg', label: 'Cyber Specialist (Matrix Shades & Beanie)' },
];

export default function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [activeToast, setActiveToast] = useState<ActiveToast | null>(null);

  // Profile State
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

  // Edit Mode Flag: starts in NORMAL VIEW mode
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<UserProfile>(profile);

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
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

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      showToast('Please enter your current password to continue', 'error', 'Authentication Required');
      return;
    }
    if (newPassword.length < 8) {
      showToast('New password must contain at least 8 characters', 'warning', 'Password Too Short');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match. Please verify and retype.', 'error', 'Mismatch');
      return;
    }

    setIsUpdatingPassword(true);
    setTimeout(() => {
      setIsUpdatingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Your master password has been changed securely!', 'success', 'Password Changed');
    }, 800);
  };

  return (
    <div className="w-full min-h-screen bg-vault-cream text-vault-dark flex flex-col lg:flex-row p-3 sm:p-4 md:p-6 gap-4 sm:gap-6 selection:bg-vault-green selection:text-vault-dark relative items-start">
      {/* Dynamic Toast Notifications (Supports Success, Error, Warning, Info) */}
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
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-vault-dark/15">
            <div className="space-y-1">
              <h1 className="font-serif italic text-3xl sm:text-4xl text-vault-dark font-normal tracking-tight">
                Settings
              </h1>
              <p className="font-sans text-xs sm:text-sm text-vault-dark/70 font-medium">
                Manage your personal user account and security credentials.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-vault-yellow border-2 border-vault-dark px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-vault-green animate-pulse" />
                <span className="font-mono text-xs font-bold text-vault-dark">@{profile.username}</span>
              </div>
            </div>
          </header>

        {/* 2 Clean Tabs: Profile and Security */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 ${
              activeTab === 'profile'
                ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                : 'bg-vault-cream text-vault-dark border-vault-dark/30 hover:border-vault-dark hover:bg-vault-yellow/40'
            }`}
          >
            <User className={`w-4 h-4 ${activeTab === 'profile' ? 'text-vault-green' : 'text-vault-dark/70'}`} />
            <span>Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 ${
              activeTab === 'security'
                ? 'bg-vault-dark text-vault-cream border-vault-dark shadow-xs'
                : 'bg-vault-cream text-vault-dark border-vault-dark/30 hover:border-vault-dark hover:bg-vault-yellow/40'
            }`}
          >
            <Shield className={`w-4 h-4 ${activeTab === 'security' ? 'text-vault-green' : 'text-vault-dark/70'}`} />
            <span>Security &amp; Password</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: PROFILE (View Mode & Edit Mode)                  */}
        {/* ======================================================== */}
        {activeTab === 'profile' && (
          <section className="bg-vault-cream border-2 border-vault-dark rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 md:p-8 space-y-6 shadow-xs">
            {/* Header with Title & Edit Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-vault-dark/15 pb-4">
              <div>
                <h2 className="font-serif text-2xl text-vault-dark font-normal">
                  {isEditingProfile ? 'Edit Profile' : 'User Information'}
                </h2>
                <p className="font-sans text-xs sm:text-sm text-vault-dark/70">
                  {isEditingProfile
                    ? 'Update your personal details, handle, and avatar photo below.'
                    : 'Your public identity and contact information in Prompt Vault.'}
                </p>
              </div>

              {!isEditingProfile && (
                <button
                  type="button"
                  onClick={handleStartEditing}
                  className="self-start sm:self-auto px-5 py-2 bg-vault-yellow text-vault-dark border-2 border-vault-dark rounded-full font-sans font-bold text-xs sm:text-sm hover:bg-vault-yellow/80 active:scale-95 transition-all shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {/* 1. NORMAL VIEW STATE (Default) */}
            {!isEditingProfile ? (
              <div className="space-y-6">
                {/* Hero User Banner Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-vault-yellow/20 border-2 border-vault-dark/20">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-vault-dark object-cover shadow-sm ring-2 ring-vault-green/40 bg-vault-cream"
                  />
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl text-vault-dark font-normal">{profile.name}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-vault-dark bg-vault-yellow border border-vault-dark/40 px-2.5 py-0.5 rounded-full">
                        @{profile.username}
                      </span>
                      <span className="font-sans text-xs text-vault-dark/70 font-semibold">{profile.email}</span>
                    </div>
                  </div>
                </div>

                {/* Information Details List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white/70 border-2 border-vault-dark/15 space-y-1">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-vault-dark/60 block">
                      Full Name
                    </span>
                    <span className="font-sans text-sm font-bold text-vault-dark block">{profile.name}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border-2 border-vault-dark/15 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-vault-dark/60 block">
                        Username Handle
                      </span>
                      <span className="text-[10px] font-sans font-bold bg-vault-dark text-vault-green px-2 py-0.2 rounded-full">
                        Public
                      </span>
                    </div>
                    <span className="font-mono text-sm font-bold text-vault-dark block">@{profile.username}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border-2 border-vault-dark/15 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-vault-dark/60 block">
                        Email Address
                      </span>
                      <span className="text-[10px] font-sans font-bold bg-vault-green text-vault-dark px-2 py-0.2 rounded-full border border-vault-dark">
                        Verified
                      </span>
                    </div>
                    <span className="font-sans text-sm font-bold text-vault-dark block">{profile.email}</span>
                  </div>

                  <div className="sm:col-span-3 p-4 rounded-2xl bg-white/70 border-2 border-vault-dark/15 space-y-1">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-vault-dark/60 block">
                      Bio
                    </span>
                    <p className="font-sans text-sm text-vault-dark/80 font-medium leading-relaxed">
                      {profile.bio || 'No bio provided.'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* 2. EDIT PROFILE FORM (Only visible when user clicks "Edit Profile") */
              <form onSubmit={handleSaveProfile} className="space-y-6">
                {/* Avatar Chooser */}
                <div className="space-y-3">
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                    Change Avatar
                  </label>
                  <div className="flex flex-wrap items-center gap-4">
                    <img
                      src={editForm.avatar}
                      alt="Selected Avatar"
                      className="w-18 h-18 rounded-full border-2 border-vault-dark object-cover shadow-xs ring-4 ring-vault-yellow bg-vault-cream"
                    />

                    <div className="space-y-1.5">
                      <span className="text-xs font-sans font-semibold text-vault-dark/70 block">
                        Pick a preset avatar:
                      </span>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {PRESET_AVATARS.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => setEditForm({ ...editForm, avatar: preset.src })}
                            className={`rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                              editForm.avatar === preset.src
                                ? 'border-vault-dark ring-2 ring-vault-green scale-110 shadow-xs'
                                : 'border-vault-dark/30 hover:border-vault-dark opacity-80 hover:opacity-100 hover:scale-105'
                            }`}
                            title={preset.label}
                          >
                            <img src={preset.src} alt={preset.label} className="w-11 h-11 rounded-full object-cover bg-vault-cream" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full bg-vault-cream text-vault-dark border-2 border-vault-dark rounded-xl px-4 py-3 font-sans text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-vault-green"
                    />
                  </div>

                  {/* Username */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                      Username Handle
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm font-bold text-vault-dark/50">
                        @
                      </span>
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''),
                          })
                        }
                        className="w-full bg-vault-cream text-vault-dark border-2 border-vault-dark rounded-xl pl-8 pr-4 py-3 font-mono text-sm font-bold focus:outline-none focus:ring-2 focus:ring-vault-green"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                      Bio
                    </label>
                    <textarea
                      rows={3}
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      className="w-full bg-vault-cream text-vault-dark border-2 border-vault-dark rounded-xl p-4 font-sans text-sm font-medium focus:outline-none focus:ring-2 focus:ring-vault-green leading-relaxed"
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-vault-green text-vault-dark border-2 border-vault-dark rounded-full font-sans font-bold text-xs sm:text-sm hover:brightness-105 active:scale-95 transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Save Changes</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCancelEditing}
                    className="px-5 py-2.5 bg-vault-cream text-vault-dark border-2 border-vault-dark/30 hover:border-vault-dark rounded-full font-sans font-bold text-xs sm:text-sm active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            )}
          </section>
        )}

        {/* ======================================================== */}
        {/* TAB 2: SECURITY & PASSWORD RESET ONLY                    */}
        {/* ======================================================== */}
        {activeTab === 'security' && (
          <div className="w-full flex justify-center py-2 sm:py-4">
            <section className="bg-vault-cream border-2 border-vault-dark rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 md:p-8 space-y-6 shadow-xs w-full max-w-xl">
            <div className="border-b border-vault-dark/15 pb-4">
              <h2 className="font-serif text-2xl text-vault-dark font-normal">Reset Password</h2>
              <p className="font-sans text-xs sm:text-sm text-vault-dark/70">
                Enter your current password and choose a new password for your account.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              {/* Current Password */}
              <div className="space-y-1.5">
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-vault-cream text-vault-dark border-2 border-vault-dark rounded-xl px-4 pr-11 py-3 font-sans text-sm font-medium focus:outline-none focus:ring-2 focus:ring-vault-green"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-vault-dark/60 hover:text-vault-dark cursor-pointer p-1"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full bg-vault-cream text-vault-dark border-2 border-vault-dark rounded-xl px-4 pr-11 py-3 font-sans text-sm font-medium focus:outline-none focus:ring-2 focus:ring-vault-green"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-vault-dark/60 hover:text-vault-dark cursor-pointer p-1"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1.5">
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full bg-vault-cream text-vault-dark border-2 border-vault-dark rounded-xl px-4 pr-11 py-3 font-sans text-sm font-medium focus:outline-none focus:ring-2 focus:ring-vault-green"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-vault-dark/60 hover:text-vault-dark cursor-pointer p-1"
                  >
                    {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-[11px] font-sans font-bold text-red-600">Passwords do not match</p>
                )}
                {confirmPassword && newPassword === confirmPassword && (
                  <p className="text-[11px] font-sans font-bold text-vault-green">Passwords match ✓</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="px-6 py-2.5 bg-vault-dark text-vault-cream border-2 border-vault-dark rounded-full font-sans font-bold text-xs sm:text-sm hover:bg-vault-darker active:scale-95 transition-all shadow-xs cursor-pointer flex items-center gap-2"
              >
                {isUpdatingPassword ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-vault-green" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-vault-green" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  </div>
);
}
