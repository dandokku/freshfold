import React from 'react'
import {Swiper, SwiperSlide} from  'swiper/react';
import '../../../node_modules/swiper/swiper.css'
import {TbWashMachine, TbWashDrycleanOff} from 'react-icons/tb'
import {MdOutlineDryCleaning, MdOutlineIron, MdOutlineChair, MdOutlineHomeRepairService} from 'react-icons/md'
import {GiLion} from 'react-icons/gi'

function Slider() {
  return (
    <div className='w-[90%] my-8 mx-auto flex items-center justify-center'>
        <Swiper 
            className='flex items-center justify-center gap-6'
            spaceBetween={70}
            slidesPerView={4}
            navigation
            pagination={{clickable: true}}
            autoplay={{delay: 100}}>
            <SwiperSlide className='p-4 text-secondaryColor bg-whiteColor rounded-md shadow-md'>
                <div className='flex flex-col items-center justify-center'>
                    <TbWashMachine size={80}/>
                    <h1>Wash and Fold</h1>
                </div>
            </SwiperSlide>
            <SwiperSlide className='p-4 text-secondaryColor bg-whiteColor rounded-md shadow-md'>
                 <div className='flex flex-col items-center justify-center'>
                    <MdOutlineDryCleaning size={80}/>
                    <h1>Dry Cleaning</h1>
                </div>
            </SwiperSlide>
            <SwiperSlide className='p-4 text-secondaryColor bg-whiteColor rounded-md shadow-md'>
                 <div className='flex flex-col items-center justify-center'>
                    <MdOutlineIron size={80}/>
                    <h1>Ironing and Pressing</h1>
                </div>
            </SwiperSlide>
            <SwiperSlide className='p-4 text-secondaryColor bg-whiteColor rounded-md shadow-md'>
                 <div className='flex flex-col items-center justify-center'>
                    <TbWashDrycleanOff size={80}/>
                    <h1>Stain Removal</h1>
                </div>
            </SwiperSlide>
            <SwiperSlide className='p-4 text-secondaryColor bg-whiteColor rounded-md shadow-md'>
                 <div className='flex flex-col items-center justify-center'>
                    <GiLion size={80}/>
                    <h1>Special Garment Care</h1>
                </div>
            </SwiperSlide>
            <SwiperSlide className='p-4 text-secondaryColor bg-whiteColor rounded-md shadow-md'>
                 <div className='flex flex-col items-center justify-center'>
                    <MdOutlineHomeRepairService size={80}/>
                    <h1>Alterations and Repairs</h1>
                </div>
            </SwiperSlide>
            <SwiperSlide className='p-4 text-secondaryColor bg-whiteColor rounded-md shadow-md'>
                 <div className='flex flex-col items-center justify-center'>
                    <MdOutlineChair size={80}/>
                    <h1>Household Items</h1>
                </div>
            </SwiperSlide>

        </Swiper>  
    </div>
  )
}

export default Slider
