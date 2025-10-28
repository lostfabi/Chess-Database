import { getGamesFromTournament } from "@/app/lib/actions";
import { Game, Tournament } from "@/app/lib/definitions";
import ChessboardCard from "@/app/components/Chessboard/ChessboardCard";

export default async function TournamentGameList({ tournament }: { tournament: Tournament }) {
    const games: Game[] = await getGamesFromTournament(tournament)

    if(!games || games.length === 0) {
        return <h2>No Games yet</h2>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {games.map(game => (
                <ChessboardCard key={game.id} game={game} tournamentName={tournament.name}/>
            ))}
        </div>
    )
}