import React from 'react'
import {FaInstagramSquare, FaFacebookSquare, FaTwitterSquare, FaWhatsappSquare, FaSoap } from 'react-icons/fa'
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div className='bg-whiteColor p-6 flex flex-col gap-7 max-sm:text-center'>

      <Link to='/' className='max-sm:hidden'>
        <span className='logo text-secondaryColor font-bold text-3xl flex items-center'>Fresh <span className='text-secondaryColor flex '>F <span><FaSoap className="text-secondaryColor" size={30} /></span> ld</span> </span>
      </Link>
      
      <div className='flex items-center gap-4 max-sm:text-center max-sm:justify-center'>
        <FaFacebookSquare size={20} className='text-textColor' />
        <FaInstagramSquare size={20} className='text-textColor' />
        <FaTwitterSquare size={20} className='text-textColor' />
        <FaWhatsappSquare size={20} className='text-textColor' />
      </div>

      <div>
        <h1 className='font-bold text-xl'>Laundry made easy: </h1>
        <p>Experience the convenience of our innovative laundry solutions. We understand the importance of simplicity and efficiency in your daily routine.</p>

      </div>

      <div className='flex items-center justify-between max-sm:flex-col max-sm:items-center max-sm:gap-5 max-sm:justify-center max-sm:text-center'>
        <div>
          <h1 className='font-bold mb-3'>Pages</h1>
          <div className='flex flex-col gap-2'>
            <Link to='./about'>About</Link>
            <Link to='./services'>Services</Link>
            <Link to='./prices'>Prices</Link>
            <Link to='./contact'>Contact</Link>
          </div>
        </div>

        <div>
          <h1 className='font-bold mb-3'>Support</h1>
          <div className='flex flex-col gap-2'>
            <Link to='./about'>Faq</Link>
            <Link to='./map'>Location</Link>
            <Link to='./notfound'>Terms of Service</Link>
            <Link to='./notfound'>Privacy Policy</Link>
          </div>
        </div>

        <div className='flex-[.5] max-sm:hidden'>
          <form action="" className='flex items-center justify-between gap-1'>
            <input type="text" placeholder='Enter Email' className='outline-none border border-textColor p-2 py-2 px-5 w-full rounded-md focus:border-secondaryColor' />
            <button type="submit" className='btnbtn p-2 border border-textColor w-[30%] rounded-md bg-textColor text-whiteColor hover:text-textColor hover:bg-whiteColor'>Subscribe</button>
          </form>
        </div>
      </div>
      
      <p>@2023FreshFold. All rights reserved | <Link to='./notfound' className='hover:text-secondaryColor'>Privacy Policy</Link> | <Link to='./notfound' className='hover:text-secondaryColor'>Terms of Service</Link> </p>
    </div>
  )
}

export default Footer
