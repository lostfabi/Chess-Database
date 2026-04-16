import {getCurrentUser} from "@/lib/actions";
import AnalysisBoard from "@/components/Dashboard/Analysis/AnalysisBoard";

export default async function AnalysisPage() {
    const user = await getCurrentUser()
    if(!user) return <h1>please login</h1>

    return (
        <div>
            <h1>Analysis</h1>
            <div className="flex flex-row w-1/2">
                <AnalysisBoard />
            </div>
        </div>
    )
}