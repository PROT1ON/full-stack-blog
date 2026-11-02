import { Search, X } from 'lucide-react'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type SearchType = {
  page: 'Home' | 'Blog'
}

const SearchComponent = ({ page }: SearchType) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParmss] = useSearchParams()

  const searchedQuery = searchParmss.get('serched') || ""
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value)
    const params = new URLSearchParams(searchParmss)
   const value =  params.set('search', e.currentTarget.value)    
  }
  return (
    <div className="w-full h-10 ">

      {page === 'Home' ? (
        <div className="relative">

          <div className="flex items-center gap-2">
            <Search
              onClick={() => setIsOpen(true)}
              className="w-6 h-6 cursor-pointer"
            />

            {isOpen && (
              <X
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 cursor-pointer"
              />
            )}
          </div>

          {isOpen && (
            <div className="absolute top-12 left-0 z-50 w-full rounded-lg bg-white p-4 shadow-lg">
              <input
                type="text"
                placeholder="Search blog..."
                className="w-full rounded-md border p-2 outline-none"
              />
            </div>
          )}

        </div>
      ) : (
        
            <input className='placeholder:font-semibold w-full px-4 py-4 rounded-full ring-gray-100 ring-1'
            placeholder='Search titles, excerpts, keywords(press *Enter*)'
            value={searchQuery}
            onChange={handleSearch}
            >
            </input>
       
      )}

    </div>
  )
}

export default SearchComponent