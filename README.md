# StageDoor - Event Ticketing Platform

A full-stack web app I built where people can browse events, book tickets, and get a QR code for entry. Organizers can create events, and there's an approval system so not just anyone can register as an organizer.

This was a personal project I built to practice full-stack development beyond what I did in my graduation project and coop training.

## What it does

- Register / login with JWT authentication
- Three user roles: attendee, organizer, admin
- Attendees browse events and book tickets, each ticket gets a unique QR code
- Booking checks capacity so events can't be overbooked
- To become an organizer, a user submits a request that an admin has to approve first (not just a role you pick at signup)
- English/Arabic toggle with proper RTL layout
- Custom design instead of a generic template - the event cards are styled like actual ticket stubs

## Built with

**Frontend:** React, React Router, Tailwind CSS, Axios
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt

## Project structure
## Running it locally

Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

You'll need a `.env` file in `backend/` with `MONGO_URI`, `JWT_SECRET`, and `PORT`.

## About me

Duaa Alamri, Software Engineering student at University of Hafr Al Batin.
