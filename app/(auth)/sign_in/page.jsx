'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result.error) {
        console.error(result.error)
      } else {
        router.push('/profile')
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className='bg-gradient-to-r from-yellow-500 to-blue-500 p-2 rounded-md shadow-md'>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
          <div className="mb-4">
            <h6 className='justify-center items-center text-center pb-3 font-extrabold'>SIGN IN</h6>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded" // Added border
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded" // Added border
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 mb-1 rounded-2xl">
            Sign In
          </button>{' '}
          <div className='underline underline-offset-1'>
          <a href='/sign_up'>sign up</a>
          </div>
        </form>
      </div>
    </div>
  )
}