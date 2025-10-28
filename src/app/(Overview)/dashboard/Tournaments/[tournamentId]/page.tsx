import { getTournamentById } from "@/app/lib/actions";
import { Tournament } from "@/app/lib/definitions";
import TournamentGameList from "@/app/components/Dashboard/Tournaments/TournamentGameList";

export default  async function TournamentPage({ params }: {params: Promise<{ tournamentId: number }>}) {
    const { tournamentId } = await params
    const tournament: Tournament = await getTournamentById(tournamentId)

    return(
        <div>
            <h1>{tournament.name}</h1>
            <TournamentGameList tournament={tournament}></TournamentGameList>
        </div>
    )
}