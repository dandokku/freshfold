import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaMedium, FaWhatsappSquare, FaSoap, FaArrowRight, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/dandokku', label: 'Github' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/daniel-ajide-243b42260/', label: 'LinkedIn' },
    { icon: FaMedium, href: 'https://medium.com/@kamidandokku', label: 'Medium' },
    { icon: FaWhatsappSquare, href: 'https://wa.me/2348104618586', label: 'WhatsApp' }
  ];

  const pageLinks = [
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Our Services' },
    { to: '/prices', label: 'Pricing' },
    { to: '/contact', label: 'Contact' }
  ];

  const supportLinks = [
    { to: '/faq', label: 'FAQ' },
    { to: '/map', label: 'Find Us' },
    { to: '/terms', label: 'Terms of Service' },
    { to: '/privacy', label: 'Privacy Policy' }
  ];

  return (
    <footer className='relative bg-gradient-to-br from-gray-50 via-white to-secondary-50 overflow-hidden'>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-secondary-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-secondary-200 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              {/* Logo */}
              <Link to='/' className='group inline-block'>
                <div className="flex items-center space-x-2">
                  <span className='text-4xl font-black text-gray-800 flex items-center tracking-tight'>
                    <span className='text-secondaryColor relative'>
                      Fresh
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondaryColor to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </span>
                    <span className='text-secondaryColor flex items-center ml-1'>
                      F 
                      <FaSoap className="mx-1 text-secondaryColor transform group-hover:rotate-12 transition-transform duration-500" size={32} /> 
                      ld
                    </span>
                  </span>
                </div>
              </Link>

              {/* Tagline */}
              <div className="space-y-4">
                <h3 className='font-bold text-2xl text-gray-800 leading-tight'>
                  Laundry made <span className="text-secondaryColor">effortless</span>
                </h3>
                <p className='text-textColor text-base leading-relaxed'>
                  Experience premium laundry solutions designed for your modern lifestyle. Quality, convenience, and care in every wash.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-textColor">
                  <FaMapMarkerAlt className="text-secondaryColor flex-shrink-0" />
                  <span>123 Laundry Street, Fresh City, FC 12345</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-textColor">
                  <FaPhone className="text-secondaryColor flex-shrink-0" />
                  <span>+234 810 461 8586</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-textColor">
                  <FaEnvelope className="text-secondaryColor flex-shrink-0" />
                  <span>jesulobadaniel1@gmail.com</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Follow Us</h4>
                <div className='flex items-center space-x-4'>
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className='group relative w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:border-secondaryColor hover:bg-secondaryColor transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1'
                    >
                      <social.icon 
                        size={20} 
                        className='text-textColor group-hover:text-white transition-colors duration-300' 
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className='font-bold text-lg text-gray-800 relative'>
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-secondaryColor rounded-full"></div>
              </h4>
              <div className='space-y-3'>
                {pageLinks.map((link, index) => (
                  <Link 
                    key={index}
                    to={link.to} 
                    className='group flex items-center space-x-2 text-textColor hover:text-secondaryColor transition-all duration-300 py-1'
                  >
                    <span className="w-1 h-1 bg-textColor group-hover:bg-secondaryColor rounded-full transition-colors duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="space-y-6">
              <h4 className='font-bold text-lg text-gray-800 relative'>
                Support
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-secondaryColor rounded-full"></div>
              </h4>
              <div className='space-y-3'>
                {supportLinks.map((link, index) => (
                  <Link 
                    key={index}
                    to={link.to} 
                    className='group flex items-center space-x-2 text-textColor hover:text-secondaryColor transition-all duration-300 py-1'
                  >
                    <span className="w-1 h-1 bg-textColor group-hover:bg-secondaryColor rounded-full transition-colors duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-6">
              <h4 className='font-bold text-lg text-gray-800 relative'>
                Stay Updated
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-secondaryColor rounded-full"></div>
              </h4>
              <p className="text-textColor text-sm leading-relaxed">
                Get the latest offers, tips, and updates delivered straight to your inbox.
              </p>
              
              <form onSubmit={handleSubscribe} className='space-y-4'>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    className='w-full outline-none border border-gray-200 p-4 rounded-xl focus:border-secondaryColor focus:ring-2 focus:ring-secondaryColor/20 transition-all duration-300 bg-white shadow-sm'
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <FaEnvelope className="text-gray-400 w-4 h-4" />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className={`group w-full p-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 ${
                    isSubscribed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-secondaryColor text-white hover:bg-secondaryColor/90'
                  }`}
                >
                  {isSubscribed ? (
                    <span>✓ Subscribed!</span>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>

              {/* Trust Badges */}
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Spam-free</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-textColor">
                <span>&copy; 2024 FreshFold. All rights reserved.</span>
                <div className="hidden md:flex items-center space-x-4">
                  <Link 
                    to='/privacy' 
                    className='hover:text-secondaryColor transition-colors duration-300 underline-offset-4 hover:underline'
                  >
                    Privacy Policy
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link 
                    to='/terms' 
                    className='hover:text-secondaryColor transition-colors duration-300 underline-offset-4 hover:underline'
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
              
              {/* <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Made with</span>
                <div className="w-4 h-4 bg-red-500 rounded transform rotate-45 relative">
                  <div className="absolute -top-2 -left-1 w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="absolute -top-2 -right-1 w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
                <span>for clean clothes</span>
              </div> */}
            </div>
            
            {/* Mobile Legal Links */}
            <div className="md:hidden flex justify-center items-center space-x-4 mt-4 pt-4 border-t border-gray-100 text-sm">
              <Link 
                to='/privacy' 
                className='text-textColor hover:text-secondaryColor transition-colors duration-300'
              >
                Privacy Policy
              </Link>
              <span className="text-gray-300">|</span>
              <Link 
                to='/terms' 
                className='text-textColor hover:text-secondaryColor transition-colors duration-300'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;