# Assignment: Hotel & Rooms Management App — Next.js 15.3.x+, TypeScript, MUI X, MongoDB (with Auth, Dockerized)
### 4–6 Hour Estimated Delivery — Ensure Full Understanding of Code and Libraries Used (AI Tools Permitted)

## Overview

You will build a **hotel listings web application** using **Next.js 15.3.x+ (app directory)**, **TypeScript**, **MUI X DataGrid**, and **MongoDB** (with authentication) — all code, including server logic, must use TypeScript.
The **MongoDB database will run inside a Docker container**.
All database logic and credentials must remain on the server side (never exposed to the client).
Dummy data must be seeded into the database on first run if collections are empty.

---

## Requirements

### 1. Technology Stack

* **Frontend & Backend:** Next.js 15.3.x+ (with App Router & Server Components)
* **UI:** MUI X (DataGrid)
* **Database:** MongoDB (inside Docker container, with username/password authentication)
* **Language:** TypeScript **(all code)**
* **Containerization:** Docker + Docker Compose
* **Version control:** GitHub (public repo)

### 2. Features

#### Hotels

* `/hotels`: Page listing hotels (Hotel Name, City) using MUI X DataGrid.
* "Add Hotel" button opens a form/modal to add new hotels (fields: Name, City).
* Each hotel row includes a link/button to view rooms (`/hotels/[hotelId]/rooms`).

#### Rooms

* `/hotels/[hotelId]/rooms`: Page listing rooms for the selected hotel (Room Name/Number, Type, Capacity) using MUI X DataGrid.
* "Add Room" button to add rooms to a hotel (fields: Room Name/Number, Type, Capacity).

#### Data Seeding

* On first run, **if hotels and rooms collections are empty**, auto-seed with dummy hotels (5–10) and several dummy rooms per hotel.

#### Data Model

* **Hotels collection:** `{ _id, name, city }`
* **Rooms collection:** `{ _id, hotelId, name, type, capacity }`

#### MongoDB Authentication

* Use environment variables for DB connection string, username, password, database name.
* Example:

  ```env
  MONGODB_USER=myuser
  MONGODB_PASSWORD=mypassword
  MONGODB_DB=hotels_db
  MONGODB_URI=mongodb://myuser:mypassword@mongo:27017/hotels_db
  ```

---

## Project Structure Example

```
/
├── app/
│   └── hotels/
│       ├── page.tsx
│       ├── [hotelId]/rooms/
│           └── page.tsx
├── lib/
│   ├── mongodb.ts         # MongoDB connection (TypeScript, server-side only)
│   └── seed.ts            # Seeding logic for hotels/rooms
├── pages/
│   └── api/
│       ├── hotels/
│       └── rooms/
├── docker-compose.yml
├── Dockerfile
├── .env.example
└── README.md
```

---

## Docker Compose Example

Create a file named `docker-compose.yml` in the project root:

```yaml
version: '3.8'

services:
  mongo:
    image: mongo:7
    restart: always
    container_name: mongo
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGODB_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGODB_PASSWORD}
      MONGO_INITDB_DATABASE: ${MONGODB_DB}
    volumes:
      - mongo_data:/data/db

  app:
    build: .
    container_name: nextjs_app
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    environment:
      - MONGODB_USER=${MONGODB_USER}
      - MONGODB_PASSWORD=${MONGODB_PASSWORD}
      - MONGODB_DB=${MONGODB_DB}
      - MONGODB_URI=mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@mongo:27017/${MONGODB_DB}
    env_file:
      - .env
    volumes:
      - .:/app
    command: "npm run start"

volumes:
  mongo_data:
```

---

## Installation & Run Instructions

### 1. Clone and Prepare

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Environment Variables

* Copy `.env.example` to `.env` and set your values:

```env
MONGODB_USER=myuser
MONGODB_PASSWORD=mypassword
MONGODB_DB=hotels_db
MONGODB_URI=mongodb://myuser:mypassword@mongo:27017/hotels_db
```

### 3. Build and Start with Docker Compose

```bash
docker-compose up --build
```

* The app will be available on [http://localhost:3000](http://localhost:3000)
* MongoDB will be running and seeded with dummy data on first start.

### 4. Stopping

```bash
docker-compose down
```

---

## GitHub Submission

* Ensure your **entire project** is pushed to a public GitHub repository.
* Include:

  * All code (TypeScript only)
  * `docker-compose.yml` and `Dockerfile`
  * `.env.example`
  * `README.md` with setup and run instructions

---

## Bonus Tasks (Optional)

If you want to showcase your skills or go beyond the minimum requirements, you may complete some or all of the following bonus tasks:

* **Edit/Delete functionality:** Allow hotels and rooms to be edited or deleted via the UI.
* **Search, Sorting, and Pagination:** Implement searching, sorting, and pagination on hotel and room tables using MUI X DataGrid features.
* **Responsive & Accessible Design:** Make sure the app works well on mobile and meets accessibility standards.
* **Hotel/Room Details Page:** Add a detail view page for hotels and/or rooms.
* **API Validation:** Use a library such as Zod or Joi to validate all API requests on the server side.
* **Test Coverage:** Add automated tests (unit or integration) for API endpoints, seeding logic, and/or UI components (using tools like Jest, React Testing Library, Cypress, etc).

---

## Commit History Requirements

To demonstrate a professional development workflow, your public GitHub repository **must include multiple, meaningful commits** that reflect the development process. For example:

* Project and dependency setup
* Implement hotels data model and seed script
* Implement basic hotels listing page
* Add rooms data model, API, and seed logic
* Add room management UI
* Docker Compose integration
* Feature enhancements (bonus tasks)
* Add tests and CI
* Documentation updates

Commits should have clear messages and show incremental progress.

---

## Additional Notes

* You may use any dummy data you want for hotels and rooms (no price is needed).
* All MongoDB logic **must remain server-only** (never in client components).
* Use best practices for code organization and validation.
* Feel free to add bonus features (edit/delete, pagination, etc.).

---

**Good luck and happy coding!**
