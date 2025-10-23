import {getUserGames, getCurrentUser, getTournamentFromGameId} from "@/app/lib/actions";
import ChessboardCard from "@/app/components/Chessboard/ChessboardCard";

export default async function GameList() {
    const games = await getUserGames()
    const gamesWithTournaments = await Promise.all(
        games.map(async (game) => ({
            game,
            tournamentName: await getTournamentFromGameId(game)
        }))
    )

    if(!games || games.length === 0) {
        return <h2>No Games</h2>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {gamesWithTournaments.map(({ game, tournamentName }) => (
                <ChessboardCard key={game.id} game={game} tournamentName={tournamentName}/>
            ))}
        </div>
    )
}