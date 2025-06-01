"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const { data: session } = useSession()
    const [providers, setProviders] = useState(null)
    // const [isLoggedIn, setisLoggedIn] = useState(true)
    const [toggleDropdown, settoggleDropdown] = useState(false)
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        setUpProviders()
    })
    return (
        <div className='flex justify-between items-center p-4'>
            <Link href={'/'} className='flex items-center gap-3 text-[1.5rem] text-orange-600 font-bold'>
                <Image
                    src={'/logo.png'}
                    alt='logo'
                    width={45}
                    height={45}
                />
                <span className='hidden md:block'>Promptopia</span>
            </Link>
            <div className='hidden md:block gap-2'>
                {
                    session?.user ?
                        <div className='flex gap-2 items-center'>
                            <Link href={'/create-prompt'} className='rounded-full font-semibold text-white px-4 py-2 bg-black hover:bg-white hover:text-black hover:border hover:border-black'>
                                Create Post +
                            </Link>
                            <button className='rounded-full font-semibold  px-4 py-2 border border-black hover:bg-black hover:text-white' onClick={signOut}>
                                Sign Out
                            </button>
                            <Image
                                src={session?.user.image}
                                alt='logo'
                                width={35}
                                height={35}
                                className='object-contain'
                            />
                        </div> :
                        // <button className='rounded-full font-semibold  px-4 py-2 border border-black'>
                        //     Sign In
                        // </button>
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className='rounded-full font-semibold  px-4 py-2 border border-black'
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                }
            </div>
            <div className='md:hidden gap-2'>
                {
                    session?.user ?
                        <>
                            <button onClick={() => settoggleDropdown(prev => !prev)}>
                                <Image
                                    src={session?.user.image}
                                    alt='logo'
                                    width={35}
                                    height={35}
                                    className='object-contain'
                                />
                            </button>
                            {toggleDropdown && <div className='bg-white absolute top-14 right-0 p-4 flex flex-col gap-3 rounded'>
                                <Link onClick={() => settoggleDropdown(prev => !prev)} href={`/profile/${session?.user.id}`}>
                                    My Profile
                                </Link>
                                <Link onClick={() => settoggleDropdown(prev => !prev)} href={'/create-prompt'}>
                                    Create Post +
                                </Link>
                                <button onClick={signOut} className='rounded-full font-semibold  px-4 py-2 bg-black text-white'>
                                    Sign Out
                                </button>
                            </div>}
                        </>
                        :
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className='rounded-full font-semibold  px-4 py-2 border border-black'
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default Nav
