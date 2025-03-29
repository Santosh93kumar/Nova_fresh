import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'
function Orderlayout() {
  return (
    <>
    <div className="flex bg-gray-100">
    <Sidebar/>
    <div className='flex flex-col w-full'>
      <Header/>
      {/* <Vieworder/> */}
      <Outlet/>
     
    </div>
    </div>
        
    </>
  )
}

export default Orderlayout
