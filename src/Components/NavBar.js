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
      setIsScrolled(window.scrollY > 20);
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
    setMobileMenuOpen(false);
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
    <>
      <header className={`fixed top-0 w-full z-[99999] transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 py-3' 
          : 'bg-white/90 backdrop-blur-sm py-5 shadow-sm'
      }`}>
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center relative">
          {/* Logo with enhanced styling */}
          <Link to="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
            <div className="relative">
              <span className="text-3xl font-black text-gray-800 flex items-center tracking-tight">
                <span className="text-secondary-600 relative">
                  Fresh
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary-600 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </span>
                <span className="flex items-center text-secondary-600 ml-1 relative">
                  F 
                  <FaSoap className="mx-1 text-secondary-600 transform group-hover:rotate-12 transition-transform duration-300" size={26} /> 
                  ld
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with enhanced styling */}
          <nav className="hidden lg:flex items-center space-x-12">
            <ul className="flex space-x-10">
              {navLinks.map((link, index) => (
                <li key={link.path} className="relative">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => 
                      `relative text-gray-700 hover:text-secondary-600 transition-all duration-300 font-medium text-[15px] py-2 px-1 group ${
                        isActive ? 'text-secondary-600' : ''
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-secondary-600 to-secondary-400 transform transition-all duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}></span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Enhanced User Profile or Sign In */}
            {user.id ? (
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-3 focus:outline-none group hover:bg-gray-50 px-3 py-2 rounded-full transition-all duration-300"
                  aria-haspopup="true"
                  aria-expanded={profileDropdownOpen}
                >
                  <div className="relative">
                    <img 
                      src={ProfileImage} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-secondary-300 transition-all duration-300 shadow-sm" 
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>
                  <AiOutlineDown className={`text-gray-600 transition-all duration-300 group-hover:text-secondary-600 ${
                    profileDropdownOpen ? 'transform rotate-180' : ''
                  }`} />
                </button>

                {/* Enhanced Dropdown */}
                <div className={`absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 ${
                  profileDropdownOpen 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                }`}>
                  <div className="px-6 py-4 bg-gradient-to-r from-secondary-50 to-gray-50 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={ProfileImage} 
                        alt="Profile" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" 
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{user.firstName}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[150px]">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary-600 transition-all duration-200"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <span className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></span>
                      Profile Settings
                    </Link>
                    <button
                      onClick={logOutUser}
                      className="flex items-center w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                    >
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="group relative px-8 py-3 bg-gradient-to-r from-secondary-600 to-secondary-500 text-white rounded-full hover:from-secondary-700 hover:to-secondary-600 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
            )}
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-300 focus:outline-none group"
            aria-label="Toggle menu"
          >
            <div className="relative">
              {mobileMenuOpen ? (
                <AiOutlineClose size={24} className="text-secondary-600 transition-transform duration-300 rotate-90" />
              ) : (
                <HiBars3BottomLeft size={24} className="text-secondary-600 transition-transform duration-300 group-hover:scale-110" />
              )}
            </div>
          </button>
        </div>
      </header>

      {/* Enhanced Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-[99998] transition-all duration-500 ${
        mobileMenuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            mobileMenuOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        
        {/* Mobile Menu Panel */}
        <div className={`absolute top-0 left-0 w-full max-w-sm h-full bg-white shadow-2xl transform transition-transform duration-500 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="h-full flex flex-col">
            {/* Mobile Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-secondary-50 to-gray-50">
              <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-2xl font-black text-gray-800 flex items-center">
                  <span className="text-secondary-600">Fresh</span>
                  <span className="flex items-center text-secondary-600 ml-1">
                    F <FaSoap className="mx-1 text-secondary-600" size={24} /> ld
                  </span>
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/60 transition-all duration-300"
              >
                <AiOutlineClose size={24} className="text-secondary-600" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-2">
                {navLinks.map((link, index) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => 
                      `block px-4 py-4 text-lg font-medium rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'text-secondary-600 bg-secondary-50 border border-secondary-100' 
                          : 'text-gray-700 hover:text-secondary-600 hover:bg-gray-50'
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* Mobile User Section */}
              {user.id ? (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-secondary-50 to-gray-50 rounded-xl mb-4">
                    <div className="relative">
                      <img 
                        src={ProfileImage} 
                        alt="Profile" 
                        className="w-14 h-14 rounded-full object-cover border-3 border-white shadow-md" 
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{user.firstName}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-secondary-600 hover:bg-gray-50 rounded-xl transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></span>
                      Profile Settings
                    </Link>
                    <button
                      onClick={logOutUser}
                      className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                    >
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="block w-full px-6 py-4 bg-gradient-to-r from-secondary-600 to-secondary-500 text-white text-center rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;