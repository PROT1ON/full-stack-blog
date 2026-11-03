import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/react'
import axios from 'axios'
import Card, { type Post } from '../Components/Card'

const fetchBlogs = async (): Promise<Post[]> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`)
  return res.data
}

const MyProfile = () => {

  const { user, isLoaded } = useUser()

  const { data: blogs = [], isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
    enabled: isLoaded && !!user
  })

  // Filter logged-in user's posts
  const myBlogs = blogs.filter(
    (post) => post.user?._id === user?.id
  )

  if (!isLoaded || isLoading) {
    return <div className="p-10 text-center">Loading your blogs...</div>
  }

  if (isError) {
    return <div className="p-10 text-center">Failed to fetch blogs.</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Heading */}
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-500">
          Your Profile
        </p>

        <h1 className="text-4xl font-bold mt-2">
          My Blogs & Posts
        </h1>

        <p className="text-gray-500 mt-3">
          Manage and explore everything you've shared.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10">
        <p className="text-gray-500 text-sm">Total published posts</p>
        <h2 className="text-3xl font-bold">{myBlogs.length}</h2>
      </div>

      {/* Posts */}
      {myBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myBlogs.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl">
          <h2 className="text-xl font-semibold">No posts yet!</h2>
          <p className="text-gray-500 mt-2">
            Start writing and share your first story.
          </p>
        </div>
      )}

    </div>
  )
}

export default MyProfile