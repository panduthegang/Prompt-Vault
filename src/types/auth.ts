export type Role = 'user' | 'admin';

export interface Profile {
  id: string;
  email: string;
  role: Role;
  created_at: string;
}
