import React, { useState } from 'react'
import Categories from '../Components/Categories'
import SearchComponent from '../Components/SearchComponent'
import { boolean } from 'zod'
import PostList from './PostList'

const Blogs = () => {
    
  return (
    <div className=''>
        <Categories category='All' />
       <div className='flex flex-row'>

       <PostList />
       </div>
    </div>
  )
}

export default Blogs