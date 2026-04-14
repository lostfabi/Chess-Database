import TournamentCard from "@/components/Dashboard/Tournaments/TournamentCard";
import {getAllUserTournaments} from "@/lib/actions";

export default async function TournamentsList() {
    const tournaments = await getAllUserTournaments()

    if(!tournaments || tournaments.length === 0) {
        return <p>No Tournaments</p>
    }

    return (
        <ul>
            {tournaments.map(t => (
                <li key={t.id} className="pb-4">
                    <TournamentCard key={t.id} tournament={t} />
                </li>
            ))}
        </ul>
    )
}