import { Link, useNavigate } from 'react-router-dom';

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    // This updated className creates the transparent "glass" effect
    <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/dashboard" className="text-xl font-bold text-white">
            My Demos
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-md bg-slate-700 hover:bg-slate-600 px-3.5 py-2 text-sm font-medium text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;