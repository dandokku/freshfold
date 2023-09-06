import React from 'react';
import GetImage from '../../Assets/Images/vladimir-gladkov-eN9atEtVtcc-unsplash.jpg'
import AppStore from '../../Assets/Images/appStore.png'
import GooglePlay from '../../Assets/Images/playStore.png'

function GetApp() {
  return (
    <div className="h-[60vh] relative">
        <img src={GetImage} alt="" className="h-full w-full" />
        <div className="absolute inset-0 flex flex-col justify-center items-center w-full bg-linearBackground p-4">
            <div className='flex flex-col items-center justify-center gap-4'>
              <h1 className='text-secondaryColor font-bold text-4xl'>Book Even Faster</h1>
              <div className='flex items-center justify-between gap-3'>
                <img src={AppStore} alt="" className='w-[150px] h-[50px] cursor-pointer'/>
                <img src={GooglePlay} alt="" className='w-[150px] h-[66px] cursor-pointer'/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default GetApp
