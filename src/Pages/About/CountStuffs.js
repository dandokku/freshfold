import React, { useEffect, useState } from 'react';
import { MdOutlineDirtyLens, MdOutlineDryCleaning, MdOutlineIron, MdOutlineLocalLaundryService } from 'react-icons/md'
import CountUp from 'react-countup';
import Image1 from "../../Assets/Images/waldemar-cue0DuZ8cUU-unsplash.jpg"

function CountStuffs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.2, // 20% of the element must be visible
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(document.querySelector('#count-stuffs')); 
  }, []);

  return (
    <div className='relative h-[70vh] w-full'>
      <img src={Image1} className='h-[70vh] w-full' />
      <div className='absolute inset-0 w-full bg-linearBackground p-11 flex items-center justify-between gap-8' id="count-stuffs">
      <div className={`hover:scale-105 flex flex-col items-center gap-2 ${isVisible ? '' : 'opacity-0'}`}>
        <MdOutlineLocalLaundryService className='text-[200px] text-shadColor' />
        <CountUp start={0} end={isVisible ? 4000 : 0} duration={3} separator="," className='text-whiteColor font-bold text-6xl' />
        <p className='text-whiteColor'>Clothes Washed</p>
      </div> 
          
      <div className={`hover:scale-105 flex flex-col items-center gap-2 ${isVisible ? '' : 'opacity-0'}`}>
        <MdOutlineDryCleaning className='text-[200px] text-shadColor' />
        <CountUp start={0} end={isVisible ? 9200 : 0} duration={3} separator="," className='text-whiteColor font-bold text-6xl' />
        <p className='text-whiteColor'>Shirts Washed and Folded</p>
      </div> 

      <div className={`hover:scale-105 flex flex-col items-center gap-2 ${isVisible ? '' : 'opacity-0'}`}>
        <MdOutlineIron className='text-[200px] text-shadColor' />
        <CountUp start={0} end={isVisible ? 7920 : 0} duration={3} separator="," className='text-whiteColor font-bold text-6xl' />
        <p className='text-whiteColor'>Shirts Ironed</p>
      </div> 

      <div className={`hover:scale-105 flex flex-col items-center gap-2 ${isVisible ? '' : 'opacity-0'}`}>
        <MdOutlineDirtyLens className='text-[200px] text-shadColor' />
        <CountUp start={0} end={isVisible ? 6000 : 0} duration={3} separator="," className='text-whiteColor font-bold text-6xl' />
        <p className='text-whiteColor'>Stains Removed</p>
      </div> 
      </div>
    </div>
    
  )
}

export default CountStuffs
