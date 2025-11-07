import {getCurrentUser} from "@/app/lib/actions";

export default async function SettingsPage() {
    const user = await getCurrentUser()
    if(!user) return <h1>please login</h1>

    return (
        <div>
            <h1>Settings</h1>
        </div>
    )
}