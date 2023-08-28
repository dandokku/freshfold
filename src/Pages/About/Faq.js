import React from 'react'
import FaqImage from '../../Assets/undraw_faq_re_31cw.svg'
import { MdOutlineAdd } from 'react-icons/md'

export default function Faq() {
  return (
    <div className='p-7 m-10'>
      <h1 className='text-4xl font-bold text-textColor text-center mb-10'>Frequently Asked Questioins</h1>
      <div className='flex items-center justify-between gap-10'>
        <div className='flex flex-col gap-8'>
          <div>
            <div className='flex items-center justify-between'>
              <p>What are the most frequently asked questions you receive on daily basis?</p>
              <MdOutlineAdd size={30} className='text-secondaryColor' />
            </div>
            <p className='mt-3 p-3 bg-secondaryColor rounded-md'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, quos eligendi? Quisquam maxime accusantium harum beatae explicabo neque nostrum necessitatibus deleniti dolorum, reprehenderit possimus inventore distinctio magni! Eos, ipsam doloribus.</p>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <p>What are the most frequently asked questions you receive on daily basis?</p>
              <MdOutlineAdd size={30} className='text-secondaryColor' />
            </div>
            <p className='mt-3 p-3 bg-secondaryColor rounded-md'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, quos eligendi? Quisquam maxime accusantium harum beatae explicabo neque nostrum necessitatibus deleniti dolorum, reprehenderit possimus inventore distinctio magni! Eos, ipsam doloribus.</p>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <p>What are the most frequently asked questions you receive on daily basis?</p>
              <MdOutlineAdd size={30} className='text-secondaryColor' />
            </div>
            <p className='mt-3 p-3 bg-secondaryColor rounded-md'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, quos eligendi? Quisquam maxime accusantium harum beatae explicabo neque nostrum necessitatibus deleniti dolorum, reprehenderit possimus inventore distinctio magni! Eos, ipsam doloribus.</p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center gap-8 text-center'>
          <img src={FaqImage} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam unde non quam? Voluptas est quos, officia commodi iusto reprehenderit laudantium quo sapiente rem esse necessitatibus iure veritatis fuga perferendis asperiores?</p>
        </div>
      </div>
    </div>
    
  )
}
