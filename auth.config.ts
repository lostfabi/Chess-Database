import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string
            }
            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn: boolean = !!auth?.user

            const isOnDashboard: boolean = nextUrl.pathname.startsWith("/dashboard")

            if (isOnDashboard) {
                return isLoggedIn;
            }

            return true
        },
    },
    providers: [],
} satisfies NextAuthConfig