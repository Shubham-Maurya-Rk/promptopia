import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const PromptCard = ({ post, editable, handleDelete, setsearchText }) => {
  const [copied, setcopied] = useState('')
  const handleCopy = () => {
    setcopied(post.prompt);
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setcopied(''), 3000)
  }
  
  return (
    <div className='rounded-lg shadow-2xl p-4 bg-slate-100'>
      <div className='w-full flex items-center justify-between mb-2'>
        <div className='flex items-center'>
          <Image src={post.creator.image} alt={post.prompt} width={35} height={35} className='' />
          <div className='ml-3'>
            <Link href={`/profile/${post.creator._id}`} className='font-bold text-lg'>{post.creator.username}</Link>
            <p className='text-xs text-gray-500'>{post.creator.email}</p>
          </div>
        </div>
        <span className='w-6 shadow h-6 bg-slate-50 border border-gray-100 rounded-md flex items-center justify-center cursor-pointer' onClick={handleCopy}> 
          <Image src={copied === post.prompt ? '/tick.svg' : '/copy.svg'} alt='edit' width={10} height={10} />
        </span>
      </div>
      <div>
        <p className='text-sm'>
          {post.prompt}
        </p>
        <span className='text-xs text-blue-500 cursor-pointer' onClick={() => setsearchText(post.tag)}>{post.tag}</span>
      </div>
      {
        editable && (
          <div className='w-full flex items-center justify-center gap-5 mt-2'>
            <Link href={`/update-prompt/${post._id}`} className='cursor-pointer text-sm text-green-600' onClick={() => {}}> 
              Edit
            </Link>
            <span className='cursor-pointer text-sm text-red-700' onClick={()=>handleDelete(post)}> 
              Delete
            </span>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard


