import React from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'

const HeroComponent = () => {
  return (
    <div className='flex flex-col md:flex-row w-full h-screen gap-4 justify-center items-center'>
        {/* Title n texts */}
        <div className='flex flex-col w-1/2 h-full justify-start gap-4 items-start px-4 py-3 md:px-12 md:py-10'>
            <div className='relative w-full h-64'>
                <Image src='/Blog%20/fog1.avif' className='absolute left-0 inset-0 h-full w-full object-cover' />
            </div>
            {/* Community Joutnal */}
            <h2 className='text-md font-light italic uppercase'>
                A Communl Journal
            </h2>
{/* 
            Title Card */}
                <h1 className='text-7xl font-bold' z-50>
                    Stories Worth  <br />
                    Getting <span className='text-gradient' >
                        Lost
                    </span>
                    In
                </h1>
            {/* short desc */}
        <p className='text-xl font-light'>
            A cozy corner of the internet where fans, artists, and dreamers write about the anime that moved them, the art they make, and the small moments in between.
Explore Stories

        </p>
        <div className='flex  gap-4'>
            <Link to={'/blogs'}>
            <button className='bg-purple-600 text-white text-xl px-4 py-3 rounded-3xl'>
                Explore Stores
            </button>
            </Link>
            <button className=' text-black text-xl px-4 py-3 rounded-3xl'>
                Share your story
            </button>
        </div>
        </div>

        {/* Imge section */}
        <section className='flex w-1/2 h-full rotate-2 px-4 py-3 md:px-12 md:py-10'>
            <div className='rounded-2xl p-1.5 border-purple-200 border'>
                <Image src='/Blog%20/hero-Dbk7dZqh.jpg' alt={'hero-image'} className={' object-cover h-full w-full rounded-2xl'} w='460' h='1600' />
            </div>
        </section>
    </div>
  )
}

export default HeroComponent