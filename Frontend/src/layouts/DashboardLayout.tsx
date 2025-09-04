import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';

const DashboardLayout = () => {
  return (
    // Add the aurora-container here to apply the theme to all authenticated pages
    <div className="aurora-container min-h-screen">
      <DashboardNavbar />
      {/* The <main> tag no longer needs padding, allowing content to be full-width */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;