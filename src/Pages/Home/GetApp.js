// import React from 'react';
// import GetImage from '../../Assets/Images/vladimir-gladkov-eN9atEtVtcc-unsplash.jpg'
// import AppStore from '../../Assets/Images/appStore.png'
// import GooglePlay from '../../Assets/Images/playStore.png'

// function GetApp() {
//   return (
//     <div className="h-[60vh] relative">
//         <img src={GetImage} alt="" className="h-full w-full" />
//         <div className="absolute inset-0 flex flex-col justify-center items-center w-full bg-linearBackground p-4">
//             <div className='flex flex-col items-center justify-center gap-4'>
//               <h1 className='text-secondaryColor font-bold text-4xl'>Book Even Faster</h1>
//               <div className='flex items-center justify-between gap-3'>
//                 <img src={AppStore} alt="" className='w-[150px] h-[50px] cursor-pointer shadowy-border glow'/>
//                 <img src={GooglePlay} alt="" className='w-[150px] h-[66px] cursor-pointer shadowy-border glow'/>
//               </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default GetApp


import React from 'react';
import GetImage from '../../Assets/Images/vladimir-gladkov-eN9atEtVtcc-unsplash.jpg';
import AppStore from '../../Assets/Images/appStore.png';
import GooglePlay from '../../Assets/Images/playStore.png';

function GetApp() {
  return (
    <div className="relative h-[40vh] md:h-[60vh]">
        <img src={GetImage} alt="App Promotion" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-center items-center w-full bg-linearBackground p-4">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-secondaryColor font-bold text-3xl md:text-4xl">
                Book Even Faster
              </h1>
              <div className="flex items-center justify-center gap-3">
                <img 
                  src={AppStore} 
                  alt="Download on App Store" 
                  className="w-[120px] h-[40px] md:w-[150px] md:h-[50px] cursor-pointer shadowy-border glow" 
                />
                <img 
                  src={GooglePlay} 
                  alt="Download on Google Play" 
                  className="w-[120px] h-[50px] md:w-[150px] md:h-[66px] cursor-pointer shadowy-border glow" 
                />
              </div>
            </div>
        </div>
    </div>
  );
}

export default GetApp;
