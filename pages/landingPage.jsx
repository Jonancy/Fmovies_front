 
import React from 'react'
import { Link } from 'react-router-dom'
import SipderBg from '../assets/bg.jpg'
import Top from '../features/landingPage/components/top'


export default function LandingPage() {

  return (
    <>
        <div className='bg-center bg-cover' style={{backgroundImage: `url(${SipderBg})`, }}>
            <div className='flex justify-center items-center h-screen '>
                <div className='flex flex-col rounded-[10px] p-8 bg-neutral-900'>
                    <Top />
                </div>
            </div>
        </div>

        {/* <Link to='/home'>Home</Link> */}
    </>
  )
}
