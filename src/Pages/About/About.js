import React from 'react'
import HeroAbout from './HeroAbout'
import FewWords from './FewWords'
import WhyChooseUs from './WhyChooseUs'
import OurTeam from './OurTeam'
import Faq from './Faq'
import Testimonials from './Testimonials'

function About() {
  return (
    <div className='pt-11'>
      <HeroAbout />
      <FewWords />
      <WhyChooseUs />
      <Testimonials />
      <Faq />
      <OurTeam />
    </div>
  )
}

export default About
