// components/Button.tsx
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = '', ...props }: ButtonProps) {
    return (
        <button
            className={`px-4 py-2 rounded ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}