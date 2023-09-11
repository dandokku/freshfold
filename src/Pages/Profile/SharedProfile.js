import React from 'react'
import Dashboard from "./Dashboard"
import { Outlet } from 'react-router'

function SharedProfile() {
  return (
      <div className='flex gap-3'>
          <Dashboard />

          <Outlet />
    </div>
  )
}

export default SharedProfile
