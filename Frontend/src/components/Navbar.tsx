import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white tracking-tight">
              SnapTour
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-3.5 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Create your demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;