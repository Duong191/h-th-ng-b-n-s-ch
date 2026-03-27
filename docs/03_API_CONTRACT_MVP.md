# API Contract MVP

Base URL: `http://localhost:3001/api`

## Error format (quy uoc)

```json
{
  "message": "Human readable message",
  "code": "OPTIONAL_ERROR_CODE"
}
```

## 1) Health

- `GET /health`
  - Response: `{ "status": "ok", "service": "bookstore-api" }`

## 2) Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

Login response:

```json
{
  "accessToken": "jwt",
  "refreshToken": "jwt",
  "user": {
    "id": "1",
    "name": "Admin User",
    "email": "admin@bookstore.com",
    "role": "admin"
  }
}
```

## 3) Users

- `GET /users/me` (Bearer token)
- `PATCH /users/me` (Bearer token)

## 4) Books and Categories

- `GET /books?page=1&pageSize=20&search=...&categoryId=...`
- `GET /books/:id`
- `GET /categories`
- `GET /categories/detailed`

`GET /books` response:

```json
{
  "items": [
    {
      "id": "10",
      "title": "Book name",
      "price": 99000,
      "discount": 10,
      "stock": 12
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 100
  }
}
```

## 5) Cart

- `GET /cart`
- `PUT /cart`

Guest cart yeu cau header:

- `X-Guest-Session: <session-id>`

Update cart payload:

```json
{
  "items": [
    { "bookId": 1, "quantity": 2 }
  ]
}
```

## 6) Orders

- `POST /orders` (Bearer token)
- `GET /orders` (Bearer token)
- `PATCH /orders/:id/status` (admin/staff)

Create order payload:

```json
{
  "items": [
    { "bookId": 1, "quantity": 2 }
  ],
  "paymentMethod": "cod",
  "shippingAddress": {
    "name": "Nguyen Van A",
    "phone": "0900000000",
    "email": "a@example.com",
    "street": "123 Duong A",
    "city": "TP.HCM",
    "state": "",
    "zipCode": "",
    "country": "Vietnam"
  }
}
```

## 7) Admin Books

- `POST /admin/books` (admin/staff)
- `PUT /admin/books/:id` (admin/staff)
- `DELETE /admin/books/:id` (admin/staff)

## 8) Admin Inventory

- `GET /admin/inventory` (admin/staff)
- `POST /admin/inventory` (admin/staff)

Inventory payload:

```json
{
  "bookId": 1,
  "type": "import",
  "quantity": 10,
  "importPrice": 50000,
  "note": "Nhap kho dot 1"
}
```

## 9) Header standards

- Protected endpoints:
  - `Authorization: Bearer <accessToken>`
- JSON endpoints:
  - `Content-Type: application/json`

## 10) Frontend mapping (MVP)

- Login page -> `POST /auth/login`
- Shop/Home/Detail -> `GET /books`, `GET /books/:id`, `GET /categories`
- Cart page -> `GET/PUT /cart`
- Checkout -> `POST /orders`
- Orders page -> `GET /orders`
- Admin pages -> `/admin/books`, `/admin/inventory`, `/orders/:id/status`
