import React from 'react'
import LogImage from "../../Assets/Images/vladimir-gladkov-eN9atEtVtcc-unsplash.jpg";
import {Link} from 'react-router-dom'

function Register() {
  return (
    <div className='relative m-0 p-0 w-[100%] h-[100%]'>
      <img src={LogImage} alt="Login Image" className='w-[100%] h-[100vh]'/>
      <div className='p-10 bg-whiteColor absolute top-[15%] right-[25%] w-[50%] h-max rounded-md text-center'>

        <h1 className="text-headerTextColor font-semibold text-2xl mb-5">Register to Get Started</h1>
        <form action="" className='flex flex-col items-center justify-center gap-4'>
          <div className='flex items-center gap-2 w-full'>
            <input type="text" name="" id="" placeholder='First Name' className='p-2 w-full rounded-md outline-0 bg-transparent border border-mainColor focus:border-secondaryColor' />
            <input type="text" name="" id="" placeholder='Last Name' className='p-2 w-full rounded-md outline-0 bg-transparent border border-mainColor focus:border-secondaryColor' />
          </div>

          <div className='flex items-center gap-2 w-full'>
            <input type="number" name="" id="" placeholder='Mobile No' className='p-2 w-full rounded-md outline-0 bg-transparent border border-mainColor focus:border-secondaryColor' />
            <input type="email" name="" id="" placeholder='Email' className='p-2 w-full rounded-md outline-0 bg-transparent border border-mainColor focus:border-secondaryColor' />
          </div>
            <input type="text" name="" id="" placeholder='Address' className='p-2 w-full rounded-md outline-0 bg-transparent border border-mainColor focus:border-secondaryColor' />
            <input type="password" name="" id="" placeholder='Password' className='p-2 w-full rounded-md outline-0 bg-transparent border border-mainColor focus:border-secondaryColor' />
            <button type="submit" className='btnbtnbtn p-3 rounded-md border bg-textColor text-whiteColor w-full text-xl'>Sign Up</button>
        </form>

        <h1 className='mt-2 text-xl'>Already Have an Account? - <Link to="/login" className='text-secondaryColor'>Sign In</Link></h1>

      </div>
    </div>
  )
}

export default Register
