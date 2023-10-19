import React from 'react'
import Map from './Map'
import ContactImage from '../../Assets/Images/Worker4.avif'


function Contact() {
  return (
    <div className='pt-20'>
      <div className='p-10'>
        <h1 className='font-bold text-4xl text-headerTextColor text-center mb-10'>Get in touch with us</h1>

        <div className='flex items-center justify-center gap-5'>
          <img src={ContactImage} alt="" className='h-[80vh] w-[250px] rounded-md flex-[.4]' />

          <div className='p-10 bg-whiteColor shadow-shadColor flex-[.6]'>
            <h1 className='font-semibold text-3xl text-secondaryColor'>Write a message</h1>
            <form action="" className='flex flex-col gap-2'>

              <input type="text" placeholder='Your Name' className='w-full p-2 outline-none border border-textColor rounded-md my-2 focus:border-secondaryColor' />
              
              <input type="email" placeholder='Your Email' className='w-full p-2 outline-none border border-textColor rounded-md my-2 focus:border-secondaryColor' />
              
              <textarea name="" id="" cols="30" rows="10" placeholder="Your Message" className='w-full p-2 outline-none border border-textColor rounded-md my-2 focus:border-secondaryColor'></textarea>

              <button className='btnbtn p-3 border border-headerTextColor rounded-md w-max bg-textColor text-whiteColor hover:bg-whiteColor hover:text-textColor'>Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <Map />
      
  </div>
  )
}

export default Contact
