import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Osr = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <section className="flex h-screen">
      <Navbar />

      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white shadow h-full px-4 py-6">
        <h2 className="text-xl font-bold mb-4">OSR-Menu</h2>
        <ul className="space-y-2">
          <li>
            <Link 
              to={"/ors-dashboard"} 
              className={`block px-3 py-2 rounded transition-colors duration-200 ${
                isActive('/ors-dashboard') 
                  ? 'bg-blue-600 text-white font-medium' 
                  : 'hover:bg-gray-600'
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to={"/ors-setups"} 
              className={`block px-3 py-2 rounded transition-colors duration-200 ${
                isActive('/ors-setups') 
                  ? 'bg-blue-600 text-white font-medium' 
                  : 'hover:bg-gray-600'
              }`}
            >
              Setup
            </Link>
          </li>
          <li>
            <Link 
              to={"/admin/bookings"} 
              className={`block px-3 py-2 rounded transition-colors duration-200 ${
                isActive('/admin/bookings') 
                  ? 'bg-blue-600 text-white font-medium' 
                  : 'hover:bg-gray-600'
              }`}
            >
              Bookings
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      {/* <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-semibold">Welcome to OSR</h1>
        <p className="mt-2">This is your main content area.</p>
      </div> */}
    </section>
  );
};

export default Osr;
