'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {TournamentState} from "@/lib/types";
import React from "react";

export default function TournamentListFilter({ current }: { current: TournamentState }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('filter', e.target.value)
        router.push(`?${params.toString()}`)
    }

    return (
        <select
            className="text-sm text-text bg-secondary/40 rounded-md px-1"
            value={current}
            onChange={handleChange}>
            <option value="ongoing">ongoing</option>
            <option value="upcoming">upcoming</option>
            <option value="completed">completed</option>
        </select>
    )
}
