import "./globals.css";
import Link from "next/link";
import { Button } from "@/app/components/buttons/Button";

export default function Home() {
    return (
        <div className="flex flex-row justify-center h-screen">
            <div className="flex flex-col justify-between">
                <p className="font-bold text-6xl m-10">Welcome!</p>
                <div className="flex flex-row justify-center gap-5 m-10">
                    <Button>
                        <Link href="/auth/login">login</Link>
                    </Button>
                    <Button>
                        <Link href="/auth/register">register</Link>
                    </Button>
                </div>
            </div>
        </div>
  );
}
