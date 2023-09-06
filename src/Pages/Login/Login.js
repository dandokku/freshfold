import React from 'react'
import LogImage from "../../Assets/Images/vladimir-gladkov-eN9atEtVtcc-unsplash.jpg";
import {Link} from 'react-router-dom'

function Login() {
  return (
    <div className='relative m-0 p-0'>
      <img src={LogImage} alt="Login Image" className='w-[100%] h-[100vh]'/>
      <div className='p-10 bg-whiteColor absolute top-[25%] right-[25%] w-[50%] h-max rounded-md text-center'>

        <h1 className="text-headerTextColor font-semibold text-2xl mb-5">Welcome Back, <span className='text-secondaryColor font-bold'>Login</span></h1>
        <form action="" className='flex flex-col items-center justify-center gap-4'>
          <input type="email" name="" id="" placeholder='Email' className='p-2 w-full rounded-md outline-0 bg-transparent border border-textColor focus:border-secondaryColor'/>
          <input type="password" name="" id="" placeholder='Password' className='p-2 w-full rounded-md outline-0 bg-transparent border border-textColor focus:border-secondaryColor'/>
          <button type="submit" className='btnbtnbtn p-3 rounded-md border bg-textColor text-whiteColor w-full text-xl'>Sign In</button>
        </form>

        <h1 className='mt-5 text-xl'>Don't Have an Account? - <Link to="/register" className='text-secondaryColor'>Register</Link></h1>

      </div>
    </div>
  )
}

export default Login
