export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  role: string;
  provider: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}