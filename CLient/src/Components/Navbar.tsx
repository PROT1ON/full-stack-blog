import { Image } from '@imagekit/react'
import React, { useEffect, useState } from 'react'
import { getToken, Show, SignInButton, SignUpButton, useAuth, UserButton } from '@clerk/react'
import { Link } from 'react-router-dom'
import SearchComponent from './SearchComponent'

const Navbar = () => {

  const {getToken} = useAuth()

  // useEffect ( () => {
  //   getToken().then((token => console.log(token)))
  // },[])
  const [open,setOpen] = useState(false)
  const [active,isactive]=useState(false)
  return (
    <div className='w-full h-16 md:h-20 flex items-center justify-between'>
      {/* LOGO */}
      <div className='flex '>
        <div />
        <Image src='/logo.png ' alt='' width={20} height={20}/>
        <span>
          LOgo
        </span>
      </div>

      {/* MOVIle View */}
      <div className='md:hidden'>
      <div className='curosr-pointer text-4xl'
      onClick={()=> setOpen(prev => !prev)}
      >
        {open ? 'X' : "="}
      </div>
      </div>

      <div className={`w-full h-screen  flex flex-col items-center justify-between absolute top-16 transition-all ease-in-out ${open ? "-right-0 " : "-right-[100%]"}`}>
          Menu
      </div>
      <div className='w-full flex justify-center items-center gap-4'>
       
          <Link 
          onClick={()=> isactive(true)}
          className={`${active ? "border-b rounded-full bg-[#EEE6FF] px-3 py-2" : "" } `}
          to= '/'>
          Home
          </Link>
          <Link 
           onClick={()=> isactive(true)}
          className={`${active ? "border-b rounded-full bg-[#EEE6FF] px-3 py-2" : "" } `}
          to= '/blogs'>
          All Blogs
          </Link>
          <Link
           onClick={()=> isactive(true)}
          className={`${active ? "border-b rounded-full bg-[#EEE6FF] px-3 py-2" : "" } `}
          to= '/about'>
          About
          </Link>
      </div>
      {/* Search */}
      <div>

      <SearchComponent page='Home' />
        <div>
           <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
        </div>
    </div>
  )
}

export default Navbar