# Environment Bootstrap

## 1) Yeu cau cong cu

- Node.js LTS (18+)
- npm (9+)
- SQL Server

## 2) Cau truc chay

- Frontend: [FE](../FE)
- Backend: [BE](../BE)
- Workspace scripts: [package.json](../package.json)

## 3) Setup backend

```bash
cd BE
npm install
cp .env.example .env
```

Cap nhat [BE/.env](../BE/.env):

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `CORS_ORIGIN=http://localhost:3000`

Chay:

```bash
npm run migrate:latest
npm run seed:run
npm run test:db
npm run dev
```

## 4) Setup frontend

```bash
cd FE
npm install
npm start
```

## 5) Chay nhanh tu root

```bash
cd ..
npm install
npm run dev
```

Lenh hien co trong [package.json](../package.json):

- `npm run fe`
- `npm run be`
- `npm run test:db`
- `npm run migrate`
- `npm run seed`
- `npm run dev`

## 6) Kiem tra nhanh sau setup

- `GET /api/health` tra `status: ok`
- FE mo duoc o `http://localhost:3000`
- BE mo o `http://localhost:3001`
- Dang nhap bang tai khoan seed thanh cong
