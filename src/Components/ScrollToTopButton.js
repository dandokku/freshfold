// import React, { useState, useEffect } from 'react';
// import { FaArrowUp } from 'react-icons/fa';

// const ScrollToTopButton = () => {
//   const [isVisible, setIsVisible] = useState(false);

 
//   const handleScroll = () => {
//     if (window.scrollY > 150) {
//       setIsVisible(true);
//     } else {
//       setIsVisible(false);
//     }
//   };

 
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

 
//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <div className="fixed top-[85%] left-[95%]  z-5 bg-secondaryColor text-whiteColor p-4 rounded-md">
//       {isVisible && (
//         <button onClick={scrollToTop}>
//           <FaArrowUp />
//         </button>
//       )}
//     </div>
//   );
// };

// export default ScrollToTopButton;


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
    <div className={`fixed bottom-5 right-5 z-50 p-3 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} bg-secondaryColor text-whiteColor rounded-full shadow-md`}>
      {isVisible && (
        <button onClick={scrollToTop} aria-label="Scroll to top">
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
