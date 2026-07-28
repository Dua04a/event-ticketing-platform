# StageDoor

## Overview
StageDoor is a full-stack web application that lets users browse events, book tickets, and receive a QR code for entry. Organizers can create and manage events, while admins review and approve requests from users who want organizer access.
The project was built to practice full-stack development with the MERN stack, going beyond what I covered in my graduation project and coop training.

---

## Features
- Register / login with JWT authentication
- Browse events and book tickets
- Unique QR code generated for each ticket
- Booking capacity is checked to prevent overbooking
- English / Arabic toggle with proper RTL layout
- Responsive user interface
- Event management

---

## User Roles & Access Control
- **Attendee** – browses events, books tickets, views their own tickets
- **Organizer** – creates and manages events
- **Admin** – reviews and approves/rejects organizer requests

Organizer access isn't picked at signup. Users start as attendees and submit a request (organization name + contact info) that an admin has to approve first. Role checks are enforced on the backend, not just hidden in the UI.

---

## Technologies Used
- React
- React Router
- Tailwind CSS
- Node.js
- Express
- MongoDB (Mongoose)
- JWT / bcrypt

---

## Screenshots
### Home Page
<img width="2880" height="1240" alt="image" src="https://github.com/user-attachments/assets/bf7cc373-d08c-4480-b932-c21314b31486" />

### Login Page
<img width="2880" height="1314" alt="image" src="https://github.com/user-attachments/assets/cfbd0cc0-4da5-4025-889e-4bb3e25d8d28" />

### Ticket Booking (QR Code)
<img width="782" height="886" alt="image" src="https://github.com/user-attachments/assets/578aa6a5-903b-409d-89a2-b44feb783199" />

### Admin Dashboard
<img width="2866" height="830" alt="image" src="https://github.com/user-attachments/assets/10e5bb72-9e08-4bc1-81de-a25aa9bfd3c4" />

### Arabic View (RTL)
<img width="2880" height="1382" alt="image" src="https://github.com/user-attachments/assets/fe368912-8a7a-461e-828f-5d6f9df5fcb5" />


---

## How to Run
1. Clone the repository.
2. Set up a `.env` file inside `backend/` with `MONGO_URI`, `JWT_SECRET`, and `PORT`.
3. Run the backend:
```bash
cd backend
npm install
npm run dev
```
4. Run the frontend:
```bash
cd frontend
npm install
npm run dev
```
