// ==========================================
// TYPES & DATA DEFAULTS FOR SETTINGS
// ==========================================

export interface UserProfile {
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
}

export interface PresetAvatar {
  id: string;
  src: string;
  label: string;
}

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Harsh Rathod',
  username: 'harshrathod',
  email: 'harsh@vault.ai',
  bio: 'Principal AI Engineer & Prompt Architect building next-gen agent workflows.',
  avatar: '/avatars/avatar-1.svg',
};

export const PRESET_AVATARS: PresetAvatar[] = [
  { id: 'avatar-1', src: '/avatars/avatar-1.svg', label: 'Boy Developer (Cap & Headphones)' },
  { id: 'avatar-2', src: '/avatars/avatar-2.svg', label: 'Girl Designer (Glasses & Hoops)' },
  { id: 'avatar-3', src: '/avatars/avatar-3.svg', label: 'Boy Creator (Wavy Hair & Turtleneck)' },
  { id: 'avatar-4', src: '/avatars/avatar-4.svg', label: 'Girl Engineer (Cyber Headset & Bangs)' },
  { id: 'avatar-5', src: '/avatars/avatar-5.svg', label: 'Cyber Specialist (Matrix Shades & Beanie)' },
];
