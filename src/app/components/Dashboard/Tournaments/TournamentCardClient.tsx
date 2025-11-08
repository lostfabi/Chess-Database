'use client'

import Link from "next/link";
import EditTournamentPopup from "@/app/components/Dashboard/Tournaments/EditTournamentPopup";
import {Game, Tournament, TournamentState} from "@/app/lib/definitions";
import {useRouter} from "next/navigation";
import React from "react";

interface TournamentCardProps {
    tournament: Tournament;
    games: Game[];
    state: TournamentState;
    startDate: string;
    endDate: string;
}

export default function({ tournament, games, state, startDate, endDate }: TournamentCardProps) {
    const router = useRouter();
    const [isPopupOpen, setPopupOpen] = React.useState(false);

    const handleCardClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('[data-popup-trigger]') && !isPopupOpen) {
            router.push(`/dashboard/Tournaments/${tournament.id}`);
        }
    };

    return(
            <div
                onClick={handleCardClick}
                className="bg-light-secondary/30 dark:bg-dark-secondary/30 hover:bg-light-secondary/50 dark:hover:bg-dark-secondary/50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-3">
                    <h2>{tournament.name}</h2>
                    <div className="flex items-center gap-5">
                        <p className={`text-light-text p-2 text-xs rounded-sm min-w-1/8 text-center
                               ${state === 'ongoing' ? 'bg-ongoing/80' :
                            state === 'upcoming' ? 'bg-upcoming/80' : 'bg-completed/80'}`}>{state}
                        </p>
                        <div data-popup-trigger>
                            <EditTournamentPopup onOpenChange={setPopupOpen}/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                        <p>Start: {startDate.toString()}</p>
                        <p>End: {endDate?.toString()}</p>
                    </div>
                    <div className="self-center">
                        <p>{tournament.score}/{games.length}</p>
                    </div>
                </div>
            </div>
    )
}