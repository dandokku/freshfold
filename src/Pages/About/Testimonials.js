
import React from 'react';
import { MdOutlineFormatQuote } from 'react-icons/md';

function Testimonials() {
  return (
    <div className='mt-14 p-10'>
      <div className='text-center'>
        <h1 className='font-bold text-headerTextColor text-4xl'>Testimonials</h1>
        <p className='w-[80%] md:w-[50%] mx-auto mt-2'>
          See what our satisfied customers have to say about our laundry booking service. Discover how we've made laundry day hassle-free and convenient for them. Don't just take our word for it – read their testimonials and join the ranks of happy customers today!
        </p>
      </div>

      <div className='mt-10 flex flex-wrap items-center justify-center gap-10'>
        <div className='bg-secondaryColor p-6 rounded-md hover:scale-105 transition-transform duration-300 shadow-lg max-w-[320px]'>
          <MdOutlineFormatQuote className='bg-whiteColor text-secondaryColor rounded-full mb-5 w-max' size={50} />
          <p className='text-whiteColor'>
            The seamless booking process has made my life so much easier, and the quality of service is consistently excellent. I highly recommend this service to anyone looking for a hassle-free laundry solution. Thanks to this website, I've reclaimed valuable time and gained peace of mind.
          </p>
        </div>

        <div className='bg-secondaryColor p-6 rounded-md hover:scale-105 transition-transform duration-300 shadow-lg max-w-[320px]'>
          <MdOutlineFormatQuote className='bg-whiteColor text-secondaryColor rounded-full mb-5 w-max' size={50} />
          <p className='text-whiteColor'>
            The convenience of scheduling pick-ups and deliveries online has saved me so much time, and the laundry always comes back fresh and neatly folded. I highly recommend this website to anyone looking for a hassle-free laundry experience!
          </p>
        </div>

        <div className='bg-secondaryColor p-6 rounded-md hover:scale-105 transition-transform duration-300 shadow-lg max-w-[320px]'>
          <MdOutlineFormatQuote className='bg-whiteColor text-secondaryColor rounded-full mb-5 w-max' size={50} />
          <p className='text-whiteColor'>
            I no longer worry about laundry day because I know I can rely on this platform for a hassle-free experience. From booking to delivery, this service has truly transformed my laundry routine. I highly recommend it to anyone looking for a stress-free laundry solution.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
