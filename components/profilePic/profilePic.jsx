
import React from 'react'
export default function ProfilePic(props) {
  return (
    <>
    {/* {props.userImage((image)=>(
    <div className='w-16 h-16 rounded-full '>
        {console.log(image)}
        <img className='w-full h-full object-cover rounded-full' src={image}></img>
    </div>
    ))} */}
     <div className='w-16 h-16 rounded-full '>
        <img className='w-full h-full object-cover rounded-full' src={props.image}></img>
    </div>
    </>
  )
}
