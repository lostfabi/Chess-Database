import { z } from 'zod'

export const loginScheme = z.object({
    email: z.email('invalid email'),
    password:  z.string().min(10, 'password must be at least 10 characters long')
})

export const registerScheme = z.object({
    email: z.email('invalid email'),
    username: z.string()
        .min(3, 'name must be 3 characters long'),
    password: z.string()
        .min(10, 'password must be at least 10 characters long')
        .regex(/[A-Z]/, 'need upper case letter')
        .regex(/[0-9]/, 'need a number')
})

export const createTournamentScheme = z.object({
    name: z.string().min(3, 'name must be at least 3 characters long'),
    startDate: z.string().min(1, 'start success'),
    endDate: z.string().min(1, 'end success')
}).refine((data) => data.endDate >= data.startDate, {
    message: 'end must be after start',
    path: ['endDate']
})

export const createGameScheme = z.object({
    tournamentId: z.number().positive(),
    playerWhite: z.string().min(1, 'player required'),
    playerBlack: z.string().min(1, 'player required'),
    pgn: z.string().min(10, 'invalid pgn'),
    date: z.string().refine(date => !isNaN(Date.parse(date)), 'invalid date')
})

export type LoginInput = z.infer<typeof loginScheme>
export type RegisterInput = z.infer<typeof registerScheme>
export type CreateTournamentInput = z.infer<typeof createTournamentScheme>
export type CreateGameInput = z.infer<typeof createGameScheme>