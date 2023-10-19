import React from 'react'
import Step1 from '../../Assets/food-delivery-man-riding-motorcycles-cartoon-art-illustration_56104-610.avif';
import Step2 from '../../Assets/washing-machine-laundry-set-cartoon-icon-illustration-technology-fashion-icon-concept-isolated-flat-cartoon-style_138676-2150.avif';
import Step3 from '../../Assets/bath-towels-illustration-color-towel-piles-folded-rolled_33099-227.avif';
import Step4 from '../../Assets/undraw_deliveries_2r4y.svg';


function HowItWorks() {
  return (
    <div className='h-[70vh] bg-secondaryColor flex flex-col gap-9 items-center justify-center'>
      <h1 className='text-4xl font-bold'>Get it done in 4 steps</h1>

      <div className='flex items-center justify-center gap-7'>

        <div className='hover:ring-4 ring-whiteColor p-3 flex flex-col gap-3 items-center justify-center text-center rounded-md bg-whiteColor h-[300px] shadow-shadColor hover:translate-z-8'>
          <span className='text-secondaryColor font-semibold'>Step 1</span>
          <p className='font-bold text-xl'>Pickup</p>
          <img src={Step1} alt="" className='w-[200px] h-[200px]' />
        </div>

        <div className='hover:ring-4 ring-whiteColor p-3 flex flex-col gap-3 items-center justify-center text-center rounded-md bg-whiteColor h-[300px] shadow-shadColor hover:translate-z-8'>
          <span className='text-secondaryColor font-semibold'>Step 1</span>
          <p className='font-bold text-xl'>Wash and Dry</p>
          <img src={Step2} alt="" className='w-[200px] h-[200px]' />
        </div>

        <div className=' hover:ring-4 ring-whiteColor p-3 flex flex-col gap-3 items-center justify-center text-center rounded-md bg-whiteColor h-[300px] shadow-shadColor hover:translate-z-8'>
          <span className='text-secondaryColor font-semibold'>Step 1</span>
          <p className='font-bold text-xl'>Fold</p>
          <img src={Step3} alt="" className='w-[200px] h-[200px]' />
        </div>

        <div className='hover:ring-4 ring-whiteColor p-3 flex flex-col gap-3 items-center justify-center text-center rounded-md bg-whiteColor h-[300px] shadow-shadColor hover:translate-z-8'>
          <span className='text-secondaryColor font-semibold'>Step 1</span>
          <p className='font-bold text-xl'>Delivery</p>
          <img src={Step4} alt="" className='w-[200px] h-[200px]' />
        </div>

      </div>
    </div>
  )
}

export default HowItWorks
