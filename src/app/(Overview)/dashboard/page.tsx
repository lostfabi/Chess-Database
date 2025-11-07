import { getCurrentUser } from "@/app/lib/actions";
import "../../globals.css";
import TournamentList from "../../components/Dashboard/Tournaments/TournamentList"
import DashboardGameList from "@/app/components/Dashboard/DashboardGameList";

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
    const user = await getCurrentUser()
    if(!user) return <h1>please login</h1>

    return(
        <div>
            <h1 className="mb-8">Dashboard</h1>
            <div className="flex flex-row gap-10">
                <div className="flex-1">
                    <h2 className="mb-5">My Tournaments</h2>
                    <TournamentList />
                </div>
                <div className="flex-1">
                    <h2 className="mb-5">Latest Games</h2>
                    <DashboardGameList />
                </div>
            </div>
        </div>
    )
}