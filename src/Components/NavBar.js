import React, {useState} from 'react'
import { FaSoap } from 'react-icons/fa';
import { AiOutlineClose} from 'react-icons/ai';
import {HiBars3BottomLeft} from 'react-icons/hi2'
import { Link, NavLink } from 'react-router-dom';

function NavBar() {
  const [nav, setNav] = useState(true);
  const [headerActive, setHeaderActive] = React.useState(false);

  const handleNav = () => {
    setNav(!nav)
  }

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      const navBar = document.querySelector("header");
      if (navBar) {
        if (window.pageYOffset > 800) {
          navBar.classList.add("headerLower");
          setHeaderActive(true);
        } else {
          navBar.classList.remove("headerLower");
          setHeaderActive(false);
        }
      }
    });
  }, []);

  return (
    <header className='fixed z-40 w-full bg-whiteColor drop-shadow-sm flex items-center justify-between p-6' active={headerActive ? true : false}>
      <div className='flex'>
        <Link to='/'>
          <span className='logo text-secondaryColor font-bold text-3xl flex items-center'>Fresh <span className='text-secondaryColor flex '>F <span><FaSoap className="text-secondaryColor" size={30} /></span> ld</span> </span>
        </Link>
      </div>

      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center justify-between gap-[5rem]'>
          <ul className='items-center justify-between gap-6 text-[1rem] text-textColor hidden md:flex'>
            <NavLink to="/" className={({isActive})=> isActive ? 'active hover:text-secondaryColor ' : 'link'}>Home</NavLink>
            <NavLink to="/about" className='hover:text-secondaryColor'>About</NavLink>
            <NavLink to="/services" className='hover:text-secondaryColor' >Services</NavLink>
            <NavLink to="/prices" className='hover:text-secondaryColor'>Prices</NavLink>
            <NavLink to="/contact" className='hover:text-secondaryColor'>Contact</NavLink>
          </ul>

          <Link to='./login' className='btnbtn border border-textColor py-2 px-7 rounded-sm'>Sign In</Link>
        </div>
        
        
        <div onClick={handleNav} className="block md:hidden">
          {!nav ? <AiOutlineClose size={30} className='text-secondaryColor'/> :  <HiBars3BottomLeft size={30} className='text-secondaryColor'/>}
        </div>

        <div className={!nav ? 'fixed left-0 top-0 w-[60%] bg-primaryColorDarker h-max p-4' : 'fixed left-[-100%] ease-in-out duration-500'}>
        <span className='logo text-whiteColor text-4xl flex items-center'>Fresh <span className='text-secondaryColor flex '>F <span><FaSoap className="text-secondaryColor" size={30} /></span> ld</span> </span>
          <ul className=' flex flex-col justify-around gap-3 text-whiteColor text-[20px] my-5'>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Prices</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default NavBar
