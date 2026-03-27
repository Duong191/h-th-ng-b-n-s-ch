export type AuthUser = {
  id: number;
  email: string;
  roles: string[];
  permissions: string[];
};

export type TokenPayload = {
  sub: number;
  email: string;
};
