export type Role = 'user' | 'admin';

export interface Profile {
  id: string;
  email: string;
  role: Role;
  display_name?: string;
  created_at: string;
}
