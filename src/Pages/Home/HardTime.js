// import React from 'react'
// import Question from '../../Assets/undraw_questions_re_1fy7.svg'
// import { Link } from 'react-router-dom'

// function HardTime() {
//   return (
//     <div className='h-[40vh] bg-secondaryColor m-9 rounded-xl flex items-center justify-center p-6'>
//           <img src={Question} alt="" className='w-72 flex-[.4] mb-16 animate-pulse' />

//           <div className='flex items-center justify-center gap-8 flex-col flex-[.7]'>
//               <h1 className='text-whiteColor text-4xl font-bold'>Hard time deciding what's best for you?</h1>
//               <Link to='./services' className='btnbtn border border-textColor py-3 px-7 w-max rounded-md'>Learn More</Link>
//           </div>
//     </div>
//   )
// }

// export default HardTime


import React from 'react'
import Question from '../../Assets/undraw_questions_re_1fy7.svg'
import { Link } from 'react-router-dom'

function HardTime() {
  return (
    <div className='h-auto md:h-[40vh] bg-secondaryColor m-6 md:m-9 rounded-xl flex flex-col md:flex-row items-center justify-center p-6 md:p-10'>
      <img 
        src={Question} 
        alt="Having trouble deciding?" 
        className='w-40 md:w-72 flex-[.4] mb-6 md:mb-16 animate-pulse' 
      />

      <div className='flex items-center justify-center gap-6 md:gap-8 flex-col flex-[.7] text-center md:text-left'>
        <h1 className='text-whiteColor text-2xl md:text-4xl font-bold'>
          Hard time deciding what's best for you?
        </h1>
        <Link 
          to='./services' 
          className='btnbtn border border-textColor py-3 px-7 w-max rounded-md text-whiteColor hover:bg-textColor hover:text-whiteColor  transition-colors'
        >
          Learn More
        </Link>
      </div>
    </div>
  )
}

export default HardTime
