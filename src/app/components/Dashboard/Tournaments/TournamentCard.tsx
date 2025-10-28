import { Game, Tournament, TournamentState } from "@/app/lib/definitions";
import { getTournamentState } from "@/app/lib/helperFunctions";
import { formatDateToString } from "@/app/lib/helperFunctions";
import { getGamesFromTournament } from "@/app/lib/actions";
import Link from "next/link";

type TournamentCardProps = {
    tournament: Tournament
}

export default async function({ tournament }: TournamentCardProps) {
    const games: Game[] = await getGamesFromTournament(tournament)
    const state: TournamentState = getTournamentState(tournament)

    const endDate: string = tournament.endDate ? formatDateToString(tournament.endDate) : "-"
    const startDate: string = formatDateToString(tournament.startDate)

    return(
        <>
            <Link href={`/dashboard/Tournaments/${tournament.id}`}>
                <div className="bg-light-secondary/30 dark:bg-dark-secondary/30 hover:bg-light-secondary/50 dark:hover:bg-dark-secondary/50 p-3 rounded-md">
                    <div className="flex justify-between items-center mb-3">
                        <h2>{tournament.name}</h2>
                        <p className={`text-light-text p-2 text-xs rounded-sm min-w-1/8 text-center
                                ${state === 'ongoing' ? 'bg-ongoing/80' :
                            state === 'upcoming' ? 'bg-upcoming/80' : 'bg-completed/80'}`}>{state}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>
                            <p>Start: {startDate.toString()}</p>
                            <p>End: {endDate?.toString()}</p>
                        </div>
                        <div className="self-center">
                            <p>{tournament.score}/{games.length}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}