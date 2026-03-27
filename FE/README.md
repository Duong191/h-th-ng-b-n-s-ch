# Frontend (React + TypeScript)

## Run

```bash
npm install
npm start
```

App runs at `http://localhost:3000`.

## Build

```bash
npm run build
```

## Folder Structure

- `src/api`: HTTP client and API adapters
- `src/assets`: static assets
- `src/components/layout`: layout components
- `src/components/ui`: reusable UI components
- `src/context`: global app state
- `src/pages`: page-level screens
- `src/pages/admin`: admin screens
- `src/services`: frontend business/data services
- `src/utils`: utility helpers

## Backend API

Create `FE/.env` from `FE/.env.example` (set the API base URL to match your server):

```bash
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

Catalog and auth load from the backend; the app no longer persists the old `bookstoreData` blob in `localStorage`.
