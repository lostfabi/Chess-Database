import { CreateGameButton } from "@/app/components/Dashboard/Games/CreateGameButton";

export default function() {
    return(
        <div>
            <div className="flex flex-row justify-between content-center mb-5">
                <h1>My Games</h1>
                <CreateGameButton />
            </div>
        </div>
    )
}