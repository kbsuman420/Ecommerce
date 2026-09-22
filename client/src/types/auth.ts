export type UserRole = 'CUSTOMER' | 'SELLER' | 'ADMIN';

export interface User {
  id: number;
  fname: string;
  lname?: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  phoneNo?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fname: string;
  lname?: string;
  email: string;
  password: string;
  phoneNo?: string;
  role: UserRole;
}
