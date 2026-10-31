import React from 'react'
import { useForm } from 'react-hook-form'

export type FilterType =
  | "Oldest"
  | "Latest"
  | "Most Liked"
  | "Most Discussed"

type FilterProps = {
  onFilterChange: (filter: FilterType) => void
}

type FilterForm = {
  filter: FilterType
}

const Filter = ({ onFilterChange }: FilterProps) => {

  const { register, handleSubmit } = useForm<FilterForm>({
    defaultValues: {
      filter: "Latest"
    }
  })

  const onSubmit = (data: FilterForm) => {
    onFilterChange(data.filter)
  }

  return (
    <form onChange={handleSubmit(onSubmit)}>
      <select
        {...register('filter')}
        className='border rounded-lg px-4 py-2'
      >
        <option value="Latest">Latest</option>
        <option value="Oldest">Oldest</option>
        <option value="Most Liked">Most Liked</option>
        <option value="Most Discussed">Most Discussed</option>
      </select>
    </form>
  )
}

export default Filter