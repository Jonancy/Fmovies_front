import React from 'react'

export default function Button(props) {
  return (
    <>
        <button className='p-2 border-2 border-blue-600' onClick={()=>props.selectedItem('day')}>Day</button>
        <button className='p-2 border-2 border-blue-600' onClick={()=>props.selectedItem('week')}>Week</button>
        <button className='p-2 border-2 border-blue-600' onClick={()=>props.selectedItem('month')}>Month</button>
    </>
  )
}
