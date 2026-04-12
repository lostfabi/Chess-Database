import {getLatestTournaments} from "@/lib/actions";
import TournamentCard from "@/components/Dashboard/Tournaments/TournamentCard";
import {getOngoingTournaments} from "@/lib/helperFunctions";

export default async function TournamentsList() {
    const tournaments = await  getLatestTournaments()
    const ongoingTournaments = getOngoingTournaments(tournaments)

    if(!tournaments || tournaments.length === 0) {
        return <p>No Tournaments</p>
    }

    return (
        <ul>
            {ongoingTournaments.map(t => (
                <li key={t.id} className="pb-4">
                    <TournamentCard key={t.id} tournament={t} />
                </li>
            ))}
        </ul>
    )
}