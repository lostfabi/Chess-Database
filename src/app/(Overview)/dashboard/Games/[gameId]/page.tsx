import {getGameById, getTournamentNameFromGameId} from "@/app/lib/actions";
import {notFound} from "next/navigation";
import GameView from "@/app/components/Dashboard/Games/GameView";
import {Game, Tournament} from "@/app/lib/definitions";

export default async function GamePage({ params }: {params: Promise<{ gameId: string }>}) {
    const { gameId } = await params
    const game: Game = await getGameById(gameId)
    const tournament = await getTournamentNameFromGameId(game)

    if(!game) return notFound()

    return(
        <div className="h-full flex flex-row gap-2">
            <GameView game={game} tournament={tournament.name}/>
        </div>
    )
}