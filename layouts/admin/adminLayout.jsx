
import React from 'react'
import Navbar from '../../components/navbar/navbar'
import LeftBar from '../../features/admin/components/leftBar'

export default function AdminLayout({children}) {
  return (
    <>
    <div className='flex'>
      <LeftBar/>
      {children}
    </div>
    </>
  )
}
