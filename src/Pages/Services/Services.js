import React from 'react'
import OurFeatures from './OurFeatures'
import Discount from './Discount'
import OfferedServices from './OfferedServices'

function Services() {
  return (
    <div className='pt-14'>
      <OfferedServices />
      <OurFeatures />
      <Discount />
    </div>
  )
}

export default Services
