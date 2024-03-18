import  'react'
import { Outlet } from 'react-router-dom'

import Sidebar1 from './Sidebar1'


export default function Layout() {
  return (
    <>
    <div className='flex flex-row bg-bgwhite h-screen w-screen overflow-hidden'>
    <Sidebar1/>
    <div>Header</div>
    </div>
    
    <div>{<Outlet/>}</div>
    </>
  )
}
