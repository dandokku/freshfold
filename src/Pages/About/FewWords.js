import React from 'react'
import Image from '../../Assets/Images/about.jpg'
import Image2 from '../../Assets/Images/about2.jpg'
import { MdOutlineCheck } from 'react-icons/md'
import '../Home/MiniAbout.css';

function FewWords() {
  return (
    <div className='m-9 my-[5rem] mini-about-container'>
      <div className='bubble' style={{ left: '10%', top: '20%' }}></div>
      <div className='bubble' style={{ left: '50%', top: '30%' }}></div>
      <div className='bubble' style={{ left: '80%', top: '10%' }}></div>
      <div className='bubble' style={{ left: '2%', top: '20%' }}></div>
      <div className='bubble' style={{ left: '10%', top: '65%' }}></div>
      <div className='bubble' style={{ left: '40%', top: '65%' }}></div>

      <div className='flex justify-center items-center gap-5 m-5'>
        <div className='flex gap-5'>
          <img src={Image} alt='About FreshFold' className='rounded-md h-[400px] w-[300px] mt-10' />
          <img src={Image2} alt='About FreshFold' className='rounded-md h-[400px] w-[300px] ' />

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

        </div>


      </div>
    </div>
  )
}

export default FewWords
