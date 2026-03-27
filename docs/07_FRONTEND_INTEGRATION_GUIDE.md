# Frontend Integration Guide (MVP)

## 1) Trang thai hien tai

- FE co the chay theo seed/localStorage (mac dinh)
- FE da co lop goi API co ban trong [FE/src/api](../FE/src/api)
- FE co bootstrap du lieu books/categories tu BE khi bat bien moi truong

## 2) Bat che do dung backend

Tao file `FE/.env` tu [FE/.env.example](../FE/.env.example):

```bash
REACT_APP_USE_BACKEND=true
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

Sau do khoi dong lai FE.

## 3) Mapping luong user journey

- Home/Shop/Book detail
  - Du lieu tu `GET /api/books` va `GET /api/categories`
- Cart
  - Muc tieu tiep theo: map sang `GET/PUT /api/cart`
- Checkout/Orders
  - Muc tieu tiep theo: map sang `POST /api/orders`, `GET /api/orders`
- Profile/Auth
  - Muc tieu tiep theo: map sang `/api/auth/*` va `/api/users/me`

## 4) Nguyen tac tich hop

- Tat ca request HTTP di qua `src/api/httpClient.ts`
- Khong goi API truc tiep trong component UI
- `src/services` xu ly map du lieu va quy tac nghiep vu phia FE
