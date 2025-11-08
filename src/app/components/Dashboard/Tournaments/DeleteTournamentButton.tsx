import {FaTrash} from "react-icons/fa";
import {Button} from "@/app/components/buttons/Button";

export default function DeleteTournamentButton() {
    function handleClick() {
        console.log("deleteTournament");
    }

    return(
        <div className="bg-dark-accent rounded-md">
            <Button
                className="flex flex-row gap-2 items-center"
                onClick={ () => handleClick() }>
                Delete
                <FaTrash className="text-red-900/80" />
            </Button>
        </div>
    )
}