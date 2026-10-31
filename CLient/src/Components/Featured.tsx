import React from 'react'
import Image from './Image'

const Featured = () => {
  return (
    <section className='flex gap-2 '>
        <div className='w-1/2'>
            <Image className='object-cover' src='Blog%20/b1.jpeg' />
            <div className=''>

            </div>
        </div>
        
        {/* Right Sections */}
        <div className='w-1/2 flex flex-col gap-4 items-center justify-center'>
        <div className=''>
            
        </div>
        </div>
    </section>
  )
}

export default Featured