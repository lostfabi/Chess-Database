import {getUserGames, getTournamentNameFromGameId} from "@/app/lib/actions";
import ChessboardCard from "@/app/components/Chessboard/ChessboardCard";
import { Game } from "@/app/lib/definitions";

export default async function DashboardGameList() {
    const games = await getUserGames()
    const gamesWithTournaments = await Promise.all(
        games.map(async (game: Game) => ({
            game,
            tournament: await getTournamentNameFromGameId(game)
        }))
    )

    if(!games || games.length === 0) {
        return <h2>No Games yet</h2>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {gamesWithTournaments.map(({ game, tournament }) => (
                <ChessboardCard key={game.id} game={game} tournamentName={tournament.name}/>
            ))}
        </div>
    )
}