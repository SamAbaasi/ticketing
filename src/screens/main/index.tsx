import React from 'react'

import { Layout } from '@/layouts/layout'
import { Outlet } from 'react-router'

const MainPage = () => {
  return (
    <>
      <div>
        <Layout />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MainPage
