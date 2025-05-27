export interface AuthUser {
  id_hash: string;
  username: string;
  role: string;
  isActive: boolean;
  iat: number;
  exp: number;
}
