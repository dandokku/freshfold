import React from 'react'
import ProfImage from '../../Assets/Images/Worker1.avif'
import { useSelector } from "react-redux";

function MyProfile(props) {

  const user = useSelector((state) => state.user);
  console.log("Dashboard: ", props.Dashboard)
    
  
  return (
    <div className='pt-36 flex items-center justify-center gap-5 mx-[20%]'>
      <img src={ProfImage} alt="" className='w-[300px] h-[300px] rounded-[50%] shadow' />
      
      <div className='flex flex-col gap-5'>
        <div className='flex gap-2 items-center text-xl'>
          <h1 className='font-bold text-secondaryColor'>Username: </h1>
          <h1 className='text-secondaryColor'>{user.firstName} {user.lastName }</h1>      
        </div>

        <div className='flex gap-2 items-center text-xl'>
          <h1 className='font-bold text-secondaryColor'>Email Address: </h1>
          <h1>{user.email}</h1>      
        </div>

        <div className='flex gap-2 items-center text-xl'>
          <h1 className='font-bold text-secondaryColor'>Phone NO: </h1>
          <h1>{user.phoneNo}</h1>      
        </div>

        <div className='flex gap-2 items-center text-xl'>
          <h1 className='font-bold text-secondaryColor'>Address: </h1>
          <h1>{user.address}</h1>      
        </div>

      </div>

    </div>
  )
}

export default MyProfile
