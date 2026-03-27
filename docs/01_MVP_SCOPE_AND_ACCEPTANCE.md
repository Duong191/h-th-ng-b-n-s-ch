# MVP Scope And Acceptance

## 1) Muc tieu MVP

MVP tap trung vao flow mua hang day du tu frontend den backend:

1. Dang ky/Dang nhap
2. Xem danh sach sach + tim kiem/loc
3. Xem chi tiet sach
4. Gio hang
5. Dat hang
6. Theo doi don hang
7. Admin quan ly sach, don, ton kho

## 2) Module MVP bat buoc

- Auth (`/api/auth`)
- Books (`/api/books`)
- Categories (`/api/categories`)
- Cart (`/api/cart`)
- Orders (`/api/orders`)
- User profile (`/api/users/me`)
- Admin books (`/api/admin/books`)
- Admin inventory (`/api/admin/inventory`)

## 3) Module de sau (Nice-to-have)

- Supplier management
- Employee management day du
- Report dashboard nang cao
- Payment gateway that

## 4) Dieu kien nghiem thu chuc nang

- Customer dang ky, dang nhap va dang xuat thanh cong
- Customer xem sach, loc sach, vao chi tiet sach
- Customer them/cap nhat/xoa gio hang
- Customer dat don thanh cong, thay lich su don cua minh
- Admin/Staff cap nhat trang thai don thanh cong
- Admin/Staff them/sua/xoa sach
- Admin/Staff tao giao dich nhap/xuat kho
- Khong cho user thuong truy cap route admin

## 5) Dieu kien nghiem thu ky thuat

- `npm run test:db` trong [BE/package.json](../BE/package.json) chay thanh cong
- `npm run dev` trong [BE/package.json](../BE/package.json) chay duoc
- `npm start` va `npm run build` trong [FE/package.json](../FE/package.json) chay duoc
- API tra ve dinh dang loi nhat quan (`message`, `code` neu co)
- Khong lo thong tin nhay cam qua response

## 6) Dinh nghia Hoan thanh (Definition of Done)

Moi feature duoc xem la xong khi:

1. Da co code FE/BE
2. Da test tay theo happy path va it nhat 1 edge case
3. Da cap nhat tai lieu API/huong dan neu co thay doi
4. Khong pha vo flow da co (regression smoke pass)
