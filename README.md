# Job Tracker

A simple, polished job application tracker with a Kanban-style board.

- **Backend**: Java 21, Spring Boot 3, Spring Web, Spring Data MongoDB, Maven
- **Frontend**: React (Vite), Tailwind CSS

## Features

- Kanban board with columns for Saved, Applied, Interview, Offer, Rejected
- Create, edit, delete, search, and filter job applications
- Drag-and-drop or dropdown to change status
- Salary range (min/max/currency), tags, notes, job URL, applied date
- Top-level stats: total applications, interviews, offers, interview rate

No authentication — this is a single-user, local prototype.

## Prerequisites

- Java 21+
- Maven 3.9+ (or use the included setup with your own local Maven)
- Node.js 18+
- A running MongoDB instance (local or Atlas)

## 1. Configure MongoDB

Set the `MONGODB_URI` environment variable before starting the backend. If not set,
it defaults to `mongodb://localhost:27017/jobtracker`.

```bash
export MONGODB_URI="mongodb://localhost:27017/jobtracker"
```

For MongoDB Atlas, use your Atlas connection string instead, e.g.:

```bash
export MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/jobtracker"
```

## 2. Run the backend

```bash
cd backend
mvn spring-boot:run
```

The API starts on **http://localhost:8080**. On first run, if the `applications`
collection is empty, sample job applications are seeded automatically.

Key endpoints:

| Method | Path                          | Description                  |
|--------|-------------------------------|-------------------------------|
| GET    | `/api/applications`           | List applications (supports `search`, `status` query params) |
| GET    | `/api/applications/{id}`      | Get a single application      |
| POST   | `/api/applications`           | Create an application         |
| PUT    | `/api/applications/{id}`      | Update an application         |
| PATCH  | `/api/applications/{id}/status` | Update only the status      |
| DELETE | `/api/applications/{id}`      | Delete an application         |
| GET    | `/api/applications/stats`     | Aggregate stats               |

## 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The app starts on **http://localhost:5173** and proxies `/api` requests to the
backend on port 8080 (see `vite.config.js`).

## Project structure

```
backend/
  src/main/java/com/jobtracker/
    controller/   REST controllers
    service/      Business logic
    repository/   Spring Data MongoDB repositories
    model/        MongoDB documents
    dto/          Request/response DTOs + mapper
    exception/    Global error handling
    config/       CORS, Mongo auditing, data seeding
frontend/
  src/
    api/          Fetch wrappers for the backend API
    components/   Kanban board, cards, modal, toolbar, stats
    utils/        Formatting helpers and shared constants
```

## Notes

- Salary is stored as a nested document (`{ min, max, currency }`) and tags as a string array.
- Validation errors from the backend are surfaced in the create/edit form.
- This project intentionally avoids authentication, payments, AI features, and
  extra infrastructure (no Kafka, Redux, GraphQL, microservices) to stay simple.
