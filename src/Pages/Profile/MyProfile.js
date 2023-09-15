import React from 'react'
import ProfImage from '../../Assets/Images/Worker1.avif'

function MyProfile() {
  return (
    <div className='flex items-center justify-center gap-5 flex-col mx-[20%]'>
      <img src={ProfImage} alt="" className='w-[300px] h-[300px] rounded-[50%] shadow' />
      
      <div className='flex flex-col gap-5'>
        <div className='flex gap-2 items-center text-xl'>
          <h1 className='font-bold text-secondaryColor'>Username: </h1>
          <h1>Daniel Jesuloba</h1>      
        </div>

        <div className='flex gap-2 items-center text-xl'>
          <h1 className='font-bold text-secondaryColor'>Email Address: </h1>
          <h1>jesulobadaniel!@gmail.com</h1>      
        </div>

        <div className='flex gap-2 items-center text-xl'>
          <h1 className='font-bold text-secondaryColor'>Phone NO: </h1>
          <h1>08104618586</h1>      
        </div>

        <div className='flex gap-2 items-center text-xl'>
          <h1 className='font-bold text-secondaryColor'>Address: </h1>
          <h1>Welp welp after welp street number welp off welp road</h1>      
        </div>

      </div>

    </div>
  )
}

export default MyProfile
