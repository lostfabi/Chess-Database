'use client'

import { Button } from '@/app/components/buttons/Button';
import React, { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";

export default function Login() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="h-screen dark:bg-dark-background flex items-center justify-center">
            <form action={formAction} className="w-1/5 space-y-3">
                <div className="rounded-lg bg-light-primary dark:bg-dark-primary px-6 pb-4 pt-8">
                    <h1 className="mb-3 text-2xl text-dark-text dark:text-light-text">
                        Log in
                    </h1>
                    <div className="w-full">
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-dark-text dark:text-light-text"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border text-dark-text dark:border-dark-secondary dark:text-light-text py-[9px] pr-2 pl-2 text-sm placeholder:text-gray-500"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border text-dark-text border-light-secondary dark:border-dark-secondary dark:text-light-text py-[9px] pl-2 pr-2 text-sm placeholder:text-gray-500"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="redirectTo" value={callbackUrl} />
                    <div className="flex flex-col justify-center items-center">
                        <Button className="mt-8 bg-light-accent dark:bg-dark-accent text-dark-text dark:text-light-text" aria-disabled={isPending}>
                            Log in
                        </Button>
                        <div
                            className="flex h-8 items-end space-x-1"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {errorMessage && (
                                <>
                                    <p className="text-sm text-error">{errorMessage}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}