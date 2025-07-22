import React, { useState, useEffect } from 'react';
import { FaSoap } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineDown } from 'react-icons/ai';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import { Link, NavLink } from 'react-router-dom';
import ProfileImage from "../Assets/Images/user_1177568.png";
import axios from "axios";
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setUserSignOut } from '../Pages/Features/userSlice';

function NavBar() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Fetch user data
  async function getUser() {
    const localData = localStorage.getItem("user-jwt");
    const token = JSON.parse(localData);

    const config = {
      headers: {
        "x-auth-token": token,
      }
    }

    return axios.get("https://freshfoldserver.onrender.com/api/users/me", config);
  }

  const { data } = useQuery("user", getUser, {
    onError: (error) => console.log(error),
  });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logout function
  function logOutUser() {
    queryClient.removeQueries("user");
    dispatch(setUserSignOut());
    localStorage.removeItem("user-jwt");
    setProfileDropdownOpen(false);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen]);

  // Navigation links
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/prices", label: "Prices" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <header className={`fixed top-0 w-full z-[99999999999] transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4 shadow-sm'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="text-secondary-600">Fresh</span>
            <span className="flex items-center text-secondary-600 ml-1">
              F <FaSoap className="mx-1 text-secondary-600" size={24} /> ld
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => 
                    `text-gray-700 hover:text-secondary-600 transition-colors ${isActive ? 'font-medium text-secondary-600' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* User Profile or Sign In */}
          {user.id ? (
            <div className="relative profile-dropdown">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={profileDropdownOpen}
              >
                <img 
                  src={ProfileImage} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200" 
                />
                <AiOutlineDown className={`text-gray-600 transition-transform ${profileDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-md shadow-lg py-2 z-[99999999999999999999] border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.firstName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logOutUser}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="px-6 py-2 bg-secondary-600 text-gray-700  border border-textColor rounded-md hover:bg-secondaryColor hover:text-whiteColor hover:border-transparent transition-colors font-medium"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <AiOutlineClose size={28} className="text-secondary-600" />
          ) : (
            <HiBars3BottomLeft size={28} className="text-secondary-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-white z-40 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="text-secondary-600">Fresh</span>
                <span className="flex items-center text-secondary-600 ml-1">
                  F <FaSoap className="mx-1 text-secondary-600" size={24} /> ld
                </span>
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 focus:outline-none"
            >
              <AiOutlineClose size={28} className="text-secondary-600" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `text-xl text-gray-700 hover:text-secondary-600 transition-colors ${isActive ? 'font-medium text-secondary-600' : ''}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            {user.id ? (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={ProfileImage} 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" 
                  />
                  <div>
                    <p className="font-medium text-gray-900">{user.firstName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block py-3 text-gray-700 hover:text-secondary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={logOutUser}
                  className="block py-3 text-gray-700 hover:text-secondary-600 w-full text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="mt-4 px-6 py-3 bg-secondary-600 text-white rounded-md text-center font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default NavBar;