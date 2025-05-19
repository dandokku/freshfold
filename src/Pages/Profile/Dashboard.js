import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { MdOutlineAccountCircle, MdOutlineEdit, MdOutlineHistory } from "react-icons/md";
import { FaSoap, FaCog, FaChevronDown, FaSignOutAlt, FaTrash } from 'react-icons/fa';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setUserSignOut } from '../Features/userSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const logOutUser = () => {
    queryClient.removeQueries("user");
    dispatch(setUserSignOut());
    localStorage.removeItem("user-jwt");
  };

  // Navigation links
  const navLinks = [
    { path: "/profile", icon: <MdOutlineAccountCircle size={20} />, label: "My Account" },
    { path: "/profile/editprofile", icon: <MdOutlineEdit size={20} />, label: "Edit Account" },
    { path: "/profile/history", icon: <MdOutlineHistory size={20} />, label: "Booking History" }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="text-secondary-600">Fresh</span>
                <span className="flex items-center text-secondary-600 ml-1">
                  F <FaSoap className="mx-1 text-secondary-600" size={20} /> ld
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-white shadow text-secondary-600' : 'text-gray-600 hover:text-secondary-600'}`
                  }
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* User Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-600 hover:text-secondary-600 focus:outline-none transition-colors"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <FaCog className="text-secondary-600 mr-1" size={18} />
                <span className="hidden md:inline ml-1">Settings</span>
                <FaChevronDown className={`ml-1 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} size={14} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.firstName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={logOutUser}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FaSignOutAlt className="mr-2 text-gray-500" />
                    Logout
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    <FaTrash className="mr-2" />
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-secondary-600 focus:outline-none"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-gray-100 text-secondary-600' : 'text-gray-600 hover:text-secondary-600 hover:bg-gray-50'}`
              }
            >
              <span className="mr-3">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
          
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center px-3 py-2">
              <div className="text-sm font-medium text-gray-900">{user.firstName}</div>
              <div className="ml-auto text-xs text-gray-500">{user.email}</div>
            </div>
            <button
              onClick={logOutUser}
              className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-secondary-600 hover:bg-gray-50"
            >
              <FaSignOutAlt className="mr-3 text-gray-500" />
              Logout
            </button>
            <button
              className="flex items-center w-full px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50"
            >
              <FaTrash className="mr-3" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Dashboard;