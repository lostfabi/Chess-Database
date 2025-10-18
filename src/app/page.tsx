import "./globals.css";
import MinimalChessboard from "./components/chessboard";

export default function Home() {
  return (
    <div>
      <main className="w-full">
          <MinimalChessboard/>
      </main>
    </div>
  );
}
