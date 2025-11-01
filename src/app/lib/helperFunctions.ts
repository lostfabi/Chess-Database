import {MoveArray, Tournament, TournamentState} from "@/app/lib/definitions";

export function formatDateToString(date: Date){
    return new Date(date).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).toString()
}

export function getOngoingTournaments(tournaments: Tournament[]) {
    let ongoingTournaments = []
    for(let i = 0; i < tournaments.length; i++) {
        let state = getTournamentState(tournaments[i])
        if(state === 'ongoing') {
            ongoingTournaments.push(tournaments[i])
        }
    }
    return ongoingTournaments
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

export function movesToArray(history: string[]) {
    const moveArray: MoveArray = []
    for(let i = 0; i < history.length; i += 2) {
        const blackMove: string = history[i + 1]

        moveArray.push({
            move: (i / 2 + 1).toString(),
            white: history[i],
            ...(blackMove ? { black: blackMove } : {})
        })
    }

    return moveArray
}

export function formatPgnWithHeader(history: string[], header: string): string {
    const moves = history.reduce((acc, move, i) => {
        if(i % 2 === 0) {
            return acc + `${Math.floor(i / 2) + 1}. ${move} `
        }
        return acc + `${move} `
    }, '').trim()

    return `${header}\n\n${moves}`
}