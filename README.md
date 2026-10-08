# StageDoor

I built StageDoor to practice frontend design and implement QR-code ticketing. The app lets attendees discover events, book tickets, and receive a unique QR code for entry. Organizers can create events, and admins can approve organizer requests.

The app supports English and Arabic, including right-to-left layout.

## Screenshot

![StageDoor home page](https://github.com/user-attachments/assets/bf7cc373-d08c-4480-b932-c21314b31486)

## Features

- Browse and filter events
- Book tickets with a unique QR code
- Create and manage events as an approved organizer
- Request organizer access
- Manage organizer requests as an admin
- Switch between English and Arabic

## Tech stack

React, React Router, Tailwind CSS, Node.js, Express, MongoDB, and JWT.

## Run locally

1. Install dependencies in `frontend/` and `backend/` with `npm install`.
2. Create `backend/.env` and set `MONGO_URI`, `JWT_SECRET`, and `PORT`.
3. Start the backend from `backend/`:

   ```bash
   npm run dev
   ```

4. Start the frontend from the project root:

   ```bash
   npm run dev
   ```

The frontend uses `http://localhost:5050/api` by default. Set `VITE_API_URL` in `frontend/.env` to use another backend URL.
