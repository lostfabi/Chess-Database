import { getCurrentUser, getAllUserTournaments } from "@/app/lib/actions";
import TournamentCard from "@/app/components/Dashboard/Tournaments/TournamentCard";

export const dynamic = 'force-dynamic'

export default async function() {
    const tournaments = await getAllUserTournaments()
    const user = await getCurrentUser()
    if(!user) return null

    return(
        <div>
            <h1 className="mb-5">My Tournaments</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tournaments.map(t => (
                    <TournamentCard key={t.id} tournament={t} />
                ))}
            </div>
        </div>
    )
}