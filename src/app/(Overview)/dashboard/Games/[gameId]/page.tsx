import {getGameById, getTournamentFromGameId} from "@/app/lib/actions";
import {notFound} from "next/navigation";
import GameCard from "@/app/components/Dashboard/Games/GameCard";
import {Game, Tournament} from "@/app/lib/definitions";

export default async function GamePage({ params }: {params: Promise<{ gameId: string }>}) {
    const { gameId } = await params
    const game: Game = await getGameById(gameId)
    const tournament: Tournament = await getTournamentFromGameId(game)

    if(!game) return notFound()

    return(
        <div className="h-full flex flex-row gap-2">
            <GameCard game={game} tournament={tournament}/>
        </div>
    )
}