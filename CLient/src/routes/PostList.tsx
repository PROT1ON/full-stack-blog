import React from 'react'
import Card from '../Components/Card'
import { items } from '../Components/Card'
import {  useSearchParams } from 'react-router-dom'

const PostList = () => {
  const [searchParams] = useSearchParams()

  const selectedCategory = searchParams.get('cat') || 'All'


  // Filte Blofs
  const filteredItems = selectedCategory === "All" ? items : items.filter(i => selectedCategory === i.category)
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {
      filteredItems.length > 0 ?
      (
      filteredItems.map((item) => (
        <Card key={item.title} item={item} />
      ))
      ): 
      (
        <div className='flex justify-center items-center border-spacing-1 border-blue-200'>
          <button className=''>

          </button>
        </div>
      )
    }
    </div>
  )
}

export default PostList