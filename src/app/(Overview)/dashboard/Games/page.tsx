import { CreateGameButton } from "@/app/components/Dashboard/Games/CreateGameButton";
import { getTournamentNameFromGameId, getUserGames } from "@/app/lib/actions";
import { Game } from "@/app/lib/definitions";
import ChessboardCard from "@/app/components/Chessboard/ChessboardCard";

export default async function() {
    const games: Game[] = await getUserGames()
    const tournaments = await Promise.all(
        games.map(game => getTournamentNameFromGameId(game))
    )

    return(
        <div>
            <div className="flex flex-row justify-between content-center mb-5">
                <h1>My Games</h1>
                <CreateGameButton />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {games.map((game: Game, index: number) => (
                    <ChessboardCard
                        key={game.id}
                        game={game}
                        tournamentName={tournaments[index].name}/>
                ))}
            </div>
        </div>
    )
}