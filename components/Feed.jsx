"use client"
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const Feed = () => {
  const [allPosts, setallPosts] = useState([])
  const [posts, setposts] = useState([])
  const [searchText, setsearchText] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setallPosts(data)
      setposts(data)
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    const filteredPosts = allPosts.filter((post) => post.tag.toLowerCase().includes(searchText.toLowerCase()) || post.prompt.toLowerCase().includes(searchText.toLowerCase()) || post.creator.username.toLowerCase().includes(searchText.toLowerCase()))
    setposts(filteredPosts)
  }, [searchText])


  return (
    <div className='w-full px-5 pb-5'>
      <form action="">
        <input type="text" placeholder='Search for a prompt' className='w-full border border-gray-300 px-4 py-2 rounded-lg shadow-2xl outline-none' value={searchText} onChange={(e) => setsearchText(e.target.value)}/>
      </form>
      <div className='w-full mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {
          posts.map((post) => (           
            <PromptCard key={post._id} post={post} setsearchText={setsearchText}/>
          ))
        }
      </div>
    </div>
  )
}

export default Feed
