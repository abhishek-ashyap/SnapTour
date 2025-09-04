SnapTour
Create and share beautiful, interactive product demos in seconds.

Description
SnapTour is a full-stack web application designed to empower users to build engaging, step-by-step product tours without writing any code. Inspired by platforms like Arcade, this project provides a miniature yet powerful version of a collaborative product demo platform. Users can sign up, create tours by uploading screenshots, add descriptive captions, and share their interactive stories with a public or private link.

This project was built from scratch to demonstrate a modern full-stack architecture, featuring a secure Node.js REST API and a dynamic, beautifully animated React frontend.

Features
Secure Authentication: Full user registration and login system using JSON Web Tokens (JWT), including a "Forgot Password" flow.

Interactive Tour Editor: A comprehensive three-column editor to create, read, update, and delete tours and their individual steps.

Step Management: Easily add, delete, and modify steps, including captions and placeholder images.

Public & Private Sharing: Control the visibility of your tours with a "Make Public" toggle, enabling link-based sharing.

Dedicated Public Viewer: A clean, read-only interface for viewing shared tours, complete with step-by-step navigation.

Responsive & Attractive UI: A modern, fully responsive user interface built with Tailwind CSS and gracefully animated with Framer Motion, featuring a consistent "glassmorphism" theme.

Dashboard: A central hub for users to view all their created demos, with mocked analytics for engagement.

Basic Screen Recording: Demonstrates the use of the browser's MediaRecorder API to initiate screen capture.

Tech Stack
Frontend
React: A JavaScript library for building user interfaces.

Vite: A next-generation frontend build tool for extremely fast development.

TypeScript: Adds static typing to JavaScript for improved code quality and maintainability.

Tailwind CSS: A utility-first CSS framework for rapid, custom UI development.

Framer Motion: A production-ready motion library for creating fluid animations.

Axios: A promise-based HTTP client for making API requests to the backend.

React Router: For declarative, client-side routing.

Backend
Node.js: A JavaScript runtime environment for the server.

Express: A minimal and flexible web application framework for Node.js.

TypeScript: For type-safe backend code.

PostgreSQL: A powerful, open-source object-relational database system.

JWT (jsonwebtoken): For implementing secure JSON Web Token authentication.

bcryptjs: For securely hashing user passwords.

pg: A Node.js module for interfacing with the PostgreSQL database.

Deployment
Vercel: For hosting the frontend application.

Render: For hosting the backend server and the PostgreSQL database.

Installation
To get this project running on your local machine, follow these steps.

Clone the repository:

Bash

git clone https://github.com/abhishek-ashyap/SnapTour
cd SnapTour
Backend Setup:

Bash

# Navigate to the backend directory
cd Backend

# Install dependencies
npm install

# Create a .env file and add the following variables
# (see .env.example)
Create a .env file in the backend directory and add the following:

Code snippet

PORT=5001
DATABASE_URL="postgresql://YOUR_POSTGRES_USER:YOUR_PASSWORD@localhost:5432/snaptour_db"
JWT_SECRET="YOUR_SUPER_SECRET_KEY"
Set up a local PostgreSQL database named snaptour_db.

Run the database migrations:

Bash

psql -d snaptour_db -f src/db/migrations.sql
psql -d snaptour_db -f src/db/migrations_02.sql
Frontend Setup:

Bash

# Navigate to the frontend directory from the root
cd frontend

# Install dependencies
npm install
Usage
To run the application for local development, you'll need to run both the backend and frontend servers simultaneously in two separate terminals.

Run the Backend Server:

Bash

# From the /backend directory
npm run dev
The backend will be available at http://localhost:5001.

Run the Frontend Server:

Bash

# From the /frontend directory
npm run dev
The frontend will be available at http://localhost:5173.

Project Structure
This project is a monorepo containing two main packages: frontend and backend.

/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Handles request logic
│   │   ├── db/             # Database connection & migrations
│   │   ├── middleware/     # Auth and validation middleware
│   │   └── routes/         # API route definitions
│   └── server.ts         # Main server entry point
└── frontend/
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── layouts/        # Page structure components (e.g., Navbar)
    │   ├── pages/          # Top-level page components
    │   ├── services/       # API call logic (Axios)
    │   └── App.tsx         # Main router setup
    └── ...
API Endpoints
All protected routes require a Bearer <token> in the Authorization header.

Method	Endpoint	Description	Protected
POST	/api/auth/register	Register a new user	No
POST	/api/auth/login	Log in a user and get a JWT	No
POST	/api/auth/forgot-password	Start the password reset process	No
POST	/api/auth/reset-password/:token	Finalize password reset	No
GET	/api/public/tours/:id	Get a single public tour and its steps	No
GET	/api/tours	Get all tours for the logged-in user	Yes
POST	/api/tours	Create a new tour	Yes
GET	/api/tours/:id	Get a single tour owned by the user	Yes
PUT	/api/tours/:id	Update a tour's details	Yes
DELETE	/api/tours/:id	Delete a tour	Yes
POST	/api/tours/:tourId/steps	Add a new step to a tour	Yes
PUT	/api/tours/:tourId/steps/:stepId	Update a specific step	Yes
DELETE	/api/tours/:tourId/steps/:stepId	Delete a specific step	Yes
Demo
Check out the live project here: https://snap-tour.vercel.app/

Screenshots
Contributing
Contributions are welcome! If you have suggestions for improvements, please follow these steps:

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

License
This project is licensed under the MIT License. See the LICENSE file for more information.