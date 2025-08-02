import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className='relative'>
      {/* Image with Zoom Effect */}
      <img 
        src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGF1bmRyeXxlbnwwfHwwfHx8MA%3D%3D"
        alt="Laundry Service" 
        className='w-full h-[95vh] object-cover transition-transform duration-500 ease-in-out transform hover:scale-105' 
      />

      {/* Darker Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 p-20 flex gap-7 justify-center items-center flex-col w-full h-full z-[9999] text-white'>
        {/* Heading */}
        <h1 className='text-shadow text-5xl sm:text-6xl md:text-7xl font-extrabold text-center leading-tight'>
          <span className='text-secondaryColor'>Book</span> Your Laundry Services <br /> Hassle-Free
        </h1>

        {/* Description */}
        <p className='text-whiteColor text-lg sm:text-xl text-center max-w-lg mx-auto mt-4'>
          Experience affordable pricing and top-quality service. Spend more time doing the things you love, and less time worrying about laundry.
        </p>

        {/* Book Now Button */}
        <Link 
          to='./services' 
          className='btnbtn py-3 px-8 sm:px-10 bg-secondaryColor text-white rounded-md hover:bg-whiteColor hover:text-textColor transition-all duration-300 transform active:scale-95'
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
