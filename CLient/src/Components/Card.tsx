import React, { useState } from 'react'
import Image from './Image'
import { MessageCircle, Heart } from 'lucide-react'
import { Link } from 'react-router-dom';


export interface Post {
  _id: string;
  title: string;
  slug: string;
  image?: string;
  excerpt: string;
  desc: string;
  category: string;
  createdAt: string;

  likes: string[];

  comments: {
    _id?: string;
    user: string;
    desc: string;
  }[];

  user: {
    _id: string;
    userName: string;
  };
}




const Card = ({ item }: { item: Post }) => { 
      const publisher = item.user?.userName || "Anonymous"
    //solution for reaaact Faallback ?
    const handleCardClick = () => {
        
        <Link to={  `/blogs/${item.slug}  ` } >

            </Link>
        console.log('CLijkced')
    }
  return (
    <Link to={  `/blogs/${item.slug}  ` } >

     <div
     
     className='rounded-2xl flex flex-col relative '
     >
                <div className='absolute top-3 left-3 rounded-full bg-white/55 text-purple-500 px-4 py-2' >
                    {item.category}
                    </div>
        <Image
        
        src= 
        {item.image } alt={item.title} className='w-full h-60 object-cover rounded-t-2xl ' />
        <div className='bg-white flex flex-col gap-2 px-6 py- rounded-2xl '>
            <h2 className='font-mono font-semibold text-xl tracking-tighter'>
                {item.title}
            </h2>
            <p className=''>
                {item.excerpt}
            </p>
            <div className='flex flex-row items-center gap-2 text-xs  py-6'>
                <div className='p-1.5 rounded-full border-violet-600 border'>
                    {publisher.split(' ').map(w => w[0]).join('').toUpperCase()}
                </div>
          
                <h2 className="font-bold">
                    {publisher}
                </h2>
                <span>
                    {item.createdAt}
                </span>
                <Heart className='text-red-400' />
                {
                    item.likes
                }

                <MessageCircle className='text-lime-400' />
                {
                    item.comments.length
                }
            
            </div>
        </div>


</div>
                </Link>
 
  )
}


export default Card