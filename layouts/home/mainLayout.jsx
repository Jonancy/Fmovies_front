import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'

export default function MainLayout({children}) {
  return (
    <>
      <div className='bg-neutral-950 text-white'>
      <Navbar />
        {children}
      <Footer />
      </div>
    </>
  )
}
