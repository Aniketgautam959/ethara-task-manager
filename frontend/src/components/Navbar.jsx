import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap">Ethara Task Manager</span>
        </Link>
        <div className="flex items-center lg:order-2 space-x-4">
          <span className="text-gray-600">Hi, {user.name} ({user.role})</span>
          <button onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2">
            Logout
          </button>
        </div>
        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Link to="/" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">Dashboard</Link>
            </li>
            <li>
              <Link to="/projects" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">Projects</Link>
            </li>
            <li>
              <Link to="/tasks" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">Tasks</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
