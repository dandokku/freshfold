import React from 'react'
import DisImage from '../../Assets/Images/waldemar-Db4d6MRIXJc-unsplash.jpg';

function OurCoupons() {
  return (
    <div className='hidden md:block h-[60vh] relative'>
      <img src={DisImage} alt="" className='h-full w-full' />
      <div className='bg-linearBackground w-full h-full absolute inset-0 p-10'>
        <div className='absolute top-[20%] w-[50%] flex flex-col gap-10 justify-center'>
          <h1 className='text-secondaryColor font-bold text-4xl'>Discount up to 50% Only this month</h1>
          <p className='text-whiteColor'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quis placeat reiciendis perspiciatis nemo minima pariatur rem optio quibusdam! Architecto explicabo porro, est saepe sed distinctio placeat soluta quos earum!</p>
          <button className='btnbtn bg-whiteColor p-2 rounded-md font-semibold w-max'>Claim Promo</button>
        </div>
      </div>
    </div>
  )
}

export default OurCoupons
