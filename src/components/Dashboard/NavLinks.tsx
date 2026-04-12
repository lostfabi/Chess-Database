import Link from "next/link";
import {FaBookOpen, FaChessBoard, FaTrophy} from "react-icons/fa";
import {MdSettings} from "react-icons/md";

export default function () {
    return(
        <div className="flex flex-col m-2 gap-2 text-xl">
            <div className="bg-primary/50 hover:bg-primary/80 p-3 rounded-md">
                <Link className="flex justify-between items-center" href={"/dashboard/Tournaments"}>
                    Tournaments
                    <FaTrophy />
                </Link>
            </div>
            <div className="bg-primary/50 hover:bg-primary/80 p-3 rounded-md">
                <Link className="flex justify-between items-center" href={"/dashboard/Games"}>
                    Games
                    <FaChessBoard />
                </Link>
            </div>
            <div className="bg-primary/50 hover:bg-primary/80 p-3 rounded-md">
                <Link className="flex justify-between items-center" href={"/dashboard/Settings"}>
                    Settings
                    <MdSettings />
                </Link>
            </div>
            <div className="bg-primary/50 hover:bg-primary/80 p-3 rounded-md">
                <Link className="flex justify-between items-center" href={"/dashboard/Analysis"}>
                    Analysis
                    <FaBookOpen />
                </Link>
            </div>
        </div>
    )
}
