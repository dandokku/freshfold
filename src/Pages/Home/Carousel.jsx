import React from 'react'
import Image1 from '../../Assets/Images/pexels-pixabay-271711.jpg'

import { Link } from 'react-router-dom'

function Carousel() {
  return (
    <div className='relative'>
        <img src={Image1} className='w-screen h-[95vh] '/>
        <div className='absolute inset-0 p-20 flex gap-7 justify-center items-center flex-col w-full h-full z-[9999] text-secondaryColor bg-linearBackground'>
            <h1 className='textshadow text-5xl font-bold text-whiteColor text-shadow-md text-center'> <span className='text-secondaryColor'>Book</span> Your Laundry Services <br /> Hassle Free</h1>
            <p className='text-whiteColor text-center'>We offer affordable pricing options so that you can spend more time doing the things you love,<br></br> and less time worrying about laundry</p>
            <Link to='./services' className='btnbtn py-3 px-10 bg-whiteColor text-textColor hover:bg-textColor hover:text-whiteColor rounded-md'>Book Now</Link>
        </div>
    </div>  

  )
}

export default Carousel
