import Link from "next/link";
import {FaAngleRight, FaBookOpen, FaChessBoard, FaSignOutAlt, FaTrophy} from "react-icons/fa";
import {MdSettings} from "react-icons/md";
import Logo from "@/components/Dashboard/Logo";
import {signOutUser} from "@/lib/actions";
import {RiTeamFill} from "react-icons/ri";

export default function ({ onToggle }: { onToggle: () => void }) {
    const iconSize = 30;

    return(
        <>
            <div className="relative mb-2 flex rounded-md bg-secondary/50 p-2 pt-6 md:h-fit">
                <Link className="w-full h-full" href="/dashboard">
                    <Logo className='w-${iconSize}'/>
                </Link>
                <button
                    onClick={e => { e.stopPropagation(); onToggle(); }}
                    className="absolute top-0 left-0 p-1"
                >
                    <FaAngleRight size={20} />
                </button>
            </div>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <div className="hidden h-auto w-full grow rounded-md bg-secondary/50 md:block">
                    <div className="flex flex-col m-2 gap-2 text-xl">
                        <div className="bg-primary/50 hover:bg-primary/80 p-3 rounded-md">
                            <Link className="flex justify-between items-center" href={"/dashboard/Tournaments"}>
                                <FaTrophy size={iconSize}/>
                            </Link>
                        </div>
                        <div className="bg-primary/50 hover:bg-primary/80 p-3 rounded-md">
                            <Link className="flex justify-between items-center" href={"/dashboard/Games"}>
                                <FaChessBoard size={iconSize}/>
                            </Link>
                        </div>
                        <div className="bg-primary/50 hover:bg-primary/80 p-3 rounded-md">
                            <Link className="flex justify-between items-center" href={"/dashboard/Analysis"}>
                                <FaBookOpen size={iconSize}/>
                            </Link>
                        </div>
                        <div className="bg-primary/50 hover:bg-primary/80 p-3 rounded-md">
                            <Link className="flex justify-between items-center" href={"/dashboard/Clubs"}>
                                <RiTeamFill size={iconSize}/>
                            </Link>
                        </div>
                        <div className="bg-primary/50 hover:bg-primary/80 p-3 rounded-md">
                            <Link className="flex justify-between items-center" href={"/dashboard/Settings"}>
                                <MdSettings size={iconSize}/>
                            </Link>
                        </div>
                    </div>
                </div>
                <form action={signOutUser}>
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none
                                        bg-primary/60 hover:bg-primary/80">
                        <FaSignOutAlt size={iconSize-10}/>
                    </button>
                </form>
            </div>
        </>
    )
}
