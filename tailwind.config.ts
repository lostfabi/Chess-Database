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
                text: '#fbf7f4',
                background: '#1b140e',
                primary: '#ba763b',
                secondary: '#6f451f',
                accent: '#935825',
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444',
            },
        },
    },
    plugins: [],
};

export default config;