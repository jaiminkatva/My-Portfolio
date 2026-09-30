# Portfolio API

The API uses feature modules. Each module owns its model, validation, service/controller and routes; shared HTTP concerns live in `common/`, and environment/database setup lives in `config/`.

## Run locally

1. Copy `.env.example` to `.env` and replace the placeholder secrets.
2. Start MongoDB locally or set `MONGODB_URI` to a hosted MongoDB connection string.
3. Run `npm run seed:admin` once to create or update the admin account.
4. Run `npm run seed:projects` once to import the four existing Featured Work projects. This command intentionally updates matching project slugs from the checked-in source content.
5. Run `npm run dev:api` in one terminal and `npm run dev` in another.
6. Open `http://localhost:5173/portfolio/admin` and sign in with the seeded account.

## Routes

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/api/v1/health` | Public | Service/database status |
| POST | `/api/v1/auth/login` | Public, rate limited | Admin sign-in |
| GET | `/api/v1/auth/me` | Admin | Current admin |
| GET | `/api/v1/content` | Public | Published portfolio content |
| PUT | `/api/v1/content` | Admin | Replace portfolio content |
| GET | `/api/v1/projects` | Public | Published projects; add `?featured=true` for the Featured Work book |
| GET | `/api/v1/projects/:slug` | Public | One published project |
| GET | `/api/v1/projects/admin` | Admin | All projects and drafts |
| POST | `/api/v1/projects` | Admin | Create project |
| PATCH | `/api/v1/projects/:id` | Admin | Update project |
| DELETE | `/api/v1/projects/:id` | Admin | Delete project |
| POST | `/api/v1/inquiries` | Public, rate limited | Submit contact enquiry |
| GET | `/api/v1/inquiries` | Admin | List enquiries |
| PATCH | `/api/v1/inquiries/:id` | Admin | Change status or notes |

Protected routes expect `Authorization: Bearer <token>`.
