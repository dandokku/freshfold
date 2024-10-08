import React, { useState } from 'react';
import { FaSoap } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineDown } from 'react-icons/ai';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import { Link, NavLink } from 'react-router-dom';
import ProfileImage from "../Assets/Images/user_1177568.png";
import axios from "axios";
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setUserSignOut } from '../Pages/Features/userSlice';

function NavBar() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  async function getUser() {
    const localData = localStorage.getItem("user-jwt");
    const token = JSON.parse(localData);

    const config = {
      headers: {
        "x-auth-token": token,
      }
    }

    return axios.get("http://localhost:9000/api/users/me", config);
  }

  const { data } = useQuery("user", getUser, {
    onSuccess: (success) => console.log(success),
    onError: (error) => console.log(error),
  });

  // Logout
  function logOutUser() {
    queryClient.removeQueries("user");
    dispatch(setUserSignOut());
    localStorage.removeItem("user-jwt");
  }

  const [nav, setNav] = useState(true);
  const [headerActive, setHeaderActive] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNav = () => {
    setNav(!nav);
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
    <header className='fixed z-[999999] w-full bg-whiteColor drop-shadow-sm flex items-center justify-between p-6'>
      <div className='flex'>
        <Link to='/'>
          <span className='logo text-secondaryColor font-bold text-3xl flex items-center max-sm:text-xl'>Fresh <span className='text-secondaryColor flex '>F <span><FaSoap className="text-secondaryColor" size={30} /></span> ld</span> </span>
        </Link>
      </div>

      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center justify-between gap-7'>
          <ul className='items-center justify-between gap-6 text-[1rem] text-textColor hidden md:flex'>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active hover:text-secondaryColor ' : 'link'}>Home</NavLink>
            <NavLink to="/about" className='hover:text-secondaryColor'>About</NavLink>
            <NavLink to="/services" className='hover:text-secondaryColor' >Services</NavLink>
            <NavLink to="/prices" className='hover:text-secondaryColor'>Prices</NavLink>
            <NavLink to="/contact" className='hover:text-secondaryColor'>Contact</NavLink>
          </ul>

          {user.id !== null ? (
            <div className='relative group' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown} >
              <div className='flex gap-1 items-center'>
                <img src={ProfileImage} alt="" className='w-[50px] h-[50px] rounded-[50%]' />
                <AiOutlineDown />
              </div>
              <div className={`${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-2 space-y-2 bg-white text-textColor p-5 rounded-md w-max flex flex-col items-center gap-3`}>
                <h1 className='text-secondaryColor font-bold'>{user.firstName}</h1>
                <h1 className='text-secondaryColor font-bold'>{user.email}</h1>
                <Link to="/profile" className='border border-textColor rounded-md py-3 px-11 hover:bg-textColor hover:text-whiteColor'>Profile</Link>
                <button onClick={logOutUser} className='border border-textColor bg-textColor text-whiteColor rounded-md py-3 px-11 hover:bg-headerTextColor hover:text-whiteColor'>Logout</button>
              </div>
            </div>
          ) : (
            <Link to='./login' className='btnbtn border border-textColor py-2 px-7 rounded-md'>Sign In</Link>
          )}

        </div>

        <div onClick={handleNav} className="block md:hidden">
          {!nav ? <AiOutlineClose size={30} className='text-secondaryColor' /> : <HiBars3BottomLeft size={30} className='text-secondaryColor' />}
        </div>

        <div className={!nav ? 'fixed left-0 top-0 h-screen w- bg-textColor p-7' : 'fixed left-[-100%] ease-in-out duration-500'}>
          <span className='logo text-whiteColor text-4xl flex items-center'>Fresh <span className='text-secondaryColor flex '>F <span><FaSoap className="text-secondaryColor" size={30} /></span> ld</span> </span>
          <ul className=' flex flex-col justify-around gap-3 text-whiteColor text-[20px] my-5'>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active hover:text-secondaryColor ' : 'link'}>Home</NavLink>
            <NavLink to="/about" className='hover:text-secondaryColor'>About</NavLink>
            <NavLink to="/services" className='hover:text-secondaryColor' >Services</NavLink>
            <NavLink to="/prices" className='hover:text-secondaryColor'>Prices</NavLink>
            <NavLink to="/contact" className='hover:text-secondaryColor'>Contact</NavLink>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default NavBar;

// import React, { useState } from 'react';
// import { FaSoap } from 'react-icons/fa';
// import { AiOutlineClose, AiOutlineDown } from 'react-icons/ai';
// import { HiBars3BottomLeft } from 'react-icons/hi2';
// import { Link, NavLink } from 'react-router-dom';
// import ProfileImage from "../Assets/Images/user_1177568.png";
// import axios from "axios";
// import { useQuery, useQueryClient } from 'react-query';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUserSignOut } from '../Pages/Features/userSlice';

// function NavBar() {
//   const queryClient = useQueryClient();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);

//   async function getUser() {
//     const localData = localStorage.getItem("user-jwt");
//     const token = JSON.parse(localData);

//     const config = {
//       headers: {
//         "x-auth-token": token,
//       }
//     }

//     return axios.get("http://localhost:9000/api/users/me", config);
//   }

//   const { data } = useQuery("user", getUser, {
//     onSuccess: (success) => console.log(success),
//     onError: (error) => console.log(error),
//   });

//   // Logout
//   function logOutUser() {
//     queryClient.removeQueries("user");
//     dispatch(setUserSignOut());
//     localStorage.removeItem("user-jwt");
//   }

//   const [nav, setNav] = useState(false); // Start with the menu closed
//   const [headerActive, setHeaderActive] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleNav = () => {
//     setNav(!nav);
//   }

//   const closeNav = () => {
//     setNav(false); // Close the menu when a link is clicked
//   }

//   React.useEffect(() => {
//     window.addEventListener("scroll", () => {
//       const navBar = document.querySelector("header");
//       if (navBar) {
//         if (window.pageYOffset > 800) {
//           navBar.classList.add("headerLower");
//           setHeaderActive(true);
//         } else {
//           navBar.classList.remove("headerLower");
//           setHeaderActive(false);
//         }
//       }
//     });
//   }, []);

//   return (
//     <header className='fixed z-[999999] w-full bg-whiteColor drop-shadow-sm flex items-center justify-between px-4 py-3'> {/* Reduced padding */}
//       <div className='flex'>
//         <Link to='/' onClick={closeNav}>
//           <span className='logo text-secondaryColor font-bold text-2xl flex items-center max-sm:text-xl'> {/* Reduced text size */}
//             Fresh 
//             <span className='text-secondaryColor flex'>
//               F <span><FaSoap className="text-secondaryColor" size={20} /> {/* Reduced icon size */}</span> ld
//             </span>
//           </span>
//         </Link>
//       </div>

//       <div className='flex items-center justify-between gap-2'>
//         <div className='hidden md:flex items-center justify-between gap-5'>
//           <ul className='items-center justify-between gap-4 text-sm text-textColor flex'> {/* Reduced gap and text size */}
//             <NavLink to="/" className={({ isActive }) => isActive ? 'active hover:text-secondaryColor ' : 'link'}>Home</NavLink>
//             <NavLink to="/about" className='hover:text-secondaryColor'>About</NavLink>
//             <NavLink to="/services" className='hover:text-secondaryColor'>Services</NavLink>
//             <NavLink to="/prices" className='hover:text-secondaryColor'>Prices</NavLink>
//             <NavLink to="/contact" className='hover:text-secondaryColor'>Contact</NavLink>
//           </ul>
//           {user.id !== null ? (
//             <div className='relative group' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
//               <div className='flex gap-1 items-center'>
//                 <img src={ProfileImage} alt="" className='w-[40px] h-[40px] rounded-[50%]' /> {/* Reduced profile image size */}
//                 <AiOutlineDown size={16} /> {/* Reduced arrow size */}
//               </div>
//               <div className={`${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-2 space-y-2 bg-white text-textColor p-3 rounded-md w-max flex flex-col items-center gap-3`}> {/* Adjusted padding */}
//                 <h1 className='text-secondaryColor font-bold'>{user.firstName}</h1>
//                 <h1 className='text-secondaryColor font-bold'>{user.email}</h1>
//                 <Link to="/profile" className='border border-textColor rounded-md py-2 px-8 hover:bg-textColor hover:text-whiteColor'>Profile</Link> {/* Reduced button padding */}
//                 <button onClick={logOutUser} className='border border-textColor bg-textColor text-whiteColor rounded-md py-2 px-8 hover:bg-headerTextColor hover:text-whiteColor'>Logout</button> {/* Reduced button padding */}
//               </div>
//             </div>
//           ) : (
//             <Link to='./login' className='btnbtn border border-textColor py-2 px-5 rounded-md'>Sign In</Link> 
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <div onClick={handleNav} className="md:hidden">
//           {!nav ? <HiBars3BottomLeft size={25} className='text-secondaryColor' /> : <AiOutlineClose size={25} className='text-secondaryColor' />} 
//         </div>

//         {/* Mobile Nav */}
//         <div className={`${!nav ? 'hidden' : 'flex'} fixed left-0 top-0 h-full w-[80%] bg-whiteColor p-4 flex-col`}> 
//           <ul className='flex flex-col justify-around gap-4 bg-whiteColor text-lg'>
//             <NavLink to="/" onClick={closeNav} className={({ isActive }) => isActive ? 'active hover:text-secondaryColor ' : 'link'}>Home</NavLink>
//             <NavLink to="/about" onClick={closeNav} className='hover:text-secondaryColor'>About</NavLink>
//             <NavLink to="/services" onClick={closeNav} className='hover:text-secondaryColor'>Services</NavLink>
//             <NavLink to="/prices" onClick={closeNav} className='hover:text-secondaryColor'>Prices</NavLink>
//             <NavLink to="/contact" onClick={closeNav} className='hover:text-secondaryColor'>Contact</NavLink>
//             {user.id !== null ? (
//               <button onClick={() => { closeNav(); logOutUser(); }} className='border border-whiteColor text-whiteColor py-2 px-6 rounded-md'>Logout</button> 
//             ) : (
//               <Link to='./login' onClick={closeNav} className='border border-whiteColor text-whiteColor py-2 px-6 rounded-md'>Sign In</Link>
//             )}
//           </ul>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default NavBar;
