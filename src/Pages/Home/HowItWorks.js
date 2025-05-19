import React from 'react';
import Step1 from '../../Assets/food-delivery-man-riding-motorcycles-cartoon-art-illustration_56104-610.avif';
import Step2 from '../../Assets/washing-machine-laundry-set-cartoon-icon-illustration-technology-fashion-icon-concept-isolated-flat-cartoon-style_138676-2150.avif';
import Step3 from '../../Assets/bath-towels-illustration-color-towel-piles-folded-rolled_33099-227.avif';
import Step4 from '../../Assets/undraw_deliveries_2r4y.svg';

function HowItWorks() {
  return (
    <div className='h-auto py-12 bg-secondaryColor flex flex-col gap-12 items-center justify-center'>
      <h1 className='text-3xl lg:text-4xl font-bold text-center text-whiteColor'>
        Get it done in 4 steps
      </h1>

      <div className='flex flex-wrap items-center justify-center gap-6 md:gap-7'>
        {/* Step 1 */}
        <div className='hover:ring-4 ring-whiteColor p-3 flex flex-col gap-3 items-center justify-center text-center rounded-md bg-whiteColor shadow-shadColor h-[260px] w-[250px] md:h-[300px] md:w-[300px] transition-transform duration-300 hover:scale-105'>
          <span className='text-secondaryColor font-semibold text-lg'>
            Step 1
          </span>
          <p className='font-bold text-xl'>Pickup</p>
          <img src={Step1} alt='Pickup' className='w-[120px] h-[120px] md:w-[200px] md:h-[200px]' />
        </div>

        {/* Step 2 */}
        <div className='hover:ring-4 ring-whiteColor p-3 flex flex-col gap-3 items-center justify-center text-center rounded-md bg-whiteColor shadow-shadColor h-[260px] w-[250px] md:h-[300px] md:w-[300px] transition-transform duration-300 hover:scale-105'>
          <span className='text-secondaryColor font-semibold text-lg'>
            Step 2
          </span>
          <p className='font-bold text-xl'>Wash and Dry</p>
          <img src={Step2} alt='Wash and Dry' className='w-[120px] h-[120px] md:w-[200px] md:h-[200px]' />
        </div>

        {/* Step 3 */}
        <div className='hover:ring-4 ring-whiteColor p-3 flex flex-col gap-3 items-center justify-center text-center rounded-md bg-whiteColor shadow-shadColor h-[260px] w-[250px] md:h-[300px] md:w-[300px] transition-transform duration-300 hover:scale-105'>
          <span className='text-secondaryColor font-semibold text-lg'>
            Step 3
          </span>
          <p className='font-bold text-xl'>Fold</p>
          <img src={Step3} alt='Fold' className='w-[120px] h-[120px] md:w-[200px] md:h-[200px]' />
        </div>

        {/* Step 4 */}
        <div className='hover:ring-4 ring-whiteColor p-3 flex flex-col gap-3 items-center justify-center text-center rounded-md bg-whiteColor shadow-shadColor h-[260px] w-[250px] md:h-[300px] md:w-[300px] transition-transform duration-300 hover:scale-105'>
          <span className='text-secondaryColor font-semibold text-lg'>
            Step 4
          </span>
          <p className='font-bold text-xl'>Delivery</p>
          <img src={Step4} alt='Delivery' className='w-[120px] h-[120px] md:w-[200px] md:h-[200px]' />
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
