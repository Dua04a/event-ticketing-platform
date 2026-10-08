# StageDoor

I built StageDoor to practice frontend design and implement QR-code ticketing. The app lets attendees discover events, book tickets, and receive a unique QR code for entry. Organizers can create events, and admins can approve organizer requests.

The app supports English and Arabic, including right-to-left layout.

## Screenshot

StageDoor home page
<img width="2880" height="1622" alt="Pasted Graphic 6" src="https://github.com/user-attachments/assets/a9c5a446-0c26-497e-893f-f62b07ba1ff1" />


Register page 
<img width="2872" height="1620" alt="Pasted Graphic 2" src="https://github.com/user-attachments/assets/1dd1762e-ea7a-4955-8b90-7005e99aca6a" />


Request to create event 
<img width="2880" height="1622" alt="Pasted Graphic 3" src="https://github.com/user-attachments/assets/eb1aef65-5968-4112-a34f-621f0758caa8" />


Ticket Booking (QR Code) 
<img width="2880" height="1624" alt="Pasted Graphic 4" src="https://github.com/user-attachments/assets/cdefe561-ef26-4b58-9dca-18211a0f2b02" />


My tickets page <img width="2880" height="1622" alt="Pasted Graphic 5" src="https://github.com/user-attachments/assets/814ab227-57b2-4b87-b453-2ff9d06d465a" />






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
