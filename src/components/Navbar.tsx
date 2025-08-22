"use client"

import { User } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
    const {data:session} = useSession()
    const user:User = session?.user as User

  return (
    <>
      <nav className='p-4 md:p-6 shadow-md'>
        <div className='container mx-auto flex justify-between items-center flex-col md:flex-row'>
            <a href="#" className='text-xl font-bold mb-4 md:mb-0'>Mystry Message</a>
            {
                session ? (
                    <>
                        <span className='mr-4'>Welcome, {user?.username || user?.email}</span>
                        <Button className='w-full md:w-auto' onClick={() => signOut()}>Logout</Button>
                    </>
                ) : (
                    <Link href="/signin">
                        <Button className='w-full md:w-auto'>Login</Button>
                    </Link>
                )
            }
        </div>
      </nav>
    </>
  )
}

export default Navbar
