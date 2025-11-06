import { NextRequest, NextResponse } from "next/server";
import {supabase} from "@/app/lib/db";

export async function middleware(request: NextRequest) {
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const isAuthPath: boolean = request.nextUrl.pathname.startsWith("/auth");

    if(!user && !isAuthPath) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*"],
    runtime: 'nodejs',
};