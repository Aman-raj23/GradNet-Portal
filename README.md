# GradNet – Alumni Engagement Platform (Prototype)

A full-stack prototype for an alumni engagement platform built with React + TailwindCSS (frontend) and Node.js/Express (backend). Uses mock data with a structure ready to expand to real databases (MongoDB or Supabase/Postgres).

## Tech Stack
- Frontend: React, Vite, TailwindCSS, Shadcn/ui, Lucide Icons, Recharts
- Backend: Node.js (Express), JWT-based auth (mock), In-memory mock data

## Design System
- Primary: #003366 (Deep Navy)
- Accent: #FFD700 (Gold)
- Background: #F4F4F4 (Light gray)
- Font: Inter (Google Fonts)
  

## Monorepo Structure
```
frontend/
backend/
```

## Quick Start

### Prerequisites
- Node.js 18+

### Frontend
```
cd frontend
npm install
npm run dev
```
- App runs at: http://localhost:5173

### Backend
```
cd backend
npm install
npm run dev
```
- API runs at: http://localhost:5000

### Mock Accounts
Use the mock login with email and role selection.
- Admin: admin@gradnet.edu (role: admin)
- Alumni: raj@alumni.edu (role: alumni)
- Student: john@student.edu (role: student)
- Employer: hr@company.com (role: employer)
- Institute: dean@college.edu (role: institute)

No passwords required in prototype; token is issued based on email/role.

## Environment Variables
Create a `.env` in `backend/`:
```
PORT=5000
JWT_SECRET=dev_secret_change_me
```

## Notes
- This is a prototype using mock data and minimal auth.
- File types: React components/pages use `.jsx` as requested.
- The backend uses `.js` files for Node (recommended).
  

## Scripts

- Frontend
  - `npm run dev` – start Vite dev server
  - `npm run build` – production build
  - `npm run preview` – preview built app

- Backend
  - `npm run dev` – start dev server with nodemon
  - `npm start` – start production server

## Next Steps
- Replace mock data and in-memory stores with MongoDB or Supabase
- Harden auth flows and role policies
- Connect AI features to real LLM endpoints
- Add e2e tests
