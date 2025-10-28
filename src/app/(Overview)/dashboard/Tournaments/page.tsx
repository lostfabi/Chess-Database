import { getCurrentUser, getAllUserTournaments } from "@/app/lib/actions";
import TournamentCard from "@/app/components/Dashboard/Tournaments/TournamentCard";
import {CreateTournamentButton} from "@/app/components/Dashboard/Tournaments/CreateTournamentButton";

export const dynamic = 'force-dynamic'

export default async function() {
    const tournaments = await getAllUserTournaments()
    const user = await getCurrentUser()
    if(!user) return null

    return(
        <div>
            <div className="flex flex-row justify-between content-center mb-5">
                <h1>My Tournaments</h1>
                <CreateTournamentButton />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tournaments.map(t => (
                    <TournamentCard key={t.id} tournament={t} />
                ))}
            </div>
        </div>
    )
}