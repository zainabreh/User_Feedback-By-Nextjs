'use client'

import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import {toast} from 'react-hot-toast'

const page = () => {

  const [userData,setUserData] = useState('')

  const getUserDetails = async ()=>{
    try {
      const res = await axios.get("/api/users/me")
      setUserData(res.data.data.username)

      toast.success("User Detail Fetched Successfully")
      
    } catch (error) {
      console.log("Error: Getting User Details");
      toast.error("Unable to get user details")
      
    }
  }

  const logout = async ()=>{
    try {
      await axios.post("/api/users/logout")
      
    } catch (error) {
      console.log("Error: unable to logout");
      toast.error("Unable to logout")
      
    }
  }

  return (
    <>
    
    <div className='max-w-md mx-auto mt-24 p-6 shadow rounded border-2 flex flex-col gap-4'>

<h2 className='text-2xl font-bold mb-4 text-center'>PROFILE PAGE</h2>

<Link href={`/profile/${userData}`}><h3 className='text-[18px]  mb-4 text-center'>{userData ? `${userData}` : "Nothing Found"}</h3></Link>

<button type='submit' onClick={getUserDetails} className='bg-green-400 font-bold p-3 rounded '>GetDetails</button>
<button type='submit' onClick={logout} className='bg-red-950 text-white-50 font-bold p-3 rounded '>LogOut</button>

      
      

     </div>
    </>
  )
}

export default page
