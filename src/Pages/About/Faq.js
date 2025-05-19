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
    <div className='m-10'>
      <h1 className='md:text-4xl text-2xl font-bold text-textColor text-center mb-10'>Frequently Asked Questions</h1>
      <div className='flex flex-col lg:flex-row items-center justify-center gap-10'>
        <div className='flex flex-col items-center gap-8 w-full lg:w-[50%]'>
          <div className='w-full p-4 md:text-xl'>
            {showAnswers.map((isShown, index) => (
              <div key={index} className='shadow p-4 rounded-md w-full mb-2'>
                <div
                  className='flex items-center justify-between cursor-pointer'
                  onClick={() => toggleAnswers(index)}
                  aria-expanded={isShown}
                  aria-controls={`answer-${index}`}
                >
                  <p className='font-semibold'>How does the booking process work?</p>
                  <MdOutlineAdd size={30} className={`text-secondaryColor transition-transform duration-300 ${isShown ? 'rotate-45' : ''}`} />
                </div>
                {isShown && (
                  <p id={`answer-${index}`} className='mt-3 p-3 bg-secondaryColor rounded-md'>
                    The booking process is simple. You can create an account, select your laundry preferences, choose a convenient time slot, and submit your order. Our team will take care of the rest.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col items-center justify-center text-center w-full lg:w-[50%]'>
          <img src={FaqImage} alt="Frequently Asked Questions" className='w-full max-w-sm mb-4' />
          <p>
            Have questions about our laundry booking website? You're in the right place! We've compiled a list of commonly asked questions to provide you with quick answers and help you make the most of your laundry experience. Find information on everything from booking procedures to pricing and delivery. If you can't find the answer you're looking for here, don't hesitate to contact our support team for further assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
