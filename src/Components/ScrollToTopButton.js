import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    setScrollProgress(scrollPercent);
    
    if (scrollTop > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Main Scroll Button */}
      <div
        className={`fixed bottom-6 right-6 z-[9999] transition-all duration-500 ease-out ${
          isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="group relative w-14 h-14 bg-gradient-to-r from-secondaryColor to-secondary-500 text-whiteColor rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-110 transition-all duration-300 overflow-hidden"
        >
          {/* Progress Ring */}
          <svg 
            className="absolute inset-0 w-full h-full transform -rotate-90" 
            viewBox="0 0 56 56"
          >
            <circle
              cx="28"
              cy="28"
              r="26"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-white/20"
            />
            <circle
              cx="28"
              cy="28"
              r="26"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-white transition-all duration-300"
              strokeDasharray={`${2 * Math.PI * 26}`}
              strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Arrow Icon */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <FaArrowUp 
              size={18} 
              className="transform group-hover:-translate-y-0.5 transition-transform duration-300" 
              aria-hidden="true" 
            />
          </div>
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150"></div>
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-full"></div>
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
          <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            Back to top
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>

      {/* Mobile Optimized Version */}
      <div
        className={`fixed bottom-4 right-4 z-[9999] sm:hidden transition-all duration-500 ease-out ${
          isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="group relative w-12 h-12 bg-gradient-to-r from-secondaryColor to-secondary-500 text-whiteColor rounded-full shadow-lg hover:shadow-xl transform active:scale-95 transition-all duration-200 overflow-hidden"
        >
          {/* Simplified Progress Ring for Mobile */}
          <svg 
            className="absolute inset-0 w-full h-full transform -rotate-90" 
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-white/30"
            />
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-white transition-all duration-300"
              strokeDasharray={`${2 * Math.PI * 22}`}
              strokeDashoffset={`${2 * Math.PI * 22 * (1 - scrollProgress / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Arrow Icon */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <FaArrowUp 
              size={16} 
              className="transform group-active:-translate-y-0.5 transition-transform duration-200" 
              aria-hidden="true" 
            />
          </div>
          
          {/* Active State Effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150"></div>
        </button>
      </div>

      {/* Progress Bar (Optional - shows at top of screen) */}
      <div 
        className={`fixed top-0 left-0 z-[9998] h-1 bg-gradient-to-r from-secondaryColor to-secondary-500 transition-all duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width: `${scrollProgress}%` }}
      />
    </>
  );
};

export default ScrollToTopButton;