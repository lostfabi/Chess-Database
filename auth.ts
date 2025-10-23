import NextAuth from "next-auth";
import {authConfig} from "./auth.config";
import Credentials from "@auth/core/providers/credentials";
import { z } from 'zod'
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'})

async function getUser(email: string): Promise<User | undefined> {
    try {
        const users = await sql<User[]>`SELECT * FROM "User" WHERE email = ${email}`
        return users[0]
    }
    catch (error) {
        console.error('Failed to fetch user: ', error)
        throw new Error('Failed to fetch user')
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers:
        [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z.object({ email: z.email(), password: z.string().min(10) })
                .safeParse(credentials)

            if(parsedCredentials.success) {
                const { email, password } = parsedCredentials.data
                const user = await getUser(email)
                if(!user || !user.password) return null
                const passwordsMatch = await bcrypt.compare(password, user.password)

                if(passwordsMatch) return {
                    id: user.id,
                    email: user.email,
                    name: user.username
                }
            }
            return null
        },
    }),
    ]
})