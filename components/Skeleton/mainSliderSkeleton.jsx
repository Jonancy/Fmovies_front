import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function MainSliderSkeleton() {
  return (
    <>
            <div className='relative bg-cover h-screen bg-center'>
                <Skeleton className='w-full h-full'/>
            </div>
    </>
  )
}
