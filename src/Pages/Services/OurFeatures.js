import React from 'react'
import { MdOutlineDeliveryDining, MdOutlineEco } from 'react-icons/md'
import { PiShirtFoldedLight, PiRugLight } from 'react-icons/pi'


function OurFeatures() {
  return (
    <div className='m-10 p-10 flex flex-col gap-14 items-center'>
      <div className='text-center'>
        <span className='text-secondaryColor font-semibold'>You'll love us</span>
        <h1 className='font-bold md:text-4xl text-2xl text-headerTextColor'>Our Features</h1>
      </div>

      <div className='flex flex-wrap items-center gap-14'>
        <div className='flex items-center justify-center gap-10'>
          <MdOutlineEco  className="text-[160px] text-secondaryColor"/>
          <div>
            <h1 className='text-headerTextColor font-bold text-xl'>Eco-Friendly Cleaning</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod consequuntur accusamus quos officia ex maxime numquam quisquam? Dolorum pariatur cum magni. Quas dolores eaque atque explicabo sequi, debitis facilis totam.</p>
          </div>          
        </div>

        <div className='flex items-center justify-center gap-10'>
          <PiShirtFoldedLight  className="text-[160px] text-secondaryColor"/>
          <div>
            <h1 className='text-headerTextColor font-bold text-xl'>Eco-Friendly Cleaning</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod consequuntur accusamus quos officia ex maxime numquam quisquam? Dolorum pariatur cum magni. Quas dolores eaque atque explicabo sequi, debitis facilis totam.</p>
          </div>          
        </div>

        <div className='flex items-center justify-center gap-10'>
          <PiRugLight  className="text-[160px] text-secondaryColor"/>
          <div>
            <h1 className='text-headerTextColor font-bold text-xl'>Eco-Friendly Cleaning</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod consequuntur accusamus quos officia ex maxime numquam quisquam? Dolorum pariatur cum magni. Quas dolores eaque atque explicabo sequi, debitis facilis totam.</p>
          </div>          
        </div>

        <div className='flex items-center justify-center gap-10'>
          <MdOutlineDeliveryDining  className="text-[160px] text-secondaryColor"/>
          <div>
            <h1 className='text-headerTextColor font-bold text-xl'>Eco-Friendly Cleaning</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod consequuntur accusamus quos officia ex maxime numquam quisquam? Dolorum pariatur cum magni. Quas dolores eaque atque explicabo sequi, debitis facilis totam.</p>
          </div>          
        </div>
      </div>
    </div>
  )
}

export default OurFeatures
