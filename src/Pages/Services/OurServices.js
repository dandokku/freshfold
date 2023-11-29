import React from 'react'
import { MdOutlineDryCleaning, MdOutlineIron, MdOutlineLocalLaundryService, MdOutlinePunchClock, MdOutlineSelfImprovement } from 'react-icons/md'
import { PiShirtFoldedThin } from 'react-icons/pi'

function OurServices() {
  return (
    <div className="p-20 flex flex-col items-center gap-14 bg-shadColor">
      <h1 className='font-bold text-headerTextColor text-4xl'>Clean, Fast, and Free Pickup.</h1>

      <div className='grid grid-cols-3 gap-14 items-center justify-center'>
        <div className="flex flex-col items-center justify-center gap-5 rounded-md text-center p-10 bg-whiteColor">
          <MdOutlineLocalLaundryService size={100} className='bg-shadColor rounded-[50px] p-5 text-secondaryColor font-bold' />
          <h1 className="font-bold text-headerTextColor text-xl">Washing</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde doloremque consectetur alias! Esse id cupiditate, quo commodi earum optio, molestias voluptatem expedita in ipsam modi quod placeat impedit? Quibusdam, incidunt!</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 rounded-md text-center p-10 bg-whiteColor">
          <PiShirtFoldedThin size={100} className='bg-shadColor rounded-[50px] p-5 text-secondaryColor font-bold'/>
          <h1 className="font-bold text-headerTextColor text-xl">Folding</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde doloremque consectetur alias! Esse id cupiditate, quo commodi earum optio, molestias voluptatem expedita in ipsam modi quod placeat impedit? Quibusdam, incidunt!</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 rounded-md text-center p-10 bg-whiteColor">
          <MdOutlineIron size={100} className='bg-shadColor rounded-[50px] p-5 text-secondaryColor font-bold' />
          <h1 className="font-bold text-headerTextColor text-xl">Washing</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde doloremque consectetur alias! Esse id cupiditate, quo commodi earum optio, molestias voluptatem expedita in ipsam modi quod placeat impedit? Quibusdam, incidunt!</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 rounded-md text-center p-10 bg-whiteColor">
          <MdOutlineDryCleaning size={100} className='bg-shadColor rounded-[50px] p-5 text-secondaryColor font-bold' />
          <h1 className="font-bold text-headerTextColor text-xl">Dry Cleaning</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde doloremque consectetur alias! Esse id cupiditate, quo commodi earum optio, molestias voluptatem expedita in ipsam modi quod placeat impedit? Quibusdam, incidunt!</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 rounded-md text-center p-10 bg-whiteColor">
          <MdOutlinePunchClock size={100} className='bg-shadColor rounded-[50px] p-5 text-secondaryColor font-bold' />
          <h1 className="font-bold text-headerTextColor text-xl">Instant Service</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde doloremque consectetur alias! Esse id cupiditate, quo commodi earum optio, molestias voluptatem expedita in ipsam modi quod placeat impedit? Quibusdam, incidunt!</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 rounded-md text-center p-10 bg-whiteColor">
          <MdOutlineSelfImprovement size={100} className='bg-shadColor rounded-[50px] p-5 text-secondaryColor font-bold' />
          <h1 className="font-bold text-headerTextColor text-xl">Self-Service</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde doloremque consectetur alias! Esse id cupiditate, quo commodi earum optio, molestias voluptatem expedita in ipsam modi quod placeat impedit? Quibusdam, incidunt!</p>
        </div>
      </div>
      
    </div>
  )
}

export default OurServices
