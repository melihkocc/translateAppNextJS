import React from 'react'
import FromLanguage from './FromLanguage'
import ToLanguage from './ToLanguage'

function HomePage() {
  return (
    <div className='h-full w-full flex justify-center items-center relative'>
      <div className='w-full lg:w-10/12 flex flex-col lg:flex-row justify-center items-center'>
        <div className='w-11/12 lg:w-1/2'>
          <FromLanguage/>
        </div>
        <div className='w-11/12 lg:w-1/2 ms-0 lg:ms-2 mt-5 lg:mt-0'>
          <ToLanguage/>
        </div>
      </div>
    </div>
  )
}

export default HomePage