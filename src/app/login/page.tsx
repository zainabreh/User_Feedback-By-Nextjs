'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {

const [userData,setUserData] = useState({
  email:"",
  password:""
})

const [loading,setLoading] = useState(false)
const router = useRouter()

const DataSubmission = async ()=>{
  try {
    
    setLoading(true)

    const response = await axios.post("/api/users/login",userData)

    console.log(response);

    router.push('/profile')
    

    toast.success("Logged In Successfully...")
    
  } catch (error) {
    console.log("Error in logging in",error);
    toast.error("Failed to Login...")
    
  }
}



  return (
    <div className='max-w-md mx-auto mt-24 p-6 shadow rounded border-2 flex flex-col gap-4'>

<h2 className='text-2xl font-bold mb-4 text-center'>{loading ? "Processing" : "LogIn"}</h2>
      
      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' name='email' value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} placeholder='Email' className='border p-3 rounded' required />
      
      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' name='password' value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} placeholder='Password' className='border p-3 rounded' required />

      <button type='submit' onClick={DataSubmission} disabled={loading} className='bg-black-50 font-bold border-2 border-white p-3 rounded hover:bg-white hover:text-black'>{loading ? "Loading" : "LogIn"}</button>

      <span className='text-center'>Don't have an account? <Link href='/signup' className='text-blue-500 hover:underline'>Sign up</Link></span>
    </div>
  )
}

export default page
