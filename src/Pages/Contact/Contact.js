import React from 'react';
import Map from './Map';
import ContactImage from '../../Assets/Images/contactus.svg';

function Contact() {
  return (
    <div className='pt-20'>
      <div className='p-10'>
        <h1 className='font-bold text-2xl md:text-4xl text-headerTextColor text-center mb-10'>Get in touch with us</h1>

        <div className='flex flex-col lg:flex-row items-center justify-center gap-5'>
          <img 
            src={ContactImage} 
            alt="Contact" 
            className='h-[50vh] lg:h-[80vh] w-full lg:w-[250px] rounded-md hidden md:flex flex-1' 
          />

          <div className='md:p-10 bg-whiteColor shadow-shadColor flex-1 w-full'>
            <h1 className='font-semibold text-xl md:text-3xl text-secondaryColor mb-4'>Write a message</h1>
            <form action="" className='flex flex-col gap-4'>
              <input 
                type="text" 
                placeholder='Your Name' 
                className='w-full p-3 outline-none border border-textColor rounded-md focus:border-secondaryColor' 
              />

              <input 
                type="email" 
                placeholder='Your Email' 
                className='w-full p-3 outline-none border border-textColor rounded-md focus:border-secondaryColor' 
              />

              <textarea 
                cols="30" 
                rows="5" 
                placeholder="Your Message" 
                className='w-full p-3 outline-none border border-textColor rounded-md focus:border-secondaryColor'
              ></textarea>

              <button className='p-3 border border-headerTextColor rounded-md bg-textColor text-whiteColor hover:bg-whiteColor hover:text-textColor w-max'>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Map />
    </div>
  );
}

export default Contact;
