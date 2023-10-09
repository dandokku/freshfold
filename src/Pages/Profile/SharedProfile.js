import React from 'react'
import Dashboard from "./Dashboard"
import { Outlet } from 'react-router'

function SharedProfile() {
  return (
      <div className=''>
          <Dashboard className="mb-10"/>

          <Outlet />
    </div>
  )
}

export default SharedProfile
