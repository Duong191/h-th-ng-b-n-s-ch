# System Test Plan

## 1) Muc tieu

Dam bao flow chinh hoat dong on dinh tu FE den BE:

- Auth
- Browse books
- Cart
- Checkout and orders
- Admin operations

## 2) Smoke checklist moi lan release

1. `GET /api/health` -> `status: ok`
2. Dang nhap admin thanh cong
3. Xem list sach thanh cong
4. Them sach vao gio va cap nhat so luong thanh cong
5. Dat don thanh cong
6. Admin cap nhat trang thai don thanh cong
7. Admin tao giao dich kho thanh cong

## 3) API test cases toi thieu

- Auth
  - Login dung/thieu field/sai password
- Books
  - List co phan trang, detail theo id ton tai/khong ton tai
- Cart
  - Guest cart voi `X-Guest-Session`
  - User cart sau login
- Orders
  - Dat don hop le
  - Dat don vuot ton kho
  - User thuong khong update status don
- Inventory
  - Admin/staff duoc thao tac
  - User thuong bi chan

## 4) Frontend test cases toi thieu

- Login / logout
- Route guard (`/profile`, `/admin/*`)
- Shop filter + search
- Cart total tinh dung
- Checkout tao don va clear cart dung

## 5) Regression rule

- Moi PR lon phai chay lai smoke checklist
- Moi thay doi API phai test lai pages anh huong truc tiep
