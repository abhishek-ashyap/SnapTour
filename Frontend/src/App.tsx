import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import EditorPage from './pages/EditorPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PublicTourViewer from './pages/PublicTourViewer'; // Import the viewer

function App() {
  return (
    <Routes>
      {/* Public routes with Main Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Route>

      {/* Public Viewer Route (No Layout) */}
      <Route path="/view/tour/:tourId" element={<PublicTourViewer />} />

      {/* Protected routes with Dashboard Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/editor/new" element={<EditorPage />} />
          <Route path="/editor/:tourId" element={<EditorPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;