export type Tournament = {
    id: string;
    name: string;
    startDate: Date;
    endDate?: Date;
    score: number;
    createdAt: Date;
    userId: string;
};

export type Game = {
    id: string;
    userId: string;
    tournamentId: number;
    playerWhite: string;
    playerBlack: string;
    result: string;
    pgn: string;
    date: Date;
};

export type Move = {
    move: string;
    white: string;
    black?: string;
}

export type MoveArray = Move[]

export type TournamentState = 'upcoming' | 'ongoing' | 'completed'

export type PgnComment = {
    move: string;
    comment: string;
}