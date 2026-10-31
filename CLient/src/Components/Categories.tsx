import React, { useState } from 'react'
import SearchComponent from './SearchComponent';
import { Link, useSearchParams } from 'react-router-dom';
import Filter, { FilterType } from './Filter';

type CategoryType = 
  | 'All' 
  | 'Anime & Manga' 
  | 'Art & Creativity' 
  | 'Personal Stories' 
  | 'Gaming' 
  | 'Culture & Lifestyle' 
  | 'Reviews & Recommendations';
type CategoryProps = {
    category: CategoryType
}

const categories:CategoryType[] =[
      'All',
  'Anime & Manga',
  'Art & Creativity',
  'Personal Stories',
  'Gaming',
  'Culture & Lifestyle',
  'Reviews & Recommendations'
]

const Categories = ({category}:CategoryProps) => {
    const [searchParams] = useSearchParams()
    const [filter, setFilter] = useState<FilterType>("Latest")

    const selectedCat = searchParams.get('cat') || "All"
  return (
    <div className='flex flex-row  py-8 gap-8  w-full sm:flex-col '>
        <h2 className='text-6xl tracking-tighter'>
            {
                category === 'All' ? 
                'All Stories'
                :
                categories
            }
        </h2>
        <div className='justify-between flex'>
            <SearchComponent page='Blog' />
            <Filter onFilterChange={setFilter}/>
        </div>
        <div className='flex gap-4 flex-wrap'>
            {
                categories.map(
                    cat => (
                        <Link key={(cat)}
                        to={
                           cat === 'All'
                ? '/blogs'
                : `/blogs?cat=${encodeURIComponent(cat)}`
                            }
                            className={`px-4 py-2 rounded-full ${
              selectedCat === cat
                ? 'border bg-purple-300 text-white'
                : 'border border-red-150'
            }`}
                            >
                                {cat}
                            </Link>
                    )
                )
            }

        </div>
    </div>
  )
}

export default Categories