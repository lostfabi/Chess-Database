import Link from "next/link";

export default function () {
    return(
        <div className="flex flex-col m-2 gap-2 text-xl">
            <div className="bg-light-primary/50 dark:bg-dark-primary/50 hover:bg-light-primary/80 dark:hover:bg-dark-primary/80 p-3 rounded-md">
                <Link className="" href={"/dashboard/Tournaments"}>
                    Tournaments
                </Link>
            </div>
            <div className="bg-light-primary/50 dark:bg-dark-primary/50 hover:bg-light-primary/80 dark:hover:bg-dark-primary/80 p-3 rounded-md">
                <Link className="" href={"/dashboard/Games"}>
                    Games
                </Link>
            </div>
            <div className="bg-light-primary/50 dark:bg-dark-primary/50 hover:bg-light-primary/80 dark:hover:bg-dark-primary/80 p-3 rounded-md">
                <Link className="" href={"/dashboard/Clubs"}>
                    Clubs
                </Link>
            </div>
        </div>
    )
}