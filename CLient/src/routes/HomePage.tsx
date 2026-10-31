import React from 'react'
import HeroComponent from '../Components/HeroComponent'
import CategoriesSection from '../Components/Explore'
import PostList from './PostList'

const HomePage = () => {
  return (
    <div>
      {/* HeroSection */}
      <HeroComponent />
     <CategoriesSection />
      <div className='flex '>
         <div className="mb-10">
        <p className="mb-2 text-sm font-bold tracking-[0.3em] text-violet-700">
          FRESH OFF PEERS
        </p>

        <h2 className="text-4xl font-extrabold tracking-tight text-[#191629] md:text-5xl">
          Explore STORIES
        </h2>
      </div>
      
      </div>
      <PostList />
    </div>
  )
}

export default HomePage