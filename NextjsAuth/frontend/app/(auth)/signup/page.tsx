"use client"

import { SignupUser } from '@/types/types'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const SignupPage = () => {
  const router=useRouter()
  const [formData, setFormData] = useState<SignupUser>({
    name: '',
    email: '',
    password: '',
  });

  const signup = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', formData)
      console.log('Signup successful:', response.data)
      if(response.data){
        router.push('/login')
      }
    } catch (error) {
      console.error('Signup failed:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signup()
    // console.log('Signup data:', formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h1 className="text-2xl font-semibold text-slate-900">Sign Up</h1>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              placeholder="Enter your name"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              placeholder="Enter your email"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 mb-3 block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              placeholder="Enter your password"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-sky-600 px-5 py-3 text-white font-semibold transition hover:bg-sky-700"
        >
          Create account
        </button>
      </form>
    </div>
  )
}

export default SignupPage
