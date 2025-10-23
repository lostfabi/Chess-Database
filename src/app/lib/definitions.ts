export type User = {
    id: string;
    username: string;
    email: string;
    password?: string;
    createdAt: Date;
};

export type Tournament = {
    id: number;
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

export type TournamentState = 'upcoming' | 'ongoing' | 'completed'

export function getTournamentState(tournament: Tournament): TournamentState {
    const now = new Date();
    const start = new Date(tournament.startDate);
    const end = tournament.endDate ? new Date(tournament.endDate) : null;

    if (start > now) {
        return 'upcoming';
    } else if ((end && now >= start && now <= end) || (!end && start <= now)) {
        return 'ongoing';
    } else {
        return 'completed';
    }
}