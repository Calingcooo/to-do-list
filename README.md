# To-Do List App

This is a fullstack To-Do List app.  
Backend: AdonisJS  
Frontend: Angular  
Database: PostgreSQL

You can run everything using Docker.

---

## Requirements

- Docker
- Docker Compose

---

## Setup

1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

2. Start the app with Docker

```bash
   docker compose up --build
```

## This will do the following:

- Start PostgreSQL on port 5432
- Start Backend on port 3333
- Start Frontend on port 4200

## Access

- Frontend: http://localhost:4200
- Backend API: http://localhost:3333
- Database: localhost:5432
  - user: app_user
  - password: secret
  - database: app_db

## Stop the app

```bash
docker compose down
```
