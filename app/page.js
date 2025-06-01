import Feed from '@/components/Feed'
import React from 'react'

const Home = () => {
  return (
    <>
      <div className='w-full flex flex-col justify-center items-center '>
        <h1 className='text-center mt-16 mb-5 text-6xl font-extrabold'>Discover & Share <span className='bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent'>AI-Powered Prompts</span></h1>
        <p className='text-center text-gray-500 text-lg mb-16'>Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts</p>
      </div>
      <Feed />
    </>
  )
}

export default Home
