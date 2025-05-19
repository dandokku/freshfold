import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 150) {
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
    <div
      className={`fixed bottom-5 right-5 z-50 p-3 transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} bg-secondaryColor text-whiteColor rounded-full shadow-md transform`}
    >
      {isVisible && (
        <button onClick={scrollToTop} aria-label="Scroll to top">
          <FaArrowUp size={20} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
