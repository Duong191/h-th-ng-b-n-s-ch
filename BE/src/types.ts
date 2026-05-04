/** File này khai báo các kiểu dùng chung cho xác thực/token. */
export type AuthUser = {
  id: number;
  email: string;
  roles: string[];
  permissions: string[];
};

/** JWT access + refresh; roles/permissions bắt buộc khi phát hành mới; optional khi decode token cũ. */
export type TokenPayload = {
  sub: number;
  email: string;
  roles?: string[];
  permissions?: string[];
};
