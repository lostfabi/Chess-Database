'use client'

import {Button} from "@/app/components/buttons/Button";
import Link from "next/link";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {registerUser} from "@/app/lib/actions";

export default function RegisterPage() {
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

        const result = await registerUser(formData)

        if(result.error) {
            setError(result.error);
            return;
        }
        else {
            router.push('/auth/login');
        }
    }

    return (
        <div className="h-screen dark:bg-dark-background flex items-center justify-center text-dark-text dark:text-light-text">
            <form onSubmit={handleSubmit} className="w-1/5 space-y-3">
                <div className="flex flex-col rounded-lg bg-light-primary dark:bg-dark-primary py-8 px-5 gap-5">
                    <h1 className="flex flex-col items-center text-2xl">
                        Create account
                    </h1>
                    <div className="flex flex-col w-full gap-4">
                        <div>
                            <label
                                className="mb-1 block text-s font-medium"
                                htmlFor="username">
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    className="block w-full rounded-md border-2 outline-none dark:border-dark-accent p-2 text-sm placeholder:text-gray-600"
                                    id="username"
                                    name="username"
                                    placeholder="username"
                                    required/>
                            </div>
                        </div>
                        <div>
                            <label
                                className="mb-1 block text-s font-medium"
                                htmlFor="email">
                                Email
                            </label>
                            <div>
                                <input
                                    className="block w-full rounded-md border-2 outline-none dark:border-dark-accent p-2 text-sm placeholder:text-gray-600"
                                    id="email"
                                    name="email"
                                    placeholder="email"
                                    required/>
                            </div>
                        </div>
                        <div>
                            <label
                                className="mb-1 block text-s font-medium"
                                htmlFor="password">
                                Password
                            </label>
                            <div>
                                <input
                                    className="block w-full rounded-md border-2 outline-none dark:border-dark-accent p-2 text-sm placeholder:text-gray-600"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    required/>
                            </div>
                        </div>
                        <div>
                            <label
                                className="mb-1 block text-s font-medium"
                                htmlFor="confirmPassword">
                                confirm password
                            </label>
                            <div>
                                <input
                                    className="block w-full rounded-md border-2 outline-none dark:border-dark-accent p-2 text-sm placeholder:text-gray-600"
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="repeat password"
                                    required/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-row justify-between w-full">
                            <Button className="bg-light-accent dark:bg-dark-accent" type="submit">
                                create
                            </Button>
                            <Link className="flex items-center px-4" href={"/auth/login"}>
                                <Button className="bg-light-accent dark:bg-dark-accent">
                                    login
                                </Button>
                            </Link>
                        </div>
                        <div
                            className="flex items-end"
                            aria-live="polite"
                            aria-atomic="true">
                            {error && (
                                <>
                                    <p className="text-m italic text-error">{error}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}