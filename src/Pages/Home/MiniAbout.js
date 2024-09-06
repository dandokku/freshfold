// import React from 'react'
// import Image from '../../Assets/Images/about.jpg'
// import Image2 from '../../Assets/Images/about2.jpg'
// import { Link } from 'react-router-dom'
// import { MdOutlineCheck } from 'react-icons/md'
// import './MiniAbout.css';

// function MiniAbout() {
//   return (
//     <div className='m-9 my-[9rem] mini-about-container'>
//       <div className='bubble' style={{ left: '10%', top: '20%' }}></div>
//       <div className='bubble' style={{ left: '50%', top: '30%' }}></div>
//       <div className='bubble' style={{ left: '80%', top: '10%' }}></div>
//       <div className='bubble' style={{ left: '2%', top: '20%' }}></div>
//       <div className='bubble' style={{ left: '10%', top: '65%' }}></div>
//       <div className='bubble' style={{ left: '40%', top: '65%' }}></div>

//       <div className='flex justify-center items-center gap-5 m-5'>
//         <div className='flex gap-5'>
//           <img src={Image} alt='About FreshFold' className='rounded-md h-[400px] w-[300px] mt-10' />
//           <img src={Image2} alt='About FreshFold' className='rounded-md h-[400px] w-[300px] ' />

//         </div>

//         <div className='flex flex-col gap-2 flex-[.7]'>
//           <span className='font-semibold text-secondaryColor'>Learn About Us</span>
//           <h1 className='text-3xl font-bold text-textColor'>We Provide Quality Laundry Services</h1>
//           <p className=''>We are professionals in the laundry and dry cleaning business, which means we always stay up to date on the latest technologies, cleaning methods, and solutions for dealing with stains or delicate fabrics. Plus, we maintain the highest standards of business integrity by following local and national regulations and environmental safety rules. We are passionate about changing the way you think about laundry!</p>

//           <div className='flex items-center gap-3'>
//             <MdOutlineCheck className='text-secondaryColor' />
//             <p>Quality Laundry Service</p>
//           </div>
          
//           <div className='flex items-center gap-3'>
//             <MdOutlineCheck className='text-secondaryColor' />
//             <p>Express Fast Delivery</p>
//           </div>

//           <div className='flex items-center gap-3'>
//             <MdOutlineCheck className='text-secondaryColor' />
//             <p>Highly Professional Staff</p>
//           </div>

//           <div className='flex items-center gap-3'>
//             <MdOutlineCheck className='text-secondaryColor' />
//             <p>100% Satisfaction Guarantee</p>
//           </div>

//           <Link to='./about' className='btnbtn border border-textColor py-3 px-7 w-max rounded-md'>Learn More</Link>
//         </div>


//       </div>
//     </div>
//   )
// }

// export default MiniAbout

import React from 'react';
import Image from '../../Assets/Images/about.jpg';
import Image2 from '../../Assets/Images/about2.jpg';
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
            src={Image}
            alt='About FreshFold'
            className='rounded-md h-[400px] w-[300px] lg:h-[300px] lg:w-[200px] mt-10 lg:mt-10 transition-transform duration-300 hover:scale-105'
          />
          <img
            src={Image2}
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
