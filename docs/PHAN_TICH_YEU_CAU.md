# PHÂN TÍCH YÊU CẦU HỆ THỐNG QUẢN LÝ VÀ BÁN SÁCH TRỰC TUYẾN

## MỤC TIÊU CHÍNH

- Phân tích nghiệp vụ vận hành của cửa hàng sách trực tuyến
- Xác định các actor tham gia vào hệ thống
- Xác định các chức năng chính (Use Cases) của hệ thống
- Xác định các module chức năng của hệ thống
- Phân tích luồng nghiệp vụ chính
- Xây dựng kiến trúc tổng quan của hệ thống

---

## 1. TỔNG QUAN HỆ THỐNG

Hệ thống được xây dựng là **Web Application quản lý và bán sách trực tuyến**, hỗ trợ vận hành các hoạt động của cửa hàng sách bao gồm:

- **Quản lý danh mục sách**
- **Quản lý sản phẩm sách**
- **Tạo và quản lý đơn hàng**
- **Quản lý kho hàng**
- **Quản lý nhà cung cấp**
- **Thanh toán**
- **Báo cáo thống kê**
- **Quản lý khách hàng**

### 1.1. Phân Chia Nghiệp Vụ Chính

Hệ thống được chia làm hai nghiệp vụ chính:

#### **FRONTEND (Storefront - Gian hàng)**

Frontend là khu vực tiếp xúc trực tiếp với khách hàng, hỗ trợ các hoạt động mua sắm và đặt hàng.

**Các chức năng Frontend bao gồm:**
- Xem danh mục sách
- Tìm kiếm và lọc sách
- Xem chi tiết sách
- Thêm sách vào giỏ hàng
- Quản lý giỏ hàng
- Đặt hàng và thanh toán
- Theo dõi trạng thái đơn hàng
- Quản lý tài khoản cá nhân

Trong hệ thống Frontend, khách hàng có thể tự phục vụ để mua sắm sách trực tuyến.

#### **BACKEND (Admin Panel - Quản trị)**

Backend là khu vực vận hành và quản lý của cửa hàng, bao gồm các hoạt động quản trị và xử lý đơn hàng.

**Các chức năng Backend bao gồm:**
- Quản lý danh mục và sản phẩm sách
- Xử lý và duyệt đơn hàng
- Cập nhật trạng thái đơn hàng
- Quản lý tồn kho
- Quản lý nhà cung cấp
- Quản lý nhân viên
- Xem báo cáo và thống kê

---

## 2. ACTOR CỦA HỆ THỐNG

| Actor | Mô tả |
|-------|-------|
| **Admin** | Quản trị viên hệ thống, có toàn quyền quản lý |
| **Staff** | Nhân viên vận hành, xử lý đơn hàng và quản lý kho |
| **Customer (User)** | Khách hàng mua sách trực tuyến |

### 2.1. Quyền của Admin

Admin có quyền quản lý toàn bộ hệ thống:

- Quản lý danh mục sách
- Quản lý sản phẩm (thêm, sửa, xóa sách)
- Quản lý kho nguyên vật liệu (sách, tồn kho)
- Quản lý nhà cung cấp
- Quản lý nhân viên (thêm, sửa, phân quyền)
- Xem tất cả đơn hàng
- Quản lý khách hàng
- Xem báo cáo doanh thu chi tiết
- Cấu hình hệ thống

### 2.2. Quyền của Staff

Staff chịu trách nhiệm vận hành hệ thống trong quá trình xử lý đơn hàng:

- Xem danh sách đơn hàng
- Xác nhận đơn hàng mới
- Cập nhật trạng thái đơn hàng (xử lý, giao hàng, hoàn thành)
- Hủy đơn hàng (với lý do)
- Quản lý tồn kho (nhập/xuất kho)
- Cập nhật thông tin sách cơ bản
- Xem báo cáo vận hành
- Xem thông tin khách hàng (để xử lý đơn)

### 2.3. Quyền của Customer (User)

Customer (khách hàng) có quyền mua sắm và quản lý đơn hàng của mình:

- Đăng ký và đăng nhập tài khoản
- Xem danh mục sách
- Tìm kiếm và lọc sách
- Xem chi tiết sách
- Thêm sách vào giỏ hàng
- Quản lý giỏ hàng (thêm, sửa, xóa)
- Đặt hàng và thanh toán
- Xem lịch sử đơn hàng
- Theo dõi trạng thái đơn hàng
- Cập nhật thông tin cá nhân

---

## 3. USE CASE CỦA HỆ THỐNG

Dựa trên phân tích nghiệp vụ, các Use Case chính của hệ thống bao gồm:

| ID | Use Case | Actor | Mô tả |
|----|----------|-------|-------|
| **UC01** | Đăng nhập hệ thống | Admin, Staff, Customer | Xác thực người dùng vào hệ thống |
| **UC02** | Đăng ký tài khoản | Customer | Khách hàng tạo tài khoản mới |
| **UC03** | Quản lý danh mục sách | Admin, Staff | Thêm, sửa, xóa danh mục sách |
| **UC04** | Quản lý sản phẩm sách | Admin, Staff | Thêm, sửa, xóa thông tin sách |
| **UC05** | Tìm kiếm và lọc sách | Customer | Tìm sách theo tiêu chí |
| **UC06** | Xem chi tiết sách | Customer | Xem thông tin chi tiết sản phẩm |
| **UC07** | Quản lý giỏ hàng | Customer | Thêm, sửa, xóa sách trong giỏ |
| **UC08** | Đặt hàng | Customer | Tạo đơn hàng mới |
| **UC09** | Quản lý đơn hàng | Admin, Staff | Xem, xử lý, cập nhật đơn hàng |
| **UC10** | Thanh toán | Customer | Thanh toán đơn hàng |
| **UC11** | Quản lý tồn kho | Admin, Staff | Nhập/xuất kho, kiểm kê |
| **UC12** | Quản lý nhà cung cấp | Admin | Quản lý thông tin nhà cung cấp |
| **UC13** | Quản lý nhân viên | Admin | Thêm, sửa, phân quyền nhân viên |
| **UC14** | Báo cáo thống kê | Admin, Staff | Xem báo cáo doanh thu, bán chạy |
| **UC15** | Quản lý hồ sơ cá nhân | Customer | Cập nhật thông tin tài khoản |

---

## 4. CÁC MODULE CHỨC NĂNG CỦA HỆ THỐNG

| Module | Mô tả |
|--------|-------|
| **Auth** | Xác thực và phân quyền người dùng |
| **User Management** | Quản lý tài khoản khách hàng |
| **Employee Management** | Quản lý nhân viên |
| **Category Management** | Quản lý danh mục sách |
| **Book Management** | Quản lý sản phẩm sách |
| **Shopping Cart** | Quản lý giỏ hàng |
| **Order Management** | Quản lý đơn hàng |
| **Payment** | Xử lý thanh toán |
| **Inventory Management** | Quản lý kho và tồn kho |
| **Supplier Management** | Quản lý nhà cung cấp |
| **Report & Analytics** | Báo cáo và thống kê |

---

## 5. LUỒNG NGHIỆP VỤ CHÍNH CỦA HỆ THỐNG

### 5.1. Quy Trình Mua Hàng (Customer Journey)

Quy trình quan trọng nhất của hệ thống là quy trình mua sách của khách hàng:

1. **Khách hàng truy cập website**
   - Xem giao diện trang chủ
   - Xem sách nổi bật, sách mới

2. **Tìm kiếm sách**
   - Tìm kiếm theo từ khóa (tên sách, tác giả, ISBN)
   - Lọc theo danh mục, giá, ngôn ngữ
   - Sắp xếp theo tiêu chí

3. **Xem chi tiết sách**
   - Xem thông tin đầy đủ: tác giả, NXB, mô tả
   - Xem giá, khuyến mãi
   - Xem đánh giá và review

4. **Thêm sách vào giỏ hàng**
   - Chọn số lượng
   - Thêm vào giỏ
   - Kiểm tra tồn kho

5. **Quản lý giỏ hàng**
   - Xem danh sách sách trong giỏ
   - Cập nhật số lượng
   - Xóa sách khỏi giỏ
   - Xem tổng tiền

6. **Đặt hàng**
   - Đăng nhập hoặc đăng ký (nếu chưa có tài khoản)
   - Nhập thông tin giao hàng
   - Chọn phương thức thanh toán
   - Xác nhận đơn hàng

7. **Thanh toán**
   - Chọn phương thức: COD, chuyển khoản, ví điện tử
   - Xác nhận thanh toán
   - Nhận mã đơn hàng

8. **Theo dõi đơn hàng**
   - Xem trạng thái đơn hàng
   - Nhận thông báo cập nhật trạng thái
   - Xác nhận nhận hàng

### 5.2. Quy Trình Xử Lý Đơn Hàng (Order Processing)

Luồng xử lý đơn hàng từ phía Admin/Staff:

1. **Nhận đơn hàng mới**
   - Hệ thống tạo đơn hàng với trạng thái `pending`
   - Trừ tồn kho tạm thời
   - Ghi log inventory transaction

2. **Xác nhận đơn hàng**
   - Staff/Admin kiểm tra đơn hàng
   - Xác nhận đơn → trạng thái `confirmed`
   - Gửi email thông báo cho khách

3. **Xử lý đơn hàng**
   - Nhân viên kho chuẩn bị sách
   - Đóng gói đơn hàng
   - Cập nhật trạng thái `processing`

4. **Giao hàng**
   - Bàn giao cho đơn vị vận chuyển
   - Cập nhật trạng thái `shipping`
   - Cập nhật mã vận đơn

5. **Hoàn thành đơn hàng**
   - Khách nhận hàng thành công
   - Cập nhật trạng thái `completed`
   - Cập nhật số lượng đã bán
   - Ghi nhận doanh thu

6. **Hủy đơn hàng (nếu có)**
   - Staff/Admin hủy đơn (với lý do)
   - Hoàn lại tồn kho
   - Ghi log inventory adjustment
   - Thông báo cho khách hàng

### 5.3. Quy Trình Quản Lý Kho (Inventory Management)

1. **Nhập kho**
   - Staff/Admin tạo phiếu nhập kho
   - Chọn nhà cung cấp
   - Nhập thông tin sách, số lượng, giá nhập
   - Cập nhật tồn kho
   - Ghi log inventory transaction

2. **Xuất kho**
   - Xuất kho khi có đơn hàng (tự động)
   - Xuất kho hỏng/mất (thủ công)
   - Trừ tồn kho
   - Ghi log

3. **Kiểm kê kho**
   - Đối chiếu tồn kho thực tế
   - Điều chỉnh sai lệch
   - Ghi log adjustment

---

## 6. ACTOR VÀ QUYỀN HẠN CHI TIẾT

### 6.1. Admin (Quản trị viên)

**Vai trò:** Quản lý toàn diện hệ thống

**Quyền hạn:**

| Chức năng | Quyền |
|-----------|-------|
| **Quản lý sách** | Thêm, sửa, xóa, xem |
| **Quản lý danh mục** | Thêm, sửa, xóa, xem |
| **Quản lý đơn hàng** | Xem tất cả, xác nhận, cập nhật trạng thái, hủy |
| **Quản lý kho** | Nhập kho, xuất kho, kiểm kê, xem lịch sử |
| **Quản lý nhà cung cấp** | Thêm, sửa, xóa, xem |
| **Quản lý nhân viên** | Thêm, sửa, xóa, phân quyền |
| **Quản lý khách hàng** | Xem, khóa tài khoản |
| **Báo cáo** | Xem tất cả báo cáo tài chính và vận hành |

### 6.2. Staff (Nhân viên)

**Vai trò:** Vận hành hệ thống, xử lý đơn hàng và quản lý kho

**Quyền hạn:**

| Chức năng | Quyền |
|-----------|-------|
| **Quản lý sách** | Xem, sửa thông tin cơ bản (giá, mô tả, ảnh) |
| **Quản lý danh mục** | Chỉ xem |
| **Quản lý đơn hàng** | Xem, xác nhận, cập nhật trạng thái |
| **Quản lý kho** | Nhập/xuất kho, xem lịch sử |
| **Quản lý nhà cung cấp** | Chỉ xem |
| **Quản lý nhân viên** | Không có quyền |
| **Quản lý khách hàng** | Xem thông tin để xử lý đơn |
| **Báo cáo** | Xem báo cáo vận hành cơ bản |

**Staff KHÔNG có quyền:**
- Xóa sách, danh mục
- Xóa đơn hàng
- Quản lý nhân viên
- Phân quyền
- Xem báo cáo tài chính nhạy cảm (lợi nhuận chi tiết)

### 6.3. Customer (Khách hàng)

**Vai trò:** Mua sắm sách trực tuyến

**Quyền hạn:**

| Chức năng | Quyền |
|-----------|-------|
| **Xem sách** | Xem tất cả sách đang bán |
| **Tìm kiếm** | Tìm kiếm và lọc sách |
| **Giỏ hàng** | Thêm, sửa, xóa sách trong giỏ |
| **Đặt hàng** | Tạo đơn hàng mới |
| **Đơn hàng của tôi** | Xem lịch sử đơn hàng của bản thân |
| **Hồ sơ** | Cập nhật thông tin cá nhân |
| **Review** | Đánh giá và review sách đã mua |

---

## 7. CÁC MODULE CHỨC NĂNG CHI TIẾT

### Module 1: Authentication & Authorization (Auth)

**Mô tả:** Xác thực và phân quyền người dùng

**Chức năng:**
- Đăng nhập (email + password)
- Đăng ký tài khoản mới
- Đăng xuất
- Quên mật khẩu / Đặt lại mật khẩu
- Xác thực JWT token
- Phân quyền theo role (RBAC)

**Actors:** Tất cả

### Module 2: User Management

**Mô tả:** Quản lý tài khoản khách hàng

**Chức năng:**
- Xem danh sách khách hàng
- Xem chi tiết khách hàng
- Khóa/Mở khóa tài khoản
- Xem lịch sử mua hàng của khách
- Quản lý địa chỉ giao hàng

**Actors:** Admin, Staff (view only)

### Module 3: Employee Management

**Mô tả:** Quản lý nhân viên

**Chức năng:**
- Thêm nhân viên mới
- Cập nhật thông tin nhân viên
- Phân quyền (gán role: admin/staff)
- Khóa/Mở khóa tài khoản nhân viên
- Xem lịch sử hoạt động nhân viên

**Actors:** Admin

### Module 4: Category Management

**Mô tả:** Quản lý danh mục sách

**Chức năng:**
- Thêm danh mục mới
- Sửa thông tin danh mục
- Xóa danh mục (soft delete)
- Sắp xếp thứ tự hiển thị
- Quản lý danh mục con (hierarchy)

**Actors:** Admin

### Module 5: Book Management

**Mô tả:** Quản lý sản phẩm sách

**Chức năng:**
- Thêm sách mới (ISBN, tên, tác giả, NXB, giá, mô tả, ảnh)
- Cập nhật thông tin sách
- Xóa sách (soft delete)
- Upload ảnh sách (multiple images)
- Quản lý tags
- Đánh dấu sách nổi bật/bestseller/trending/mới
- Cập nhật giá và khuyến mãi
- Quản lý tồn kho sách

**Actors:** Admin (full), Staff (update only)

### Module 6: Shopping Cart

**Mô tả:** Quản lý giỏ hàng

**Chức năng:**
- Thêm sách vào giỏ
- Cập nhật số lượng
- Xóa sách khỏi giỏ
- Xem tổng tiền
- Kiểm tra tồn kho
- Lưu giỏ hàng (persistent)

**Actors:** Customer

### Module 7: Order Management

**Mô tả:** Quản lý đơn hàng

**Chức năng:**
- Tạo đơn hàng từ giỏ hàng
- Xem danh sách đơn hàng
- Lọc đơn theo trạng thái, ngày, khách hàng
- Xem chi tiết đơn hàng
- Cập nhật trạng thái đơn (pending → confirmed → processing → shipping → completed)
- Hủy đơn hàng (với lý do)
- In hóa đơn
- Gửi email thông báo

**Actors:** Customer (own orders), Staff (all orders), Admin (all orders)

### Module 8: Payment

**Mô tả:** Xử lý thanh toán

**Chức năng:**
- Chọn phương thức thanh toán:
  - COD (Cash on Delivery)
  - Chuyển khoản ngân hàng
  - Ví điện tử (MoMo, ZaloPay)
  - Thẻ tín dụng
- Xác nhận thanh toán
- Lưu lịch sử thanh toán
- Hoàn tiền (nếu hủy đơn)

**Actors:** Customer, Staff (verify payment)

### Module 9: Inventory Management

**Mô tả:** Quản lý kho và tồn kho

**Chức năng:**
- Nhập kho:
  - Tạo phiếu nhập
  - Chọn nhà cung cấp
  - Nhập sách, số lượng, giá nhập
  - Cập nhật tồn kho
- Xuất kho:
  - Xuất kho tự động khi có đơn hàng
  - Xuất kho thủ công (hỏng, mất, khuyến mãi)
- Kiểm kê:
  - Đối chiếu tồn kho thực tế
  - Điều chỉnh sai lệch
- Lịch sử giao dịch kho
- Cảnh báo tồn kho thấp

**Actors:** Admin, Staff

### Module 10: Supplier Management

**Mô tả:** Quản lý nhà cung cấp

**Chức năng:**
- Thêm nhà cung cấp mới
- Cập nhật thông tin nhà cung cấp
- Xóa nhà cung cấp
- Xem lịch sử nhập hàng từ nhà cung cấp
- Đánh giá nhà cung cấp

**Actors:** Admin

### Module 11: Report & Analytics

**Mô tả:** Báo cáo và thống kê

**Chức năng:**
- Báo cáo doanh thu:
  - Doanh thu theo ngày/tuần/tháng/năm
  - Doanh thu theo danh mục
  - Biểu đồ doanh thu
- Báo cáo bán hàng:
  - Top sách bán chạy
  - Sách ế ẩm
  - Tỷ lệ chuyển đổi
- Báo cáo tồn kho:
  - Tồn kho hiện tại
  - Sách sắp hết hàng
  - Giá trị tồn kho
  - Biến động nhập/xuất
- Báo cáo khách hàng:
  - Số lượng khách hàng mới
  - Khách hàng tiềm năng (mua nhiều)
  - Tỷ lệ khách hàng quay lại
- Báo cáo đơn hàng:
  - Số lượng đơn theo trạng thái
  - Tỷ lệ hủy đơn
  - Giá trị đơn hàng trung bình

**Actors:** Admin (all reports), Staff (operational reports only)

---

## 8. LUỒNG DỮ LIỆU (DATA FLOW)

### 8.1. Luồng Đặt Hàng

```
Customer → Frontend → API (POST /api/orders) → Backend:
  1. Validate cart items
  2. Check stock availability
  3. Calculate total amount
  4. Create order record
  5. Create order items
  6. Reduce book stock
  7. Create inventory transactions
  8. Clear cart
  9. Send confirmation email
→ Response → Frontend → Customer
```

### 8.2. Luồng Cập Nhật Trạng Thái Đơn

```
Staff/Admin → Admin Panel → API (PUT /api/orders/:id/status) → Backend:
  1. Validate status transition
  2. Update order status
  3. Log status history
  4. If cancelled: restore stock
  5. Send notification email
→ Response → Admin Panel → Staff/Admin
```

### 8.3. Luồng Nhập Kho

```
Staff/Admin → Admin Panel → API (POST /api/inventory/import) → Backend:
  1. Validate supplier
  2. Validate book IDs
  3. Create inventory transaction
  4. Update book stock
  5. Update import price (if provided)
→ Response → Admin Panel → Staff/Admin
```

---

## 9. KIẾN TRÚC TỔNG QUAN HỆ THỐNG

### 9.1. Kiến Trúc 3 Lớp (Three-Tier Architecture)

```
┌─────────────────────────────────────────────────────┐
│              FRONTEND (Presentation Layer)           │
│                                                      │
│  - React + TypeScript                               │
│  - Giao diện khách hàng (Storefront)               │
│  - Giao diện quản trị (Admin Panel)                │
│  - React Router (routing)                           │
│  - State Management (Context API / Redux)           │
└──────────────────┬──────────────────────────────────┘
                   │ REST API (HTTPS/JSON)
                   ↓
┌─────────────────────────────────────────────────────┐
│              BACKEND (Application Layer)             │
│                                                      │
│  - Node.js + Express / ASP.NET Core                 │
│  - RESTful API                                      │
│  - Authentication (JWT)                             │
│  - Authorization (RBAC)                             │
│  - Business Logic Layer                             │
│  - Data Access Layer                                │
└──────────────────┬──────────────────────────────────┘
                   │ SQL Queries / ORM
                   ↓
┌─────────────────────────────────────────────────────┐
│              DATABASE (Data Layer)                   │
│                                                      │
│  - SQL Server                                       │
│  - 18 Tables (normalized)                           │
│  - Stored Procedures                                │
│  - Views (reporting)                                │
│  - Triggers (audit trail)                           │
└─────────────────────────────────────────────────────┘
```

### 9.2. Công Nghệ Sử Dụng

#### **Frontend**
- **Framework:** React 19.2.4
- **Language:** TypeScript 4.9.5
- **Routing:** React Router DOM 7.13.1
- **UI Components:** Custom components + Bootstrap (optional)
- **State Management:** React Context API
- **HTTP Client:** Fetch API / Axios

#### **Backend**
- **Runtime:** Node.js 16+
- **Framework:** Express.js / NestJS
- **Language:** JavaScript ES6+ / TypeScript
- **Database Driver:** mssql (SQL Server driver)
- **Query Builder:** Knex.js
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** Joi / class-validator
- **Password Hashing:** bcrypt

#### **Database**
- **DBMS:** SQL Server 2019+
- **Migration Tool:** Knex migrations
- **Schema:** 18 normalized tables
- **Business Logic:** Stored Procedures (3)
- **Reporting:** Views (8)

---

## 10. YÊU CẦU PHI CHỨC NĂNG

### 10.1. Hiệu Năng

- Thời gian phản hồi API < 2 giây (95% requests)
- Tải trang danh sách sách < 3 giây
- Hỗ trợ 100+ concurrent users
- Database query optimization với indexes

### 10.2. Bảo Mật

- Mật khẩu được hash với bcrypt (cost ≥ 10)
- Xác thực bằng JWT (access token + refresh token)
- HTTPS cho tất cả API calls
- Input validation ở cả frontend và backend
- SQL injection prevention (parameterized queries)
- XSS protection
- CORS configuration
- Rate limiting cho API

### 10.3. Tính Sẵn Sàng (Availability)

- Uptime ≥ 99% (development phase)
- Graceful error handling
- Automatic retry cho transient errors
- Database backup hàng ngày

### 10.4. Khả Năng Mở Rộng (Scalability)

- Thiết kế modular, dễ mở rộng
- API RESTful, stateless
- Database normalized, indexed
- Có thể scale horizontal (thêm server)

### 10.5. Tính Bảo Trì (Maintainability)

- Code structure rõ ràng, tách layer
- Documentation đầy đủ
- Version control (Git)
- Migration-based database changes
- Logging và monitoring

### 10.6. Tính Khả Dụng (Usability)

- Giao diện thân thiện, dễ sử dụng
- Responsive design (mobile, tablet, desktop)
- Loading indicators
- Error messages rõ ràng
- Confirmation dialogs cho actions quan trọng

---

## 11. BIỂU ĐỒ USE CASE TỔNG QUAN

```
┌─────────────────────────────────────────────────────────────┐
│                    BOOKSTORE SYSTEM                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Customer                    Staff              Admin       │
│    │                          │                  │          │
│    │                          │                  │          │
│    ├─ Đăng ký/Đăng nhập      │                  │          │
│    ├─ Xem sách ──────────────┼──────────────────┤          │
│    ├─ Tìm kiếm sách          │                  │          │
│    ├─ Thêm vào giỏ           │                  │          │
│    ├─ Đặt hàng               │                  │          │
│    ├─ Xem đơn hàng           ├─ Xử lý đơn ──────┤          │
│    ├─ Cập nhật hồ sơ         │                  │          │
│    │                          ├─ Cập nhật kho ───┤          │
│    │                          ├─ Xem báo cáo ────┤          │
│    │                          │                  ├─ QL Nhân viên
│    │                          │                  ├─ QL Danh mục
│    │                          │                  ├─ QL Sách
│    │                          │                  ├─ QL NCC
│    │                          │                  ├─ Xem BC đầy đủ
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 12. CÁC LUỒNG NGHIỆP VỤ CHI TIẾT

### 12.1. UC08: Đặt Hàng (Place Order)

**Actor:** Customer

**Điều kiện tiên quyết:**
- Khách hàng đã đăng nhập
- Giỏ hàng có ít nhất 1 sản phẩm
- Tất cả sản phẩm còn đủ tồn kho

**Luồng chính:**
1. Customer vào trang giỏ hàng
2. System hiển thị danh sách sách trong giỏ, tổng tiền
3. Customer click "Đặt hàng"
4. System chuyển sang trang checkout
5. Customer nhập thông tin giao hàng:
   - Họ tên người nhận
   - Số điện thoại
   - Email
   - Địa chỉ giao hàng (đường, thành phố, mã bưu điện)
6. Customer chọn phương thức thanh toán
7. Customer xem lại đơn hàng
8. Customer click "Xác nhận đặt hàng"
9. System validate thông tin
10. System kiểm tra tồn kho
11. System tạo đơn hàng:
    - Tạo record trong bảng `orders`
    - Tạo records trong bảng `order_items`
    - Trừ tồn kho sách (bảng `books.stock`)
    - Tạo inventory transactions
    - Ghi log status history
    - Xóa giỏ hàng
12. System gửi email xác nhận cho khách
13. System hiển thị trang "Đặt hàng thành công" với mã đơn hàng
14. End

**Luồng thay thế:**

**10a. Hết hàng:**
- System hiển thị lỗi "Sản phẩm X không đủ tồn kho"
- Customer quay lại giỏ hàng, điều chỉnh số lượng
- Quay lại bước 8

**9a. Thông tin không hợp lệ:**
- System hiển thị lỗi validation
- Customer sửa thông tin
- Quay lại bước 8

### 12.2. UC09: Xử Lý Đơn Hàng (Process Order)

**Actor:** Staff / Admin

**Điều kiện tiên quyết:**
- Đã đăng nhập với quyền staff/admin
- Có đơn hàng cần xử lý

**Luồng chính:**
1. Staff/Admin vào trang "Quản lý đơn hàng"
2. System hiển thị danh sách đơn hàng
3. Staff/Admin lọc đơn theo trạng thái "pending"
4. Staff/Admin click vào đơn hàng cần xử lý
5. System hiển thị chi tiết đơn hàng:
   - Thông tin khách hàng
   - Danh sách sách
   - Địa chỉ giao hàng
   - Phương thức thanh toán
   - Tổng tiền
6. Staff/Admin kiểm tra thông tin đơn hàng
7. Staff/Admin click "Xác nhận đơn hàng"
8. System cập nhật trạng thái → `confirmed`
9. System ghi log vào `order_status_history`
10. System gửi email thông báo cho khách
11. Staff kho chuẩn bị sách
12. Staff cập nhật trạng thái → `processing`
13. Sau khi đóng gói xong, cập nhật → `shipping`
14. Nhập mã vận đơn (nếu có)
15. Khi khách nhận hàng, cập nhật → `completed`
16. End

**Luồng thay thế:**

**7a. Hủy đơn hàng:**
- Staff/Admin click "Hủy đơn"
- System yêu cầu nhập lý do hủy
- Staff/Admin nhập lý do
- System cập nhật trạng thái → `cancelled`
- System hoàn lại tồn kho (gọi stored procedure)
- System gửi email thông báo cho khách
- End

### 12.3. UC11: Nhập Kho (Import Inventory)

**Actor:** Staff / Admin

**Điều kiện tiên quyết:**
- Đã đăng nhập với quyền staff/admin
- Có nhà cung cấp trong hệ thống

**Luồng chính:**
1. Staff/Admin vào trang "Quản lý kho"
2. Staff/Admin click "Nhập kho"
3. System hiển thị form nhập kho
4. Staff/Admin chọn nhà cung cấp
5. Staff/Admin thêm các sách cần nhập:
   - Tìm và chọn sách (hoặc thêm sách mới)
   - Nhập số lượng
   - Nhập giá nhập
6. Staff/Admin nhập ghi chú (số hóa đơn, ngày nhập, v.v.)
7. Staff/Admin click "Xác nhận nhập kho"
8. System validate thông tin
9. System tạo inventory transactions (type = 'import')
10. System cập nhật `books.stock` (+ quantity)
11. System cập nhật `books.import_price`
12. System hiển thị thông báo thành công
13. End

**Luồng thay thế:**

**8a. Thông tin không hợp lệ:**
- System hiển thị lỗi
- Staff/Admin sửa thông tin
- Quay lại bước 7

---

## 13. DATABASE SCHEMA OVERVIEW

### 13.1. Nhóm Bảng Identity & Auth
- `users` - Tài khoản người dùng
- `roles` - Vai trò (admin, staff, user)
- `permissions` - Quyền hạn hệ thống
- `user_roles` - Gán role cho user
- `role_permissions` - Gán permission cho role
- `refresh_tokens` - JWT refresh tokens

### 13.2. Nhóm Bảng Catalog
- `categories` - Danh mục sách
- `books` - Sản phẩm sách
- `book_images` - Ảnh sách (multiple)
- `book_tags` - Tags cho sách

### 13.3. Nhóm Bảng Cart & Orders
- `carts` - Giỏ hàng
- `cart_items` - Sách trong giỏ
- `orders` - Đơn hàng
- `order_items` - Sách trong đơn
- `order_status_history` - Lịch sử thay đổi trạng thái

### 13.4. Nhóm Bảng Inventory
- `suppliers` - Nhà cung cấp
- `inventory_transactions` - Giao dịch nhập/xuất kho

### 13.5. Nhóm Bảng Operations
- `audit_logs` - Lịch sử thao tác hệ thống

---

## 14. API ENDPOINTS OVERVIEW

### 14.1. Authentication APIs
```
POST   /api/auth/register        - Đăng ký tài khoản
POST   /api/auth/login           - Đăng nhập
POST   /api/auth/logout          - Đăng xuất
POST   /api/auth/refresh-token   - Refresh JWT token
POST   /api/auth/forgot-password - Quên mật khẩu
POST   /api/auth/reset-password  - Đặt lại mật khẩu
```

### 14.2. Books APIs
```
GET    /api/books                - Lấy danh sách sách (filter, search, pagination)
GET    /api/books/:id            - Lấy chi tiết sách
POST   /api/books                - Thêm sách mới (admin/staff)
PUT    /api/books/:id            - Cập nhật sách (admin/staff)
DELETE /api/books/:id            - Xóa sách (admin)
GET    /api/books/featured       - Lấy sách nổi bật
GET    /api/books/bestsellers    - Lấy sách bán chạy
GET    /api/books/new-arrivals   - Lấy sách mới
```

### 14.3. Categories APIs
```
GET    /api/categories           - Lấy danh sách danh mục
GET    /api/categories/:id       - Lấy chi tiết danh mục
POST   /api/categories           - Thêm danh mục (admin)
PUT    /api/categories/:id       - Cập nhật danh mục (admin)
DELETE /api/categories/:id       - Xóa danh mục (admin)
```

### 14.4. Cart APIs
```
GET    /api/cart                 - Lấy giỏ hàng hiện tại
POST   /api/cart/items           - Thêm sách vào giỏ
PUT    /api/cart/items/:bookId   - Cập nhật số lượng
DELETE /api/cart/items/:bookId   - Xóa sách khỏi giỏ
DELETE /api/cart                 - Xóa toàn bộ giỏ
```

### 14.5. Orders APIs
```
GET    /api/orders               - Lấy danh sách đơn hàng
GET    /api/orders/:id           - Lấy chi tiết đơn hàng
POST   /api/orders               - Tạo đơn hàng mới
PUT    /api/orders/:id/status    - Cập nhật trạng thái (staff/admin)
POST   /api/orders/:id/cancel    - Hủy đơn hàng
GET    /api/orders/:id/history   - Lấy lịch sử trạng thái
```

### 14.6. Inventory APIs
```
GET    /api/inventory            - Lấy tồn kho
POST   /api/inventory/import     - Nhập kho (staff/admin)
POST   /api/inventory/export     - Xuất kho (staff/admin)
GET    /api/inventory/transactions - Lịch sử giao dịch kho
GET    /api/inventory/low-stock  - Cảnh báo tồn kho thấp
```

### 14.7. Reports APIs
```
GET    /api/reports/revenue/daily    - Doanh thu theo ngày
GET    /api/reports/revenue/monthly  - Doanh thu theo tháng
GET    /api/reports/bestsellers      - Top sách bán chạy
GET    /api/reports/customers        - Thống kê khách hàng
GET    /api/reports/orders           - Thống kê đơn hàng
```

---

## 15. TRẠNG THÁI ĐỚN HÀNG (Order Status Flow)

```
pending (Chờ xác nhận)
    ↓
confirmed (Đã xác nhận)
    ↓
processing (Đang xử lý)
    ↓
shipping (Đang giao hàng)
    ↓
completed (Hoàn thành)

Bất kỳ trạng thái nào → cancelled (Đã hủy)
```

**Mô tả các trạng thái:**

| Trạng thái | Mô tả | Ai có thể thay đổi |
|------------|-------|--------------------|
| `pending` | Đơn hàng mới, chờ xác nhận | Tự động khi tạo đơn |
| `confirmed` | Đã xác nhận, chuẩn bị xử lý | Staff/Admin |
| `processing` | Đang chuẩn bị hàng, đóng gói | Staff/Admin |
| `shipping` | Đã giao cho đơn vị vận chuyển | Staff/Admin |
| `completed` | Khách đã nhận hàng thành công | Staff/Admin hoặc tự động |
| `cancelled` | Đơn hàng bị hủy | Staff/Admin hoặc Customer (nếu còn pending) |

---

## 16. YÊU CẦU BẢO MẬT

### 16.1. Authentication
- Sử dụng JWT (JSON Web Token)
- Access token (short-lived, 15 phút)
- Refresh token (long-lived, 7 ngày)
- Lưu refresh token trong database

### 16.2. Authorization (RBAC)
- Role-based access control
- Permission-based granular control
- Middleware kiểm tra quyền trước mỗi API call

### 16.3. Data Protection
- Password hashing với bcrypt
- HTTPS cho tất cả communications
- Input sanitization
- SQL injection prevention
- XSS protection

---

## 17. TIÊU CHÍ NGHIỆM THU

### 17.1. Chức Năng

- [ ] Đăng ký/Đăng nhập hoạt động chính xác
- [ ] RBAC phân quyền đúng cho 3 roles
- [ ] Khách hàng có thể mua sách end-to-end
- [ ] Staff có thể xử lý đơn hàng
- [ ] Admin có thể quản lý sản phẩm
- [ ] Quản lý kho hoạt động chính xác
- [ ] Báo cáo hiển thị dữ liệu đúng

### 17.2. Kỹ Thuật

- [ ] Database có đủ 18 tables theo thiết kế
- [ ] 3 stored procedures hoạt động
- [ ] 8 views trả về dữ liệu chính xác
- [ ] API response time < 2s
- [ ] Frontend responsive trên mobile/desktop
- [ ] Code có documentation

### 17.3. Bảo Mật

- [ ] Passwords được hash
- [ ] JWT authentication hoạt động
- [ ] Authorization middleware hoạt động
- [ ] Không có SQL injection vulnerabilities
- [ ] Input validation hoạt động

---

## 18. RỦI RO VÀ XỬ LÝ

| Rủi ro | Mức độ | Hướng xử lý |
|--------|--------|-------------|
| Tồn kho không chính xác | Cao | Sử dụng transaction, stored procedure, inventory ledger |
| Đơn hàng trùng lặp | Trung bình | Unique constraint trên order_number, idempotency keys |
| Phân quyền không chặt | Cao | Implement RBAC đầy đủ, test coverage cao |
| Performance kém khi nhiều data | Trung bình | Index optimization, pagination, caching |
| Data loss | Cao | Database backup tự động, transaction handling |

---

## 19. KẾ HOẠCH TRIỂN KHAI

### Phase 1: Foundation (Đã hoàn thành)
- ✅ Database schema design
- ✅ Migration scripts
- ✅ Seed data
- ✅ Stored procedures & views

### Phase 2: Backend API (Tiếp theo)
- [ ] Setup Express.js project
- [ ] Implement authentication (JWT)
- [ ] Implement authorization middleware
- [ ] Create API endpoints (Books, Categories, Orders)
- [ ] Integrate with database
- [ ] Error handling & validation
- [ ] API documentation

### Phase 3: Frontend Integration
- [ ] Connect frontend to API
- [ ] Replace localStorage with API calls
- [ ] Implement authentication flow
- [ ] Implement all features
- [ ] UI/UX improvements
- [ ] Testing

### Phase 4: Testing & Deployment
- [ ] Unit testing
- [ ] Integration testing
- [ ] End-to-end testing
- [ ] Performance testing
- [ ] Security audit
- [ ] Deployment to production

---

## 20. KẾT LUẬN

Hệ thống quản lý và bán sách trực tuyến được thiết kế với kiến trúc 3 lớp (Frontend - Backend - Database), hỗ trợ đầy đủ các nghiệp vụ từ mua sắm cho khách hàng đến quản trị cho admin/staff.

Với 18 tables chuẩn hóa, 3 stored procedures cho business logic, 8 views cho reporting, và RBAC đầy đủ cho 3 roles, hệ thống đảm bảo:
- **Tính toàn vẹn dữ liệu** (foreign keys, constraints, transactions)
- **Tính bảo mật** (JWT, RBAC, password hashing)
- **Tính mở rộng** (modular design, normalized schema)
- **Tính hiệu quả** (indexes, views, stored procedures)

Hệ thống sẵn sàng cho việc xây dựng backend API và tích hợp với frontend React hiện có.
