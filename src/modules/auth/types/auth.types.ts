export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  role: "user" | "admin";
  provider: "credentials" | "google" | "github";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
