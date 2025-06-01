'use client'

import PromptCard from '@/components/PromptCard'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const Profile = ({ params }) => {
    const { data: session } = useSession()
    const [posts, setposts] = useState([])
     useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params.id}/posts`,{
            method: 'GET'
          })
          const data = await response.json()
          setposts(data)
        }
        fetchPosts()
      }, [])
    const handleDelete = (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?')
        if(hasConfirmed) {
          try {
            fetch(`/api/prompt/${post._id.toString()}`, {
              method: 'DELETE'
            }).then(() => {
              alert('Prompt deleted successfully')
              const filteredPosts = posts.filter((p) => p._id !== post._id)
              setposts(filteredPosts);
            })
          } catch (error) {
            console.log(error)
          }
        }
      }
    return (
        <div className='mt-10 px-3  overflow-auto'>
            <h1 className='text-6xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent' > {session?.user.id === params.id ? 'My' : ''} Profile Page</h1>
            <p className='text-gray-500 mt-5'>Welcome to your personalized profile</p>
            <div className='w-full mt-10 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {
                    posts.map((post) => (         
                        <PromptCard key={post._id} post={post} editable={session?.user.id === params.id} handleDelete={handleDelete}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Profile
