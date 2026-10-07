# StageDoor Frontend

StageDoor is an event-ticketing app. This folder contains its React frontend.

## Run locally

Install the frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app expects the backend at `http://localhost:5050/api` by default. To use a different backend URL, create a `.env` file in this folder and set:

```env
VITE_API_URL=http://localhost:5050/api
```

## Other commands

```bash
npm run build  # Create a production build
npm run lint   # Check the frontend code
```
