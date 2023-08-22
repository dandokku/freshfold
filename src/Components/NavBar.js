import React, {useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import { FaSoap } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function NavBar() {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <header className='bg-primaryColor flex items-center justify-between p-5'>
      <div className='flex'>
        <span className='text-whiteColor text-4xl flex items-center'>Fresh <span className='text-secondaryColor flex '>F <span><FaSoap className="text-secondaryColor" size={30} /></span> ld</span> </span>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <ul className='flex items-center justify-between gap-4 text-[20px] text-whiteColor'>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Prices</li>
          <li>Contact</li>
        </ul>

        

        
        <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineClose size={30} className='text-secondaryColor'/> :  <AiOutlineMenu size={30} className='text-secondaryColor'/>}
      </div>
      </div>
    </header>
  )
}

export default NavBar
