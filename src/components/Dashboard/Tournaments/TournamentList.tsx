import TournamentCard from "@/components/Dashboard/Tournaments/TournamentCard";
import {getAllUserTournaments} from "@/lib/actions";
import {filterTournaments} from "@/lib/helperFunctions";
import {TournamentState} from "@/lib/types";

export default async function TournamentList({ filter }: { filter: TournamentState }) {
    const tournaments = await getAllUserTournaments()

    if (!tournaments || tournaments.length === 0) {
        return <p>No Tournaments</p>
    }

    const filtered = filterTournaments(filter, tournaments)

    if (filtered.length === 0) {
        return <p>No {filter} tournaments</p>
    }

    return (
        <ul>
            {filtered.map(t => (
                <li key={t.id} className="pb-4">
                    <TournamentCard tournament={t} />
                </li>
            ))}
        </ul>
    )
}
