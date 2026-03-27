# Security And RBAC Checklist

## 1) Authentication

- [ ] Tat ca route can bao ve su dung Bearer token
- [ ] Access token co thoi han ngan
- [ ] Refresh token luu va revoke khi logout
- [ ] Mat khau luu dang hash (bcrypt)

## 2) Authorization (RBAC)

- [ ] `admin` co toan quyen quan tri
- [ ] `staff` duoc xu ly don + kho + cap nhat sach co kiem soat
- [ ] `user` chi thao tac tai nguyen cua chinh minh
- [ ] Route admin (`/api/admin/*`) bat buoc `requireRole('admin','staff')`

## 3) Data protection

- [ ] Khong tra `password_hash` qua API
- [ ] Validate input voi schema (zod)
- [ ] Error message khong lo stack trace tren production
- [ ] CORS gioi han theo bien moi truong
- [ ] Helmet duoc bat

## 4) Business rule safety

- [ ] Khong dat hang vuot ton kho
- [ ] Khong cho stock am khi xuat kho
- [ ] Chi cho phep trang thai don hop le
- [ ] Ghi log giao dich kho va lich su don

## 5) Frontend guards

- [ ] `RequireAuth` chan route can dang nhap
- [ ] `RequireAdmin` chan route admin
- [ ] Xoa session/local token khi logout
- [ ] Xu ly token het han (chuyen ve login)
