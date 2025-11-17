import { Link } from 'react-router-dom';

const NavButton = ({ to, children, icon, isActive }) => (
  <Link 
    to={to} 
    className={`
      relative flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold 
      transition-all duration-300 group border-2
      ${
        isActive
          ? 'bg-white text-blue-600 border-white shadow-lg scale-105'
          : 'text-white border-transparent hover:bg-white/10 hover:border-white/30 hover:scale-105'
      }
    `}
  >
    <span className="text-lg">{icon}</span>
    <span>{children}</span>
    
    {/* Active indicator bar */}
    {isActive && (
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-green-400 rounded-full animate-pulse"></div>
    )}
  </Link>
);

export default NavButton;