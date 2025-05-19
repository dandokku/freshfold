// import React from 'react'
// import Team1 from '../../Assets/Images/Worker1.avif'
// import Team2 from '../../Assets/Images/Worker2.avif'
// import Team3 from '../../Assets/Images/Worker3.avif'
// import Team4 from '../../Assets/Images/Worker4.avif'

// function OurTeam() {
//   return (
//     <div className='p-14 bg-shadColor h-[80vh] flex flex-col items-center gap-10 '>
//       <h1 className='font-bold text-4xl text-headerTextColor text-center'>Our Team</h1>
//       <div className=' flex justify-between gap-6'>
//         <div className='flex flex-col items-center justify-evenly gap-4'>
//           <img src={Team1} alt="" className='h-[200px] w-[250px] rounded-md' />
//           <h1 className='font-bold text-headerTextColor'>Daniel Jesuloba</h1>
//           <span className='text-secondaryColor'>Founder</span>
//         </div>
//         <div className='mt-14 flex flex-col items-center justify-evenly gap-4'>
//           <img src={Team2} alt="" className='h-[200px] w-[250px] rounded-md' />
//           <h1 className='font-bold text-headerTextColor'>Franky Kinney</h1>
//           <span className='text-secondaryColor'>Co-Founder</span>
//         </div>
//         <div className='flex flex-col items-center justify-evenly gap-4'>
//           <img src={Team3} alt="" className='h-[200px] w-[250px] rounded-md' />
//           <h1 className='font-bold text-headerTextColor'>Alexandra Berka</h1>
//           <span className='text-secondaryColor'>Creative Consultant</span>
//         </div>
//         <div className='mt-14 flex flex-col items-center justify-evenly gap-4'>
//           <img src={Team4} alt="" className='h-[200px] w-[250px] rounded-md' />
//           <h1 className='font-bold text-headerTextColor'>Markus Shinny</h1>
//           <span className='text-secondaryColor'>Creative Leader</span>
//         </div>
//       </div>
//     </div>
  
//   )
// }

// export default OurTeam

import React from 'react';
import Team1 from '../../Assets/Images/Worker1.avif';
import Team2 from '../../Assets/Images/Worker2.avif';
import Team3 from '../../Assets/Images/Worker3.avif';
import Team4 from '../../Assets/Images/Worker4.avif';

function OurTeam() {
  return (
    <div className='p-14 bg-shadColor h-auto flex flex-col items-center gap-10'>
      <h1 className='font-bold text-4xl text-headerTextColor text-center'>Our Team</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='flex flex-col items-center gap-4'>
          <img src={Team1} alt="Team Member 1" className='h-[200px] w-[250px] object-cover rounded-md' />
          <h1 className='font-bold text-headerTextColor'>Daniel Jesuloba</h1>
          <span className='text-secondaryColor'>Founder</span>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <img src={Team2} alt="Team Member 2" className='h-[200px] w-[250px] object-cover rounded-md' />
          <h1 className='font-bold text-headerTextColor'>Franky Kinney</h1>
          <span className='text-secondaryColor'>Co-Founder</span>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <img src={Team3} alt="Team Member 3" className='h-[200px] w-[250px] object-cover rounded-md' />
          <h1 className='font-bold text-headerTextColor'>Alexandra Berka</h1>
          <span className='text-secondaryColor'>Creative Consultant</span>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <img src={Team4} alt="Team Member 4" className='h-[200px] w-[250px] object-cover rounded-md' />
          <h1 className='font-bold text-headerTextColor'>Markus Shinny</h1>
          <span className='text-secondaryColor'>Creative Leader</span>
        </div>
      </div>
    </div>
  );
}

export default OurTeam;
