import React from 'react';
import { Pencil, Check, X, RefreshCw } from 'lucide-react';
import type { Profile } from '../../types/auth';
import { PRESET_AVATARS, DEFAULT_AVATAR_SRC } from '../../lib/avatars';
import type { EditProfileForm } from '../../pages/Settings';

export interface SettingsProfileSectionProps {
  profile: Profile | null;
  isEditing: boolean;
  isSaving: boolean;
  editForm: EditProfileForm;
  onStartEditing: () => void;
  onCancelEditing: () => void;
  onFormChange: (updated: EditProfileForm) => void;
  onSaveProfile: (e: React.FormEvent) => void;
}

export default function SettingsProfileSection({
  profile,
  isEditing,
  isSaving,
  editForm,
  onStartEditing,
  onCancelEditing,
  onFormChange,
  onSaveProfile,
}: SettingsProfileSectionProps) {
  // Safe resolved values for display — DB fields are nullable
  const avatarSrc = profile?.avatar_url || DEFAULT_AVATAR_SRC;
  const displayName = profile?.display_name || 'Unnamed User';
  const username = profile?.username || '—';
  const email = profile?.email || '—';
  const bio = profile?.bio || null;

  return (
    <section className="bg-vault-cream border-2 border-vault-dark rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 md:p-8 space-y-6 shadow-xs">
      {/* Header with Title & Edit Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-vault-dark/15 pb-4">
        <div>
          <h2 className="font-serif text-2xl text-vault-dark font-normal">
            {isEditing ? 'Edit Profile' : 'User Information'}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-vault-dark/70">
            {isEditing
              ? 'Update your personal details, handle, and avatar photo below.'
              : 'Your public identity and contact information in Prompt Vault.'}
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={onStartEditing}
            className="self-start sm:self-auto px-5 py-2 bg-vault-yellow text-vault-dark border-2 border-vault-dark rounded-full font-sans font-bold text-xs sm:text-sm hover:bg-vault-yellow/80 active:scale-95 transition-all shadow-xs cursor-pointer flex items-center gap-2"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* 1. NORMAL VIEW STATE (Default) */}
      {!isEditing ? (
        <div className="space-y-6">
          {/* Hero User Banner Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-vault-yellow/20 border-2 border-vault-dark/20">
            <img
              src={avatarSrc}
              alt={displayName}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-vault-dark object-cover shadow-sm ring-2 ring-vault-green/40 bg-vault-cream"
            />
            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-vault-dark font-normal">{displayName}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-vault-dark bg-vault-yellow border border-vault-dark/40 px-2.5 py-0.5 rounded-full">
                  @{username}
                </span>
                <span className="font-sans text-xs text-vault-dark/70 font-semibold">{email}</span>
              </div>
            </div>
          </div>

          {/* Information Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/70 border-2 border-vault-dark/15 space-y-1">
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-vault-dark/60 block">
                Full Name
              </span>
              <span className="font-sans text-sm font-bold text-vault-dark block">{displayName}</span>
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
              <span className="font-mono text-sm font-bold text-vault-dark block">@{username}</span>
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
              <span className="font-sans text-sm font-bold text-vault-dark block">{email}</span>
            </div>

            <div className="sm:col-span-3 p-4 rounded-2xl bg-white/70 border-2 border-vault-dark/15 space-y-1">
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-vault-dark/60 block">
                Bio
              </span>
              <p className="font-sans text-sm text-vault-dark/80 font-medium leading-relaxed">
                {bio || 'No bio provided.'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* 2. EDIT PROFILE FORM */
        <form onSubmit={onSaveProfile} className="space-y-6">
          {/* Avatar Chooser */}
          <div className="space-y-3">
            <label className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
              Change Avatar
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <img
                src={editForm.avatar_url}
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
                      onClick={() => onFormChange({ ...editForm, avatar_url: preset.src })}
                      className={`rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                        editForm.avatar_url === preset.src
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
                value={editForm.display_name}
                onChange={(e) => onFormChange({ ...editForm, display_name: e.target.value })}
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
                    onFormChange({
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
                onChange={(e) => onFormChange({ ...editForm, bio: e.target.value })}
                className="w-full bg-vault-cream text-vault-dark border-2 border-vault-dark rounded-xl p-4 font-sans text-sm font-medium focus:outline-none focus:ring-2 focus:ring-vault-green leading-relaxed"
              />
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-vault-green text-vault-dark border-2 border-vault-dark rounded-full font-sans font-bold text-xs sm:text-sm hover:brightness-105 active:scale-95 transition-all shadow-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Save Changes</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onCancelEditing}
              disabled={isSaving}
              className="px-5 py-2.5 bg-vault-cream text-vault-dark border-2 border-vault-dark/30 hover:border-vault-dark rounded-full font-sans font-bold text-xs sm:text-sm active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
