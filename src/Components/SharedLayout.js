import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import ScrollToTopButton from './ScrollToTopButton'

function SharedLayout() {
  return (
    <div className='relative'>
        <NavBar /> 

      <Outlet /> 
      
      <ScrollToTopButton />

        <Footer />
    </div>
  )
}

export default SharedLayout
