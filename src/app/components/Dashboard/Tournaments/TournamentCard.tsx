import TournamentCardClient from './TournamentCardClient';
import {Game, Tournament, TournamentState} from "@/app/lib/definitions";
import {getGamesFromTournament} from "@/app/lib/actions";
import {formatDateToString, getTournamentState} from "@/app/lib/helperFunctions";

type TournamentCardProps = {
    tournament: Tournament
}

export default async function TournamentCard({ tournament }: TournamentCardProps) {
    const games: Game[] = await getGamesFromTournament(tournament)
    const state: TournamentState = getTournamentState(tournament)

    const endDate: string = tournament.endDate ? formatDateToString(tournament.endDate) : "-"
    const startDate: string = formatDateToString(tournament.startDate)

    return (
        <TournamentCardClient
            tournament={tournament}
            games={games}
            state={state}
            startDate={startDate}
            endDate={endDate}
        />
    );
}