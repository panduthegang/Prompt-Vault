import React, { useState } from 'react';
import { Eye, EyeOff, Lock, RefreshCw } from 'lucide-react';

export interface SettingsSecuritySectionProps {
  isUpdating: boolean;
  onPasswordSubmit: (currentPass: string, newPass: string, confirmPass: string) => void;
}

export default function SettingsSecuritySection({
  isUpdating,
  onPasswordSubmit,
}: SettingsSecuritySectionProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPasswordSubmit(currentPassword, newPassword, confirmPassword);
  };

  return (
    <div className="w-full flex justify-center py-2 sm:py-4">
      <section className="bg-vault-cream border-2 border-vault-dark rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 md:p-8 space-y-6 shadow-xs w-full max-w-xl">
        <div className="border-b border-vault-dark/15 pb-4">
          <h2 className="font-serif text-2xl text-vault-dark font-normal">Reset Password</h2>
          <p className="font-sans text-xs sm:text-sm text-vault-dark/70">
            Enter your current password and choose a new password for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
                aria-label={showCurrentPass ? 'Hide current password' : 'Show current password'}
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
                aria-label={showNewPass ? 'Hide new password' : 'Show new password'}
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
                aria-label={showConfirmPass ? 'Hide confirm password' : 'Show confirm password'}
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
            disabled={isUpdating}
            className="px-6 py-2.5 bg-vault-dark text-vault-cream border-2 border-vault-dark rounded-full font-sans font-bold text-xs sm:text-sm hover:bg-vault-darker active:scale-95 transition-all shadow-xs cursor-pointer flex items-center gap-2"
          >
            {isUpdating ? (
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
  );
}
