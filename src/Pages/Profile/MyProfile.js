import React from 'react'
import ProfImage from '../../Assets/Images/user_1177568.png'
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"

function MyProfile(props) {

  const user = useSelector((state) => state.user);
  console.log("Dashboard: ", props.Dashboard)
    
  
  return (
    <div className='pt-36 flex items-center justify-between gap-12 mx-[20%] w-max '>
      <img src={ProfImage} alt="" className='w-[400px] h-[400px] rounded-[50%] shadow' />
      
      <div className='flex flex-col gap-8 w-full'>
        <h1 className='font-bold text-headerTextColor text-4xl text-left'>Contact Information</h1>

        <div className='w-max flex flex-col gap-7'>
          <div className="flex gap-3 justify-between">
            <div>
              <h1 className='text-secondaryColor text-2xl font-semibold'>Name</h1>
              <p className=' text-textColor'>{user.firstName} {user.lastName }</p>
            </div>

            <div>
              <h1 className='text-secondaryColor text-2xl font-semibold'>Email Address</h1>
              <p className='text-textColor'>{user.email}</p>
            </div>
          </div>
          
          
            <div>
              <h1 className='text-secondaryColor text-2xl font-semibold'>Phone</h1>
              <p className='text-textColor'>{user.phoneNo}</p>
            </div>

            <div>
              <h1 className='text-secondaryColor text-2xl font-semibold'>Home Address</h1>
              <p className='text-textColor'>{user.address}</p>
            </div>
        </div>
        
        <Link to='./editprofile' className='btnbtn p-3 px-7 bg-textColor text-whiteColor rounded-md hover:bg-secondaryColor cursor-pointer w-max'>Edit Profile</Link>
        
        
      </div>

    </div>
  )
}

export default MyProfile
