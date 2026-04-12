'use server';

import { redirect } from 'next/navigation';
import type { Game, Tournament, User } from '@/lib/types';
import { createGameScheme, createTournamentScheme, registerScheme } from "@/lib/formValidation";
import { supabase, supabaseAdmin } from '@/lib/db';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const supabaseServer = await createSupabaseServerClient()
    const { error } = await supabaseServer.auth.signInWithPassword({ email, password })

    if (error) {
        return 'Invalid credentials.'
    }

    redirect('/dashboard')
}

export async function signOutUser() {
    const supabaseServer = await createSupabaseServerClient()
    await supabaseServer.auth.signOut()
    redirect('/')
}

export async function getSession() {
    const supabaseServer = await createSupabaseServerClient()
    const { data: { user } } = await supabaseServer.auth.getUser()
    return user?.id ?? null
}

export async function getCurrentUser() {
    const userId = await getSession()
    if (!userId) return null

    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId)

    if (error) {
        console.error('Error fetching user:', error)
        throw new Error(`user with id: ${userId} not found`)
    }

    return {
        id: data.user.id,
        username: data.user.user_metadata?.username ?? '',
        email: data.user.email ?? '',
        createdAt: new Date(data.user.created_at),
    } as User
}

export async function registerUser(formData: FormData) {
    const validated = registerScheme.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    })

    if (!validated.success) {
        return {error : validated.error.issues[0].message}
    }

    const { username, email, password } = validated.data

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username }
        }
    })

    if (authError || !authData.user) {
        console.error('Auth signup error:', authError)
        return { error: authError?.message ?? 'registration failed' }
    }

    return { success: true }
}

export async function getUserGames() {
    const userId = await getSession()
    if (!userId) return []

    const { data, error } = await supabase
        .from('Game')
        .select('*')
        .eq('userId', userId)
        .order('date', { ascending: false })

    if (error) {
        throw new Error(`games from user: ${userId} not found`)
    }

    return data as Game[]
}

export async function getGameById(id: string) {
    const { data, error } = await supabase
        .from('Game')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching game:', error)
        throw new Error(`Game with id: ${id} not found`)
    }

    return data as Game
}

export async function getGamesFromTournament(tournament: Tournament) {
    const { data, error } = await supabase
        .from('Game')
        .select('*')
        .eq('tournamentId', tournament.id)

    if (error) {
        console.error('Error fetching games:', error)
        throw new Error(`no games in tournament found`)
    }

    return data as Game[]
}

export async function createGame(formData: FormData) {
    const tournamentName = formData.get('tournament') as string

    if(!tournamentName) return { error: 'no tournament name found' }

    const tournament = await getTournamentByName(tournamentName)
    if (!tournament) return { error: 'tournament not found' };

    const validated = createGameScheme.safeParse({
        playerWhite: formData.get('playerWhite'),
        playerBlack: formData.get('playerBlack'),
        date: formData.get('date'),
        pgn: formData.get('pgn'),
        result: formData.get('result'),
        tournamentId: tournament.id
    })

    const userId = await getSession()
    if(!userId) return { error: "no user" }

    if (!validated.success) {
        console.error('Validation error:', validated.error)
        return { error: "validation error" }
    }

    const { tournamentId, result, pgn, date, playerWhite, playerBlack } = validated.data

    const { error } = await supabase
        .from('Game')
        .insert({
            tournamentId,
            result,
            pgn,
            userId,
            date,
            playerWhite,
            playerBlack,
        })

    if (error) {
        console.error('Game creation error:', error)
        return { error: 'post operation failed' }
    }

    return { success: true }
}

export async function deleteGame(gameId: string) {
    return supabase
        .from('Game')
        .delete()
        .eq('id', gameId);
}

export async function getTournamentById(id: number): Promise<Tournament> {
    const { data, error } = await supabase
        .from('Tournament')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching tournament:', error)
        throw new Error(`Tournament ${id} not found`)
    }

    return data as Tournament
}

export async function getTournamentByName(name: string): Promise<Tournament> {
    const { data, error } = await supabase
        .from('Tournament')
        .select('*')
        .eq('name', name)
        .single()

    if (error) {
        console.error('Error fetching tournament:', error)
        throw new Error(`Tournament ${name} not found`)
    }
    return data as Tournament
}

export async function getLatestTournaments() {
    const userId = await getSession()
    if (!userId) return []

    const { data, error } = await supabase
        .from('Tournament')
        .select('*')
        .eq('userId', userId)
        .order('startDate', { ascending: true })

    if (error) {
        console.error('Error fetching tournaments:', error)
        throw new Error(`tournaments not found`)
    }

    return data as Tournament[]
}

export async function getAllUserTournaments() {
    const userId = await getSession()
    if (!userId) return []

    const { data, error } = await supabase
        .from('Tournament')
        .select('*')
        .eq('userId', userId)
        .order('startDate', { ascending: false })

    if (error) {
        console.error('Error fetching tournaments:', error)
        throw new Error(`tournaments from user: ${userId} not found`)
    }

    return data as Tournament[]
}

export async function getTournamentNameFromGameId(game: Game) {
    const { data, error } = await supabase
        .from('Tournament')
        .select('name')
        .eq('id', game.tournamentId)
        .single()

    if (error) {
        console.error('Error fetching tournament:', error)
        throw new Error(`no tournament for game: ${game.id} found`)
    }

    return data
}

export async function createTournament(formData: FormData) {
    const validated = createTournamentScheme.safeParse({
        name: formData.get("name"),
        startDate: formData.get("start"),
        endDate: formData.get("end")
    })

    const userId = await getSession()
    if(!userId) return { error: "no user" }

    if (!validated.success) {
        console.error('Validation error:', validated.error)
        return { error: "validation error" }
    }

    const { name, startDate, endDate } = validated.data

    console.log('Creating tournament:', { name, startDate, endDate, userId })

    const { error } = await supabase
        .from('Tournament')
        .insert({
            name,
            startDate,
            endDate,
            userId,
            score: 0
        })

    if (error) {
        console.error('Tournament creation error:', error)
        return { error: 'post operation failed' }
    }

    return { success: true }
}

export async function deleteTournament(tournament: Tournament) {
    return supabase
        .from('Tournament')
        .delete()
        .eq('id', tournament.id);
}
