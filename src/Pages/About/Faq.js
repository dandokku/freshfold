// import React from 'react'
// import FaqImage from '../../Assets/undraw_faq_re_31cw.svg'
// import { MdOutlineAdd } from 'react-icons/md'
// import { useState } from 'react';

// export default function Faq() {
//   // Create state to manage whether answers are visible or hidden
//   const [showAnswers, setShowAnswers] = useState(false);

//   // Function to toggle the visibility of answers
//   const toggleAnswers = () => {
//     setShowAnswers(!showAnswers);
//   };


//   return (
//     <div className='p-7 m-10'>
//       <h1 className='text-4xl font-bold text-textColor text-center mb-10'>Frequently Asked Questioins</h1>
//       <div className='flex items-center justify-center gap-10'>
//         <div className='flex flex-col items-center gap-8 w-full'>
//           <div className='shadow p-3 rounded-md'>
//               <div className='flex items-center justify-between cursor-pointer' onClick={toggleAnswers}>
//                 <p>What are the most frequently asked questions you receive on a daily basis?</p>
//                 <MdOutlineAdd size={30} className={`text-secondaryColor ${showAnswers ? 'transform rotate-45' : ''}`} />
//               </div>
//               {showAnswers && (
//                 <p className='mt-3 p-3 bg-secondaryColor rounded-md'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, quos eligendi? Quisquam maxime accusantium harum beatae explicabo neque nostrum necessitatibus deleniti dolorum, reprehenderit possimus inventore distinctio magni! Eos, ipsam doloribus.</p>
//               )}
//           </div>

//           <div className='shadow p-3 rounded-md'>
//               <div className='flex items-center justify-between cursor-pointer' onClick={toggleAnswers}>
//                 <p>What are the most frequently asked questions you receive on a daily basis?</p>
//                 <MdOutlineAdd size={30} className={`text-secondaryColor ${showAnswers ? 'transform rotate-45' : ''}`} />
//               </div>
//               {showAnswers && (
//                 <p className='mt-3 p-3 bg-secondaryColor rounded-md'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, quos eligendi? Quisquam maxime accusantium harum beatae explicabo neque nostrum necessitatibus deleniti dolorum, reprehenderit possimus inventore distinctio magni! Eos, ipsam doloribus.</p>
//               )}
//           </div>

//           <div className='shadow p-3 rounded-md'>
//               <div className='flex items-center justify-between cursor-pointer' onClick={toggleAnswers}>
//                 <p>What are the most frequently asked questions you receive on a daily basis?</p>
//                 <MdOutlineAdd size={30} className={`text-secondaryColor ${showAnswers ? 'transform rotate-45' : ''}`} />
//               </div>
//               {showAnswers && (
//                 <p className='mt-3 p-3 bg-secondaryColor rounded-md'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, quos eligendi? Quisquam maxime accusantium harum beatae explicabo neque nostrum necessitatibus deleniti dolorum, reprehenderit possimus inventore distinctio magni! Eos, ipsam doloribus.</p>
//               )}
//           </div>
//         </div>

//         <div className='flex flex-col items-center justify-center gap-8 text-center w-[70%]'>
//           <img src={FaqImage} alt="" />
//           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam unde non quam? Voluptas est quos, officia commodi iusto reprehenderit laudantium quo sapiente rem esse necessitatibus iure veritatis fuga perferendis asperiores?</p>
//         </div>
//       </div>
//     </div>
    
//   )
// }


import React, { useState } from 'react';
import FaqImage from '../../Assets/undraw_faq_re_31cw.svg';
import { MdOutlineAdd } from 'react-icons/md';

export default function Faq() {
  // Create state to manage the visibility of answers for each question
  const [showAnswers, setShowAnswers] = useState([false, false, false]);

  // Function to toggle the visibility of answers for a specific question
  const toggleAnswers = (index) => {
    const newShowAnswers = [...showAnswers];
    newShowAnswers[index] = !newShowAnswers[index];
    setShowAnswers(newShowAnswers);
  };

  return (
    <div className='p-7 m-10'>
      <h1 className='text-4xl font-bold text-textColor text-center mb-10'>Frequently Asked Questions</h1>
      <div className='flex items-center justify-center gap-10'>
        <div className='flex flex-col items-center gap-8 w-full'>
          {showAnswers.map((isShown, index) => (
            <div key={index} className='shadow p-3 rounded-md'>
              <div className='flex items-center justify-between cursor-pointer' onClick={() => toggleAnswers(index)}>
                <p>What are the most frequently asked questions you receive on a daily basis?</p>
                <MdOutlineAdd size={30} className={`text-secondaryColor ${isShown ? 'transform rotate-45' : ''}`} />
              </div>
              {isShown && (
                <p className='mt-3 p-3 bg-secondaryColor rounded-md'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, quos eligendi? Quisquam maxime accusantium harum beatae explicabo neque nostrum necessitatibus deleniti dolorum, reprehenderit possimus inventore distinctio magni! Eos, ipsam doloribus.
                </p>
              )}
            </div>
          ))}
        </div>

        <div className='flex flex-col items-center justify-center gap-8 text-center w-[70%]'>
          <img src={FaqImage} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam unde non quam? Voluptas est quos, officia commodi iusto reprehenderit laudantium quo sapiente rem esse necessitatibus iure veritatis fuga perferendis asperiores?</p>
        </div>
      </div>
    </div>
  );
}
