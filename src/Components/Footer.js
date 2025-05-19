import React from 'react';
import { FaInstagramSquare, FaFacebookSquare, FaTwitterSquare, FaWhatsappSquare, FaSoap } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='bg-whiteColor p-6 flex flex-col gap-7 max-sm:text-center'>
      {/* Logo */}
      <Link to='/' className='max-sm:hidden'>
        <span className='logo text-secondaryColor font-bold text-3xl flex items-center'>
          Fresh <span className='text-secondaryColor flex '>F <span><FaSoap className="text-secondaryColor" size={30} /></span> ld</span>
        </span>
      </Link>

      {/* Social Media Icons */}
      <div className='flex items-center gap-6 max-sm:text-center max-sm:justify-center'>
        <FaFacebookSquare size={25} className='text-textColor hover:text-secondaryColor transition-colors duration-300' />
        <FaInstagramSquare size={25} className='text-textColor hover:text-secondaryColor transition-colors duration-300' />
        <FaTwitterSquare size={25} className='text-textColor hover:text-secondaryColor transition-colors duration-300' />
        <FaWhatsappSquare size={25} className='text-textColor hover:text-secondaryColor transition-colors duration-300' />
      </div>

      {/* Description */}
      <div>
        <h1 className='font-bold text-xl sm:text-2xl md:text-3xl'>Laundry made easy: </h1>
        <p className='text-textColor text-base sm:text-lg md:text-xl'>
          Experience the convenience of our innovative laundry solutions. We understand the importance of simplicity and efficiency in your daily routine.
        </p>
      </div>

      {/* Links */}
      <div className='flex items-center justify-between max-sm:flex-col max-sm:items-center max-sm:gap-5 max-sm:justify-center max-sm:text-center'>
        <div>
          <h1 className='font-bold mb-3'>Pages</h1>
          <div className='flex flex-col gap-2'>
            <Link to='./about' className='text-textColor hover:text-secondaryColor transition-colors duration-300'>About</Link>
            <Link to='./services' className='text-textColor hover:text-secondaryColor transition-colors duration-300'>Services</Link>
            <Link to='./prices' className='text-textColor hover:text-secondaryColor transition-colors duration-300'>Prices</Link>
            <Link to='./contact' className='text-textColor hover:text-secondaryColor transition-colors duration-300'>Contact</Link>
          </div>
        </div>

        <div>
          <h1 className='font-bold mb-3'>Support</h1>
          <div className='flex flex-col gap-2'>
            <Link to='./about' className='text-textColor hover:text-secondaryColor transition-colors duration-300'>Faq</Link>
            <Link to='./map' className='text-textColor hover:text-secondaryColor transition-colors duration-300'>Location</Link>
            <Link to='./notfound' className='text-textColor hover:text-secondaryColor transition-colors duration-300'>Terms of Service</Link>
            <Link to='./notfound' className='text-textColor hover:text-secondaryColor transition-colors duration-300'>Privacy Policy</Link>
          </div>
        </div>

        {/* Email Subscription */}
        <div className='flex-[.5] max-sm:hidden'>
          <form action="" className='flex items-center justify-between gap-1'>
            <input
              type="text"
              placeholder='Enter Email'
              className='outline-none border border-textColor p-2 py-2 px-5 w-full rounded-md focus:border-secondaryColor'
            />
            <button
              type="submit"
              className='btnbtn p-2 border border-textColor w-[30%] rounded-md bg-textColor text-whiteColor hover:bg-whiteColor hover:text-textColor transition-all duration-300'
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Text */}
      <p className='text-sm text-textColor'>
        &copy; 2023 FreshFold. All rights reserved |{' '}
        <Link to='./notfound' className='hover:text-secondaryColor'>Privacy Policy</Link> |{' '}
        <Link to='./notfound' className='hover:text-secondaryColor'>Terms of Service</Link>
      </p>
    </div>
  );
}

export default Footer;
