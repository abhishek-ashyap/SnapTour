# SnapTour 🚀

[![Live Demo](https://img.shields.io/badge/🚀-Live%20Demo-4CAF50?style=for-the-badge)](https://snap-tour.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎬 Project Overview

SnapTour is a full-stack web application that empowers users to create and share beautiful, interactive product demos in seconds. Built with modern web technologies, it provides a seamless experience for both creators and viewers of product tours.

## ✨ Key Features

- **User Authentication**
  - Secure authentication with Supabase
  - JWT-based session management
  - Password reset functionality
  - Protected routes and API endpoints

- **Tour Management**
  - Create and manage multiple tours
  - Intuitive step-by-step tour builder
  - Rich text editing for tour content
  - Public/private sharing options

- **Public Sharing**
  - Generate shareable links
  - Public tour viewer
  - Responsive design for all devices

## 🛠️ Tech Stack

### Frontend

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form

### Backend

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma
- **Authentication**: JWT with Supabase
- **File Storage**: AWS S3
- **Caching**: Redis (optional)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhishek-ashyap/SnapTour.git
   cd SnapTour
   ```

2. **Set up the backend**
   ```bash
   cd Backend
   npm install
   cp .env.example .env
   # Update .env with your credentials
   ```

3. **Set up the frontend**
   ```bash
   cd ../Frontend
   npm install
   cp .env.example .env
   ```

4. **Database setup**
   ```bash
   # Create and seed the database
   cd ../Backend
   npx prisma migrate dev
   ```

5. **Start the development servers**
   ```bash
   # In Backend directory
   npm run dev
   
   # In Frontend directory (new terminal)
   cd ../Frontend
   npm run dev
   ```

## � Project Structure

```
SnapTour/
├── Backend/
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Authentication & other middleware
│   │   ├── routes/       # API route definitions
│   │   └── services/     # Business logic
│   └── prisma/          # Database schema & migrations
│
└── Frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── pages/       # Page components
    │   ├── hooks/       # Custom React hooks
    │   ├── services/    # API services
    │   └── types/       # TypeScript types
    └── public/          # Static assets
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Tours
- `GET /api/tours` - Get public tours
- `GET /api/tours/my-tours` - Get user's tours
- `POST /api/tours` - Create new tour
- `GET /api/tours/:id` - Get single tour
- `PUT /api/tours/:id` - Update tour
- `DELETE /api/tours/:id` - Delete tour

### Steps
- `POST /api/tours/:tourId/steps` - Add step to tour
- `PUT /api/steps/:id` - Update step
- `DELETE /api/steps/:id` - Delete step

## 🔧 Environment Variables

### Backend (`.env`)
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/snaptour"
JWT_SECRET=your_jwt_secret
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### Frontend (`.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Express](https://expressjs.com/) - Backend framework
- [Supabase](https://supabase.com/) - Authentication & Database

---

<div align="center">
  Made with ❤️ by Abhishek Kashyap
</div>
