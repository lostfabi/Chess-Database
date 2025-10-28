export default function DisplayMoves({ moveArray }: { moveArray: string[] }) {
    return (
        <div className="text-lg">
            {moveArray.map((_move, i) => (
                i % 2 === 0 && (
                    <div key={i}>
                        <span>{i / 2 + 1}. </span>
                        <span>{moveArray[i]} </span>
                        <span>{moveArray[i + 1] || ''}</span>
                    </div>
                )
            ))}
        </div>
    )
}