import {getCurrentUser} from "@/lib/actions";
import TournamentList from "@/components/Dashboard/Tournaments/TournamentList"
import TournamentListFilter from "@/components/Dashboard/Tournaments/TournamentListFilter";
import DashboardGameList from "@/components/Dashboard/DashboardGameList";
import {TournamentState} from "@/lib/types";

export const dynamic = 'force-dynamic'

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
    const user = await getCurrentUser()
    const { filter: rawFilter } = await searchParams
    const filter = (rawFilter ?? 'ongoing') as TournamentState

    if (!user) return <h1>please login</h1>

    return (
        <>
            <h1 className="mb-8">Dashboard</h1>
            <div className="flex flex-row gap-5">
                <div className="flex-1">
                    <div className="mb-5 flex flex-row justify-between">
                        <h2>My Tournaments</h2>
                        <TournamentListFilter current={filter} />
                    </div>
                    <TournamentList filter={filter} />
                </div>
                <div className="flex-1">
                    <h2 className="mb-5">Latest Games</h2>
                    <DashboardGameList />
                </div>
            </div>
        </>
    )
}
