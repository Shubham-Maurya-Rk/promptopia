"use client"

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UpdatePrompt = ({params}) => {
    const promptId = params.id;
    const router = useRouter()
    const [post, setpost] = useState({ prompt: '', tag: '' })
    const [submitting, setsubmitting] = useState(false)
    const { data: session } = useSession()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setsubmitting(true)
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setsubmitting(false)
        }
    }
    useEffect(() => {
        const fetchPrompt = async () => {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'GET'
            })
            const data = await response.json()
            setpost({ prompt: data.prompt, tag: data.tag })
        }
        fetchPrompt()
    }, [])
    return (
        <div className='mt-10 px-3 overflow-auto'>
            <h1 className='text-6xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent'>Edit Post</h1>
            <p className='text-gray-500 mt-5'>Edit ans share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.</p>
            <form onSubmit={handleSubmit}>
                <div className='mt-5'>
                    <label htmlFor="prompt" className='font-bold'>Your AI Prompt</label>
                    <textarea value={post.prompt} name="prompt" onChange={(e) => setpost({ ...post, prompt: e.target.value })} rows={6} className='w-full border-2 outline-none border-gray-200 rounded-md p-3 mt-2' placeholder='Write your prompt here...'></textarea>
                </div>
                <div className='mt-5'>
                    <label htmlFor="tag" className='font-bold'>Your tag (#product, #webdevelopment, #idea)</label>
                    <input name="tag" rows={6} value={post.tag} onChange={(e) => setpost({ ...post, tag: e.target.value })} className='w-full border-2 border-gray-200 outline-none rounded-md p-3 mt-2' placeholder='#Tag'></input>
                </div>
                <div className='flex justify-end my-5 items-center'>
                    <Link className='text-gray-500' href={'/'}>Cancel</Link>
                    <button className='bg-black text-white rounded-md px-4 py-2 ml-5' disabled={submitting}>{submitting ? 'Editing...' : 'Edit'}</button>
                </div>
            </form>
        </div>
    )
}

export default UpdatePrompt
