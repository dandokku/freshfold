import React, { useState } from 'react'
import { NavLink, useLocation, useMatch, Link } from 'react-router-dom'
import { MdOutlineAccountCircle, MdOutlineEdit, MdOutlineHistory } from "react-icons/md"
import { FaSoap, FaCog } from 'react-icons/fa'
import axios from "axios";
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setUserSignOut } from '../Features/userSlice';


function Dashboard(props) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [nav, setNav] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNav = () => {
    setNav(!nav);
  }

  function logOutUser() {
    queryClient.removeQueries("user");
    dispatch(setUserSignOut());
    localStorage.removeItem("user-jwt");
  }

  const location = useLocation();
    const currentPath = location.pathname;
    console.log(props.sidebar)

    const user = useSelector((state) => state.user);

      const matchProfile = useMatch('/profile');
      const matchHistory = useMatch('/Profile/History/*');
      const matchManagement = useMatch('/Profile/EditProfile/*');

  return (
      
    <div className='bg-whiteColor h-max w-full p-6 fixed z-40 drop-shadow-sm flex items-center justify-evenly'>
      <div className=''>
        <Link to='/'>
          <span className='logo text-secondaryColor font-bold text-3xl flex items-center max-sm:text-xl'>Fresh <span className='text-secondaryColor flex '>F <span><FaSoap className="text-secondaryColor" size={30} /></span> ld</span> </span>
        </Link>
      </div>

      <div className='flex gap-6 bg-shadColor p-3 rounded-md'>
        <NavLink to="/profile" isActive={matchProfile} className='flex items-center gap-2 text-mainColor'>
          <MdOutlineAccountCircle />
          <h1>My Account</h1>
        </NavLink>

        <NavLink to="editprofile" isActive={matchManagement} className='flex items-center gap-2 text-mainColor'>
          <MdOutlineEdit />
          <h1>Edit Account</h1>
        </NavLink>

        <NavLink to="history" isActive={matchHistory} className='flex items-center gap-2 text-mainColor'>
          <MdOutlineHistory />
          <h1>Booking History</h1>
        </NavLink>
      </div>
      
      <div className='relative group' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown} >
              <div className='flex gap-1 items-center'>
                <FaCog className='text-secondaryColor text-4xl' />
              </div>
              <div className={`${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-2 space-y-2 bg-secondaryColor text-textColor p-5 rounded-md w-max flex flex-col items-center gap-3`}>
                <h1 className='text-whiteColor font-bold'>{user.firstName}</h1>
                <h1 className='text-whiteColor font-bold'>{user.email}</h1>
                <button className='btnbtn w-full p-2 px-5 rounded-md text-center bg-textColor text-whiteColor hover:text-secondaryColor hover:bg-whiteColor'> Logout </button>
                <button className='btnbtn w-full p-2 px-5 rounded-md text-center bg-red-500 text-whiteColor hover:bg-red-600'>Delete Account</button>
              </div>
          </div>
    </div>
  )
}

export default Dashboard
