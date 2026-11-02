
import React from 'react'
import { useSearchParams } from 'react-router-dom'

export type FilterType =
  | "Oldest"
  | "Latest"
  | "Most Liked"
  | "Most Discussed"

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedFilter = searchParams.get('sort') || 'Latest'

  const handleFilterChange = (value: FilterType) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', value)
    setSearchParams(params)
  }

  return (
    <select
      value={selectedFilter}
      onChange={(e) =>
        handleFilterChange(e.target.value as FilterType)
      }
      className='border rounded-lg px-4 py-2'
    >
      <option value="Latest">Latest</option>
      <option value="Oldest">Oldest</option>
      <option value="Most Liked">Most Liked</option>
      <option value="Most Discussed">Most Discussed</option>
    </select>
  )
}

export default Filter
