import React from 'react'
import { MdOutlineFormatQuote } from 'react-icons/md'

function Testimonials() {
  return (
    <div className='mt-14 p-10'>
      <div>
        <h1 className='font-bold text-headerTextColor text-4xl'>Testimonials</h1>
        <p className='w-[50%] mt-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus mollitia officiis, enim dolores molestiae omnis porro exercitationem ab ullam fugit alias aspernatur quae aliquam possimus tenetur sint non. Alias, autem.</p>
      </div>  

      <div className='mt-1 flex items-center justify-center gap-10'>
        <div className='bg-secondaryColor p-6 rounded-md mt-24 animate-puls'>
          <MdOutlineFormatQuote className='bg-whiteColor text-secondaryColor rounded-[50%] mb-5 w-max' size={50} />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aliquid eius a! Tempore inventore quia ut assumenda quis sint sapiente culpa veritatis iste voluptas provident reprehenderit dolorem, doloribus, amet nihil.</p>
        </div>

        <div className='bg-secondaryColor p-6 rounded-md mt-14'>
          <MdOutlineFormatQuote className='bg-whiteColor text-secondaryColor rounded-[50%] mb-5 w-max' size={50} />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aliquid eius a! Tempore inventore quia ut assumenda quis sint sapiente culpa veritatis iste voluptas provident reprehenderit dolorem, doloribus, amet nihil.</p>
        </div>

        <div className='bg-secondaryColor p-6 rounded-md'>
          <MdOutlineFormatQuote className='bg-whiteColor text-secondaryColor rounded-[50%] mb-5 w-max' size={50} />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aliquid eius a! Tempore inventore quia ut assumenda quis sint sapiente culpa veritatis iste voluptas provident reprehenderit dolorem, doloribus, amet nihil.</p>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
