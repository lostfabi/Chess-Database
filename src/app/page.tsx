import "./globals.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen">
        <h1>Wellcome!</h1>
        <Link href="/auth/login">login</Link>
    </div>
  );
}
