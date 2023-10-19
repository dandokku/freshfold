import React from 'react'
import HeroAbout from './HeroAbout'
import FewWords from './FewWords'
import WhyChooseUs from './WhyChooseUs'
import OurTeam from './OurTeam'
import Faq from './Faq'
import Testimonials from './Testimonials'
import CountStuffs from './CountStuffs'

function About() {
  return (
    <div className='pt-11 flex flex-col gap-5'>
      {/* <HeroAbout /> */}
      <FewWords />
      <WhyChooseUs />
      <CountStuffs />
      <Testimonials className="mb-11" />
      <Faq />
      <OurTeam />
    </div>
  )
}

export default About
