# Project Name: Note Board / Todo App
## Brief Description:

A simple note-taking application where users can:

Create notes with title, content, color, status, and optional image.

Edit or delete existing notes.

Mark notes as pending or completed.

View notes with proper color-coding and status badges.

Built using MERN stack (MongoDB, Express, React, Node.js) with file uploads handled via Multer, and color picking via react-color.

# Setup Instructions

## Clone the repository:
git clone <your-github-repo-link>

## Navigate to the backend folder:
cd backend

## Install dependencies:
npm install

## Setup .env file in backend:
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

## Run the backend server:
npm start

## Navigate to the frontend folder:
cd frontend

## Install frontend dependencies:
npm install

## Run the frontend:
npm run dev

## Open the browser at:
http://localhost:5173

# Approach / Features:
React Frontend: Functional components with hooks (useState, useEffect) and React Router for navigation.
Express Backend: REST API with CRUD operations.
MongoDB: Stores notes with fields: title, content, color, status, image, isPinned.
File Uploads: Images uploaded with Multer and served statically.
Status Management: Toggle notes as pending/completed with a single click.
UI / Styling: TailwindCSS + DaisyUI for cards, forms, modals, and buttons.
