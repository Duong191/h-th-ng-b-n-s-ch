# Bookstore Project Workspace

Workspace duoc tach thanh 2 phan:

- [FE](./FE): React + TypeScript
- [BE](./BE): Node.js + Express + SQL Server

Tai lieu trien khai:

- [MVP scope](./docs/01_MVP_SCOPE_AND_ACCEPTANCE.md)
- [Env bootstrap](./docs/02_ENV_BOOTSTRAP.md)
- [API contract MVP](./docs/03_API_CONTRACT_MVP.md)
- [Security and RBAC checklist](./docs/04_SECURITY_RBAC_CHECKLIST.md)
- [Test plan](./docs/05_TEST_PLAN.md)
- [Release and demo checklist](./docs/06_RELEASE_AND_DEMO.md)

## Quick Start

```bash
# install workspace scripts
npm install

# run FE + BE together
npm run dev
```

Neu chay rieng:

```bash
npm run fe
npm run be
```

## Backend Setup

```bash
cd BE
npm install
cp .env.example .env
npm run migrate:latest
npm run seed:run
npm run test:db
npm run dev
```

## Frontend Setup

```bash
cd FE
npm install
npm start
```
