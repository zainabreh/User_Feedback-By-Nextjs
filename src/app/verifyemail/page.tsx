'use client'

import axios from 'axios'
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {toast} from 'react-hot-toast'

const page = () => {
    const [token, setToken] = useState("")
    const [IsVerified,setIsVerified] = useState(false)

    // const router = useRouter()

    const verifyUserEmail = async () => {
        try{
            const res = await axios.post('/api/users/verifyemail',{token})

            console.log("Verification testing,",res);
            

            setIsVerified(true)

            toast.success("Verification Successfull...")
        }catch(error:any){
            console.log("Unable to varify",error.response.data);
            toast.error("Unable to Verify you're email")
        } 
    }


    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
        // const {query} = router;
        // const urlToken = query.token
        // setToken(urlToken)
    },[])

    useEffect(()=>{
        if(token.length > 0){
            verifyUserEmail()
        }
    },[token])


  return (
    <>
  <div className="md:max-w-md sm:max-w-[390px] mx-auto mt-28 border-2 border-white flex flex-col text-wrap items-center justify-center gap-4 p-6 rounded shadow">
    <h1 className="text-2xl font-bold text-center">Verify Email</h1>

  <h2 className="break-words whitespace-normal text-sm text-gray-600 text-center w-full">
  {token ? token : "No Token Found"}
</h2>


    {IsVerified && (
      <span className="text-center text-green-600 font-semibold">
        Verified Successfully
        <br />
        <Link href="/login" className="text-blue-500 font-bold hover:underline">
          Log In
        </Link>
      </span>
    )}
  </div>
</>

  )
}

export default page
