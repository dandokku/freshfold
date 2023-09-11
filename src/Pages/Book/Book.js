import React from 'react'

function Book() {
  return (
    <div className='pt-28 p-11'>
      <h1 className='text-textColor font-bold text-3xl text-center mb-10'>SCHEDULE A PICKUP</h1>
      <form action="" className='w-full flex flex-col items-center gap-6'>
        <div className='flex items-center gap-4 w-full'>
          <input type="text" name="" id="" placeholder='First Name' className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor'/>
          <input type="text" name="" id="" placeholder='Last Name' className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor' />
        </div>

        <div className='flex items-center gap-4 w-full'>
          <input type="email" name="" id="" placeholder='Email-Address' className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor' />
          <input type="number" name="" id="" placeholder='PhoneNo' className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor'/>
        </div>

        <input type="text" name="" id="" placeholder='Address' className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor'/>

        <div className='flex items-center gap-4 w-full'>
          <input type="date" name="" id="" placeholder='Pickup Date' className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor'/>
          <input type="date" name="" id="" placeholder='Delivery Date' className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor'/>
        </div>

        <input type="text" name="" id="" placeholder='Special Instructions' className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor'/>
        
        <select name="" id="" placeholder='Select Service' className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor'>
          <option value="">Welp</option>
          <option value="">Welp</option>
          <option value="">Welp</option>
          <option value="">Welp</option>
        </select>

        <button type="submit" className='btnbtn p-5 w-[30%] rounded-md bg-textColor text-whiteColor hover:bg-secondaryColor text-xl'>Book</button>
      </form>
    </div>
  )
}

export default Book
