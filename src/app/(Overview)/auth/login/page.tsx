'use client'

import { Button } from '@/app/components/buttons/Button';
import React, { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import Link from "next/link";

export default function Login() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="h-screen dark:bg-dark-background text-dark-text dark:text-light-text flex items-center justify-center">
            <form action={formAction} className="w-1/5 space-y-3">
                <div className="flex flex-col rounded-lg bg-light-primary dark:bg-dark-primary py-8 px-5 gap-5">
                    <h1 className="flex flex-col items-center text-2xl">
                        Sign in
                    </h1>
                    <div className="flex flex-col w-full gap-4">
                        <div>
                            <label
                                className="mb-1 block text-s font-medium"
                                htmlFor="email">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    className="block w-full rounded-md border-2 outline-none dark:border-dark-accent p-2 text-sm placeholder:text-gray-600"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="your email"
                                    required/>
                            </div>
                        </div>
                        <div>
                            <label
                                className="mb-1 block text-s font-medium"
                                htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border-2 outline-none border-light-secondary dark:border-dark-accent py-2 p-2 text-sm placeholder:text-gray-600"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    required
                                    minLength={6}/>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="redirectTo" value={"/dashboard"} />
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-row justify-between w-full">
                            <Button className="bg-light-accent dark:bg-dark-accent" aria-disabled={isPending}>
                                Log in
                            </Button>
                            <Link className="flex items-center px-4" href={"/auth/register"}>
                                Create account
                            </Link>
                        </div>
                        <div
                            className="flex items-end space-x-1"
                            aria-live="polite"
                            aria-atomic="true">
                            {errorMessage && (
                                <>
                                    <p className="text-m italic text-error">{errorMessage}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}