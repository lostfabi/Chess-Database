import {Move, MoveArray, Tournament, TournamentState} from "@/lib/types";

export function formatDateToString(date: Date){
    return new Date(date).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).toString()
}

export function splitResult(result: string) {
    const split: string[] = result.split("-")
    return {
        white: split[0],
        black: split[1]
    }
}

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

export function filterTournaments(state: TournamentState, tournaments: Tournament[]): Tournament[] {
    return tournaments.filter((t) => getTournamentState(t) === state)
}

export function movesToArray(history: string[]) {
    const moveArray: MoveArray = []
    for(let i = 0; i < history.length; i += 2) {
        const blackMove: string = history[i + 1]

        moveArray.push({
            moveIndex: (i / 2 + 1).toString(),
            white: history[i],
            ...(blackMove ? { black: blackMove } : {})
        })
    }

    return moveArray
}