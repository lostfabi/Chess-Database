import Logo from "@/components/Dashboard/Logo";
import Link from "next/link";
import { signOutUser } from "@/lib/actions";
import NavLinks from "@/components/Dashboard/NavLinks";

export default function SideBar() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-50 items-center justify-center rounded-md bg-secondary/50 p-2 md:h-50"
                href="/dashboard"
            >
                <div className="w-full h-full">
                    <Logo className="w-full h-full"/>
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <div className="hidden h-auto w-full grow rounded-md bg-secondary/50 md:block">
                    <NavLinks />
                </div>
                <form action={signOutUser}>
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3
                                    bg-primary hover:bg-primary/80">
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    );
}
