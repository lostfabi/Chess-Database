import Link from "next/link";
import {FaAngleLeft, FaBookOpen, FaChessBoard, FaSignOutAlt, FaTrophy} from "react-icons/fa";
import {MdSettings} from "react-icons/md";
import Logo from "@/components/Dashboard/Logo";
import {signOutUser} from "@/lib/actions";
import {RiTeamFill} from "react-icons/ri";

export default function ({ onToggle }: { onToggle: () => void }) {
    return(
        <>
            <div className="relative mb-2 flex h-50 items-center justify-center rounded-md bg-secondary/50 p-2 md:h-50">
                <Link className="w-full h-full" href="/dashboard">
                    <Logo className="w-full h-full"/>
                </Link>
                <button
                    onClick={e => { e.stopPropagation(); onToggle(); }}
                    className="absolute top-0 left-0 p-1"
                >
                    <FaAngleLeft size={20} />
                </button>
            </div>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <div className="hidden h-auto w-full grow rounded-md bg-secondary/50 md:block">
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
                            <Link className="flex justify-between items-center" href={"/dashboard/Analysis"}>
                                Analysis
                                <FaBookOpen />
                            </Link>
                        </div>
                        <div className="bg-primary/50 hover:bg-primary/80 p-3 rounded-md">
                            <Link className="flex justify-between items-center" href={"/dashboard/Clubs"}>
                                Clubs
                                <RiTeamFill />
                            </Link>
                        </div>
                        <div className="bg-primary/50 hover:bg-primary/80 p-3 rounded-md">
                            <Link className="flex justify-between items-center" href={"/dashboard/Settings"}>
                                Settings
                                <MdSettings />
                            </Link>
                        </div>
                    </div>
                </div>
                <form action={signOutUser}>
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-between
                                        bg-primary/60 hover:bg-primary/80">
                        <div className="hidden md:block">Sign Out</div>
                        <FaSignOutAlt />
                    </button>
                </form>
            </div>
        </>
    )
}
