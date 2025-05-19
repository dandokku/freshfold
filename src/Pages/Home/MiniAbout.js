import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineCheck } from 'react-icons/md';
import './MiniAbout.css';

function MiniAbout() {
  return (
    <div className='m-6 my-[6rem] md:m-9 mini-about-container relative'>
      {/* Floating bubbles for background effect */}
      <div className='bubble' style={{ left: '10%', top: '20%' }}></div>
      <div className='bubble' style={{ left: '50%', top: '30%' }}></div>
      <div className='bubble' style={{ left: '80%', top: '10%' }}></div>
      <div className='bubble' style={{ left: '2%', top: '20%' }}></div>
      <div className='bubble' style={{ left: '10%', top: '65%' }}></div>
      <div className='bubble' style={{ left: '40%', top: '65%' }}></div>

      <div className='flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-12 mx-4 md:mx-8 lg:mx-12'>
        {/* Images Section */}
        <div className='gap-4 hidden items-center lg:items-start lg:flex'>
          <img
            src="https://images.unsplash.com/photo-1624372635310-01d078c05dd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhdW5kcnl8ZW58MHx8MHx8fDA%3D"
            alt='About FreshFold'
            className='rounded-md h-[400px] w-[300px] lg:h-[300px] lg:w-[200px] mt-10 lg:mt-10 transition-transform duration-300 hover:scale-105'
            />
          <img
            src="https://images.unsplash.com/photo-1582735689283-7b70dbe630ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhdW5kcnl8ZW58MHx8MHx8fDA%3D"
            alt='About FreshFold'
            className='rounded-md h-[400px] w-[300px] lg:h-[300px] lg:w-[200px] transition-transform duration-300 hover:scale-105'
          />
        </div>

        {/* Text Section */}
        <div className='flex flex-col gap-4 flex-1 mt-6 lg:mt-0'>
          <span className='font-semibold text-secondaryColor text-lg lg:text-xl'>
            Learn About Us
          </span>
          <h1 className='text-2xl lg:text-3xl font-bold text-textColor'>
            We Provide Quality Laundry Services
          </h1>
          <p className='text-sm md:text-base lg:text-lg'>
            We are professionals in the laundry and dry cleaning business, staying up to date with the latest technologies, cleaning methods, and solutions for dealing with stains or delicate fabrics. Plus, we follow the highest standards of integrity and environmental safety rules.
          </p>

          <div className='space-y-3'>
            {[
              'Quality Laundry Service',
              'Express Fast Delivery',
              'Highly Professional Staff',
              '100% Satisfaction Guarantee'
            ].map((text, index) => (
              <div key={index} className='flex items-center gap-3'>
                <MdOutlineCheck className='text-secondaryColor' />
                <p className='text-sm lg:text-base'>{text}</p>
              </div>
            ))}
          </div>

          <Link
            to='./about'
            className='btnbtn border border-textColor py-2 lg:py-3 px-6 lg:px-7 mt-4 w-max rounded-md text-sm lg:text-base hover:bg-textColor hover:text-white transition-all'
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MiniAbout;
