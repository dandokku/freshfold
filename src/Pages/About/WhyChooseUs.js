// import React from 'react'
// import { MdOutlineCheck, MdOutlineCrueltyFree, MdOutlineMoney } from 'react-icons/md'

// function WhyChooseUs() {
//   return (
//     <div className='flex flex-col items-center justify-center gap-10 mt-16 mb-20 p-6'>
//       <div className='text-center'>
//         <span className='text-secondaryColor'>Our Advantages</span>
//         <h1 className='text-headerTextColor font-bold text-5xl'>Why Choose Us</h1>
//       </div>

//       <div className='flex gap-4 items-center justify-center'>
//         <div className='hover:scale-105 hover:bg-gray-200 hover:shadow-lg flex flex-col items-center justify-center text-center p-6 gap-4 rounded-md shadow'>
//           <MdOutlineCrueltyFree className='text-secondaryColor' size={90} />
//             <h1 className='text-2xl font-bold text-secondaryColor'>Personalized Experience</h1>
//             <p>We take utmost care of your clothes, segregating based on the cloth type and giving you instant clothes to make a statement </p>
//         </div>

//         <div className='hover:scale-105 hover:bg-gray-200 hover:shadow-lg flex flex-col items-center justify-center text-center p-7 bg-shadColor gap-4 rounded-md shadow'>
//           <MdOutlineCheck className='text-secondaryColor' size={90} />
//             <h1 className='text-2xl font-bold text-secondaryColor'>Quality</h1>
//             <p>We use the best in class products, to assure that your favorite clothes are always there for you to wear.</p>
//         </div>

//         <div className='hover:scale-105 hover:bg-gray-200 hover:shadow-lg flex flex-col items-center p-6  justify-center text-center gap-4 rounded-md shadow'>
//           <MdOutlineMoney className='text-secondaryColor' size={90} />
//             <h1 className='text-2xl font-bold text-secondaryColor'>Affordable Pricing</h1>
//             <p>Prices that suits your pocket is one of our USP. An option of choosing between 2 types of pricing is available.</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WhyChooseUs


import React from 'react'
import { MdOutlineCheck, MdOutlineCrueltyFree, MdOutlineMoney } from 'react-icons/md'

function WhyChooseUs() {
  return (
    <div className='flex flex-col items-center justify-center gap-10 mt-16 mb-10 p-6'>
      <div className='text-center'>
        <span className='text-secondaryColor'>Our Advantages</span>
        <h1 className='text-headerTextColor font-bold text-4xl md:text-5xl'>Why Choose Us</h1>
      </div>

      <div className='flex flex-col md:flex-row gap-6 items-center justify-center'>
        <div className='hover:scale-105 hover:bg-gray-200 hover:shadow-lg flex flex-col items-center justify-center text-center p-6 gap-4 rounded-md shadow transition-all duration-300 ease-in-out'>
          <MdOutlineCrueltyFree className='text-secondaryColor' size={90} />
          <h1 className='text-2xl font-bold text-secondaryColor'>Personalized Experience</h1>
          <p className='text-center max-w-xs'>We take utmost care of your clothes, segregating based on the cloth type and giving you instant clothes to make a statement.</p>
        </div>

        <div className='hover:scale-105 hover:bg-gray-200 hover:shadow-lg flex flex-col items-center justify-center text-center p-6 bg-shadColor gap-4 rounded-md shadow transition-all duration-300 ease-in-out'>
          <MdOutlineCheck className='text-secondaryColor' size={90} />
          <h1 className='text-2xl font-bold text-secondaryColor'>Quality</h1>
          <p className='text-center max-w-xs'>We use the best in class products to ensure that your favorite clothes are always ready to wear.</p>
        </div>

        <div className='hover:scale-105 hover:bg-gray-200 hover:shadow-lg flex flex-col items-center p-6 justify-center text-center gap-4 rounded-md shadow transition-all duration-300 ease-in-out'>
          <MdOutlineMoney className='text-secondaryColor' size={90} />
          <h1 className='text-2xl font-bold text-secondaryColor'>Affordable Pricing</h1>
          <p className='text-center max-w-xs'>We offer pricing options that suit your pocket, providing flexibility and affordability.</p>
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs;
