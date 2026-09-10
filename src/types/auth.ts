export type Role = 'user' | 'admin';

export interface Profile {
  id: string;
  email: string;
  role: Role;
  display_name?: string | null;
  username?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  created_at: string;
}
