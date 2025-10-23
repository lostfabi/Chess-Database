import {getLatestUserTournaments} from "@/app/lib/actions";

export default async function TournamentsList() {
    const tournaments = await getLatestUserTournaments()

    if(!tournaments || tournaments.length === 0) {
        return <p>No Tournaments</p>
    }

    return (
        <ul>
            {tournaments.map(t => (
                <li key={t.id} className="p-3">
                    {t.name}
                </li>
            ))}
        </ul>
    )
}