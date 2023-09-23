import React from 'react'

export default function Button(props) {
  return (
    <>
    <div className='pt-2 pl-4 '>

    <button className='border-2 border-cyan-600 p-1 m-1 rounded-[10px] text-sm ' onClick={()=>props.selectedItem('week')}>Week</button>
    <button className='border-2 border-cyan-600 p-1 m-1 rounded-[10px] text-sm ' onClick={()=>props.selectedItem('month')}>Month</button>
    <button className='border-2 border-cyan-600 p-1 m-1 rounded-[10px] text-sm ' onClick={()=>props.selectedItem('day')}>Day</button>
    </div>
    </>
  )
}
