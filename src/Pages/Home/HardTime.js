import React from 'react'
import Question from '../../Assets/undraw_questions_re_1fy7.svg'
import { Link } from 'react-router-dom'

function HardTime() {
  return (
    <div className='h-[40vh] bg-secondaryColor m-9 rounded-xl flex items-center justify-center p-6'>
          <img src={Question} alt="" className='w-72 flex-[.4] mb-16' />

          <div className='flex items-center justify-center gap-8 flex-col flex-[.7]'>
              <h1 className='text-whiteColor text-4xl font-bold'>Hard time deciding what's best for you?</h1>
              <Link to='./services' className='btnbtn border border-textColor py-3 px-7 w-max rounded-md'>Learn More</Link>
          </div>
    </div>
  )
}

export default HardTime
