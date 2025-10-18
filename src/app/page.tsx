import "./globals.css";
import TestPage from "@/app/components/fetchTest";

export default function Home() {
  return (
    <div>
      <main className="w-full">
          <p>Test</p>
          <TestPage></TestPage>
      </main>
    </div>
  );
}
