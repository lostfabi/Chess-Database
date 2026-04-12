import { getTournamentById } from "@/lib/actions";
import { Tournament } from "@/lib/types";
import TournamentGameList from "@/components/Dashboard/Tournaments/TournamentGameList";

export default  async function TournamentPage({ params }: {params: Promise<{ tournamentId: number }>}) {
    const { tournamentId } = await params
    const tournament: Tournament = await getTournamentById(tournamentId)

    return(
        <>
            <h1>{tournament.name}</h1>
            <TournamentGameList tournament={tournament}></TournamentGameList>
        </>
    )
}