// ============================================================
// PRESET AVATARS — static reference data
// Avatars are fixed SVG files in public/avatars/; no uploads.
// ============================================================

export interface PresetAvatar {
  id: string;
  src: string;
  label: string;
}

export const PRESET_AVATARS: PresetAvatar[] = [
  { id: 'avatar-1', src: '/avatars/avatar-1.svg', label: 'Boy Developer (Cap & Headphones)' },
  { id: 'avatar-2', src: '/avatars/avatar-2.svg', label: 'Girl Designer (Glasses & Hoops)' },
  { id: 'avatar-3', src: '/avatars/avatar-3.svg', label: 'Boy Creator (Wavy Hair & Turtleneck)' },
  { id: 'avatar-4', src: '/avatars/avatar-4.svg', label: 'Girl Engineer (Cyber Headset & Bangs)' },
  { id: 'avatar-5', src: '/avatars/avatar-5.svg', label: 'Cyber Specialist (Matrix Shades & Beanie)' },
];

/** Fallback avatar src used when profile.avatar_url is null/empty. */
export const DEFAULT_AVATAR_SRC = '/avatars/avatar-1.svg';
