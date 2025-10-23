import {getTournamentState, Tournament} from "@/app/lib/definitions";

type TournamentCardProps = {
    tournament: Tournament
}

export default function({ tournament }: TournamentCardProps) {
    const state = getTournamentState(tournament)

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    let endDate = tournament.endDate ? formatDate(tournament.endDate.toString()) : "---"

    return(
        <div className="bg-light-secondary/30 dark:bg-dark-secondary/30 hover:bg-light-secondary/50 dark:hover:bg-dark-secondary/50 p-3 rounded-md">
            <div className="flex justify-between items-center mb-3">
                <h2>{tournament.name}</h2>
                <p className={`text-light-text p-2 text-xs rounded-sm min-w-1/8 text-center
                            ${state === 'ongoing' ? 'bg-ongoing/80' : 
                            state === 'upcoming' ? 'bg-upcoming/80' : 'bg-completed/80'}`}>{state}</p>
            </div>
            <p>Start: {formatDate(tournament.startDate.toString())}</p>
            <p>End: {endDate}</p>
        </div>
    )
}