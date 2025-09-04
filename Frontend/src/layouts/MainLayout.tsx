import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      {/* Add pt-16 (padding-top: 4rem) to push content below the h-16 navbar */}
      <main className="pt-16">
        <Outlet /> 
      </main>
    </div>
  );
};

export default MainLayout;