
import React from 'react'
import Card from '../Components/Card'
import { items } from '../Components/Card'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


const PostList = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ""
    const selectedCategory = searchParams.get('cat') || "All"
    const sortedBlogs = searchParams.get('sort') || "All"
    const fitleredBlogs = selectedCategory === 'All' ? items : items.filter(i => i.category === selectedCategory)

    const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs`,
      )
      if (!response) throw new Error('Failed to fetch repo data')
        return response.data
    },
  })
  
  if (isPending) return 'Loading...'
  
  if (error) return 'An error has occurred: ' + error.message

    
    const sortProducts = [...fitleredBlogs]

    if(sortedBlogs === 'Most Liked') {
      sortProducts.sort((a,b) => b.Liked - a.Liked ) 
    }
    if(sortedBlogs ==='Latest'){
      sortProducts.sort((a,b) =>new Date(b.Publisheduration).getTime() - new Date(a.Publisheduration).getTime())
    }
     if(sortedBlogs === 'Most Discussed') {
      sortProducts.sort((a,b) => b.comments - a.comments ) 
    }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>

      {sortProducts.length > 0 ? (
        sortProducts.map((item) => (
          <Card key={item.title} item={item} />
        ))
      ) : (
        <div className='flex justify-center items-center border-spacing-1 border-blue-200'>
          <button className=''>
            <h1 className='text-2xl font-bold text-gray-500'>No Blogs Found</h1>
          </button>
        </div>
      )}
      
    </div>
  )
}

export default PostList
