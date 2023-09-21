import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LeftBar() {

    const[changeBar,setChangeBar] = useState('user')

  return (
    <>
        <div className='flex flex-col border-r-2 h-max-screen border-r-black w-1/4'>
            <div className=''>
                <div className='flex hover:bg-cyan-300  p-4 border-b-2 border-b-gray-300'>
                    <p>Demo Project</p>
                </div>
                <Link to='/admin/dashboard/'>
                    <div className='flex hover:bg-cyan-300 pl-4 pr-4'>
                        <p>Users</p>
                    </div>
                </Link>
                <Link to='/admin/dashboard/accessControl'>
                <div className='flex hover:bg-cyan-300 pl-4 pr-4'>
                    <p>Access Control</p>
                </div>
                
                </Link>
            </div>
        </div>
    </>
  )
}
