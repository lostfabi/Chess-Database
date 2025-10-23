import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                light: {
                    text: '#1a140f',
                    background: '#f1eae4',
                    primary: '#624932',
                    secondary: '#c7a78a',
                    accent: '#8d633f'
                },
                dark: {
                    text: '#f0eae5',
                    background: '#1b140e',
                    primary: '#cdb49d',
                    secondary: '#755638',
                    accent: '#c09672'
                },
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444',
            },
        },
    },
    plugins: [],
};

export default config;