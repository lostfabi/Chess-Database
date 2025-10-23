import { getCurrentUser } from "@/app/lib/actions";
import "../../globals.css";
import TournamentList from "../../components/Dashboard/Tournaments/TournamentList"
import GameList from "@/app/components/Dashboard/GameList";

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
    const user = await getCurrentUser()

    if(!user) {
        return <div>Bitte anmelden</div>
    }

    return(
        <div>
            <h1 className="mb-5">Welcome {user.username}!</h1>
            <div className="flex flex-row">
                <div className="flex-1">
                    <h2 className="mb-3">My Tournaments</h2>
                    <TournamentList />
                </div>
                <div className="flex-1">
                    <h2 className="mb-3">Latest Games</h2>
                    <GameList />
                </div>
            </div>
        </div>
    )
}