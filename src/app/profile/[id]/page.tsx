'use client'

import React from 'react'

const page = ({params}:any) => {
  return (
    <>
       <div className='max-w-md mx-auto mt-24 p-6 shadow rounded border-2 flex flex-col gap-4'>

<h2 className='text-2xl font-bold mb-4 text-center'>PROFILE PAGE</h2>

<span className='font-bold mb-4 text-center'>{params.id}</span>
</div>
    </>
  )
}

export default page
