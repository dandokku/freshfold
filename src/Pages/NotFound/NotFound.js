import React from 'react'
import NotImage from '../../Assets/undraw_page_not_found_re_e9o6.svg'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='p-2 flex flex-col items-center justify-between gap-6'>
      <img src={NotImage} alt="" className='h-[400px]' />
      <div className='text-center'>
        <h1 className='text-secondaryColor font-bold text-3xl'>Page Not Found</h1>
        <p className='text-xl'>The page you requested for was not found, <br /> please check url link and try again</p>
      </div>
      <Link to='/' className='rounded-md p-3 text-whiteColor bg-textColor hover:bg-secondaryColor'>Go Back To Home</Link>
    </div>
  )
}

export default NotFound
