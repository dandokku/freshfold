import React from 'react'
import Image1 from '../../Assets/Images/pexels-pixabay-271711.jpg'
import Image2 from '../../Assets/Images/ryoji-hayasaka-gkbAYJIMVDA-unsplash.jpg'
import Image4 from '../../Assets/Images/seongmin-park-p1qYb9pvLPU-unsplash.jpg'

import {Swiper, SwiperSlide} from  'swiper/react';
import '../../../node_modules/swiper/swiper.css'

import { Link } from 'react-router-dom'

function Carousel() {
  return (
    <div>
        <Swiper 
            className='flex flex-row items-center'
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{clickable: true}}
            autoplay={{delay: 100}}
            >
            
                <SwiperSlide className='relative'>
                    <img src={Image1} className='w-full h-[95vh] '/>
                    <div className='absolute inset-0 p-20 flex gap-7 justify-center items-center flex-col w-full h-full z-[9999] text-secondaryColor bg-linearBackground'>
                        <h1 className='textshadow text-5xl font-bold text-whiteColor text-shadow-md text-center'> <span className='text-secondaryColor'>Book</span> Your Laundry Services <br /> Hassle Free</h1>
                        <p className='text-whiteColor text-center'>We offer affordable pricing options so that you can spend more time doing the things you love,<br></br> and less time worrying about laundry</p>
                        <Link to='./login' className='btnbtn py-3 px-10 bg-whiteColor text-textColor hover:bg-textColor hover:text-whiteColor rounded-md'>Book Now</Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src={Image2} className='w-full h-[95vh] '/>
                    <div className='absolute inset-0 flex gap-5 justify-center items-center flex-col w-full h-full z-[9999] text-secondaryColor bg-linearBackground'>
                        <h1 className='textshadow text-5xl font-bold text-secondaryColor text-shadow-md'>Fast and Reliable Laundry Booking</h1>
                        <Link to='./login' className='btnbtn py-2 px-10 bg-whiteColor text-textColor hover:bg-textColor hover:text-whiteColor rounded-sm'>Book Now</Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src={Image4} className='w-full h-[95vh] '/>
                    <div className='absolute inset-0 flex gap-5 justify-center items-center flex-col w-full h-full z-[9999] text-secondaryColor bg-linearBackground'>
                        <h1 className='textshadow text-5xl font-bold text-secondaryColor text-shadow-md '>Your Laundry, Our Priority</h1>
                        <Link to='./login' className='btnbtn py-2 px-10 bg-whiteColor text-textColor hover:bg-textColor hover:text-whiteColor rounded-sm'>Book Now</Link>
                    </div>
                </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default Carousel
