import React from 'react'
import Carousel from './Carousel'
import MiniAbout from './MiniAbout'
import Slider from './Slider'
import HowItWorks from './HowItWorks'
import HardTime from './HardTime'

function Home() {
  return (
    <div className='pt-10'>
      <Carousel />
      {/* <Slider /> */}
      <MiniAbout />
      <HowItWorks />
      <HardTime />
    </div>
  )
}

export default Home
