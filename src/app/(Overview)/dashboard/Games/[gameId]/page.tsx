import {getGameById} from "@/lib/actions";
import {notFound} from "next/navigation";
import GameView from "@/components/Dashboard/Games/GameView";
import {Game} from "@/lib/types";

export default async function GamePage({ params }: {params: Promise<{ gameId: string }>}) {
    const { gameId } = await params
    const game: Game = await getGameById(gameId)

    if(!game) return notFound()

    return(
        <div className="h-full flex flex-row gap-2">
            <GameView game={game}/>
        </div>
    )
}