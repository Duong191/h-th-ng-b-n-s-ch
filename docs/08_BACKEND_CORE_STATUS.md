# Backend Core Status

## Muc tieu theo roadmap

Thu tu uu tien:

1. Auth
2. Books + Categories
3. Cart
4. Orders
5. Inventory/Admin

## Trang thai hien tai

- Auth: da co route dang ky/dang nhap/refresh/logout
  - [BE/src/routes/authRoutes.js](../BE/src/routes/authRoutes.js)
- Books + Categories: da co list/detail/filter
  - [BE/src/routes/booksRoutes.js](../BE/src/routes/booksRoutes.js)
  - [BE/src/routes/categoriesRoutes.js](../BE/src/routes/categoriesRoutes.js)
- Cart: da co `GET/PUT /api/cart`
  - [BE/src/routes/cartRoutes.js](../BE/src/routes/cartRoutes.js)
- Orders: da co tao don, list don, doi trang thai
  - [BE/src/routes/ordersRoutes.js](../BE/src/routes/ordersRoutes.js)
- Inventory/Admin:
  - [BE/src/routes/adminBooksRoutes.js](../BE/src/routes/adminBooksRoutes.js)
  - [BE/src/routes/inventoryRoutes.js](../BE/src/routes/inventoryRoutes.js)

## Lenh kiem tra nhanh

- `npm run test:db`
- `npm run test:smoke`
- `npm run dev`

## Cong viec tiep theo de harden

- Them integration tests cho route protected
- Chuan hoa error code cho toan bo endpoint
- Bo sung logs cho cac thao tac quan tri nhay cam
