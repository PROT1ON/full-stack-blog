
import React from 'react'
import Card from '../Components/Card'

import { useSearchParams } from 'react-router-dom'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';

const fetchPosts = async(pageParams) => { 
  const response = await axios.get( `${import.meta.env.VITE_API_URL}/blogs`,{
    params:{page:pageParams}  
  } )
     if (!response) throw new Error('Failed to fetch repo data') 
      return response.data.posts 
    }
const PostList = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ""
    const selectedCategory = searchParams.get('cat') || "All"
    const sortedBlogs = searchParams.get('sort') || "All"
    
     const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn:({pageParams = 1}) => fetchPosts(pageParams) ,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined,
  })
    console.log(data)
    
    const allBlogs = data?.pages.flatMap(page => page) || []
    if (isFetching) return 'Loading...'
    
    if (error) return 'An error has occurred: ' + error.message
    
    
    const fitleredBlogs = selectedCategory === 'All' ? allBlogs : allBlogs.filter(i => i.category === selectedCategory)
    const sortProducts = [...fitleredBlogs]

    if(sortedBlogs === 'Most Liked') {
      sortProducts.sort((a,b) => b.Liked - a.Liked ) 
    }
    if(sortedBlogs ==='Latest'){
      sortProducts.sort((a,b) =>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
     if(sortedBlogs === 'Most Discussed') {
      sortProducts.sort((a,b) => b.comments - a.comments ) 
    }
  return (
    <div className=''>
       <InfiniteScroll
       className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
      dataLength={sortProducts.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<p>Loading...</p>}
      endMessage={<p style={{ textAlign: 'center' }}>All items loaded.</p>}
    >
     
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
      </InfiniteScroll>
      
    </div>
  )
}

export default PostList
