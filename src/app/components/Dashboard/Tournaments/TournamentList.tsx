import {getLatestTournaments} from "@/app/lib/actions";
import TournamentCard from "@/app/components/Dashboard/Tournaments/TournamentCard";
import {getOngoingTournaments} from "@/app/lib/helperFunctions";

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