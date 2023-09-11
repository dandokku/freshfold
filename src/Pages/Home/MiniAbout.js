import React from 'react'
import Image from '../../Assets/Images/about.jpg'
import Image2 from '../../Assets/Images/about.jpg'
import { Link } from 'react-router-dom'
import { MdOutlineCheck } from 'react-icons/md'

function MiniAbout() {
  return (
    <div className='m-9 my-[9rem]'>
      <div className='flex justify-center items-center gap-5 m-5'>
        <div className='flex gap-5'>
        <img src={Image} alt='About FreshFold' class='rounded-md h-400 w-300 mt-10 transform hover:rotate-360 transition-transform duration-300' />
        <img src={Image2} alt='About FreshFold' class='rounded-md h-400 w-300 transform hover:rotate-360 transition-transform duration-300' />


        </div>

        <div className='flex flex-col gap-2 flex-[.7]'>
          <span className='font-semibold text-secondaryColor'>Learn About Us</span>
          <h1 className='text-3xl font-bold text-textColor'>We Provide Quality Laundry Services</h1>
          <p className=''>We are professionals in the laundry and dry cleaning business, which means we always stay up to date on the latest technologies, cleaning methods, and solutions for dealing with stains or delicate fabrics. Plus, we maintain the highest standards of business integrity by following local and national regulations and environmental safety rules. We are passionate about changing the way you think about laundry!</p>

          <div className='flex items-center gap-3'>
            <MdOutlineCheck className='text-secondaryColor' />
            <p>Quality Laundry Service</p>
          </div>
          
          <div className='flex items-center gap-3'>
            <MdOutlineCheck className='text-secondaryColor' />
            <p>Express Fast Delivery</p>
          </div>

          <div className='flex items-center gap-3'>
            <MdOutlineCheck className='text-secondaryColor' />
            <p>Highly Professional Staff</p>
          </div>

          <div className='flex items-center gap-3'>
            <MdOutlineCheck className='text-secondaryColor' />
            <p>100% Satisfaction Guarantee</p>
          </div>

          {/* <Link to='./about' className='btnbtn'>Learn More</Link> */}
          <Link to='./about' className='btnbtn border border-textColor py-3 px-7 w-max rounded-md'>Learn More</Link>
        </div>


      </div>
    </div>
  )
}

export default MiniAbout
