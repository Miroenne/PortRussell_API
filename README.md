# Port Russell API

swagger link : https://portrussell-api.onrender.com/api-docs.json

A Node.js REST API built with Express and MongoDB (Mongoose) to manage:

- users and authentication
- catways
- reservations

The project also exposes OpenAPI documentation with Swagger UI.

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Swagger (`swagger-jsdoc`, `swagger-ui-express`)

## Project Structure

```text
.
├── app.js
├── bin/www
├── controllers/
├── db/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
└── utils/
```

## Prerequisites

- Node.js 18+ (recommended)
- npm
- A reachable MongoDB instance (Atlas or local)

## Installation

```bash
npm install
```

## Environment Variables

The app expects environment variables from files in the `env/` folder.

Required values:

- `PORT`: server port
- `DB_URL`: MongoDB connection string
- `SECRET_KEY`: JWT signing secret

Optional values used in your env files:

- `NODE_ENV`
- `APP_NAME`
- `API_URL`

Example `env/.env.dev`:

```env
NODE_ENV=development
APP_NAME=PortRussellAPI
API_URL=127.0.0.1
PORT=3000
DB_URL=mongodb://localhost:27017/port_russell
SECRET_KEY=replace_with_a_strong_secret
```

## Running the API

Development:

```bash
npm run dev
```

Production-like mode (with nodemon + prod env file):

```bash
npm run prod
```

Standard start:

```bash
npm start
```

## Swagger / OpenAPI

After startup:

- Swagger UI: `http://localhost:3000/api-docs`
- Raw OpenAPI JSON: `http://localhost:3000/api-docs.json`

## Authentication

Authentication is JWT-based.

Login behavior:

- `POST /users/login` returns the authenticated user
- also sets an HTTP-only cookie named `token`

Protected routes use `middlewares/private.js` and accept token from:

- cookie `token`
- header `x-access-token`
- header `Authorization: Bearer <token>`

On valid protected requests, a refreshed token is returned in the `Authorization` response header.

## Data Models

### User

- `userName` (string, required)
- `email` (string, required, unique, lowercase)
- `password` (string, minimum length 8, hashed before save)

### Catway

- `catwayNumber` (string, required, unique)
- `catwayType` (string, required, enum: `long` | `short`)
- `catwayState` (string, required)

### Reservation

- `catwayNumber` (string, required)
- `clientName` (string, required)
- `boatName` (string, required)
- `startDate` (date, required)
- `endDate` (date, required)

## API Endpoints

### Users

| Method | Path            | Auth |
| ------ | --------------- | ---- |
| POST   | `/users/login`  | No   |
| POST   | `/users/logout` | Yes  |
| POST   | `/users`        | No   |
| GET    | `/users`        | Yes  |
| GET    | `/users/:email` | Yes  |
| PUT    | `/users/:email` | Yes  |
| DELETE | `/users/:email` | Yes  |

### Catways

| Method | Path           | Auth |
| ------ | -------------- | ---- |
| POST   | `/catways`     | No   |
| GET    | `/catways`     | No   |
| GET    | `/catways/:id` | No   |
| PUT    | `/catways/:id` | No   |
| DELETE | `/catways/:id` | No   |

### Reservations

| Method | Path                                       | Auth |
| ------ | ------------------------------------------ | ---- |
| POST   | `/catways/:id/reservations`                | No   |
| GET    | `/catways/:id/reservations`                | No   |
| GET    | `/catways/:id/reservations/:idReservation` | No   |
| PUT    | `/catways/:id/reservations/:idReservation` | No   |
| DELETE | `/catways/:id/reservations/:idReservation` | No   |

## Quick cURL Examples

Create a user:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"userName":"alice","email":"alice@example.com","password":"Password123"}'
```

Login:

```bash
curl -i -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"Password123"}'
```

Create a catway:

```bash
curl -X POST http://localhost:3000/catways \
  -H "Content-Type: application/json" \
  -d '{"catwayNumber":"A1","catwayType":"long","catwayState":"available"}'
```

Create a reservation:

```bash
curl -X POST http://localhost:3000/catways/A1/reservations \
  -H "Content-Type: application/json" \
  -d '{"clientName":"John Doe","boatName":"Sea Breeze","startDate":"2026-05-01","endDate":"2026-05-03"}'
```

## Notes

- The `env/` directory is ignored by git in this project (`.gitignore`).
- Do not commit real secrets to repository history.
