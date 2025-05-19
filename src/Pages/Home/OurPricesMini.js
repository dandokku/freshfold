
import React from 'react'
import { MdOutlineDirtyLens, MdOutlineDryCleaning, MdOutlineWash } from "react-icons/md"
import { Link } from "react-router-dom"

function OurPricesMini() {
  return (
    <div className='flex flex-col gap-7 px-4 md:px-8 py-12 items-center my-11'>
      <div className='text-center'>
        <h1 className='font-bold text-headerTextColor text-3xl md:text-4xl'>Our Prices</h1>
        <p className='text-base md:text-lg'>Our Prices are affordable and flexible</p>
      </div> 

      <div className='flex flex-wrap gap-7 items-center justify-center'>
        {/* Price Card 1 */}
        <div className='text-center hover:ring-2 ring-secondaryColor rounded-md flex flex-col items-center gap-3 p-5 shadow-lg w-[200px] md:w-[250px]'>
          <MdOutlineDryCleaning className='text-[80px] md:text-[100px] text-secondaryColor' />
          <p className='text-2xl md:text-3xl'>$2 per shirt</p>
          <span className='text-sm md:text-base'>Iron and Folding</span>
        </div>

        {/* Price Card 2 */}
        <div className='text-center hover:ring-2 ring-secondaryColor rounded-md flex flex-col items-center gap-3 p-5 shadow-lg w-[200px] md:w-[250px]'>
          <MdOutlineWash className='text-[80px] md:text-[100px] text-secondaryColor' />
          <p className='text-2xl md:text-3xl'>$4 per jeans</p>
          <span className='text-sm md:text-base'>Dry Cleaning</span>
        </div>

        {/* Price Card 3 */}
        <div className='text-center hover:ring-2 ring-secondaryColor rounded-md flex flex-col items-center gap-3 p-5 shadow-lg w-[200px] md:w-[250px]'>
          <MdOutlineDirtyLens className='text-[80px] md:text-[100px] text-secondaryColor' />
          <p className='text-2xl md:text-3xl'>$1 per stain</p>
          <span className='text-sm md:text-base'>Stain Removal</span>
        </div>
      </div>

      <Link to="./about" className='btnbtn border border-textColor rounded-md w-max py-3 px-6 bg-textColor text-whiteColor hover:bg-whiteColor hover:text-textColor transition-colors'>
        See all Prices
      </Link>
    </div>
  )
}

export default OurPricesMini
