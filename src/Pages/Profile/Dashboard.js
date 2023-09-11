import React from 'react'
import ProfileImage from "../../Assets/Images/Worker1.avif"
import { NavLink, Link } from 'react-router-dom'
import { MdOutlineAccountCircle, MdOutlineEdit, MdOutlineHistory } from "react-icons/md"
import { FaSoap } from 'react-icons/fa'

function Dashboard() {
  return (
      
    <div className='h-[100vh] w-[300px] bg-shadColor shadow p-5 flex flex-col items-center justify-between gap-7'>
      <div className='flex text-left'>
        <Link to='/'>
          <span className='logo text-secondaryColor font-bold text-3xl flex items-center max-sm:text-xl'>Fresh <span className='text-secondaryColor flex '>F <span><FaSoap className="text-secondaryColor" size={30} /></span> ld</span> </span>
        </Link>
      </div>

      <div className='flex flex-col items-center justify-center gap-5'>
        <img src={ProfileImage} alt="" className='w-[100px] h-[100px] rounded-[50%]' />
        <h1 className='text-whiteColor font-bold text-xl'>Daniel Jesuloba</h1>
      </div>
      
      <div className='flex flex-col gap-6'>
        <NavLink to="myprofile" className='flex items-center justify-center gap-1 bg-gray-300 p-2 rounded-md text-xl text-whiteColor'>
          <MdOutlineAccountCircle />
          <h1>My Account</h1>
        </NavLink>

        <NavLink to="editprofile" className='flex items-center justify-center gap-1 bg-gray-300 p-2 rounded-md text-xl text-whiteColor'>
          <MdOutlineEdit />
          <h1>Edit Account</h1>
        </NavLink>

        <NavLink to="history" className='flex items-center justify-center gap-1 bg-gray-300 p-2 rounded-md text-xl text-whiteColor'>
          <MdOutlineHistory />
          <h1>Booking History</h1>
        </NavLink>
      </div>

      <button className='btnbtn p-3 px-11 w-[90%] font-semibold bg-textColor text-whiteColor rounded-md hover:bg-whiteColor hover:text-textColor'> Logout </button>

      <button className='p-3 border border-red-600 px-11 rounded-md btnbtn hover:bg-red-600 text-red-600 hover:text-whiteColor'>Delete Account</button>
    </div>
  )
}

export default Dashboard
