# Hotel & Rooms Next.js App

This project is a small example application built with **Next.js 15**, **TypeScript** and **MongoDB**. It allows you to manage a list of hotels and the rooms associated with each hotel.

## Features

- **Hotels list** – view existing hotels, edit their name or city and navigate to their rooms.
- **Rooms list** – list rooms for a specific hotel with a simple search field.
- **Add rooms** – create new rooms for a hotel using a modal form.
- **Delete rooms** – remove a room from a hotel directly in the rooms table.
- **Seed data** – on first start the database is populated with a few hotels and rooms if collections are empty.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file and provide your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://user:password@localhost:27017/hotels
   ```

### Docker Compose

You can run the database and application together using Docker Compose. Below is an example `docker-compose.yml` file:

```yaml
version: '3'
services:
  mongo:
    image: mongo:7
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: user
      MONGO_INITDB_ROOT_PASSWORD: password
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://user:password@mongo:27017/hotels
    depends_on:
      - mongo
    command: npm run start
```

Run the application with:

```bash
docker-compose up --build
```

The web interface will be available at [http://localhost:3000](http://localhost:3000).

### Seed Data

When the server starts, it checks whether the `hotels` collection is empty. If it is, the script located at [`src/lib/seed.ts`](src/lib/seed.ts) inserts five hotels, each with a few rooms, into the database.

## Scripts

- `npm run dev` – start the development server.
- `npm run build` – build the production bundle.
- `npm run start` – start the built app.
- `npm run lint` – run ESLint.

