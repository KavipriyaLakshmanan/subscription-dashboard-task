// components/Navbar.jsx
import { useAuth } from '../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavButton from './NavButton';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Safe admin check
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const isActiveRouteOrChild = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold flex items-center hover:scale-105 transition-transform duration-200"
          >
            <span className="hidden sm:block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              SubDashboard
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                <NavButton 
                  to="/dashboard" 
                  icon="" 
                  isActive={isActiveRoute('/dashboard')}
                >
                  Dashboard
                </NavButton>
                
                <NavButton 
                  to="/plans" 
                  icon="" 
                  isActive={isActiveRoute('/plans')}
                >
                  Plans
                </NavButton>
                
                {isAdmin && (
                  <NavButton 
                    to="/admin" 
                    icon="" 
                    isActive={isActiveRouteOrChild('/admin')}
                  >
                    Admin
                  </NavButton>
                )}

                {/* User & Logout */}
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/30">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-red-500/80 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/30"
                  >
                    <span className="hidden sm:block">Logout</span>
                  </button>
                </div>
                <div className="flex flex-end items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border border-white/40">
                    <span className="text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden md:block text-sm">
                    <div className="font-semibold">{user?.name}</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavButton 
                  to="/login" 
                  icon="" 
                  isActive={isActiveRoute('/login')}
                >
                  Login
                </NavButton>
                
                <NavButton 
                  to="/register" 
                  icon="" 
                  isActive={isActiveRoute('/register')}
                >
                  Register
                </NavButton>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;