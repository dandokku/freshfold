import React from 'react'
import HeroSection from './HeroSection'
import MiniAbout from './MiniAbout'
import HowItWorks from './HowItWorks'
import HardTime from './HardTime'
import GetApp from './GetApp'
import OurPricesMini from './OurPricesMini'

function Home() {
  return (
    <div className='pt-10 w-full'>
      <HeroSection />
      <MiniAbout />
      <HowItWorks />
      <OurPricesMini />
      <HardTime />
      <GetApp />
    </div>
  )
}

export default Home
