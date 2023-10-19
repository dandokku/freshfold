import React from 'react'
import { MdOutlineDirtyLens, MdOutlineDryCleaning, MdOutlineSanitizer, MdOutlineShareLocation, MdOutlineWash } from "react-icons/md"
import {Link} from "react-router-dom"

function OurPricesMini() {
  return (
    <div className='flex flex-col gap-7 p-8 items-center my-11'>
          <div className='text-center'>
              <h1 className='font-bold text-headerTextColor text-4xl'>Our Prices</h1>
              <p>Our Prices are affordable and flexible</p>
          </div> 

          <div className='flex gap-7 items-center justify-between'>
              <div className='hover:ring-1 ring-secondaryColor rounded-md flex flex-col items-center gap-3 p-5 shadow-lg'>
                  <MdOutlineDryCleaning className='text-[100px] text-secondaryColor'/>
                  <p className='text-3xl'>$2 per shirt...</p>
                  <span>Iron and Folding</span>
              </div>

              <div className='hover:ring-2 ring-secondaryColor rounded-md flex flex-col items-center gap-3 p-8 shadow-lg'>
                  <MdOutlineWash className='text-[100px] text-secondaryColor'/>
                  <p className='text-3xl'>$4 per jeans...</p>
                  <span>Dry Cleaning</span>
              </div>

              <div className='hover:ring-1 ring-secondaryColor rounded-md flex flex-col items-center gap-3 p-5 shadow-lg'>
                  <MdOutlineDirtyLens className='text-[100px] text-secondaryColor'/>
                  <p className='text-3xl'>$1 per stain</p>
                  <span>Stain Removal</span>
              </div>
          </div>

          <Link className='btnbtn border border-textColor rounded-md w-max p-4 px-6 bg-textColor text-whiteColor  hover:bg-whiteColor hover:text-textColor'>See all Prices</Link>
    </div>
  )
}

export default OurPricesMini
