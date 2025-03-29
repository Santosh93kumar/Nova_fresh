import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'
function Settinglayout() {
  return (
    <div>
        <div className="flex bg-gray-100">
    <Sidebar/>
    <div className='flex flex-col w-full'>
      <Header/>
      {/* <Vieworder/> */}
      <Outlet/>
     
    </div>
    </div>
      
    </div>
  )
}

export default Settinglayout;
