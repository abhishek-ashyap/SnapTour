  SnapTour Project README body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"; line-height: 1.6; color: #e6edf3; background-color: #0d1117; padding: 20px; max-width: 800px; margin: 0 auto; } h1, h2, h3 { border-bottom: 1px solid #30363d; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600; } h1 { font-size: 2em; } h2 { font-size: 1.5em; } h3 { font-size: 1.25em; } a { color: #58a6ff; text-decoration: none; } a:hover { text-decoration: underline; } code { font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace; padding: 0.2em 0.4em; margin: 0; font-size: 85%; background-color: rgba(110,118,129,0.4); border-radius: 6px; } pre { padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; background-color: #161b22; border-radius: 6px; } pre code { display: inline; max-width: auto; padding: 0; margin: 0; overflow: visible; line-height: inherit; word-wrap: normal; background-color: transparent; border: 0; } ul, ol { padding-left: 2em; } li { margin-bottom: 0.5em; } table { border-collapse: collapse; width: 100%; margin-top: 1em; margin-bottom: 1em; } th, td { border: 1px solid #30363d; padding: 8px; text-align: left; } th { background-color: #161b22; } img { max-width: 100%; height: auto; } .center { text-align: center; }

SnapTour 🚀
===========

**Create and share beautiful, interactive product demos in seconds.**

[**Live Demo**](https://snap-tour.vercel.app/)

* * *

📜 Description
--------------

SnapTour is a full-stack web application designed to empower users to build engaging, step-by-step product tours without writing any code. Inspired by platforms like Arcade, this project provides a miniature yet powerful version of a collaborative product demo platform. Users can sign up, create tours by uploading screenshots, add descriptive captions, and share their interactive stories with a public or private link.

This project was built from scratch to demonstrate a modern full-stack architecture, featuring a secure Node.js REST API and a dynamic, beautifully animated React frontend.

✨ Features
----------

*   **Secure Authentication:** Full user registration and login system using JSON Web Tokens (JWT), including a "Forgot Password" flow.
*   **Interactive Tour Editor:** A comprehensive three-column editor to create, read, update, and delete tours and their individual steps.
*   **Step Management:** Easily add, delete, and modify steps, including captions and placeholder images.
*   **Public & Private Sharing:** Control the visibility of your tours with a "Make Public" toggle, enabling link-based sharing.
*   **Dedicated Public Viewer:** A clean, read-only interface for viewing shared tours, complete with step-by-step navigation.
*   **Responsive & Attractive UI:** A modern, fully responsive user interface built with Tailwind CSS and gracefully animated with Framer Motion, featuring a consistent "glassmorphism" theme.
*   **Dashboard:** A central hub for users to view all their created demos, with mocked analytics for engagement.
*   **Basic Screen Recording:** Demonstrates the use of the browser's `MediaRecorder` API to initiate screen capture.

💻 Tech Stack
-------------

### Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Deployment

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

🛠️ Installation
----------------

1.  **Clone the repository:**
    
        git clone https://github.com/YourUsername/SnapTour.git
        cd SnapTour
    
2.  **Backend Setup:**
    
        # Navigate to the backend directory
        cd backend
        
        # Install dependencies
        npm install
    
    Create a `.env` file and add the following:
    
        PORT=5001
        DATABASE_URL="postgresql://YOUR_POSTGRES_USER:YOUR_PASSWORD@localhost:5432/snaptour_db"
        JWT_SECRET="YOUR_SUPER_SECRET_KEY"
    
    Set up a local PostgreSQL database named `snaptour_db` and run the migrations from the root project directory:
    
        psql -d snaptour_db -f backend/src/db/migrations.sql
        psql -d snaptour_db -f backend/src/db/migrations_02.sql
    
3.  **Frontend Setup:**
    
        # Navigate to the frontend directory from the root
        cd frontend
        
        # Install dependencies
        npm install
    

🚀 Usage
--------

1.  **Run the Backend Server:**
    
        # From the /backend directory
        npm run dev
    
    The backend will be available at `http://localhost:5001`.
    
2.  **Run the Frontend Server:**
    
        # From the /frontend directory
        npm run dev
    
    The frontend will be available at `http://localhost:5173`.
    

📸 Screenshots
--------------

Login Page

Dashboard

Editor

Public Viewer

🤝 Contributing
---------------

Contributions are welcome! If you have suggestions for improvements, please follow these steps:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

📄 License
----------

This project is licensed under the MIT License. See the `LICENSE` file for more information.