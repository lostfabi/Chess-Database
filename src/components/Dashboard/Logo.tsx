export default function Logo({size = 200, className = ""}: {
    size?: number
    className?: string
}) {
    return (
        <svg
            viewBox="0 0 200 200"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="100" cy="100" r="95" fill="#624932" />
            <circle cx="100" cy="100" r="85" fill="#c7a78a" />

            {/* Schachfigur (König) */}
            <g transform="translate(100, 60)">
                {/* Basis */}
                <rect x="-25" y="55" width="50" height="6" fill="#624932" rx="2"/>
                <rect x="-24" y="61" width="48" height="6" fill="#624932" rx="2"/>

                {/* Körper */}
                <path d="M -18 55 C -12 40, -6 25, -8 15 L 8 15 C 6 25, 12 40, 18 55 Z" fill="#624932"/>

                {/* Hals */}
                <rect x="-15" y="15" width="30" height="4" fill="#624932" rx="2"/>
                <rect x="-13" y="13" width="26" height="2" fill="#624932" rx="1"/>

                {/* Kopf */}
                <path d="M -8 15 L -15 0 L 15 0 L 8 15 Z" fill="#624932"/>

                <rect x="-10" y="-3" width="20" height="4" fill="#624932" rx="1"/>

                <path d="M -6 -3 L 6 -3 L 3 -9 L 12 -6 L 12 -18 L 3 -15 L 6 -21 L -6 -21 L -3 -15 L -12 -18 L -12 -6 L -3 -9" fill="#8d633f"/>
                <circle cx="0" cy="-21" r="3" fill="#8d633f"/>

            </g>

            {/* Text */}
            <text
                x="100"
                y="150"
                fontFamily="Arial, sans-serif"
                fontSize="24"
                fontWeight="bold"
                fill="#624932"
                textAnchor="middle"
            >
                Database
            </text>
        </svg>
    )
}

// Verwendung:
// <ChessLogo size={100} />
// <ChessLogo size={200} className="opacity-80" />