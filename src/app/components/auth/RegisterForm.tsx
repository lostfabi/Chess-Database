'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {registerUser} from "@/app/lib/actions";

export default function RegisterForm() {
    const [error, setError] = useState('')
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')

        const formData = new FormData(e.currentTarget)
        const username = formData.get('username') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (password !== confirmPassword) {
            setError('passwords dont match')
            return
        }

        try {
            await registerUser(formData)

            router.push('/auth/login')
        } catch (error) {
            setError('error')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">
                    username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    minLength={3}
                    className="w-full px-4 py-2 border border-dark-secondary/30 dark:border-light-secondary/30 rounded-lg
                             focus:outline-none focus:ring-1 focus:ring-light-primary"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                    email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-dark-secondary/30 dark:border-light-secondary/30 rounded-lg
                             focus:outline-none focus:ring-1 focus:ring-light-primary"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                    password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    minLength={10}
                    className="w-full px-4 py-2 border border-dark-secondary/30 dark:border-light-secondary/30 rounded-lg
                             focus:outline-none focus:ring-1 focus:ring-light-primary"
                />
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                    confirm password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    minLength={10}
                    className="w-full px-4 py-2 border border-dark-secondary/30 dark:border-light-secondary/30 rounded-lg
                             focus:outline-none focus:ring-1 focus:ring-light-primary"
                />
            </div>
            <div className="flex flex-row justify-between pt-4">
                <button className="bg-light-primary dark:bg-dark-primary p-1 rounded-lg w-1/4 h-10" type="submit">register</button>
                {error && (
                    <div className="text-error pt-3 pb-5">
                        {error}
                    </div>
                )}
            </div>

            <p className="text-center text-sm text-gray-800">
                already registered?{'   '}
                <Link className="bg-light-primary/70 dark:bg-dark-primary/70 px-2 py-1 rounded-md" href="/auth/login">
                    login
                </Link>
            </p>
        </form>
    )
}