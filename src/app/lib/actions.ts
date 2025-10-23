'use server';

import {auth, signIn} from "../../../auth";
import {AuthError} from 'next-auth';
import type {Game, Tournament, User} from '@/app/lib/definitions';
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'})

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function getSession() {
    const session = await auth()
    if(!session?.user?.id) return null
    return session.user.id
}

export async function getCurrentUser() {
    const userId = await getSession()

    const user = await sql<User[]>`SELECT * FROM "User" WHERE id = ${userId}`

    return user[0] || null
}

export async function getLatestUserTournaments() {
    const userId = await getSession()

    return sql<Tournament[]>`SELECT * FROM "Tournament" WHERE "userId" = ${userId} ORDER BY "startDate" DESC LIMIT 3`;
}

export async function getAllUserTournaments() {
    const userId = await getSession()

    return sql<Tournament[]>`SELECT * FROM "Tournament" WHERE "userId" = ${userId} ORDER BY "startDate" DESC`;
}

export async function getUserGames() {
    const userId = await getSession()

    return sql<Game[]>`SELECT * FROM "Game" WHERE "userId" = ${userId} ORDER BY "date" DESC LIMIT 6`
}

export async function getTournamentFromGameId(game: Game) {
    const tournament = await sql<{ name: string }[]>`SELECT name FROM "Tournament" WHERE id = ${game.tournamentId}`
    return tournament[0].name
}