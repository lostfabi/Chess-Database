'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from "react-icons/ai";

type ModalProps = {
    isOpen: boolean
    onCloseAction: () => void
    title: string
    children: React.ReactNode
    size?: 'sm' | 'xl'
}

export function Modal({ isOpen, onCloseAction, title, children, size = 'sm' }: ModalProps) {
    const sizeClasses = {
        sm: 'w-1/4 max-w-1/4',
        xl: 'w-1/2 max-w-1/2'
    }

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onCloseAction()
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onCloseAction])

    if (!isOpen) return null

    const modalContent = (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onCloseAction}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
                className={`relative ${sizeClasses[size]}`}
                onClick={(e) => e.stopPropagation()}>
                <div className="bg-light-primary/70 dark:bg-dark-primary/70 rounded-lg overflow-hidden p-4">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                            {title}
                        </h2>
                        <button
                            onClick={onCloseAction}
                            className="text-light-text dark:text-dark-text transition-colors p-1 hover:bg-light-primary dark:hover:bg-dark-primary rounded"
                        >
                            <AiOutlineClose />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
}