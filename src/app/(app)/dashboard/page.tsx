'use client'
import MessageCard from '@/components/MessageCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Message, User } from '@/model/User.model'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { ApiResponse } from '@/Types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { RefreshCcw, Loader2Icon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const handleDeleteMessage = (messageId:string)=>{
    setMessages(messages.filter(message => message._id !== messageId))
  }

  const {data:session} = useSession()

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })

  const { watch, setValue, register } = form

  const acceptMsgs = watch('acceptMessages')

  const fetchAcceptMessage = useCallback(async ()=>{
    try {
      const response = await axios.get('/api/accept-messages')
      setValue('acceptMessages', response.data.isAcceptingMessages)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse> 
      toast.error("Failed to fetch message acceptance status",{
        description: axiosError.response?.data.message
      })
    }finally{
      setIsSwitchLoading(false)
    }

  },[setValue])


  const fetchMessages = useCallback(async (refresh:boolean = false)=>{
    setLoading(true)
    try {
      const response = await axios.get('/api/get-messages')
      setMessages(response.data.messages || [])

      if(refresh){
        toast.success("Messages refreshed",{
          description:"Showing latest messages"
        })
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error("Failed to fetch messages",{
        description: axiosError.response?.data.message
      })
    }finally{
      setLoading(false)
      setIsSwitchLoading(false)
    }

  },[setLoading,setMessages])


  useEffect(() => {
    fetchMessages()
    fetchAcceptMessage()
  }, [fetchMessages,session,setValue,fetchAcceptMessage])


  const handleSwitchChange = async () => {
    try {
      const response = await axios.post('/api/accept-messages',{
        acceptMessages:!acceptMsgs
      })
      setValue('acceptMessages', !acceptMsgs )
      toast.success("Message acceptance status updated",{
        description:response.data.message
      })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error("Failed to update message acceptance status",{
        description: axiosError.response?.data.message
      })
    }
  }

  const {username} = session?.user as User

  const baseUrl = `${window.location.protocol}//${window.location.host}`
  const profileUrl = `${baseUrl}/u/${username}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      toast.success("Profile URL copied to clipboard")
    } catch (error) {
      toast.error("Failed to copy profile URL")
    }
  }

  if(!session || !session.user){
    return <div>Please Login</div>
  }
  return (
    <>
      <div className='my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg=white rounded w-full max-w-6xl'>
        <h1 className='text-4xl font-bold mb-4'>User Dashboard</h1>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold mb-2'>Copy Your Unique Link</h2>
         <div className='flex items-center'>
            <input
            type='text'
            value={profileUrl}
            disabled
            className='input input-bordered w-full p-2 mr-2'
            />
            <Button onClick={copyToClipboard}>
              Copy
            </Button>
         </div>
        </div>

        <div className='mb-4'>
          <Switch
            {...register('acceptMessages')}
            checked={acceptMsgs}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          <span className='ml-2'>Accept Messages: {acceptMsgs ? 'On' : 'Off'}</span>
        </div>
        <Separator />

<Button className='mt-4' variant='outline' onClick={(e)=>{
  e.preventDefault()
  fetchMessages(true)
}} >
  {loading ? (
    <Loader2Icon className="h-4 w-4 animate-spin" />
  ) : (
    <RefreshCcw className="h-4 w-4" />
  )}
</Button>

<div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
{
  messages.length > 0 ?(
    messages.map((message,index)=>(
      <MessageCard key={message._id} message={message} onMessageDelete={handleDeleteMessage}/>
    ))
  ) : (
    <p>No messages found</p>
  )
  
}
</div>
      </div>
    </>
  )
}

export default page
