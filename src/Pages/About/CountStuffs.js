import React from 'react'
import { MdOutlineLocalLaundryService } from 'react-icons/md'

function CountStuffs() {
  return (
    <div className='my-11 w-full bg-secondaryColor p-11 flex items-center justify-between gap-8'>
          <div className='flex flex-col items-center gap-2'>
              <MdOutlineLocalLaundryService className='text-[200px] text-shadColor' />
              <p className='text-whiteColor font-bold text-6xl'>10000+</p>
              <p className='text-whiteColor'>Shirts Washed</p>
          </div>  
          
          <div className='flex flex-col items-center gap-2'>
              <MdOutlineLocalLaundryService className='text-[200px] text-shadColor' />
              <p className='text-whiteColor font-bold text-6xl'>10000+</p>
              <p className='text-whiteColor'>Shirts Washed</p>
          </div>    
          
          <div className='flex flex-col items-center gap-2'>
              <MdOutlineLocalLaundryService className='text-[200px] text-shadColor' />
              <p className='text-whiteColor font-bold text-6xl'>10000+</p>
              <p className='text-whiteColor'>Shirts Washed</p>
          </div>  
          
          <div className='flex flex-col items-center gap-2'>
              <MdOutlineLocalLaundryService className='text-[200px] text-shadColor' />
              <p className='text-whiteColor font-bold text-6xl'>10000+</p>
              <p className='text-whiteColor'>Shirts Washed</p>
          </div>  
    </div>
  )
}

export default CountStuffs
