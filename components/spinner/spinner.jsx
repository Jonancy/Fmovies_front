import React from 'react'
import Nezuko from '../../assets/Nezuko.gif'

export default function Spinner() {
  return (
    <>
    <div className='flex justify-center bg-black '>

      <img src={Nezuko} className="w-[50%] h-screen"></img>
    </div>
    </>
  )
}
