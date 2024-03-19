import  'react'
import { Outlet } from 'react-router-dom'

import Sidebar1 from './Sidebar1'
import Header from './Header'


export default function Layout() {
  return (
    <>
      <div className='flex flex-row bg-bgwhite h-screen w-screen overflow-hidden'>
        <Sidebar1 />
        <div className="flex flex-col flex-1">
          <Header />
          <div className="flex-1 p-4 min-h-0 overflow-auto max-h-screen"> 
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
